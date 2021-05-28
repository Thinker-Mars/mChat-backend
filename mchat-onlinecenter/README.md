## <center>**mChat在线服务**</center>

* <a href="#职能">职能</a>
* <a href="#事件">事件</a>
## <a name="职能">职能</a>
	此服务负责mChat在线业务，比如：在线消息推送等，当前在线用户可被此服务覆盖。
## <a name="事件">事件</a>
* 发送消息（服务端监听）
  |名称|说明|备注|
	|:-|:-|:-|
	|sendMsgToUser|发送消息给某个用户|消息类型目前只支持文本信息|
	
	data示例：
	+ 文本消息
	```
	需要字段如下：
	{
		ProducerID: 消息发送者的uid,
		ConsumerID: 消息接收者的uid,
		Msg: 消息内容,
		Timestamp: 消息产生的时间戳
	}
* 初始化用户聊天室（服务端监听）
  |名称|说明|备注|
	|:-|:-|:-|
	|login|用户登陆系统后，使用uid加入自己的"房间"|由于用户登陆后，会被默认分配至一个"房间"，为了方便消息的发送，所以使用这个事件手动加入"房间"，这样就可以通过uid发送消息|

	data示例：
  ```
	需要字段如下：
	{
		uid: 用户的uid,
		[socketId: 这个参数不需要传递，socket创建后就有]
	}
* 接收消息（客户端监听）
	|名称|说明|备注|
	|:-|:-|:-|
	|receiveUserMsg|用户接收消息(客户端监听)|消息类型目前只支持文本信息|
	
	data示例：
	+ 文本消息
	```
	需要字段如下：
	{
		ProducerID: 消息的发送者的uid,
		Msg: 消息内容,
		Timestamp: 消息产生的时间戳
	}
* 好友申请（服务端监听）
	|名称|说明|备注|
	|:-|:-|:-|
	|sendFriendApply|监听好友申请|
	
	data示例：
	```
	需要字段如下：
	{
		ProducerID: 消息的发送者的uid,
		ConsumerID: 消息接收者的uid,
		NickName: 发送者的昵称,
		Avatar: 发送者的头像,
		Greet: 打招呼,
		Gender: 发送者性别,
		Motto: 发送者格言
	}
* 好友申请（客户端监听）
	|名称|说明|备注|
	|:-|:-|:-|
	|receiveFriendApplyMsg|客户端监听好友申请|
	
	data示例：
	```
	需要字段如下：
	{
		ProducerID: 消息的发送者的uid,
		NickName: 发送者的昵称,
		Avatar: 发送者的头像,
		Greet: 打招呼,
		Gender: 发送者性别,
		Motto: 发送者格言
	}
* 好友申请确认（服务端监听）
	|名称|说明|备注|
	|:-|:-|:-|
	|sendFriendConfirm|服务端监听好友申请的确认|
	
	data示例：
	```
	需要字段如下：
	{
		ProducerID: 消息的发送者的uid,
		ConsumerID: 消息接收者的uid,
		NickName: 发送者的昵称,
		Avatar: 发送者的头像,
		Gender: 发送者性别,
		Motto: 发送者格言
	}
* 好友申请确认（客户端监听）
	|名称|说明|备注|
	|:-|:-|:-|
	|sendFriendConfirm|客户端监听好友申请的确认|
	
	data示例：
	```
	需要字段如下：
	{
		ProducerID: 消息的发送者的uid,
		NickName: 发送者的昵称,
		Avatar: 发送者的头像,
		Gender: 发送者性别,
		Motto: 发送者格言
	}