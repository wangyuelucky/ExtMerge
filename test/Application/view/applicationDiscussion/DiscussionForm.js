Ext.define("Soims.view.applicationDiscussion.DiscussionForm", {
    extend: 'Ext.form.Panel',
    alias: 'widget.discussionform',
    AutoScroll: true,
    overflowY: 'auto',
    maxHeight: 400,
    bodyStyle: 'background-color: #dfe8f5;',
    //width: 1200,
    requires: ['Soims.view.applicationDiscussion.OneDiscussion'],
    initComponent: function () {
        this.store = Ext.create('Soims.store.applicationDiscussion.Discussion');
        this.store.getProxy().setExtraParam('applicationID', this.applicationID);
        //        var recs = this.recs;
        //        var ites = [];
        //        Ext.Array.each(recs, function (rec) {
        //            var item = {
        //                xtype: 'onediscussion',
        //                rec: rec
        //            };
        //            ites.push(item);
        //        });

        //        this.items = ites;
        this.callParent();
    },
    listeners: {
        afterrender: function (view) {
            //var line = '<hr align="left" style="margin-left:10px" width="900"></hr>';
            view.store.load(function (recs) {
                Ext.Array.each(recs, function (rec) {
                    var item = Ext.create('Soims.view.applicationDiscussion.OneDiscussion', { rec: rec });
                    view.add(item);
                    view.scrollBy(99999, 99999, false);
//                    if (view.items.getCount() != 0) {
//                        //console.log(item);

//                        Ext.DomHelper.insertBefore(item.down('textareafield').el, line);
//                    }
                });
            });
            
        }
    }
});