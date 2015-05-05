Ext.define('Soims.controller.application.common.SampleInfo', {
    extend: 'Ext.app.Controller',
    //    stores: ['application.common.Sample', 'application.common.TestData'],
    views: ['application.common.SampleInfo', 'application.common.TestDataGrid'],
    refs: [{
        ref: 'sampleinfo',
        selector: 'sampleinfo',
        autoCreate: true,
        xtype: 'sampleinfo'
    }],
    init: function () {
        this.control({
            'sampleinfo button[itemId=samplePage2Save]': {
                click: function (button, e) {
                    var panel = button.up('#applicationCommonSampleInfo');
                    var appID = panel.applicationID;
                    if (!appID) {
                        Ext.MessageBox.alert('失败', '请先保存申请基本信息', function () {
                            var b1TabPanel = panel.up('tabpanel');
                            b1TabPanel.setActiveTab(0);
                        }, this);
                        return;
                    }
                    this.saveAction(appID, panel, true);
                }
            }
        });
        this.getCon('application.common.SampleGrid');
        this.getCon('application.common.SampleGridShow');
        this.getCon('application.common.TestDataGrid');
    },
    getCon: function (sampleinfoPath) {
        var loginApp = this.application;
        return loginApp.getController(sampleinfoPath);
    },
    saveAction: function (applicationID, panel, bool) {
        this.sampleDelete(panel.down('samplegrid').deleteid);
        this.testDataDelete(panel.down('testdatagrid').deleteid);
        this.sampleSave(applicationID, panel, bool);
        //        this.commitResultSave(applicationID, panel);

        panel.down('samplegrid').deleteid = '';
        panel.down('testdatagrid').deleteid = '';
    },
    commitResultSave: function (applicationID, panel) {

        var testpanel = panel.down('testdatainfo');
        console.log(testpanel);
        var commitresultamount = testpanel.down('textfield[name=commitResultAmount]').getValue();
        var commitresultform = testpanel.down('textfield[name=commitResultForm]').getValue();
        var commitresulttime = testpanel.down('textfield[name=commitResultTime]').getValue();

        var params = {
            applicationID: applicationID,
            commitResultAmount: commitresultamount,
            commitResultForm: commitresultform,
            commitResultTime: commitresulttime
        };
        Ext.Ajax.request({
            url: Soims.service.applications.ApplicationsService + '/CommitResultSave',
            params: params,
            success: function (response) {
                if (response.responseText) {

                }
            }
        });
    },
    testDataSave: function (sampleData, sampleID, panel, bool) {

        var testGrid = panel.down('testdatagrid');
        var testStore = testGrid.getStore();

        testStore.each(function (record) {
            if (record.get('legID') == sampleData.legID) {
                if (record.get('sampleType') == sampleData.sampleType) {
                    record.set('sampleID', sampleID);
                    Ext.Ajax.request({
                        async: false,
                        url: Soims.service.samples.TestDataService + '/Save',
                        params: record.data,
                        success: function (response) {
                            record.set('id', response.responseText);
                        }
                    });
                }
            }
        });
        if (bool) {
            Ext.MessageBox.alert('成功', '信息保存成功！', function () { }, this);
            var appID = panel.applicationID;
            var sampleGrid = panel.down('samplegrid');
            var sampleStore = sampleGrid.getStore();


            sampleStore.getProxy().setExtraParam('applicationID', appID);
            sampleStore.reload();
            testStore.getProxy().setExtraParam('applicationID', appID);
            testStore.reload();
        }

    },
    sampleDelete: function (idList) {
        var params = {
            id: idList
        };
        Ext.Ajax.request({
            url: Soims.service.samples.SampleService + '/Delete',
            params: params,
            async: false,
            success: function (response) {

            }
        });
    },
    testDataDelete: function (idList) {
        var params = {
            id: idList
        };
        Ext.Ajax.request({
            url: Soims.service.samples.TestDataService + '/Delete',
            params: params,
            async: false,
            success: function (response) {

            }
        });
    },
    sampleSave: function (applicationID, panel, bool) {
        var sampleGrid = panel.down('samplegrid');
        var sampleStore = sampleGrid.getStore();
        var count = sampleStore.getCount(), i = 0;
        var me = this;
        var finish = false;
        sampleStore.each(function (record) {
            record.set('sampleApplication', applicationID);
            Ext.Ajax.request({
                url: Soims.service.samples.SampleService + '/Save',
                params: record.data,
                async: false,
                success: function (response) {
                    var idlist = response.responseText.split(',');
                    record.set('id', idlist[0]);
                    record.set('sampleAreaAndCountID', idlist[1]);
                    i++;
                    if (count == i && bool == true) {
                        finish = true;
                    }
                    //                    console.log(response.responseText);
                    me.testDataSave(record.data, idlist[0], panel, finish);
                }
            });
        });

    },
    showTab: function (id, isShow, panel, applicationID) {
        var con = this.getCon('application.new.B1Tab');
        var instance = con.existInstance(id);
        if (!instance) {
            var panelNew = Ext.create(panel, { id: id, isShow: isShow, applicationID: applicationID });
            con.addTab(panelNew);
            return panelNew;
        } else {
            return instance;
        }
    }
});