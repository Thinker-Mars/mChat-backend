## <center>**mChat用户服务**</center>
***
* <a href="#职能">职能</a>
* <a href="#接口">接口</a>
## <a name="职能">职能</a>
	此服务负责mChat所有用户相关数据的操作，比如：注册用户、用户信息获取/修改等。	
## <a name="接口">接口</a>
* 用户注册
  |内容|说明|备注|
	|:-|:-|:-|
	|路由|/user/register|POST|
	|相关参数|uid: 用户唯一ID, nickName: 用户昵称, pwd: 登录密码|目前先这样处理，后续或有修改|
	|响应|{code: 10000, msg: "", data: ""}|
	|||
	<br>
* 获取用户信息
  |内容|说明|备注|
	|:-|:-|:-|
	|路由|/user/findUser|POST|
	|相关参数|uid: 用户唯一ID, pwd: 用户登录密码|
	|响应|{code: 10000, msg: "", data: {userInfo/Object}}|
	|||
