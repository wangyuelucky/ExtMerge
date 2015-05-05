Ext.define("Soims.model.application.common.SampleType", {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string', mapping: 'ID' },
        { name: 'sampleType', type: 'string', mapping: 'SampleType' },
        { name: 'sampleID', type: 'string', mapping: 'SampleID' },
        { name: 'legID', type: 'string', mapping: 'LegID' }
    ]
});