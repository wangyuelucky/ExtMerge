Ext.define('Soims.model.applicationAuditing.AuditType', {
    statics: {
        OrganizeContractorAudit: { value: 'OrganizeContractorAudit', name: '组织实施单位审核', roleCode: 'VODC', formType: 'organizecontractorauditform' },
        VoyageChargerAudit: { value: 'VoyageChargerAudit', name: '航次首席科学家审核', roleCode: 'VS', formType: 'voyagechargerauditform' },
        LegChargerAudit: { value: 'LegChargerAudit', name: '航段首席科学家审核', roleCode: 'LS', formType: 'legchargerauditform' },
        ProjectChargerAudit: { value: 'ProjectChargerAudit', name: '项目负责人审核', roleCode: 'PC', formType: 'projectchargerauditform' },
        ReportManagerAudit: { value: 'ReportManagerAudit', name: '航次报告牵头负责人审核', roleCode: 'VRC', formType: 'reportmanagerauditform' },
        /**
        *  根据角色，返回审核类型
        */
        getAuditTypeByUserRole: function (userRole) {
            var obj = {};
            for (var p in this) {
                if (this[p].roleCode === userRole) {
                    obj = this[p];
                    break;
                }
            }
            return obj;
        }
    }
});