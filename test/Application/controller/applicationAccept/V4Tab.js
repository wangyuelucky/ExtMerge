Ext.define('Soims.controller.applicationAccept.V4Tab', {
    extend: 'Ext.app.Controller',
    views: ['applicationAccept.V4Tab'],
    requires: ['Soims.model.applicationAuditing.AuditType', 'Soims.model.applicationAuditing.AuditState', 'Soims.model.applicationAccept.AcceptAction'],
    refs: [{
        ref: 'acceptv4tab',
        selector: 'acceptv4tab',
        autoCreate: true,
        xtype: 'acceptv4tab'
    }],
    init: function () {
        this.getController('application.common.V4Sample');
        this.control({
            'acceptv4tab': {
                render: function (panel) {
                    if (panel.isEdit == true || panel.isShow == true) {
                        var v1basicinfopanel = panel.down('v4basicinfopanel');

                        var comboActivity = v1basicinfopanel.down('#activity');
                        var storeActivity = comboActivity.getStore();

                        var store = Ext.create('Soims.store.application.show.V4Detail');

                        store.getProxy().setExtraParam('ID', panel.applicationID);
                        store.load(function () {
                            if (store.getCount() != 0) {
                                // 基本信息
                                storeActivity.load(function () {

                                    var record = Ext.create('Soims.model.application.new.Activity',
                                    {
                                        'activityID': store.getAt(0).get('activityID'),
                                        'activityName': store.getAt(0).get('activityName')
                                    });
                                    comboActivity.setValue(record);
                                    v1basicinfopanel.loadRecord(store.getAt(0));
                                    var samplePanel = panel.down('#applicationCommonV4Sample');
                                    samplePanel.applicationID = store.getAt(0).get('id');
                                    samplePanel.down('datefield[itemId=activityStartTime]').setValue(store.getAt(0).get('activityStartTime'));
                                    samplePanel.down('datefield[itemId=activityEndTime]').setValue(store.getAt(0).get('activityEndTime'));
                                });

                            }
                        });
                    }
                }
            },
            'acceptv4tab button[itemId=agree]': {
                click: this.onClickAgreeBtn
            }
        });
    },
    getCon: function (path) {
        var loginApp = this.application;
        return loginApp.getController(path);
    },
    accept: function (btn, action, actionName) {
        var tabPanel = btn.up('panel'),
            appID = tabPanel.applicationID,
            acceptContent = tabPanel.down('acceptform').down('textareafield').getValue();

        Ext.Tools.Confirm('确认', '您确定要受理' + actionName + '吗？ ', function (result) {
            if (result == 'yes') {
                Ext.Ajax.request({
                    url: Soims.service.ApplicationAccepts.AcceptService + '/Accepting',
                    params: { Content: acceptContent, Action: action, ApplicationID: appID, Competence: 'AcceptB2' },
                    scope: this,
                    success: function (response) {
                        if (response.responseText == 'error') {
                            Ext.Tools.Msg('航次代码或者航段代码格式有问题，请修正！', 1);
                        } else {
                            Ext.Tools.Msg('受理完成！', 0);
                        }
                        tabPanel.close();
                        var con = this.getController('applicationAccept.ApplicationGrid');
                        con.refreshGrid();
                    }
                });
            }
        }, this);
    },
    onClickAgreeBtn: function (btn) {
        var action = Soims.model.applicationAccept.AcceptAction.Agree;
        this.accept(btn, action.value, action.name);
    },
    onClickRejectBtn: function (btn) {
        var action = Soims.model.applicationAccept.AcceptAction.Reject;
        this.accept(btn, action.value, action.name);
    },
    onClickDenyBtn: function (btn) {
        var action = Soims.model.applicationAccept.AcceptAction.Veto;
        this.accept(btn, action.value, action.name);
    },
    onClickCloseBtn: function (btn) {
        btn.up('panel').close();
    }
});