Ext.define('Soims.view.mainFrame.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: ['Soims.view.mainFrame.Center', 'Soims.view.mainFrame.North', 'Soims.view.mainFrame.West', 'Soims.view.message.MessageList'], // 必须是全路径吗？
//    renderTo: Ext.getBody(),
    alias: 'widget.configviewport',
    layout: 'border',
    items: [{ xtype: 'north' }, { xtype: 'west' }, { xtype: 'center'}],
    initComponent: function () {
        this.callParent();
    }
});