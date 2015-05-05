Ext.define("Soims.store.application.show.B1Detail", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.show.B1Detail',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.ApplicationsService + '/GetB1ApplicationByID',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }

});