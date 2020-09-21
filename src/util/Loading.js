import { Loading } from 'element-ui';

let loading = null
// loading 方法
const loadingOpen = () => {
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}

const loadingClose = () => {
  try {
    loading.close()
  } catch (err) {
    console.log(err)
  }

}

export { loadingOpen, loadingClose }