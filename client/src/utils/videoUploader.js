import { UPLOAD_INFO, ALLOWED_TYPE, CHUNK_SIZE } from './config'

((doc) => {
  const oProgress = doc.querySelector("#uploaderProgress");
  const oUploader = doc.querySelector("#videoUploader");
  const oInfo = doc.querySelector("#uploadInfo");
  const oBtn = doc.querySelector("#uploadBtn");

  let uploadedSize = 0; // 当前上传了多少

  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    oBtn.addEventListener('click', uploadVideo, false)
  }

  function uploadVideo() {
    // const file = oUploader.files[0]
    const { files: [file] } = oUploader
    console.log(file)
    if (!file) {
      oInfo.innerText = UPLOAD_INFO['NO_FILE']
      return;
    }
    // 类型支持
    if (!ALLOWED_TYPE[file.type]) {
      oInfo.innerText = UPLOAD_INFO['INVALID_TYPE']
      return;
    }
    const { name, size, type } = file // 解构出文件名称，大小，类型

    const fileName = new Date().getTime() + '_' + name; // 切出来的文件名

    oProgress.max = size;
    oInfo.innerText = '';

  }

  init();
})(document);
