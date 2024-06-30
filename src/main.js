/*
 * @Author: ChenXin
 * @Date: 2024-06-27 10:08:31
 * @LastEditors: ChenXin
 * @LastEditTime: 2024-06-27 10:19:45
 * @FilePath: main.js
 * @Description: For learning only
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import presist from 'pinia-plugin-persistedstate'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(createPinia().use(presist))
app.use(router)

app.mount('#app')
