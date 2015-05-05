Ext.define("Soims.view.applicationDiscussion.FinallyResult", {
    extend: 'Ext.form.Panel',
    alias: 'widget.finallyresult',
    bodyPadding: 2,
    title: '专家委员会最终审议意见',
    buttonAlign: 'center',
    initComponent: function () {
        if (!this.isFinally)
        {
            this.hidden = Soims.component.applicationDisscussionFinallyResultHidden;
        }
        this.items = [{
            xtype: 'textareafield',
            padding: '5 0 0 0',
            anchor: '100%',
            readOnly: this.isShow || !this.isDiscussion,
            grow: true,
            //hidden: Soims.component.applicationDisscussionFinallyResultHidden,
            //readOnly: !this.isAudit || Soims.component.applicationDisscussionFinallyResultReadOnly
            itemId: 'discussionfinallycontent',
            height: 150
        }];
        this.buttons = [{
            text: '保存',
            xtype: 'button',
            //handler: this.save,
            hidden: this.isShow || !this.isDiscussion,
            itemId: 'save'
        }, {
            text: '提交',
            xtype: 'button',
            //handler: this.submit,
            hidden: this.isShow || !this.isDiscussion,
            itemId: 'submit'
        }];
        this.callParent();
    },
    listeners: {
        afterrender: function (view) {
            Ext.Ajax.request({
                url: Soims.service.discussion.DistributionDiscussionService + '/GetFinallyResult',
                params: { applicationID: view.applicationID },
                scope: this,
                success: function (response) {
                    if (response.responseText) {
                        view.down('#discussionfinallycontent').setValue(response.responseText);
                    } else {
                        if (view.isShow || !view.isDiscussion)
                        {
                            view.close();
                        }
                    }
                }
            });
        }
    }
//    save: function (button) {
//        var text = button.up('panel').down('#discussionfinallycontent');
//        var value = text.getValue();
//        if (value) {
//            var applicationID = button.up('panel').applicationID;
//            Ext.Ajax.request({
//                url: Soims.service.discussion.DistributionDiscussionService + '/Save',
//                params: { applicationID: applicationID, value: value },
//                scope: this,
//                success: function (response) {
//                    Ext.MessageBox.alert('提示', '保存完成', function () { }, this);
//                }
//            });
//        } else {
//            Ext.MessageBox.alert('提示', '您不能发布空的最终审议意见', function () { }, this);
//        }
//    },
//    submit: function (button) {
//        var text = button.up('panel').down('#discussionfinallycontent');
//        var value = text.getValue();
//        if (value) {
//            var applicationID = button.up('panel').applicationID;
//            Ext.Ajax.request({
//                url: Soims.service.discussion.DistributionDiscussionService + '/Submit',
//                params: { applicationID: applicationID, value: value },
//                scope: this,
//                success: function (response) {
//                    //var text = button.up('panel').up('panel').close();
//                    Ext.MessageBox.alert('提示', '提交完成', function () { }, this);
//                }
//            });
//        } else {
//            Ext.MessageBox.alert('提示', '您不能发布空的最终审议意见', function () { }, this);
//        }
//    }
});