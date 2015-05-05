Ext.define("Soims.store.notification.State", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.notification.State',
    data: [
    { id: '0', state: '置顶' },
    { id: '1', state: '普通' },
    { id: '2', state: '过期' },
    
    ]
});