Ext.define("Soims.store.application.common.SampleType", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.common.SampleType',
    proxy: {
        type: 'ajax',
        url: Soims.service.samples.SampleService + '/QuerySampleType',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});