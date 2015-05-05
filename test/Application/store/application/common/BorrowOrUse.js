Ext.define("Soims.store.application.common.BorrowOrUse", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.application.common.BorrowOrUse',
    data: [
        {name:'使用'},
        {name:'借用'}
    ]
});