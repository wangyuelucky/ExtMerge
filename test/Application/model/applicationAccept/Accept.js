Ext.define("Soims.model.applicationAccept.Accept", {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'acceptID', type: 'int', mapping: 'AcceptID' },
        { name: 'acceptAction', mapping: 'AcceptAction' },
        { name: 'acceptContent', mapping: 'AcceptContent' },
        { name: 'acceptTime', mapping: 'AcceptTime' },
        { name: 'applicationID', type: 'int', mapping: 'ID' },
        { name: 'name', mapping: 'Name' },
        { name: 'applicationNumber', mapping: 'ApplicationNumber' },
        { name: 'applicantName', mapping: 'ApplicantName' },
        { name: 'charger', mapping: 'Charger' },
        { name: 'type', mapping: 'Type' },
        { name: 'applyTime', mapping: 'ApplyTime' },
        { name: 'state', mapping: 'State' }
    ]
});