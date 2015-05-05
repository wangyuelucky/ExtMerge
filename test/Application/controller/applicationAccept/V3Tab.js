Ext.define('Soims.controller.applicationAccept.V3Tab', {
    extend: 'Ext.app.Controller',
    views: ['applicationAccept.V3Tab'],
    requires: ['Soims.model.applicationAuditing.AuditType', 'Soims.model.applicationAuditing.AuditState', 'Soims.model.applicationAccept.AcceptAction'],
    refs: [{
        ref: 'acceptv3tab',
        selector: 'acceptv3tab',
        autoCreate: true,
        xtype: 'acceptv3tab'
    }],
    init: function () {
        this.getController('application.common.SampleInfo');
        this.control({
            'acceptv3tab': {
                afterrender: this.afterTabRender
            },
            'acceptv3tab button[itemId=agree]': {
                click: this.onClickAgreeBtn
            }
        });
    },
    afterTabRender: function (panel) {
        if (panel.isShow == true) {
            var v3basicinfopanel = panel.down('v3basicinfopanel'),
                testdatainfo = panel.down('testdatainfo');

            var combo = v3basicinfopanel.down('#noOceanTopic');
            var store = Ext.create('Soims.store.application.show.V3Detail');
            store.getProxy().setExtraParam('ID', panel.applicationID);
            store.load(function () {
                if (store.getCount() != 0) {
                    // 基本信息
                    v3basicinfopanel.loadRecord(store.getAt(0));
                    // Combobox Store
                    var record = Ext.create('Soims.model.application.new.NoOceanTopic',
                        {
                            'topicID': store.getAt(0).get('topicID'),
                            'topicName': store.getAt(0).get('topicName')
                        });
                    /** 拟提交成果
                    testdatainfo.loadRecord(store.getAt(0));
                    */
                }
            });
        }
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