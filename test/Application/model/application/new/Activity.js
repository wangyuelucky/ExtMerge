Ext.define("Soims.model.application.new.Activity", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'activityID', type: 'int', mapping: 'ActivityID' },
    { name: 'activityName', type: 'string', mapping: 'ActivityName' },
    { name: 'activityPlace', type: 'string', mapping: 'ActivityPlace' },
    { name: 'activityDepartment', type: 'string', mapping: 'ActivityDepartment' },
    { name: 'ChargerName', type: 'string', mapping: 'ChargerName' },
    { name: 'ChargerID', type: 'string', mapping: 'ChargerId' },
    { name: 'Address', type: 'string', mapping: 'Address' },
    { name: 'Cellphone', type: 'string', mapping: 'Cellphone' },
    { name: 'Telphone', type: 'string', mapping: 'Telphone' },
    { name: 'ZipCode', type: 'string', mapping: 'ZipCode' },
    { name: 'Fax', type: 'string', mapping: 'Fax' },
    { name: 'Email', type: 'string', mapping: 'Email' },
    { name: 'Department', type: 'string', mapping: 'Department' }    
    ]
});