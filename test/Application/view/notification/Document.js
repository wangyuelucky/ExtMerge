﻿Ext.define("Soims.view.notification.DocumentUploadWin", {
    itemId: 'notificationDocumentUploadWin',
    extend: 'Ext.window.Window',
    alias: 'widget.documentuploadwin',
    title: '电子资料上传',
    iconCls: ' ',
    items: [
    {
        itemId: 'uploadPanel',
        xtype: 'form',
        items: [
        {
            itemId: 'uploadFilefield',
            padding: 2,
            xtype: 'filefield',
            name: 'fileName',
            fieldLabel: '相关资料',
            labelWidth: 100,
            msgTarget: 'side',
            anchor: '100%',
            buttonText: '选择文件'
        }]
    }],
    initComponent: function () {
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