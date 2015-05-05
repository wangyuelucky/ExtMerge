Ext.define("Soims.view.user.WaitAuditUser", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.waitAuditUser',
    title: '待激活的用户列表',
    iconCls: 'User',
    viewConfig:  {emptyText: '没有满足条件的项目'},
    closable: true,
    store: 'user.WaitAuditUser',
    selType: 'checkboxmodel',
    initComponent: function () {
        this.columns = [
            {
                header: '姓名',
                dataIndex: 'name',
                flex: 1
            }, {
                header: '邮箱',
                dataIndex: 'email',
                flex: 1
            }, {
                header: '单位',
                dataIndex: 'department',
                flex: 1
            }];

        this.tbar = [{
            text: '通过',
            xtype: 'button',
            iconCls: 'Accept',
            itemId: 'pass',
            disabled: true
        }, {
            text: '驳回',
            xtype: 'button',
            iconCls: 'ArrowUndo',
            itemId: 'reject',
            disabled: true
        }, {
            xtype: 'tbfill'
        }, {
            text: '刷新',
            itemId: 'refreshTbarAudit',
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