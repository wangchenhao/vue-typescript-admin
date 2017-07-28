declare module '*.svg' {
  const content: any;
  export default content;
}
declare module 'element-ui' {
  import { PluginObject } from 'vue'
  const content: PluginObject<object>
  export default content
}
declare module 'js-cookie' {
  const content: any
  export default content
}