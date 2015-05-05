Ext.define('Soims.controller.voyage.Voyage', {
    extend: 'Ext.app.Controller',
    //requires: ['Soims.store.project.Subject'],
    //stores: ['voyage.Voyage'],
    views: ['voyage.Voyage'],
    refs: [{
        ref: 'voyage',
        selector: 'voyage',
        autoCreate: true,
        xtype: 'voyage'
    }],
    init: function () {
        this.control({
            'voyage  button[itemId=modify]': {
                click: function (button, e) {
                    var model = button.up('panel').getSelectionModel().getSelection()[0];
                    var panels = this.getCon('voyage.EditVoyageTag').getVoyageEditVoyageTagView();
                    var panel = this.showTab('EditVoyage' + model.get('id'), model.get('name'), false, panels, model.get('id'));
                    var form = panel.down('editvoyageleg').down('voyagebasic');
                    form.loadRecord(model);
                    var grid = panel.down('editvoyageleg').down('leggrid');
                    grid.getStore().load();
                }
            },
            'voyage  button[itemId=show]': {
                click: function (button, e) {
                    var model = button.up('panel').getSelectionModel().getSelection()[0];
                    var panels = this.getCon('voyage.EditVoyageTag').getVoyageEditVoyageTagView();
                    var panel = this.showTab('ShowVoyage' + model.get('id'), model.get('name'), true, panels, model.get('id'));
                    var form = panel.down('editvoyageleg').down('voyagebasic');
                    form.loadRecord(model);
                    var grid = panel.down('editvoyageleg').down('leggrid');
                    grid.getStore().load();
                }
            },
            'voyage': {
                //监听panel的行变换事件
                selectionchange: function (selModel, records) {
                    if (records.length != 0) {
                        this.getVoyage().down('#modify').setDisabled(false);
                        this.getVoyage().down('#show').setDisabled(false);
                    } else {
                        this.getVoyage().down('#modify').setDisabled(true);
                        this.getVoyage().down('#show').setDisabled(true);
                    }
                }
            }
        });
    },
    showTab: function (id, title, isShow, panel, voyageId) {
        var con = this.getCon('mainFrame.Main');
        var instance = con.existInstance(id);
        if (!instance) {
            var panelNew = Ext.create(panel, { id: id, title: title, isShow: isShow, voyageId: voyageId });
            con.addTab(panelNew);
            return panelNew;
        } else {
            return instance;
        }
    },
    show: function () {
        var Panel = this.getVoyage();
        var con = this.getCon('mainFrame.Main');
        con.addTab(Panel);
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    }
});