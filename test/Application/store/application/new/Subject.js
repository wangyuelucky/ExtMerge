Ext.define("Soims.store.application.new.Subject", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.new.Subject',
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.SubjectService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});