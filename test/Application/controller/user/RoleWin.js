Ext.define('Soims.controller.user.RoleWin', {
    extend: 'Ext.app.Controller',
    stores: ['user.RoleWin'],
    views: ['user.RoleWin'],
    refs: [{
        ref: 'rolewin',
        selector: 'rolewin',
        autoCreate: true,
        xtype: 'rolewin'
    }],
    init: function () {
        this.control({
            'rolewin  button[itemId=determine]': {
                click: function (button, e) {
                    this.saveRole(button);
                }
            },
            'rolewin>panel': {
                checkchange: function (node, checked) {
                }
            },
            'rolewin  button[itemId=cancel]': {
                click: function (button, e) {
                    button.up('window').close();
                }
            }
        });
    },
    show: function (ids) {
        var win = this.getRolewin();
        var store = this.getUserRoleWinStore();
        var ids = ids.split(',');
        store.load({ callback: function () {
            Ext.Array.each(ids, function (id) {
                if (id) {
                    store.each(function (rec) {
                        if (rec.get('id') == id) {
                            win.down('panel').getSelectionModel().select(rec, true);
                        }
                    });
                }
            });
        }
        });
        win.show();
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    },
    saveRole: function (button) {
        var panel = button.up('window').down('panel');
        var selectionModel = panel.getSelectionModel();
        var records = selectionModel.getSelection();
        if (records.length == 0) {
            Ext.MessageBox.alert('警告', '您至少要为该用户指定一种角色！', function () { }, this);
            return;
        } else {
            this.saveR(records);
            button.up('window').close();
        }
    },
    saveR: function (records) {
        var con = this.getCon('user.User');
        var panel = con.getUser();
        var selectionModel = panel.getSelectionModel();
        var record = selectionModel.getSelection()[0];
        var id = record.get('id');
        var ids = '';
        Ext.Array.each(records, function (rec) {
            if (rec.get('id')) {
                ids = ids + rec.get('id') + ',';
            }
        });
        Ext.Ajax.request({
            url: Soims.service.users.UserService + '/SaveRoleByIds',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { id: id, ids: ids },
            success: function (response) {
                con.getUserUserStore().reload();
                con.getUser().getSelectionModel().deselectAll();
            }
        });
    }
});