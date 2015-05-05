Ext.define("Soims.store.applicationDiscussion.Discussion", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.applicationDiscussion.Discussion',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Soims.service.discussion.DistributionDiscussionService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});