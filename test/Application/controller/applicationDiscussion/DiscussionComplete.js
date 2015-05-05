Ext.define('Soims.controller.applicationDiscussion.DiscussionComplete', {
    extend: 'Ext.app.Controller',
    views: ['applicationDiscussion.DiscussionComplete', 'Soims.model.application.SamplePanelType'],
    refs: [{
        ref: 'discussioncomplete',
        selector: 'discussioncomplete',
        autoCreate: true,
        xtype: 'discussioncomplete'
    }],
    init: function () {
        this.control({
            'discussioncomplete  button[itemId=discussion]': {
                click: this.onClickAppAuditBtn
            },
            'discussioncomplete  button[itemId=refreshTbarDisCom]': {
                click: function (button, e) {
                    button.up('panel').getStore().reload();
                    button.up('panel').getSelectionModel().deselectAll();
                }
            },
            'discussioncomplete  button[itemId=show]': {
                click: this.onClickAppShowBtn
            },
            'discussioncomplete': {
                itemclick: function (grid, record, item, index, e, eOpts) {
                    console.log("Hello");
                    this.showHistoryState(record);
                },
                selectionchange: function (selModel, records) {
                    var appPanel = this.getDiscussioncomplete();
                    if (records.length > 0) {
                        appPanel.down('#discussion').setDisabled(false);
                        appPanel.down('#show').setDisabled(false);
                    }
                    else {
                        appPanel.down('#discussion').setDisabled(true);
                        appPanel.down('#show').setDisabled(true);
                    }
                }
            }
        });
    },
    showHistoryState: function (record) {
        var applicationID = record.get('id');
        var panel = this.getDiscussioncomplete().up('applicationpanel').down('applicationhistorypanel');
        console.log(panel);
        Ext.Ajax.request({
            url: Soims.service.applications.ApplicationsService + '/ShowApplicationHistory',
            params: { applicationID: applicationID },
            method: 'POST',
            scope: this,
            success: function (response) {
                console.log(response.responseText);
                var responseJson = Ext.JSON.decode(response.responseText);
                panel.refresh(responseJson, record.get('type'));

                //var historyStateCon = this.getCon('application.ApplicationHistoryPanel');
                //historyStateCon.refresh(responseJson, record.get('type'));
            }
        });
    },
    showTab: function (id, title, panel, applicationID, isShow,isEdit, type) {
        var con = this.getCon('mainFrame.Main');
        var instance = con.existInstance(id);
        if (!instance) {
            var panelNew = Ext.create(panel, { id: id,
                title: title,
                applicationID: applicationID,
                isShow: isShow,
                isDiscussion: true,
                type: type,
                panelType: Soims.model.application.SamplePanelType.getByAppType(type, isEdit, true)
            });
            con.addTab(panelNew);
            return panelNew;
        } else {
            return instance;
        }
    },
    show: function () {
        var applicationgrid = this.getDiscussioncomplete();
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
    onClickAppAuditBtn: function (button) {
        var grid = button.up('grid');
        var model = grid.getSelectionModel().getSelection()[0];

        var panels = this.getViewFnByApp(model);
        var panel = this.showTab('Discussion' + model.get('id'), '审议' + model.get('name'), panels, model.get('id'), false, true, model.get('type'));
    },
    onClickAppShowBtn: function (button) {
        var grid = button.up('grid');
        var model = grid.getSelectionModel().getSelection()[0];

        var panels = this.getViewFnByApp(model);
        var panel = this.showTab('ShowDiscussion' + model.get('id'), '查看' + model.get('name'), panels, model.get('id'), true, false, model.get('type'));
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