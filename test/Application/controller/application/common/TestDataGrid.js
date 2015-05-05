Ext.define('Soims.controller.application.common.TestDataGrid', {
    extend: 'Ext.app.Controller',
    //    stores: ['application.common.Sample'],
    views: ['application.common.TestDataInfo', 'application.common.TestDataGrid'],
    refs: [{
        ref: 'testdatagrid',
        selector: 'testdatagrid',
        autoCreate: true,
        xtype: 'testdatagrid'
    }, {
        ref: 'testdatainfo',
        selector: 'testdatainfo',
        autoCreate: true,
        xtype: 'testdatainfo'
    }],
    init: function () {
        this.control({
            'testdatagrid  button[itemId=testDelete]': {
                click: function (button, e) {
                    Ext.MessageBox.alert('删除拟提交测试数据', '您确定要删除当前选中的拟提交测试数据？', function (btn) {
                        if (btn == 'ok') {
                            var grid = button.up('gridpanel');
                            var store = grid.getStore();
                            var selection = grid.getSelectionModel();

                            var count = selection.getCount();

                            if (selection.getSelection()[0].get('id') != '') {
                                grid.deleteid = grid.deleteid + ',' + selection.getSelection()[0].get('id');
                            }

                            store.remove(selection.getSelection()[0]);

                            store.commitChanges();
                            grid.getView().refresh();
                        }
                    }, this);
                }
            },
            'testdatagrid': {
                afterrender: function (view) {
                    var appID = view.up('#applicationCommonSampleInfo').applicationID;
                    if (appID) {
                        var store = view.getStore();
                        store.getProxy().setExtraParam('applicationID', appID);
                        store.load();
                    }
                },
                selectionchange: function (selModel, records) {
                    var testgrid = this.getTestdatagrid();

                    if (records.length > 0) {
                        testgrid.down('#testDelete').setDisabled(false);
                    }
                    else {
                        testgrid.down('#testDelete').setDisabled(true);
                    }
                }
            }
        });
    },
    getCon: function (testdatagridPath) {
        var loginApp = this.application;
        return loginApp.getController(testdatagridPath);
    },
    //    storeReload: function (sampleApplicationId) {
    //        var grid = this.getTestdatagrid();
    //        var store = grid.getStore();
    //        store.getProxy().setExtraParam('applicationID', sampleApplicationId);
    //        store.reload();
    //        grid.applicationID = sampleApplicationId;
    //    },
    storeInit: function (leg, gridpanel) {

        var testStore = gridpanel.getStore();

        var addSampleContr = this.getCon('application.common.AddSampleInfo');
        addSampleContr.onAnlyseTestProjectGridInit(testStore, leg);
    },

    storeClearByLeg: function (leg, gridpanel) {

        var testStore = gridpanel.getStore();

        for (var i = 0; i < testStore.getCount(); ) {
            if (testStore.getAt(i).get('leg') == leg) {
                testStore.remove(testStore.getAt(i));
            }
            else {
                i++;
            }
        }
    },
    storeUpdate: function (store, gridpanel) {        //得到编辑界面的store 并更新

        var testStore = gridpanel.getStore();

        store.each(function (record) {
            console.log(record);
            testStore.add(record.copy());
        });

    },
    cloneStoreInit: function (legs, legsID, sample, gridpanel) {

        var testStore = gridpanel.getStore();

        for (var j = 0; j < testStore.getCount(); j++) {
            for (var i = 0; i < sample.getCount(); i++) {
                if (sample.getSelection()[i].get('legID') == testStore.getAt(j).get('legID') && sample.getSelection()[i].get('sampleType') == testStore.getAt(j).get('sampleType')) {

                    var record = testStore.getAt(j).copy();
                    record.set('id', '');
                    record.set('leg', legs);
                    record.set('legID', legsID);
                    testStore.add(record);

                    if (testStore.indexOf(record) <= j) {
                        j++;
                    }
                }
            }
        }
        console.log(testStore);
        gridpanel.getView().refresh();
    },
    deleteRecord: function (record) {
        var gridpanel = this.getTestdatagrid();
        var testStore = gridpanel.getStore();

        for (var i = 0; i < testStore.getCount(); i++) {
            if (record.get('leg') == testStore.getAt(i).get('leg')) {
                if (record.get('sampleType') == testStore.getAt(i).get('sampleType')) {
                    testStore.remove(testStore.getAt(i));
                    i--;
                }
            }
        }
        testStore.commitChanges();
    },
    clonelegStoreInit: function (fromLeg, toLeg, toLegName, sample, grid) {
        var testStore = grid.getStore();


        for (var j = 0; j < testStore.getCount(); j++) {
            for (var i = 0; sample[i]; i++) {

                if (fromLeg == testStore.getAt(j).get('legID') && sample[i].get('sampleType') == testStore.getAt(j).get('sampleType')) {

                    var record = testStore.getAt(j).copy();
                    record.set('id', '');
                    record.set('leg', toLegName);
                    record.set('legID', toLeg);
                    testStore.add(record);

                    if (testStore.indexOf(record) <= j) {
                        j++;
                    }
                }
            }
        }

        grid.getView().refresh();
    }
});