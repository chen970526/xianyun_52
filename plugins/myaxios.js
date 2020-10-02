import { Message } from 'element-ui';

export default function ({ $axios, redirect }) {
  // console.log('经过了我');
  $axios.onError(err => {
    const { statusCode, message } = err.response.data;

    // 还未使用
    if (statusCode === 401 || statusCode === 403) {
      Message.warning({ message: '请先登录' });

      console.log(window.location);
      redirect(`/user/login?returnUrl=${window.location.pathname + window.location.search}`);
    }

    if (statusCode === 400) {
      Message.warning({ message });
    }
  });
}
