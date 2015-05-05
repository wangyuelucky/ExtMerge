Ext.define("Soims.model.application.common.Leg", {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', mapping: 'ID' },
        { name: 'leg', mapping: 'LegName' },
        { name: 'legCode', mapping: 'Code' }
        
    ]
});