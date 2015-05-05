Ext.define("Soims.view.mainFrame.ImproveInformation", {
    extend: 'Ext.window.Window',
    alias: 'widget.improveinformation',
    closable: true,
    iconCls: 'User',
    resizable: false,
    width: 300,
    modal: true,
    title: '个人信息',
    autoShow: true,
    initComponent: function () {
        var store = Ext.create('Soims.store.department.Department');
        this.items = [{
            xtype: 'form',
            border: false,
            margin: '5 5 5 5',
            bodyStyle: 'background-color: #dfe8f5;',
            layout: 'column',
            items: [{
                xtype: 'panel',
                border: false,
                margin: '5 5 5 5',
                bodyStyle: 'background-color: #dfe8f5;',
                layout: 'form',
                columnWidth: 1,
                items: [{
                    xtype: 'textfield',
                    name: 'id',
                    itemId: 'id',
                    hidden: true
                }, {
                    xtype: 'combobox',
                    name: 'department',
                    itemId: 'department',
                    editable: false,
                    store: store,
                    displayField: 'name',
                    valueField: 'id',
                    forbidBlankAndShowStar: true,
                    emptyText: '请选择您的单位',
                    fieldLabel: '单  位'
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    forbidBlankAndShowStar: true,
                    itemId: 'name',
                    fieldLabel: '姓 名'
                }, {
                    xtype: 'textfield',
                    name: 'loginId',
                    forbidBlankAndShowStar: true,
                    itemId: 'loginId',
                    fieldLabel: '用户名'
                    //                    validateOnChange: false,
                    //                    validator: this.isLoginIdExist
                }, {
                    xtype: 'textfield',
                    name: 'email',
                    forbidBlankAndShowStar: true,
                    vtype: 'email',
                    itemId: 'email',
                    fieldLabel: '邮  箱'
                    //validateOnChange: false,
                    //validator: this.isEmailExist
                }, {
                    xtype: 'textfield',
                    name: 'telphone',
                    //forbidBlankAndShowStar: true,
                    //regex: /^(13\d{9})|(14\d{9})|(15\d{9})|(18\d{9})|(0\d{9,11})|((0\d{2,3})-)(\d{7,8})$/,
                    itemId: 'telphone',
                    fieldLabel: '联系电话'
                }, {
                    xtype: 'textfield',
                    name: 'adress',
                    //forbidBlankAndShowStar: true,
                    itemId: 'adress',
                    fieldLabel: '住  址'
                }, {
                    xtype: 'textfield',
                    name: 'fax',
                    //forbidBlankAndShowStar: true,
                    //regex: /^(\d{3,4}-)?\d{7,8}$/,
                    itemId: 'fax',
                    fieldLabel: '传  真'
                }, {
                    xtype: 'textfield',
                    name: 'cellphone',
                    //forbidBlankAndShowStar: true,
                    //regex: /^(13\d{9})|(14\d{9})|(15\d{9})|(18\d{9})|(0\d{9,11})|((0\d{2,3})-)(\d{7,8})$/,
                    itemId: 'cellphone',
                    fieldLabel: '移动电话'
                }, {
                    xtype: 'textfield',
                    name: 'zipcode',
                    //forbidBlankAndShowStar: true,
                    //regex: /^(\d){6}$/,
                    itemId: 'zipcode',
                    fieldLabel: '邮政编码'
                }]
            }]
        }];
        this.buttons = [{
            text: '确定',
            xtype: 'button',
            itemId: 'savebtn',
            iconCls: 'Disk',
            handler: function (button) {
                //console.log(button.up('window').down('panel').isValid());
                if (button.up('window').down('panel').isValid()) {
                    var win = button.up('window');
                    win.isLoginIdExist(win.down('panel').down('#loginId').getValue(), win);
                }
            }
        }, {
            text: '取消',
            xtype: 'button',
            iconCls: 'Cancel',
            handler: function (button) {
                button.up('window').close();
            }
        }];
        //this.down('panel').down('#savebtn').on('click', this.save);
        this.callParent();
    },
    isLoginIdExist: function (value, win) {
        //var error = true;
        Ext.Ajax.request({
            //async: false,
            url: Soims.service.users.PersonService + '/LoginIsExistExclude',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { value: value, id: Soims.currentUser.id },
            success: function (response) {
                if (response.responseText) {
                    win.isEmailExist(win.down('panel').down('#email').getValue(), win);
                } else {
                    Ext.MessageBox.alert('消息', '该用户名已经被注册了', function () { }, this);
                }
            }
        });
        //return error;
    },
    isEmailExist: function (value, win) {
        //var error = true;
        Ext.Ajax.request({
            //async: false,
            url: Soims.service.users.PersonService + '/EmailIsExist',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { value: value, id: Soims.currentUser.id },
            success: function (response) {
                if (response.responseText) {
                    win.save(win);
                } else {
                    Ext.MessageBox.alert('消息', '该邮箱已经被注册了', function () { }, this);
                }
            }
        });
        //return error;
    },
    save: function (win) {
        //console.log(button.up('window').down('panel').isValid());
        if (win.down('panel').isValid()) {
            var data = win.down('panel').getValues();
            Ext.Ajax.request({
                url: Soims.service.users.UserService + '/Edit',
                method: 'POST',
                scope: this, // 注意scope是必须的
                params: data,
                success: function (response) {
                    Ext.MessageBox.alert('消息', '修改完成！重新登录后生效', function () { }, this);
                    win.close();
                }
            });
        }
    }
});