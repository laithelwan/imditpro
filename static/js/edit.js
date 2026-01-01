// =================== Canvas setup ===================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();

// قيم التحكم
let brightnessVal = 100;
let contrastVal = 100;
let saturationVal = 100;
let scaleVal = 100;
let sepiaVal = 0;
let invertVal = 0;

// تحميل الصورة من الصفحة الأولى (localStorage)
const savedImage = localStorage.getItem("imdit_image");
if (savedImage) {
    img.src = savedImage;
} else {
    alert("لم يتم العثور على صورة");
}

// عند تحميل الصورة
img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    drawImage();
};

// =================== رسم الصورة ===================
function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.filter = `
        brightness(${brightnessVal}%)
        contrast(${contrastVal}%)
        saturate(${saturationVal}%)
        sepia(${sepiaVal}%)
        invert(${invertVal}%)
    `;

    const scale = scaleVal / 100;
    const w = img.width * scale;
    const h = img.height * scale;

    ctx.drawImage(
        img,
        (canvas.width - w) / 2,
        (canvas.height - h) / 2,
        w,
        h
    );
}

// =================== السلايدرز ===================
function brightness(val) {
    brightnessVal = val;
    drawImage();
}

function contrast(val) {
    contrastVal = val;
    drawImage();
}

function saturation(val) {
    saturationVal = val;
    drawImage();
}

function scaleImg(val) {
    scaleVal = val;
    drawImage();
}

// =================== الفلاتر الجاهزة ===================
function applyPreset(type) {
    sepiaVal = 0;
    invertVal = 0;

    if (type === "modern") {
        brightnessVal = 110;
        contrastVal = 120;
        saturationVal = 130;
    }
    if (type === "autumn") {
        brightnessVal = 105;
        contrastVal = 115;
        saturationVal = 120;
        sepiaVal = 40;
    }
    if (type === "negative") {
        invertVal = 100;
    }
    if (type === "sepia") {
        sepiaVal = 100;
    }

    drawImage();
}

// =================== إعادة ضبط ===================
function resetImage() {
    brightnessVal = 100;
    contrastVal = 100;
    saturationVal = 100;
    scaleVal = 100;
    sepiaVal = 0;
    invertVal = 0;
    drawImage();
}

// =================== مشاركة / تنزيل ===================
function shareImage() {
    canvas.toBlob(async (blob) => {
        const file = new File([blob], "imdit-image.png", { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    title: "Imdit Image",
                    text: "تم تعديل هذه الصورة باستخدام Imdit",
                    files: [file],
                });
            } catch (err) {
                console.log("تم إلغاء المشاركة");
            }
        } else {
            const link = document.createElement("a");
            link.download = "imdit-image.png";
            link.href = URL.createObjectURL(blob);
            link.click();
        }
    }, "image/png");
}

document.getElementById("downloadBtn").addEventListener("click", () => {
    canvas.toBlob((blob) => {
        const link = document.createElement("a");
        link.download = "imdit-image.png";
        link.href = URL.createObjectURL(blob);
        link.click();
    }, "image/png");
});

