Ext.define("Soims.view.user.Role", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.role',
    title: '角色列表',
    viewConfig: { emptyText: '没有满足条件的项目' },
    iconCls: 'Group',
    closable: true,
    store: 'user.Role',
    selType: 'rowmodel',
    initComponent: function () {
        this.columns = [{
                header: '角色',
                dataIndex: 'rolename',
                flex: 1
            }, {
                header: '角色代码',
                dataIndex: 'code',
                flex: 1
            }];

        this.tbar = [{
            text: '添加',
            xtype: 'button',
            iconCls: 'Add',
            itemId: 'add',
            disabled: false
        }, {
            text: '权限分配',
            xtype: 'button',
            itemId: 'manageRight',
            disabled: true
        }, {
            text: '查看权限',
            xtype: 'button',
            itemId: 'showRight',
            disabled: true
        }, {
            xtype: 'tbfill'
        }, {
            text: '刷新',
            itemId: 'refreshTbarRole',
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