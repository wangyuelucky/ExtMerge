Ext.define("Soims.view.applicationAuditing.common.ProjectChargerAuditForm", {
    extend: 'Ext.form.Panel',
    alias: 'widget.projectchargerauditform',
    requires: [
        'Soims.model.applicationAuditing.AuditType',
        'Soims.model.applicationAuditing.AuditState',
        'Soims.model.application.common.SampleApplicationType',
        'Soims.model.applicationAuditing.ContentType'],
    bodyPadding: 2,
    title: '项目负责人意见',

    initComponent: function () {
        var readOnly = !this.isAudit || Soims.component.applicationAuditingCommonProjectChargerAuditFormProjectChargerReadOnly;
        this.hidden = Soims.component.applicationAuditingCommonProjectChargerAuditFormProjectChargerHidden;
        this.items = [{
            xtype: 'radiogroup',
            fieldLabel: '审核意见',
            labelWidth: 70,
            columns: 3,
            padding: '5 5 0 5',
            anchor: '40%',
            vertical: true,
            disabled: readOnly,
            items: [
                {
                    boxLabel: Soims.model.applicationAuditing.ContentType.Agree.name,
                    name: 'ct',
                    inputValue: Soims.model.applicationAuditing.ContentType.Agree.value
                }, {
                    boxLabel: Soims.model.applicationAuditing.ContentType.Doubt.name,
                    name: 'ct',
                    inputValue: Soims.model.applicationAuditing.ContentType.Doubt.value
                }, {
                    boxLabel: Soims.model.applicationAuditing.ContentType.Reject.name,
                    name: 'ct',
                    inputValue: Soims.model.applicationAuditing.ContentType.Reject.value
                }],
            listeners: {
                change: function (groupCmp, newValue) {
                    var area = groupCmp.up('projectchargerauditform').down('textareafield');
                    area.setValue(groupCmp.getChecked()[0].boxLabel);
                }
            }
        }, {
            xtype: 'textareafield',
            grow: true,
            itemId: 'projectcharger',
            anchor: '100%',
            width: 600,
            height: 150,
            readOnly: readOnly
        }, {
            xtype: 'label',
            style: {
                padding: '5 10 0 5',
                float: 'right'
            },
            hidden: !readOnly,
            height: 20
        }];
        this.callParent();
    },
    listeners: {
        afterrender: function () {
            var me = this,
                store = me.initStore();

            store.load(function () {
                if (store.getCount() != 0) {
                    me.setItemValues(store.getAt(0));
                } else {
                    if (Soims.currentUser.currentRoleCode == 'PC') { // 没有审核内容，并且当前角色为项目负责人，则form可见
                        me.down('label').hide();
                    } else {
                        me.hide();
                    }
                }
            });
        }
    },
    // 初始化store以及参数
    initStore: function () {
        var me = this,
            auditState = Soims.model.applicationAuditing.AuditState.Submit.value,
            store = Ext.create('Soims.store.applicationAuditing.Audit'),
            params;
        if (me.appType == Soims.model.application.common.SampleApplicationType.V2.value || me.appType == Soims.model.application.common.SampleApplicationType.B2.value &&
                Soims.currentUser.currentRoleCode == 'PC' && me.isAudit) { // 只有项目负责人审核v2、B2的时候，查询save状态
            auditState = Soims.model.applicationAuditing.AuditState.Save.value;
        }
        params = {
            AuditType: Soims.model.applicationAuditing.AuditType.ProjectChargerAudit.value,
            ApplicationID: me.applicationID,
            Action: auditState
        };
        store.setExtraParams(params);
        return store;
    },
    // 根据查询结果，设置textarea、label、radiogroup
    setItemValues: function (record) {
        this.down('textareafield').setValue(record.get('auditContent'));
        this.down('label').setText('负责人: ' + record.get('auditerName') + ' ' + Ext.Date.format(record.get('auditTime'), 'Y年m月d日'));
        this.down('radiogroup').setValue({ 'ct': record.get('contentType') });
    }
});