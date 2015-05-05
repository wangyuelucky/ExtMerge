Ext.define('Soims.view.mainFrame.West', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.west',
    region: 'west',
    id: 'DivPanelMenu',
    collapsible: true,
    width: 200,
    autoScroll: true,
    split: true,
    frame: true,
    titleCollapse: true,
    initComponent: function () {
        this.callParent();
    },
    addItems: function (menus) {
        var items = this.getMenuItems(menus);
        //        this.add(items); // 这种方式，会引起滚动条的问题
        for (var i = 0,len = items.length; i < len; i++) {
            this.add(items[i]);
        }
    },
    getMenuItems: function (menus) {
        var items = [];
        var user = Soims.currentLoginLog.user;
        //加载menu菜单
        for (var i = 0; i < menus.length; i++) {
            var html = '<ul class="">';
            for (var t = 0; t < menus[i].Child.length; t++) {
                var child = menus[i].Child;
                html += Ext.String.format('<li id="MenuBarItem-li-{0}">', child[t].Action);
                html += Ext.String.format('<img src="../Application/common/resources/images/s.gif" class="{0}"/>', child[t].IconCls);
                html += Ext.String.format('<a id="MenuBarItem-a-{0}" class="" href="#"><span id="{1}">{2}</span></a>', child[t].Action, child[t].PoolSpan, child[t].Title);
                html += Ext.String.format('</li>');
            }
            html += '</ul>';

            items[items.length] = new Ext.Panel({
                frame: true,
                title: menus[i].Title,
                collapsible: true,
                iconCls: menus[i].IconCls,
                html: html,
                titleCollapse: true
            });
        }

        return items;
    }
});