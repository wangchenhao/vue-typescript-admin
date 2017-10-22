declare var require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  context: (path: string, bool: boolean, rse: any) => Function;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
declare module '*.svg' {
  const content: any;
  export default content;
}
declare module 'element-ui' {
  import { PluginObject } from 'vue';
  const content: PluginObject<object>;
  export default content;
}
declare module 'js-cookie' {
  const content: any;
  export default content;
}
