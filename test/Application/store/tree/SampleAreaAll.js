Ext.define("Soims.store.tree.SampleAreaAll", {
    extend: 'Ext.data.TreeStore',
    model: 'Soims.model.tree.SamplingArea',
    proxy: {
        type: 'ajax',
        url: Soims.service.samples.SamplingAreaService + '/QueryItemByID',
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
