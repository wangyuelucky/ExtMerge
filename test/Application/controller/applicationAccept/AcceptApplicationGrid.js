Ext.define('Soims.controller.applicationAccept.AcceptApplicationGrid', {
    extend: 'Ext.app.Controller',
    views: ['applicationAccept.AcceptApplicationGrid'],
    requires: ['Soims.model.application.common.SampleApplicationType','Soims.model.application.SamplePanelType',
				'Soims.controller.applicationAccept.B1Tab','Soims.controller.applicationAccept.B2Tab',
				'Soims.controller.applicationAccept.V1Tab','Soims.controller.applicationAccept.V2Tab',
				'Soims.controller.applicationAccept.V3Tab','Soims.controller.applicationAccept.V4Tab'],
    refs: [{
        ref: 'acceptapplicationgrid',
        selector: 'acceptapplicationgrid',
        autoCreate: true,
        xtype: 'acceptapplicationgrid'
    }],
    init: function () {
        this.control({
            'acceptapplicationgrid  button[action=accept]': {
                click: this.onClickAppAcceptBtn
            },
            'acceptapplicationgrid': {
                itemclick: function (grid, record, item, index, e, eOpts) {
                    console.log("Hello");
                    this.showHistoryState(record);
                },
                selectionchange: function (selModel, records) {
                    var appPanel = this.getAcceptapplicationgrid();
                    if (records.length > 0) {
                        appPanel.down('#accept').setDisabled(false);
                    }
                    else {
                        appPanel.down('#accept').setDisabled(true);
                    }
                }
            }
        });
    },
    showHistoryState: function (record) {
        var applicationID = record.get('id');
        var panel = this.getAcceptapplicationgrid().up('applicationpanel').down('applicationhistorypanel');
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
                isAccept: true,
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
        var acceptapplicationgrid = this.getAcceptapplicationgrid();
        var con = this.getCon('mainFrame.Main');
        con.addTab(acceptapplicationgrid);
    },
    refreshGrid: function () {
        this.show();
        this.getAcceptapplicationgrid().getStore().reload();
        this.getAcceptapplicationgrid().getSelectionModel().deselectAll();
    },
    getCon: function (applicationPanelPath) {
        var loginApp = this.application;
        return loginApp.getController(applicationPanelPath);
    },
    onClickAppAcceptBtn: function (button) {
        var grid = button.up('grid');
        var model = grid.getSelectionModel().getSelection()[0];
        var type = model.get('type');

        var panels = this.getViewFnByApp('applicationAccept',type,'Tab');
        var panel = this.showTab('Accept' + type + model.get('id'), '受理' + model.get('name'), panels, model.get('id'));

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
    }
});