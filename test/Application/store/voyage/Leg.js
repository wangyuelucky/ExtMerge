Ext.define("Soims.store.voyage.Leg", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.voyage.Leg',
    proxy: {
        type: 'ajax',
        url: Soims.service.voyages.LegService + '/QueryByVoyageId',
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