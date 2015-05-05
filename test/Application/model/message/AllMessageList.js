Ext.define("Soims.model.message.AllMessageList", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'title', type: 'string', mapping: 'Title' },
    { name: 'receiver', type: 'string', mapping: 'Receiver' },
    { name: 'receiverID', type: 'int', mapping: 'ReceiverID' },
    { name: 'sender', type: 'string', mapping: 'Sender' },
    { name: 'senderID', type: 'int', mapping: 'SenderID' },
    { name: 'content', type: 'string', mapping: 'Content' },
    { name: 'dateTime', type: 'string', mapping: 'DateTime' },
    { name: 'isRead', type: 'string', mapping: 'IsRead', convert: function (value) {
        if (value == "False") {
            return "否";
        }
        else {
            return "是";
        }
    }
    }
    ]
});