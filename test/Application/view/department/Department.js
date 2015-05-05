Ext.define("Soims.view.department.Department", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.department',
    title: '单位列表',
    iconCls: 'Group',
    //height: 300,
    pageSize: 10,
    closable: true,
    store: 'department.Department',
    selType: 'rowmodel',
    initComponent: function () {
        this.columns = [{
                header: '单位名称',
                dataIndex: 'name',
                flex: 1
            }, {
                header: '单位地址',
                dataIndex: 'address',
                flex: 1
            }, {
                header: '单位类型',
                dataIndex: 'type',
                flex: 1
            }];

        this.tbar = [{
            text: '添加',
            iconCls: 'Add',
            xtype: 'button',
            itemId: 'add'
        }, {
            text: '修改',
            xtype: 'button',
            iconCls: 'Disk',
            itemId: 'modify',
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
            itemId: 'refreshTbarDep',
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