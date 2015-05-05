Ext.define('Soims.controller.application.show.B2Tab', {
    extend: 'Ext.app.Controller',
    views: ['application.show.B2Tab'],
    refs: [{
        ref: 'showb2tab',
        selector: 'showb2tab',
        autoCreate: true,
        xtype: 'showb2tab'
    }],
    init: function () {
        this.getCon('application.common.SampleInfo');
        this.getCon('application.common.BoardingUser');
        this.getCon('application.common.SampleBackCountry');
        this.getCon('application.common.ElectronicDocument');

        this.control({
            'showb2tab': {
                afterrender: this.afterB2TabRender
            },
            'showb2tab button[itemId=close]': {
                click: this.onClickCloseBtn
            }
        });
    },
    getCon: function (path) {
        var loginApp = this.application;
        console.log(loginApp);
        return loginApp.getController(path);
    },
    afterB2TabRender: function (panel) {
        var b2basicinfopanel = panel.down('b2basicinfopanel'),
            testdatainfo = panel.down('testdatainfo'),
            samplesiteusenecessityField = panel.down('samplesiteusenecessityform').down('textareafield');

        var store = Ext.create('Soims.store.application.show.B2Detail');
        store.getProxy().setExtraParam('ID', panel.applicationID);
        store.load(function () {
            if (store.getCount() != 0) {
                var record = store.getAt(0);
                // 基本信息
                b2basicinfopanel.loadRecord(record);
                // 必要性
                samplesiteusenecessityField.setValue(record.get('usingNecessity'));
                /** 拟提交成果
                testdatainfo.loadRecord(store.getAt(0)); */
            }
        });
    },
    onClickCloseBtn: function (btn) {
        btn.up('panel').close();
    }
});