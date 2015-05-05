Ext.define("Soims.view.mainFrame.ModifyPdWin", {
    extend: 'Ext.window.Window',
    alias: 'widget.modifypdwin',
    closable: true,
    iconCls: 'User',
    resizable: false,
    width: 300,
    height: 180,
    modal: true,
    title: '修改密码',
    autoShow: true,
    initComponent: function () {
        this.items = [{
            xtype: 'form',
            border: false,
            bodyStyle: 'background-color:#dfe8f5;',
            //layout: 'column',
            items: [{
                xtype: 'textfield',
                margin: '10 10 10 10',
                itemId: 'password',
                inputType: 'password',
                forbidBlankAndShowStar: true,
                fieldLabel: '新密码'
            }, {
                xtype: 'textfield',
                margin: '10 10 10 10',
                forbidBlankAndShowStar: true,
                itemId: 'confimpassword',
                inputType: 'password',
                fieldLabel: '重新输入新密码',
                validator: this.checkPassWord
            }, {
                xtype: 'textfield',
                margin: '10 10 10 10',
                forbidBlankAndShowStar: true,
                itemId: 'oldpassword',
                inputType: 'password',
                fieldLabel: '旧密码'
            }]
        }];
        this.buttons = [{
            text: '确定',
            xtype: 'button',
            iconCls: 'Disk',
            handler: function (button) {
                var password = button.up('window').down('#password').getValue();
                var oldpassword = button.up('window').down('#oldpassword').getValue();
                var mpd = Ext.MD5(password);
                var ompd = Ext.MD5(oldpassword);

                Ext.Ajax.request({
                    url: Soims.service.users.UserService + '/ChangePd',
                    method: 'POST',
                    scope: this, // 注意scope是必须的
                    params: { id: Soims.currentUser.id, password: mpd, oldpassword: ompd },
                    success: function (response) {
                        if (!response.responseText) {
                            Ext.MessageBox.alert('消息', '修改完成！', function () { }, this);
                            button.up('window').close();
                        } else {
                            Ext.MessageBox.alert('提示', '旧密码输入错误！', function () { }, this);
                        }
                    }
                });
            }
        }, {
            text: '取消',
            xtype: 'button',
            iconCls: 'Cancel',
            handler: function (button) {
                button.up('window').close();
            }
        }];
        this.callParent();
    },
    checkPassWord: function (value) {
        var error = true;
        var field = this.up('form').down('#password');
        if (value !== field.getValue()) {
            error = '确认密码与密码不一致';
        }
        return error;
    }
});