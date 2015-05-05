Ext.define("Soims.store.project.Subject", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.project.Subject',
    proxy: {
        type: 'ajax',
        url: Soims.service.projects.TopicService + '/QueryByProjectId',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalRecords: 'Total',
            totalProperty: 'Total'
        }
    }
});