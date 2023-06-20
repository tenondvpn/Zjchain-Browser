// import 'bootstrap/dist/css/bootstrap.css'


// import './assets/AdminLTE-3.1.0/plugins/fontawesome-free/css/all.min.css'
// import './assets/AdminLTE-3.1.0/dist/css/adminlte.min.css'
// import './assets/AdminLTE-3.1.0/plugins/jsgrid/jsgrid.min.css';
// import './assets/AdminLTE-3.1.0/plugins/jsgrid/jsgrid-theme.min.css';
// import './assets/AdminLTE-3.1.0/plugins/toastr/toastr.min.css';
// import './assets/AdminLTE-3.1.0/dist/css/adminlte.min.css';










import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
