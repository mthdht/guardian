import * as components from './components';


const guardian = {
  install(Vue, options = {}) {
    // components
    for (const componentName in components) {
      const component = components[componentName];
      Vue.component(component.name, component);
    }
    Vue.provide('options', options)
  },
};

export { guardian };