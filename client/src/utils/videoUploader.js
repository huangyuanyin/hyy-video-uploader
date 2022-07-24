const UPLOAD_INFO = {
  'NO_FILE': '请先选择文件',
  'INVALID_TYPE': '不支持该类型文件上传'
};

const ALLOWED_TYPE = {
  'video/mp4': 'mp4',
  'video/ogg': 'ogg'
};

((doc) => {
  const oProgress = doc.querySelector("#uploaderProgress");
  const oUploader = doc.querySelector("#videoUploader");
  const oInfo = doc.querySelector("#uploadInfo");
  const oBtn = doc.querySelector("#uploadBtn");

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
    oProgress.max = size;
    oInfo.innerText = '';

  }

  init();
})(document);
