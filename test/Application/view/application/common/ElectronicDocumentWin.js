Ext.define("Soims.view.application.common.ElectronicDocumentWin", {
    itemId: 'applicationCommonElectronicDocumentWin',
    extend: 'Ext.window.Window',
    alias: 'widget.electronicdocumentwin',
    title: '电子资料上传',
    iconCls: ' ',

    initComponent: function () {
        this.items = [{
            itemId: 'uploadPanel',
            xtype: 'form',
            items: [
            {
                itemId: 'taskProvedFilefield',
                padding: 2,
                xtype: 'filefield',
                name: 'fileName',
                fieldLabel: '承担任务证明材料',
                labelWidth: 100,
                msgTarget: 'side',
                anchor: '100%',
                buttonText: '选择文件'
            }, {
                itemId: 'sampleProvedFilefield',
                padding: 2,
                xtype: 'filefield',
                name: 'fileName',
                fieldLabel: '所需样品证明材料',
                labelWidth: 100,
                msgTarget: 'side',
                anchor: '100%',
                buttonText: '选择文件'
            }, {
                itemId: 'backCountryNesFilefield',
                padding: 2,
                xtype: 'filefield',
                hidden: this.type == 'V2' || this.type == 'V3' ? true : false,
                name: 'fileName',
                fieldLabel: '样品先行运送回国必要性说明材料',
                labelWidth: 100,
                msgTarget: 'side',
                anchor: '100%',
                buttonText: '选择文件'
            }]
        }];
        this.buttons = [{
            text: '上传',
            xtype: 'button',
            itemId: 'upload'
        }, {
            text: '取消',
            xtype: 'button',
            itemId: 'cancel'
        }];
        this.callParent();
    }

});