Ext.define('Soims.controller.applicationAccept.V1Tab', {
    extend: 'Ext.app.Controller',
    views: ['applicationAccept.V1Tab'],
    requires: ['Soims.model.applicationAuditing.AuditType', 'Soims.model.applicationAuditing.AuditState', 'Soims.model.applicationAccept.AcceptAction'],
    refs: [{
        ref: 'acceptv1tab',
        selector: 'acceptv1tab',
        autoCreate: true,
        xtype: 'acceptv1tab'
    }],
    init: function () {
        this.getController('application.common.SampleInfo');
        this.getController('application.new.V1BasicInfo');
        this.control({
            'acceptv1tab': {
                render: function (panel) {
                    if (panel.isEdit == true||panel.isShow == true) {
                        var v1basicinfopanel = panel.down('v1basicinfopanel'),
                            testdatainfo = panel.down('testdatainfo');
                        var comboReport = v1basicinfopanel.down('#report');
                        var storeReport = comboReport.getStore();
                        var comboDivision = v1basicinfopanel.down('#division');
                        var storeDivision = comboDivision.getStore();
                        var store = Ext.create('Soims.store.application.show.V1Detail');

                        store.getProxy().setExtraParam('ID', panel.applicationID);
                        store.load(function () {
                            if (store.getCount() != 0) {
                                // 基本信息
                                storeReport.load(function () {
                                    console.log(store.getAt(0).get('reportName'));
                                    v1basicinfopanel.loadRecord(store.getAt(0));
                                    var record = Ext.create('Soims.model.application.new.Division',
                                    {
                                        'id': store.getAt(0).get('divisionID'),
                                        'name': store.getAt(0).get('divisionName')
                                    });
                                    comboReport.setValue(store.getAt(0).get('reportName'));
                                    storeDivision.getProxy().setExtraParam('reportID', store.getAt(0).get('reportID'));
                                    panel.down('#applicationCommonSampleInfo').applicationID = store.getAt(0).get('id');
                                    storeDivision.load(function () {
                                        comboDivision.setValue(record);
                                    });
                                });
                                /** 拟提交成果
                                testdatainfo.loadRecord(store.getAt(0));
                                */
                            }
                        });
                    }
                }
            },
            'acceptv1tab button[itemId=agree]': {
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