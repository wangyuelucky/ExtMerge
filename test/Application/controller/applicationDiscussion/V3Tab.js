Ext.define('Soims.controller.applicationDiscussion.V3Tab', {
    extend: 'Ext.app.Controller',
    views: ['applicationDiscussion.V3Tab'],
    requires: ['Soims.model.applicationAuditing.AuditType', 'Soims.model.applicationAuditing.AuditState', 'Soims.model.applicationAccept.AcceptAction'],
    refs: [{
        ref: 'discussv3tab',
        selector: 'discussv3tab',
        autoCreate: true,
        xtype: 'discussv3tab'
    }],
    init: function () {
        this.getCon('application.common.SampleInfo');
        this.getCon('applicationDiscussion.Discussion');

        this.control({
            'discussv3tab': {
                afterrender: this.afterTabRender
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
                    /** 拟提交成果
                    testdatainfo.loadRecord(store.getAt(0));
                    */
                }
            });
        }
    },
    getCon: function (path) {
        var loginApp = this.application;
        return loginApp.getController(path);
    }
});