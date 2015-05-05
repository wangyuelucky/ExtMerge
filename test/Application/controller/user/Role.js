Ext.define('Soims.controller.user.Role', {
    extend: 'Ext.app.Controller',
    stores: ['user.Role'],
    views: ['user.Role'],
    refs: [{
        ref: 'role',
        selector: 'role',
        autoCreate: true,
        xtype: 'role'
    }],
    init: function () {
        this.control({
            'role  button[itemId=add]': {
                click: function (button, e) {
                }
            },
            'role  button[itemId=manageRight]': {
                click: function (button, e) {
                }
            },
            'role  button[itemId=showRight]': {
                click: function (button, e) {
                }
            },
            'role  button[itemId=refreshTbarRole]': {
                click: function (button, e) {
                    button.up('panel').getStore().reload();
                    button.up('panel').getSelectionModel().deselectAll();
                }
            },
            'role': {
                //监听panel的双击事件
                itemdblclick: function (view, record) {
                },
                //监听panel的行变换事件
                selectionchange: function (selModel, records) {
                    if (records.length != 0) {
                        this.getRole().down('#manageRight').setDisabled(false);
                        this.getRole().down('#showRight').setDisabled(false);
                    } else {
                        this.getRole().down('#manageRight').setDisabled(true);
                        this.getRole().down('#showRight').setDisabled(true);
                    }
                }
            }
        });
    },
    show: function () {
        var panel = this.getRole();
        this.getUserRoleStore().load();
        var con = this.getCon('mainFrame.Main');
        con.addTab(panel);
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    }
});