Ext.define("Soims.store.tree.UsePurpose", {
    extend: 'Ext.data.TreeStore',
    model: 'Soims.model.tree.UsePurpose',
    proxy: {
        type: 'ajax',
        url: Soims.service.samples.UsePurposeService + '/QueryAllItems',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    root: {
        expanded: true,
        checked: false,
        id: 0
    }
});
