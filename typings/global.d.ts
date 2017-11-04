declare var require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  context: (path: string, bool: boolean, rse: any) => Function;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
declare module '*.svg' {
  const content: any;
  export default content;
}
