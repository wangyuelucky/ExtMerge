Ext.define('Soims.controller.applicationAccept.AcceptCompleteGrid', {
    extend: 'Ext.app.Controller',
    views: ['applicationAccept.AcceptCompleteGrid'],
    requires: ['Soims.model.application.common.SampleApplicationType', 'Soims.model.application.SamplePanelType'],
    refs: [{
        ref: 'acceptcompletegrid',
        selector: 'acceptcompletegrid',
        autoCreate: true,
        xtype: 'acceptcompletegrid'
    }],
    init: function () {
        this.control({
            'acceptcompletegrid  button[action=show]': {
                click: this.onClickAppShowBtn
            },
            'acceptcompletegrid  button[itemId=exportSiteApplication]': {
                click: this.onExportSiteApplication
            },
            'acceptcompletegrid  button[itemId=exportIndoorApplication]': {
                click: this.onExportIndoorApplication
            },
            'acceptcompletegrid  button[itemId=importSiteExcel]': {
                click: this.onImportSiteApplication
            },
            'acceptcompletegrid  button[itemId=importIndoorExcel]': {
                click: this.onImportIndoorApplication
            },
            'acceptcompletegrid': {
                itemclick: function (grid, record, item, index, e, eOpts) {
                    console.log("Hello");
                    this.showHistoryState(record);
                },
                selectionchange: function (selModel, records) {
                    var appPanel = this.getAcceptcompletegrid();
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
        console.log(record);
        var applicationID = record.get('applicationID');
        var panel = this.getAcceptcompletegrid().up('applicationpanel').down('applicationhistorypanel');
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
                isAccept: false,
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
        var acceptcompletegrid = this.getAcceptcompletegrid();
        var con = this.getCon('mainFrame.Main');
        con.addTab(acceptcompletegrid);
    },
    getCon: function (applicationPanelPath) {
        var loginApp = this.application;
        return loginApp.getController(applicationPanelPath);
    },
    onClickAppShowBtn: function (button) {
        var grid = button.up('grid');
        var model = grid.getSelectionModel().getSelection()[0];
        var type = model.get('type');

        var panels = this.getViewFnByApp('applicationAccept', type, 'Tab');
        var panel = this.showTab('ShowAccept' + type + model.get('id'), '查看' + model.get('name'), panels, model.get('applicationID'), type);
    },

    getViewFnByApp: function (prefix, type, suffix) {
        var view = null,
            controller = this.getCon(prefix + '.' + type + suffix);

        switch (type) {
            case Soims.model.application.common.SampleApplicationType.B1.value:
                view = controller.getApplicationAcceptB1TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.B2.value:
                view = controller.getApplicationAcceptB2TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.V1.value:
                view = controller.getApplicationAcceptV1TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.V2.value:
                view = controller.getApplicationAcceptV2TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.V3.value:
                view = controller.getApplicationAcceptV3TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.V4.value:
                view = controller.getApplicationAcceptV4TabView();
                break;
        }
        return view;
    },
    onExportIndoorApplication: function (button) {
        var isIE = window.navigator.userAgent.indexOf("MSIE") >= 1;
        document.location.href = Soims.service.ApplicationAccepts.AcceptService + '/ExportIndoorAppToXlsExcel' + '?isIE=' + isIE;
    },
    onExportSiteApplication: function (button) {
        var isIE = window.navigator.userAgent.indexOf("MSIE") >= 1;
        document.location.href = Soims.service.ApplicationAccepts.AcceptService + '/ExportSiteAppToXlsExcel' + '?isIE=' + isIE;
    },
    onImportSiteApplication: function (button) {
        var con = this.getCon('applicationAccept.DocumentUploadWin');
        con.show('/ImportSiteAppExcel');
    },
    onImportIndoorApplication: function (button) {
        var con = this.getCon('applicationAccept.DocumentUploadWin');
        con.show('/ImportIndoorAppExcel');
    }

});