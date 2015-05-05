Ext.define("Soims.model.project.Subject", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'projectId', type: 'int', mapping: 'ProjectId' },
    { name: 'name', type: 'string', mapping: 'Name' },
    { name: 'number', type: 'string', mapping: 'Number' },
    { name: 'chargerName', type: 'string', mapping: 'ChargerName' },
    { name: 'chargerId', type: 'int', mapping: 'ChargerId' },
    { name: 'startTime', type: 'date', mapping: 'StartTime' },
    { name: 'endTime', type: 'date', mapping: 'EndTime' },
    { name: 'endApplyTime', type: 'date', mapping: 'EndApplyTime' }
    ],
    validations: [
    { type: "presence", field: "name"},
    { type: "presence", field: "number"},
    { type: "presence", field: "chargerId"},
    { type: "presence", field: "startTime"},
    { type: "presence", field: "endTime"},
    { type: "presence", field: "endApplyTime"}
    ]
});