Ext.define('Soims.controller.applicationDiscussion.B2Tab', {
    extend: 'Ext.app.Controller',
    views: ['applicationDiscussion.B2Tab'],
    requires: ['Soims.model.applicationAuditing.AuditType', 'Soims.model.applicationAuditing.AuditState', 'Soims.model.applicationAccept.AcceptAction'],
    refs: [{
        ref: 'discussb2tab',
        selector: 'discussb2tab',
        autoCreate: true,
        xtype: 'discussb2tab'
    }],
    init: function () {
        this.getCon('application.common.SampleInfo');
        this.getCon('application.common.BoardingUser');
        this.getCon('application.common.SampleBackCountry');
        this.getCon('application.common.ElectronicDocument');
        this.getCon('applicationDiscussion.Discussion');

        this.control({
            'discussb2tab': {
                afterrender: this.afterB2TabRender
            }
        });
    },
    getCon: function (path) {
        var loginApp = this.application;
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
                testdatainfo.loadRecord(record);
                */
            }
        });
    }
});