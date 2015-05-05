Ext.define("Soims.view.login.RegistWin", {
    extend: 'Ext.window.Window',
    alias: 'widget.registwin',
    closable: true,
    iconCls: 'User',
    resizable: false,
    modal: true,
    title: '用户注册',
    width: 625,
    requires: ['Soims.view.login.RegistForm'],
    items: [{ xtype: 'registform'}],
    autoShow: true,
    initComponent: function () {
        this.buttons = [{
            text: '提交',
            xtype: 'button',
            iconCls: 'ArrowUp',
            itemId: 'submit'
        }, {
            text: '取消',
            xtype: 'button',
            iconCls: 'Cancel',
            itemId: 'cancel'
        }];
        this.callParent();
    }
});