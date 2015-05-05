Ext.define("Soims.view.application.common.AddSampleInfoWindow", {
    extend: 'Ext.window.Window',
    alias: 'widget.addsampleinfowindow',
    bodyStyle: 'padding:0',
    width: 900,
    autoHeight: true,
    deferredRender: false,
    frame: true,
    layout: 'form',
    buttonAlign: 'right',
    iconCls: 'Application',
    resizable: false,
    modal: true,
    requires: ['Soims.view.application.common.SampleInfoGrid', 'Soims.view.application.common.SampleInfoForm'],
    items: [{ xtype: 'sampleinfogrid' }, { xtype: 'sampleinfoform'}],
    initComponent: function () {
        this.items = [{
            xtype: 'sampleinfogrid'
        }, {
            xtype: 'sampleinfoform',
            legID: this.legID,
            sampleTypeID: this.sampleTypeID
        }];
        this.onClose = function () {
            Ext.MessageBox.confirm('确认', '确认要关闭窗口？', function (btn) {
                if (btn == 'yes') {
                    this.un('beforeclose', this.onClose);
                    this.close();
                    this.on('beforeclose', this.onClose);
                }
            }, this);
            return false;
        };
        this.removeCloseListener = function () {
            
        };
        this.on('beforeclose', this.onClose);
        this.callParent();
    }

});