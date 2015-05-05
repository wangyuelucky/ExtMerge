/// <reference path="Application/common/ext/resources/ext-all-dev.js" />
Ext.define('Soims.controller.application.ApplicationGrid', {
    extend: 'Ext.app.Controller',
    stores: ['application.Application'],
    views: ['application.ApplicationGrid'],
    requires: ['Soims.model.application.common.SampleApplicationType'],
    refs: [{
        ref: 'applicationgrid',
        selector: 'applicationgrid',
        autoCreate: true,
        xtype: 'applicationgrid'
    }],
    init: function () {
        this.control({
            'applicationgrid  button[action=appDelete]': {
                click: this.onClickappDeleteBtn
            },
            'applicationgrid  button[action=appCancel]': {
                click: this.onClickappCancelBtn
            },
            'applicationgrid  button[action=appSubmit]': {
                click: this.onClickappSubmitBtn
            },
            'applicationgrid  button[action=appEdit]': {
                click: this.onClickAppEditBtn
            },
            'applicationgrid  button[action=appShow]': {
                click: this.onClickAppShowBtn
            },
            'applicationgrid  button[action=export]': {
                click: this.onClickAppExportBtn
            },
            'applicationgrid': {
                //监听panel的单击事件
                itemclick: function (grid, record, item, index, e, eOpts) {
                    console.log("Hello");
                    this.showHistoryState(record);
                },

                beforerender: function (view) {
                    var store = view.getStore();
                    store.getProxy().setExtraParam('ApplicantID', Soims.currentUser.id);
                    store.getProxy().setExtraParam('VoyageTaskChargerID', Soims.currentUser.id);
                    store.reload();
                }
            }
        });
    },
    onClickAppExportBtn: function(button){
        var grid = button.up('grid');
        var model = grid.getSelectionModel().getSelection()[0];
        var isIE = window.navigator.userAgent.indexOf("MSIE") >= 1;
        document.location.href = Soims.service.applications.ApplicationsService + '/GetApplicationWordDocument' + '?applicationID=' + model.get('id') + '&isIE=' + isIE;       
    },
    showHistoryState: function (record) {
        var applicationID = record.get('id');
        var panel = this.getApplicationgrid().up('applicationpanel').down('applicationhistorypanel');
        console.log(applicationID);
        Ext.Ajax.request({
            url: Soims.service.applications.ApplicationsService + '/ShowApplicationHistory',
            params: { applicationID: applicationID },
            method: 'POST',
            scope: this,
            success: function (response) {
                console.log(response.responseText);
                var responseJson = Ext.JSON.decode(response.responseText);
                panel.refresh(responseJson, record.get('type'));
            }
        });
    },
    submitAction: function (button) {
        var grid = button.up('grid');
        var model = grid.getSelectionModel().getSelection()[0];
        var params = {
            applicationID: model.get('id'),
            type: model.get('type')
        };
        Ext.Ajax.request({
            url: Soims.service.applications.ApplicationsService + '/Submit',
            params: params,
            method: 'POST',
            scope: this,
            success: function (response) {
                var obj = Ext.JSON.decode(response.responseText);
                if ("Result" in obj) {
                    switch (obj.Result) {
                        case 'Success':
                            Ext.MessageBox.alert('成功', '申请提交成功！', function () {
                                var app = this.application;
                                var panel = app.getController('application.ApplicationPanel').getApplicationpanel();
                                var con = app.getController('mainFrame.Main');
                                con.addTab(panel);
                                panel.down('grid').getStore().reload();
                                var selection = panel.getSelectionModel();
                                selection.deselect(selection.getSelection()[0], true);
                                panel.down('#appShow').setDisabled(true);
                                panel.down('#appEdit').setDisabled(true);
                                panel.down('#appSubmit').setDisabled(true);
                                panel.down('#appDelete').setDisabled(true);
                                panel.down('#appCancel').setDisabled(true);
                            }, this);
                            return;
                            break;
                        case 'Failure':
                            Ext.MessageBox.alert('失败', '信息保存失败，请核对填写信息。', function () { }, this);
                            break;
                    }
                }
            }
        });
    },
    onClickappSubmitBtn: function (button) {
        Ext.MessageBox.alert('提示', '申请提交之后信息将无法修改，确认提交？', function (btn) {
            if (btn == 'ok') {
                this.submitAction(button);
                return;
            }
        }, this);
    },
    DeleteAction: function (button) {
        var grid = button.up('grid');
        var model = grid.getSelectionModel().getSelection()[0];
        var params = {
            applicationID: model.get('id')
        };
        Ext.Ajax.request({
            url: Soims.service.applications.ApplicationsService + '/Delete',
            params: params,
            method: 'POST',
            scope: this,
            success: function (response) {
                var obj = Ext.JSON.decode(response.responseText);
                if ("Result" in obj) {
                    switch (obj.Result) {
                        case 'Success':
                            Ext.MessageBox.alert('成功', '删除成功！', function () {
                                var app = this.application;
                                var panel = app.getController('application.ApplicationPanel').getApplicationpanel();
                                var con = app.getController('mainFrame.Main');
                                con.addTab(panel);
                                panel.getStore().reload();
                                var selection = panel.getSelectionModel();
                                selection.deselect(selection.getSelection()[0], true);
                                panel.down('#appShow').setDisabled(true);
                                panel.down('#appEdit').setDisabled(true);
                                panel.down('#appSubmit').setDisabled(true);
                                panel.down('#appDelete').setDisabled(true);
                                panel.down('#appCancel').setDisabled(true);
                            }, this);
                            return;
                            break;
                        case 'Failure':
                            Ext.MessageBox.alert('失败', '删除失败。', function () { }, this);
                            break;
                    }
                }
            }
        });
    },
    onClickappDeleteBtn: function (button) {
        Ext.MessageBox.alert('提示', '确认删除？', function (btn) {
            if (btn == 'ok') {
                this.DeleteAction(button);
                return;
            }
        }, this);

    },
    CancelAction: function (button) {
        var grid = button.up('grid');
        var model = grid.getSelectionModel().getSelection()[0];
        var params = {
            applicationID: model.get('id')
        };
        Ext.Ajax.request({
            url: Soims.service.applications.ApplicationsService + '/Cancel',
            params: params,
            method: 'POST',
            scope: this,
            success: function (response) {
                var obj = Ext.JSON.decode(response.responseText);
                if ("Result" in obj) {
                    switch (obj.Result) {
                        case 'Success':
                            Ext.MessageBox.alert('成功', '撤回成功！', function () {
                                var app = this.application;
                                var panel = app.getController('application.ApplicationPanel').getApplicationpanel();
                                var con = app.getController('mainFrame.Main');
                                con.addTab(panel);
                                panel.getStore().reload();
                                var selection = panel.getSelectionModel();
                                selection.deselect(selection.getSelection()[0], true);
                                panel.down('#appShow').setDisabled(true);
                                panel.down('#appEdit').setDisabled(true);
                                panel.down('#appSubmit').setDisabled(true);
                                panel.down('#appDelete').setDisabled(true);
                                panel.down('#appCancel').setDisabled(true);
                            }, this);
                            return;
                            break;
                        case 'Failure':
                            Ext.MessageBox.alert('失败', '撤回失败。', function () { }, this);
                            break;
                    }
                }
            }
        });
    },
    onClickappCancelBtn: function (button) {
        Ext.MessageBox.alert('提示', '确认撤回？', function (btn) {
            if (btn == 'ok') {
                this.CancelAction(button);
                return;
            }
        }, this);
    },
    getCon: function (applicationPanelPath) {
        var loginApp = this.application;
        return loginApp.getController(applicationPanelPath);
    },
    showTab: function (id, title, panel, applicationID, isShow, isEdit) {
        var con = this.getCon('mainFrame.Main');
        var instance = con.existInstance(id);
        if (!instance) {
            var panelNew = Ext.create(panel, { id: id, title: title, application: this.application, applicationID: applicationID, isShow: isShow, isEdit: isEdit });
            con.addTab(panelNew);
            return panelNew;
        } else {
            return instance;
        }
    },
    onClickAppShowBtn: function (button) {
        var grid = button.up('grid');
        var model = grid.getSelectionModel().getSelection()[0];
        var type = model.get('type');
        var panels = this.getViewFnByApp('application.show', type, 'Tab',true);
        var panel = this.showTab('Show' + type + model.get('id'), '查看' + model.get('name'), panels, model.get('id'), true, false);
    },
    onClickAppEditBtn: function (button) {
        var sampleCon = this.getCon('application.common.SampleInfo');
        var boardCon = this.getCon('application.common.BoardingUser');
        var backCon = this.getCon('application.common.SampleBackCountry');
        var eleCon = this.getCon('application.common.ElectronicDocument');
        var v4SampleCon = this.getCon('application.common.V4Sample');

        var grid = button.up('grid');
        var model = grid.getSelectionModel().getSelection()[0];
        var applicationType = model.get('type');
        var panels = this.getViewFnByApp('application.new', applicationType, 'Tab',false);
        var panel = this.showTab('Edit' + applicationType + model.get('id'), '编辑' + model.get('name'), panels, model.get('id'), false, true);
    },
    getViewFnByApp: function (prefix, type, suffix,isShow) {
        var view = null,
            controller = this.getCon(prefix + '.' + type + suffix);

        switch (type) {
            case Soims.model.application.common.SampleApplicationType.B1.value:
                view = isShow ? controller.getApplicationShowB1TabView() : controller.getApplicationNewB1TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.B2.value:
                view = isShow ? controller.getApplicationShowB2TabView() : controller.getApplicationNewB2TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.V1.value:
                view = isShow ? controller.getApplicationShowV1TabView() : controller.getApplicationNewV1TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.V2.value:
                view = isShow ? controller.getApplicationShowV2TabView() : controller.getApplicationNewV2TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.V3.value:
                view = isShow ? controller.getApplicationShowV3TabView() : controller.getApplicationNewV3TabView();
                break;
            case Soims.model.application.common.SampleApplicationType.V4.value:
                view = isShow ? controller.getApplicationShowV4TabView() : controller.getApplicationNewV4TabView();
                break;
        }
        return view;
    }
});