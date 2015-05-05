Ext.define("Soims.store.application.common.TestData", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.common.TestData',
    autoLoad: false,
    groupField: 'leg',
    proxy: {
        type: 'ajax',
        url: Soims.service.samples.TestDataService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }

});