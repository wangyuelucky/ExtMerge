Ext.define('Soims.controller.applicationDiscussion.B1Tab', {
    extend: 'Ext.app.Controller',
    views: ['applicationDiscussion.B1Tab'],
    requires: ['Soims.model.applicationAuditing.AuditType', 'Soims.model.applicationAuditing.AuditState', 'Soims.model.applicationAccept.AcceptAction'],
    refs: [{
        ref: 'discussb1tab',
        selector: 'discussb1tab',
        autoCreate: true,
        xtype: 'discussb1tab'
    }],
    init: function () {
        this.getCon('application.common.SampleInfo');
        this.getCon('application.common.BoardingUser');
        this.getCon('application.common.SampleBackCountry');
        this.getCon('application.common.ElectronicDocument');
        this.getCon('applicationDiscussion.Discussion');

        this.control({
            'discussb1tab': {
                afterrender: this.afterB1TabRender
            }
        });
    },
    getCon: function (path) {
        var loginApp = this.application;
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
                var record = store.getAt(0);
                // 基本信息
                b1basicinfopanel.loadRecord(record);
                // 必要性
                samplesiteusenecessityField.setValue(record.get('usingNecessity'));
                /** 拟提交成果
                testdatainfo.loadRecord(record);
                */
            }
        });
    }
});