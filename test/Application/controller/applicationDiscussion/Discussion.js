Ext.define('Soims.controller.applicationDiscussion.Discussion', {
    extend: 'Ext.app.Controller',
    views: ['applicationDiscussion.FinallyResult', 'applicationDiscussion.FinallyApproval'],
    refs: [{
        ref: 'finallyresult',
        selector: 'finallyresult',
        autoCreate: true,
        xtype: 'finallyresult'
    }, {
        ref: 'finallyapproval',
        selector: 'finallyapproval',
        autoCreate: true,
        xtype: 'finallyapproval'
    }],
    init: function () {
        this.control({
            'finallyapproval  button[itemId=save]': {
                click: this.save
            },
            'finallyapproval  button[itemId=submit]': {
                click: this.submit
            },
            'finallyapproval  button[itemId=reject]': {
                click: this.reject
            },
            'finallyresult  button[itemId=save]': {
                click: this.finaSave
            },
            'finallyresult  button[itemId=submit]': {
                click: this.finaSubmit
            }
        });
    },

    getCon: function (applicationPanelPath) {
        var loginApp = this.application;
        return loginApp.getController(applicationPanelPath);
    },

    save: function (button) {
        var text = button.up('panel').down('#approvalfinallycontent');
        //var store = button.up('panel').up('panel').down('allocationinfor').getStore();
//        var f = false;
//        store.each(function (rec) {
//            if (rec.get('suggestion').trim() === '') {
//                f = true;
//            }
//        });
//        if (f) {
//            Ext.MessageBox.alert('提示', '你不能保存空的分配意见', function () { }, this);
//            return;
//        }
//        store.each(function (rec) {
//            Ext.Ajax.request({
//                url: Soims.service.samples.SampleAllocationService + '/Save',
//                params: rec.data,
//                scope: this,
//                success: function (response) {
//                }
//            });
//        });
        var value = text.getValue();
        if (value) {
            var applicationID = button.up('panel').applicationID;
            Ext.Ajax.request({
                url: Soims.service.discussion.DistributionOperateService + '/Save',
                params: { applicationID: applicationID, value: value },
                scope: this,
                success: function (response) {
                    Ext.MessageBox.alert('提示', '保存完成', function () { }, this);
                }
            });
        } else {
            Ext.MessageBox.alert('提示', '您无需保存空的最终审批意见', function () { }, this);
        }
    },
    submit: function (button) {
        var text = button.up('panel').down('#approvalfinallycontent');
        //var store = button.up('panel').up('panel').down('allocationinfor').getStore();
        var value = text.getValue();
//        var f = false;
//        store.each(function (rec) {
//            if (rec.get('suggestion').trim() === '') {
//                f = true;
//            }
//        });
//        if (f) {
//            Ext.MessageBox.alert('提示', '你不能保存空的分配意见', function () { }, this);
//            return;
//        }
//        store.each(function (rec) {
//            Ext.Ajax.request({
//                url: Soims.service.samples.SampleAllocationService + '/Save',
//                params: rec.data,
//                scope: this,
//                success: function (response) {
//                }
//            });
//        });
        if (value) {
            var applicationID = button.up('panel').applicationID;
            Ext.Ajax.request({
                url: Soims.service.discussion.DistributionOperateService + '/Submit',
                params: { applicationID: applicationID, value: value },
                scope: this,
                success: function (response) {
                    Ext.MessageBox.alert('提示', '提交完成', function () { }, this);
                    button.up('panel').up('panel').close();
                    var grid = this.getCon('applicationApproval.Approval').show();
                    grid.getStore().reload();
                }
            });
        } else {
            Ext.MessageBox.alert('提示', '您不能发布空的最终审审批意见', function () { }, this);
        }
    },
    reject: function (button) {
        var text = button.up('panel').down('#approvalfinallycontent');
        var value = text.getValue();
        var applicationID = button.up('panel').applicationID;
        var con = this.getCon('applicationApproval.Approval');
        Ext.MessageBox.confirm('提示', '您确定要驳回此申请么？一旦驳回，大洋馆将需要重新受理',
                        function (btn) {
                            if (btn == 'yes') {
                                Ext.Ajax.request({
                                    url: Soims.service.discussion.DistributionOperateService + '/Reject',
                                    params: { applicationID: applicationID, value: value },
                                    scope: this,
                                    success: function (response) {
                                        Ext.MessageBox.alert('提示', '驳回完成', function () { }, this);
                                        button.up('panel').up('panel').close();
                                        var grid = con.show();
                                        grid.getStore().reload();
                                    }
                                });
                            }
                        });
    },
    finaSave: function (button) {
        var text = button.up('panel').down('#discussionfinallycontent');
        var value = text.getValue();
        console.log(value);
        if (value) {
            var applicationID = button.up('panel').applicationID;
            Ext.Ajax.request({
                url: Soims.service.discussion.DistributionDiscussionService + '/Save',
                params: { applicationID: applicationID, value: value },
                scope: this,
                success: function (response) {
                    Ext.MessageBox.alert('提示', '保存完成', function () { }, this);
                }
            });
        } else {
            Ext.MessageBox.alert('提示', '您不能发布空的最终审议意见', function () { }, this);
        }
    },
    finaSubmit: function (button) {
        var text = button.up('panel').down('#discussionfinallycontent');
        var value = text.getValue();
        if (value) {
            var applicationID = button.up('panel').applicationID;
            Ext.Ajax.request({
                url: Soims.service.discussion.DistributionDiscussionService + '/Submit',
                params: { applicationID: applicationID, value: value },
                scope: this,
                success: function (response) {
                    Ext.MessageBox.alert('提示', '提交完成', function () { }, this);
                    button.up('panel').up('panel').close();
                    var grid = this.getCon('applicationDiscussion.DiscussionApplicationGrid').show();
                    grid.getStore().reload();
                }
            });
        } else {
            Ext.MessageBox.alert('提示', '您不能发布空的最终审议意见', function () { }, this);
        }
    }
});