Ext.define('Soims.controller.application.new.B2Tab', {
    extend: 'Ext.app.Controller',
    views: ['application.new.B2Tab'],
    refs: [{
        ref: 'b2Tab',
        selector: 'b2Tab',
        autoCreate: true,
        xtype: 'b2Tab'
    }],
    applicationID: "",
    init: function () {
        this.control({
            'b2Tab': {
                afterrender: function (panel) {
                    console.log(panel.isEdit);
                    if (panel.isEdit == true) {
                        var b2basicinfopanel = panel.down('b2basicinfopanel'),
                            testdatainfo = panel.down('testdatainfo'),
                            samplesiteusenecessityField = panel.down('samplesiteusenecessityform').down('textareafield'),
                            samplebackcountrynecessityField = panel.down('samplebackcountrynecessityform').down('textareafield');
                        //                        var combo = b1basicinfopanel.down('#voyageTask');
                        var store = Ext.create('Soims.store.application.show.B2Detail');
                        store.getProxy().setExtraParam('ID', panel.applicationID);
                        store.load(function () {
                            if (store.getCount() != 0) {
                                // 基本信息
                                b2basicinfopanel.loadRecord(store.getAt(0));

                                //                                var record = Ext.create('Soims.model.application.new.VoyageTask',
                                //                                    {
                                //                                        'id': store.getAt(0).get('voyageTaskID'),
                                //                                        'name': store.getAt(0).get('voyageTask')
                                //                                    });
                                //                                combo.setValue(record);
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
            //监听panel事件
            //            'b2basicinfo  button[itemId=b2Page1Save]': {
            //                click: function (button, e) {

            //                }
            //            },
            'b2basicinfo  button[itemId=b2Page1Next]': {
                click: function (button, e) {
                    var b2TabPanel = button.up('#applicationNewB2BasicInfo').up('b2Tab');
                    b2TabPanel.setActiveTab(1);
                }
            },
            'sampleinfo  button[itemId=b2Page2Later]': {
                click: function (button, e) {
                    var b2TabPanel = button.up('#applicationCommonSampleInfo').up('b2Tab');
                    b2TabPanel.setActiveTab(0);
                }
            },
            'sampleinfo  button[itemId=b2Page2Save]': {
                click: function (button, e) {

                }
            },
            'sampleinfo  button[itemId=b2Page2Next]': {
                click: function (button, e) {
                    var b2TabPanel = button.up('#applicationCommonSampleInfo').up('b2Tab');
                    b2TabPanel.setActiveTab(2);
                }
            },
            'samplesiteuse  button[itemId=b2Page3Later]': {
                click: function (button, e) {
                    var b2TabPanel = button.up('samplesiteuse').up('b2Tab');
                    b2TabPanel.setActiveTab(1);
                }
            },
            'samplesiteuse  button[itemId=b2Page3Save]': {
                click: function (button, e) {

                }
            },
            'samplesiteuse  button[itemId=b2Page3Next]': {
                click: function (button, e) {
                    var b2TabPanel = button.up('samplesiteuse').up('b2Tab');
                    b2TabPanel.setActiveTab(3);
                }
            },
            'samplebackcountry  button[itemId=b2Page4Later]': {
                click: function (button, e) {
                    var b2TabPanel = button.up('samplebackcountry').up('b2Tab');
                    b2TabPanel.setActiveTab(2);
                }
            },
            'samplebackcountry  button[itemId=b2Page4Save]': {
                click: function (button, e) {

                }
            },
            'samplebackcountry  button[itemId=b2Page4Next]': {
                click: function (button, e) {
                    var b2TabPanel = button.up('samplebackcountry').up('b2Tab');
                    b2TabPanel.setActiveTab(4);
                }
            },
            'electronicdocument  button[itemId=b2Page5Later]': {
                click: function (button, e) {
                    var b2TabPanel = button.up('electronicdocument').up('b2Tab');
                    b2TabPanel.setActiveTab(3);
                }
            },
            'electronicdocument  button[itemId=b2Page5Save]': {
                click: function (button, e) {

                }
            },
            'electronicdocument  button[itemId=b2Page5Preview]': {
                click: this.previewApp
            }
        });
    },
    showTab: function (id, title, isShow, panel) {
        var b1Con = this.getCon('application.new.B2BasicInfo');
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

        var panels = this.getApplicationNewB2TabView();
        var panel = this.showTab('NewB2', '创建现场大洋课题申请', false, panels);

    },
    getCon: function (b2TabPath) {
        var loginApp = this.application;
        return loginApp.getController(b2TabPath);
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

        panels = this.getCon('application.show.B2Tab').getApplicationShowB2TabView();
        showCon = this.getCon('application.ApplicationGrid');

        showCon.showTab('PreviewB2' + applicationID, '预览现场大洋课题申请', panels, applicationID, true, false);
    }
});