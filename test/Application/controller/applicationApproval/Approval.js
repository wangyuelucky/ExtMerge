Ext.define('Soims.controller.applicationApproval.Approval', {
    extend: 'Ext.app.Controller',
    views: ['applicationApproval.Approval', 'Soims.model.application.SamplePanelType'],
    refs: [{
        ref: 'approval',
        selector: 'approval',
        autoCreate: true,
        xtype: 'approval'
    }],
    init: function () {
        this.control({
            'approval  button[itemId=approval]': {
                click: this.onClickBtn
            },
            'approval  button[itemId=refreshTbarApp]': {
                click: function (button, e) {
                    button.up('panel').getStore().reload();
                    button.up('panel').getSelectionModel().deselectAll();
                }
            },
            'approval': {
                itemclick: function (grid, record, item, index, e, eOpts) {
                    this.showHistoryState(record);
                },
                selectionchange: function (selModel, records) {
                    var appPanel = this.getApproval();
                    if (records.length > 0) {
                        appPanel.down('#approval').setDisabled(false);
                    }
                    else {
                        appPanel.down('#approval').setDisabled(true);
                    }
                }
            }
        });
    },
    showHistoryState: function (record) {
        var applicationID = record.get('id');
        var panel = this.getApproval().up('applicationpanel').down('applicationhistorypanel');
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
    showTab: function (id, title, panel, applicationID, type) {
        var con = this.getCon('mainFrame.Main');
        var instance = con.existInstance(id);
        if (!instance) {
            var panelNew = Ext.create(panel, { id: id,
                title: title,
                applicationID: applicationID,
                isShow: false,
                isDiscussion: false,
                type: type,
                panelType: Soims.model.application.SamplePanelType.getByAppType(type, true, false)
            });
            con.addTab(panelNew);
            return panelNew;
        } else {
            return instance;
        }
    },
    show: function () {
        var applicationgrid = this.getApproval();
        var con = this.getCon('mainFrame.Main');
        con.addTab(applicationgrid);
        return applicationgrid;
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
    onClickBtn: function (button) {
        var grid = button.up('grid');
        var model = grid.getSelectionModel().getSelection()[0];

        var panels = this.getViewFnByApp(model);
        var panel = this.showTab('Approval' + model.get('id'), '审批' + model.get('name'), panels, model.get('id'), model.get('type'));
    },
    getViewFnByApp: function (model) {
        var view = null,
            controller = this.getCon('applicationDiscussion.' + model.get('type') + 'Tab');

        switch (model.get('type')) {
            case Soims.model.application.common.SampleApplicationType.B1.value:
                view = controller.getApplicationDiscussionB1TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.B2.value:
                view = controller.getApplicationDiscussionB2TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.V1.value:
                view = controller.getApplicationDiscussionV1TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.V2.value:
                view = controller.getApplicationDiscussionV2TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.V3.value:
                view = controller.getApplicationDiscussionV3TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.V4.value:
                view = controller.getApplicationDiscussionV4TabView();
                break;
        }
        return view;
    }
});