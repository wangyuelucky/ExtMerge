Ext.define("Soims.model.application.common.Sample", {
    extend: 'Ext.data.Model',
    requires: ['Soims.model.applicationAuditing.SampleAudit'],
    fields: [
        { name: 'id', mapping: 'ID' },
        'index',
        { name: 'sampleApplication', mapping: 'SampleApplication' },
        { name: 'sampleAreaAndCountID', mapping: 'SampleAreaAndCountID' },
        { name: 'leg', mapping: 'Leg' },
        { name: 'legID', mapping: 'LegID' },
        { name: 'sampleType', mapping: 'SampleType' },
        { name: 'sampleTypeID', type: 'string', mapping: 'SampleTypeID' },
        { name: 'samplingMethod', mapping: 'SamplingMethod' },
        { name: 'samplingMethodID', mapping: 'SamplingMethodID' },
        { name: 'samplingArea', mapping: 'SamplingArea' },
        { name: 'samplingAreaID', mapping: 'SamplingAreaID' },
        { name: 'stationSampleNumber', mapping: 'StationSampleNumber' },
        { name: 'usePurpose', mapping: 'UsePurpose' },
        { name: 'usePurposeID', mapping: 'UsePurposeID' },
        { name: 'anlyseTestProject', mapping: 'AnlyseTestProject' },
        { name: 'anlyseTestProjectID', mapping: 'AnlyseTestProjectID' },
        { name: 'samplePreparation', mapping: 'SamplePreparation' },
        { name: 'samplePreparationID', mapping: 'SamplePreparationID' },
        { name: 'sampleTotalNumber', mapping: 'SampleTotalNumber' },
        { name: 'involvedSubject', mapping: 'InvolvedSubject' },
        { name: 'involvedSubjectID', mapping: 'InvolvedSubjectID' },
        { name: 'otherRequirements', mapping: 'OtherRequirements' },
        { name: 'stationDigit', mapping: 'StationDigit' },
        { name: 'oneSampleAmount', mapping: 'OneSampleAmount' },
        //V4             
        { name: 'borrowOrUser', mapping: 'BorrowOrUser' }
    ],
    associations: [{
        type : 'hasMany',
        model: 'Soims.model.applicationAuditing.SampleAudit', 
        name: 'getSampleAudits', 
        associationKey: 'SampleAudits',
        reader: {
            type: 'xml',
            record: 'SampleAudit',
            root: 'SampleAudits'
        }
    },{
        type : 'hasMany',
        model: 'Soims.model.application.common.AnlyseTestProject', 
        name: 'Anlyses',
        associationKey: 'SampleAnlyseTestProjects',
        reader: {
            type: 'xml',
            record: 'SampleAnlyseTestProject',
            root: 'SampleAnlyseTestProjects'
        }
    }, {
        type: 'hasMany',
        model: 'Soims.model.applicationDiscussion.AllocationInfor',
        name: 'Allocations',
        associationKey: 'SampleAllocations',
        reader: {
            type: 'xml',
            record: 'SampleAllocation',
            root: 'SampleAllocations'
        }
    }, {
        type: 'hasMany',
        model: 'Soims.model.applicationDiscussion.SampleDiscussion',
        name: 'Discussions',
        associationKey: 'SampleDiscussions',
        reader: {
            type: 'xml',
            record: 'SampleDiscussion',
            root: 'SampleDiscussions'
        }
    }]
    
});