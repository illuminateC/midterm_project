**chat/list接口：**

- 传入userId和groupId
- 如果groupId为0，则返回**userId所在的多人群聊聊天室**列表
- 如果groupId不为0，则返回**groupId对应的团队聊天室**和**userId与团队中每个成员的聊天室**列表

**创建多人群聊：**

- userId、teamId、groupName
- ![](https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg)

**邀请：**

- userId、teamId、invite

**team/list接口：**

- 传入userId和team_id（多人群聊时为ID和0）







- groupMembers：团队内的成员
- groupMembersForAdmin：团队内包含
