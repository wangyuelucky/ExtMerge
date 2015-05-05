Ext.define("Soims.store.application.new.Voyage", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.new.Voyage',
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.VoyageService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalRecords: 'Total',
            totalProperty: 'Total'
        }
    },
    pageSize: 30,
    autoLoad: true
});