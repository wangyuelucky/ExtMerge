Ext.define("Soims.model.application.new.Subject", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'topicName', type: 'string', mapping: 'Name' },
    { name: 'topicNumber', type: 'string', mapping: 'Number' },
    { name: 'projectName', type: 'string', mapping: 'Project' },
    { name: 'projectNumber', type: 'string', mapping: 'ProjectNumber' },
    { name: 'projectChargerName', type: 'string', mapping: 'projectChargerName' },
    { name: 'projectAddress', type: 'string', mapping: 'projectAddress' },
    { name: 'projectCellphone', type: 'string', mapping: 'projectCellphone' },
    { name: 'projectTelphone', type: 'string', mapping: 'projectTelphone' },
    { name: 'projectZipCode', type: 'string', mapping: 'projectZipCode' },
    { name: 'projectFax', type: 'string', mapping: 'projectFax' },
    { name: 'projectEmail', type: 'string', mapping: 'projectEmail' },
    { name: 'projectDepartment', type: 'string', mapping: 'projectDepartment' }
    ]
});