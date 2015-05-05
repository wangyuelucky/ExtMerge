Ext.define("Soims.model.application.common.ElectronicDocument", {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', mapping: 'ID' },
        { name: 'resourceID', mapping: 'ResourceID' },
        { name: 'name', mapping: 'Name' },
        { name: 'length', mapping: 'Length' },
        { name: 'remark', mapping: 'Remark' }
    ]
});