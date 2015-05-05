Ext.define('Soims.controller.applicationAccept.B1Tab', {
    extend: 'Ext.app.Controller',
    views: ['applicationAccept.B1Tab'],
    requires: ['Soims.model.applicationAuditing.AuditType', 'Soims.model.applicationAuditing.AuditState', 'Soims.model.applicationAccept.AcceptAction'],
    refs: [{
        ref: 'acceptb1tab',
        selector: 'acceptb1tab',
        autoCreate: true,
        xtype: 'acceptb1tab'
    }],
    init: function () {
        this.getController('application.common.SampleInfo');
        this.getController('application.common.BoardingUser');
        this.getController('application.common.SampleBackCountry');
        this.getController('application.common.ElectronicDocument');

        this.control({
            'acceptb1tab': {
                afterrender: this.afterB1TabRender
            },
            'acceptb1tab button[itemId=agree]': {
                click: this.onClickAgreeBtn
            }
        });
    },
    getCon: function (path) {
        var loginApp = this.application;
        return loginApp.getController(path);
    },
    afterB1TabRender: function (panel) {
        var b1basicinfopanel = panel.down('b1basicinfopanel'),
            testdatainfo = panel.down('testdatainfo'),
            samplesiteusenecessityField = panel.down('samplesiteusenecessityform').down('textareafield');

        var store = Ext.create('Soims.store.application.show.B1Detail');
        store.getProxy().setExtraParam('ID', panel.applicationID);
        store.load(function () {
            if (store.getCount() != 0) {
                // 基本信息
                b1basicinfopanel.loadRecord(store.getAt(0));
                // 必要性
                samplesiteusenecessityField.setValue(store.getAt(0).get('usingNecessity'));
                /** 拟提交成果
                testdatainfo.loadRecord(store.getAt(0));
                */
            }
        });
    },
    accept: function (btn, action, actionName) {
        var tabPanel = btn.up('panel'),
            appID = tabPanel.applicationID;

        Ext.Tools.Confirm('确认', '您确定要受理' + actionName + '吗？ ', function (result) {
            if (result == 'yes') {
                Ext.Ajax.request({
                    url: Soims.service.ApplicationAccepts.AcceptService + '/Accepting',
                    params: { Action: action, ApplicationID: appID, Competence: 'AcceptB1' },
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