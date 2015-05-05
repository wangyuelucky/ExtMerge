Ext.define("Soims.view.application.new.B2Tab", {
    extend: 'Ext.tab.Panel',
    alias: 'widget.b2Tab',
    title: '大洋课题申请',
    closable: true,
    iconCls: 'Project',
    requires: ['Soims.view.application.new.B2BasicInfo', 'Soims.view.application.common.SampleInfo', 'Soims.view.application.common.SampleSiteUse', 'Soims.view.application.common.SampleBackCountry', 'Soims.view.application.common.ElectronicDocument'],
    items: [{ xtype: 'b2basicinfo' }, { xtype: 'sampleinfo' }, { xtype: 'samplesiteuse' }, { xtype: 'samplebackcountry' }, { xtype: 'electronicdocument'}],
    initComponent: function () {
        var applicationType = Soims.model.application.common.SampleApplicationType;
        var me = this;
        this.items = [{
            xtype: 'b2basicinfo',
            isEdit: this.isEdit,
            isShow: this.isShow,
            applicationID: this.applicationID
        }, {
            xtype: 'sampleinfo',
            isEdit: this.isEdit,
            isShow: this.isShow,
            type: applicationType.B2.value,
            applicationID: this.applicationID
        }, {
            xtype: 'samplesiteuse',
            isEdit: this.isEdit,
            isShow: this.isShow,
            applicationID: this.applicationID
        }, {
            xtype: 'samplebackcountry',
            isShow: this.isShow,
            isEdit: this.isEdit,
            applicationID: this.applicationID
        }, {
            xtype: 'electronicdocument',
            isEdit: this.isEdit,
            type: applicationType.B2.value,
            isShow: this.isShow,
            applicationID: this.applicationID
        }];
        this.items[0].buttons = [{
            text: '保存',
            xtype: 'button',
            itemId: 'b2Page1Save',
            action: 'b2Page1Save',
            handler: function (button) {
                me.itemSave_0(button, me);
            }
        }, {
            text: '下一步',
            xtype: 'button',
            itemId: 'b2Page1Next',
            action: 'b2Page1Next'
        }];
        this.items[1].buttons = [{
            text: '上一步',
            xtype: 'button',
            itemId: 'b2Page2Later',
            action: 'b2Page2Later'
        }, {
            text: '保存',
            xtype: 'button',
            itemId: 'samplePage2Save',
            action: 'b2Page2Save'
        }, {
            text: '下一步',
            xtype: 'button',
            itemId: 'b2Page2Next',
            action: 'b2Page2Next'
        }];
        this.items[2].buttons = [{
            text: '上一步',
            xtype: 'button',
            itemId: 'b2Page3Later',
            action: 'b2Page3Later'
        }, {
            text: '保存',
            xtype: 'button',
            itemId: 'b2Page3Save',
            action: 'b2Page3Save',
            handler: function (button) {
                me.itemSave_2(button, me);
            }
        }, {
            text: '下一步',
            xtype: 'button',
            itemId: 'b2Page3Next',
            action: 'b2Page3Next'
        }];
        this.items[3].buttons = [{
            text: '上一步',
            xtype: 'button',
            itemId: 'b2Page4Later',
            action: 'b2Page4Later'
        }, {
            text: '保存',
            xtype: 'button',
            itemId: 'b2Page4Save',
            action: 'b2Page4Save',
            handler: function (button) {
                me.itemSave_3(button, me);
            }
        }, {
            text: '下一步',
            xtype: 'button',
            itemId: 'b2Page4Next',
            action: 'b2Page4Next'
        }];
        this.items[4].buttons = [{
            text: '上一步',
            xtype: 'button',
            itemId: 'b2Page5Later',
            action: 'b2Page5Later'
        }, {
            text: '保存',
            xtype: 'button',
            itemId: 'b2Page5Save',
            action: 'b2Page5Save',
            handler: function (button) {
                me.itemSave_4(button, me);
            }
        }, {
            text: '预览',
            xtype: 'button',
            itemId: 'b2Page5Preview',
            action: 'b2Page5Preview'
        }, {
            text: '提交',
            xtype: 'button',
            itemId: 'b2Page5Submit',
            action: 'b2Page5Submit',
            handler: function (button) {
                me.itemSubmit_4(button, me);
            }
        }];
        this.callParent();
    },
    itemSave_0: function (button, me) {
        var b2BasicInfo = button.up('#applicationNewB2BasicInfo');
        var topicID = b2BasicInfo.down('#subject').getValue();
        //         var voyageID = b2BasicInfo.down('#voyage').getValue();

        var params = { topicID: topicID,
            applicationID: this.applicationID
        };
        me.save(params, Soims.service.applications.ApplicationsService + '/SaveB2Application');

    },
    itemSave_2: function (button, me) {
        if (me.validate() == false)
            return;
        var boardingUser = button.up('samplesiteuse');
        var boardingUserGrid = boardingUser.down('#applicationCommonBoardingUserGrid');
        var boardingUserStore = boardingUserGrid.getStore();
        var sampleSiteUseNecessity = boardingUser.down('#sampleSiteUseNecessityTextArea').getValue();
        var id = "";
        var legs = "";
        var params = {};
        boardingUserStore.each(function (record) {
            if (record.get("id") != "") {
                id = id + record.get("id") + ' ';
                legs = legs + record.get("legIDs") + ' ';
            }
        });
        if (id != "") {
            id = id.substr(0, id.length - 1);
        }
        if (legs != "") {
            legs = legs.substr(0, legs.length - 1);
        }
        params = {
            applicationID: boardingUser.applicationID,
            boardingUserID: id,
            legs: legs,
            sampleSiteUseNecessity: sampleSiteUseNecessity
        };
        me.save(params, Soims.service.applications.BoardingUserService + '/SaveBoardingUser', button);
    },
    itemSave_3: function (button, me) {
        if (me.validate() == false)
            return;
        var sampleBackCountry = button.up('samplebackcountry');
        var sampleBackCountryNec = sampleBackCountry.down('#sampleBackCountryNecessityTextArea').getValue();
        var sampleBackCountryStore = sampleBackCountry.down('#applicationCommonSampleBackCountryGrid').getStore();
        var jsonArray = [];
        sampleBackCountryStore.each(function (record) {
            console.log(record.get("sampleID"));
            if (record.get("sampleID") != "" && record.get("sampleID") != undefined) {
                jsonArray.push(Ext.JSON.encode(record.data));
            }
        });
        var params = {
            applicationID: sampleBackCountry.applicationID,
            backCountrySample: '[' + [jsonArray] + ']',
            sampleBackCountryNecessity: sampleBackCountryNec
        };
        //console.log(params);
        me.save(params, Soims.service.applications.SampleBackCountry + '/SaveInfo', button);
    },
    itemSave_4: function (button, me) {
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
        me.save(params, Soims.service.applications.ElectronicDocument + '/Save', button);
    },
    itemSubmit_4: function (button, me) {
        if (me.validate() == false)
            return;
        var params = {
            applicationID: button.up('electronicdocument').applicationID,
            type: Soims.model.application.common.SampleApplicationType.B2.value
        };
        Ext.MessageBox.alert('提示', '申请提交之后信息将无法修改，确认提交？', function (btn) {
            if (btn == 'ok') {
                me.save(params, Soims.service.applications.ApplicationsService + '/Submit');
            }
        }, this);
    },
    save: function (params, url, button) {
        Ext.Ajax.request({
            url: url,
            params: params,
            method: 'POST',
            scope: this,
            success: function (response) {
                var obj = Ext.JSON.decode(response.responseText);
                if ("Result" in obj) {
                    switch (obj.Result) {
                        case 'Success':
                            if (url == Soims.service.applications.ApplicationsService + '/Submit') {
                                Ext.MessageBox.alert('成功', '申请提交成功！', function (btn) {
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
                            //                            if (button != undefined) {
                            //                                var applicationID = button.up('form').applicationID;
                            //                                var store = button.up('form').down('gridpanel').getStore();
                            //                                store.getProxy().setExtraParam('applicationID', this.applicationID);
                            //                                store.load();
                            //                            }
                            Ext.MessageBox.alert('成功', '信息保存成功！', function () { }, this);
                            break;
                        case 'Failure':
                            Ext.MessageBox.alert('失败', '信息保存失败，请核对填写信息。', function () { }, this);
                            break;
                    }
                }


                if ("ApplicationID" in obj) {     //&& "VoyageID" in obj
                    this.applicationID = obj.ApplicationID;
                    var b2BasicInfo = this.down('#applicationNewB2BasicInfo');
                    //                    this.voyageID = b2BasicInfo.down('#voyage').getValue();
                    console.log(this.applicationID);
                    //界面传参
                    this.down('#applicationNewB2BasicInfo').applicationID = this.applicationID;
                    //                    this.down('#applicationNewB2BasicInfo').voyageID = this.voyageID;

                    this.down('#applicationCommonSampleInfo').applicationID = this.applicationID;
                    //                    this.down('#applicationCommonSampleInfo').voyageID = this.voyageID;

                    this.down('samplesiteuse').applicationID = this.applicationID;
                    //                    this.down('samplesiteuse').voyageID = this.voyageID;

                    this.down('samplebackcountry').applicationID = this.applicationID;


                    this.down('electronicdocument').applicationID = this.applicationID;

                }
            }
        });
    },
    validate: function () {
        if (this.applicationID == "" || this.voyageID == "") {
            Ext.MessageBox.alert('失败', '请先保存申请基本信息', function () {
                this.setActiveTab(0);
            });
            return false;
        }
    }
});