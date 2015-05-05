Ext.define("Soims.view.application.new.V4Tab", {
    extend: 'Ext.tab.Panel',
    alias: 'widget.v4Tab',
    title: '公益事业样品申请',
    closable: true,
    iconCls: 'Project',
    requires: ['Soims.view.application.new.V4BasicInfo', 'Soims.view.application.common.V4Sample', 'Soims.model.application.common.SampleApplicationType'],
    initComponent: function () {
        var me = this;
        var applicationType = Soims.model.application.common.SampleApplicationType;
        this.items = [{
            xtype: 'v4basicinfo',
            isShow: this.isShow,
            isEdit: this.isEdit,
            applicationID: this.applicationID
        }, {
            xtype: 'v4sample',
            type: applicationType.V4.value,
            isShow: this.isShow,
            isEdit: this.isEdit,
            applicationID: this.applicationID
        }];
        this.items[0].buttons = [{
            text: '保存',
            xtype: 'button',
            itemId: 'v4Page1Save',
            action: 'v4Page1Save',
            handler: function (button) {
                me.itemSave_0(button, me);
            }
        }, {
            text: '下一步',
            xtype: 'button',
            itemId: 'v4Page1Next',
            action: 'v4Page1Next'
        }];

        this.items[1].buttons = [{
            text: '上一步',
            xtype: 'button',
            itemId: 'v4Page5Later',
            action: 'v4Page5Later'
        }, {
            text: '保存',
            xtype: 'button',
            itemId: 'v4SampleSave',
            action: 'v4SampleSave'
        }, {
            text: '预览',
            xtype: 'button',
            itemId: 'v4Page5Preview',
            action: 'v4Page5Preview'
        }, {
            text: '提交',
            xtype: 'button',
            itemId: 'v4Page5Submit',
            action: 'v4Page5Submit',
            handler: function (button) {
                me.itemSubmit_2(button, me);
            }
        }];
        this.callParent();
    },
    getCon: function (Path) {
        var loginApp = this.application;
        return loginApp.getController(Path);
    },
    itemSave_0: function (button, me) {
        if (me.saveValidate() == false)
            return;
        var v4BasicInfo = button.up('#applicationNewV4BasicInfo');
        var name = v4BasicInfo.down('#activity').getValue();
        var place = v4BasicInfo.down('#activityPlace').getValue();
        var department = v4BasicInfo.down('#activityDepartment').getValue();
        var params = { id: name,
            place: place,
            department: department,
            applicationID: this.applicationID
        };
        me.save(params, Soims.service.applications.ApplicationsService + '/SaveV4Application');
    },
    itemSubmit_2: function (button, me) {
        if (me.submitValidate() == false)
            return;
        var params = {
            applicationID: button.up('#applicationCommonV4Sample').applicationID,
            type: Soims.model.application.common.SampleApplicationType.V3.value
        };
        Ext.MessageBox.alert('提示', '申请提交之后信息将无法修改，确认提交？', function (btn) {
            if (btn == 'ok') {
                var sampleContr = this.getCon('application.common.V4Sample');
                sampleContr.saveAction(button.up('#applicationCommonV4Sample').applicationID, button.up('#applicationCommonV4Sample'), false);
                me.save(params, Soims.service.applications.ApplicationsService + '/Submit');
            }
        }, this);
    },
    save: function (params, url) {
        Ext.Ajax.request({
            url: url,
            params: params,
            //method: 'POST',
            scope: this,
            success: function (response) {
                var obj = Ext.JSON.decode(response.responseText);
                if ("Result" in obj) {
                    switch (obj.Result) {
                        case 'Success':
                            console.log(response.responseText);
                            if (url == Soims.service.applications.ApplicationsService + '/Submit') {
                                Ext.MessageBox.alert('成功', '申请提交成功！', function () {
                                    this.close();
                                    var app = this.application;
                                    var panel = app.getController('application.ApplicationPanel').getApplicationpanel();
                                    var con = app.getController('mainFrame.Main');
                                    con.addTab(panel);
                                    panel.getStore().reload();
                                    var selection = panel.getSelectionModel();
                                    selection.deselect(selection.getSelection()[0], true);
                                }, this);
                                return;
                            }
                            Ext.MessageBox.alert('成功', '信息保存成功！', function () { }, this);
                            break;
                        case 'Failure':
                            Ext.MessageBox.alert('失败', '信息保存失败，请核对填写信息。', function () { }, this);
                            break;
                        case 'NameExist':
                            Ext.MessageBox.alert('失败', '非大洋课题名称已存在。', function () { }, this);
                            break;
                    }
                }
                console.log(response.responseText);
                if ("ApplicationID" in obj) {
                    this.applicationID = obj.ApplicationID;
                    //界面传参
                    this.down('#applicationNewV4BasicInfo').applicationID = this.applicationID;
                    this.down('#applicationCommonV4Sample').applicationID = this.applicationID;
                }
            }
        });
    },
    submitValidate: function () {
        if (this.applicationID == undefined) {
            Ext.MessageBox.alert('失败', '请先保存申请基本信息', function () {
                this.setActiveTab(0);
            }, this);
            return false;
        }
        
    },
    saveValidate: function () {       
        var result = true;
        result = this.down('v4basicinfopanel').down('combobox[itemId=activity]').isValid() && result;
        result = this.down('v4basicinfopanel').down('textfield[itemId=activityPlace]').isValid() && result;
        result = this.down('v4basicinfopanel').down('textfield[itemId=activityDepartment]').isValid() && result;
        if (!result) {
            Ext.MessageBox.alert('失败', '请将申请基本信息填写完整');
        }
        return result;
    }
});