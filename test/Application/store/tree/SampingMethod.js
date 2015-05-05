Ext.define("Soims.store.tree.SampingMethod", {
    extend: 'Ext.data.TreeStore',
    model: 'Soims.model.tree.Tree',
    proxy: {
        type: 'ajax',
        url: Soims.service.samples.SampleSamplingMethodService + '/QueryItems',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: true,
    root: {
        expanded: true,
        checked: false,
        id: 0
    }
});