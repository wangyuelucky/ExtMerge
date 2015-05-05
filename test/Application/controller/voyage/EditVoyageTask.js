Ext.define('Soims.controller.voyage.EditVoyageTask', {
    extend: 'Ext.app.Controller',
    views: ['voyage.EditVoyageTask'],
    refs: [{
        ref: 'editvoyagetask',
        selector: 'editvoyagetask',
        autoCreate: true,
        xtype: 'editvoyagetask'
    }],
    init: function () {
        this.control({
            'editvoyagetask  button[itemId=save]': {
                click: function (button, e) {
                    if (button.up('panel').down('panel').isValid()) {
                        this.deleteVoyageTask(button);
                    }
                }
            },
            'editvoyagetask  button[itemId=back]': {
                click: function (button, e) {
                    button.up('panel').up('panel').setActiveTab(0);
                }
            },
            'editvoyagetask  button[itemId=next]': {
                click: function (button, e) {
                    button.up('panel').up('panel').setActiveTab(2);
                }
            },
            'editvoyagetask  button[itemId=delete]': {
                click: function (button, e) {
                    var model = button.up('panel').getSelectionModel().getSelection()[0];
                    button.up('panel').deleteIds = button.up('panel').deleteIds + ',' + model.get('id');
                    button.up('panel').getStore().remove(model);
                }
            },
            'editvoyagetask  button[itemId=add]': {
                click: function (button, e) {
                    var model = Ext.create('Soims.model.voyage.VoyageTask'),
                        grid = button.up('panel');

                    model.set('voyageTaskLegNames', '');
                    grid.getStore().insert(0, model);

                    grid.firstEditCellFocus();
                }
            },
            'editvoyagetask  button[itemId=refreshTbarEq]': {
                click: function (button, e) {
                    button.up('panel').getStore().reload();
                    button.up('panel').getSelectionModel().deselectAll();
                    button.up('panel').deleteIds = '';
                }
            }
        });
    },
    show: function (id) {
        var winFun = this.getVoyageVoyageTaskWinView();
        var win = Ext.create(winFun, { voyageId: id });
        win.show();
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    },
    saveVoyageTask: function (grid) {
        var voyageId = grid.voyageId;
        var store = grid.getStore();
        store.each(function (rec) {
            var data = rec.getData();
            Ext.apply(data, { voyageId: voyageId });
            Ext.Ajax.request({
                async: false,
                url: Soims.service.voyages.VoyageTaskService + '/Save',
                method: 'POST',
                scope: this, // 注意scope是必须的
                params: data,
                success: function (response) {
                    rec.set('id', response.responseText);
                }
            });
        }, this);
        store.reload();
        Ext.MessageBox.alert('消息', '保存成功！', function () { }, this);
    },
    deleteVoyageTask: function (button) {
        var grid = button.up('panel').down('panel');
        var deleteIds = grid.deleteIds;
        Ext.Ajax.request({
            url: Soims.service.voyages.VoyageTaskService + '/DeleteByIds',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { deleteIds: deleteIds },
            success: function (response) {
                this.saveVoyageTask(grid);
                grid.deleteIds = '';
            }
        });
    }
});