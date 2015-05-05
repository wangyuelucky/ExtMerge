Ext.define("Soims.store.application.common.Sample", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.common.Sample',
    autoLoad: false,
    groupField: 'leg',
    proxy: {
        type: 'ajax',
        url: Soims.service.samples.SampleService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});