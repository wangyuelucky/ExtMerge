Ext.define("Soims.store.application.Application", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.Application',
    pageSize: 50,
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.ApplicationsService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }

});