Ext.define("Soims.model.applicationDiscussion.AllocationInfor", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'SampleAllocationID' },
    { name: 'taskPreviousUsage', type: 'string', mapping: 'TaskPreviousUsage' },
    { name: 'supplierPreviousUsage', type: 'string', mapping: 'SupplierPreviousUsage' },
    { name: 'suggestion', type: 'string', mapping: 'Suggestion' },
    { name: 'oiSuggestion', type: 'string', mapping: 'OISuggestion' },
    { name: 'useOrder', type: 'string', mapping: 'UseOrder' }
    ],
    belongsTo: [{
        name: 'Sample',
        getterName: 'getSample',
        setterName: 'setSample',
        model: 'Soims.model.application.common.Sample'
    }]
});