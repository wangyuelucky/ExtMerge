Ext.define("Soims.store.voyage.VoyageByTime", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.voyage.Voyage',
    proxy: {
        type: 'ajax',
        url: Soims.service.voyages.VoyageService + '/QueryByTime',
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