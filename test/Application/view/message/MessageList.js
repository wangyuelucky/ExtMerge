Ext.define("Soims.view.message.MessageList", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.messagelist',
    title: '未读短消息',
    closable: true,
    store: 'message.MessageList',
    selType: 'rowmodel',  
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
            text: '全部标记为已读',
            name: 'markAllAsRead',
            action: 'markAllAsRead',
            itemId: 'markAllAsRead',
            iconCls: 'NotificationAsRead',
            xtype: 'button'  
        }, {
            text: '查看',
            xtype: 'button',
            action: 'check',
            name: 'check',
            itemId: 'check',
            iconCls: 'NotificationEdit',
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
