Ext.define('Soims.controller.application.new.V4Tab', {
    extend: 'Ext.app.Controller',
    views: ['application.new.V4Tab'],
    refs: [{
        ref: 'v4Tab',
        selector: 'v4Tab',
        autoCreate: true,
        xtype: 'v4Tab'
    }],
    init: function () {
        this.control({
            //监听panel事件
            'v4Tab': {
                render: function (panel) {
                    if (panel.isEdit == true || panel.isShow == true) {
                        var v4basicinfopanel = panel.down('v4basicinfopanel');

                        var comboActivity = v4basicinfopanel.down('#activity');
                        var storeActivity = comboActivity.getStore();

                        var store = Ext.create('Soims.store.application.show.V4Detail');

                        store.getProxy().setExtraParam('ID', panel.applicationID);
                        store.load(function () {
                            if (store.getCount() != 0) {
                                // 基本信息
                                storeActivity.load(function () {

                                    var record = Ext.create('Soims.model.application.new.Activity',
                                    {
                                        'activityID': store.getAt(0).get('activityID'),
                                        'activityName': store.getAt(0).get('activityName')
                                    });
                                    comboActivity.setValue(record);
                                    v4basicinfopanel.loadRecord(store.getAt(0));
                                    var samplePanel = panel.down('#applicationCommonV4Sample');
                                    samplePanel.applicationID = store.getAt(0).get('id');
                                    samplePanel.down('datefield[itemId=activityStartTime]').setValue(store.getAt(0).get('activityStartTime'));
                                    samplePanel.down('datefield[itemId=activityEndTime]').setValue(store.getAt(0).get('activityEndTime'));
                                });
                                //                                panel.loadRecord()

                            }
                        });
                    }
                }
            },
            'v4basicinfo  button[itemId=v4Page1Save]': {
                click: function (button, e) {

                }
            },
            'v4basicinfo  button[itemId=v4Page1Next]': {
                click: function (button, e) {
                    var v4TabPanel = button.up('#applicationNewV4BasicInfo').up('v4Tab');
                    v4TabPanel.setActiveTab(1);
                }
            },
            'v4sample  button[itemId=v4Page5Later]': {
                click: function (button, e) {
                    var v4TabPanel = button.up('#applicationCommonSampleInfo').up('v4Tab');
                    v4TabPanel.setActiveTab(0);
                }
            },
            'v4sample  button[itemId=v4Page5Save]': {
                click: function (button, e) {

                }
            },
            'v4sample  button[itemId=v4Page5Preview]': {
                click: this.previewApp
            },
            'v4sample  button[itemId=v4Page5Submit]': {
                click: function (button, e) {

                }
            }
        });
    },
    showTab: function (id, title, isShow, panel) {
        var b1Con = this.getCon('application.new.V4BasicInfo');
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
        var editController = this.getCon('application.common.V4Sample');

        var panels = this.getApplicationNewV4TabView();
        var panel = this.showTab('NewV4', '创建公益事业申请', false, panels);
    },
    getCon: function (v4TabPath) {
        var loginApp = this.application;
        return loginApp.getController(v4TabPath);
    },
    previewApp: function (btn) {
        var applicationID = btn.up('v4Tab').applicationID,
            panels, showCon;
        if (applicationID == undefined) {
            Ext.MessageBox.alert('提示', '请先保存申请基本信息', function () {
                var tabPanel = btn.up('v4Tab');
                tabPanel.setActiveTab(0);
            }, this);
            return;
        }

        panels = this.getCon('application.show.V4Tab').getApplicationShowV4TabView();
        showCon = this.getCon('application.ApplicationGrid');

        showCon.showTab('PreviewV4' + applicationID, '预览航次报告申请', panels, applicationID, true, false);
    }
});