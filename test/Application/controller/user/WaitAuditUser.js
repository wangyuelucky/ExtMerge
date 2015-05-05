Ext.define('Soims.controller.user.WaitAuditUser', {
    extend: 'Ext.app.Controller',
    stores: ['user.WaitAuditUser'],
    views: ['user.WaitAuditUser'],
    refs: [{
        ref: 'waitAuditUser',
        selector: 'waitAuditUser',
        autoCreate: true,
        xtype: 'waitAuditUser'
    }],
    init: function () {
        this.control({
            'waitAuditUser  button[itemId=pass]': {
                click: function (button, e) {
                    this.saveAsUser(button);
                }
            },
            'waitAuditUser  button[itemId=reject]': {
                click: function (button, e) {
                    this.deleteDataBase(button);
                }
            },
            'waitAuditUser  button[itemId=refreshTbarAudit]': {
                click: function (button, e) {
                    button.up('panel').getStore().reload();
                    button.up('panel').getSelectionModel().deselectAll();
                }
            },
            'waitAuditUser': {
                //监听panel的双击事件
                itemdblclick: function (view, record) {
                },
                //监听panel的行变换事件
                selectionchange: function (selModel, records) {
                    if (records.length != 0) {
                        this.getWaitAuditUser().down('#pass').setDisabled(false);
                        this.getWaitAuditUser().down('#reject').setDisabled(false);
                    } else {
                        this.getWaitAuditUser().down('#pass').setDisabled(true);
                        this.getWaitAuditUser().down('#reject').setDisabled(true);
                    }
                }
            }
        });
    },
    show: function () {
        var panel = this.getWaitAuditUser();
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
        var ids = '';
        Ext.Array.each(records, function (rec) {
            if (rec.get('id')) {
                ids = ids + rec.get('id') + ',';
            }
        });
        Ext.Ajax.request({
            url: Soims.service.users.PersonService + '/DeletePersonByIds',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { ids: ids },
            success: function (response) {
                this.getUserWaitAuditUserStore().reload();
            }
        });
    },
    saveAsUser: function (button) {
        var panel = button.up('panel');
        var selectionModel = panel.getSelectionModel();
        var records = selectionModel.getSelection();
        var ids = '';
        Ext.Array.each(records, function (rec) {
            if (rec.get('id')) {
                ids = ids + rec.get('id') + ',';
            }
        });
        Ext.Ajax.request({
            url: Soims.service.users.UserService + '/SaveAuditUserByIds',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { ids: ids },
            success: function (response) {
                this.getUserWaitAuditUserStore().reload();
            }
        });
    }
});