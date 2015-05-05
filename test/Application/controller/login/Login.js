Ext.define('Soims.controller.login.Login', {
    extend: 'Ext.app.Controller',
    views: ['login.LoginForm'],
    refs: [{
        ref: 'loginForm',
        selector: 'loginform', // 对应view的别名
        autoCreate: true,
        xtype: 'loginform'
    }],
    init: function () {
        this.control({
            'loginform button[action=onLogin]': { // 注意loginform是别名
                click: this.onLoginBtnClick
            },
            'loginform button[action=onRegist]': { // 注意loginform是别名
                click: this.onRegistBtnClick
            },
            'loginform component[name=forgetPass]': {
                afterrender: function (cmp) {
                    var me = this,
                        links = cmp.getEl().select('a');

                    links.on('click', me.onForgetPassBtnClick, cmp);
                }
            },
            'loginform textfield[name=username]': {
                change: this.onTextFieldLoginIdValid,
                keypress: this.onTextField_KeyPress
            },
            'loginform textfield[name=password]': {
                change: this.onTextFieldPasswordValid,
                keypress: this.onTextField_KeyPress
            },
            'loginform checkcode#loginCheckcode': {
                change: this.onTextFieldCheckCodeValid,
                keypress: this.onTextField_KeyPress
            }
        });
    },
    getController: function (contPath) {
        var loginApp = this.application;
        return loginApp.getController(contPath);
    },
    tryLoginByToken: function () {
        var token = Cookies.getToken();
        if (token) {
            Ext.Ajax.request({
                url: Soims.service.users.UserService + '/Active',
                success: this.onTryLoginByToken,
                method: 'GET',
                scope: this, // 注意scope是必须的
                extraParams: undefined,
                params: {
                    token: token
                }
            });
        } else {
            this.tryLoginByLoginIdAndPassword();
        }
    },
    onTryLoginByToken: function (response) {
        var loginResult = this.parseLoginResult(response);
        if (loginResult.isSucceed) {
            this.setCurrentLoginLog(loginResult);
            this.onLoadMain();
        } else {
            this.tryLoginByLoginIdAndPassword();
        }
    },
    tryLoginByLoginIdAndPassword: function () {
        var isRememberLogin = Cookies.getIsRememberLogin();
        var loginId = Cookies.getLoginId();
        var password = Cookies.getPassword();

        if (isRememberLogin && loginId && password) {
            this.loginByDefault(loginId, password, this.onTryLoginByLoginIdAndPassword);
        } else {
            this.loadLoginForm();
        }
    },
    onTryLoginByLoginIdAndPassword: function (loginResult) {
        if (loginResult.isSucceed) {
            this.onLoadMain();
        } else {
            this.loadLoginForm();
        }
    },

    // form login
    loadLoginForm: function () {
        Ext.get('DivLoading').remove();

        var loginForm = this.getLoginForm();
        //        var app = this.application;
        //        app.getController('notification.Notification').showNotification();

        loginForm.down('textfield[name=username]').focus();

        /******* 在IE8下报错
        ******* 因为loginForm已经render一次了

        window.onresize = function () {
        if (loginForm)
        loginForm.render('DivWrapper');
        };

        ********/
    },
    // 点击登录按钮
    onLoginBtnClick: function (loginBtn) {
        var loginform = loginBtn.up('loginform'),
            checkcode, loginID, password, mdp;

        checkcode = loginform.down('checkcode#loginCheckcode').getValue();
        loginID = loginform.down('textfield[name=username]').getValue();
        password = loginform.down('textfield[name=password]').getValue();
        mdp = Ext.MD5(password);

        Ext.Ajax.request({
            url: Soims.service.users.UserService + '/IsUseful',
            method: 'POST',
            scope: this, // 注意，这里会改变其他function的this指针
            params: {
                loginId: loginID
            },
            success: function (response) {
                if (response.responseText) {
                    Ext.MessageBox.alert('警告', '无效用户！如有疑问，请联系大洋馆', function () { }, this);
                } else {
                    loginBtn.setText('正在登陆');
                    loginBtn.disable();
                    this.login(checkcode, loginID, mdp);
                }
            }
        });
    },
    onRegistBtnClick: function (registBtn) {
        var registController = this.getController('login.Regist');
        //            registForm = registController.getRegistwin(),
        //            loginForm = this.getLoginForm(),
        //            username = registForm.down('textfield[name=name]');

        //        loginForm.hide();
        //        registForm.show();
        //        username.focus();
        registController.show();
    },
    // 点击忘记密码
    onForgetPassBtnClick: function (forgetLab) {
        Ext.Msg.show({
            title: '找回密码',
            msg: '<br />您可以发送主题为“索取密码”的邮件至：<a href="mailto:sample_cosr@fio.org.cn" />sample_cosr@fio.org.cn</a> 索取您的密码。邮件中，请注明您的姓名、单位、联系电话。<br /><br />感谢您的支持！<br /><div style="width: 100%; text-align: right">中国大洋样品馆&nbsp;&nbsp;&nbsp;</div>',
            buttons: Ext.Msg.OK,
            animEl: forgetLab.id,
            width: 400,
            cls: 'forget-password'
        });
    },
    login: function (checkcode, loginId, password) {
        Ext.Ajax.request({
            url: Soims.service.users.UserService + '/Login',
            success: this.onLoginSuccess,
            method: 'POST',
            scope: this, // 注意，这里会改变其他function的this指针
            params: {
                checkcode: checkcode,
                loginId: loginId,
                password: password
            }
        });
    },
    loginByDefault: function (loginId, password) {
        Ext.Ajax.request({
            url: Soims.service.users.UserService + '/LoginByDefault',
            success: this.onLoginSuccess,
            method: 'POST',
            scope: this, // 注意，这里会改变其他function的this指针
            params: {
                loginId: loginId,
                password: password
            }
        });
    },
    onFormLogin: function (loginResult) {
        var loginForm = this.getLoginForm();

        if (loginResult.isSucceed) {
            this.onFormLoginSuccess(loginResult);
            return;
        }

        if (loginResult.state == 'NotAgreeLicence') {
            loginForm.showLicence();
            return;
        }
        loginForm.onLoginFail(loginResult);
    },
    onFormLoginSuccess: function (loginResult) {
        var loginForm = this.getLoginForm(),
            autoLogin = loginForm.down('checkbox[name=autoLogin]'),
            loginID, password, mdp;

        if (autoLogin.getValue()) {
            loginID = loginForm.down('textfield[name=username]').getValue(),
            password = loginForm.down('textfield[name=password]').getValue();
            mdp = Ext.MD5(password);

            Cookies.setLoginId(loginID);
            Cookies.setPassword(mdp);
            Cookies.setIsRememberLogin(true);
        }
        this.onLoadMain();
    },
    onLoginSuccess: function (response) {
        var loginResult = this.parseLoginResult(response);
        if (loginResult.isSucceed)
            this.setCurrentLoginLog(loginResult);

        this.onFormLogin(loginResult);
    },

    setCurrentLoginLog: function (loginResult) {
        Cookies.setToken(loginResult.loginLog.token);

        Soims.currentLoginLog = loginResult.loginLog;
        Soims.currentUser = loginResult.loginLog.user;

        //Ext.TaskManager.start(this.activeTask); // 注意跟2.x不同
        Ext.Ajax.extraParams = {
            token: Soims.currentLoginLog.token
        };
    },
    onLoadMain: function () {
        var self = this;
        Ext.Ajax.request({ // 加载系统菜单
            url: Soims.service.users.MenuService + '/ShowMenu',
            method: 'POST',
            scope: self,
            success: function (response) {
                this.onGetComponentConfig();
                Ext.TaskManager.start(this.activeTask);
                if (response.responseText) {
                    var sysMenus = Ext.decode(response.responseText);
                    self.loadMain(sysMenus);
                }
            }
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
    // call main module
    loadMain: function (sysMenus) {
        var self = this,
                loginApp = this.application;

        window.onresize = Ext.emptyFn;


        var mainController = this.getController('mainFrame.Main');

            Ext.get('MainDiv').remove();
            //Ext.get('DivWrapper').remove();
            Ext.getBody().setStyle('text-align', 'left');
            mainController.getConfigviewport().show();
            mainController.updateUserInfo();
            mainController.getWest().addItems(sysMenus);
    },
    // active
    activeTask: {
        run: function () {
            var token = Soims.currentLoginLog.token;
            if (token == undefined)
                Soims.currentLoginLog.token = Cookies.getToken();
            Ext.Ajax.request({
                url: Soims.service.users.UserService + '/Active',
                success: this.onActive,
                method: 'POST'
            });

        },
        interval: 1000 * 60
    },
    onActive: function (response) {
        var loginResult = this.parseLoginResult(response);
        if (!loginResult.isSucceed) {
            Ext.Msg.show({
                title: '登陆失效',
                msg: '您的登录信息已失效，请重新登陆。',
                buttons: Ext.Msg.OK,
                fn: function () {
                    window.location.reload(true);
                },
                icon: Ext.MessageBox.WARNING
            });
        }
    },

    //logout
    logout: function () {
        Ext.Ajax.request({
            url: Soims.service.users.UserService + '/Logout',
            success: this.onLogoutSuccess,
            method: 'GET'
        });
    },
    onLogoutSuccess: function () {
        Soims.currentLoginLog = undefined;

        Cookies.setToken(undefined);
        Cookies.setLoginId(undefined);
        Cookies.setPassword(undefined);
        Cookies.setIsRememberLogin(false);

        window.location.reload(true);
    },

    // parse
    parseLoginResult: function (response) {
        var loginResult = {};
        loginResult.state = Ext.DomQuery.selectValue('/LoginResult/State', response.responseXML);
        loginResult.stateDescription = this.parseLoginResultState(loginResult.state);
        loginResult.isSucceed = loginResult.state == 'Succeed';

        if (loginResult.isSucceed) {
            loginResult.loginLog = this.parseLoginLog(Ext.DomQuery.selectNode('/LoginResult/UserLoginLog', response.responseXML));
        }

        return loginResult;
    },
    parseLoginLog: function (node) {
        var loginLog = {};
        loginLog.token = Ext.DomQuery.selectValue('/Token', node);
        loginLog.user = this.parseUser(Ext.DomQuery.selectNode('/User', node));
        loginLog.user.currentRoleID = Ext.DomQuery.selectValue('/CurrentRoleID', node);
        loginLog.user.currentRoleCode = Ext.DomQuery.selectValue('/CurrentRoleCode', node);
        loginLog.user.currentRoleName = Ext.DomQuery.selectValue('/CurrentRoleName', node);

        return loginLog;
    },
    parseUser: function (node) {
        var user = {};
        var getBoolean = function (p, n) {
            return Boolean.toBoolean(Ext.DomQuery.selectValue(p, n));
        };
        // 加入用户角色
        user.id = Ext.DomQuery.selectValue('/ID', node);
        user.name = Ext.DomQuery.selectValue('/Name', node);
        user.address = Ext.DomQuery.selectValue('/Address', node);
        user.loginId = Ext.DomQuery.selectValue('/LoginID', node);
        user.nameSpell = getBoolean('/NameSpell', node);
        user.passwordChanged = getBoolean('/PasswordChanged', node);
        user.department = Ext.DomQuery.selectValue('/Department', node);
        user.departmentId = Ext.DomQuery.selectValue('/DepartmentId', node);
        user.email = Ext.DomQuery.selectValue('/Email', node);
        user.zip = Ext.DomQuery.selectValue('/Zip', node);
        user.cellPhone = Ext.DomQuery.selectValue('/CellPhone', node);
        user.telPhone = Ext.DomQuery.selectValue('/TelPhone', node);
        user.fax = Ext.DomQuery.selectValue('/Fax', node);

        return user;
    },
    parseLoginResultState: function (loginResultState) {
        switch (loginResultState) {
            case 'Succeed':
                return '登陆完成！';
            case 'NullUserName':
                return '您输入的用户名为空！';
            case 'UserNotFound':
                return '您输入的用户名不存在！';
            case 'NullPassword':
                return '您输入的密码不能为空！';
            case 'WrongPassword':
                return '您输入的密码错误，请重新输入！';
            case 'DenyMultiLogin':
                return '该用户不允许多人同时登陆！';
            case 'Locked':
                return '该用户已被锁定！';
            case 'NotAgreeLicence':
                return '尚未同意用户协议！';
            case 'WrongCheckCode':
                return '验证码错误，请重新输入！';
        }
    },
    // validate
    // 验证登录名
    onTextFieldLoginIdValid: function (username) {
        var form = username.up('loginform');

        form._isTextFieldLoginIdValid = username.isValid();
        this.onTextFieldValidChange(form);
    },
    // 验证密码
    onTextFieldPasswordValid: function (password) {
        var form = password.up('loginform');

        form._isTextFieldPassword = password.isValid();
        this.onTextFieldValidChange(form);
    },
    // 验证验证码
    onTextFieldCheckCodeValid: function (checkcode) {
        var form = checkcode.up('loginform');
        form._checkCodeValid = checkcode.isValid();
        this.onTextFieldValidChange(form);
    },
    onTextFieldValidChange: function (form) {
        var loginBtn = form.down('button[action=onLogin]');
        if (form._isTextFieldLoginIdValid && form._isTextFieldPassword && form._checkCodeValid) {
            loginBtn.enable();
        } else {
            loginBtn.disable();
        }
    },
    // 响应键盘事件
    onTextField_KeyPress: function (checkcode, e) {
        var form = checkcode.up('loginform'),
            loginBtn = form.down('button[action=onLogin]');

        if (e.getKey() == e.ENTER && !loginBtn.disabled) {
            this.onLoginBtnClick(loginBtn);
        }
    }

});
