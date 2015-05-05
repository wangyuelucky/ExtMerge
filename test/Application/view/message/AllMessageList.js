Ext.define("Soims.view.message.AllMessageList", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.allmessagelist',
    title: '我的短消息',
    iconCls: 'NotificationIcon',
    closable: true,
    store: 'message.AllMessageList',
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
                header: '收信人',
                dataIndex: 'receiver',
                flex: 1

            }, {
                header: '发送时间',
                dataIndex: 'dateTime',
                flex: 1
            }, {
                header: '是否已读',
                dataIndex: 'isRead',
                flex: 1

            }];
        this.tbar = [{
            text: '发送短消息',
            xtype: 'button',
            action: 'sendMessage',
            name: 'sendMessage',
            iconCls: 'NotificationSend',
            itemId: 'sendMessage'

        }, {
            text: '查看',
            xtype: 'button',
            //action: 'check',
            //name: 'check',
            itemId: 'show',
            iconCls: 'NotificationCheck',
            disabled: true

        }, {
            text: '删除',
            name: 'delete',
            action: 'delete',
            itemId: 'delete',
            xtype: 'button',
            iconCls: 'NotificationDelete',
            disabled: true
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
