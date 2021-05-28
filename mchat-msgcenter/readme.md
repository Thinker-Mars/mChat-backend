## <center>**mChat消息中心**</center>

* <a href="#职能">职能</a>
* <a href="#接口">接口</a>
## <a name="职能">职能</a>
	此服务负责mChat消息的推送，比如：离线消息发送，消息是否被成功消费由此服务负责。
## <a name="接口">接口</a>
* 发送消息
  |内容|说明|备注|
	|:-|:-|:-|
	|路由|/msgCenter/send|POST|
	|相关参数|queue: 指定队列名称, msg：消息内容|
	|响应|{code: 10000, msg: "", data: ""}|
	<br>
* 拉取消息
  |内容|说明|备注|
	|:-|:-|:-|
	|路由|/msgCenter/pull|GET|
	|相关参数|queue: 指定队列名称|
	|响应|{code: 10000, msg: "", data: []}|
	<br>
  
