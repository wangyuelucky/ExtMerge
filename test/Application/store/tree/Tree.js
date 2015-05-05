Ext.define("Soims.store.tree.Tree", {
    extend: 'Ext.data.TreeStore',
    model: 'Soims.model.tree.Tree',
    proxy: {
        type: 'ajax',
        url: Soims.service.samples.SampleTypeService + '/QueryItemsByParentID',
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
