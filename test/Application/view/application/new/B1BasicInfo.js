Ext.define("Soims.view.application.new.B1BasicInfo", {
    itemId: 'applicationNewB1BasicInfo',
    extend: 'Ext.form.Panel',
    alias: 'widget.b1basicinfo',
    title: '申请基本信息',
    requires: ['Soims.view.application.common.B1BasicInfoPanel'],
    padding: 2,
    defaults: {
        bodyStyle: 'background-color:#dfe8f5;'
    },
    autoShow: true,
    initComponent: function () {
        this.items = 
            [{ xtype: 'b1basicinfopanel',
            applicationID: this.applicationID,
            isShow: this.isShow}];
        this.callParent();
    }
});