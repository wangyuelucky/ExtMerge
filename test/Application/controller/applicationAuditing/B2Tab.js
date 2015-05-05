Ext.define('Soims.controller.applicationAuditing.B2Tab', {
    extend: 'Ext.app.Controller',
    views: ['applicationAuditing.B2Tab'],
    requires: ['Soims.model.applicationAuditing.AuditType', 'Soims.model.applicationAuditing.AuditState'],
    refs: [{
        ref: 'auditb2tab',
        selector: 'auditb2tab',
        autoCreate: true,
        xtype: 'auditb2tab'
    }],
    init: function () {
        this.getCon('application.common.SampleInfo');
        this.getCon('application.common.BoardingUser');
        this.getCon('application.common.SampleBackCountry');
        this.getCon('application.common.ElectronicDocument');

        this.control({
            'auditb2tab': {
                afterrender: this.afterB2TabRender
            },
            'auditb2tab button[itemId=save]': {
                click: this.onClickSaveBtn
            },
            'auditb2tab button[itemId=submit]': {
                click: this.onClickSubmitBtn
            },
            'auditb2tab button[itemId=close]': {
                click: this.onClickCloseBtn
            }
        });
    },
    getCon: function (path) {
        var loginApp = this.application;
        return loginApp.getController(path);
    },
    afterB2TabRender: function (panel) {
        var b2basicinfopanel = panel.down('b2basicinfopanel'),
            testdatainfo = panel.down('testdatainfo'),
            samplesiteusenecessityField = panel.down('samplesiteusenecessityform').down('textareafield');

        var store = Ext.create('Soims.store.application.show.B2Detail');
        store.getProxy().setExtraParam('ID', panel.applicationID);
        store.load(function () {
            if (store.getCount() != 0) {
                var record = store.getAt(0);
                // 基本信息
                b2basicinfopanel.loadRecord(record);
                // 必要性
                samplesiteusenecessityField.setValue(record.get('usingNecessity'));
                /** 拟提交成果
                testdatainfo.loadRecord(store.getAt(0));
                */
            }
        });
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
            return { AuditType: auditType, AuditContent: auditContent, ContentType: contentType, Action: action, ApplicationID: appID, Competence: 'AuditB2' };
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