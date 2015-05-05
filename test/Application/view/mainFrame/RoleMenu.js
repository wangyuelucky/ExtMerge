Ext.define('Soims.view.mainFrame.RoleMenu', {
    extend: 'Ext.ux.grid.menu.StoreMenu',
    alias: 'widget.rolemenu',
    plain: true, // 移除竖线
    minWidth: 30,
    width: 180,
    requires: ['Soims.store.mainFrame.RoleMenu'],
    initComponent: function () {
        var self = this,
            roleStore = Ext.create('Soims.store.mainFrame.RoleMenu');

        self.store = roleStore;
        self.callParent();
    }
});


