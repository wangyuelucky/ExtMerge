Ext.define('Soims.controller.voyage.DocumentUploadWin', {
    extend: 'Ext.app.Controller',
    views: ['voyage.DocumentUploadWin'],
    refs: [{
        ref: 'voyagedocumentuploadwin',
        selector: 'voyagedocumentuploadwin',
        autoCreate: true,
        xtype: 'voyagedocumentuploadwin'
    }],
    init: function () {
        this.control({
            'voyagedocumentuploadwin  button[itemId=upload]': {
                click: function (button, e) {
                    this.save(button);
                }
            },
            'voyagedocumentuploadwin  button[itemId=cancel]': {
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
    show: function (voyageID, panel, method) {
        this.panel = panel;
        this.voyageID = voyageID;
        this.method = method;
        var window = this.getVoyagedocumentuploadwin();
        window.show();
    },
    save: function (button) {
        var grid = this.panel;
        var win = button.up('voyagedocumentuploadwin');
        var form = win.down('#uploadPanel').getForm();
        form.submit({
            url: Soims.service.voyages.VoyageService + this.method,
            type: 'ajax',
            params: {
                voyageId: this.voyageID
            },
            waitMsg: '正在保存文件...',
            success: function (fp, o) {
                button.up('window').close();
                Ext.Msg.show({
                    title: '提示信息',
                    msg: o.result.Result == 'Success' ? '导入成功' :
                            o.result.Result == 'Failure' ? '导入失败，请核对文件重新导入' :
                            '存在导入失败的人员，请核实该人员的单位信息是否正确并已录入系统。具体信息已发送站内信，请注意查收。',
                    minWidth: 200,
                    buttons: Ext.Msg.OK,
                    fn: function () {
                        grid.getStore().reload();
                    }
                });
            },
            failure: function (fp, o) {
                button.up('window').close();
                console.log(o.result);
                Ext.Msg.show({
                    title: '提示信息',
                    msg: o.result.Result == 'Success' ? '导入成功' :
                            o.result.Result == 'Failure' ? '导入失败，请核对文件重新导入' :
                            '存在导入失败的人员，请核实该人员的单位信息是否正确并已录入系统。具体信息已发送站内信，请注意查收。',
                    minWidth: 200,
                    buttons: Ext.Msg.OK,
                    fn: function () {
                        grid.getStore().reload();
                    }
                });
            }
        });
    }
});