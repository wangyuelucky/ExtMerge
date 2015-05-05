Ext.define('Soims.controller.applicationDiscussion.V2Tab', {
    extend: 'Ext.app.Controller',
    views: ['applicationDiscussion.V2Tab'],
    requires: ['Soims.model.applicationAuditing.AuditType', 'Soims.model.applicationAuditing.AuditState', 'Soims.model.applicationAccept.AcceptAction'],
    refs: [{
        ref: 'discussv2tab',
        selector: 'discussv2tab',
        autoCreate: true,
        xtype: 'discussv2tab'
    }],
    init: function () {
        this.getCon('application.common.SampleInfo');
        this.getCon('applicationDiscussion.Discussion');

        this.control({
            'discussv2tab': {
                afterrender: function (panel) {
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
                                /** 拟提交成果
                                testdatainfo.loadRecord(store.getAt(0));
                                */
                            }
                        });
                    }
                }
            }
        });
    }
});