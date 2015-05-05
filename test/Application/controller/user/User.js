Ext.define('Soims.controller.user.User', {
    extend: 'Ext.app.Controller',
    stores: ['user.User'],
    views: ['user.User'],
    refs: [{
        ref: 'user',
        selector: 'user',
        autoCreate: true,
        xtype: 'user'
    }],
    init: function () {
        this.control({
            'user  button[itemId=add]': {
                click: function (button, e) {
                    var win = this.getCon('user.UserWin');
                    win.show();
                }
            },
            'user  button[itemId=modify]': {
                click: function (button, e) {
                    var con = this.getCon('user.UserWin');
                    var panel = button.up('panel');
                    var selectionModel = panel.getSelectionModel();
                    var record = selectionModel.getSelection()[0];

                    con.getUserwin().down('panel').loadRecord(record);
                    //con.getUserwin().down('panel').down('#department').setValue(record.get('departmentID'))
                }
            },
            'user  button[itemId=delete]': {
                click: function (button, e) {
                    Ext.MessageBox.confirm('确认', '您确定要删除此用户么，用户所有信息都将丢失？',
                    function (btn) {
                        if (btn == 'yes') {
                            this.deleteDataBase(button);
                        }
                    }, this);
                }
            },
            'user  button[itemId=manageRole]': {
                click: function (button, e) {
                    var con = this.getCon('user.RoleWin');
                    var panel = button.up('panel');
                    var selectionModel = panel.getSelectionModel();
                    var record = selectionModel.getSelection()[0];

                    con.show(record.get('roleIds'));
                }
            },
            'user  button[itemId=resetPd]': {
                click: function (button, e) {
                    var panel = button.up('panel');
                    var selectionModel = panel.getSelectionModel();
                    var records = selectionModel.getSelection();
                    var id = records[0].get('id');
                    Ext.MessageBox.confirm('确认', '您确定要重置该用户密码么？',
                    function (btn) {
                        if (btn == 'yes') {
                            Ext.Ajax.request({
                                url: Soims.service.users.UserService + '/ResetPd',
                                method: 'POST',
                                scope: this, // 注意scope是必须的
                                params: { id: id },
                                success: function (response) {
                                    Ext.MessageBox.alert('消息', '重置完成！', function () { }, this);
                                }
                            });
                        }
                    }, this);
                }
            },
            'user  button[itemId=frozenUser]': {
                click: function (button, e) {
                    var panel = button.up('panel');
                    var selectionModel = panel.getSelectionModel();
                    var records = selectionModel.getSelection();
                    var id = records[0].get('id');
                    Ext.MessageBox.confirm('确认', '您确定要冻结该用户么？',
                    function (btn) {
                        if (btn == 'yes') {
                            Ext.Ajax.request({
                                url: Soims.service.users.UserService + '/FrozenUser',
                                method: 'POST',
                                scope: this, // 注意scope是必须的
                                params: { id: id },
                                success: function (response) {
                                    Ext.MessageBox.alert('消息', '冻结完成！', function () { }, this);
                                }
                            });
                        }
                    }, this);
                }
            },
            'user  button[itemId=thawUser]': {
                click: function (button, e) {
                    var panel = button.up('panel');
                    var selectionModel = panel.getSelectionModel();
                    var records = selectionModel.getSelection();
                    var id = records[0].get('id');
                    Ext.MessageBox.confirm('确认', '您确定要解冻该用户么？',
                    function (btn) {
                        if (btn == 'yes') {
                            Ext.Ajax.request({
                                url: Soims.service.users.UserService + '/ThawUser',
                                method: 'POST',
                                scope: this, // 注意scope是必须的
                                params: { id: id },
                                success: function (response) {
                                    Ext.MessageBox.alert('消息', '解冻完成！', function () { }, this);
                                }
                            });
                        }
                    }, this);
                }
            },
            'user  button[itemId=refreshTbarUser]': {
                click: function (button, e) {
                    button.up('panel').getStore().reload();
                    button.up('panel').getSelectionModel().deselectAll();
                }
            },
            'user': {
                //监听panel的双击事件
                itemdblclick: function (view, record) {
                },
                //监听panel的行变换事件
                selectionchange: function (selModel, records) {
                    if (records.length != 0) {
                        this.getUser().down('#modify').setDisabled(false);
                        if (records[0].get('roleIds') == '') {
                            this.getUser().down('#delete').setDisabled(false);
                        } else {
                            this.getUser().down('#delete').setDisabled(false);
                        }
                        this.getUser().down('#manageRole').setDisabled(false);
                        this.getUser().down('#resetPd').setDisabled(false);
                        this.getUser().down('#frozenUser').setDisabled(false);
                        this.getUser().down('#thawUser').setDisabled(false);
                    } else {
                        this.getUser().down('#modify').setDisabled(true);
                        this.getUser().down('#delete').setDisabled(true);
                        this.getUser().down('#manageRole').setDisabled(true);
                        this.getUser().down('#resetPd').setDisabled(true);
                        this.getUser().down('#frozenUser').setDisabled(true);
                        this.getUser().down('#thawUser').setDisabled(true);
                    }
                }
            }
        });
    },
    show: function () {
        var panel = this.getUser();
        var con = this.getCon('mainFrame.Main');
        con.addTab(panel);
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    },
    deleteDataBase: function (button) {
        var panel = button.up('panel');
        var selectionModel = panel.getSelectionModel();
        var records = selectionModel.getSelection();
        var id = records[0].get('id');
        Ext.Ajax.request({
            url: Soims.service.users.UserService + '/Delete',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { id: id },
            success: function (response) {
                this.getUserUserStore().reload();
            }
        });
    }
});