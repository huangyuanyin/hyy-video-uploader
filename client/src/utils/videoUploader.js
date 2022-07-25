import { UPLOAD_INFO, ALLOWED_TYPE, CHUNK_SIZE, API } from "./config";

((doc) => {
  const oProgress = doc.querySelector("#uploaderProgress");
  const oUploader = doc.querySelector("#videoUploader");
  const oInfo = doc.querySelector("#uploadInfo");
  const oBtn = doc.querySelector("#uploadBtn");

  let uploadedSize = 0; // 当前上传了多少

  const init = () => {
    bindEvent();
  };

  function bindEvent() {
    oBtn.addEventListener("click", uploadVideo, false);
  }

  async function uploadVideo() {
    // const file = oUploader.files[0]
    const {
      files: [file],
    } = oUploader;
    console.log(file);
    if (!file) {
      oInfo.innerText = UPLOAD_INFO["NO_FILE"];
      return;
    }
    // 类型支持
    if (!ALLOWED_TYPE[file.type]) {
      oInfo.innerText = UPLOAD_INFO["INVALID_TYPE"];
      return;
    }
    const { name, size, type } = file; // 解构出文件名称，大小，类型

    const fileName = new Date().getTime() + "_" + name; // 切出来的文件名
    const uploadedResult = {};

    oProgress.max = size;
    oInfo.innerText = "";

    while (uploadedSize < size) {
      const fileChunk = file.size(uploadedSize, uploadedSize + CHUNK_SIZE);
      const formData = createFormDate({
        name,
        type,
        size,
        fileName,
        uploadedSize,
        file: fileChunk,
      });
      try {
        uploadedResult = await axios.post(API.UPLOAD_VIDEO, formData);
      } catch (error) {
        oInfo.innerText = `${UPLOAD_INFO["UPLOAD_FAILED"]}(${error.message})`;
        return;
      }
      uploadedSize += fileChunk.size;
      oProgress.value = uploadedSize;
    }
    oInfo.innerText = UPLOAD_INFO["UPLOAD_SUCCESS"];
    oUploader.value = null;
  }

  function createFormDate({ name, type, size, fileName, uploadedSize, file }) {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("type", type);
    fd.append("size", size);
    fd.append("fileName", fileName);
    fd.append("uploadedSize", uploadedSize);
    fd.append("file", file);

    return fd;
  }

  init();
})(document);
