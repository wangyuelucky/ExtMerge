Ext.define("Soims.store.application.common.VoyageTaskLeg", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.voyage.Leg',
    proxy: {
        type: 'ajax',
        url: Soims.service.voyages.LegService + '/QueryVoyageTaskLeg',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});
