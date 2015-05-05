Ext.define('Soims.model.application.common.ApplicationState', {
    statics: {
        Unknown: { value: 'Unknown', name: '未知类型' },
        Cancel: { value: 'Cancel', name: '已撤回' },
        Deleted: { value: 'Deleted', name: '已删除' },
        UnSubmit: { value: 'UnSubmit', name: '未提交' },
        Submit: { value: 'Submit', name: '已提交' },
        VODCAudit: { value: 'VODCAudit', name: '航次组织实施单位审核' },
        VODCSubmit: { value: 'VODCSubmit', name: '组织实施单位已审核' },
        LSAudit: { value: 'LSAudit', name: '航段首席科学家审核' },
        LSSubmit: { value: 'LSSubmit', name: '航段首席科学家已审核' },
        VSAudit: { value: 'VSAudit', name: '航次首席科学家审核' },
        VSSubmit: { value: 'VSSubmit', name: '航次首席科学家已审核' },
        PCAudit: { value: 'PCAudit', name: '项目负责人审核' },
        PCSubmit: { value: 'PCSubmit', name: '项目负责人已审核' },
        VRCAudit: { value: 'VRCAudit', name: '航次报告牵头负责人审核' },
        VRCSubmit: { value: 'VRCSubmit', name: '航次报告牵头负责人已审核' },
        AdminAccept: { value: 'AdminAccept', name: '大洋馆受理' },
        AdminAllot: { value: 'AdminAllot', name: '大洋馆已分配' },
        AdminReject: { value: 'AdminReject', name: '大洋馆驳回' },
        AdminDeny: { value: 'AdminDeny', name: '大洋馆否决' },
        SMEAudit: { value: 'SMEAudit', name: '样品管理专家委员会审议' },
        SMESubmit: { value: 'SMESubmit', name: '样品管理专家委员会已审议' },
        OIAudit: { value: 'OIAudit', name: '大洋协会联系人审批' },
        OISubmit: { value: 'OISubmit', name: '大洋协会联系人已审批' },
        OIReject: { value: 'OIReject', name: '大洋协会联系人驳回' }
    }
});