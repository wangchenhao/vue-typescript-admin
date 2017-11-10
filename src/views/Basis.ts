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
   * 字符串转化为数组
   * @param {string} str 字符串
   * @param {...any[]} arge 其他参数
   * @returns {any[]} 返回数组
   * @memberof Basis
   */
  strToArray(str: string, ...arge: any[]): string[] {
    const format = arge[0] || ',';
    const limit = arge[1];
    if (this.$_.isString(str)) {
      return this.$_.split(str, format, limit);
    } else {
      console.warn('[Basis Warn]:需要转换的不是字符串!');
      return [];
    }
  }
}
export { Component, Watch, Inject, Provide, Model, Prop, Emit };
