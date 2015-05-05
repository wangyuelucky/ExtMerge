Ext.define('Soims.controller.department.Department', {
    extend: 'Ext.app.Controller',
    stores: ['department.Department'],
    views: ['department.Department'],
    refs: [{
        ref: 'department',
        selector: 'department',
        autoCreate: true,
        xtype: 'department'
    }],
    init: function () {
        this.control({
            'department  button[itemId=add]': {
                click: function (button, e) {
                    var con = this.getCon('department.DepartmentWin');
                    con.show();
                }
            },
            'department  button[itemId=modify]': {
                click: function (button, e) {
                    var con = this.getCon('department.DepartmentWin');
                    var panel = button.up('panel');
                    var selectionModel = panel.getSelectionModel();
                    var record = selectionModel.getSelection()[0];

                    con.getDepartmentWin().down('panel').loadRecord(record);
                }
            },
            'department  button[itemId=delete]': {
                click: function (button, e) {
                    Ext.MessageBox.confirm('确认', '您确定要删除此单位么？',
                    function (btn) {
                        if (btn == 'yes') {
                            this.deleteDataBase(button);
                        }
                    }, this);
                }
            },
            'department  button[itemId=refreshTbarDep]': {
                click: function (button, e) {
                    button.up('panel').getStore().reload();
                    button.up('panel').getSelectionModel().deselectAll();
                }
            },
            'department': {
                //监听panel的双击事件
                itemdblclick: function (view, record) {
                },
                //监听panel的行变换事件
                selectionchange: function (selModel, records) {
                    if (records.length != 0) {
                        this.getDepartment().down('#delete').setDisabled(false);
                        this.getDepartment().down('#modify').setDisabled(false);
                    } else {
                        this.getDepartment().down('#delete').setDisabled(true);
                        this.getDepartment().down('#modify').setDisabled(true);
                    }
                }
            }
        });
    },
    show: function () {
        var panel = this.getDepartment();
        var con = this.getCon('mainFrame.Main');
        con.addTab(panel);
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    },
    deleteDataBase: function (button) {
        var panel = button.up('panel');
        var selectionModel = panel.getSelectionModel();
        var record = selectionModel.getSelection()[0];
        var id = record.get('id');
        Ext.Ajax.request({
            url: Soims.service.departments.DepartmentService + '/Delete',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { id: id },
            success: function (response) {
                this.getDepartmentDepartmentStore().reload();
            }
        });
    }
});