Ext.define("Soims.view.voyage.Voyage", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.voyage',
    title: '航次列表',
    viewConfig: { emptyText: '没有满足条件的项目' },
    iconCls: 'Project',
    closable: true,
    //store: 'voyage.Voyage',
    selType: 'rowmodel',
    initComponent: function () {
        this.store = Ext.create('Soims.store.voyage.Voyage');
        this.columns = [
            {
                header: '航次代码',
                dataIndex: 'name',
                flex: 1
            }, {
                header: '航次编号',
                dataIndex: 'number',
                flex: 1
            }, {
                header: '航次首席科学家',
                dataIndex: 'chargerName',
                flex: 1
            }, {
                header: '航次组织实施单位联系人',
                dataIndex: 'organizationName',
                flex: 1
            }, {
                header: '航次组织实施单位',
                dataIndex: 'organizationDepartName',
                flex: 1
            }, {
                header: '开始申请时间',
                dataIndex: 'startTime',
                xtype: 'datecolumn',
                format: 'Y-m-d',
                flex: 1
            }, {
                header: '结束申请时间',
                dataIndex: 'endTime',
                xtype: 'datecolumn',
                format: 'Y-m-d',
                flex: 1
            }];
        this.tbar = [{
            text: '修改',
            xtype: 'button',
            iconCls: 'Disk',
            itemId: 'modify',
            disabled: true
        }, {
            text: '查看',
            xtype: 'button',
            iconCls: 'Information',
            itemId: 'show',
            disabled: true
        }, {
            text: '删除',
            itemId: 'delete',
            iconCls: 'Delete',
            xtype: 'button',
            disabled: true
        }, {
            xtype: 'tbfill'
        }, {
            text: '刷新',
            itemId: 'refreshTbar',
            iconCls: 'ArrowRefresh',
            xtype: 'button'
        }];

        this.bbar = [{
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            border: false,
            displayMsg: '显示第 {0} 条到 {1} 条记录 / 共 {2} 条',
            emptyMsg: "没有记录"
        }];

        this.callParent();
    }
});

