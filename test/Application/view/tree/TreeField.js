Ext.define("Soims.view.tree.TreeField", {
    extend: 'Ext.Panel',
    alias: 'widget.treeField',
    layout: 'column',
    border: false,
    bodyStyle: 'background-color: #dfe8f5;',
    initComponent: function () {
        this.items = [{
            xtype: 'textfield',
            allowBlank: false,
            readOnly: true,
            name: this.fieldName,
            width: this.fieldWidth,
            fieldLabel: this.fieldLabel
        }, {
            xtype: 'button',
            itemId: this.buttonItemId,
            text: '...'
        }];
        this.value = [];
        this.callParent();
    },
    setValue: function (value) {
        this.value = value;
    },
    getValue: function () {
        return this.value;
    }
});