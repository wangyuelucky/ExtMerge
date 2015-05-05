Ext.define("Soims.store.application.common.Leg", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.common.Leg',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Soims.service.voyages.LegService + '/QueryByApplicationID',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }

});
