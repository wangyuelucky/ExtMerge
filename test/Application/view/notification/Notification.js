Ext.define("Soims.view.notification.Notification", {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.notification',
    title: '公告',
    width: 350,
    height:420,
    renderTo: "ExtNotification",
//    autoscroll: true ,
    selType: 'rowmodel',
    store: 'notification.Notification',

    initComponent: function () {
        this.columns = [
            {
                header: '标题',
                dataIndex: 'title',
                width: 40,
                flex: 1

            }, {
                header: '发送时间',
                dataIndex: 'dateTime',
                flex: 1
            }];
            this.bbar = [{
                xtype: 'pagingtoolbar',
                store: this.store,
                displayInfo: true,
                border: false,
                displayMsg: '共 {2} 条', //显示第 {0} 条到 {1} 条记录 /
                emptyMsg: "没有记录"
            }];
       
        this.callParent();
    }
});

