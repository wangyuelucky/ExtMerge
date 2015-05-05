Ext.define("Soims.model.voyage.Leg", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'voyageId', type: 'int', mapping: 'VoyageId' },
    { name: 'name', type: 'string', mapping: 'Name' },
    { name: 'code', type: 'string', mapping: 'Code' },
    { name: 'chargerName', type: 'string', mapping: 'ChargerName' },
    { name: 'chargerId', type: 'int', mapping: 'ChargerId' },
    { name: 'sampleAreas', type: 'string', mapping: 'SampleAreas' },
    { name: 'sampleAreaIds', type: 'string', mapping: 'SampleAreaIds' },
    { name: 'startTime', type: 'date', mapping: 'StartTime' },
    { name: 'endTime', type: 'date', mapping: 'EndTime' },
    { name: 'startApplyTime', type: 'date', mapping: 'StartApplyTime' }, 
    { name: 'endApplyTime', type: 'date', mapping: 'EndApplyTime' }
    ]
});