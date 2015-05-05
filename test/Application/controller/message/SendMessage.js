Ext.define('Soims.controller.message.SendMessage', {
    extend: 'Ext.app.Controller',
    //    stores: ['message.MessageList'],
    views: ['message.SendMessage'],
    refs: [{
        ref: 'sendmessage',
        selector: 'sendmessage',
        autoCreate: true,
        xtype: 'sendmessage'
    }],
    init: function () {
        this.control({
            'sendmessage  button[action=send]': {
                click: function (button, e) {
                    this.saveDataBase(button);

                }
            },

            'sendmessage  button[action=cancel]': {
                click: function (button, e) {
                    button.up('window').close();
                }
            }

        });
    },
    getCon: function (messagePath) {
        var loginApp = this.application;
        return loginApp.getController(messagePath);
    },
    showWindow: function (panel) {
        this.panel = panel;
        this.getSendmessage();
    },
    saveDataBase: function (button) {
        var form = button.up('window').down('panel');
        var data = form.getValues();
        Ext.Ajax.request({
            url: Soims.service.users.MessageService + '/Sender',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: data,
            success: function (response) {
                button.up('window').close();
                this.panel.getStore().reload();
            }
        });
    }

});