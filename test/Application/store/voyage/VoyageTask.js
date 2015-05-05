Ext.define("Soims.store.voyage.VoyageTask", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.voyage.VoyageTask',
    proxy: {
        type: 'ajax',
        url: Soims.service.voyages.VoyageTaskService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalRecords: 'Total',
            totalProperty: 'Total'
        }
    }
});