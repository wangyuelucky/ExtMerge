Ext.define("Soims.store.voyage.VoyageReportDetail", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.voyage.VoyageReportDetail',
    proxy: {
        type: 'ajax',
        url: Soims.service.voyages.VoyageReportDetailService + '/QueryByVoyageId',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalRecords: 'Total',
            totalProperty: 'Total'
        }
    },
    autoLoad: true
});