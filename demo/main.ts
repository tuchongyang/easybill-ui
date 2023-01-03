import { createApp } from "vue"
import router from "./router"
import store from "./store"
import App from "./App.vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import EasybillUi from "easybill-ui/index"
import "easybill-ui/theme-chalk/index.css"

const app = createApp(App)
app.use(router).use(store).use(ElementPlus).use(EasybillUi).mount("#app")
