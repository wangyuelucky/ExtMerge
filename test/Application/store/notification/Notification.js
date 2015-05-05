Ext.define("Soims.store.notification.Notification", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.notification.Notification',
    pageSize: 30,
    proxy: {
        
        type: 'ajax',
        url: Soims.service.users.NotificationService + '/GetAvailable',
      
       reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalRecords: 'Total',
            totalProperty: 'Total',
            id: 'ID'
        }
    },
    autoLoad: true
});