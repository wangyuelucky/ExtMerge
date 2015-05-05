Ext.define('Soims.controller.application.show.V3Tab', {
    extend: 'Ext.app.Controller',
    views: ['application.show.V3Tab'],
    refs: [{
        ref: 'showv3tab',
        selector: 'showv3tab',
        autoCreate: true,
        xtype: 'showv3tab'
    }],
    init: function () {
        this.getCon('application.common.SampleInfo');
        this.control({
            'showv3tab': {
                afterrender: this.afterTabRender
            },
            'showv3tab button[itemId=close]': {
                click: this.onClickCloseBtn
            }
        });
    },
    afterTabRender: function (panel) {
        if (panel.isShow == true) {
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
                    combo.setValue(record);
                    /** 拟提交成果
                    testdatainfo.loadRecord(store.getAt(0)); */
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