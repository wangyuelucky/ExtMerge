Ext.define('Soims.controller.applicationAuditing.AuditApplicationGrid', {
    extend: 'Ext.app.Controller',
    views: ['applicationAuditing.AuditApplicationGrid'],
    requires: ['Soims.model.application.common.SampleApplicationType', 'Soims.model.application.SamplePanelType'],
    refs: [{
        ref: 'auditapplicationgrid',
        selector: 'auditapplicationgrid',
        autoCreate: true,
        xtype: 'auditapplicationgrid'
    }],
    init: function () {
        this.control({
            'auditapplicationgrid  button[action=audit]': {
                click: this.onClickAppAuditBtn
            },
            'auditapplicationgrid': {
                itemclick: function (grid, record, item, index, e, eOpts) {
                    this.showHistoryState(record);
                },
                selectionchange: function (selModel, records) {
                    var appPanel = this.getAuditapplicationgrid();
                    if (records.length > 0) {
                        appPanel.down('#audit').setDisabled(false);
                    }
                    else {
                        appPanel.down('#audit').setDisabled(true);
                    }
                }
            }
        });
    },
    showHistoryState: function (record) {
        var applicationID = record.get('id');
        var panel = this.getAuditapplicationgrid().up('applicationpanel').down('applicationhistorypanel');
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
    showTab: function (id, title, panel, applicationID, apptype) {
        var con = this.getCon('mainFrame.Main');
        var instance = con.existInstance(id);
        if (!instance) {
            var panelNew = Ext.create(panel, { id: id,
                title: title,
                applicationID: applicationID,
                isShow: true,
                isAudit: true,
                appType: apptype,
                panelType: Soims.model.application.SamplePanelType.AuditEdit.value 
            });
            con.addTab(panelNew);
            return panelNew;

        } else {
            return instance;
        }
    },
    show: function () {
        var auditapplicationgrid = this.getAuditapplicationgrid();
        var con = this.getCon('mainFrame.Main');
        con.addTab(auditapplicationgrid);
    },
    refreshGrid: function () {
        this.show();
        this.getAuditapplicationgrid().getStore().reload();
        this.getAuditapplicationgrid().getSelectionModel().deselectAll();
    },
    getCon: function (applicationPanelPath) {
        var loginApp = this.application;
        return loginApp.getController(applicationPanelPath);
    },
    onClickAppAuditBtn: function (button) {
        var grid = button.up('grid');
        var model = grid.getSelectionModel().getSelection()[0];
        var type = model.get('type');

        var panels = this.getViewFnByApp('applicationAuditing',type,'Tab');
        var panel = this.showTab('Audit' + type + model.get('id'), '审核' + model.get('name'), panels, model.get('id'), model.get('type'));
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