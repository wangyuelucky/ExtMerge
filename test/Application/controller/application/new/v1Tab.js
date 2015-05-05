Ext.define('Soims.controller.application.new.V1Tab', {
    extend: 'Ext.app.Controller',
    views: ['application.new.V1Tab'],
    refs: [{
        ref: 'v1Tab',
        selector: 'v1Tab',
        autoCreate: true,
        xtype: 'v1Tab'
    }],
    init: function () {
        this.control({
            'v1Tab': {
                render: function (panel) {
                    if (panel.isEdit == true || panel.isShow == true) {
                        console.log(panel.isShow);
                        var v1basicinfopanel = panel.down('v1basicinfopanel'),
                            testdatainfo = panel.down('testdatainfo');
                        var comboReport = v1basicinfopanel.down('#report');
                        var storeReport = comboReport.getStore();
                        var comboDivision = v1basicinfopanel.down('#division');
                        var storeDivision = comboDivision.getStore();
                        var store = Ext.create('Soims.store.application.show.V1Detail');

                        store.getProxy().setExtraParam('ID', panel.applicationID);
                        store.load(function () {
                            if (store.getCount() != 0) {
                                // 基本信息
                                storeReport.load(function () {
                                    console.log(store.getAt(0).get('reportName'));
                                    v1basicinfopanel.loadRecord(store.getAt(0));
                                    var record = Ext.create('Soims.model.application.new.Division',
                                    {
                                        'id': store.getAt(0).get('divisionID'),
                                        'name': store.getAt(0).get('divisionName')
                                    });
                                    comboReport.setValue(store.getAt(0).get('reportName'));
                                    storeDivision.getProxy().setExtraParam('reportID', store.getAt(0).get('reportID'));
                                    panel.down('#applicationCommonSampleInfo').applicationID = store.getAt(0).get('id');
                                    storeDivision.load(function () {
                                        console.log(store.getAt(0).get('divisionID'));
                                        console.log(store.getAt(0).get('divisionName'));
                                        comboDivision.setValue(record);
                                    });
                                });
                                //                                panel.loadRecord()
                                // 拟提交成果
                                testdatainfo.loadRecord(store.getAt(0));
                            }
                        });
                    }
                }
            },
            'v1basicinfo  button[itemId=v1Page1Save]': {
                click: function (button, e) {

                }
            },
            'v1basicinfo  button[itemId=v1Page1Next]': {
                click: function (button, e) {
                    var v1TabPanel = button.up('#applicationNewV1BasicInfo').up('v1Tab');
                    v1TabPanel.setActiveTab(1);
                }
            },
            'sampleinfo  button[itemId=v1Page2Later]': {
                click: function (button, e) {
                    var v1TabPanel = button.up('#applicationCommonSampleInfo').up('v1Tab');
                    v1TabPanel.setActiveTab(0);
                }
            },
            'sampleinfo  button[itemId=v1Page2Save]': {
                click: function (button, e) {

                }
            },
            'sampleinfo  button[itemId=v1Page2Preview]': {
                click: this.previewApp
            },
            'sampleinfo  button[itemId=v1Page2Submit]': {
                click: function (button, e) {

                }
            }
        });
    },
    showTab: function (id, title, isShow, panel) {
        var b1Con = this.getCon('application.new.V1BasicInfo');
        var con = this.getCon('mainFrame.Main');

        var instance = con.existInstance(id);
        if (!instance) {
            var panelNew = Ext.create(panel, { id: id, title: title, application: this.application, isShow: isShow });
            con.addTab(panelNew);
            return panelNew;
        } else {
            return instance;
        }
    },
    show: function () {
        var sampleCon = this.getCon('application.common.SampleInfo');

        var panels = this.getApplicationNewV1TabView();
        var panel = this.showTab('NewB1', '创建航次报告任务申请', false, panels);

    },
    getCon: function (v1TabPath) {
        var loginApp = this.application;
        return loginApp.getController(v1TabPath);
    },
    previewApp: function (btn) {
        var applicationID = btn.up('v1Tab').applicationID,
            panels, showCon;
        if (applicationID == undefined) {
            Ext.MessageBox.alert('提示', '请先保存申请基本信息', function () {
                var tabPanel = btn.up('v1Tab');
                tabPanel.setActiveTab(0);
            }, this);
            return;
        }

        panels = this.getCon('application.show.V1Tab').getApplicationShowV1TabView();
        showCon = this.getCon('application.ApplicationGrid');

        showCon.showTab('PreviewV1' + applicationID, '预览航次报告申请', panels, applicationID, true, false);
    }
});