Ext.define('Soims.controller.application.show.V2Tab', {
    extend: 'Ext.app.Controller',
    views: ['application.show.V2Tab'],
    refs: [{
        ref: 'showv2tab',
        selector: 'showv2tab',
        autoCreate: true,
        xtype: 'showv2tab'
    }],
    init: function () {
        this.getCon('application.common.SampleInfo');
        this.control({
            'showv2tab': {
                afterrender: this.afterTabRender
            },
            'showv2tab button[itemId=close]': {
                click: this.onClickCloseBtn
            }
        });
    },
    afterTabRender: function (panel) {
        if (panel.isShow == true) {
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