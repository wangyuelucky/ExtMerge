Ext.define('Soims.controller.application.new.V3Tab', {
    extend: 'Ext.app.Controller',
    views: ['application.new.V3Tab'],
    refs: [{
        ref: 'v3Tab',
        selector: 'v3Tab',
        autoCreate: true,
        xtype: 'v3Tab'
    }],
    init: function () {
        this.control({
            'v3Tab': {
                afterrender: function (panel) {
                    console.log(panel.isEdit);
                    if (panel.isEdit == true) {
                        var v3basicinfopanel = panel.down('v3basicinfopanel'),
                            testdatainfo = panel.down('testdatainfo');

                        var combo = v3basicinfopanel.down('#noOceanTopic');
                        var store = Ext.create('Soims.store.application.show.V3Detail');
                        store.getProxy().setExtraParam('ID', panel.applicationID);
                        store.load(function () {
                            if (store.getCount() != 0) {
                                // 基本信息
                                v3basicinfopanel.loadRecord(store.getAt(0));
                                // Combobox Store
                                var record = Ext.create('Soims.model.application.new.NoOceanTopic',
                                    {
                                        'topicID': store.getAt(0).get('topicID'),
                                        'topicName': store.getAt(0).get('topicName')
                                    });
                                console.log(record);
                                combo.setValue(record);
                                // 拟提交成果
                                testdatainfo.loadRecord(store.getAt(0));
                            }
                        });
                    }
                }
            },
            //监听panel事件
            'v3basicinfo  button[itemId=v3Page1Save]': {
                click: function (button, e) {

                }
            },
            'v3basicinfo  button[itemId=v3Page1Next]': {
                click: function (button, e) {
                    var v3TabPanel = button.up('#applicationNewV3BasicInfo').up('v3Tab'); 
                    v3TabPanel.setActiveTab(1);
                }
            },
            'sampleinfo  button[itemId=v3Page2Later]': {
                click: function (button, e) {
                    var v3TabPanel = button.up('#applicationCommonSampleInfo').up('v3Tab'); 
                    v3TabPanel.setActiveTab(0);
                }
            },
            'sampleinfo  button[itemId=v3Page2Save]': {
                click: function (button, e) {

                }
            },
            'sampleinfo  button[itemId=v3Page2Next]': {
                click: function (button, e) {
                    var v3TabPanel = button.up('#applicationCommonSampleInfo').up('v3Tab'); 
                    v3TabPanel.setActiveTab(2);
                }
            },

            'electronicdocument  button[itemId=v3Page5Later]': {
                click: function (button, e) {
                    var v3TabPanel = button.up('electronicdocument').up('v3Tab'); 
                    v3TabPanel.setActiveTab(1);
                }
            },
            'electronicdocument  button[itemId=v3Page5Save]': {
                click: function (button, e) {

                }
            },
            'electronicdocument  button[itemId=v3Page5Preview]': {
                click: this.previewApp
            },
            'electronicdocument  button[itemId=v3Page5Submit]': {
                click: function (button, e) {

                }
            }
        });
    },
    showTab: function (id, title, isShow, panel) {
        var v3Con = this.getCon('application.new.V3BasicInfo');
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
        var eleCon = this.getCon('application.common.ElectronicDocument');

        var v3TabPanel = this.getApplicationNewV3TabView();
        var panel = this.showTab('NewV3', '创建室内非大洋课题申请', false, v3TabPanel);

    },
    getCon: function (v3TabPath) {
        var loginApp = this.application;
        return loginApp.getController(v3TabPath);
    },
    previewApp: function (btn) {
        var applicationID = btn.up('panel[name=applicationCommonElectronicDocument]').applicationID,
            panels, showCon;
        if (applicationID == undefined) {
            Ext.MessageBox.alert('提示', '请先保存申请基本信息', function () {
                var tabPanel = btn.up('#applicationCommonElectronicDocument').up('tabpanel');
                tabPanel.setActiveTab(0);
            }, this);
            return;
        }

        panels = this.getCon('application.show.V3Tab').getApplicationShowV3TabView();
        showCon = this.getCon('application.ApplicationGrid');

        showCon.showTab('PreviewV3' + applicationID, '预览室内非大洋申请', panels, applicationID, true, false);
    }
});