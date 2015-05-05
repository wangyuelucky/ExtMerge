Ext.define("Soims.view.user.User", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.user',
    title: '用户列表',
    viewConfig: { emptyText: '没有满足条件的项目' },
    iconCls: 'User',
    closable: true,
    store: 'user.User',
    selType: 'rowmodel',
    initComponent: function () {
        this.columns = [{
            header: '用户姓名',
            dataIndex: 'name',
            flex: 0.1
        }, {
            header: '单位',
            dataIndex: 'departmentName',
            flex: 0.1
        }, {
            header: '角色',
            dataIndex: 'roles',
            flex: 0.8
        }];

        this.tbar = [{
            text: '添加用户',
            xtype: 'button',
            iconCls: 'Add',
            itemId: 'add',
            disabled: false
        }, {
            text: '修改用户',
            xtype: 'button',
            iconCls: 'Disk',
            itemId: 'modify',
            disabled: true
        }, {
            text: '删除用户',
            xtype: 'button',
            itemId: 'delete',
            iconCls: 'Delete',
            disabled: true
        }, {
            text: '角色分配',
            xtype: 'button',
            iconCls: 'GroupEdit',
            itemId: 'manageRole',
            disabled: true
        }, {
            text: '密码重置',
            xtype: 'button',
            iconCls: 'Key',
            itemId: 'resetPd',
            disabled: true
        }, {
            text: '冻结用户',
            xtype: 'button',
            iconCls: 'Cancel',
            itemId: 'frozenUser',
            disabled: true
        }, {
            text: '解冻用户',
            xtype: 'button',
            iconCls: 'ArrowUp',
            itemId: 'thawUser',
            disabled: true
        }, {
            xtype: 'tbfill'
        }, {
            text: '刷新',
            itemId: 'refreshTbarUser',
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