Ext.define("Soims.store.tree.SamplingArea", {
    extend: 'Ext.data.TreeStore',
    model: 'Soims.model.tree.SamplingArea',
    proxy: {
        type: 'ajax',
        url: Soims.service.samples.SamplingAreaService + '/QuerySamplingAreaByLegOrSampleType',
        async: false,
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    root: {
        loadOnce: true,
        expanded: true,
        checked: false,
        id: 0
    }
});
