Ext.define("Soims.view.message.SendMessageBasic", {
    extend: 'Ext.form.Panel',
    alias: 'widget.sendmessagebasic',
    requires: ['Soims.store.message.Receiver', 'Ext.ux.form.SearchComboBox'],   
    title: '发送短消息',
    //width: 400,
    autoShow: true,
    initComponent: function () {
        var store = Ext.create('Soims.store.message.Receiver');

        this.items = [{
            xtype: 'textfield',
            itemId: 'id',
            name: 'id',
            hidden: true
        }, {
            xtype: 'searchcombo',
            name: 'receiverID',
            readOnly: this.isShow,
            itemId: 'receiverID',
            fieldLabel: '收信人',
            store: store,
            valueField: 'id',
            tpl: Ext.create('Ext.XTemplate',
             '<tpl for=".">',
                  '<div class="x-boundlist-item">{name} - {departmentName}</div>',
              '</tpl>'
            ),
            displayTpl: Ext.create('Ext.XTemplate',
              '<tpl for=".">',
                  '{name}',
              '</tpl>'
            )
        },{
            xtype: 'textfield',
           name: 'title',
            allowBlank: false,
            itemId: 'title',
           fieldLabel: '标题',
            width:450,
            readOnly: this.isShow
        }, {
            xtype: 'htmleditor',
            name: 'content',
            itemId: 'content',
            allowBlank: false,
            fieldLabel: '内容',
            disabled: this.isShow
           
        }];
        this.callParent();
    }
});