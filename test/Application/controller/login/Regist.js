
Ext.define('Soims.controller.login.Regist', {
    extend: 'Ext.app.Controller',
    views: ['login.RegistWin'],
    refs: [{
        ref: 'registwin',
        selector: 'registwin',
        autoCreate: true,
        xtype: 'registwin'
    }],
    init: function () {
        this.control({
            'registwin button[itemId=cancel]': { // 注意loginform是别名
                click: function (button, e) {
                    button.up('window').close();
                }
            },
            'registwin button[itemId=submit]': { // 注意loginform是别名
                click: function (button, e) {
                    button.setDisabled(true);
                    if (button.up('window').down('panel').isValid()) {
                        Ext.MessageBox.confirm('提示', '请确保您的邮箱为您的可用邮箱！此邮箱将用作您账号的激活',
                        function (btn) {
                            if (btn == 'yes') {
                                this.save(button);
                            } else {
                                button.setDisabled(false);
                            }
                        }, this);
                    }
                }
            }

        });
    },
    show: function () {
        var win = this.getRegistwin();
        win.show();
    },
    onCancelBtnClick: function () {
    },
    save: function (button) {
        var form = button.up('window').down('panel');
        var data = form.getValues();

        var mpd = Ext.MD5(data.password);
        Ext.apply(data, { password: mpd });

        Ext.Ajax.request({
            url: Soims.service.users.PersonService + '/Save',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: data,
            success: function (response) {
                if (response.responseText) {
                    Ext.MessageBox.alert('警告', '您的邮箱已被注册，如有问题，请联系大洋馆！', function () { }, this);
                } else {
                    Ext.MessageBox.alert('提示', '您的注册信息已经提交，一封激活邮件将在十分钟内发至您的邮箱，请点击激活账号', function () { }, this);
                    button.up('window').close();
                }
            }
        });
    },
    getController: function (contPath) {
        var loginApp = this.application;
        return loginApp.getController(contPath);
    }
});