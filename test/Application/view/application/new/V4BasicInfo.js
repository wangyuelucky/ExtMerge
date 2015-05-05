Ext.define("Soims.view.application.new.V4BasicInfo", {
    extend: 'Ext.form.Panel',
    alias: 'widget.v4basicinfo',
    itemId: 'applicationNewV4BasicInfo',
    requires: ['Soims.view.application.common.V4BasicInfoPanel'],
    title: '申请基本信息',
    padding: 2,
    defaults: {
        bodyStyle: 'background-color:#dfe8f5;'
    },
    autoShow: true,
    initComponent: function () {
        this.items = [{ xtype: 'v4basicinfopanel',
            applicationID: this.applicationID,
            isShow: this.isShow,
            hideVoyage: true
        }];
        this.callParent();
    }

});