document.addEventListener("DOMContentLoaded", () => {
    const imageInput = document.getElementById("imageInput");
    const uploadForm = document.getElementById("uploadForm");
    const loader = document.getElementById("aiLoader");
    const loaderText = document.getElementById("loaderText");
    const previewSection = document.getElementById("previewSection");

    const messages = [
        "جاري تحليل مكونات الصورة...",
        "التعرف على العناصر...",
        "فهم المشهد...",
        "إنشاء وصف ذكي..."
    ];

    let interval;

    imageInput.addEventListener("change", () => {
        if (!imageInput.files.length) return;

        // إخفاء المعاينة
        previewSection.style.display = "none";

        // إظهار اللودر
        loader.style.display = "flex";

        // نص متحرك
        let i = 0;
        interval = setInterval(() => {
            loaderText.innerText = messages[i % messages.length];
            i++;
        }, 1000);

        // قراءة الصورة وحفظها في localStorage
        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            localStorage.setItem("imdit_image", e.target.result);

            // إرسال الفورم تلقائياً بعد 600ms
            setTimeout(() => {
                uploadForm.submit();
            }, 600);
        };

        reader.readAsDataURL(file);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const contactBtn = document.getElementById("contactBtn");
    const contactList = contactBtn.querySelector(".contact-list");

    contactBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // منع إغلاق عند الضغط داخل الصندوق
        contactList.style.display = contactList.style.display === "block" ? "none" : "block";
    });

    // إخفاء عند الضغط في أي مكان آخر
    document.addEventListener("click", () => {
        contactList.style.display = "none";
    });
});
