Ext.define("Soims.store.tree.SamplePreparation", {
    extend: 'Ext.data.TreeStore',
    model: 'Soims.model.tree.SamplePreparation',
    proxy: {
        type: 'ajax',
        url: Soims.service.samples.SamplePreparationService + '/QueryBySampleType',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    //autoLoad: true,
    root: {
        checked: false,
        //expanded: true,
        id: 0
    }
});
