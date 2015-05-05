Ext.define("Soims.view.application.common.ElectronicDocument", {
    //itemId: 'applicationCommonElectronicDocument',
    name: 'applicationCommonElectronicDocument',
    extend: 'Ext.form.Panel',
    alias: 'widget.electronicdocument',
    requires: ['Soims.view.application.common.ElectronicDocumentGrid'],
    padding: 2,
    title: '电子资料提交',
    autoShow: true,
    initComponent: function () {
        this.items = [{
            xtype: 'electronicdocumentgrid',
            applicationID: this.applicationID,
            isShow: this.isShow,
            type: this.type
        }];
        this.callParent();
    }

});