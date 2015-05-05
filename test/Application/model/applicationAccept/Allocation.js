Ext.define("Soims.model.applicationAccept.Allocation", {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'allocationID', type: 'int', mapping: 'SampleAllocationID' },
        { name: 'sampleType', mapping: 'SampleType' },
        { name: 'taskPreviousUsage', mapping: 'TaskPreviousUsage' },
        { name: 'supplierPreviousUsage', mapping: 'SupplierPreviousUsage' },
        { name: 'suggestion', mapping: 'Suggestion' },
        { name: 'order', mapping: 'Order' },
        { name: 'applicationID', type: 'int', mapping: 'ID' },
        { name: 'name', mapping: 'Name' },
        { name: 'applicationNumber', mapping: 'ApplicationNumber' },
        { name: 'applicantName', mapping: 'ApplicantName' },
        { name: 'charger', mapping: 'Charger' },
        { name: 'type', mapping: 'Type' },
        { name: 'applyTime', mapping: 'ApplyTime' },
        { name: 'state', mapping: 'State' }
    ]
});