Ext.define('Soims.controller.project.Project', {
    extend: 'Ext.app.Controller',
    requires: ['Soims.store.project.Subject'],
    stores: ['project.Project'],
    views: ['project.Project'],
    refs: [{
        ref: 'project',
        selector: 'project',
        autoCreate: true,
        xtype: 'project'
    }],
    init: function () {
        this.control({
            'project  button[itemId=modify]': {
                click: function (button, e) {
                    var model = button.up('panel').getSelectionModel().getSelection()[0];
                    var panels = this.getCon('project.EditProject').getProjectEditProjectView();
                    var panel = this.showTab('EditProject' + model.get('id'), model.get('name'), false, panels);
                    var form = panel.down('editprojectbasic');
                    form.loadRecord(model);
                    var grid = panel.down('editprojectgrid');
                    grid.getStore().load({ params: { projectId: model.get('id')} });
                }
            },
            'project  button[itemId=show]': {
                click: function (button, e) {
                    var model = button.up('panel').getSelectionModel().getSelection()[0];
                    var panels = this.getCon('project.EditProject').getProjectEditProjectView();
                    var panel = this.showTab('ShowProject' + model.get('id'), model.get('name'), true, panels);
                    var form = panel.down('editprojectbasic');
                    form.loadRecord(model);
                    var grid = panel.down('editprojectgrid');
                    grid.getStore().load({ params: { projectId: model.get('id')} });
                }
            },
            'project  button[itemId=delete]': {
                click: function (button, e) {
                    Ext.MessageBox.confirm('确认', '您确定要删除此项目么，项目的所有信息都将丢失？',
                    function (btn) {
                        if (btn == 'yes') {
                            this.deleteProject(button);
                        }
                    }, this);
                }
            },
            'project  button[itemId=refreshTbarProList]': {
                click: function (button, e) {
                    button.up('panel').getStore().reload();
                    button.up('panel').getSelectionModel().deselectAll();
                }
            },
            'project': {
                //监听panel的行变换事件
                selectionchange: function (selModel, records) {
                    if (records.length != 0) {
                        this.getProject().down('#modify').setDisabled(false);
                        this.getProject().down('#show').setDisabled(false);
                        this.getProject().down('#delete').setDisabled(false);
                    } else {
                        this.getProject().down('#modify').setDisabled(true);
                        this.getProject().down('#show').setDisabled(true);
                        this.getProject().down('#delete').setDisabled(true);
                    }
                }
            }
        });
    },
    showTab: function (id, title, isShow, panel) {
        var con = this.getCon('mainFrame.Main');
        var instance = con.existInstance(id);
        if (!instance) {
            var panelNew = Ext.create(panel, { id: id, title: title, isShow: isShow });
            con.addTab(panelNew);
            return panelNew;
        } else {
            return instance;
        }
    },
    show: function () {
        var projectPanel = this.getProject();
        var con = this.getCon('mainFrame.Main');
        con.addTab(projectPanel);
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    },
    deleteProject: function (button) {
        var model = button.up('panel').getSelectionModel().getSelection()[0];
        var id = model.get('id');
        Ext.Ajax.request({
            url: Soims.service.projects.ProjectService + '/Delete',
            method: 'POST',
            scope: this, // 注意scope是必须的
            params: {id: id},
            success: function (response) {
                button.up('panel').getStore().reload();
            }
        });
    }
});