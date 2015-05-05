Ext.define("Soims.model.applicationAuditing.SampleAudit", {
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
        name: 'Sample',
        getterName: 'getSample',
        setterName: 'setSample',
        model: 'Soims.model.application.common.Sample'
    }]
});