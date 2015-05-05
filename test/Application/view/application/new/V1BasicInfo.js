Ext.define("Soims.view.application.new.V1BasicInfo", {
    itemId: 'applicationNewV1BasicInfo',
    extend: 'Ext.form.Panel',
    alias: 'widget.v1basicinfo',
    title: '申请基本信息',
    requires: ['Soims.view.application.common.V1BasicInfoPanel'],
    padding: 2,
    defaults: {
        bodyStyle: 'background-color:#dfe8f5;'
    },
    autoShow: true,
    initComponent: function () {
        this.items =
            [{ xtype: 'v1basicinfopanel',
                applicationID: this.applicationID,
                isShow: this.isShow
            }];
        this.callParent();
    }
});