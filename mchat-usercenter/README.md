## <center>**mChat用户服务**</center>

* <a href="#职能">职能</a>
* <a href="#接口">接口</a>
## <a name="职能">职能</a>
	此服务负责mChat所有用户相关数据的操作，比如：注册用户、用户信息获取等。	
## <a name="接口">接口</a>
* 用户注册
  |内容|说明|备注|
	|:-|:-|:-|
	|路由|/userCenter/register|POST|
	|相关参数|NickName: 昵称, Password: 密码（加密后的）, Gender: 性别，PublicKey：加密用的公钥|
	|响应|{code: 10000, msg: "", data: { Uid：10000 }}|
	<br>
* 登录
  |内容|说明|备注|
	|:-|:-|:-|
	|路由|/userCenter/login|POST|
	|相关参数|Uid: 用户ID, Password: 密码（加密后的）, PublicKey：加密用的公钥|
	|响应|{code: 10000, msg: "", data: { 用户信息 }}|
	<br>
* 获取用户信息
  |内容|说明|备注|
	|:-|:-|:-|
	|路由|/userCenter/getFriendList|POST|
	|相关参数|uid: 用户ID|
	|响应|{code: 10000, msg: "", data: { friendList: [] }}|
	<br>
* 查询用户
  |内容|说明|备注|
	|:-|:-|:-|
	|路由|/userCenter/getUser|GET|
	|相关参数|Uid: 登录用户ID, Keyword: 关键字|
	|响应|{code: 10000, msg: "", data: { matchUser: [] }}|
	<br>
* 添加好友
  |内容|说明|备注|
	|:-|:-|:-|
	|路由|/userCenter/addFriend|POST|
	|相关参数|Uid: 登录用户ID, Keyword: 关键字|
	|响应|{code: 10000, msg: "", data: ""}|
	<br>
* 获取公钥
  |内容|说明|备注|
	|:-|:-|:-|
	|路由|/userCenter/getPublicKey|GET|
	|相关参数||
	|响应|{code: 10000, msg: "", data: { publicKey: ""}}|
	<br>
* 获取COS临时秘钥
  |内容|说明|备注|
	|:-|:-|:-|
	|路由|/userCenter/getTmpCredential|GET|
	|相关参数||
	|响应|{code: 10000, msg: "", data: { 临时秘钥 }}|

