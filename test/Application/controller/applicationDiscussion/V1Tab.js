Ext.define('Soims.controller.applicationDiscussion.V1Tab', {
    extend: 'Ext.app.Controller',
    views: ['applicationDiscussion.V1Tab'],
    requires: ['Soims.model.applicationAuditing.AuditType', 'Soims.model.applicationAuditing.AuditState', 'Soims.model.applicationAccept.AcceptAction'],
    refs: [{
        ref: 'discussv1tab',
        selector: 'discussv1tab',
        autoCreate: true,
        xtype: 'discussv1tab'
    }],
    init: function () {
        this.getCon('application.common.SampleInfo');
        this.getCon('application.new.V1BasicInfo');
        this.getCon('applicationDiscussion.Discussion');
        this.control({
            'discussv1tab': {
                render: function (panel) {
                    if (panel.isEdit == true||panel.isShow == true) {
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