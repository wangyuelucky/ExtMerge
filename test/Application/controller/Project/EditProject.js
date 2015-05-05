Ext.define('Soims.controller.project.EditProject', {
    extend: 'Ext.app.Controller',
    stores: ['project.Subject'],
    views: ['project.EditProject'],
    models: ['Soims.model.project.Subject'],
    refs: [{
        ref: 'editproject',
        selector: 'editproject',
        autoCreate: true,
        xtype: 'editproject'
    }],
    init: function () {
        this.control({
            //监听panel事件
            'editproject  button[itemId=save]': {
                click: function (button, e) {
                    //console.log(button.up('panel').down('editprojectgrid').isValid());
                    if (button.up('panel').down('editprojectbasic').isValid() && button.up('panel').down('editprojectgrid').isValid()) {
                        this.saveProject(button);
                        button.up('panel').close();
                        var con = this.getCon('project.Project');
                        con.show();
                        con.getProject().getStore().reload();
                        con.getProject().getSelectionModel().deselectAll();
                    }
                }
            },
            'editproject  button[itemId=cancel]': {
                click: function (button, e) {
                    button.up('panel').close();
                }
            },
            'editproject  button[itemId=delete]': {
                click: function (button, e) {
                    var model = button.up('panel').getSelectionModel().getSelection()[0];
                    button.up('panel').deleteIds = '';
                    button.up('panel').deleteIds = button.up('panel').deleteIds + ',' + model.get('id');
                    button.up('panel').getStore().remove(model);
                }
            },
            'editproject  button[itemId=add]': {
                click: function (button, e) {
                    var model = Ext.create('Soims.model.project.Subject');
                    button.up('panel').getStore().insert(0, model);
                    console.log(button.up('panel').getStore().getCount());
                }
            },
            'editproject  button[itemId=refreshTbarPro]': {
                click: function (button, e) {
                    var id = button.up('panel').up('panel').down('#id').getValue();
                    button.up('panel').getStore().reload({ params: { projectId: id} });
                    button.up('panel').getSelectionModel().deselectAll();
                    button.up('panel').deleteIds = '';
                }
            },
            'editproject>editprojectgrid': {
                selectionchange: function (selModel, records) {
                }
            }
        });
    },
    show: function () {
        var panels = this.getProjectEditProjectView();
        var con = this.getCon('project.Project');
        var panel = con.showTab('newProject', '新建项目', false, panels);
        panel.down('editprojectgrid').getStore().load();
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    },
    saveProject: function (button) {
        var form = button.up('panel').down('editprojectbasic');
        var grid = button.up('panel').down('editprojectgrid');

        var data = form.getValues();
        Ext.Ajax.request({
            url: Soims.service.projects.ProjectService + '/Save',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: data,
            success: function (response) {
                this.deleteTopic(response.responseText, grid);
            }
        });
    },
    saveTopics: function (id, grid) {
        var store = grid.getStore();
        store.each(function (model) {
            model.set('projectId', id);
            var data = model.getData();
            this.saveTopic(data);
        }, this);
    },
    saveTopic: function (data) {
        Ext.Ajax.request({
            url: Soims.service.projects.TopicService + '/Save',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: data,
            success: function (response) {
            }
        });
    },
    deleteTopic: function (id, grid) {
        var deleteIds = grid.deleteIds;
        Ext.Ajax.request({
            url: Soims.service.projects.TopicService + '/DeleteByIds',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: { deleteIds: deleteIds },
            success: function (response) {
                this.saveTopics(id, grid);
            }
        });
    }
});