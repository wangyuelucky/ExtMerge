Ext.define("Soims.model.application.show.V2Detail", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'topicID', type: 'string', mapping: 'TopicID' },
    { name: 'topicName', type: 'string', mapping: 'TopicName' },
    { name: 'topicNumber', type: 'string', mapping: 'TopicNumber' },
    { name: 'projectName', type: 'string', mapping: 'ProjectName' },
    { name: 'projectNumber', type: 'string', mapping: 'ProjectNumber' },

    { name: 'topicChargerName', type: 'string', mapping: 'TopicChargerName' },
    { name: 'topicAddress', type: 'string', mapping: 'TopicChargerAddress' },
    { name: 'topicCellphone', type: 'string', mapping: 'TopicChargerTellPhone' },
    { name: 'topicTelphone', type: 'string', mapping: 'TopicChargerCellPhone' },
    { name: 'topicDepartment', type: 'string', mapping: 'TopicChargerUnitName' },
    { name: 'topicZipCode', type: 'string', mapping: 'TopicChargerZipCode' },
    { name: 'topicFax', type: 'string', mapping: 'TopicChargerFax' },
    { name: 'topicEmail', type: 'string', mapping: 'TopicChargerEmail' },

    { name: 'projectChargerName', type: 'string', mapping: 'ProjectChargerName' },
    { name: 'projectAddress', type: 'string', mapping: 'ProjectChargerAddress' },
    { name: 'projectCellphone', type: 'string', mapping: 'ProjectChargerTellPhone' },
    { name: 'projectTelphone', type: 'string', mapping: 'ProjectChargerCellPhone' },
    { name: 'projectDepartment', type: 'string', mapping: 'ProjectChargerUnitName' },
    { name: 'projectZipCode', type: 'string', mapping: 'ProjectChargerZipCode' },
    { name: 'projectFax', type: 'string', mapping: 'ProjectChargerFax' },
    { name: 'projectEmail', type: 'string', mapping: 'ProjectChargerEmail' },
    
    { name: 'commitResultTime', type: 'date', mapping: 'CommitResultTime' },
    { name: 'commitResultForm', type: 'string', mapping: 'CommitResultForm' },
    { name: 'commitResultAmount', type: 'string', mapping: 'CommitResultAmount' }
    ]
});