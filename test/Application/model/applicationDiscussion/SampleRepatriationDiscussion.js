Ext.define("Soims.model.applicationDiscussion.SampleRepatriationDiscussion", {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int', mapping: 'SampleRepatriationDiscussionID' },
        { name: 'auditContent', type: 'string', mapping: 'AuditContent' },
        { name: 'discussType', mapping: 'DiscussType' },
        { name: 'contentType', type: 'string', mapping: 'ContentType' },
        { name: 'createTime', type: 'date', mapping: 'CreateTime' },
        { name: 'auditerName', type: 'string', mapping: 'AuditerName' },
        { name: 'auditerID', type: 'int', mapping: 'AuditerID' },
        { name: 'companyName', mapping: 'CompanyName' }
    ],
    belongsTo: [{
        name: 'SampleBackCountry',
        getterName: 'getSampleBackCountry',
        setterName: 'setSampleBackCountry',
        model: 'Soims.model.application.common.SampleBackCountry'
    }]
});