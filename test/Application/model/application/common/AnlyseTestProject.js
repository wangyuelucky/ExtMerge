
Ext.define("Soims.model.application.common.AnlyseTestProject", {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int', mapping: 'ID' },
        'leg',
        'legID',
        'index',
        'sampleType',
        'isChecked',
        'usePurpose',
        { name: 'anlyseTestProject', mapping: 'TestProject' },
        'anlyseTestProjectID',
        { name: 'intendCommitTestData', mapping: 'IntendCommitTestData' },
        { name: 'commitTestDataTime', mapping: 'CommitTestDataTime' }
    ],
    belongsTo: [{
        name: 'Sample',
        getterName: 'getSample',
        setterName: 'setSample',
        model: 'Soims.model.application.common.Sample'
    }]
});