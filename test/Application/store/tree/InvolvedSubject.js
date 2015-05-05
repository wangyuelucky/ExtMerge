Ext.define("Soims.store.tree.InvolvedSubject", {
    extend: 'Ext.data.TreeStore',
    model: 'Soims.model.tree.InvolvedSubject',
    proxy: {
        type: 'ajax',
        url: Soims.service.samples.InvolvedSubjectService + '/QueryAllItems',
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
