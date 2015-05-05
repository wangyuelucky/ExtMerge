Ext.define("Soims.view.notification.NotificationList", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.notificationlist',
    title: '公告',
    iconCls: 'Notification', 
    closable: true,
    store: 'notification.NotificationList',
    selType: 'rowmodel',
//    selModel: new Ext.selection.RowModel(),
    initComponent: function () {
        this.columns = [
            {
                header: '标题',
                dataIndex: 'title',
                flex: 1

            }, {
                header: '发信人',
                dataIndex: 'sender',
                flex: 1

            }, {
                header: '发送时间',
                dataIndex: 'dateTime',
                flex: 1
            }, {
                header: '状态',
                dataIndex: 'state',
                flex: 1

            }];
        this.tbar = [{
            text: '发布公告',
            xtype: 'button',
            action: 'sendNotification',
            name: 'sendNotification',
            itemId: 'sendNotification',
            iconCls: 'NotificationSend'

        }, {
            text: '查看',
            xtype: 'button',
            action: 'checkNotification',
            name: 'checkNotification',
            itemId: 'checkNotification',
            iconCls: 'NotificationCheck',
            hidden: true
//        }, {
//            text: '编辑',
//            xtype: 'button',
//            action: 'editNotification',
//            name: 'editNotification',
//            itemId: 'editNotification',
//            iconCls: 'NotificationEdit',
//            hidden: true
        }, {
            text: '删除',
            name: 'deleteNotification',
            action: 'deleteNotification',
            itemId: 'deleteNotification',
            iconCls: 'NotificationDelete',
            xtype: 'button',
            hidden: true
        
        }, {
            text: '置顶',
            name: 'top',
            action: 'top',
            itemId: 'top',
            xtype: 'button',
            iconCls: 'NotificationTop',
            hidden: true
        }, {
            text: '取消置顶',
            name: 'cancelTop',
            action: 'cancelTop',
            itemId: 'cancelTop',
            xtype: 'button',
            iconCls: 'NotificationCancel',
            hidden: true
        }, {
            text: '过期',
            name: 'overdue',
            action: 'overdue',
            itemId: 'overdue',
            xtype: 'button',
            iconCls: 'NotificationOverdue',
            hidden: true
        }, {
            text: '取消过期',
            name: 'cancelOverdue',
            action: 'cancelOverdue',
            itemId: 'cancelOverdue',
            iconCls: 'NotificationCancelOverdue',
            xtype: 'button',
            hidden: true
        }, {
            xtype: 'tbfill'
        }, {
            text: '刷新',
            itemId: 'refreshTbar',
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
