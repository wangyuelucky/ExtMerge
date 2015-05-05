Ext.define("Soims.store.applicationDiscussion.DiscussionApplicationComplete", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.Application',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.ApplicationsService + '/QueryDiscussionCompleteByUser',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }

});