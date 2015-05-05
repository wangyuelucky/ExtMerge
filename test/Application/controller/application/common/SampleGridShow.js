Ext.define('Soims.controller.application.common.SampleGridShow', {
    extend: 'Ext.app.Controller',
    requires: ['Soims.model.application.common.SampleApplicationType'],
    views: ['application.common.SampleGridShow'],
    refs: [{
        ref: 'samplegridshow',
        selector: 'samplegridshow',
        autoCreate: true,
        xtype: 'samplegridshow'
    }],
    init: function () {
        var applicationType = Soims.model.application.common.SampleApplicationType;
        this.control({
            'samplegridshow  button[itemId=agree]': {
                onClick: function (button, e) {
                    console.log('asdffdsa');
                }
            },
            'samplegridshow': {
                afterrender: function (view) {
                    var appID = view.up('#applicationCommonSampleInfo').applicationID;


                    if (appID) {
                        var store = view.getStore();
                        store.getProxy().setExtraParam('applicationID', appID);
                        store.load(function () {
                            var expander = view.getPlugin('sampleGridExpander');                            
                            for (var i = 0; i < store.getCount(); i++) {
                                expander.toggleRow(i,store.getAt(i));
                            }
                        });
                    }
                }
            }
        });
    },
    getCon: function (sampleinfoPath) {
        var loginApp = this.application;
        return loginApp.getController(sampleinfoPath);
    }

});