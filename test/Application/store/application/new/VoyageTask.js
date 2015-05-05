Ext.define("Soims.store.application.new.VoyageTask", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.new.VoyageTask',
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.VoyageTaskService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});