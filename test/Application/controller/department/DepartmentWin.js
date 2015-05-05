Ext.define('Soims.controller.department.DepartmentWin', {
    extend: 'Ext.app.Controller',
    views: ['department.DepartmentWin'],
    refs: [{
        ref: 'departmentWin',
        selector: 'departmentWin',
        autoCreate: true,
        xtype: 'departmentWin'
    }],
    init: function () {
        this.control({
            'departmentWin  button[itemId=save]': {
                click: function (button, e) {
                    if (button.up('window').down('panel').isValid()) {
                        this.save(button);
                    }
                }
            },
            'departmentWin  button[itemId=cancel]': {
                click: function (button, e) {
                    button.up('window').close();
                }
            },
            'departmentWin  treefield[itemId=test]': {
                beforecreatepicker: function (t) {
                    console.log('111111');
                    //return false;
                }
            }
        });
    },
    show: function () {
        var window = this.getDepartmentWin();
        window.show();
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    },
    save: function (button) {
        var form = button.up('window').down('panel');
        //form.updateRecord();
        //console.log(form.getRecord());
        var data = form.getValues();
        console.log(data);
        Ext.Ajax.request({
            url: Soims.service.departments.DepartmentService + '/Save',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: data,
            success: function (response) {
                if (!response.responseText) {
                    button.up('window').close();
                    var con = this.getCon('department.Department');
                    con.getDepartment().getStore().reload();
                    con.getDepartment().getSelectionModel().deselectAll();
                } else {
                    Ext.MessageBox.alert('警告', '该单位名称已经存在，请检查单位名称是否为该单位全称', function () { }, this);
                }
            }
        });
    }
});