Ext.define("Soims.view.user.UserWin", {
    extend: 'Ext.window.Window',
    alias: 'widget.userwin',
    requires: ['Soims.store.department.Department'],
    closable: true,
    iconCls: 'User',
    resizable: false,
    width: 600,
    height: 135,
    modal: true,
    title: '用户',
    autoShow: true,
    initComponent: function () {
        var store = Ext.create('Soims.store.department.Department');
        this.items = [{
            xtype: 'form',
            border: false,
            bodyStyle: 'background-color:#dfe8f5;',
            layout: 'column',
            items: [{
                xtype: 'textfield',
                name: 'id',
                itemId: 'id',
                hidden: true
            }, {
                xtype: 'panel',
                border: false,
                margin: '5 5 5 5',
                bodyStyle: 'background-color:#dfe8f5;',
                layout: 'form',
                columnWidth: .5,
                items: [{
                    xtype: 'textfield',
                    name: 'name',
                    forbidBlankAndShowStar: true,
                    allowBlank: false,
                    itemId: 'name',
                    fieldLabel: '用户姓名'
                }, {
                    xtype: 'textfield',
                    name: 'email',
                    allowBlank: false,
                    forbidBlankAndShowStar: true,
                    vtype: 'email',
                    itemId: 'email',
                    fieldLabel: '用户邮箱',
                    validateOnChange: false,
                    validator: this.isEmailExist
                }]
            }, {
                xtype: 'panel',
                border: false,
                layout: 'form',
                bodyStyle: 'background-color:#dfe8f5;',
                margin: '5 5 5 5',
                columnWidth: .5,
                items: [{
                    xtype: 'combobox',
                    name: 'department',
                    itemId: 'department',
                    store: store,
                    //forceSelection: true,
                    editable: false,
                    forbidBlankAndShowStar: true,
                    displayField: 'name',
                    valueField: 'id',
                    allowBlank: false,
                    emptyText: '请选择您的单位',
                    fieldLabel: '单 位'
                }, {
                    xtype: 'textfield',
                    name: 'telphone',
                    forbidBlankAndShowStar: true,
                    regex: /^(13\d{9})|(14\d{9})|(15\d{9})|(18\d{9})|(0\d{9,11})|((0\d{2,3})-)(\d{7,8})$/,
                    itemId: 'telphone',
                    fieldLabel: '联系电话'
                }]
            }]
        }];
        this.buttons = [{
            text: '确定',
            xtype: 'button',
            iconCls: 'Disk',
            itemId: 'determine'
        }, {
            text: '取消',
            xtype: 'button',
            iconCls: 'Cancel',
            itemId: 'cancel'
        }];
        this.callParent();
    },
    isEmailExist: function (value) {
        var error = true;
        var id = this.up('form').down('#id').getValue();
        Ext.Ajax.request({
            async: false,
            url: Soims.service.users.PersonService + '/EmailIsExist',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { value: value ,id: id },
            success: function (response) {
                if (response.responseText) {
                    error = true;
                } else {
                    error = "该邮箱已经被注册了";
                }
            }
        });
        return error;
    }
});