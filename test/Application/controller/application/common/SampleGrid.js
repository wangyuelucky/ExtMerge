Ext.define('Soims.controller.application.common.SampleGrid', {
    extend: 'Ext.app.Controller',
    requires: ['Soims.model.application.common.SampleApplicationType'],
    views: ['application.common.SampleGrid'],
    refs: [{
        ref: 'samplegrid',
        selector: 'samplegrid',
        autoCreate: true,
        xtype: 'samplegrid'
    }],
    init: function () {
        var applicationType = Soims.model.application.common.SampleApplicationType;
        this.control({
            'samplegrid  button[itemId=sampleAdd]': {
                click: function (button, e) {

                    if (!button.up('#applicationCommonSampleInfo').applicationID) {
                        Ext.MessageBox.alert('失败', '请先保存申请基本信息', function () {
                            var b1TabPanel = button.up('#applicationCommonSampleInfo').up('tabpanel');
                            b1TabPanel.setActiveTab(0);
                        }, this);
                        return;
                    }

                    console.log(applicationType.V2.value);
                    if (button.up('samplegrid').type == applicationType.V2.value) {
                        var addSampleInfo = this.getCon('application.common.AddSampleInfo');
                        addSampleInfo.show(undefined, undefined, applicationType.V2.value, button.up('samplegrid'));
                        addSampleInfo.onSampleInfoGridClear();
                        addSampleInfo.sampleInfoFormAddItemForV2();
                        return;
                    }
                    if (button.up('samplegrid').type == applicationType.V3.value) {
                        var addSampleInfo = this.getCon('application.common.AddSampleInfo');
                        addSampleInfo.show(undefined, undefined, applicationType.V3.value, button.up('samplegrid'));
                        addSampleInfo.onSampleInfoGridClear();
                        //this.noLegStoreInit(button.up('samplegrid'));
                        addSampleInfo.sampleInfoFormAddItemForV3();
                        return;
                    }
                    var selectSampleLeg = this.getCon('application.common.SampleLegWindow');
                    selectSampleLeg.show(button.up('#applicationCommonSampleInfo'));

                }
            },
            'samplegrid  button[itemId=sampleClone]': {
                click: function (button, e) {
                    var selectSampleClone = this.getCon('application.common.SampleCloneWindow');
                    var grid = button.up('gridpanel');
                    var sampleStore = grid.getStore();
                    var selection = grid.getSelectionModel().getSelection();
                    selectSampleClone.show(selection, button.up('#applicationCommonSampleInfo'));
                }
            },
            'samplegrid  button[itemId=sampleLegClone]': {
                click: function (button, e) {
                    var selectSampleCloneLeg = this.getCon('application.common.SampleCloneLegWindow');
                    var grid = button.up('gridpanel');
                    selectSampleCloneLeg.show(button.up('#applicationCommonSampleInfo'));
                }
            },
            'samplegrid  button[itemId=sampleModify]': {
                click: function (button, e) {
                    var grid = button.up('gridpanel');
                    var sampleStore = grid.getStore();
                    var selection = grid.getSelectionModel().getSelection()[0];
                    grid.leg = selection.get('leg');
                    grid.legID = selection.get('legID');

                    var addSampleContr = this.getCon('application.common.AddSampleInfo');
                    addSampleContr.show(grid.leg, grid.legID, undefined, grid, selection.get('sampleTypeID'));

                    var win = addSampleContr.getAddsampleinfowindow();
                    win.leg = grid.leg;
                    win.legID = grid.legID;

                    addSampleContr.onSampleInfoGridClear();
                    var copy = this.storeInit(selection.get('leg'), selection, grid);

                    var testDataGridContr = this.getCon('application.common.TestDataGrid');
                    testDataGridContr.storeInit(selection.get('leg'), grid.up('#applicationCommonSampleInfo').down('testdatagrid'));

                    addSampleContr.sampleInfoFormEditItem(copy);
                }
            },
            'samplegrid  button[itemId=sampleDelete]': {
                click: function (button, e) {
                    Ext.MessageBox.alert('删除样品', '您确定要删除当前选中的样品？', function (btn) {
                        if (btn == 'ok') {
                            var grid = button.up('gridpanel');
                            var sampleStore = grid.getStore();
                            var selection = grid.getSelectionModel();
                            var testContr = this.getCon('application.common.TestDataGrid');
                            var count = selection.getCount();
                            for (var i = 0; i < count; i++) {
                                if (selection.getSelection()[0].get('id') != '') {
                                    grid.deleteid = grid.deleteid + ',' + selection.getSelection()[0].get('id');
                                }
                                testContr.deleteRecord(selection.getSelection()[0]);
                                sampleStore.remove(selection.getSelection()[0]);
                            }
                            console.log(grid.deleteid);

                            sampleStore.commitChanges();
                            grid.getView().refresh();

                        }
                    }, this);

                }
            },
            'samplegrid': {
                afterrender: function (view) {
                    var appID = view.up('#applicationCommonSampleInfo').applicationID;


                    if (appID) {
                        var store = view.getStore();
                        store.getProxy().setExtraParam('applicationID', appID);
                        store.load();
                    }
                }
            }
        });
    },
    getCon: function (sampleinfoPath) {
        var loginApp = this.application;
        return loginApp.getController(sampleinfoPath);
    },
    storeInit: function (leg, selection, gridpanel) {         //选择某航段的样品传到编辑界面

        var store = gridpanel.getStore();

        var sampleFormContr = this.getCon('application.common.AddSampleInfo');
        var copy;

        for (var i = 0; i < store.getCount(); i++) {
            var record = store.getAt(i);

            if (record.get('leg') == leg) {
                var anlyse = record.copy();
                Ext.data.Model.id(anlyse);

                sampleFormContr.onSampleInfoGridInit(anlyse);

                if (record == selection) {
                    copy = anlyse;
                }
            }
        }
        return copy;
    },
    noLegStoreInit: function (gridpanel) {         //选择某航段的样品传到编辑界面

        var store = gridpanel.getStore();

        var sampleFormContr = this.getCon('application.common.AddSampleInfo');
        var copy;

        for (var i = 0; i < store.getCount(); i++) {
            var record = store.getAt(i);

            var anlyse = record.copy();
            Ext.data.Model.id(anlyse);

            sampleFormContr.onSampleInfoGridInit(anlyse);
            copy = anlyse;
        }
        return copy;
    },
    storeUpdate: function (store, gridpanel, leg, legID) {        //得到编辑界面的store 并更新

        var sampleStore = gridpanel.getStore();

        for (var i = 0; i < sampleStore.getCount(); ) {
            if (sampleStore.getAt(i).get('leg') == leg) {
                sampleStore.remove(sampleStore.getAt(i));
            }
            else {
                i++;
            }
        }
        store.each(function (record) {
            sampleStore.add(record.copy());

        });
        sampleStore.commitChanges();

    },
    cloneStoreInit: function (leg, legID, gridpanel) {
        var store = gridpanel.getStore();
        var selection = gridpanel.getSelectionModel();
        var deleteAction = false;

        for (var i = 0; i < selection.getCount(); i++) {
            var mark = false;
            for (var j = 0; j < store.getCount(); j++) {
                if (store.getAt(j).get('legID') == legID) {
                    if (store.getAt(j).get('sampleType') == selection.getSelection()[i].get('sampleType')) {
                        mark = true;
                    }
                }
            }
            if (mark) {
                selection.deselect(selection.getSelection()[i], true);
                deleteAction = true;
            }
            else {
                var record = selection.getSelection()[i].copy();
                record.set('id', '');
                record.set('leg', leg);
                record.set('legID', legID);
                record.set('sampleAreaAndCountID', '');
                record.set('samplingArea', '');
                record.set('samplingAreaID', '');
                store.add(record);

            }
        }

        gridpanel.getView().refresh();
        if (deleteAction) {
            Ext.Tools.Msg('样品类型重复的样品只保留第一条', 9);
        }
        Ext.MessageBox.alert('成功', '克隆样品成功！不同航段采样区域不同，请修改采样区域。', function () { }, this);
        return selection;
    },
    clonelegStoreInit: function (fromLegID, toLegID, toLegName, grid) {
        var store = grid.getStore();
        var selection = new Array();
        var count = 0;
        var deleteAction = false;

        for (var i = 0; i < store.getCount(); i++) {
            if (store.getAt(i).get('legID') == fromLegID) {
                var mark = true;
                for (var j = 0; j < store.getCount(); j++) {
                    if (store.getAt(j).get('legID') == toLegID) {
                        if (store.getAt(i).get('sampleType') == store.getAt(j).get('sampleType')) {

                            mark = false;
                            deleteAction = true;
                        }
                    }
                }
                if (mark) {
                    selection.push(store.getAt(i));
                    count++;
                }
            }
        }
        for (var i = 0; i < count; i++) {
            console.log(selection[i].get('sampleType'));
            var record = selection[i].copy();
            record.set('id', '');
            record.set('legID', toLegID);
            record.set('leg', toLegName);
            record.set('sampleAreaAndCountID', '');
            record.set('samplingArea', '');
            record.set('samplingAreaID', '');
            store.add(record);
        }

        grid.getView().refresh();
        if (deleteAction) {
            Ext.Tools.Msg('样品类型重复的样品只保留第一条', 9);
        }
        Ext.MessageBox.alert('成功', '克隆样品成功！不同航段采样区域不同，请修改采样区域。', function () { }, this);
        return selection;
    }
});