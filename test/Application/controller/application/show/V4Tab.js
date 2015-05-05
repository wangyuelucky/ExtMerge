Ext.define('Soims.controller.application.show.V4Tab', {
    extend: 'Ext.app.Controller',
    views: ['application.show.V4Tab'],
    refs: [{
        ref: 'showv4tab',
        selector: 'showv4tab',
        autoCreate: true,
        xtype: 'showv4tab'
    }],
    init: function () {
        this.getCon('application.common.V4Sample');
        this.control({
            'showv4tab': {
                afterrender: this.afterTabRender
            },
            'showv4tab button[itemId=close]': {
                click: this.onClickCloseBtn
            }
        });
    },
    afterTabRender: function (panel) {
        if (panel.isEdit == true || panel.isShow == true) {
            var v1basicinfopanel = panel.down('v4basicinfopanel');

            var comboActivity = v1basicinfopanel.down('#activity');
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
                        v1basicinfopanel.loadRecord(store.getAt(0));
                        var samplePanel = panel.down('#applicationCommonV4Sample');
                        samplePanel.applicationID = store.getAt(0).get('id');
                        samplePanel.down('datefield[itemId=activityStartTime]').setValue(store.getAt(0).get('activityStartTime'));
                        samplePanel.down('datefield[itemId=activityEndTime]').setValue(store.getAt(0).get('activityEndTime'));
                    });

                }
            });
        }
    },
    getCon: function (path) {
        var loginApp = this.application;
        return loginApp.getController(path);
    },
    onClickCloseBtn: function (btn) {
        btn.up('panel').close();
    }
});