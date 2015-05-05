Ext.define("Soims.view.applicationDiscussion.MyAndAllDiscussion", {
    extend: 'Ext.form.Panel',
    alias: 'widget.myandalldiscussion',
    //requires: ['Soims.view.applicationDiscussion.DiscussionForm'],
    title: '专家委员会讨论平台',
    initComponent: function () {
        this.items = [{
            xtype: 'discussionform',
            applicationID: this.applicationID
        }, {
            xtype: 'textareafield',
            height: 60,
            //allowBlank: false,
            padding: '10 10 10 10',
            hidden: this.isShow || !this.isDiscussion,
            anchor: '100%',
            itemId: 'textareafieldpublishvalue',
            grow: true
        }];
        this.buttons = [{
            text: '发表评议意见',
            xtype: 'button',
            hidden: this.isShow || !this.isDiscussion,
            handler: this.publish,
            itemId: 'review'
        }];
        this.callParent();
    },
    publish: function (button) {
        var text = button.up('panel').down('#textareafieldpublishvalue');
        var value = text.getValue();
        if (value) {
            var form = button.up('panel').down('discussionform');
            var rec = Ext.create('Soims.model.applicationDiscussion.Discussion');
            var applicationID = button.up('panel').applicationID;
            var line = '<hr align="left" style="margin-left:10px" width="900"></hr>';

            text.setValue('');
            Ext.Ajax.request({
                url: Soims.service.discussion.DistributionDiscussionService + '/publish',
                params: { applicationID: applicationID, value: value },
                scope: this,
                success: function (response) {
                    if (response.responseText) {
                        var result = response.responseText.split('|');
                        rec.set('memberName', result[0]);
                        rec.set('operateTime', result[1]);
                        rec.set('content', value);
                        var item = Ext.create('Soims.view.applicationDiscussion.OneDiscussion', { rec: rec });
                        form.add(item);
                        form.scrollBy(99999, 99999, false);
                        //                        //console.log(item.el);
                        //                        if (form.items.getCount() != 0) {
                        //                            //console.log(item);
                        //                            Ext.DomHelper.insertBefore(item.el, line);
                        //                        }
                    } else {
                        Ext.MessageBox.alert('错误', '发表时出错，请重新尝试', function () { }, this);
                    }
                }
            });
        } else {
            Ext.MessageBox.alert('提示', '您不能发表空的审议意见', function () { }, this);
        }
    }
});