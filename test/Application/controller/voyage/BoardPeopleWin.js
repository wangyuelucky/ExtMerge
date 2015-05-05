Ext.define('Soims.controller.voyage.BoardPeopleWin', {
    extend: 'Ext.app.Controller',
    views: ['voyage.BoardPeopleWin'],
    refs: [{
        ref: 'boardpeoplewin',
        selector: 'boardpeoplewin',
        autoCreate: true,
        xtype: 'boardpeoplewin'
    }],
    init: function () {
        this.control({
            'boardpeoplewin  button[itemId=save]': {
                click: function (button, e) {
                    var win = button.up('window');
                    var panel = win.parent;
                    if (win.down('panel').isValid()) {
                        var data = win.down('panel').getValues();
                        Ext.apply(data, { voyageId: win.voyageId });
                        Ext.Ajax.request({
                            url: Soims.service.applications.BoardingUserService + '/Save',
                            method: 'POST',
                            scope: this, // 注意scope是必须的
                            params: data,
                            success: function (response) {
                                win.close();
                                panel.getStore().reload();
                                panel.getSelectionModel().deselectAll();
                            }
                        });
                    }
                }
            },
            'boardpeoplewin  button[itemId=cancel]': {
                click: function (button, e) {
                    button.up('window').close();
                }
            }
        });
    },
    show: function (id, parent) {
        var winFun = this.getVoyageBoardPeopleWinView();
        var win = Ext.create(winFun, { voyageId: id, parent: parent });
        return win.show();
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    }
});