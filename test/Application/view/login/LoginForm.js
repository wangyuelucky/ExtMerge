
Ext.define("Soims.view.login.LoginForm", {
    extend: 'Ext.form.Panel',
    alias: 'widget.loginform',
    renderTo: 'ExtLoginForm',
    title: '用户登陆',
    frame: true,
    bodyStyle: 'padding:5px',
    width: 275,
    iconCls: 'User',
    _isTextFieldLoginIdValid: false,
    _isTextFieldPassword: false,
    _checkCodeValid: false,
    initComponent: function () {
        var checkcode = Ext.create('Ext.ux.form.CheckCode', {
            fieldLabel: '验证码',
            name: 'loginCheckcode',
            id: 'loginCheckcode',
            allowBlank: false,
            isLoader: true,
            enableKeyEvents: true,
            blankText: '验证码不能为空',
            codeUrl: Soims.service.users.UserService + '/GetVerifyCode',
            width: 130,
            labelWidth: 60
        });
        // 加入两个fieldset的目的是，解决CheckCode createChild总是在最后的问题
        this.items = Ext.widget('form', {
            items: [{
                xtype: 'fieldset',
                title: '',
                collapsible: false,
                border: false,
                defaultType: 'textfield',
                defaults: {
                    margins: '10 0 0 0'
                },
                items: [{
                    name: 'username',
                    fieldLabel: '用户名',
                    labelWidth: 60,
                    style: 'margin-top:10px;',
                    allowBlank: false,
                    blankText: '请输入您的用户名',
                    msgTarget: 'side',
                    emptyText: '登陆名',
                    selectOnFocus: true,
                    enableKeyEvents: true
                }, {
                    name: 'password',
                    fieldLabel: '密　码',
                    labelWidth: 60,
                    allowBlank: false,
                    blankText: '请输入您的密码',
                    inputType: 'password',
                    msgTarget: 'side',
                    enableKeyEvents: true
                },
                    checkcode
                ]
            }, {
                xtype: 'fieldset',
                title: '',
                collapsible: false,
                border: false,
                layout: 'column',
                items: [{
                    columnWidth: .47,
                    xtype: 'checkbox',
                    name: 'autoLogin',
                    style: 'margin-left:10px;',
                    boxLabel: '下次自动登陆'
                }, {
                    columnWidth: .47,
                    cls: 'x-field x-form-item', // 解决不能对其的问题
                    border: false,
                    xtype: 'component',
                    style: 'margin-top:3px;margin-left:40px;', 
                    name: 'forgetPass',
                    html: "<div><a href='#' title='找回密码'>忘记密码？</a></div>"
                }]
            }],

            buttons: [{
                itemId: 'loginBtn',
                text: '登录',
                iconCls: 'CssGo',
                disabled: true,
                action: 'onLogin'
            }, {
                itemId: 'registBtn',
                text: '注册',
                iconCls: 'Key',
                action: 'onRegist'
            }]
        });

        this.callParent(arguments);
    },
    showLicence: function () {
        Ext.Msg.defaultTextHeight = 0;
        Ext.Msg.buttonText.yes = '同意';
        Ext.Msg.buttonText.no = '不同意';
        Ext.Msg.show({
            title: '用户协议',
            msg: Ipms.FormLogin.LICENCE,
            buttons: Ext.Msg.YESNO,
            width: 600,
            closable: false,
            scope: this,
            fn: this.onShowLicence
        });
    },
    onShowLicence: function (buttonId) {
        var loginBtn = this.items[0].dockedItems[0],
                    loginID = this.items.items[0],
                    password = this.items.items[1];
        loginBtn.setText(' 登 陆 ');
        loginBtn.enable();
        Ext.Msg.buttonText.yes = '是';
        Ext.Msg.buttonText.no = '否';
        if (buttonId == 'yes') {
            Ext.Ajax.request({
                url: Soims.service.users.UserService + '/AgreeLicence',
                method: 'POST',
                scope: this,
                params: {
                    loginId: loginID.getValue(),
                    password: password.getValue()
                }
            });
        }
    },
    onLoginFail: function (loginResult) {
        var loginBtn = this.down('#loginBtn'); // 有其他的定位方式吗？
        loginBtn.setText(' 登 陆 ');
        loginBtn.enable();

        Ext.Tools.Alert('登陆失败', '<br />' + loginResult.stateDescription, 'w', this.clearAll, this);
    },
    clearAll: function () {
        var username = this.down('textfield[name=username]'),
            password = this.down('textfield[name=password]'),
            checkcode = this.down('checkcode#loginCheckcode').setValue('');

        username.setValue('');
        password.setValue('');
        checkcode.setValue('');

        username.focus();
        checkcode.loadCodeImg();

        this._isTextFieldLoginIdValid = false;
        this._isTextFieldPassword = false;
        this._checkCodeValid = false;
    }
});