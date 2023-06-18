const uploadBox = document.querySelector(".upload-box")
const fileInput = uploadBox.querySelector("input");
const previewImg = uploadBox.querySelector("img");
const widthInput = document.querySelector(".width input");
const heightInput = document.querySelector(".height input");
const ratioInput = document.querySelector(".ratio input")
const downloadBtn = document.querySelector(".download-btn")
const qualityInput = document.querySelector(".quality input")

let imageRatio;
const loadfile = (e) => {
    let file = e.target.files[0];
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        imageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    })

}

widthInput.addEventListener("keyup", () => {
    let height = ratioInput.checked ? widthInput.value / imageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
})
heightInput.addEventListener("keyup", () => {
    let width = ratioInput.checked ? heightInput.value * imageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
})

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas")
    const a = document.createElement("a")
    const ctx = canvas.getContext("2d");

    const imgQuality = qualityInput.checked ? 0.7 : 1.0;

    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

    a.href = canvas.toDataURL("image/jpeg", imgQuality);
    a.download = new Date().getTime();
    a.click();

}

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadfile);
uploadBox.addEventListener("click", () => fileInput.click());
