Ext.define('Soims.controller.application.ApplicationPanel', {
    extend: 'Ext.app.Controller',
    views: ['application.ApplicationPanel'],
    refs: [{
        ref: 'applicationpanel',
        selector: 'applicationpanel',
        autoCreate: true,
        xtype: 'applicationpanel'
    }],
    init: function () {
        this.control({
            'applicationpanel': {
                resize: function (panel, width, height, oldWidth, oldHeight, eOpts) {
                    var grid = panel.down('grid');
                    grid.setHeight(height - 120);
                }
            }
        });
    },
    showTab: function (id, title, panel, applicationID, isShow, isEdit) {
        var con = this.getCon('mainFrame.Main');
        var instance = con.existInstance(id);
        if (!instance) {
            var panelNew = Ext.create(panel, { id: id, title: title, application: this.application, applicationID: applicationID, isShow: isShow, isEdit: isEdit });
            con.addTab(panelNew);
            return panelNew;
        } else {
            return instance;
        }
    },
    show: function (grid, title) {
        this.getCon(grid);
        this.getController('application.ApplicationHistoryPanel');

        var gridAlias = grid.split('.')[1].toLowerCase();

        var appPanel = this.getView('application.ApplicationPanel');
        var applicationPanel = Ext.create(appPanel, { id: gridAlias, grid: gridAlias, title: title });

        var con = this.getCon('mainFrame.Main');
        con.addTab(applicationPanel);
    },
    getCon: function (applicationPanelPath) {
        var loginApp = this.application;
        return loginApp.getController(applicationPanelPath);
    }
});