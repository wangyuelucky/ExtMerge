Ext.define("Soims.model.application.show.V3Detail", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'string', mapping: 'ID' },
    { name: 'topicID', type: 'string', mapping: 'TopicID' },
    { name: 'topicName', type: 'string', mapping: 'TopicName' },
    { name: 'topicNumber', type: 'string', mapping: 'TopicNumber' },
    { name: 'topicSource', type: 'string', mapping: 'TopicSource' },

    { name: 'chargerName', type: 'string', mapping: 'TopicChargerName' },
    { name: 'address', type: 'string', mapping: 'TopicChargerAddress' },
    { name: 'cellphone', type: 'string', mapping: 'TopicChargerTellPhone' },
    { name: 'telphone', type: 'string', mapping: 'TopicChargerCellPhone' },
    { name: 'department', type: 'string', mapping: 'TopicChargerUnitName' },
    { name: 'zipCode', type: 'string', mapping: 'TopicChargerZipCode' },
    { name: 'fax', type: 'string', mapping: 'TopicChargerFax' },
    { name: 'email', type: 'string', mapping: 'TopicChargerEmail' },

    { name: 'commitResultTime', type: 'date', mapping: 'CommitResultTime' },
    { name: 'commitResultForm', type: 'string', mapping: 'CommitResultForm' },
    { name: 'commitResultAmount', type: 'string', mapping: 'CommitResultAmount' }
    ]
});