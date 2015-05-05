Ext.define("Soims.model.application.show.B2Detail", {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int', mapping: 'ID' },
        { name: 'topicID', type: 'int', mapping: 'TopicID' },
        { name: 'topicName', type: 'string', mapping: 'TopicName' },
        { name: 'topicNumber', type: 'string', mapping: 'TopicNumber' },
        { name: 'topicChargerID', type: 'string', mapping: 'TopicChargerID' },
        { name: 'topicChargerName', type: 'string', mapping: 'TopicChargerName' },
        { name: 'topicAddress', type: 'string', mapping: 'TopicChargerAddress' },
        { name: 'topicZipCode', type: 'string', mapping: 'TopicChargerZipCode' },
        { name: 'topicTelphone', type: 'string', mapping: 'TopicChargerTellPhone' },
        { name: 'topicFax', type: 'string', mapping: 'TopicChargerFax' },
        { name: 'topicEmail', type: 'string', mapping: 'TopicChargerEmail' },
        { name: 'topicCellphone', type: 'string', mapping: 'TopicChargerCellPhone' },
        { name: 'topicDepartment', type: 'string', mapping: 'TopicChargerCompany' },
        { name: 'projectID', type: 'string', mapping: 'ProjectID' },
        { name: 'projectName', type: 'string', mapping: 'ProjectName' },
        { name: 'projectNumber', type: 'string', mapping: 'ProjectNumber' },
        { name: 'projectChargerID', type: 'string', mapping: 'ProjectChargerID' },
        { name: 'projectChargerName', type: 'string', mapping: 'ProjectChargerName' },
        { name: 'projectAddress', type: 'string', mapping: 'ProjectChargerAddress' },
        { name: 'projectZipCode', type: 'string', mapping: 'ProjectChargerZipCode' },
        { name: 'projectTelphone', type: 'string', mapping: 'ProjectChargerTellPhone' },
        { name: 'projectFax', type: 'string', mapping: 'ProjectChargerFax' },
        { name: 'projectEmail', type: 'string', mapping: 'ProjectChargerEmail' },
        { name: 'projectCellphone', type: 'string', mapping: 'ProjectChargerCellPhone' },
        { name: 'projectDepartment', type: 'string', mapping: 'ProjectChargerCompany' },
        { name: 'legID', type: 'string', mapping: 'LegID' },
        { name: 'legName', type: 'string', mapping: 'LegName' },
        { name: 'usingNecessity', type: 'string', mapping: 'UsingNecessity' },
        { name: 'repatriaionNecessity', type: 'string', mapping: 'RepatriaionNecessity' },
        { name: 'commitResultTime', type: 'date', mapping: 'CommitResultTime' },
        { name: 'commitResultForm', type: 'string', mapping: 'CommitResultForm' },
        { name: 'commitResultAmount', type: 'string', mapping: 'CommitResultAmount' }
   

    ]
});