Ext.define("Soims.view.applicationDiscussion.OneDiscussion", {
    extend: 'Ext.form.Panel',
    alias: 'widget.onediscussion',
    bodyStyle: 'background-color: #dfe8f5;',
    padding: '10 5 0 5',
    border: false,
    height: 110,
    initComponent: function () {
        this.items = [{
            xtype: 'label',
            padding: '5 5 5 5',
            height: 20,
            style: 'font-weight:bold;color:#FF0000',
            text: this.rec.get('memberName')
        }, {
            xtype: 'label',
            padding: '5 5 5 5',
            height: 20,
            text: '于时间'
        }, {
            xtype: 'label',
            padding: '0 5 0 5',
            style: 'font-weight:bold;',
            height: 20,
            text: this.rec.get('operateTime').getFullYear() + '年' + (this.rec.get('operateTime').getMonth() + 1) + '月' + this.rec.get('operateTime').getDate() + '日'
        }, {
            xtype: 'label',
            padding: '5 5 5 5',
            height: 20,
            text: '说：'
        }, {
            xtype: 'textareafield',
            height: 60,
            padding: '5 5 5 5',
            anchor: '100%',
            //fieldLabel: this.rec.get('memberName'),
            //disabled: true,
            readOnly: true,
            grow: true,
            value: this.rec.get('content')
        }];

        this.callParent();
    }
});