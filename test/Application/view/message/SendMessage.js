Ext.define("Soims.view.message.SendMessage", {
    extend: 'Ext.window.Window',
    alias: 'widget.sendmessage',
    closable: true,
    iconCls: '  ',
    requires: ['Soims.view.message.SendMessageBasic'],
    width: 650,

    autoShow: true,
    initComponent: function () {
        this.items = [{
            xtype: 'sendmessagebasic',
            isShow: this.isShow
        
        }];
        this.buttons = [{
            text: '发送',
            xtype: 'button',
            itemId: 'send',
            action: 'send',
            hidden: this.isShow

        }, {
            text: '取消',
            xtype: 'button',
            itemId: 'cancel',
            action: 'cancel',
            hidden: this.isShow

        }];


        this.callParent();
    }
});

