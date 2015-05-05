Ext.define('Soims.controller.application.common.SampleCloneWindow', {
    extend: 'Ext.app.Controller',
    views: ['application.common.SampleCloneWindow'],
    refs: [{
        ref: 'sampleclonewindow',
        selector: 'sampleclonewindow',
        autoCreate: true,
        xtype: 'sampleclonewindow'
    }],
    init: function () {
        this.control({
            'sampleclonewindow button[itemId=LegSave]': {
                click: function (button, e) {
                    var window = button.up('window');
                    var grid = window.grid;
                    var leg = this.getSampleclonewindow().leg;
                    var legID = this.getSampleclonewindow().legID;

                    window.close();
                    this.cloneStoreInit(leg, legID, grid.down('samplegrid'));
                }
            },
            'sampleclonewindow button[itemId=LegCancel]': {
                click: function (button, e) {
                    var window = button.up('window');
                    window.close();
                }
            },
            'sampleclonewindow combobox[itemId=cloneleg]': {
                select: function (combo, records, eOpts) {

                    this.getSampleclonewindow().leg = records[0].get('leg');
                    this.getSampleclonewindow().legID = records[0].get('id');
                }
            },
            'sampleclonewindow': {
                beforerender: function (view) {
                    var contr = this.getCon('application.new.B1BasicInfo');
                    var b1 = contr.getB1BasicInfo();
                    var voyageid = b1.down('combobox[name=voyageTask]').getValue();
                    var store = view.down('combobox[name=cloneleg]').getStore();
                    
                    var applicationID = view.grid.applicationID;

                    store.getProxy().setExtraParam('applicationID', applicationID);
                    store.getProxy().setExtraParam('voyageTaskId', voyageid);
                    store.load(function (records, operation, success) {
                        for (var i = 0; view.selectSample[i]; i++) {
                            for (var j = 0; j < store.getCount(); ) {
                                if (store.getAt(j).get('id') == view.selectSample[i].get('legID')) {
                                    store.remove(store.getAt(j));
                                }
                                else {
                                    j++;
                                }
                            }
                        }

                    });
                }
            }
        });
    },
    show: function (store, grid) {
        var window = this.getApplicationCommonSampleCloneWindowView();
        var sampleclonewindow = Ext.create(window, { grid: grid });
        sampleclonewindow.selectSample = store;
        sampleclonewindow.grid = grid;
        sampleclonewindow.show();
    },
    getCon: function (sampleCloneWindowPath) {
        var loginApp = this.application;
        return loginApp.getController(sampleCloneWindowPath);
    },
    storeInit: function (leg, legID) {
        var sampleGridContr = this.getCon('application.common.SampleGrid');
        sampleGridContr.leg = leg;
        sampleGridContr.storeInit(leg);

        var testDataGridContr = this.getCon('application.common.TestDataGrid');
        testDataGridContr.storeInit(leg);
    },
    cloneStoreInit: function (leg, legID, grid) {

        var sampleGridContr = this.getCon('application.common.SampleGrid');
        sampleGridContr.leg = leg;
        sampleGridContr.legID = legID;
        var sample = sampleGridContr.cloneStoreInit(leg, legID, grid);

        var testDataGridContr = this.getCon('application.common.TestDataGrid');

        testDataGridContr.cloneStoreInit(leg, legID, sample, grid.up('#applicationCommonSampleInfo').down('testdatagrid'));
    }
});