Ext.define("Soims.model.application.show.V4Detail", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'activityID', type: 'string', mapping: 'ActivityID' },
    { name: 'activityName', type: 'string', mapping: 'ActivityName' },
    { name: 'activityPlace', type: 'string', mapping: 'ActivityPlace' },
    { name: 'activityDepartment', type: 'string', mapping: 'ActivityDepartment' },   

    { name: 'chargerName', type: 'string', mapping: 'ActivityChargerName' },
    { name: 'address', type: 'string', mapping: 'ActivityChargerAddress' },
    { name: 'cellphone', type: 'string', mapping: 'ActivityChargerTellPhone' },
    { name: 'telphone', type: 'string', mapping: 'ActivityChargerCellPhone' },
    { name: 'department', type: 'string', mapping: 'ActivityChargerUnitName' },
    { name: 'zipCode', type: 'string', mapping: 'ActivityChargerZipCode' },
    { name: 'fax', type: 'string', mapping: 'ActivityChargerFax' },
    { name: 'email', type: 'string', mapping: 'ActivityChargerEmail' },

    { name: 'activityStartTime', type: 'date', mapping: 'ActivityStartTime' },
    { name: 'activityEndTime', type: 'date', mapping: 'ActivityEndTime' }
    
    ]
});