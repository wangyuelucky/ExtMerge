Ext.define('Soims.controller.voyage.BoardPeople', {
    extend: 'Ext.app.Controller',
    views: ['voyage.BoardPeoplePanel'],
    refs: [{
        ref: 'boardpeoplepanel',
        selector: 'boardpeoplepanel',
        autoCreate: true,
        xtype: 'boardpeoplepanel'
    }],
    init: function () {
        this.control({
            'boardpeoplepanel  button[itemId=add]': {
                click: function (button, e) {
                    this.getCon('voyage.BoardPeopleWin').show(button.up('panel').voyageId, button.up('panel'));
                }
            },
            'boardpeoplepanel  button[itemId=modify]': {
                click: function (button, e) {
                    var panel = button.up('panel');
                    var selectionModel = panel.getSelectionModel();
                    var record = selectionModel.getSelection()[0];

                    var win = this.getCon('voyage.BoardPeopleWin').show(button.up('panel').voyageId, button.up('panel'));
                    win.down('panel').loadRecord(record);
                }
            },
            'boardpeoplepanel  button[itemId=delete]': {
                click: function (button, e) {
                    this.getCon('voyage.BoardPeopleWin').show(button.up('panel').voyageId, button.up('panel'));
                }
            },
            'boardpeoplepanel  button[itemId=boardingPeople]': {
                click: function (button, e) {
                    this.getCon('voyage.DocumentUploadWin').show(button.up('panel').voyageId, button.up('panel'), '/UploadBoardingPeople');
                }
            },
            'boardpeoplepanel  button[itemId=boardingPeopleDepartment]': {
                click: function (button, e) {
                    this.getCon('voyage.DocumentUploadWin').show(button.up('panel').voyageId, button.up('panel'), '/UploadBoardingPeopleDepartment');
                }
            }
        });
    },
    getCon: function (projectPath) {
        var loginApp = this.application;
        return loginApp.getController(projectPath);
    }
});