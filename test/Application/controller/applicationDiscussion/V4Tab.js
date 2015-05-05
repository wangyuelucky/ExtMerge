Ext.define('Soims.controller.applicationDiscussion.V4Tab', {
    extend: 'Ext.app.Controller',
    views: ['applicationDiscussion.V4Tab'],
    requires: ['Soims.model.applicationAuditing.AuditType', 'Soims.model.applicationAuditing.AuditState', 'Soims.model.applicationAccept.AcceptAction'],
    refs: [{
        ref: 'discussv4tab',
        selector: 'discussv4tab',
        autoCreate: true,
        xtype: 'discussv4tab'
    }],
    init: function () {
        this.getCon('application.common.V4Sample');
        this.getCon('applicationDiscussion.Discussion');

        this.control({
            'discussv4tab': {
                render: function (panel) {
                    if (panel.isEdit == true || panel.isShow == true) {
                        var v1basicinfopanel = panel.down('v4basicinfopanel');

                        var comboActivity = v1basicinfopanel.down('#activity');
                        var storeActivity = comboActivity.getStore();

                        var store = Ext.create('Soims.store.application.show.V4Detail');

                        store.getProxy().setExtraParam('ID', panel.applicationID);
                        store.load(function () {
                            if (store.getCount() != 0) {
                                // 基本信息
                                storeActivity.load(function () {

                                    var record = Ext.create('Soims.model.application.new.Activity',
                                    {
                                        'activityID': store.getAt(0).get('activityID'),
                                        'activityName': store.getAt(0).get('activityName')
                                    });
                                    comboActivity.setValue(record);
                                    v1basicinfopanel.loadRecord(store.getAt(0));
                                    var samplePanel = panel.down('#applicationCommonV4Sample');
                                    samplePanel.applicationID = store.getAt(0).get('id');
                                    samplePanel.down('datefield[itemId=activityStartTime]').setValue(store.getAt(0).get('activityStartTime'));
                                    samplePanel.down('datefield[itemId=activityEndTime]').setValue(store.getAt(0).get('activityEndTime'));
                                });

                            }
                        });
                    }
                }
            }
        });
    },
    getCon: function (path) {
        var loginApp = this.application;
        return loginApp.getController(path);
    }
});