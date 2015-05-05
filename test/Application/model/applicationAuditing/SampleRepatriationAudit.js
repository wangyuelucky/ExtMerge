Ext.define("Soims.model.applicationAuditing.SampleRepatriationAudit", {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int', mapping: 'ID' },
        { name: 'auditType', mapping: 'AuditType' },
        { name: 'auditContent', mapping: 'AuditContent' },
        { name: 'contentType', mapping: 'ContentType' },
        { name: 'createTime', type: 'date', mapping: 'CreateTime' },
        { name: 'auditerID', mapping: 'AuditerID' },
        { name: 'auditerName', mapping: 'AuditerName' },
        { name: 'companyName', mapping: 'CompanyName' }
    ],
    belongsTo: [{
        name: 'SampleBackCountry',
        getterName: 'getSampleBackCountry',
        setterName: 'setSampleBackCountry',
        model: 'Soims.model.application.common.SampleBackCountry'
    }]
});