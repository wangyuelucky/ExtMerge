Ext.define("Soims.model.notification.Notification", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'title', type: 'string', mapping: 'Title' },
    { name: 'content', type: 'string', mapping: 'Content' },
    { name: 'dateTime', type: 'string', mapping: 'DateTime' }
   
    ]
});