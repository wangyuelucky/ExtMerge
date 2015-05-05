Ext.define("Soims.store.application.new.NoOceanTopic", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.new.NoOceanTopic',
    proxy: {
        type: 'ajax',
        url: Soims.service.applications.NoOceanTopicService + '/Query',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalProperty: 'Total',
            id: 'ID'
        }
    }
});