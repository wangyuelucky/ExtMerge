Ext.define("Soims.view.application.ApplicationHistoryPanel", {
    itemId: 'applicationApplicationHistoryPanel',
    extend: 'Ext.form.Panel',
    alias: 'widget.applicationhistorypanel',
    title: '申请历史流程',
    padding: 2,
    bodyStyle: 'background-color:#dfe8f5;',
    height: 115,
    autoShow: true,
    bodyPadding: '15 0 0 0',
    initComponent: function () {
        this.items = {
            xtype: 'label'
        };
        this.on('afterrender', this.showDefaultHistoryState);
        this.callParent();
    },

    refresh: function (response, applicationType) {
        switch (applicationType) {
            case Soims.model.application.common.SampleApplicationType.B1.value:
                this.showB1(response);
                break;
            case Soims.model.application.common.SampleApplicationType.B2.value:
                this.showB2(response);
                break;
            case Soims.model.application.common.SampleApplicationType.V1.value:
                this.showV1(response);
                break;
            case Soims.model.application.common.SampleApplicationType.V2.value:
                this.showV2(response);
                break;
            case Soims.model.application.common.SampleApplicationType.V3.value:
                this.showV3(response);
                break;
            case Soims.model.application.common.SampleApplicationType.V4.value:
                this.showV4(response);
                break;
        }
    },
    showB1: function (response) {

        var VODCSubmitUrl = response.VODCSubmit == undefined ? "Application/common/resources/images/appState/a_0.png" : response.VODCSubmit.url;
        var VODCSubmitTip = response.VODCSubmit == undefined ? "" : response.VODCSubmit.tip;

        var VLSubmitUrl = (response.VSSubmit == undefined && response.LSSubmit == undefined) ? "Application/common/resources/images/appState/a_0.png"
                            : (response.VSSubmit == undefined ? response.LSSubmit.url : response.VSSubmit.url);
        var VLSubmitTip = (response.VSSubmit == undefined && response.LSSubmit == undefined) ? ""
                            : (response.VSSubmit == undefined ? response.LSSubmit.tip : response.VSSubmit.tip);

        var middleHtml = '<div style="text-align:center; width: 80px; float:left;">' +
        '<img title="' + VODCSubmitTip + '" src="' + VODCSubmitUrl + '" height="24" width="24"><br>航次组织实施单位审核</div>';

        middleHtml = middleHtml + '<div style="text-align:center; width: 10px; float:left;">' +
        '<img src="Application/common/resources/images/appState/lianjie.png"></img></div>';

        middleHtml = middleHtml + '<div style="text-align:center; width: 80px; float:left;">' +
        '<img title="' + VLSubmitTip + '" src="' + VLSubmitUrl + '" height="24" width="24"><br>航次/航段首席科学家审核</div>';

        middleHtml = middleHtml + '<div style="text-align:center; width: 10px; float:left;">' +
        '<img src="Application/common/resources/images/appState/lianjie.png"></img></div>';

        var html = this.showBeginHtml(response) + middleHtml + this.showEndHtml(response);
        this.down('label').setText(html, false);

    },
    showB2: function (response) {

        var PCSubmitUrl = response.PCSubmit == undefined ? "Application/common/resources/images/appState/a_0.png" : response.PCSubmit.url;
        var PCSubmitTip = response.PCSubmit == undefined ? "" : response.PCSubmit.tip;

        var VLSubmitUrl = (response.VSSubmit == undefined && response.LSSubmit == undefined) ? "Application/common/resources/images/appState/a_0.png"
                            : (response.VSSubmit == undefined ? response.LSSubmit.url : response.VSSubmit.url);
        var VLSubmitTip = (response.VSSubmit == undefined && response.LSSubmit == undefined) ? ""
                            : (response.VSSubmit == undefined ? response.LSSubmit.tip : response.VSSubmit.tip);

        var middleHtml = '<div style="text-align:center; width: 80px; float:left;">' +
        '<img title="' + PCSubmitTip + '" src="' + PCSubmitUrl + '" height="24" width="24"><br>项目负责人审核</div>';

        middleHtml = middleHtml + '<div style="text-align:center; width: 10px; float:left;">' +
        '<img src="Application/common/resources/images/appState/lianjie.png"></img></div>';

        middleHtml = middleHtml + '<div style="text-align:center; width: 80px; float:left;">' +
        '<img title="' + VLSubmitTip + '" src="' + VLSubmitUrl + '" height="24" width="24"><br>航次/航段首席科学家审核</div>';

        middleHtml = middleHtml + '<div style="text-align:center; width: 10px; float:left;">' +
        '<img src="Application/common/resources/images/appState/lianjie.png"></img></div>';

        var html = this.showBeginHtml(response) + middleHtml + this.showEndHtml(response);
        this.down('label').setText(html, false);
    },
    showV1: function (response) {

        var VRCSubmitUrl = response.VRCSubmit == undefined ? "Application/common/resources/images/appState/a_0.png" : response.VRCSubmit.url;
        var VRCSubmitTip = response.VRCSubmit == undefined ? "" : response.VRCSubmit.tip;

        var middleHtml = '<div style="text-align:center; width: 80px; float:left;">' +
        '<img title="' + VRCSubmitTip + '" src="' + VRCSubmitUrl + '" height="24" width="24"><br>任务牵头负责人审核</div>';

        middleHtml = middleHtml + '<div style="text-align:center; width: 10px; float:left;">' +
        '<img src="Application/common/resources/images/appState/lianjie.png"></img></div>';

        var html = this.showBeginHtml(response) + middleHtml + this.showEndHtml(response);
        this.down('label').setText(html, false);
    },
    showV2: function (response) {

        var PCSubmitUrl = response.PCSubmit == undefined ? "Application/common/resources/images/appState/a_0.png" : response.PCSubmit.url;
        var PCSubmitTip = response.PCSubmit == undefined ? "" : response.PCSubmit.tip;

        var middleHtml = '<div style="text-align:center; width: 80px; float:left;">' +
        '<img title="' + PCSubmitTip + '" src="' + PCSubmitUrl + '" height="24" width="24"><br>项目负责人审核</div>';

        middleHtml = middleHtml + '<div style="text-align:center; width: 10px; float:left;">' +
        '<img src="Application/common/resources/images/appState/lianjie.png"></img></div>';

        var html = this.showBeginHtml(response) + middleHtml + this.showEndHtml(response);
        this.down('label').setText(html, false);
    },
    showV3: function (response) {
        var html = this.showBeginHtml(response) + this.showEndHtml(response);
        this.down('label').setText(html, false);
    },
    showV4: function (response) {
        console.log(response);
        var html = this.showBeginHtml(response) + this.showEndHtml(response);
        this.down('label').setText(html, false);
    },
    showBeginHtml: function (response) {

        var unSubmitImageUrl = response.UnSubmit == undefined ? "Application/common/resources/images/appState/a_1.png" : response.UnSubmit.url;
        var unSubmitImageTip = response.UnSubmit == undefined ? "" : response.UnSubmit.tip;

        var SubmitImageUrl = response.Submit == undefined ? "Application/common/resources/images/appState/a_2.png" : response.Submit.url;
        var SubmitImageTip = response.Submit == undefined ? "" : response.Submit.tip;

        var htmlBegin = '<div style="text-align:center; width: 80px; float:left;">' +
        '<img title="' + unSubmitImageTip + '" src="' + unSubmitImageUrl + '" height="24" width="24"><br>新建申请</div>';

        htmlBegin = htmlBegin + '<div style="text-align:center; width: 10px; float:left;">' +
        '<img src="Application/common/resources/images/appState/lianjie.png"></img></div>';

        htmlBegin = htmlBegin + '<div style="text-align:center; width: 80px; float:left;">' +
        '<img title="' + SubmitImageTip + '" src="' + SubmitImageUrl + '" height="24" width="24"><br>提交</div>';

        htmlBegin = htmlBegin + '<div style="text-align:center; width: 10px; float:left;">' +
        '<img src="Application/common/resources/images/appState/lianjie.png"></img></div>';

        return htmlBegin;
    },
    showEndHtml: function (response) {

        var auditUrl = response.AdminAccept == undefined ? 'Application/common/resources/images/appState/a_3.png' : response.AdminAccept.url;
        var auditTip = response.AdminAccept == undefined ? '' : response.AdminAccept.tip;

        var allotUrl = response.AdminAllot == undefined ? 'Application/common/resources/images/appState/a_4.png' : response.AdminAllot.url;
        var allotTip = response.AdminAllot == undefined ? '' : response.AdminAllot.tip;

        var discussUrl = response.SMESubmit == undefined ? 'Application/common/resources/images/appState/a_5.png' : response.SMESubmit.url;
        var discussTip = response.SMESubmit == undefined ? '' : response.SMESubmit.tip;

        var approUrl = response.OISubmit == undefined ? 'Application/common/resources/images/appState/a_6.png' : response.OISubmit.url;
        var approTip = response.OISubmit == undefined ? '' : response.OISubmit.tip;

        var approUrl = response.OISubmit == undefined ? 'Application/common/resources/images/appState/a_6.png' : response.OISubmit.url;
        var approTip = response.OISubmit == undefined ? '' : response.OISubmit.tip;

        var htmlEnd = '<div style="text-align:center; width: 80px; float:left;">' +
        '<img title="' + auditTip + '" src="' + auditUrl + '" height="24" width="24"><br>申请受理</div>';

        htmlEnd = htmlEnd + '<div style="text-align:center; width: 10px; float:left;">' +
        '<img src="Application/common/resources/images/appState/lianjie.png"></img></div>';

        htmlEnd = htmlEnd + '<div style="text-align:center; width: 80px; float:left;">' +
        '<img title="' + allotTip + '" src="' + allotUrl + '" height="24" width="24"><br>分配方案编制</div>';

        htmlEnd = htmlEnd + '<div style="text-align:center; width: 10px; float:left;">' +
        '<img src="Application/common/resources/images/appState/lianjie.png"></img></div>';

        htmlEnd = htmlEnd + '<div style="text-align:center; width: 80px; float:left;">' +
        '<img title="' + discussTip + '" src="' + discussUrl + '" height="24" width="24"><br>申请审议</div>';

        htmlEnd = htmlEnd + '<div style="text-align:center; width: 10px; float:left;">' +
        '<img src="Application/common/resources/images/appState/lianjie.png"></img></div>';

        htmlEnd = htmlEnd + '<div style="text-align:center; width: 80px; float:left;">' +
        '<img title="' + approTip + '" src="' + approUrl + '" height="24" width="24"><br>申请审批</div>';

        htmlEnd = htmlEnd + '<div style="text-align:center; width: 10px; float:left;">' +
        '<img src="Application/common/resources/images/appState/lianjie.png"></img></div>';

        htmlEnd = htmlEnd + '<div style="text-align:center; width: 80px; float:left;">' +
        '<img title="" src= "Application/common/resources/images/appState/a_7.png" " height="24" width="24"><br>样品清点与出库</div>';

        return htmlEnd;

    },

    showDefaultHistoryState: function () {
        var response = {};

        var middleHtml = '<div style="text-align:center; width: 80px; float:left;">' +
        '<img title="" src="Application/common/resources/images/appState/a_0.png" height="24" width="24"><br>申请审核</div>';

        middleHtml = middleHtml + '<div style="text-align:center; width: 10px; float:left;">' +
        '<img src="Application/common/resources/images/appState/lianjie.png"></img></div>';

        var html = this.showBeginHtml(response) + middleHtml + this.showEndHtml(response);
        this.down('label').setText(html, false);
    }
});