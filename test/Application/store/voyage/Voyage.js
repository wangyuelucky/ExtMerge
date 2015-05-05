Ext.define("Soims.store.voyage.Voyage", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.voyage.Voyage',
    proxy: {
        type: 'ajax',
        url: Soims.service.voyages.VoyageService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalRecords: 'Total',
            totalProperty: 'Total'
        }
    },
    pageSize: 30,
    autoLoad: true
});