Ext.define("Soims.model.application.new.VoyageTask", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'ID' },
    { name: 'name', type: 'string', mapping: 'VoyageTask' },
    { name: 'legs', type: 'string', mapping: 'Legs' }
    ]
});