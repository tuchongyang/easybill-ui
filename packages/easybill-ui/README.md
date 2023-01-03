# `easybill-ui`

> A component library for easybill

## 安装

#### 环境支持

Easybill Ui 与 Element Plus 的环境支持保持一致。

Element Plus 可以在支持 ES2018 和 ResizeObserver 的浏览器上运行。 如果您确实需要支持旧版本的浏览器，请自行添加 Babel 和相应的 Polyfill 。

由于 Vue 3 不再支持 IE11，Element Plus 也不再支持 IE 浏览器。

| Edge      | Firefox      | Chrome      | Safari      |
| --------- | ------------ | ----------- | ----------- |
| Edge ≥ 79 | Firefox ≥ 78 | Chrome ≥ 64 | Safari ≥ 12 |

#### 包管理器安装

```shell
# 选择一个你喜欢的包管理器

# NPM
$ npm install easybill-ui --save

# Yarn
$ yarn add easybill-ui

# pnpm
$ pnpm install easybill-ui
```

#### 快速开始

```typescript
// main.ts
import { createApp } from "vue"
import App from "./App.vue"

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

import EasybillUi from "easybill-ui"
import "easybill-ui/theme-chalk/index.css"

const app = createApp(App)

app.use(ElementPlus).use(EasybillUi)
app.mount("#app")
```
