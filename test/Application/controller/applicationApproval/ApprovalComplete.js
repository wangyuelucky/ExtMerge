Ext.define('Soims.controller.applicationApproval.ApprovalComplete', {
    extend: 'Ext.app.Controller',
    views: ['applicationApproval.ApprovalComplete', 'Soims.model.application.SamplePanelType'],
    refs: [{
        ref: 'approvalcomplete',
        selector: 'approvalcomplete',
        autoCreate: true,
        xtype: 'approvalcomplete'
    }],
    init: function () {
        this.control({
            'approvalcomplete  button[itemId=show]': {
                click: this.onClickBtn
            },
            'approvalcomplete  button[itemId=refreshTbarAppCom]': {
                click: function (button, e) {
                    button.up('panel').getStore().reload();
                    button.up('panel').getSelectionModel().deselectAll();
                }
            },
            'approvalcomplete': {
                itemclick: function (grid, record, item, index, e, eOpts) {
                    console.log("Hello");
                    this.showHistoryState(record);
                },
                selectionchange: function (selModel, records) {
                    var appPanel = this.getApprovalcomplete();
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
        var applicationID = record.get('id');
        var panel = this.getApprovalcomplete().up('applicationpanel').down('applicationhistorypanel');
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
    showTab: function (id, title, panel, applicationID,isShow, type) {
        var con = this.getCon('mainFrame.Main');
        var instance = con.existInstance(id);
        if (!instance) {
            var panelNew = Ext.create(panel, { id: id,
                title: title,
                applicationID: applicationID,
                isShow: isShow,
                isAudit: true,
                type: type,
                panelType: Soims.model.application.SamplePanelType.getByAppType(type, !isShow, false)
            });
            con.addTab(panelNew);
            return panelNew;
        } else {
            return instance;
        }
    },
    show: function () {
        var applicationgrid = this.getApprovalcomplete();
        var con = this.getCon('mainFrame.Main');
        con.addTab(applicationgrid);
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
        var panel = this.showTab('ShowApproval' + model.get('id'), '审批' + model.get('name'), panels, model.get('id'), true, model.get('type'));
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