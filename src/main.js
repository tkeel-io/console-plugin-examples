import './public-path';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from './routes';

let router = null;
let instance = null;
let history = null;

function render(props = {}) {
  const { container } = props;
  // eslint-disable-next-line no-underscore-dangle
  history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue-app' : '/');
  router = createRouter({
    history,
    routes,
  });

  instance = createApp(App);
  instance.use(router);
  instance.mount(container ? container.querySelector('#app') : '#app');
}

// eslint-disable-next-line no-underscore-dangle
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('%c ', 'color: green;', 'vue3.0 app bootstraped');
}

export async function mount(props) {
  render(props);
  instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange;
  instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}

export async function unmount() {
  instance.unmount();
  // eslint-disable-next-line no-underscore-dangle
  instance._container.innerHTML = '';
  instance = null;
  router = null;
  history.destroy();
}
