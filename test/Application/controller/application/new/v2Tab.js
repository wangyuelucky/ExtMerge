Ext.define('Soims.controller.application.new.V2Tab', {
    extend: 'Ext.app.Controller',
    views: ['application.new.V2Tab'],
    refs: [{
        ref: 'v2Tab',
        selector: 'v2Tab',
        autoCreate: true,
        xtype: 'v2Tab'
    }],
    init: function () {
        this.control({
            'v2Tab': {
                afterrender: function (panel) {
                    console.log(panel.isEdit);
                    if (panel.isEdit == true) {
                        var v2basicinfopanel = panel.down('b2basicinfopanel'),
                            testdatainfo = panel.down('testdatainfo');

                        var combo = v2basicinfopanel.down('#subject');
                        var store = Ext.create('Soims.store.application.show.V2Detail');
                        store.getProxy().setExtraParam('ID', panel.applicationID);
                        store.load(function () {
                            if (store.getCount() != 0) {
                                // 基本信息
                                v2basicinfopanel.loadRecord(store.getAt(0));
                                // Combobox Store
                                var record = Ext.create('Soims.model.application.new.Subject',
                                    {
                                        'id': store.getAt(0).get('topicID'),
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
            'v2basicinfo  button[itemId=v2Page1Save]': {
                click: function (button, e) {

                }
            },
            'v2basicinfo  button[itemId=v2Page1Next]': {
                click: function (button, e) {
                    var v2TabPanel = button.up('#applicationNewV2BasicInfo').up('v2Tab');
                    v2TabPanel.setActiveTab(1);
                }
            },
            'sampleinfo  button[itemId=v2Page2Later]': {
                click: function (button, e) {
                    var v2TabPanel = button.up('#applicationCommonSampleInfo').up('v2Tab');
                    v2TabPanel.setActiveTab(0);
                }
            },
            'sampleinfo  button[itemId=v2Page2Save]': {
                click: function (button, e) {

                }
            },
            'sampleinfo  button[itemId=v2Page2Next]': {
                click: function (button, e) {
                    var v2TabPanel = button.up('#applicationCommonSampleInfo').up('v2Tab');
                    v2TabPanel.setActiveTab(2);
                }
            },

            'electronicdocument  button[itemId=v2Page5Later]': {
                click: function (button, e) {
                    var v2TabPanel = button.up('electronicdocument').up('v2Tab');
                    v2TabPanel.setActiveTab(1);
                }
            },
            'electronicdocument  button[itemId=v2Page5Save]': {
                click: function (button, e) {

                }
            },
            'electronicdocument  button[itemId=v2Page5Preview]': {
                click: this.previewApp
            },
            'electronicdocument  button[itemId=v2Page5Submit]': {
                click: function (button, e) {

                }
            }

        });
    },
    showTab: function (id, title, isShow, panel) {
        var v2Con = this.getCon('application.new.V2BasicInfo');
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

        var v2TabPanel = this.getApplicationNewV2TabView();
        var panel = this.showTab('NewV2', '创建室内大洋课题申请', false, v2TabPanel);

    },
    getCon: function (v2TabPath) {
        var loginApp = this.application;
        return loginApp.getController(v2TabPath);
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

        panels = this.getCon('application.show.V2Tab').getApplicationShowV2TabView();
        showCon = this.getCon('application.ApplicationGrid');

        showCon.showTab('PreviewV2' + applicationID, '预览室内大洋课题申请', panels, applicationID, true, false);
    }
});