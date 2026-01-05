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
 b=c=s=100; sep=inv=hue=0;
 draw();
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

function cropFree(){
 alert("✂️ القص الحر بالسحب – المرحلة القادمة");
}
