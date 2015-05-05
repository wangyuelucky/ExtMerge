Ext.define('Soims.controller.voyage.EditVoyageLeg', {
    extend: 'Ext.app.Controller',
    views: ['voyage.EditVoyageLeg'],
    models: ['Soims.model.voyage.Leg'],
    refs: [{
        ref: 'editvoyageleg',
        selector: 'editvoyageleg',
        autoCreate: true,
        xtype: 'editvoyageleg'
    }],
    init: function () {
        this.control({
            'editvoyageleg>voyagebasic': {
                beforerender: function (view, e) {
                    if (view.voyageId === undefined) {
                        var store = view.down('#organizationId').getStore();
                        store.load(function (records) {
                            var record = store.findRecord('id', Soims.currentUser.id);
                            view.down('#organizationId').setValue(record);
                        });

                        var destore = view.down('#organizationDepartId').getStore();
                        destore.load(function (records) {
                            var record = destore.findRecord('id', Soims.currentUser.departmentId);
                            view.down('#organizationDepartId').setValue(record);
                        });
                    }
                }
            },
            'editvoyageleg  button[itemId=delete]': {
                click: function (button, e) {
                    var model = button.up('panel').getSelectionModel().getSelection()[0];

                    if (model.get('id') != 0) {
                        Ext.MessageBox.confirm('确认', '该航段已保存，删除后相关信息都会丢失，您确定要删除么？',
                        function (btn) {
                            if (btn == 'yes') {
                                button.up('panel').deleteIds = button.up('panel').deleteIds + ',' + model.get('id');
                                button.up('panel').getStore().remove(model);
                            }
                        }, this);
                    } else {
                        button.up('panel').deleteIds = button.up('panel').deleteIds + ',' + model.get('id');
                        button.up('panel').getStore().remove(model);
                    }
                    for (var i = 0; i < button.up('panel').getStore().getCount(); i++) {
                        var rec = button.up('panel').getStore().getAt(i);
                        var num = button.up('panel').getStore().getCount() - i;
                        if (num.toString().length < 2) {
                            num = '0' + num;
                        }
                        rec.set('code', num);
                    }
                }
            },
            'editvoyageleg  button[itemId=add]': {
                click: function (button, e) {
                    var begin = button.up('panel').up('panel').down('#startTime');
                    var end = button.up('panel').up('panel').down('#endTime');
                    var model = Ext.create('Soims.model.voyage.Leg');
                    model.set('startApplyTime', begin.getValue());
                    model.set('endApplyTime', end.getValue());
                    button.up('panel').getStore().insert(0, model);
                    for (var i = 0; i < button.up('panel').getStore().getCount(); i++) {
                        var rec = button.up('panel').getStore().getAt(i);
                        var num = button.up('panel').getStore().getCount() - i;
                        if (num.toString().length < 2) {
                            num = '0' + num;
                        }
                        rec.set('code', num);
                    }
                }
            },
            'editvoyageleg  button[itemId=refreshTbarlg]': {
                click: function (button, e) {
                    var id = button.up('panel').up('panel').down('#id').getValue();
                    button.up('panel').getStore().reload({ params: { voyageId: id} });
                    button.up('panel').getSelectionModel().deselectAll();
                    button.up('panel').deleteIds = '';
                }
            },
            'editvoyageleg  button[itemId=save]': {
                click: function (button, e) {
                    if (button.up('panel').down('voyagebasic').isValid() && button.up('panel').down('leggrid').isValid()) {
                        this.saveVoyage(button);
                    }
                }
            },
            'editvoyageleg  button[itemId=next]': {
                click: function (button, e) {
                    button.up('panel').up('panel').setActiveTab(1);
                }
            }
        });
    },
    show: function () {
        var panels = this.getVoyageEditVoyageLegView();
        var con = this.getCon('voyage.Voyage');
        var panel = con.showTab('newVoyage', '航次航段', false, panels);
        panel.down('leggrid').getStore().load();
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    },
    saveVoyage: function (button) {
        var form = button.up('panel').down('voyagebasic');
        var grid = button.up('panel').down('leggrid');

        var data = form.getValues();
        Ext.Ajax.request({
            url: Soims.service.voyages.VoyageService + '/Save',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: data,
            success: function (response) {
                this.deleteLeg(response.responseText, grid);
                button.up('panel').up('panel').down('editvoyageleg').down('#id').setValue(response.responseText);

                button.up('panel').up('panel').down('editvoyageleg').down('leggrid').voyageId = response.responseText;
                button.up('panel').up('panel').down('editvoyageleg').down('leggrid').initStore();

                var panel = button.up('panel').up('panel').down('editvoyagetask').down('voyagetask');
                panel.voyageId = response.responseText;
                panel.initStore();
                //panel.legStore.reload();
                button.up('panel').up('panel').down('editvoyagetask').unlock();

                var panel2 = button.up('panel').up('panel').down('editvoyagereport').down('voyagereportdetail');
                panel2.voyageId = response.responseText;
                panel2.initStore();
                button.up('panel').up('panel').down('editvoyagereport').unlock();

                var panel3 = button.up('panel').up('panel').down('boardpeoplepanel');
                panel3.voyageId = response.responseText;
                panel3.initStore();
                button.up('panel').up('panel').down('boardpeoplepanel').unlock();
            }
        });
    },
    saveLegs: function (id, grid) {
        var store = grid.getStore();
        store.each(function (model) {
            model.set('voyageId', id);
            var data = model.getData();
            this.saveLeg(data, model);
        }, this);
        grid.up('panel').up('panel').down('editvoyagetask').down('voyagetask').legStore.reload();
        grid.getStore().reload();
        Ext.MessageBox.alert('消息', '保存成功！', function () { }, this);
    },
    saveLeg: function (data, model) {
        Ext.Ajax.request({
            async: false,
            url: Soims.service.voyages.LegService + '/Save',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: data,
            success: function (response) {
                model.set('id', response.responseText);
            }
        });
    },
    deleteLeg: function (id, grid) {
        var deleteIds = grid.deleteIds;
        Ext.Ajax.request({
            url: Soims.service.voyages.LegService + '/DeleteByIds',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { deleteIds: deleteIds },
            success: function (response) {
                this.saveLegs(id, grid);
                grid.deleteIds = '';
                if (response.responseText) {
                    Ext.MessageBox.alert('警告', response.responseText + '\n' + '以上航段已被用于申请样品，无法删除！', function () { }, this);
                }
            }
        });
    }
});