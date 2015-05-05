Ext.define("Soims.view.application.new.V3BasicInfo", {
    itemId: 'applicationNewV3BasicInfo',
    extend: 'Ext.form.Panel',
    itemId: 'applicationNewV3BasicInfo',
    alias: 'widget.v3basicinfo',
    requires: ['Soims.view.application.common.V3BasicInfoPanel'],
    title: '申请基本信息',
    padding: 2,
    defaults: {
        bodyStyle: 'background-color:#dfe8f5;'
    },
    autoShow: true,
    initComponent: function () {
        this.items = [{ xtype: 'v3basicinfopanel',
            applicationID: this.applicationID,
            isShow: this.isShow,
            hideVoyage: true
        }];
        this.callParent();
    }

});