Ext.define('Soims.controller.voyage.EditVoyageTag', {
    extend: 'Ext.app.Controller',
    views: ['voyage.EditVoyageTag'],
    refs: [{
        ref: 'editvoyagetag',
        selector: 'editvoyagetag',
        autoCreate: true,
        xtype: 'editvoyagetag'
    }],
    init: function () {
        this.getCon('voyage.EditVoyageLeg');
        this.getCon('voyage.EditVoyageTask');
        this.getCon('voyage.EditVoyageReport');
        this.getCon('voyage.BoardPeople');

        this.control({
        });
    },
    show: function () {
        var panels = this.getVoyageEditVoyageTagView();
        var con = this.getCon('voyage.Voyage');
        var panel = con.showTab('newVoyage', '新建航次航段', false, panels, undefined);
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    }
});