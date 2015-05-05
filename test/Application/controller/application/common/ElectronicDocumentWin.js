Ext.define('Soims.controller.application.common.ElectronicDocumentWin', {
    extend: 'Ext.app.Controller',
    views: ['application.common.ElectronicDocumentWin'],
    refs: [{
        ref: 'electronicDocumentWin',
        selector: 'electronicdocumentwin',
        autoCreate: true,
        xtype: 'electronicdocumentwin'
    }],
    init: function () {
        this.control({
            'electronicdocumentwin  button[itemId=upload]': {
                click: function (button, e) {
                    this.save(button);
                }
            },
            'electronicdocumentwin  button[itemId=cancel]': {
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
    show: function (panel, type) {
        this.panel = panel;
        var window = this.getElectronicDocumentWin({ type: type });
        window.show();
    },
    save: function (button) {
        var gridPanel = this.panel;
        var win = button.up('#applicationCommonElectronicDocumentWin');
        var store = gridPanel.getStore();
        var form = win.down('#uploadPanel').getForm();
        form.submit({
            url: Soims.service.ResourceService + '/UploadFile',
            type: 'ajax',
            waitMsg: '正在保存文件...',
            success: function (fp, o) {
                var fileName = o.result.fileName.split('|');
                var resourceID = o.result.resourceID.split(' ');
                var resourceSize = o.result.resourceSize.split(' ');
                var electronicDocument = [];
                for (var i = 0; i < fileName.length; i++) {
                    electronicDocument[i] = Ext.create('Soims.model.application.common.ElectronicDocument', {
                        resourceID: resourceID[i],
                        name: fileName[i],
                        length: resourceSize[i]
                    });
                }
                store.insert(0, electronicDocument);
                gridPanel.getView().refresh();
                button.up('window').close();
                Ext.Msg.show({
                    title: '提示信息',
                    msg: o.result.msg,
                    minWidth: 200,
                    buttons: Ext.Msg.OK
                });
            },
            failure: function (fp, o) {
                button.up('window').close();
                Ext.Msg.show({
                    title: '提示信息',
                    msg: o.result.msg,
                    minWidth: 200,
                    buttons: Ext.Msg.OK
                });
            }
        });
    }
});