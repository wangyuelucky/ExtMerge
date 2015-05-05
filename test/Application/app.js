
// 无Ext.onReady，无白屏
Ext.application({
    name: "Soims",
    appFolder: appUrl,
    //requires: ['Soims.controller.notification.Notification'],
    controllers: ['login.Login', 'notification.Notification'],
    launch: function () {
        this.getController('notification.Notification').showNotification();
        this.getController('login.Login').tryLoginByToken(); // 直接getController('Login') 不行吗？


    }
});