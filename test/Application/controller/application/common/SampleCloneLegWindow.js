Ext.define('Soims.controller.application.common.SampleCloneLegWindow', {
    extend: 'Ext.app.Controller',
    views: ['application.common.SampleCloneLegWindow'],
    refs: [{
        ref: 'sampleclonelegwindow',
        selector: 'sampleclonelegwindow',
        autoCreate: true,
        xtype: 'sampleclonelegwindow'
    }],
    init: function () {
        this.control({
            'sampleclonelegwindow button[itemId=LegSave]': {
                click: function (button, e) {
                    var window = button.up('window');
                    var grid = window.grid;
                    var store2 = window.down('combobox[itemId=toleg]').getStore();
                    var leg1 = window.down('combobox[itemId=fromleg]').getValue();
                    var leg2 = window.down('combobox[itemId=toleg]').getValue();
                    var leg2Name = store2.getAt(store2.find('id', leg2)).get('leg');

                    window.close();
                    this.clonelegStoreInit(leg1, leg2, leg2Name, grid.down('samplegrid'));
                }
            },
            'sampleclonelegwindow button[itemId=LegCancel]': {
                click: function (button, e) {
                    var window = button.up('window');
                    window.close();
                }
            },
            'sampleclonelegwindow combobox[itemId=clonelegleg]': {
                select: function (combo, records, eOpts) {

                    this.getSampleclonelegwindow().leg = records[0].get('leg');
                    this.getSampleclonelegwindow().legID = records[0].get('id');
                }
            },
            'sampleclonelegwindow': {
                beforerender: function (view) {
                    var samplestore = view.grid.down('samplegrid').getStore();
                    var store = view.down('combobox[name=fromleg]').getStore();
                    var store2 = view.down('combobox[name=toleg]').getStore();
                    var applicationID = view.grid.applicationID;
                    samplestore.each(function (record) {
                        var mark = true;
                        store.each(function (leg) {
                            if (record.get('legID') == leg.get('legID')) {
                                mark = false;
                            }
                        });
                        if (mark) {
                            var leg = Soims.model.application.common.Leg.create({
                                id: record.get('legID'),
                                leg: record.get('leg')
                            });
                            store.add(leg);
                        }
                    });
                   
                    //                    store.getProxy().setExtraParam('applicationID', applicationID);
                    //                    store.load();
//                    store2.getProxy().setExtraParam('applicationID', applicationID);
//                    store2.load();
                }
            }
        });
    },
    show: function (grid) {
        var window = this.getApplicationCommonSampleCloneLegWindowView();
        var sampleclonelegwindow = Ext.create(window, { grid: grid });
        sampleclonelegwindow.grid = grid;
        sampleclonelegwindow.show();
    },
    getCon: function (sampleCloneLegWindowPath) {
        var loginApp = this.application;
        return loginApp.getController(sampleCloneLegWindowPath);
    },

    clonelegStoreInit: function (leg1, leg2, leg2Name, grid) {

        var sampleGridContr = this.getCon('application.common.SampleGrid');

        var sample = sampleGridContr.clonelegStoreInit(leg1, leg2, leg2Name, grid);

        var testDataGridContr = this.getCon('application.common.TestDataGrid');

        testDataGridContr.clonelegStoreInit(leg1, leg2, leg2Name, sample, grid.up('#applicationCommonSampleInfo').down('testdatagrid'));
    }
});