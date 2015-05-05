Ext.define("Soims.view.applicationAuditing.common.OrganizeContractorAuditForm", {
    extend: 'Ext.form.Panel',
    alias: 'widget.organizecontractorauditform',
    requires: ['Soims.model.applicationAuditing.AuditType', 'Soims.model.applicationAuditing.ContentType'],
    bodyPadding: 2,
    title: '航次组织实施单位意见',

    initComponent: function () {
        var readOnly = !this.isAudit || Soims.component.applicationAuditingCommonOrganizeContractorAuditFormOrganizeContractorReadOnly;
        this.hidden = Soims.component.applicationAuditingCommonOrganizeContractorAuditFormOrganizeContractorHidden;
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
                    var area = groupCmp.up('organizecontractorauditform').down('textareafield');
                    area.setValue(groupCmp.getChecked()[0].boxLabel);
                }
            }
        }, {
            xtype: 'textareafield',
            grow: true,
            itemId: 'organizeContractor',
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
                    if (Soims.currentUser.currentRoleCode == 'VODC') { // 没有审核内容，并且当前角色为组织实施单位联系人，则form可见
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
            auditState = this.isAudit && Soims.currentUser.currentRoleCode == 'VODC' ? Soims.model.applicationAuditing.AuditState.Save.value : Soims.model.applicationAuditing.AuditState.Submit.value,
            store = Ext.create('Soims.store.applicationAuditing.Audit'),
            params = {
                AuditType: Soims.model.applicationAuditing.AuditType.OrganizeContractorAudit.value,
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