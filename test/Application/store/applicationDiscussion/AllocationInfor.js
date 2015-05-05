Ext.define("Soims.store.applicationDiscussion.AllocationInfor", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.applicationDiscussion.AllocationInfor',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: Soims.service.samples.SampleAllocationService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});