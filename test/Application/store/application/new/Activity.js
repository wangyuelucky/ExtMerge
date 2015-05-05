Ext.define("Soims.store.application.new.Activity", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.new.Activity',
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.ActivityService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});