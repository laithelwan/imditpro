/* ===== CANVAS ===== */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const originalImage = new Image(); // الصورة الأصلية الحقيقية

const baseImage = new Image();    // الصورة المثبتة
const previewImage = new Image(); // المعاينة

/* ===== VALUES (فلتر مؤقت) ===== */
let b = 100, c = 100, s = 100, sep = 0, inv = 0, hue = 0;

/* ===== FILTERS ===== */
const FILTERS = [
 {name:"Original",b:100,c:100,s:100,sep:0,inv:0},
 {name:"Clarendon",b:110,c:130,s:140,sep:0,inv:0},
 {name:"Juno",b:105,c:120,s:140,sep:10,inv:0},
 {name:"Valencia",b:110,c:110,s:120,sep:30,inv:0},
 {name:"X-Pro",b:100,c:150,s:130,sep:20,inv:0},
 {name:"Moon",b:110,c:120,s:0,sep:0,inv:0},
 {name:"Gingham",b:105,c:90,s:80,sep:10,inv:0},
 {name:"Amaro",b:120,c:110,s:130,sep:10,inv:0},
 {name:"Sepia",b:100,c:100,s:100,sep:100,inv:0},
 {name:"Negative",b:100,c:100,s:100,sep:0,inv:100}
];

/* ===== LOAD IMAGE ===== */
originalImage.src = localStorage.getItem("imdit_image");

originalImage.onload = () => {
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;

    baseImage.src = originalImage.src;
    previewImage.src = originalImage.src;
};


previewImage.onload = () => {
 draw();
 generateFilters();
};

/* ===== DRAW ===== */
function draw(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.filter = `
  brightness(${b}%)
  contrast(${c}%)
  saturate(${s}%)
  sepia(${sep}%)
  invert(${inv}%)
  hue-rotate(${hue}deg)
 `;
 ctx.drawImage(previewImage,0,0,canvas.width,canvas.height);
}

/* ===== PANELS ===== */
const filtersBtn = document.getElementById("filtersBtn");
const adjustBtn  = document.getElementById("adjustBtn");
const cropBtn    = document.getElementById("cropBtn");

const filtersPanel = document.getElementById("filtersPanel");
const adjustPanel  = document.getElementById("adjustPanel");
const cropPanel    = document.getElementById("cropPanel");

filtersBtn.onclick = () => toggle(filtersPanel);
adjustBtn.onclick  = () => toggle(adjustPanel);
cropBtn.onclick    = () => toggle(cropPanel);

function toggle(panel){
 filtersPanel.classList.add("hidden");
 adjustPanel.classList.add("hidden");
 cropPanel.classList.add("hidden");
 panel.classList.toggle("hidden");
}

/* ===== CLOSE ON OUTSIDE CLICK ===== */
document.addEventListener("click", (e) => {
 const inside =
  e.target.closest("#filtersPanel") ||
  e.target.closest("#adjustPanel") ||
  e.target.closest("#cropPanel");

 const tool =
  e.target.closest("#filtersBtn") ||
  e.target.closest("#adjustBtn") ||
  e.target.closest("#cropBtn");

 if (!inside && !tool) {
  filtersPanel.classList.add("hidden");
  adjustPanel.classList.add("hidden");
  cropPanel.classList.add("hidden");
 }
});

/* ===== FILTER GRID ===== */
function generateFilters(){
 const grid = document.querySelector(".filters-grid");
 grid.innerHTML = "";

 FILTERS.forEach(f=>{
  const item = document.createElement("div");
  item.className = "filter-item";

  const c2 = document.createElement("canvas");
  c2.width = 150; c2.height = 150;
  const x = c2.getContext("2d");

  x.filter = `
   brightness(${f.b}%)
   contrast(${f.c}%)
   saturate(${f.s}%)
   sepia(${f.sep}%)
   invert(${f.inv}%)
  `;
  const source =
    f.name === "Original"
        ? originalImage
        : previewImage;

x.drawImage(source, 0, 0, 150, 150);

  item.innerHTML = `<div class="filter-name">${f.name}</div>`;
  item.prepend(c2);

 item.onclick = () => {

if (f.name === "Original") {
    previewImage.src = originalImage.src;

    b = c = s = 100;
    sep = inv = hue = 0;

    previewImage.onload = () => {
        draw();
        generateFilters(); // 🔥 تحديث النماذج
    };
}
 else {
     b=f.b; c=f.c; s=f.s; sep=f.sep; inv=f.inv;
     draw();
 }
};


  grid.appendChild(item);
 });
}

/* ===== SLIDERS ===== */
function setBrightness(v){ b=v; draw(); }
function setContrast(v){ c=v; draw(); }
function setSaturation(v){ s=v; draw(); }
function setWarmth(v){ sep=v/4; draw(); }
function setHue(v){ hue=v; draw(); }

/* ===== SAVE FILTER (تثبيت) ===== */
document.getElementById("saveFilterBtn").onclick = () => {

 ctx.filter = `
  brightness(${b}%)
  contrast(${c}%)
  saturate(${s}%)
  sepia(${sep}%)
  invert(${inv}%)
  hue-rotate(${hue}deg)
 `;
 ctx.drawImage(previewImage,0,0,canvas.width,canvas.height);

 const data = canvas.toDataURL();
 baseImage.src = data;
 previewImage.src = data;
previewImage.onload = () => {
    draw();
    generateFilters();
};

 // نبدأ فلتر جديد فوقه
 b = c = s = 100;
 sep = inv = hue = 0;
};

/* ===== RESET (فلتر مؤقت فقط) ===== */
function resetImage(){
   // إعادة القيم الافتراضية للفلاتر
   b = c = s = 100;
    sep = inv = hue = 0;

    // إعادة الصورة إلى الأصلية
    previewImage.src = originalImage.src;
    baseImage.src = originalImage.src;

    // مسح فلتر الألوان
    keepColors = [];
    imageHistory = [];

    // إعادة رسم
    previewImage.onload = () => {
        canvas.width = previewImage.width;
        canvas.height = previewImage.height;
        draw();
        generateFilters();
    };
}

/* ===== DOWNLOAD ===== */
document.getElementById("downloadBtn").onclick = () => {
 canvas.toBlob(blob=>{
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "imdit.png";
  a.click();
 });
};
function shareImage() {
    const canvas = document.getElementById("canvas");

    if (!canvas) {
        alert("لا توجد صورة للمشاركة");
        return;
    }

    canvas.toBlob(blob => {
        const file = new File([blob], "edited-image.png", {
            type: "image/png"
        });

        // إذا المتصفح يدعم المشاركة
        if (navigator.share) {
            navigator.share({
                title: "صورة معدلة",
                text: "شوف الصورة اللي عدلتها ✨",
                files: [file]
            }).catch(err => {
                console.log("فشل المشاركة:", err);
            });
        } else {
            // حل بديل: تحميل الصورة
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "edited-image.png";
            a.click();
            URL.revokeObjectURL(url);
        }
    });
}


/* ===== THEME ===== */
const themeBtn = document.getElementById("themeBtn");
themeBtn.onclick = () => {
 const html = document.documentElement;
 const dark = html.dataset.theme === "dark";
 html.dataset.theme = dark ? "light" : "dark";
 themeBtn.innerHTML = dark
  ? '<i class="fa-solid fa-sun"></i>'
  : '<i class="fa-solid fa-moon"></i>';
};

/* ===== CROP ===== */
let isCropping = false;
let cropStartX = null;
let cropStartY = null;
let cropEndX = null;
let cropEndY = null;
let cropRatio = null; // null = حر، أو رقم مثل 1, 16/9

function cropImage(ratio){
 const w = baseImage.width;
 const h = baseImage.height;

 let nw = w;
 let nh = w / ratio;
 if (nh > h) {
  nh = h;
  nw = h * ratio;
 }

 const x = (w - nw) / 2;
 const y = (h - nh) / 2;

 const temp = document.createElement("canvas");
 temp.width = nw;
 temp.height = nh;
 temp.getContext("2d")
  .drawImage(baseImage, x, y, nw, nh, 0, 0, nw, nh);

 const data = temp.toDataURL();
 baseImage.src = data;
 previewImage.src = data;
 previewImage.onload = () => {
    draw();
    generateFilters();
};

}

function cropFree(ratio = null){
  isCropping = true;
  canvas.style.cursor = "crosshair";
  cropRatio = ratio; // null = قص حر، أو رقم = نسبة
}

/* ===============================
   COLOR KEEP FILTER (ADD-ON ONLY)
   =============================== */

/* حالة الألوان */
let keepColors = [];
let imageHistory = []; // تخزين الحالات


/* فتح / إغلاق لوحة الألوان */
document.getElementById("filterIcon").onclick = () => {
  document.getElementById("filterPanel").classList.toggle("hidden");

  // أول مرة نخزن الصورة
   if (imageHistory.length === 0) {
    imageHistory.push(
      ctx.getImageData(0, 0, canvas.width, canvas.height)
    );
  }
};
/* اختيار لون */
function toggleColor(color) {
  if (keepColors.includes(color)) {
    keepColors = keepColors.filter(c => c !== color);
  } else {
    keepColors.push(color);
  }

  applyKeepFilter();
}


/* رجوع آخر لون */
function undoColor() {
  if (imageHistory.length <= 1) return;

  imageHistory.pop(); // إزالة آخر حالة
  const prev = imageHistory[imageHistory.length - 1];
  ctx.putImageData(prev, 0, 0);
}


/* تطبيق الفلتر */
function applyKeepFilter() {
  if (imageHistory.length === 0) return;

  const base = imageHistory[0]; // 🔥 دائمًا من البداية

  const img = new ImageData(
    new Uint8ClampedArray(base.data),
    base.width,
    base.height
  );

  for (let i = 0; i < img.data.length; i += 4) {
    const r = img.data[i];
    const g = img.data[i + 1];
    const b = img.data[i + 2];

    let keep = false;

    if (keepColors.includes("red") && r > 150 && r > g && r > b) keep = true;
    if (keepColors.includes("green") && g > 150 && g > r && g > b) keep = true;
    if (keepColors.includes("blue") && b > 150 && b > r && b > g) keep = true;
    if (keepColors.includes("yellow") && r > 150 && g > 150 && b < 120) keep = true;
    if (keepColors.includes("brown") && r > g && g > b && r < 160) keep = true;

    if (!keep) {
      const gray = (r + g + b) / 3;
      img.data[i] = gray;
      img.data[i + 1] = gray;
      img.data[i + 2] = gray;
    }
  }

  ctx.putImageData(img, 0, 0);

  // نحفظ الحالة للرجوع
  imageHistory.push(
    ctx.getImageData(0, 0, canvas.width, canvas.height)
  );
}


/* حفظ الفلتر */
function saveFilter() {
  const data = canvas.toDataURL();
  baseImage.src = data;
  previewImage.src = data;

  previewImage.onload = () => {
    draw();
    generateFilters();
  };

  keepColors = [];
  imageHistory = [];
  document.getElementById("filterPanel").classList.add("hidden");
}
canvas.addEventListener("mousedown", (e) => {
  if (!isCropping) return;
  const rect = canvas.getBoundingClientRect();
  cropStartX = e.clientX - rect.left;
  cropStartY = e.clientY - rect.top;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isCropping || cropStartX === null) return;

  const rect = canvas.getBoundingClientRect();
  cropEndX = e.clientX - rect.left;
  cropEndY = e.clientY - rect.top;

  // تطبيق نسبة محددة
  if (cropRatio) {
    const w = Math.abs(cropEndX - cropStartX);
    const h = w / cropRatio;
    if (cropEndY > cropStartY) cropEndY = cropStartY + h;
    else cropEndY = cropStartY - h;
  }

  draw();
  drawCropRect();
});

canvas.addEventListener("mouseup", () => {
  if (!isCropping) return;

  isCropping = false;
  canvas.style.cursor = "default";
  document.body.style.cursor = "default";
  canvas.style.cursor = "default";

  applyFreeCrop();
});
function drawCropRect() {
  if (cropStartX === null || cropEndX === null) return;

  const x = Math.min(cropStartX, cropEndX);
  const y = Math.min(cropStartY, cropEndY);
  const w = Math.abs(cropEndX - cropStartX);
  const h = Math.abs(cropEndY - cropStartY);

  ctx.save();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.strokeRect(x, y, w, h);
  ctx.restore();
}
function applyFreeCrop() {
  if (cropStartX === null || cropEndX === null) return;

  const x = Math.min(cropStartX, cropEndX);
  const y = Math.min(cropStartY, cropEndY);
  const w = Math.abs(cropEndX - cropStartX);
  const h = Math.abs(cropEndY - cropStartY);

  if (w < 10 || h < 10) return; // حماية من القص الصغير جدًا

  const temp = document.createElement("canvas");
  temp.width = w;
  temp.height = h;

  temp.getContext("2d").drawImage(
    canvas,
    x, y, w, h,
    0, 0, w, h
  );

  const data = temp.toDataURL();
  baseImage.src = data;
  previewImage.src = data;

  previewImage.onload = () => {
    canvas.width = previewImage.width;
    canvas.height = previewImage.height;
    draw();
    generateFilters();
  };

  // إعادة تعيين
  cropStartX = cropStartY = cropEndX = cropEndY = null;
  cropRatio = null;
}
