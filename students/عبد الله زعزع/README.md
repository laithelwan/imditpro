الاسم: عبدالله زعزع
الرقم الجامعي: 2223368
القسم المسؤول عنه

في هذا المشروع كنت مسؤولًا عن تنسيق الواجهة الأمامية (HTML;CSS)، مع التركيز على صفحة التعديل (Edit Page)، بالإضافة إلى تنفيذ نظام تغيير الثيم بين الوضع الليلي (Dark Mode) والوضع النهاري (Light Mode) باستخدام CSS و JavaScript
ملاحظة:
منطق عمل الأزرار (Filters, Crop, Save, …) ووظائفها البرمجية
تم تنفيذها من قبل طلاب آخرين،
بينما كان دوري يقتصر على تنسيق الواجهة واستدعاء الدوال فقط..
تنسيق صفحة التعديل (Edit Page)



قمت بتنسيق صفحة التعديل باستخدام CSS، مع التركيز على المظهر العام وتجربة المستخدم، حيث شملت المهام:

تصميم وتنسيق الهيكل العام للصفحة (Layout)

تنسيق:

الشريط العلوي (Top Bar)

منطقة العرض (Canvas Area)

لوحة الأدوات (Tools Panel)

تنسيق الأزرار والأيقونات دون التدخل في منطقها البرمجي

تنسيق Panels الخاصة بالأدوات (مثل Filter Panel)

إضافة تأثيرات:

Hover

Transitions

Border Radius

ضمان تناسق الألوان والخطوط مع كامل الموقع






نظام تغيير الثيم (Dark / Light Mode)

قمت بتنفيذ نظام تغيير الثيم بين الوضع الليلي والنهاري من ناحية الواجهة فقط.

 من جهة CSS

استخدام CSS Variables لتعريف الألوان العامة

دعم ثيمين:

Dark Mode (افتراضي)

Light Mode

تطبيق الثيم على:

الخلفيات

النصوص

الأزرار

اللوحات (Panels)

    من جهة JavaScript

كتابة دالة JavaScript مسؤولة عن:

تبديل الثيم عند الضغط على زر التغيير

تغيير قيمة data-theme داخل وسم html

تغيير أيقونة الزر (شمس / قمر)

استدعاء الدالة فقط دون التأثير على منطق بقية الأزرار

const themeBtn = document.getElementById("themeBtn");
themeBtn.onclick = () => {
  const html = document.documentElement;
  const dark = html.dataset.theme === "dark";
  html.dataset.theme = dark ? "light" : "dark";
  themeBtn.innerHTML = dark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
};



لتقنيات المستخدمة

HTML

CSS (CSS Variables)

JavaScript

Font Awesome Icons


