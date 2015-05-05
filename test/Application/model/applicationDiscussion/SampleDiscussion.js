Ext.define("Soims.model.applicationDiscussion.SampleDiscussion", {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int', mapping: 'SampleDiscussionID' },
        { name: 'auditContent', type: 'string', mapping: 'AuditContent' },
        { name: 'discussType', mapping: 'DiscussType' },
        { name: 'contentType', type: 'string', mapping: 'ContentType' },
        { name: 'createTime', type: 'date', mapping: 'CreateTime' },
        { name: 'auditerName', type: 'string', mapping: 'AuditerName' },
        { name: 'auditerID', type: 'int', mapping: 'AuditerID' },
        { name: 'companyName', mapping: 'CompanyName' }
    ],
    belongsTo: [{
        name: 'Sample',
        getterName: 'getSample',
        setterName: 'setSample',
        model: 'Soims.model.application.common.Sample'
    }]
});