
Ext.define("Soims.view.login.RegistForm", {
    extend: 'Ext.form.Panel',
    alias: 'widget.registform',
    requires: ['Soims.store.department.Department'],
    border: false,
    bodyStyle: 'background-color: #dfe8f5;',
    width: 600,
    layout: 'column',
    //bodyStyle: 'padding:5px',
    initComponent: function () {
        var store = Ext.create('Soims.store.department.Department');
        this.items = [{
            xtype: 'panel',
            border: false,
            margin: '5 5 5 5',
            bodyStyle: 'background-color: #dfe8f5;',
            layout: 'form',
            columnWidth: 0.5,
            items: [{
                xtype: 'combobox',
                name: 'department',
                itemId: 'department',
                forceSelection: true,
                editable: false,
                store: store,
                displayField: 'name',
                valueField: 'id',
                forbidBlankAndShowStar: true,
                emptyText: '请选择您的单位',
                fieldLabel: '单  位'
            }, {
                xtype: 'textfield',
                name: 'loginId',
                forbidBlankAndShowStar: true,
                itemId: 'loginId',
                fieldLabel: '用户名',
                validateOnChange: false,
                validator: this.isLoginIdExist
            }, {
                xtype: 'textfield',
                name: 'email',
                forbidBlankAndShowStar: true,
                vtype: 'email',
                itemId: 'email',
                fieldLabel: '邮  箱',
                validateOnChange: false,
                validator: this.isEmailExist
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
            }]
        }, {
            xtype: 'panel',
            border: false,
            layout: 'form',
            margin: '5 5 5 5',
            bodyStyle: 'background-color: #dfe8f5;',
            columnWidth: 0.5,
            items: [{
                xtype: 'textfield',
                name: 'name',
                forbidBlankAndShowStar: true,
                itemId: 'name',
                fieldLabel: '姓 名'
            }, {
                xtype: 'textfield',
                name: 'password',
                forbidBlankAndShowStar: true,
                itemId: 'password',
                inputType: 'password',
                fieldLabel: '密  码'
            }, {
                xtype: 'textfield',
                name: 'confimpassword',
                forbidBlankAndShowStar: true,
                itemId: 'confimpassword',
                inputType: 'password',
                fieldLabel: '确认密码',
                validateOnChange: false,
                validator: this.checkPassWord
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
        }];
        this.callParent();
    },
    isLoginIdExist: function (value) {
        var error = true;
        Ext.Ajax.request({
            async: false,
            url: Soims.service.users.PersonService + '/LoginIsExist',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { value: value },
            success: function (response) {
                if (response.responseText) {
                    error = true;
                } else {
                    error = "该用户名已经被注册了";
                }
            }
        });
        return error;
    },
    isEmailExist: function (value) {
        var error = true;
        Ext.Ajax.request({
            async: false,
            url: Soims.service.users.PersonService + '/EmailIsExist',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { value: value },
            success: function (response) {
                if (response.responseText) {
                    error = true;
                } else {
                    error = "该邮箱已经被注册了";
                }
            }
        });
        return error;
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