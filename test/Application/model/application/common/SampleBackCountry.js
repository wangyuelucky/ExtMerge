Ext.define("Soims.model.application.common.SampleBackCountry", {
    extend: 'Ext.data.Model',
    requires: ['Soims.model.applicationAuditing.SampleRepatriationAudit'],
    fields: [
        { name: 'id', type: 'string', mapping: 'ID' },
        { name: 'sampleID', type: 'string', mapping: 'SampleID' },
        { name: 'sampleType', type: 'string', mapping: 'SampleType' },
        { name: 'sampleLeg', type: 'string', mapping: 'SampleLeg' },
        { name: 'sampleNumber', type: 'string', mapping: 'SampleNumber' },
        { name: 'sampleAmount', type: 'string', mapping: 'SampleAmount' },
        { name: 'preservationCondition', type: 'string', mapping: 'PreservationCondition' },
        { name: 'backTime', type: 'date', mapping: 'BackTime' },
        { name: 'otherNeed', type: 'string', mapping: 'OtherNeed' },
        { name: 'repatriaionNecessity', type: 'string', mapping: 'RepatriaionNecessity' }
    ],
    associations: [{
        type : 'hasMany',
        model: 'Soims.model.applicationAuditing.SampleRepatriationAudit',
        name: 'getSampleRepatriationAudits',
        associationKey: 'SampleRepatriationAudits',
        reader: {
            type: 'xml',
            record: 'SampleRepatriationAudit',
            root: 'SampleRepatriationAudits'
        }
    },{
        type : 'hasMany',
        model: 'Soims.model.applicationDiscussion.SampleRepatriationDiscussion',
        name: 'SampleRepatriationDiscussions', 
        associationKey: 'SampleRepatriationDiscussions',
        reader: {
            type: 'xml',
            record: 'SampleRepatriationDiscussion',
            root: 'SampleRepatriationDiscussions'
        }
    }]
});