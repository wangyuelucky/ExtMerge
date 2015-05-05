Ext.define('Soims.controller.application.new.V1BasicInfo', {
    extend: 'Ext.app.Controller',   
    views: ['application.new.V1BasicInfo'],
    refs: [{
        ref: 'v1BasicInfo',
        selector: 'v1basicinfo',
        autoCreate: true,
        xtype: 'v1basicinfo'
    }],
    init: function () {
        this.control();
    },
    getCon: function (sampleBackCountryGridPath) {
        var loginApp = this.application;
        return loginApp.getController(sampleBackCountryGridPath);
    }
});