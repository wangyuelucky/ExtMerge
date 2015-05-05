Ext.define("Soims.store.notification.NotificationList", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.notification.NotificationList',
    autoLoad: true,
    pageSize: 30,
    proxy: {
        type: 'ajax',
        url: Soims.service.users.NotificationService + '/GetNotifications',
        reader: {
            type: 'xml',
            root: 'QueryResult',
            record: 'Record',
            totalRecords: 'Total',          
            totalProperty: 'Total'
        }            
    }
    
});