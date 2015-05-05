Ext.define("Soims.model.application.common.TestData", {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', mapping: 'ID' },
        { name: 'sampleID', mapping: 'SampleID' },
        { name: 'leg', mapping: 'Leg' },
        { name: 'legID', mapping: 'LegID' },
        { name: 'sampleType', mapping: 'SampleType' },
        { name: 'sampleTypeID', mapping: 'SampleTypeID' },
        { name: 'usePurpose', mapping: 'UsePurpose' },
        { name: 'anlyseTestProject', mapping: 'AnlyseTestProject' },
        { name: 'anlyseTestProjectID', mapping: 'AnlyseTestProjectID' },
        { name: 'intendCommitTestData', mapping: 'IntendCommitTestData' },
        { name: 'commitTestDataTime',  mapping: 'CommitTestDataTime' }
    ]
});