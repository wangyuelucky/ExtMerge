Ext.define("Soims.model.applicationDiscussion.Discussion", {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'int', mapping: 'DiscussionID' },
    { name: 'memberId', type: 'int', mapping: 'MemberId' },
    { name: 'memberName', type: 'string', mapping: 'MemberName' },
    { name: 'content', type: 'string', mapping: 'Content' },
    { name: 'flag', type: 'boolen', mapping: 'Flag' },
    { name: 'operateTime', type: 'date', mapping: 'OperateTime' }
    ]
});