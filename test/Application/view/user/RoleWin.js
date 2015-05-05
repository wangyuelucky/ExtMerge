Ext.define("Soims.view.user.RoleWin", {
    extend: 'Ext.window.Window',
    alias: 'widget.rolewin',
    closable: true,
    resizable: false,
    iconCls: 'Group',
    modal: true,
    title: '角色',
    width: 200,
    height: 180,
    requires: ['Soims.view.user.RolePanel'],
    items: [{ xtype: 'rolepanel'}],
    autoShow: true,
    initComponent: function () {
        this.buttons = [{
            text: '确定',
            xtype: 'button',
            iconCls: 'Disk',
            itemId: 'determine'
        }, {
            text: '取消',
            xtype: 'button',
            iconCls: 'Cancel',
            itemId: 'cancel'
        }];
        this.callParent();
    }
});