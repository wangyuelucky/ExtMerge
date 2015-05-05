Ext.define('Soims.view.mainFrame.North', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.north',
    region: 'north',
    border: 0,
    requires: ['Soims.view.mainFrame.RoleMenu'],
    tpl: '<div style = "height:93px; padding:50px 60px 0px; background-color:#DFE8F6; background-image:url(Application/common/resources/images/topFinally.jpg); background-repeat:no-repeat;">',
    fbar: [{
        tpl:'<div style="font-weight: bold">您好： {userName}'
                + '！  当前角色是： {roleName}'
                + ' &nbsp;</div></div>',
        xtype: 'label'

    }, { xtype: 'tbfill' }, { 
        text: '短消息',
        iconCls: 'Email',
        tooltip: '短消息列表',
        action: 'messageList'
    }, '-', {
        text: '切换角色',
        iconCls: 'User',
        tooltip: '切换角色',
        menu: { xtype: 'rolemenu' }
    }, '-', {
        text: '修改密码',
        iconCls: 'UserKey',
        tooltip: '修改密码',
        action: 'changePassword'
    }, '-', {
        text: '个人信息',
        iconCls: 'User',
        tooltip: '完善个人信息',
        action: 'improveInformation'
    }, '-', {
        text: '安全退出',
        iconCls: 'ControlPowerBlue',
        tooltip: '退出系统',
        action: 'logout'
    }],

    initComponent: function () {
        /****** 这里的构造会影响west的applyIf
        var self = this,
        innerHtml = self.generateTopBarHtml();
        Ext.applyIf(self, { html: innerHtml });
        ***/
        this.callParent();
    }
});