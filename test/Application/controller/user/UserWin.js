Ext.define('Soims.controller.user.UserWin', {
    extend: 'Ext.app.Controller',
    views: ['user.UserWin'],
    refs: [{
        ref: 'userwin',
        selector: 'userwin',
        autoCreate: true,
        xtype: 'userwin'
    }],
    init: function () {
        this.control({
            'userwin  button[itemId=determine]': {
                click: function (button, e) {
                    if (button.up('window').down('panel').isValid()) {
                        this.save(button);
                    }
                }
            },
            'userwin  button[itemId=cancel]': {
                click: function (button, e) {
                    button.up('window').close();
                }
            }
        });
    },
    show: function () {
        var win = this.getUserwin();
        win.show();
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    },
    save: function (button) {
        var form = button.up('window').down('panel');
        var data = form.getValues();
        Ext.Ajax.request({
            url: Soims.service.users.UserService + '/Save',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: data,
            success: function (response) {
                if (!response.responseText) {
                    button.up('window').close();
                    var con = this.getCon('user.User');
                    con.getUser().getStore().reload();
                    con.getUser().getSelectionModel().deselectAll();
                } else {
                    Ext.MessageBox.alert('警告', '该邮箱已经注册，请检查待审核的用户列表和用户列表', function () { }, this);
                }
            }
        });
    }
});