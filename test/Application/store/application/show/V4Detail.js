Ext.define("Soims.store.application.show.V4Detail", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.show.V4Detail',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.ApplicationsService + '/GetV4ApplicationByID',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }

});