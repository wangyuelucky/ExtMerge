Ext.define("Soims.store.application.common.SampleBackCountry", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.common.SampleBackCountry',
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.SampleBackCountry + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});