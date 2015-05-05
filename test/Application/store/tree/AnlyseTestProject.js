Ext.define("Soims.store.tree.AnlyseTestProject", {
    extend: 'Ext.data.TreeStore',
    model: 'Soims.model.tree.AnlyseTestProject',
    proxy: {
        type: 'ajax',
        url: Soims.service.samples.AnlyseTestProjectService + '/QueryByParentIDAndSampleType',
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
