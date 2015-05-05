Ext.define('Soims.controller.application.ApplicationHistoryPanel', {
    extend: 'Ext.app.Controller',
    views: ['application.ApplicationHistoryPanel'],
    requires: ['Soims.model.application.common.SampleApplicationType'],
    refs: [{
        ref: 'applicationhistorypanel',
        selector: 'applicationhistorypanel',
        autoCreate: true,
        xtype: 'applicationhistorypanel'
    }],
    init: function () {
        this.control({
//            'applicationhistorypanel': {
//                afterrender: function () {
//                    this.showDefaultHistoryState();
//                }
//            }
        });
    },
    getCon: function (applicationPanelPath) {
        var loginApp = this.application;
        return loginApp.getController(applicationPanelPath);
    }
});