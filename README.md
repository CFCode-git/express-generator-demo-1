使用 winston 来进行日志处理

通过cookie-session库,使用cookie,session做鉴权.

也可以通过express-session库,给前端传递sessionID,sessionData则存在服务端.**相对来说**更加安全一些,可以将用户的一些敏感信息(比如地址)存在session中.

之前使用的cookie-session库,不适合用来存储敏感信息.一方面是cookie能存储的数据量十分有限,另一方面是将敏感信息存在前端不安全.

使用cookie鉴权,毕竟是浏览器的一个默认行为,因此会有跨域的问题.当然可以通过withCredentials设置解决.
而使用jwt的时候,可以通过将token共享避免跨域问题.
