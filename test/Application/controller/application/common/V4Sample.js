Ext.define('Soims.controller.application.common.V4Sample', {
    extend: 'Ext.app.Controller',
    views: ['application.common.V4Sample'],
    refs: [{
        ref: 'v4sample',
        selector: 'v4sample',
        autoCreate: true,
        xtype: 'v4sample'
    }, {
        ref: 'v4samplegrid',
        selector: 'v4samplegrid',
        autoCreate: true,
        xtype: 'v4samplegrid'
    }],
    init: function () {
        this.control({
            'v4sample button[itemId=v4SampleSave]': {
                click: function (button, e) {

                    var panel = button.up('#applicationCommonV4Sample');
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
            },
            'v4sample button[itemId=addSample]': {
                click: function (button) {
                    var panel = button.up('#applicationCommonV4Sample');

                    if (panel.applicationID == undefined) {
                        Ext.MessageBox.alert('失败', '请先保存申请基本信息', function () {
                            var tabPanel = panel.up('tabpanel');
                            tabPanel.setActiveTab(0);
                        }, this);
                        return;
                    }
                    var model = Ext.create('Soims.model.application.common.Sample');

                    panel.down('#applicationCommonV4SampleGrid').getStore().insert(0, model);
                    panel.down('#applicationCommonV4SampleGrid').getView().refresh();
                }
            },
            'v4sample button[itemId=deleteSample]': {
                click: function (button, e) {
                    Ext.MessageBox.confirm('确认', '确认删除此样品？点击保存按钮生效。',
                    function (btn) {
                        if (btn == 'yes') {
                            var panel = button.up('#applicationCommonV4Sample');
                            var gridPanel = button.up('#applicationCommonV4SampleGrid');
                            var selectionModel = gridPanel.getSelectionModel();
                            var record = selectionModel.getSelection()[0];
                            panel.deleteid = panel.deleteid + ',' + record.get('id');
                            gridPanel.getStore().remove(record);

                        }
                    }, this);
                }
            },
            'v4sample': {
                afterrender: function (view) {
                    var appID = view.applicationID;

                    if (appID) {
                        var store = view.down('#applicationCommonV4SampleGrid').getStore();
                        store.getProxy().setExtraParam('applicationID', appID);
                        store.load();
                    }
                }
            }
        });
    },
    getCon: function (v4SamplePath) {
        var loginApp = this.application;
        return loginApp.getController(v4SamplePath);
    },
    saveAction: function (appID, panel, bool) {
        this.sampleDelete(panel.deleteid);
        this.sampleSave(appID, panel, bool);
        this.commitResultSave(appID, panel);
        panel.deleteid = '';
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
    sampleSave: function (appID, panel, bool) {
        var sampleGrid = panel.down('#applicationCommonV4SampleGrid');
        var sampleStore = sampleGrid.getStore();

        var me = this;

        sampleStore.each(function (record) {
            record.set('sampleApplication', appID);
            if (record.get('sampleTypeID') == '') {
                record.set('sampleTypeID', record.get('sampleType'));

            }
            if (record.get('usePurposeID') == '') {
                record.set('usePurposeID', record.get('usePurpose'));
            }
            Ext.Ajax.request({
                url: Soims.service.samples.SampleService + '/Save',
                params: record.data,
                async: false,
                success: function (response) {
                    var idlist = response.responseText.split(',');
                    record.set('id', idlist[0]);
                    record.set('sampleAreaAndCountID', idlist[1]);
                }
            });
            if (bool) {
                Ext.MessageBox.alert('成功', '信息保存成功！', function () { }, this);
            }
            sampleStore.getProxy().setExtraParam('applicationID', appID);
            sampleStore.load();
        });
    },
    commitResultSave: function (appID, panel) {

        var activityStartTime = panel.down('textfield[name=activityStartTime]').getValue();
        var activityEndTime = panel.down('textfield[name=activityEndTime]').getValue();

        var params = {
            applicationID: appID,
            activityStartTime: activityStartTime,
            activityEndTime: activityEndTime
        };
        Ext.Ajax.request({
            url: Soims.service.applications.ApplicationsService + '/ActivityTimeSave',
            params: params,
            success: function (response) {
            }
        });
    }
});