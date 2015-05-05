Ext.define("Soims.view.application.common.ElectronicDocumentGrid", {
    itemId: 'applicationCommonElectronicDocumentGrid',
    extend: 'Ext.grid.Panel',
    title: '证明材料电子资料',
    alias: 'widget.electronicdocumentgrid',
    autoHeight: true,
    //store: 'application.common.ElectronicDocument',
    emptyText: '没有满足条件的电子资料',
    height: 200,
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent: function () {
        this.store = Ext.create('Soims.store.application.common.ElectronicDocument');
        if (this.applicationID != undefined) {
            this.store.getProxy().setExtraParam('applicationID', this.applicationID);
            this.store.load();
        }

        this.columns = [
        { xtype: 'rownumberer' },
            {
                header: '文档名称',
                dataIndex: 'name',
                flex: 1
            }, {
                header: '文档大小',
                dataIndex: 'length',
                flex: 1
            }, {
                header: '备注',
                dataIndex: 'remark',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    disabled: this.isShow == true ? true : false
                }
            }];

        this.tbar = {           
            items: [{
                text: '添加',
                xtype: 'button',
                itemId: 'add',
                hidden: this.isShow,
                iconCls: 'Add'
            }, {
                text: '删除',
                itemId: 'delete',
                xtype: 'button',
                hidden: this.isShow,
                disabled: true,
                iconCls: 'Delete'
            }, {
                text: '下载',
                itemId: 'download',
                xtype: 'button',
                disabled: true,
                iconCls: 'DiskDownload'
            }]
        };
        this.on('selectionchange', this.selectChange);
        this.callParent();

        //this.getStore().load();
    },
    selectChange: function (selModel, records) {
        if (records.length != 0) {
            this.down('#delete').setDisabled(false);
            this.down('#download').setDisabled(false);
        } else {
            this.down('#delete').setDisabled(true);
            this.down('#download').setDisabled(true);
        }
    }
});