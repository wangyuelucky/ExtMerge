Ext.define("Soims.store.application.show.B2Detail", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.show.B2Detail',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.ApplicationsService + '/GetB2ApplicationByID',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }

});