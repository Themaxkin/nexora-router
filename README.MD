# Nexora

[![NPM Version](https://img.shields.io/npm/v/nexora-router?color=blue)](https://www.npmjs.com/package/nexora-router)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-themaxkin-blue)](https://github.com/themaxkin)

`Nexora` 是一个智能、约定优于配置的 Node.js 路由自动化管理工具。

`Nexora` 旨在将开发者从繁琐的手动路由注册工作中解放出来。它通过扫描您项目中的目录结构，自动生成一个路由地图，让您的 Express 或兼容框架能够动态加载所有路由。

## 核心特性

- **约定优于配置**：只需遵循简单的目录结构，无需任何路由配置代码。
- **自动生成**：自动扫描并生成路由地图文件，保持路由始终同步。
- **实时监视**：内置 `watch` 模式，在开发时自动感知文件变化并重新构建，完美支持热重载。
- **开箱即用**：零配置即可开始使用，同时也提供丰富的自定义选项。
- **健壮可靠**：内置智能检查，当依赖缺失或文件不存在时提供清晰的引导。

## 安装

将 `Nexora` 作为项目的开发依赖进行安装。

```bash
npm install nexora-router
```

## 快速开始

### 1.创建你的路由文件

在你的项目根目录下创建一个 `routers` 文件夹，并为每个路由模块创建一个子文件夹。

```
your-project/
├── routers/
│   ├── users/
│   │   └── index.js
│   └── products/
│       └── index.js
└── ...
```

`routers/users/index.js` 文件示例：

```javascript
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, Users!");
});

module.exports = router;
```

### 2.在 `package.json` 中添加脚本

```json
"scripts": {
  "routes:build": "nexora build",
  "routes:watch": "nexora watch"
}
```

### 3.运行构建或监视命令

```bash
# 手动构建一次
npm run routes:build

# 或启动开发监视模式
npm run routes:watch
```

`Nexora` 将会自动在你的项目根目录创建 routeMap.js 文件。

### 4.在你的服务器中加载路由

```javascript
const express = require("express");
const app = express();
const routeMap = require("./routeMap.js");

for (const path in routeMap) {
  app.use(path, routeMap[path]);
}

app.listen(3000, () => console.log("Server is running!"));
```

### 5.开发工作流

为了获得最佳的开发体验，你应该使用项目预设的 `dev` 命令。
配置 `dev` 命令：

```json
"scripts": {
  "dev": "nodemon server.js",
}
```

运行 `dev` 命令:

```bash
npm run dev
```

**1.方案一（推荐）：** 这是开发时应该使用的命令。它会同时启动 `Nexora` 的路由监视和 `nodemon` 的服务器监视，实现完全的自动化和热重载。

**2.方案二：** 开启两个终端，一个执行`npm run nexora:watch`，另一个执行 `npm start`，即可实现完全的自动化和热重载与服务器监视。

## CLI 命令

- `nexora build`: 执行一次性的路由地图构建。
- `nexora watch`: 启动文件监视模式，在文件发生变化时自动重新构建。

## 如何添加/修改路由？

整个过程非常简单，只需两步：

1.  **进入 `routers` 目录**。
2.  **创建或修改**：
    - **添加新路由**：创建一个新的子文件夹（例如，要添加 `/analytics` 路由，就创建 `analytics` 文件夹，并在此文件夹下创建 `index.js` 文件）。
    - **修改现有路由**：找到对应的子文件夹（例如 `users`）。
3.  在子文件夹中，编辑 `index.js` 文件，写入标准的 Express Router 逻辑并导出即可。

当你保存文件后，正在运行的开发服务器会自动为你重新加载路由。

## 配置文件

你可以在项目根目录创建一个 `nexora.config.js` 文件来自定义 Nexora 的行为。

## 生成的文件

`Nexora` 会自动在项目根目录生成 `routeMap.js` 文件。

> **警告：请不要手动修改 `routeMap.js` 文件**。你的任何修改都会在下一次构建时被自动覆盖。请始终通过修改 `routers` 目录下的源文件来管理路由。

## 配置文件示例
```javascript
// nexora.config.js
module.exports = {
  // 功能总开关
  enabled: true,

  // 自定义路由文件夹路径 (默认为 './routers')
  routersPath: "./app/routes",

  // 自定义输出文件路径 (默认为 './routeMap.js')
  outputPath: "./config/generatedRoutes.js",
};
```

## 贡献

欢迎提交 Pull Request 或 Issue 来帮助改进 Nexora。
