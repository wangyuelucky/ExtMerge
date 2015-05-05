Ext.define("Soims.view.applicationDiscussion.FinallyApproval", {
    extend: 'Ext.form.Panel',
    alias: 'widget.finallyapproval',
    bodyPadding: 2,
    title: '大洋协会最终审批意见',
    buttonAlign: 'center',
    initComponent: function () {
        this.items = [{
            xtype: 'textareafield',
            padding: '5 0 0 0',
            anchor: '100%',
            grow: true,
            readOnly: this.isShow,
            itemId: 'approvalfinallycontent',
            height: 150
        }];
        this.buttons = [{
            text: '保存',
            xtype: 'button',
            //handler: this.save,
            hidden: this.isShow,
            itemId: 'save'
        }, {
            text: '提交',
            xtype: 'button',
            //handler: this.submit,
            hidden: this.isShow,
            itemId: 'submit'
        }, {
            text: '驳回',
            xtype: 'button',
            //handler: this.reject,
            hidden: true,
            itemId: 'reject'
        }];
        this.callParent();
    },
    listeners: {
        afterrender: function (view) {
            Ext.Ajax.request({
                url: Soims.service.discussion.DistributionOperateService + '/GetResult',
                params: { applicationID: view.applicationID },
                scope: this,
                success: function (response) {
                    if (response.responseText) {
                        view.down('#approvalfinallycontent').setValue(response.responseText);
                    } else {
                        if (view.isShow) {
                            view.close();
                        }
                    }
                }
            });
        }
    }
//    save: function (button) {
//        var text = button.up('panel').down('#approvalfinallycontent');
//        var value = text.getValue();
//        if (value) {
//            var applicationID = button.up('panel').applicationID;
//            Ext.Ajax.request({
//                url: Soims.service.discussion.DistributionOperateService + '/Save',
//                params: { applicationID: applicationID, value: value },
//                scope: this,
//                success: function (response) {
//                    Ext.MessageBox.alert('提示', '保存完成', function () { }, this);
//                }
//            });
//        } else {
//            Ext.MessageBox.alert('提示', '您无需保存空的最终审批意见', function () { }, this);
//        }
//    },
//    submit: function (button) {
//        var text = button.up('panel').down('#approvalfinallycontent');
//        var value = text.getValue();
//        if (value) {
//            var applicationID = button.up('panel').applicationID;
//            Ext.Ajax.request({
//                url: Soims.service.discussion.DistributionOperateService + '/Submit',
//                params: { applicationID: applicationID, value: value },
//                scope: this,
//                success: function (response) {
//                    //var text = button.up('panel').up('panel').close();
//                    Ext.MessageBox.alert('提示', '提交完成', function () { }, this);
//                }
//            });
//        } else {
//            Ext.MessageBox.alert('提示', '您不能发布空的最终审审批意见', function () { }, this);
//        }
//    },
//    reject: function (button) {
//        var applicationID = button.up('panel').applicationID;
//        Ext.MessageBox.confirm('提示', '您确定要驳回此申请么？一旦驳回，大洋馆将需要重新受理',
//                        function (btn) {
//                            if (btn == 'yes') {
//                                Ext.Ajax.request({
//                                    url: Soims.service.discussion.DistributionOperateService + '/Reject',
//                                    params: { applicationID: applicationID },
//                                    scope: this,
//                                    success: function (response) {
//                                        //var text = button.up('panel').up('panel').close();
//                                        Ext.MessageBox.alert('提示', '驳回完成', function () { }, this);
//                                    }
//                                });
//                            }
//                        });
//    }
});