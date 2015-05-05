Ext.define('Soims.controller.message.AllMessageList', {
    extend: 'Ext.app.Controller',
    stores: ['message.AllMessageList'],
    views: ['message.AllMessageList'],
    refs: [{
        ref: 'allmessagelist',
        selector: 'allmessagelist',
        autoCreate: true,
        xtype: 'allmessagelist'
    }],
    init: function () {
        this.control({
            'allmessagelist  button[action=sendMessage]': {
                click: function (button, e) {
                    var con = this.getCon('message.SendMessage');
                    con.showWindow(this.getAllmessagelist());


                }
            },

            'allmessagelist  button[itemId=show]': {
                click: function (button, e) {
                                        var con = this.getCon('message.SendMessage');
                    //                    var panel = button.up('panel');
                    //                    var selectionModel = panel.getSelectionModel();
                    //                    var record = selectionModel.getSelection()[0];
                    //                    con.getSendmessage().down('panel').loadRecord(record);
                    //                    con.getSendmessage().down('#send').setDisabled(true);
                    //                    con.getSendmessage().down('#cancel').setDisabled(true);


                    var model = button.up('panel').getSelectionModel().getSelection()[0];
                    var panels = this.getCon('message.SendMessage').getMessageSendMessageView();
                    var panelNew = Ext.create(panels, { id: 'ShowMessage' + model.get('id'), title: model.get('name'), isShow: true });                    
                    panelNew.down('#content').getToolbar().hide();
                    panelNew.show();                    
                    var form = panelNew.down('sendmessagebasic');
                    form.loadRecord(model);                    
                    this.markAsRead(button);

                }
            },

            'allmessagelist  button[action=delete]': {
                click: function (button, e) {
                    Ext.Tools.Confirm('确认', '您确定要删除该条目？',
                function (btn) {
                    if (btn == 'yes') {
                        this.deleteDataBase(button);
                    }
                }, this);
                }
            },
            'allmessagelist  button[itemId=refreshTbar]': {
                click: function (button, e) {
                    button.up('panel').getStore().reload();
                    button.up('panel').getSelectionModel().deselectAll();
                }
            },
            'allmessagelist': {
                //监听panel的双击事件
                itemdblclick: function (view, record) {
                },
                //监听panel的行变换事件
                selectionchange: function (selModel, records) {
                    if (records.length != 0) {
                        this.getAllmessagelist().down('#delete').setDisabled(false);
                        this.getAllmessagelist().down('#show').setDisabled(false);
                    } else {
                        this.getAllmessagelist().down('#delete').setDisabled(true);
                        this.getAllmessagelist().down('#show').setDisabled(true);
                    }
                }
            }

        });
    },

   
    getCon: function (messagePath) {
        var loginApp = this.application;
        return loginApp.getController(messagePath);
    },
    showAllMessageList: function () {

        var Panel = this.getAllmessagelist();
        var con = this.getCon('mainFrame.Main');
        con.addTab(Panel);
    },

    markAsRead: function (button) {
        var panel = button.up('panel');
        var selectionModel = panel.getSelectionModel();
        var record = selectionModel.getSelection()[0];
        var id = record.get('id');
        Ext.Ajax.request({
            url: Soims.service.users.MessageService + '/MarkAsRead',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { id: id },
            success: function (response) {
                button.up('panel').getStore().reload();
            }
        });
    },
    deleteDataBase: function (button) {
        var panel = button.up('panel');
        var selectionModel = panel.getSelectionModel();
        var record = selectionModel.getSelection()[0];
        var id = record.get('id');
        Ext.Ajax.request({
            url: Soims.service.users.MessageService + '/Delete',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { id: id },
            success: function (response) {
                //                this.getMessageMessageListStore().reload();
                button.up('panel').getStore().reload();
            }
        });
    }

});