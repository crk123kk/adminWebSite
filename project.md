# 1、初步构建 admin 项目

    构建路由

    particles.vue3、tsparticles-slim：登录页的粒子效果

    vuex-persistedstate： vuex的持久化

    element-plus：ui 组件库

# 2、初步构建 server 项目

    npm install -g express-generator ：全局安装 express 生成器

    express server ：生成项目

    修改 script 中的命令 ： "start": "node ./bin/www"  =====> "start": "node-dev ./bin/www"

        这里需要注意：要执行 node-dev，首先需要全局安装 node-dev： npm install -g node-dev，之所以用这个指令是为了得到一个自动重启的功能

        其次，当执行该命令之后，程序会启动，并且一直处于待机状态，这表明程序已经启动，直接访问对应的端口就好

    server 构建项目结构

        routes

            路由，用于构建接口（将处理请求放到controllers中，路由接口只作为一个入口）

        controllers

            控制器，用于对数据的加工处理（调用数据层的操作放到services层）

        services

            服务层，用于处理数据（对数据库的操作，将操作数据库的方法放到models层）

            引用创建的数据库模型，进行数据的增删改查具体操作

        models

            数据层，用于操作数据库（对数据库的操作）

3、创建数据库

    安装 mongoDB 数据库

        如果下载mis包，相当于全都弄好了，包括界面操作软件

        现在：下载zip包，打开，在bin目录下执行mongod.exe --dbpath=D:\mongodb\data\db （--dbpath=D:\mongodb\data\db 表示数据库的存储路径）（这个db数据库安装地址是你当前项目的数据库想要存放的地址，是任意的）

            这里需要注意一点，直接打开命令窗口执行mongod没有效果，我试过了，但是创建了db之后，执行mongod --dbpath=D:\mongodb\data\db 就可以了,打开浏览器访问 localhost:27017 就可以看到连接的反馈了，并且db文件夹下也会生成一些文件

            并且需要注意：用powershell的话，执行的指令就是 .\mongod --dp.....(还不行就开启管理员权限)

            mongod --dbpath=D:\code\NodeCode\adminWebSite\db


    创建数据库

        创建 Users 表，新增数据，用于登录验证

        发送请求到服务端，服务端去数据库验证信息，完成链路

# 在前后端做拦截器，用于验证 token 信息

    服务端：添加中间件

        登录成功之后，返回token信息给客户端

        并且再每次请求的时候，都需要验证token信息是否正确，如果正确就放行，否则拦截，并且刷新token信息


    客户端：添加拦截器

        对每个服务添加token信息

# 表单功能

    multer：用于处理表单上传的文件（图片）等数据

# 封装组件

    这里遇到一个奇怪的问题，类似编译错误的问题，找了半天，发现是 <script setup lang='ts'> 中加了 ts的问题！！！！！！

# 路由鉴权

# 新闻模块

    wangEditor

    增删改查

# 产品模块
