import EasybillUi from "easybill-ui/index"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
// import "easybill-ui/theme-chalk/index.css"

import "../packages/theme-chalk/src/index.scss"
const app = createApp(App)
app.use(router).use(ElementPlus).use(EasybillUi, { size: "default" }).mount("#app")
