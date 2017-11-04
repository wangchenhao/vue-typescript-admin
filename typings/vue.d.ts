import { AxiosStatic, AxiosInstance } from 'axios';
import { LoDashStatic } from 'lodash';

declare module 'vue/types/vue' {
	interface Vue {
		$_: LoDashStatic;
		$cookie: any;
		$http: AxiosStatic;
	}
}
declare module 'axios/index' {
	export interface AxiosResponse {
	}
}