Ext.define("Soims.view.application.common.SampleBackCountryGridShow", {
    itemId: 'applicationCommonSampleBackCountryGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.samplebackcountrygridshow',
    autoHeight: true,
    requires: 'Soims.model.applicationDiscussion.DiscussType',
    emptyText: '没有满足条件的样品',
    minHeight: 200,
    selType: 'rowmodel',
    plugins: [{
        ptype: 'associationrowexpander',
        pluginId: 'backCountryGridExpander',
        selectRowOnExpand: true,
        rowBodyTpl: new Ext.XTemplate(
            '<tpl for=".">',
               '<p style="margin-left:30px;line-height:20px"><b>样品类型:&nbsp;&nbsp;</b>{data.sampleType}</p>',
               '<p style="margin-left:30px;line-height:20px"><b>所在航段:&nbsp;&nbsp;</b>{data.sampleLeg}</p>',
               '<p style="margin-left:30px;line-height:20px"><b>样品数:&nbsp;&nbsp;</b>{data.sampleNumber}</p>',
               '<p style="margin-left:30px;line-height:20px"><b>样品量:&nbsp;&nbsp;</b>{data.sampleAmount}</p>',
               '<p style="margin-left:30px;line-height:20px"><b>保存条件:&nbsp;&nbsp;</b>{data.preservationCondition}</p>',
               '<p style="margin-left:30px;line-height:20px"><b>拟运出时间:&nbsp;&nbsp;</b>{data.backTime:date("Y/m/d")}</p>',
               '<p style="margin-left:30px;line-height:20px"><b>先行运送回国必要性说明:&nbsp;&nbsp;</b>{data.repatriaionNecessity}</p>',
               '<p style="margin-left:30px;line-height:20px"><b>其他要求:&nbsp;&nbsp;</b>{data.otherNeed}</p><br>',
               '<div id="backCountryList{data.id}" style="padding-left:30px;line-height:20px"><b>审核记录</b></div>',
                '<tpl for="getSampleRepatriationAuditsStore">',
                 '<tpl if="this.colorChange(data.auditerID,data.auditType)">',
                     '<tpl if="this.formatChange(data.auditType)">',
                            '<span style="padding-left:30px;line-height:20px"', 'auditor="{data.auditerID}" auditType="{data.auditType}" repatriationID="{[values.getSampleBackCountry().data.id]}">{[Soims.model.applicationAuditing.AuditType[values.data.auditType].name]}&nbsp;&nbsp;&nbsp;&nbsp;{data.auditerName}&nbsp;&nbsp;&nbsp;&nbsp;{data.createTime:date("Y/m/d")}&nbsp;&nbsp;&nbsp;&nbsp;审核{[Soims.model.applicationAuditing.ContentType[values.data.contentType].name]}</span><br/>',
                     '<tpl else>',
                            '<span style="padding-left:30px;line-height:20px"', 'auditor="{data.auditerID}" auditType="{data.auditType}" repatriationID="{[values.getSampleBackCountry().data.id]}">{[Soims.model.applicationAuditing.AuditType[values.data.auditType].name]}&nbsp;&nbsp;&nbsp;&nbsp;{data.companyName}&nbsp;&nbsp;&nbsp;&nbsp;{data.createTime:date("Y/m/d")}&nbsp;&nbsp;&nbsp;&nbsp;审核{[Soims.model.applicationAuditing.ContentType[values.data.contentType].name]}</span><br/>',
                      '</tpl>',
                 '<tpl else>',
                    '<tpl if="this.formatChange(data.auditType)">',
                            '<span style="padding-left:30px;line-height:20px;color:red"', 'auditor="{data.auditerID}" auditType="{data.auditType}" repatriationID="{[values.getSampleBackCountry().data.id]}">{[Soims.model.applicationAuditing.AuditType[values.data.auditType].name]}&nbsp;&nbsp;&nbsp;&nbsp;{data.auditerName}&nbsp;&nbsp;&nbsp;&nbsp;{data.createTime:date("Y/m/d")}&nbsp;&nbsp;&nbsp;&nbsp;审核{[Soims.model.applicationAuditing.ContentType[values.data.contentType].name]}</span><br/>',
                     '<tpl else>',
                            '<span style="padding-left:30px;line-height:20px;color:red"', 'auditor="{data.auditerID}" auditType="{data.auditType}" repatriationID="{[values.getSampleBackCountry().data.id]}">{[Soims.model.applicationAuditing.AuditType[values.data.auditType].name]}&nbsp;&nbsp;&nbsp;&nbsp;{data.companyName}&nbsp;&nbsp;&nbsp;&nbsp;{data.createTime:date("Y/m/d")}&nbsp;&nbsp;&nbsp;&nbsp;审核{[Soims.model.applicationAuditing.ContentType[values.data.contentType].name]}</span><br/>',
                      '</tpl>',
                 '</tpl>',
                '</tpl>',
                '<hr align="left" style="margin-left:30px" width="700"></hr>',
                '<tpl if="this.AuditButtonShow()">',
                '<p style="text-align: center;"><button  id="repatriationagree{data.id}">同意</button>   <button  id="repatriationunagree{data.id}">拟同意</button>   <button  id="repatriationdisagree{data.id}">不同意</button></p>',
                '</tpl>',
                '<p>&nbsp;</p>',
                '<tpl if="this.DiscussionsShow()">',
                    '<div id="backCountryDiscussionList{data.id}" style="padding-left:30px;line-height:20px"><b>审议记录</b></div>',
                    '<tpl for="SampleRepatriationDiscussionsStore">',
                        '<tpl if="this.colorChange(data.auditerID)">',
                            '<span style="padding-left:50px;line-height:20px"  auditor="{data.auditerID}" auditType="{data.discussType}" repatriationID="{[values.getSampleBackCountry().data.id]}">', '<tpl if="data.discussType == \'SmeDiscuss\'">', '专家委员会委员审议', '<tpl else>', '专家委员会主任审议', '</tpl>', '&nbsp;&nbsp;&nbsp;&nbsp;{data.companyName}&nbsp;&nbsp;&nbsp;&nbsp;{data.createTime:date("Y/m/d")}&nbsp;&nbsp;&nbsp;&nbsp;审议{[Soims.model.applicationAuditing.ContentType[values.data.contentType].name]}</span><br/>',
                        '<tpl else>',
                            '<span style="padding-left:50px;line-height:20px;color:red"  auditor="{data.auditerID}" auditType="{data.discussType}" repatriationID="{[values.getSampleBackCountry().data.id]}">', '<tpl if="data.discussType == \'SmeDiscuss\'">', '专家委员会委员审议', '<tpl else>', '专家委员会主任审议', '</tpl>', '&nbsp;&nbsp;&nbsp;&nbsp;{data.companyName}&nbsp;&nbsp;&nbsp;&nbsp;{data.createTime:date("Y/m/d")}&nbsp;&nbsp;&nbsp;&nbsp;审议{[Soims.model.applicationAuditing.ContentType[values.data.contentType].name]}</span><br/>',
                        '</tpl>',
                    '</tpl>',
                    '<hr align="left" style="margin-left:30px" width="700"></hr>',
                    '<tpl if="this.DiscussionButtonsShow()">',
                        '<p style="text-align: center;"><button  id="dicussionagree{data.id}">同意</button>   <button  id="dicussionunagree{data.id}">拟同意</button>   <button  id="dicussiondisagree{data.id}">不同意</button></p>',
                    '</tpl>',
                    '<p>&nbsp;</p>',
                '</tpl>',
            '</tpl>',
            {
                colorChange: function (id, type) {
                    var userid = Soims.currentUser.id;
                    var auditType = Soims.model.applicationAuditing.AuditType.getAuditTypeByUserRole(Soims.currentUser.currentRoleCode);
                    if (id == userid && type == auditType.value) {
                        return false;
                    }
                    return true;
                },
                formatChange: function (type) {
                    var voyageCharger = Soims.model.applicationAuditing.AuditType.VoyageChargerAudit.value;
                    var legCharger = Soims.model.applicationAuditing.AuditType.LegChargerAudit.value;
                    if (type == voyageCharger || type == legCharger) {
                        return true;
                    }
                    return false;
                },
                AuditButtonShow: function () {
                    if (this.tplParam == Soims.model.application.SamplePanelType.AuditEdit.value) return true;
                    else return false;
                },
                DiscussionsShow: function () {
                    if (this.tplParam == Soims.model.application.SamplePanelType.AuditShow.value ||
                    this.tplParam == Soims.model.application.SamplePanelType.AuditEdit.value)
                        return false;
                    else return true;
                },
                DiscussionButtonsShow: function () {
                    if (this.tplParam == Soims.model.application.SamplePanelType.DiscussionIndoorEdit.value ||
                    this.tplParam == Soims.model.application.SamplePanelType.DiscussionOutEdit.value)
                        return true;
                    else return false;
                }
            }
        )
    }],
    initComponent: function () {
        this.getPlugin('backCountryGridExpander').setXTemplateParams(this.panelType);
        var me = this;
        this.store = Ext.create('Soims.store.application.common.SampleBackCountry');
        if (this.applicationID != undefined) {
            this.store.getProxy().setExtraParam('applicationID', this.applicationID);
            this.store.load(function () {
                var expander = me.getPlugin('backCountryGridExpander');
                for (var i = 0; i < me.store.getCount(); i++) {
                    expander.toggleRow(i, me.store.getAt(i));
                }
            });
        }
        this.title = this.isAudit ? '<span>提前样品运送回国列表</span><span style="font-size:12px;color:#FF0000">[请逐条样品进行审核]</span>' : '提前样品运送回国列表';

        var sampleTypeStore = Ext.create('Soims.store.application.common.SampleType');
        this.columns = [
            { xtype: 'rownumberer' },
            {
                header: '样品类型',
                dataIndex: 'sampleType',
                flex: 1,
                allowBlank: false
            }, {
                header: '所在航段',
                dataIndex: 'sampleLeg',
                flex: 1
            }, {
                header: '样品数',
                dataIndex: 'sampleNumber',
                flex: 1
            }, {
                header: '样品量',
                dataIndex: 'sampleAmount',
                flex: 1
            }, {
                header: '保存条件',
                dataIndex: 'preservationCondition',
                flex: 1
            }, {
                header: '拟运出时间',
                dataIndex: 'backTime',
                flex: 1,
                xtype: 'datecolumn',
                format: 'Y-m-d'
            }, {
                header: '其他要求',
                dataIndex: 'otherNeed',
                flex: 1
            }];

        this.on('selectionchange', this.selectChange);
        this.callParent();
    },
    expendSampleType: function () {
        var applicationID = this.up('samplebackcountry').applicationID;
        var store = this.down('#sampleType').getStore();
        store.getProxy().setExtraParam('applicationID', applicationID);
        store.load();
    },
    selectChange: function (selModel, records) {
        var agree = Ext.get('repatriationagree' + records[0].get('id'));
        var unagree = Ext.get('repatriationunagree' + records[0].get('id'));
        var disagree = Ext.get('repatriationdisagree' + records[0].get('id'));

        var dicussAgree = Ext.get('dicussionagree' + records[0].get('id'));
        var dicussUnagree = Ext.get('dicussionunagree' + records[0].get('id'));
        var dicussDisagree = Ext.get('dicussiondisagree' + records[0].get('id'));

        var self = this;

        if (agree != undefined) {
            agree.on('click', function () {
                self.onAuditClick(records[0], Soims.model.applicationAuditing.ContentType.Agree, records[0].get('id'));
            });
            unagree.on('click', function () {
                self.onAuditClick(records[0], Soims.model.applicationAuditing.ContentType.Doubt, records[0].get('id'));
            });
            disagree.on('click', function () {
                self.onAuditClick(records[0], Soims.model.applicationAuditing.ContentType.Reject, records[0].get('id'));
            });
        }
        if (dicussAgree != undefined) {
            dicussAgree.on('click', function () {
                self.onDiscussClick(records[0], Soims.model.applicationAuditing.ContentType.Agree, records[0].get('id'));
            });
            dicussUnagree.on('click', function () {
                self.onDiscussClick(records[0], Soims.model.applicationAuditing.ContentType.Doubt, records[0].get('id'));
            });
            dicussDisagree.on('click', function () {
                self.onDiscussClick(records[0], Soims.model.applicationAuditing.ContentType.Reject, records[0].get('id'));
            });
        }
    },
    onAuditClick: function (record, type, sampleID) {
        var auditType = Soims.model.applicationAuditing.AuditType.getAuditTypeByUserRole(Soims.currentUser.currentRoleCode);
        var repatriationID = record.get('id');
        Ext.Ajax.request({
            url: Soims.service.ApplicationAuditings.SampleRepatriationAuditService + '/Auditing',
            params: { ContentType: type.value, AuditType: auditType.value, RepatriationID: repatriationID },
            scope: this,
            success: function () {
                Ext.Tools.Msg('审核完成', 0);
                this.rowBodyChange(type, sampleID);
            }
        });
    },
    onDiscussClick: function (record, type, repatriationID) {
        var discussType = Soims.model.applicationDiscussion.DiscussType.getDiscussTypeByUserRole(Soims.currentUser.currentRoleCode);
        Ext.Ajax.request({
            url: Soims.service.discussion.SampleRepatriationDiscussionService + '/Discussing',
            params: { ContentType: type.value, DiscussType: discussType.value, RepatriationID: repatriationID },
            scope: this,
            success: function () {
                Ext.Tools.Msg('审议完成', 0);
                this.discussRowBodyChange(type, repatriationID);
            }
        });
    },
    rowBodyChange: function (type, sampleID) {
        var self = this;
        var element = self.getView().el;
        var userid = Soims.currentUser.id;
        var auditType = Soims.model.applicationAuditing.AuditType.getAuditTypeByUserRole(Soims.currentUser.currentRoleCode);
        var querystr = "span[auditor='" + userid + "'][auditType=" + auditType.value + "][repatriationID=" + sampleID + "]";
        var span = Ext.query(querystr);
        var info = this.getAuditInfo();
        if (span[0] == undefined) {
            var date = new Date();
            var list = Ext.get('backCountryList' + sampleID);
            var domstr = "<span style='padding-left:30px;line-height:20px;color:red' auditor='" + userid + "' auditType='" + auditType.value + "' repatriationID='" + sampleID + "'>" + info + "&nbsp;&nbsp;&nbsp;&nbsp;" + date.toLocaleDateString() + "&nbsp;&nbsp;&nbsp;&nbsp;审核" + type.name + "</span><br/>";
            Ext.DomHelper.insertAfter(list, domstr);
        }
        else {
            var date = new Date();
            var spanel = Ext.get(span[0]);
            var textstr = info + "&nbsp;&nbsp;&nbsp;&nbsp;" + date.toLocaleDateString() + "&nbsp;&nbsp;&nbsp;&nbsp;审核" + type.name;
            Ext.DomHelper.overwrite(spanel, textstr);
            Ext.DomHelper.applyStyles(spanel, "color:red;");
        }
        self.getView().refreshSize();
    },
    getAuditInfo: function () {
        var roleCode = Soims.currentUser.currentRoleCode,
            info = Soims.model.applicationAuditing.AuditType.getAuditTypeByUserRole(Soims.currentUser.currentRoleCode).name + '&nbsp;&nbsp;&nbsp;&nbsp;';
        if (roleCode == 'VS' || roleCode == 'LS') {
            info += Soims.currentUser.name;
        } else {
            info += Soims.currentUser.department;
        }
        return info;
    },
    discussRowBodyChange: function (type, repatriationID) {
        var self = this;
        var element = self.getView().el;
        var userid = Soims.currentUser.id;
        var auditType = Soims.model.applicationDiscussion.DiscussType.getDiscussTypeByUserRole(Soims.currentUser.currentRoleCode);
        var querystr = "span[auditor='" + userid + "'][auditType=" + auditType.value + "][repatriationID=" + repatriationID + "]";
        var span = Ext.query(querystr);
        if (span[0] == undefined) {
            var date = new Date();
            var list = Ext.get('backCountryDiscussionList' + repatriationID);
            var domstr = "<span style='padding-left:50px;line-height:20px;color:red' auditor='" + userid + "' auditType='"+auditType.value+"' repatriationID='" + repatriationID + "'>" + auditType.name + "&nbsp;&nbsp;&nbsp;&nbsp;" + Soims.currentUser.department + "&nbsp;&nbsp;&nbsp;&nbsp;" + date.toLocaleDateString() + "&nbsp;&nbsp;&nbsp;&nbsp;审议" + type.name + "</span><br/>";
            Ext.DomHelper.insertAfter(list, domstr);
        }
        else {
            var date = new Date();
            var spanel = Ext.get(span[0]);
            var textstr = auditType.name + "&nbsp;&nbsp;&nbsp;&nbsp;" + Soims.currentUser.department + "&nbsp;&nbsp;&nbsp;&nbsp;" + date.toLocaleDateString() + "&nbsp;&nbsp;&nbsp;&nbsp;审议" + type.name;
            Ext.DomHelper.overwrite(spanel, textstr);
            Ext.DomHelper.applyStyles(spanel, "color:red;");
        }
        self.getView().refreshSize();
    }
});