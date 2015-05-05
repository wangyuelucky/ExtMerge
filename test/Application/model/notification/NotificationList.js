Ext.define("Soims.model.notification.NotificationList", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'title', type: 'string', mapping: 'Title' },
    { name: 'sender', type: 'string', mapping: 'Sender' },
    { name: 'senderID', type: 'int', mapping: 'SenderID' },
    { name: 'content', type: 'string', mapping: 'Content' },
    { name: 'dateTime', type: 'string', mapping: 'DateTime' },
    { name: 'state', type: 'string', mapping: 'State'}
    ]
});