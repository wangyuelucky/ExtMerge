Ext.define("Soims.view.user.RolePanel", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rolepanel',
    store: 'user.RoleWin',
    selType: 'checkboxmodel',
    hideHeaders: true,
    initComponent: function () {
        this.columns = [{
            header: '角色',
            dataIndex: 'rolename',
            flex: 1
        }];
        this.callParent();
    }
});