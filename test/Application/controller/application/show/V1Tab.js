Ext.define('Soims.controller.application.show.V1Tab', {
    extend: 'Ext.app.Controller',
    views: ['application.show.V1Tab'],
    refs: [{
        ref: 'showv1tab',
        selector: 'showv1tab',
        autoCreate: true,
        xtype: 'showv1tab'
    }],
    init: function () {
        this.getCon('application.common.SampleInfo');
        this.getCon('application.new.V1BasicInfo');
        this.control({
            'showv1tab': {
                render: this.afterTabRender
            },
            'showv1tab button[itemId=close]': {
                click: this.onClickCloseBtn
            }
        });
    },
    afterTabRender: function (panel) {
        if (panel.isEdit == true || panel.isShow == true) {
            var v1basicinfopanel = panel.down('v1basicinfopanel'),
                testdatainfo = panel.down('testdatainfo');
            var comboReport = v1basicinfopanel.down('#report');
            var storeReport = comboReport.getStore();
            var comboDivision = v1basicinfopanel.down('#division');
            var storeDivision = comboDivision.getStore();
            var store = Ext.create('Soims.store.application.show.V1Detail');

            store.getProxy().setExtraParam('ID', panel.applicationID);
            store.load(function () {
                if (store.getCount() != 0) {
                    // 基本信息
                    storeReport.load(function () {
                        console.log(store.getAt(0).get('reportName'));
                        v1basicinfopanel.loadRecord(store.getAt(0));
                        var record = Ext.create('Soims.model.application.new.Division',
                        {
                            'id': store.getAt(0).get('divisionID'),
                            'name': store.getAt(0).get('divisionName')
                        });
                        comboReport.setValue(store.getAt(0).get('reportName'));
                        storeDivision.getProxy().setExtraParam('reportID', store.getAt(0).get('reportID'));
                        panel.down('#applicationCommonSampleInfo').applicationID = store.getAt(0).get('id');
                        storeDivision.load(function () {
                            comboDivision.setValue(record);
                        });
                    });
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