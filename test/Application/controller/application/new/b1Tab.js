Ext.define('Soims.controller.application.new.B1Tab', {
    extend: 'Ext.app.Controller',
    views: ['application.new.B1Tab'],
    refs: [{
        ref: 'b1Tab',
        selector: 'b1Tab',
        autoCreate: true,
        xtype: 'b1Tab'
    }],
    applicationID: "",
    voyageID: "",
    init: function () {
        this.control({
            'b1Tab': {
                afterrender: function (panel) {
                    console.log(panel.isEdit);
                    if (panel.isEdit == true) {
                        var b1basicinfopanel = panel.down('b1basicinfopanel'),
                            testdatainfo = panel.down('testdatainfo'),
                            samplesiteusenecessityField = panel.down('samplesiteusenecessityform').down('textareafield'),
                            samplebackcountrynecessityField = panel.down('samplebackcountrynecessityform').down('textareafield');
                        var combo = b1basicinfopanel.down('#voyageTask');
                        var store = Ext.create('Soims.store.application.show.B1Detail');
                        store.getProxy().setExtraParam('ID', panel.applicationID);
                        store.load(function () {
                            if (store.getCount() != 0) {
                                // 基本信息
                                b1basicinfopanel.down('#voyageTask').getStore().getProxy().setExtraParam('voyageID', store.getAt(0).get('voyageID'));
                                b1basicinfopanel.down('#voyageTask').getStore().getProxy().setExtraParam('userID', b1basicinfopanel.userID);

                                b1basicinfopanel.loadRecord(store.getAt(0));
                                var comboVT = b1basicinfopanel.down('#voyageTask');
                                var comboV = b1basicinfopanel.down('#voyage');
                                var charger = b1basicinfopanel.down('#chargerName');

                                var recordV = Ext.create('Soims.model.voyage.Voyage',
                                {
                                    'id': store.getAt(0).get('voyageID'),
                                    'name': store.getAt(0).get('voyage')
                                });
                                var recordVT = Ext.create('Soims.model.application.new.VoyageTask',
                                {
                                    'id': store.getAt(0).get('voyageTaskID'),
                                    'name': store.getAt(0).get('voyageTask')
                                });
                                var recordC = Ext.create('Soims.model.project.User',
                                {
                                    'id': store.getAt(0).get('chargerID'),
                                    'name': store.getAt(0).get('chargerName')
                                });
                                comboVT.setValue(recordVT);
                                comboV.setValue(recordV);
                                charger.setValue(recordC);

                                panel.down('#voyageTask').getStore().getProxy().setExtraParam('userID', store.getAt(0).get('chargerID'));
                                panel.down('#voyageTask').getStore().getProxy().setExtraParam('voyageID', store.getAt(0).get('voyageID'));

                                panel.down('#legs').getStore().getProxy().setExtraParam('voyageID', store.getAt(0).get('voyageID'));
                                // 必要性
                                samplesiteusenecessityField.setValue(store.getAt(0).get('usingNecessity'));
                                samplebackcountrynecessityField.setValue(store.getAt(0).get('repatriaionNecessity'));
                                // 拟提交成果
                                testdatainfo.loadRecord(store.getAt(0));
                            }
                        });
                    }
                }
            },
            'b1basicinfo  button[itemId=b1Page1Save]': {
                click: function (button, e) {

                }
            },
            'b1basicinfo  button[itemId=b1Page1Next]': {
                click: function (button, e) {
                    var b1TabPanel = button.up('#applicationNewB1BasicInfo').up('b1Tab');
                    b1TabPanel.setActiveTab(1);
                }
            },
            'sampleinfo  button[itemId=b1Page2Later]': {
                click: function (button, e) {
                    var b1TabPanel = button.up('#applicationCommonSampleInfo').up('b1Tab');
                    b1TabPanel.setActiveTab(0);
                }
            },

            'sampleinfo  button[itemId=b1Page2Next]': {
                click: function (button, e) {
                    var b1TabPanel = button.up('#applicationCommonSampleInfo').up('b1Tab');
                    b1TabPanel.setActiveTab(2);
                }
            },
            'samplesiteuse  button[itemId=b1Page3Later]': {
                click: function (button, e) {
                    var b1TabPanel = button.up('samplesiteuse').up('b1Tab');
                    b1TabPanel.setActiveTab(1);
                }
            },
            'samplesiteuse  button[itemId=b1Page3Save]': {
                click: function (button, e) {

                }
            },
            'samplesiteuse  button[itemId=b1Page3Next]': {
                click: function (button, e) {
                    var b1TabPanel = button.up('samplesiteuse').up('b1Tab');
                    b1TabPanel.setActiveTab(3);
                }
            },
            'samplebackcountry  button[itemId=b1Page4Later]': {
                click: function (button, e) {
                    var b1TabPanel = button.up('samplebackcountry').up('b1Tab');
                    b1TabPanel.setActiveTab(2);
                }
            },
            'samplebackcountry  button[itemId=b1Page4Save]': {
                click: function (button, e) {

                }
            },
            'samplebackcountry  button[itemId=b1Page4Next]': {
                click: function (button, e) {
                    var b1TabPanel = button.up('samplebackcountry').up('b1Tab');
                    b1TabPanel.setActiveTab(4);
                }
            },
            'electronicdocument  button[itemId=b1Page5Later]': {
                click: function (button, e) {
                    var b1TabPanel = button.up('electronicdocument').up('b1Tab');
                    b1TabPanel.setActiveTab(3);
                }
            },
            'electronicdocument  button[itemId=b1Page5Save]': {
                click: function (button, e) {


                }
            },
            'electronicdocument  button[itemId=b1Page5Preview]': {
                click: this.previewApp
            },
            'electronicdocument  button[itemId=b1Page5Submit]': {
                click: function (button, e) {

                }
            }
        });
    },
    showTab: function (id, title, isShow, panel) {
        var b1Con = this.getCon('application.new.B1BasicInfo');
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
        var boardCon = this.getCon('application.common.BoardingUser');
        var backCon = this.getCon('application.common.SampleBackCountry');
        var eleCon = this.getCon('application.common.ElectronicDocument');

        var panels = this.getApplicationNewB1TabView();
        var panel = this.showTab('NewB1', '创建航次任务申请', false, panels);

    },
    getCon: function (b1TabPath) {
        var loginApp = this.application;
        return loginApp.getController(b1TabPath);
    },
    previewApp: function (btn) {
        var applicationID = btn.up('electronicdocument').applicationID,
            panels, showCon;
        if (applicationID == undefined) {
            Ext.MessageBox.alert('提示', '请先保存申请基本信息', function () {
                var tabPanel = btn.up('electronicdocument').up('tabpanel');
                tabPanel.setActiveTab(0);
            }, this);
            return;
        }

        panels = this.getCon('application.show.B1Tab').getApplicationShowB1TabView();
        showCon = this.getCon('application.ApplicationGrid');

        showCon.showTab('PreviewB1' + applicationID, '预览现场航次任务申请', panels, applicationID, true, false);
    }

});