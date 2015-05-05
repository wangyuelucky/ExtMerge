Ext.define("Soims.store.applicationAccept.AllocationComplete", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.applicationAccept.Allocation',
    autoLoad: false,
    groupField: 'applicationID',
    proxy: {
        type: 'ajax',
        url: Soims.service.samples.SampleAllocationService + '/QueryAllocateCompleteByUser',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }

});