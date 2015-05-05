Ext.define("Soims.view.application.new.V2Tab", {
    extend: 'Ext.tab.Panel',
    alias: 'widget.v2Tab',
    title: '大洋课题样品申请',
    closable: true,
    iconCls: 'Project',
    requires: ['Soims.view.application.new.V2BasicInfo', 'Soims.view.application.common.SampleInfo', 'Soims.view.application.common.ElectronicDocument', 'Soims.model.application.common.SampleApplicationType'],
    initComponent: function () {
        var applicationType = Soims.model.application.common.SampleApplicationType;
        this.items = [{
            xtype: 'v2basicinfo',
            isEdit: this.isEdit,
            isShow: this.isShow,
            applicationID: this.applicationID
        }, {
            xtype: 'sampleinfo',
            type: applicationType.V2.value,
            isEdit: this.isEdit,
            isShow: this.isShow,
            applicationID: this.applicationID
        }, {
            xtype: 'electronicdocument',
            isEdit: this.isEdit,
            isShow: this.isShow,
            type: applicationType.V2.value,
            applicationID: this.applicationID
        }];
        var me = this;
        this.items[0].buttons = [{
            text: '保存',
            xtype: 'button',
            itemId: 'v2Page1Save',
            action: 'v2Page1Save',
            handler: function (button) {
                me.itemSave_0(button, me);
            }
        }, {
            text: '下一步',
            xtype: 'button',
            itemId: 'v2Page1Next',
            action: 'v2Page1Next'
        }];
        this.items[1].buttons = [{
            text: '上一步',
            xtype: 'button',
            itemId: 'v2Page2Later',
            action: 'v2Page2Later'
        }, {
            text: '保存',
            xtype: 'button',
            itemId: 'samplePage2Save',
            action: 'v2Page2Save'
        }, {
            text: '下一步',
            xtype: 'button',
            itemId: 'v2Page2Next',
            action: 'v2Page2Next'
        }];

        this.items[2].buttons = [{
            text: '上一步',
            xtype: 'button',
            itemId: 'v2Page5Later',
            action: 'v2Page5Later'
        }, {
            text: '保存',
            xtype: 'button',
            itemId: 'v2Page5Save',
            action: 'v2Page5Save',
            handler: function (button) {
                me.itemSave_2(button, me);
            }
        }, {
            text: '预览',
            xtype: 'button',
            itemId: 'v2Page5Preview',
            action: 'v2Page5Preview'
        }, {
            text: '提交',
            xtype: 'button',
            itemId: 'v2Page5Submit',
            action: 'v2Page5Submit',
            handler: function (button) {
                me.itemSubmit_2(button, me);
            }
        }];
        this.callParent();
    },
    itemSave_2: function (button, me) {
        if (me.validate() == false)
            return;
        var electronicDocumentGrid = button.up('electronicdocument').down('#applicationCommonElectronicDocumentGrid');
        var electronicDocumentGridStore = electronicDocumentGrid.getStore();
        var jsonArray = [];
        electronicDocumentGridStore.each(function (record) {
            console.log(record);
            if (record.get("resourceID") != "") {
                jsonArray.push(Ext.JSON.encode(record.data));
            }
        });
        var params = {
            applicationID: button.up('electronicdocument').applicationID,
            electronicDocument: '[' + [jsonArray] + ']'
        };
        //console.log(params);
        me.save(params, Soims.service.applications.ElectronicDocument + '/Save');
    },
    itemSave_0: function (button, me) {
        var b1BasicInfo = button.up('#applicationNewV2BasicInfo');
        var topicID = b1BasicInfo.down('#subject').getValue();
        var params = { topicID: topicID,
            applicationID: this.applicationID
        };
        me.save(params, Soims.service.applications.ApplicationsService + '/SaveV2Application');
    },
    itemSubmit_2: function (button, me) {
        if (me.validate() == false)
            return;
        var params = {
            applicationID: button.up('electronicdocument').applicationID,
            type: Soims.model.application.common.SampleApplicationType.V2.value
        };
        Ext.MessageBox.alert('提示', '申请提交之后信息将无法修改，确认提交？', function () {
            me.save(params, Soims.service.applications.ApplicationsService + '/Submit');
        }, this);
    },
    save: function (params, url) {
        Ext.Ajax.request({
            url: url,
            params: params,
            method: 'POST',
            scope: this,
            success: function (response) {
                console.log(response.responseText);

                var obj = Ext.JSON.decode(response.responseText);
                if ("Result" in obj) {
                    switch (obj.Result) {
                        case 'Success':
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
                    }
                }

                if ("ApplicationID" in obj) {
                    this.applicationID = obj.ApplicationID;
                    //界面传参
                    this.down('#applicationNewV2BasicInfo').applicationID = this.applicationID;
                    this.down('#applicationCommonSampleInfo').applicationID = this.applicationID;
                    this.down('electronicdocument').applicationID = this.applicationID;
                }
            }
        });
    },
    validate: function () {
        if (this.applicationID == undefined) {
            Ext.MessageBox.alert('失败', '请先保存申请基本信息', function () {
                this.setActiveTab(0);
            }, this);
            return false;
        }
    }
});