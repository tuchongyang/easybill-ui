import { createApp, markRaw } from "vue"
import router from "./router"
import store from "./store"
import App from "./App.vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import EasybillUi from "easybill-ui/index"
// import "easybill-ui/theme-chalk/index.css"

import "../packages/theme-chalk/src/index.scss"
import FormList from "./components/FormList/IndexView.vue"
import FormImage from "./components/FormImage/IndexView.vue"
const app = createApp(App)
app
  .use(router)
  .use(store)
  .use(ElementPlus)
  .use(EasybillUi, { size: "default", form: { components: { list: markRaw(FormList), image: markRaw(FormImage) } } })
  .mount("#app")
