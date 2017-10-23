import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch, Inject, Provide, Model, Prop, Emit } from 'vue-property-decorator';
/**
 * 基类用来定义共用方法
 * @export
 * @class Basis
 * @extends {Vue}
 */
export class Basis extends Vue {
  /**
   * 将字符串转换为数组
   * @param {string} str 字符串
   * @returns {string[]} 返回数组
   * @memberof Basis
   */
  strToArray(str: string, ...arge: any[]): any[] {
    const format = arge[0] || ',';
    if (this.$_.isString(str)) {
      return str.split(',');
    }
    if (str) {
      console.warn('[Basis Warn]:需要转换的不是字符串!');
    }
    return [];
  }
}
export { Component, Watch, Inject, Provide, Model, Prop, Emit };
