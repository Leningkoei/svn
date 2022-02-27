# 课程设计作业

## 基本说明

- 本README使用本项目的在线编辑功能完成(没有预览功能), 保存于测试账号 lening/admin;

- <img src="./.github/imgs/sample.jpg />

- 全程使用 purl vim(没有添加脚本), 前半程直接windows, 后半程使用 wsl + tmux;

- 服务器: vultr;

### 注意事项

- 没有密码加密, 后台明文存储用户密码;

- 窄屏幕不适配;

- 在打开页面的过程中切换显示设备会导致宽度出现问题;

- 上传文件太大的话网络会断(没有成功上传过22MB的视频文件);

- 在上传文件时中断会导致服务器会仅仅保存该文件的一部分, 不会对用户使用造成影响但是会导致服务器硬盘资源的浪费;

- 不要发送重复的请求;

- 不要保存不存在的文件;

### 功能

- 使用token检查用户登录状态;

- 创建文件夹并且上传文件(不支持直接创建文件和拖动修改文件路径);

- 支持文本文件的预览和编辑:
    - markdown, javascript, typescript有高亮效果(需要手动选择), 使用了Monaco;

    - 其他语言暂时不想添加;

- 支持图片的预览: jpg, png, ico后缀;

- 支持视频的预览: mp4, webm;

- 其余后缀名的文件会默认按照文本文件的格式打开, 所有以文本文件形式打开的默认使用了markdown的高亮效果;

- 改变2个主要元素的布局宽度: 拖动中间的分割线;

## Frameworks: React(javascript) + Express(typescript)


### React: frontend

- antd: UI库;

- axios: AJAX请求发送和接收;

- bable: 转译器;

- react:
    - react-dom: 渲染jsx;

    - react-redux: 配合redux;

    - react-router: 前端路由;

- redux: 组件间通信;

- sass: 预处理css;

- webpack: 打包工具, 没有使用react-creat-app, 而是自己diy了一个只有最低限度功能的凑活用的;

### Express: backend

- bcryptjs: 准备被使用的加密库*;

- express: 基础的路由框架;

- jsonwebtoken: token库*;

- mongodb: mongodb官方提供的基础操作mongodb的库;

- multer: 接收上传文件并保存本地的库;

- source-map-support: typescript转译到javascript时的source-map(生产环境中也没有关闭);

- typescript: 预处理javascript;
