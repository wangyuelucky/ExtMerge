Ext.define('Soims.controller.mainFrame.Main', {
    extend: 'Ext.app.Controller',
    views: [
        'mainFrame.Viewport'
    ],
    stores: ['message.MessageList'],
    refs: [{
        ref: 'configviewport',
        selector: 'configviewport', // 对应view的别名
        autoCreate: true,
        xtype: 'configviewport'
    }, {
        ref: 'north',
        selector: 'north', // 对应view的别名
        autoCreate: true,
        xtype: 'configviewport'
    }, {
        ref: 'west',
        selector: 'west', // 对应view的别名
        autoCreate: true,
        xtype: 'west'
    }, {
        ref: 'center',
        selector: 'center', // 对应view的别名
        autoCreate: true,
        xtype: 'center'
    }, {
        ref: 'rolemenu',
        selector: 'rolemenu'
    }, {
        ref: 'messagelist',
        selector: 'messagelist',
        autoCreate: true,
        xtype: 'messagelist'
    }],
    init: function () {
        //console.log(Soims.component);
        //        if (Soims.component.mainFrameNorthNotification != undefined) {
        //            console.log(Soims.component.mainFrameNorthNotification);
        //            var component = this.getNorth().down('#noticeButton');
        //            //component.initConfig({ action: Soims.component.mainFrameNorthNotification.Action });
        //            component.setText(Soims.component.mainFrameNorthNotification.Title);
        //            component.setIconCls(Soims.component.mainFrameNorthNotification.IconCls);
        //            component.show();
        //        }
        this.control({
            'west': {
                afterrender: this.afterWestRender
            },
            'north button[action=logout]': {
                click: this.logout
            },
            'north button[action=changePassword]': {
                click: function () {
                    Ext.create('Soims.view.mainFrame.ModifyPdWin').show();
                }
            },
            'north button[action=improveInformation]': {
                click: function () {
                    var win = Ext.create('Soims.view.mainFrame.ImproveInformation').show();
                    var record = Ext.create('Soims.model.department.Department',
                                {
                                    'id': Soims.currentUser.departmentId,
                                    'name': Soims.currentUser.department
                                });
                    win.down('#id').setValue(Soims.currentUser.id);
                    win.down('#department').setValue(record);
                    win.down('#name').setValue(Soims.currentUser.name);
                    win.down('#loginId').setValue(Soims.currentUser.loginId);
                    win.down('#email').setValue(Soims.currentUser.email);
                    win.down('#telphone').setValue(Soims.currentUser.telPhone);
                    win.down('#adress').setValue(Soims.currentUser.address);
                    win.down('#fax').setValue(Soims.currentUser.fax);
                    win.down('#cellphone').setValue(Soims.currentUser.cellPhone);
                    win.down('#zipcode').setValue(Soims.currentUser.zip);
                }
            },
            'north button[action=messageList]': {
                click: function () {
                    var con = this.getCon('message.AllMessageList');
                    con.showAllMessageList();
                }
            },
            //            'north button[itemId=noticeButton]': {
            //                click: function () {
            //                    var con = this.getCon('notification.NotificationList');
            //                    con.showNotificationList();
            //                }
            //            },

            'west panel>a': {
                click: function () {
                    console.log('menu click..');
                }
            },
            'center button[itemId=sendMessage]': {
                click: function () {
                    var con = this.getCon('message.SendMessage');
                    con.showWindow(this.getMessagelist());
                }
            },
            'center  button[action=markAllAsRead]': {
                click: function (button, e) {
                    this.markAllAsRead(button);

                }
            },
            'center button[itemId=check]': {
                click: function (button, e) {

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

            'center  button[action=delete]': {
                click: function (button, e) {
                    Ext.Tools.Confirm('确认', '您确定要删除该条目？',
                    function (btn) {
                        if (btn == 'yes') {
                            this.deleteDataBase(button);
                        }
                    }, this);
                }
            },
            'center  button[itemId=refreshTbar]': {
                click: function (button, e) {
                    button.up('panel').getStore().reload();
                    button.up('panel').getSelectionModel().deselectAll();
                }
            },
            'configviewport>center>panel>messagelist': {
                //监听panel的双击事件
                itemdblclick: function (view, record) {
                },
                //监听panel的行变换事件
                selectionchange: function (selModel, records) {
                    if (records.length != 0) {
                        this.getCenter().down('#delete').setDisabled(false);
                        this.getCenter().down('#check').setDisabled(false);
                    } else {
                        this.getCenter().down('#delete').setDisabled(true);
                        this.getCenter().down('#check').setDisabled(true);
                    }
                }
            },

            'rolemenu': {
                click: this.onRoleClick
            }
        });

    },
    afterWestRender: function () {
        var ab = this.getWest().body;
        // 事件代理，是否有更优雅的方式？
        // 第三个参数改变doAction中this的作用域,
        // 否则的话doAction中的this指向ab
        ab.on('mousedown', this.doAction, this, {
            delegate: 'a'
        });
        ab.on('click', Ext.emptyFn, this, {
            delegate: 'a',
            preventDefault: true
        });
    },
    doAction: function (e, t) {
        var center = this.getCenter();
        center.body.mask('数据加载中...');

        var title = t.childNodes.item(0).innerHTML;

        var actionName = t.id.replace('MenuBarItem-a-', ''),
            loginApp = this.application, controName, methodName, moduleController;

        controName = actionName.split('-')[0];
        methodName = actionName.split('-')[1];
        //        var con = this.getCon('notification.NotificationList');
        //        con.showNotificationList();
        //try {
        if (actionName.split('-').length == 3) {
            moduleController = loginApp.getController(controName);
            moduleController[methodName](actionName.split('-')[2], title);
        }
        else {
            moduleController = loginApp.getController(controName);
            moduleController[methodName]();
        }

        center.body.unmask();
        //} catch (err) {
        //    Ext.Tools.Alert('警告', '对不起，此功能未实现！', 'Q');
        //}
    },
    logout: function () {
        Ext.Tools.Confirm('确认', '您确定要退出本系统吗？ 退出前请保存好您的重要信息！ ', function (result) {
            if (result == 'yes') {
                var loginApp = this.application,
                loginController = loginApp.getController('login.Login');
                loginController.logout();
            }
        }, this); // 注意需要转换scope
    },

    updateUserInfo: function () {
        var lb = this.getNorth().getDockedItems('toolbar[dock="bottom"]')[0].items.items[0];
        this.getNorth().update({ //每个这个方法，图片不显示
            userName: Soims.currentUser.name,
            roleName: Soims.currentUser.currentRoleName
        });
        lb.update({
            userName: Soims.currentUser.name,
            roleName: Soims.currentUser.currentRoleName
        });
    },
    onRoleClick: function (menu, item) {
        if (item.id !== Soims.currentUser.currentRoleID) {
            this.closeAllTabs();
            this.changeRole(menu, item);
            Soims.currentUser.currentRoleID = item.id;
            Soims.currentUser.currentRoleName = item.text;
            Soims.currentUser.currentRoleCode = item.code;
            this.updateUserInfo();
        } else {
            Ext.Tools.Alert('警告', '当前角色即为：' + item.text, 'W');
        }

    },
    changeRole: function (menu, item) {
        Ext.Ajax.request({ // 异步编程，需要优化
            url: Soims.service.users.RoleService + '/ChangeRole',
            method: 'POST',
            scope: this,
            params: { id: item.id },
            success: this.onChangeRoleSuccess
        });
    },
    onChangeRoleSuccess: function (response) {
        this.onGetComponentConfig();
        var west = this.getWest();
        west.body.mask('菜单加载中...');
        Ext.Ajax.request({
            url: Soims.service.users.MenuService + '/ShowMenu',
            method: 'POST',
            scope: west,
            success: this.onChangeMenuSuccess
        });
    },
    onGetComponentConfig: function () {
        Ext.Ajax.request({
            url: Soims.service.users.MenuService + '/GetComponent',
            method: 'POST',
            scope: this,
            success: function (response) {
                console.log(response.responseText);
                Soims.component = Ext.decode(response.responseText);
            }
        });
    },
    onChangeMenuSuccess: function (response) {
        var west = this,
            sysMenus, innerItems, i, len;

        if (response.responseText) {
            west.removeAll();
            sysMenus = Ext.decode(response.responseText);
            west.addItems(sysMenus);
        }
        west.body.unmask();
        Ext.Tools.Msg('切换角色完成！', 0);
    },
    closeAllTabs: function () {
        var center = this.getCenter(),
            tabCloseMenu = center.getPlugin('TabCloseMenu');

        tabCloseMenu.onCloseAll();
    },
    existInstance: function (id) {
        var tabPanel = this.getCenter();
        var panelById = tabPanel.queryById(id);
        if (panelById) {
            tabPanel.setActiveTab(panelById);
            return panelById;
        } else {
            return panelById;
        }
    },
    addTab: function (panel) {
        var tabPanel = this.getCenter();
        var panelById = tabPanel.queryById(panel.getId());
        if (panelById) {
            tabPanel.setActiveTab(panelById);
        } else {
            tabPanel.add(panel);
            tabPanel.setActiveTab(panel);
        }
    },
    getCon: function (messagePath) {
        var loginApp = this.application;
        return loginApp.getController(messagePath);
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

    markAllAsRead: function (button) {
        var panel = button.up('panel');
        var selectionModel = panel.getSelectionModel();
        var record = selectionModel.getSelection()[0];
        Ext.Ajax.request({
            url: Soims.service.users.MessageService + '/MarkAllAsRead',
            method: 'POST',
            scope: this, // 注意scope是必须的
            success: function (response) {
                //                this.getMessageMessageListStore().reload();
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
