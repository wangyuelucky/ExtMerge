Ext.define("Soims.store.project.Project", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.project.Project',
    proxy: {
        type: 'ajax',
        url: Soims.service.projects.ProjectService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalRecords: 'Total',
            totalProperty: 'Total'
        }
    },
    autoLoad: true
});