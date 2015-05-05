Ext.define('Soims.controller.application.show.B1Tab', {
    extend: 'Ext.app.Controller',
    views: ['application.show.B1Tab'],
    refs: [{
        ref: 'showb1tab',
        selector: 'showb1tab',
        autoCreate: true,
        xtype: 'showb1tab'
    }],
    init: function () {
        this.getCon('application.common.SampleInfo');
        this.getCon('application.common.BoardingUser');
        this.getCon('application.common.SampleBackCountry');
        this.getCon('application.common.ElectronicDocument');

        this.control({
            'showb1tab': {
                afterrender: this.afterB1TabRender
            },
            'showb1tab button[itemId=close]': {
                click: this.onClickCloseBtn
            }
        });
    },
    getCon: function (path) {
        var loginApp = this.application;
        console.log(loginApp);
        return loginApp.getController(path);
    },
    afterB1TabRender: function (panel) {
        var b1basicinfopanel = panel.down('b1basicinfopanel'),
            testdatainfo = panel.down('testdatainfo'),
            samplesiteusenecessityField = panel.down('samplesiteusenecessityform').down('textareafield');

        var store = Ext.create('Soims.store.application.show.B1Detail');
        store.getProxy().setExtraParam('ID', panel.applicationID);
        store.load(function () {
            if (store.getCount() != 0) {
                // 基本信息
                b1basicinfopanel.loadRecord(store.getAt(0));
                // 必要性
                samplesiteusenecessityField.setValue(store.getAt(0).get('usingNecessity'));
                /** 拟提交成果
                testdatainfo.loadRecord(store.getAt(0)); */
            }
        });
    },
    onClickCloseBtn: function (btn) {
        btn.up('panel').close();
    }
});