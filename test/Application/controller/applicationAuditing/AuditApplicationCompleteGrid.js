Ext.define('Soims.controller.applicationAuditing.AuditApplicationCompleteGrid', {
    extend: 'Ext.app.Controller',
    views: ['applicationAuditing.AuditApplicationCompleteGrid'],
    requires: ['Soims.model.application.common.SampleApplicationType'],
    refs: [{
        ref: 'auditapplicationcompletegrid',
        selector: 'auditapplicationcompletegrid',
        autoCreate: true,
        xtype: 'auditapplicationcompletegrid'
    }],
    init: function () {
        this.control({
            'auditapplicationcompletegrid  button[action=show]': {
                click: this.onClickAppShowBtn
            },
            'auditapplicationcompletegrid': {
                itemclick: function (grid, record, item, index, e, eOpts) {
                    this.showHistoryState(record);
                },
                selectionchange: function (selModel, records) {
                    var appPanel = this.getAuditapplicationcompletegrid();
                    if (records.length > 0) {
                        appPanel.down('#show').setDisabled(false);
                    }
                    else {
                        appPanel.down('#show').setDisabled(true);
                    }
                }
            }
        });
    },
    showHistoryState: function (record) {
        var applicationID = record.get('applicationID');
        var panel = this.getAuditapplicationcompletegrid().up('applicationpanel').down('applicationhistorypanel');
        console.log(applicationID);
        Ext.Ajax.request({
            url: Soims.service.applications.ApplicationsService + '/ShowApplicationHistory',
            params: { applicationID: applicationID },
            method: 'POST',
            scope: this,
            success: function (response) {
                console.log(response.responseText);
                var responseJson = Ext.JSON.decode(response.responseText);
                panel.refresh(responseJson, record.get('type'));
            }
        });
    },
    showTab: function (id, title, panel, applicationID, appType) {
        var con = this.getCon('mainFrame.Main');
        var instance = con.existInstance(id);
        if (!instance) {
            var panelNew = Ext.create(panel, { id: id,
                title: title,
                applicationID: applicationID,
                isShow: true,
                isAudit: false,
                appType: appType,
                panelType: Soims.model.application.SamplePanelType.AuditShow.value 
            });
            con.addTab(panelNew);
            return panelNew;
        } else {
            return instance;
        }
    },
    show: function () {
        var auditapplicationcompletegrid = this.getAuditapplicationcompletegrid();
        var con = this.getCon('mainFrame.Main');
        con.addTab(auditapplicationcompletegrid);
    },
    getCon: function (applicationPanelPath) {
        var loginApp = this.application;
        return loginApp.getController(applicationPanelPath);
    },
    onClickAppShowBtn: function (button) {
        var grid = button.up('grid');
        var model = grid.getSelectionModel().getSelection()[0];
        var type = model.get('type');

        var panels = this.getViewFnByApp('applicationAuditing',type,'Tab');
        var panel = this.showTab('ShowAudit' + type + model.get('id'), '查看' + model.get('name'), panels, model.get('applicationID'), model.get('type'));
    },
    getViewFnByApp: function (prefix, type, suffix) {
        var view = null,
            controller = this.getCon(prefix + '.' + type + suffix);

        switch (type) {
            case Soims.model.application.common.SampleApplicationType.B1.value:
                view = controller.getApplicationAuditingB1TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.B2.value:
                view = controller.getApplicationAuditingB2TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.V1.value:
                view = controller.getApplicationAuditingV1TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.V2.value:
                view = controller.getApplicationAuditingV2TabView();
                break;
        }
        return view;
    }
});