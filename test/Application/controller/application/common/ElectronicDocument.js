Ext.define('Soims.controller.application.common.ElectronicDocument', {
    extend: 'Ext.app.Controller',
    stores: ['application.common.ElectronicDocument'],
    views: ['application.common.ElectronicDocument', 'application.common.ElectronicDocumentGrid'],
    refs: [{
        ref: 'electronicDocument',
        selector: 'electronicdocument',
        autoCreate: true,
        xtype: 'electronicdocument'
    }, {
        ref: 'electronicDocumentGrid',
        selector: 'electronicdocumentgrid',
        autoCreate: true,
        xtype: 'electronicdocumentgrid'
    }],

    init: function () {
        this.control({
            'electronicdocumentgrid': {
                //监听panel的双击事件
                itemdblclick: function (view, record) {
                    console.log("Double Click.");
                }
            },
            'electronicdocumentgrid button[itemId=add]': {
                click: function (button, e) {
                    if (button.up('electronicdocument').applicationID == undefined) {
                        Ext.MessageBox.alert('失败', '请先保存申请基本信息', function () {
                            var tabPanel = button.up('electronicdocument').up('tabpanel');
                            tabPanel.setActiveTab(0);
                        }, this);
                        return;
                    }

                    var con = this.getCon('application.common.ElectronicDocumentWin');
                    con.show(button.up('#applicationCommonElectronicDocumentGrid'), button.up('electronicdocument').type);
                }
            },
            'electronicdocumentgrid button[itemId=delete]': {
                click: function (button, e) {
                    Ext.MessageBox.confirm('确认', '确认删除此文件？点击保存按钮生效。',
                    function (btn) {
                        if (btn == 'yes') {
                            var gridPanel = button.up('#applicationCommonElectronicDocumentGrid');
                            var selectionModel = gridPanel.getSelectionModel();
                            var record = selectionModel.getSelection();
                            this.getElectronicDocumentGrid().getStore().remove(record);
                            this.getElectronicDocumentGrid().getView().refresh();
                        }
                    }, this);
                }
            },
            'electronicdocumentgrid button[itemId=download]': {
                click: function (button, e) {
                    var gridPanel = button.up('#applicationCommonElectronicDocumentGrid');
                    var selectionModel = gridPanel.getSelectionModel();
                    var record = selectionModel.getSelection()[0];
                    console.log(record);
                    var isIE = window.navigator.userAgent.indexOf("MSIE") >= 1;
                    document.location.href = Soims.service.ResourceService + '/DownloadByResourceID' + '?ResourceID=' + record.get('resourceID') + '&Name=' +
                        record.get('name') + '&isIE=' + isIE;
                }
            }
        });
    },


    getCon: function (boardingUserPath) {
        var loginApp = this.application;
        return loginApp.getController(boardingUserPath);
    },
    showTab: function (id, isShow, panel, applicationID) {
        var con = this.getCon('application.new.B1Tab');
        var instance = con.existInstance(id);
        if (!instance) {
            var panelNew = Ext.create(panel, { id: id, isShow: isShow, applicationID: applicationID });
            con.addTab(panelNew);
            return panelNew;
        } else {
            return instance;
        }
    }
});