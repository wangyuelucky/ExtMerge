Ext.define("Soims.store.department.DepartmentType", {
    extend: 'Ext.data.Store',
    model: 'Soims.model.department.DepartmentType',
    data: [
    { id: '0', type: '大洋样品馆' },
    { id: '1', type: '大洋协会办公室' },
    { id: '2', type: '国家海洋局' },
    { id: '3', type: '高校' },
    { id: '4', type: '研究所' },
    { id: '5', type: '其他' }
    ]
});