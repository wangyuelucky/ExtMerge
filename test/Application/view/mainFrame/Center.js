Ext.define('Soims.view.mainFrame.Center', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.center',
    region: 'center',
    activeItem: 0,
    plugins: Ext.create('Ext.ux.tabPanel.TabCloseMenu', {
        pluginId: 'TabCloseMenu',
        closeTabText: '关闭当前页',
        closeOthersTabsText: '关闭其他页',
        closeAllTabsText: '关闭所有页'
    }),
    items: [{
        title: '首页',
        frame: true,
        style: 'padding:2px;',
        iconCls: 'House',
        items: { xtype: 'messagelist'}
    }],
    initComponent: function () {
        this.callParent();
    }

});