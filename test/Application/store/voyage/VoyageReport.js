Ext.define("Soims.store.voyage.VoyageReport", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.voyage.VoyageReport',
    proxy: {
        type: 'ajax',
        url: Soims.service.voyages.VoyageReportService + '/QueryByVoyageId',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalRecords: 'Total',
            totalProperty: 'Total'
        }
    }
});