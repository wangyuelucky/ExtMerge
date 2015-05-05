Ext.define("Soims.view.project.EditProject", {
    extend: 'Ext.form.Panel',
    alias: 'widget.editproject',
    title: '新建项目',
    closable: true,
    iconCls: 'Project',
    buttonAlign: 'center',
    requires: ['Soims.view.project.EditProjectBasic', 'Soims.view.project.EditProjectGrid'],
    autoShow: true,
    initComponent: function () {
        this.items = [{
            xtype: 'editprojectbasic',
            isShow: this.isShow
        }, {
            xtype: 'editprojectgrid',
            isShow: this.isShow
        }];
        this.buttons = [{
            text: '保存',
            xtype: 'button',
            hidden: this.isShow,
            itemId: 'save'
        }, {
            text: '取消',
            xtype: 'button',
            hidden: this.isShow,
            itemId: 'cancel'
        }];
        this.callParent();
    }
});

