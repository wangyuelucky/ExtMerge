Ext.define("Soims.model.applicationAuditing.Audit", {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'applicationID', type: 'int', mapping: 'ID' },
        { name: 'name', mapping: 'Name' },
        { name: 'applicantName', mapping: 'ApplicantName' },
        { name: 'charger', mapping: 'Charger' },
        { name: 'type', mapping: 'Type' },
        { name: 'auditContent', mapping: 'AuditContent' },
        { name: 'contentType', mapping: 'ContentType' },
        { name: 'id', type: 'int', mapping: 'AuditID' },
        { name: 'auditTime', type: 'date', mapping: 'AuditTime' },
        { name: 'auditerName', mapping: 'AuditerName' }
    ]
});