Ext.define('Soims.controller.applicationAccept.DocumentUploadWin', {
    extend: 'Ext.app.Controller',
    views: ['applicationAccept.DocumentUploadWin'],
    refs: [{
        ref: 'documentuploadwin',
        selector: 'documentuploadwin',
        autoCreate: true,
        xtype: 'documentuploadwin'
    }],
    init: function () {
        this.control({
            'documentuploadwin  button[itemId=upload]': {
                click: function (button, e) {
                    this.save(button);
                }
            },
            'documentuploadwin  button[itemId=cancel]': {
                click: function (button, e) {
                    button.up('window').close();
                }
            }
        });
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    },
    show: function (method) {
        this.method = method;
        var window = this.getDocumentuploadwin();
        window.show();
    },
    save: function (button) {
        var win = button.up('documentuploadwin');
        var form = win.down('#uploadPanel').getForm();
        form.submit({
            url: Soims.service.ApplicationAccepts.AcceptService + this.method,
            type: 'ajax',
            waitMsg: '正在保存文件...',
            success: function (fp, o) {
                button.up('window').close();
                Ext.Msg.show({
                    title: '提示信息',
                    msg: o.result.Result == 'Success' ? '导入成功' : '导入失败，请核对文件重新导入',
                    minWidth: 200,
                    buttons: Ext.Msg.OK
                });
            },
            failure: function (fp, o) {
                button.up('window').close();
                console.log(o.result);
                Ext.Msg.show({
                    title: '提示信息',
                    msg: o.result.Result == 'Success' ? '导入成功' : '导入失败，请核对文件重新导入',
                    minWidth: 200,
                    buttons: Ext.Msg.OK
                });
            }
        });
    }
});