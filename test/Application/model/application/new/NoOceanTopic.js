Ext.define("Soims.model.application.new.NoOceanTopic", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'topicID', type: 'int', mapping: 'TopicID' },
    { name: 'topicName', type: 'string', mapping: 'TopicName' },
    { name: 'topicNumber', type: 'string', mapping: 'TopicNumber' },
    { name: 'topicSource', type: 'string', mapping: 'TopicSource' }
    ]
});