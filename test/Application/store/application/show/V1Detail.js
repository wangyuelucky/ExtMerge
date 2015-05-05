Ext.define("Soims.store.application.show.V1Detail", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.show.V1Detail',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.ApplicationsService + '/GetV1ApplicationByID',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }

});