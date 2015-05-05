Ext.define('Soims.controller.applicationAuditing.V1Tab', {
    extend: 'Ext.app.Controller',
    views: ['applicationAuditing.V1Tab'],
    requires: ['Soims.model.applicationAuditing.AuditType', 'Soims.model.applicationAuditing.AuditState'],
    refs: [{
        ref: 'auditv1tab',
        selector: 'auditv1tab',
        autoCreate: true,
        xtype: 'auditv1tab'
    }],
    init: function () {
        this.getCon('application.common.SampleInfo');
        this.getCon('application.new.V1BasicInfo');

        this.control({
            'auditv1tab': {
                render: function (panel) {
                    if (panel.isEdit == true || panel.isShow == true) {
                        var v1basicinfopanel = panel.down('v1basicinfopanel'),
                            testdatainfo = panel.down('testdatainfo');
                        var comboReport = v1basicinfopanel.down('#report');
                        var storeReport = comboReport.getStore();
                        var comboDivision = v1basicinfopanel.down('#division');
                        var storeDivision = comboDivision.getStore();
                        var store = Ext.create('Soims.store.application.show.V1Detail');

                        store.getProxy().setExtraParam('ID', panel.applicationID);
                        store.load(function () {
                            if (store.getCount() != 0) {
                                // 基本信息
                                storeReport.load(function () {
                                    console.log(store.getAt(0).get('reportName'));
                                    v1basicinfopanel.loadRecord(store.getAt(0));
                                    var record = Ext.create('Soims.model.application.new.Division',
                                    {
                                        'id': store.getAt(0).get('divisionID'),
                                        'name': store.getAt(0).get('divisionName')
                                    });
                                    comboReport.setValue(store.getAt(0).get('reportName'));
                                    storeDivision.getProxy().setExtraParam('reportID', store.getAt(0).get('reportID'));
                                    panel.down('#applicationCommonSampleInfo').applicationID = store.getAt(0).get('id');
                                    storeDivision.load(function () {
                                        comboDivision.setValue(record);
                                    });
                                });
                                /** 拟提交成果
                                testdatainfo.loadRecord(store.getAt(0));
                                */
                            }
                        });
                    }
                }
            },
            'auditv1tab button[itemId=save]': {
                click: this.onClickSaveBtn
            },
            'auditv1tab button[itemId=submit]': {
                click: this.onClickSubmitBtn
            },
            'auditv1tab button[itemId=close]': {
                click: this.onClickCloseBtn
            }
        });
    },
    getCon: function (path) {
        var loginApp = this.application;
        return loginApp.getController(path);
    },
    // saveOrSubmit false: save,true: submit
    generateParams: function (btn, saveOrSubmit) {
        var tabPanel = btn.up('panel'),
            appID = tabPanel.applicationID,
            auditConfig, auditform,
            auditType, auditContent, action;

        // 根据角色，查找审核类型、审核表单类型    
        auditConfig = Soims.model.applicationAuditing.AuditType.getAuditTypeByUserRole(Soims.currentUser.currentRoleCode);

        auditform = tabPanel.down(auditConfig.formType);
        auditContent = auditform.down('textareafield').getValue();
        contentType = auditform.down('radiogroup').getValue().ct;
        auditType = auditConfig.value;

        if (contentType && auditContent) {
            action = saveOrSubmit ? Soims.model.applicationAuditing.AuditState.Submit.value : Soims.model.applicationAuditing.AuditState.Save.value;
            return { AuditType: auditType, AuditContent: auditContent, ContentType: contentType, Action: action, ApplicationID: appID, Competence: 'AuditV1' };
        }
        return null; 
    },
    saveAudit: function (param, tabPanel) {
        Ext.Ajax.request({
            url: Soims.service.ApplicationAuditings.AuditService + '/Auditing',
            params: param,
            scope: this,
            success: function () {
                Ext.Tools.Msg('审核完成！', 0);
                tabPanel.close();
                var con = this.getCon('applicationAuditing.ApplicationGrid');
                con.refreshGrid();
            }
        });
    },
    onClickSaveBtn: function (btn) {
        var tabPanel = btn.up('panel'),
            param = this.generateParams(btn, false);
        if (param != null) {
            this.saveAudit(param, tabPanel);
        } else {
            Ext.Tools.Msg('审核意见和内容不能为空！', 9);
        }
    },
    onClickSubmitBtn: function (btn) {
        var tabPanel = btn.up('panel'),
            param = this.generateParams(btn, true);
        if (param != null) {
            this.saveAudit(param, tabPanel);
        } else {
            Ext.Tools.Msg('审核意见和内容不能为空！', 9);
        }
    },
    onClickCloseBtn: function (btn) {
        btn.up('panel').close();
    }
});