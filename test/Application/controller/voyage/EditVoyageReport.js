Ext.define('Soims.controller.voyage.EditVoyageReport', {
    extend: 'Ext.app.Controller',
    views: ['voyage.EditVoyageReport'],
    requires: ['Soims.model.voyage.VoyageReportDetail', 'Soims.store.voyage.VoyageReport'],
    refs: [{
        ref: 'editvoyagereport',
        selector: 'editvoyagereport',
        autoCreate: true,
        xtype: 'editvoyagereport'
    }],
    init: function () {
        this.control({
            'editvoyagereport>voyagereportbasic': {
                beforerender: function (view, e) {
                    var store = Ext.create('Soims.store.voyage.VoyageReport');
                    store.getProxy().setExtraParam('voyageId', view.voyageId);
                    store.load(function () {
                        if (store.getCount() != 0) {
                            view.loadRecord(store.getAt(0));
                        }
                    });
                }
            },
            'editvoyagereport  button[itemId=complete]': {
                click: function (button, e) {
                    if (button.up('panel').down('voyagereportbasic').isValid() && button.up('panel').down('voyagereportdetail').isValid()) {
                        this.saveVoyageReport(button);
                        button.up('panel').up('panel').close();
                        var con = this.getCon('voyage.Voyage');
                        con.show();
                        con.getVoyage().getStore().reload();
                        con.getVoyage().getSelectionModel().deselectAll();
                    }
                }
            },
            'editvoyagereport  button[itemId=save]': {
                click: function (button, e) {
                    if (button.up('panel').down('voyagereportbasic').isValid() && button.up('panel').down('voyagereportdetail').isValid()) {
                        this.saveVoyageReport(button);
                    }
                }
            },
            'editvoyagereport  button[itemId=back]': {
                click: function (button, e) {
                    button.up('panel').up('panel').setActiveTab(1);
                }
            },
            'editvoyagereport  button[itemId=delete]': {
                click: function (button, e) {
                    var model = button.up('panel').getSelectionModel().getSelection()[0];
                    button.up('panel').deleteIds = button.up('panel').deleteIds + ',' + model.get('id');
                    button.up('panel').getStore().remove(model);
                }
            },
            'editvoyagereport  button[itemId=add]': {
                click: function (button, e) {
                    var model = Ext.create('Soims.model.voyage.VoyageReportDetail');
                    button.up('panel').getStore().insert(0, model);
                }
            },
            'editvoyagereport  button[itemId=refreshTbardl]': {
                click: function (button, e) {
                    button.up('panel').getStore().reload();
                    button.up('panel').getSelectionModel().deselectAll();
                    button.up('panel').deleteIds = '';
                }
            }
        });
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    },
    saveVoyageReport: function (button) {
        var form = button.up('panel').down('voyagereportbasic');
        var grid = button.up('panel').down('voyagereportdetail');

        var data = form.getValues();
        Ext.apply(data, { voyageId: grid.voyageId });

        Ext.Ajax.request({
            url: Soims.service.voyages.VoyageReportService + '/Save',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: data,
            success: function (response) {
                if (button.getItemId() === 'complete') {
                    this.deleteVoyageReportDetail(response.responseText, grid, false);
                } else {
                    this.deleteVoyageReportDetail(response.responseText, grid, true);
                }
            }
        });
    },
    saveVoyageReportDetails: function (id, grid, flg) {
        var store = grid.getStore();
        store.each(function (model) {
            var data = model.getData();
            Ext.apply(data, { voyageReportId: id });
            this.saveVoyageReportDetail(data, model);
        }, this);
        store.reload();
        if (flg) {
            Ext.MessageBox.alert('消息', '保存成功！', function () { }, this);
        }
    },
    saveVoyageReportDetail: function (data, model) {
        Ext.Ajax.request({
            async: false,
            url: Soims.service.voyages.VoyageReportDetailService + '/Save',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: data,
            success: function (response) {
                model.set('id', response.responseText);
            }
        });
    },
    deleteVoyageReportDetail: function (id, grid, flg) {
        var deleteIds = grid.deleteIds;
        Ext.Ajax.request({
            url: Soims.service.voyages.VoyageReportDetailService + '/DeleteByIds',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { deleteIds: deleteIds },
            success: function (response) {
                this.saveVoyageReportDetails(id, grid, flg);
            }
        });
    }
});