Ext.define('Soims.controller.application.common.AddSampleInfo', {
    extend: 'Ext.app.Controller',
    stores: ['application.common.AddAnlyseTestProject', 'application.common.AddSample', 'Soims.model.application.common.SampleApplicationType'],
    models: 'application.common.AnlyseTestProject',
    views: ['application.common.AddSampleInfoWindow'],
    refs: [{
        ref: 'addsampleinfowindow',
        selector: 'addsampleinfowindow',
        autoCreate: true,
        xtype: 'addsampleinfowindow'
    }, {
        ref: 'sampleinfogrid',
        selector: 'sampleinfogrid',
        autoCreate: true,
        xtype: 'sampleinfogrid'
    }, {
        ref: 'sampleinfoform',
        selector: 'sampleinfoform',
        autoCreate: true,
        xtype: 'sampleinfoform'
    }, {
        ref: 'anlysetestprojectgrid',
        selector: 'anlysetestprojectgrid',
        autoCreate: true,
        xtype: 'anlysetestprojectgrid'
    }],
    init: function () {
        this.control({
            'sampleinfoform treefield[name=sampleTypeID]': {
                afterdetermine: this.onSampleTypeChange
            },
            'sampleinfoform treefield[name=samplePreparationID]': {
                beforecreatepicker: this.onSamplePreparationBeforeLoad
            },
            'sampleinfoform treefield[name=samplingAreaID]': {
                beforecreatepicker: this.onsamplingAreaBeforeLoad
            },
            'sampleinfoform treefield[name=anlyseTestProjectID]': {
                beforecreatepicker: this.onAnlyseTestProjectBeforeLoad,
                afterdetermine: this.onAnlyseTestProjectChange
            },
            'sampleinfoform button[action=save]': {
                click: this.onClickSaveBut
            },
            'sampleinfoform button[action=add]': {
                click: this.onSampleInfoFormAddItem
            },
            'sampleinfoform button[action=delete]': {
                click: this.onClickSampleInfoGridDeleteBtn
            },
            'sampleinfoform button[action=finish]': {
                click: this.onClickfinish
            },
            'sampleinfoform button[action=clone]': {
                click: this.onClickclone
            },
            'sampleinfogrid': {
                selectionchange: this.onSampleInfoGridSelectionchange
            }
        });
    },
    show: function (leg, legID, type, grid, sampleTypeID) {

        var sampleWindowClas = this.getApplicationCommonAddSampleInfoWindowView();
        var title = leg == undefined ? '编辑样品（室内）' : '编辑样品' + '(第' + leg + '航段)';

        var sampleWindow = Ext.create(sampleWindowClas, { title: title, type: type, grid: grid, leg: leg, legID: legID, sampleTypeID: sampleTypeID });
        sampleWindow.show();
    },
    getController: function (path) {
        var loginApp = this.application;
        return loginApp.getController(path);
    },
    cloneForm: function () {
        var form = this.getSampleinfoform();
        form.down('#finish').hide();
        form.down('#clone').show();
    },
    // ========================================== sampleinfoform ========================================== /
    /**
    *  控制添加、修改、删除按钮
    */
    shiftOffAddBtn: function (disabled) {
        var infoForm;

        infoForm = this.getSampleinfoform();
        infoForm.down('button[action=add]').setDisabled(disabled);
        infoForm.down('button[action=save]').setDisabled(!disabled);
        infoForm.down('button[action=delete]').setDisabled(!disabled);
    },
    onAnlyseTestProjectBeforeLoad: function (tree) {
        var infoForm = this.getSampleinfoform(),
            sampleTypeValue = infoForm.down('treefield[name=sampleTypeID]').getValue(),
            sampleTypeID = sampleTypeValue.split(',')[0];

        if (!sampleTypeID) {
            Ext.Tools.Msg('请先选择样品类型！', 9);
            return false;
        }
        return true;
    },
    onSamplePreparationBeforeLoad: function (tree) {
        var infoForm = this.getSampleinfoform(),
            sampleTypeValue = infoForm.down('treefield[name=sampleTypeID]').getValue(),
            sampleTypeID = sampleTypeValue.split(',')[0];

        if (!sampleTypeID) {
            Ext.Tools.Msg('请先选择样品类型！', 9);
            return false;
        }
        return true;
    },
    onsamplingAreaBeforeLoad: function (tree) {
        var infoForm = this.getSampleinfoform(),
            sampleTypeValue = infoForm.down('treefield[name=sampleTypeID]').getValue(),
            sampleTypeID = sampleTypeValue.split(',')[0];

        if (!sampleTypeID && this.isSamplingAreaBySampleType()) {
            Ext.Tools.Msg('请先选择样品类型！', 9);
            return false;
        }
        return true;
    },
    // 根据申请书类型判断，是否根据样品类型加载采样区域
    // 只有V2、V3申请书按样品类型加载采样区域
    isSamplingAreaBySampleType: function () {
        var infoWin = this.getAddsampleinfowindow(),
            appType = infoWin.type;

        return appType == Soims.model.application.common.SampleApplicationType.V2.value ||
                appType == Soims.model.application.common.SampleApplicationType.V3.value;
    },
    /**
    *  设置某一列的itemid
    */
    setItemIDByCol: function (colName, itemID) {
        var selectedRecord = this.findRecordByInfoForm();
        selectedRecord.set(colName, itemID);
    },
    /**
    *  选择样品类型(单选)的事件
    */
    onSampleTypeChange: function (field, newValue, oldValue) {
        var infoForm = this.getSampleinfoform(),
            cancelVerify = infoForm.cancelVerify,
            state = infoForm.state,
            sampleGridStore, sample, matchRecord, formRecord, typeName;

        if (newValue && newValue !== oldValue) { // 只有选择值时验证，清空不验证
            newValue = newValue.split(',')[0].split('|')[0]; // 因为单选的时候，也会带上一个逗号;其他的时候会带上|
            sampleGridStore = this.getSampleinfogrid().getStore();
            matchRecord = sampleGridStore.findRecord('sampleTypeID', newValue);
            formRecord = infoForm.getRecord();
            if (matchRecord !== null && matchRecord != formRecord) {
                Ext.Tools.Msg('您选择的样品，在本航段已经申请过，请重新选择！', 9);
                field.reset();
            } else {
                this.afterSampleTypeChange(newValue);
            }
        }

    },
    afterSampleTypeChange: function (sampleTypeID) {
        var infoForm = this.getSampleinfoform(),
            anlyseTestProject = infoForm.down('treefield[name=anlyseTestProjectID]'),
            samplePreparation = infoForm.down('treefield[name=samplePreparationID]'),
            samplingArea = infoForm.down('treefield[name=samplingAreaID]');

        anlyseTestProject.setValue('');
        anlyseTestProject.clearRootChilds();

        samplePreparation.setValue('');
        samplePreparation.clearRootChilds();

        samplingArea.setValue('');
        samplingArea.clearRootChilds();

        this.loadTreeNodeBySampleType(anlyseTestProject, sampleTypeID);
        this.loadTreeNodeBySampleType(samplePreparation, sampleTypeID);

        if (this.isSamplingAreaBySampleType) { // 如果是v3或者v4的话，采样区域需要按样品类型重新加载
            this.loadTreeNodeBySampleType(samplingArea, sampleTypeID);
        }
    },
    loadTreeNodeBySampleType: function (treeField, typeID) {
        treeField.getStore().getProxy().setExtraParam('sampleTypeID', typeID);
        treeField.loadChild();
    },
    // 根据给定field设置model中相应的ID和Name
    // 此方法是treeField选择之后的回调事件
    // 注意：newValue的格式是'2,3,5,'
    onTreeFieldSelectionChange: function (field, newValue) {
        var raw = field.getRawValue(),
            fieldID = field.getName(),
            fieldName = fieldID.substring(0, fieldID.length - 2);

        if (newValue) {
            this.setItemIDByCol(fieldName, raw);
            this.setItemIDByCol(fieldID, newValue.substring(0, newValue.length - 1));
        }
    },

    /**
    *  选择分析测试指标的事件
    */
    onAnlyseTestProjectChange: function (field, newValue, oldValue) {
        var items = [], len, treeField, itemsID;

        if (!!newValue && newValue !== oldValue) {
            itemsID = newValue ? newValue.substring(0, newValue.length - 1).split(',') : [];

            items = field.getRawValue().split(']');
            len = items.length;

            for (var i = 0; i < len - 1; i++) {
                res = items[i].replace(/\[/g, ""); //去掉】
                this.markNewTreeItems(res, itemsID[i]);
            }
            this.removeUnCheckTreeItems();
            this.loadDataFromInfoGrid2AnalyseGrid();
        }
    },
    /**
    *  获取inform对应的record
    */
    findRecordByInfoForm: function () {
        var infoForm = this.getSampleinfoform();
        return infoForm.getRecord();
    },
    /**
    *  把用户新选择的测试指标，放到列表中
    *  并保持，之前的选择不被覆盖
    */
    markNewTreeItems: function (itemValue, itemID) {
        var infoForm = this.getSampleinfoform(),
            selectedRecord = this.findRecordByInfoForm(),
            oldAnlyse,
            analyses, anlyse, sampleType, usePurpose;

        analyses = selectedRecord.Anlyses();
        oldAnlyse = analyses.findRecord('anlyseTestProject', itemValue);

        if (oldAnlyse) {
            oldAnlyse.set('isChecked', true);
        } else { // 新指标
            sampleType = infoForm.down('treefield[name=sampleTypeID]').getRawValue();
            usePurpose = infoForm.down('treefield[name=usePurposeID]').getRawValue();

            anlyse = Soims.model.application.common.AnlyseTestProject.create({
                id: '',
                leg: this.getAddsampleinfowindow().leg,
                legID: this.getAddsampleinfowindow().legID,
                sampleType: sampleType,
                usePurpose: usePurpose,
                anlyseTestProject: itemValue,
                anlyseTestProjectID: itemID,
                intendCommitTestData: '',
                commitTestDataTime: '',
                isChecked: true
            });
            analyses.add(anlyse);
        }
    },
    /**
    *  去掉取消勾选的测试指标
    */
    removeUnCheckTreeItems: function () {
        var selectedRecord = this.findRecordByInfoForm(),
            analyses, anlyse, i, len, datas = [];

        analyses = selectedRecord.Anlyses();

        for (i = 0, len = analyses.getCount(); i < len; i++) {
            anlyse = analyses.getAt(i);
            if (!anlyse.get('isChecked')) {
                datas.push(anlyse);
            } else {
                anlyse.set('isChecked', false);
            }
        }
        analyses.remove(datas);
    },
    /**
    *  根据Form的record更新测试指标列表
    */
    loadDataFromInfoGrid2AnalyseGrid: function () {
        var infoForm = this.getSampleinfoform(),
            anlyGridStore = infoForm.down('anlysetestprojectgrid').getStore(),
            selectedRecord, analyses, data = [];

        selectedRecord = this.findRecordByInfoForm();
        analyses = selectedRecord.Anlyses();
        anlyGridStore.loadData(analyses.data.items, false);
    },
    onClickfinish: function (button, e) {
        var anlyseGridStore, sampleGridStore, sampleGridContr, testGridContr, infoForm;
        var window = this.getAddsampleinfowindow();
        infoForm = this.getSampleinfoform();
        if (infoForm.isDirty() && infoForm.isValid()) {
            Ext.Tools.Msg('请先保存当前样品!', 9);
            return false;
        } else {
            anlyseGridStore = this.getAnlysetestprojectgrid().getStore();
            anlyseGridStore.commitChanges();

            sampleGridStore = this.getSampleinfogrid().getStore();
            sampleGridStore.commitChanges();

            sampleGridContr = this.getController('application.common.SampleGrid');
            sampleGridContr.storeUpdate(sampleGridStore, window.grid, window.leg, window.legID);

            testGridContr = this.getController('application.common.TestDataGrid');
            testgrid = window.grid.up('#applicationCommonSampleInfo').down('testdatagrid');
            testGridContr.storeClearByLeg(this.getAddsampleinfowindow().leg, testgrid);
            testgrid.getView().refresh();

            sampleGridStore.each(function (record) {

                testGridContr.storeUpdate(record.Anlyses(), window.grid.up('#applicationCommonSampleInfo').down('testdatagrid'));
            });

            window.un('beforeclose', window.onClose);
            window.close();
            window.on('beforeclose', window.onClose);
            return true;
        }
    },
    onClickclone: function () {

        anlyseGridStore = this.getAnlysetestprojectgrid().getStore();
        anlyseGridStore.commitChanges();

        sampleGridStore = this.getSampleinfogrid().getStore();
        sampleGridStore.commitChanges();

        var sampleGridContr = this.getController('application.common.SampleGrid');
        sampleGridContr.cloneStoreUpdate(sampleGridStore);

        var testGridContr = this.getController('application.common.TestDataGrid');
        sampleGridStore.each(function (record) {
            testGridContr.storeUpdate(record.Anlyses());
        });

        var window = this.getAddsampleinfowindow();
        window.close();
    },
    onClickSaveBut: function (but) {
        this.onSampleInfoFormAddItem();

    },
    // ========================================== sampleinfogrid ========================================== /
    onSampleInfoGridSelectionchange: function (selecModel, data) {
        var s1 = Date.now();
        if (data.length >= 1) {
            this.shiftOffAddBtn(true);
            this.setSampleType2TreeStore(data[0].get('sampleTypeID').split(',')[0]);
            this.infoFormLoadRecord(data[0], false, 'u');

            // 加载测试指标列表
            this.loadDataFromInfoGrid2AnalyseGrid();
        } else {
            this.shiftOffAddBtn(false);
        }

    },
    setSampleType2TreeStore: function (sampleTypeID) {
        var infoForm = this.getSampleinfoform(),
            anlyseTestProjectStore = infoForm.down('treefield[name=anlyseTestProjectID]').getStore(),
            samplePreparationStore = infoForm.down('treefield[name=samplePreparationID]').getStore(),
            samplingAreaStore = infoForm.down('treefield[name=samplingAreaID]').getStore();

        anlyseTestProjectStore.getProxy().setExtraParam('sampleTypeID', sampleTypeID.split('|')[0]);
        samplePreparationStore.getProxy().setExtraParam('sampleTypeID', sampleTypeID.split('|')[0]);
        samplingAreaStore.getProxy().setExtraParam('sampleTypeID', sampleTypeID.split('|')[0]);
    },
    /**
    *  样品Form加载数据
    */
    infoFormLoadRecord: function (record, cancelVerify, state) {
        var infoForm = this.getSampleinfoform(),
            sampleGridStore, msg;

        infoForm.state = state; // 标志保存或新建
        infoForm.cancelVerify = cancelVerify; // 防止加载数据时，触发save button的enable事件
        infoForm.loadRecord(record);
        infoForm.cancelVerify = false;
    },
    onSampleInfoGridInit: function (record) {
        var sampleGridStore = this.getSampleinfogrid().getStore();
        record.Anlyses().removeAll();
        sampleGridStore.add(record);
    },
    onAnlyseTestProjectGridInit: function (store, leg) {
        console.log(store);
        var sampleGridStore = this.getSampleinfogrid().getStore();
        sampleGridStore.each(function (sampleRecord) {
            var anlyses = sampleRecord.Anlyses();
            store.each(function (testRecord) {
                if (testRecord.get('leg') == leg) {
                    if (testRecord.get('sampleType') == sampleRecord.get('sampleType')) {
                        var anlyse = testRecord.copy();
                        Ext.data.Model.id(anlyse);
                        anlyses.add(anlyse);
                    }
                }
            });
        });
    },
    onSampleInfoGridClear: function () {

        this.clearSampleinfoGrid();
        this.clearAnlysetestGrid();
    },
    clearSampleinfoGrid: function () {
        this.getSampleinfogrid().getStore().removeAll();
    },
    clearAnlysetestGrid: function () {
        this.getAnlysetestprojectgrid().getStore().removeAll();
    },
    onSampleInfoFormAddItem: function (but) {
        var infoForm = this.getSampleinfoform(),
            formValid = infoForm.isValid(),
            grid = this.getAnlysetestprojectgrid(),
            gridValid = grid.isValid();

        if (formValid && gridValid) {
            this.saveOrUpdateSampleInfoForm();
            Ext.Tools.Msg('样品操作完成！', 0);
        } else {
            Ext.Tools.Msg('请确保信息完整、有效！', 9);
        }
    },
    saveOrUpdateSampleInfoForm: function () {
        var record, sampleinfoGrid, selModel, sampleGridStore, anlyseGridStore;

        record = this.setFormValue2Record();
        this.getAnlysetestprojectgrid().getStore().commitChanges();

        sampleinfoGrid = this.getSampleinfogrid();
        sampleGridStore = sampleinfoGrid.getStore();

        // 如果store中没有record的话，加入到store中
        if (sampleGridStore.indexOf(record) === -1) {
            sampleGridStore.insert(0, record);
        }
        this.sampleInfoFormAddItem(this.getAddsampleinfowindow().leg, this.getAddsampleinfowindow().legID);
        sampleGridStore.commitChanges();

        selModel = sampleinfoGrid.getSelectionModel();
        selModel.deselectAll();

        this.shiftOffAddBtn(false);
    },
    sampleInfoFormEditItem: function (record) {

        var sampleinfoGrid = this.getSampleinfogrid();
        var selModel = sampleinfoGrid.getSelectionModel();
        //        record.Anlyses().removeAll();
        //        record.Anlyses().commitChanges();
        //        console.log(record);
        selModel.select(record);
        console.log(selModel.getCount());
    },
    /**
    *  把样品表单的数据绑定到record
    */
    setFormValue2Record: function () {
        var record,
            infoForm = this.getSampleinfoform(),
            formValues = infoForm.getValues(),
            sampleType = infoForm.down('treefield[name=sampleTypeID]').getRawValue(),
            samplingMethod = infoForm.down('inputfield[name=samplingMethodID]').getRawValue(),
            usePurpose = infoForm.down('treefield[name=usePurposeID]').getRawValue(),
            involvedSubject = infoForm.down('treefield[name=involvedSubjectID]').getRawValue(),
            samplingArea = infoForm.down('treefield[name=samplingAreaID]').getRawValue(),
            samplePreparation = infoForm.down('treefield[name=samplePreparationID]').getRawValue(),
            anlyseTestProject = infoForm.down('treefield[name=anlyseTestProjectID]').getRawValue();

        record = infoForm.getRecord();
        record.set(formValues);
        record.set('sampleType', sampleType);
        record.set('samplingMethod', samplingMethod);
        record.set('usePurpose', usePurpose);
        record.set('involvedSubject', involvedSubject);
        record.set('samplingArea', samplingArea);
        record.set('samplePreparation', samplePreparation);
        record.set('anlyseTestProject', anlyseTestProject);

        return record;
    },
    /**
    *  添加样品
    */
    sampleInfoFormAddItem: function (leg, legID) {
        var sample = Soims.model.application.common.Sample.create({
            legID: legID,
            leg: leg
        });


        this.infoFormLoadRecord(sample, true, 'n');
        this.clearAnlysetestGrid();
    },
    sampleInfoFormAddItemForV2: function (leg, legID) {
        var sample = Soims.model.application.common.Sample.create({
    });

    this.infoFormLoadRecord(sample, true, 'n');
    this.clearAnlysetestGrid();
},
sampleInfoFormAddItemForV3: function (leg, legID) {
    var sample = Soims.model.application.common.Sample.create({
});

this.infoFormLoadRecord(sample, true, 'n');
this.clearAnlysetestGrid();
},
onClickSampleInfoGridDeleteBtn: function () {
    var selModel, selections;

    selModel = this.getSampleinfogrid().getSelectionModel();
    selections = selModel.getSelection();

    if (selections.length < 1) {
        Ext.Tools.Msg('请选择样品条目！', 9);
    } else {
        Ext.Tools.Alert('删除样品', '您确定要删除当前选中的样品？', 'q', this.deleteSampleItemConfirm, this, Ext.MessageBox.YESNO);
    }
},
deleteSampleItemConfirm: function (buttonId) {
    var store, selModel, selections;

    if (buttonId == 'yes') {
        store = this.getSampleinfogrid().getStore();
        selModel = this.getSampleinfogrid().getSelectionModel();
        selections = selModel.getSelection();

        store.remove(selections);
        this.afterDeleteSampleItem();
    }
},
afterDeleteSampleItem: function () {
    var record;

    record = this.findRecordByInfoForm();
    this.sampleInfoFormAddItem(this.getAddsampleinfowindow().leg);
    this.shiftOffAddBtn(false);
}
});