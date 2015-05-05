Ext.define("Soims.store.application.show.V2Detail", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.show.V2Detail',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.ApplicationsService + '/GetV2ApplicationByID',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }

});