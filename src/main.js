/*
 * @Author: ChenXin
 * @Date: 2024-06-27 10:08:31
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-07-01 11:01:11
 * @FilePath: main.js
 * @Description: For learning only
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import presist from 'pinia-plugin-persistedstate'
import 'vant/lib/index.css'
import vClickOutside from 'click-outside-vue3'

const app = createApp(App)

app.use(createPinia().use(presist))
app.use(router)
app.use(vClickOutside)

app.mount('#app')
