Ext.define('Soims.controller.applicationAccept.AllocationGrid', {
    extend: 'Ext.app.Controller',
    views: ['applicationAccept.AllocationGrid'],
    requires: ['Soims.model.application.common.SampleApplicationType', 'Soims.model.application.SamplePanelType'],
    refs: [{
        ref: 'allocationgrid',
        selector: 'allocationgrid',
        autoCreate: true,
        xtype: 'allocationgrid'
    }],
    init: function () {
        this.control({
            'allocationgrid': {
                itemclick: function (grid, record, item, index, e, eOpts) {
                    console.log("Hello");
                    this.showHistoryState(record);
                }
            }
        });
    },
    showHistoryState: function (record) {
        var applicationID = record.get('applicationID');
        var panel = this.getAllocationgrid().up('applicationpanel').down('applicationhistorypanel');
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
        var acceptcompletegrid = this.getAllocationgrid();
        var con = this.getCon('mainFrame.Main');
        con.addTab(acceptcompletegrid);
    },
    getCon: function (applicationPanelPath) {
        var loginApp = this.application;
        return loginApp.getController(applicationPanelPath);
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