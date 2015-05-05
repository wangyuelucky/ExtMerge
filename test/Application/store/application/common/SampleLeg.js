Ext.define("Soims.store.application.common.SampleLeg", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.common.Leg',
    proxy: {
        type: 'ajax',
        url: Soims.service.samples.SampleService + '/QuerySampleLeg',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});
