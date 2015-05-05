Ext.define("Soims.view.application.new.V2BasicInfo", {
    itemId: 'applicationNewV2BasicInfo',
    extend: 'Ext.form.Panel',
    alias: 'widget.v2basicinfo',
    requires: ['Soims.view.application.common.B2BasicInfoPanel'],
    title: '申请基本信息',
    padding: 2,
    defaults: {
        bodyStyle: 'background-color:#dfe8f5;'
    },
    autoShow: true,
    initComponent: function () {
        this.items = [{ xtype: 'b2basicinfopanel',
            applicationID: this.applicationID,
            isShow: this.isShow,
            hideVoyage: true
        }];
        this.callParent();
    }
});