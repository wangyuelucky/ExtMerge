Ext.define("Soims.model.applicationDiscussion.SampleInfor", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'sampleType', type: 'string', mapping: 'SampleType' },
    { name: 'usePurpose', type: 'string', mapping: 'UsePurpose' },
    { name: 'testProject', type: 'string', mapping: 'AnlyseTestProject' },
    { name: 'sampleArea', type: 'string', mapping: 'SamplingArea' },
    { name: 'stationDigit', type: 'string', mapping: 'StationDigit' },
    { name: 'stationNumber', type: 'string', mapping: 'StationSampleNumber' },
    { name: 'totalNumber', type: 'string', mapping: 'SampleTotalNumber' },
    { name: 'oneSampleAmount', type: 'string', mapping: 'OneSampleAmount' }
    ]
});