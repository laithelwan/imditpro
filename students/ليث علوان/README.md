
الاسم ليث علوان 
الرقم الجامعي : 20040072

Back End & Deployment – Django + Render

هذا المشروع هو موقع ويب مبني باستخدام Django، يربط واجهة أمامية بسيطة مع خلفية (Back End)، مع تجهيز كامل للنشر على Render وإدارة متغيرات البيئة بشكل آمن.
المشروع قابل للتوسعة لاحقًا لإضافة AI لوصف الصور عبر API خارجي.

 المهام المنجزة
- إعداد مشروع Django

إنشاء مشروع Django من الصفر

إعداد التطبيقات (Apps)

تهيئة الإعدادات الأساسية (settings.py)

إعداد ملفات القوالب (templates) والملفات الثابتة (static)

- ربط الواجهة الأمامية مع Django

استخدام Django Templates

استقبال الصور من المستخدم

حفظ الصور على السيرفر

عرض الصورة المرفوعة مع ناتج المعالجة

- إعداد المسارات (URLs)

تنظيم المسارات باستخدام urls.py

ربط الصفحات بالـ Views

دعم صفحات:

الصفحة الرئيسية

صفحة التعديل (Edit)

- تجهيز المشروع للنشر (Production Ready)

إعداد:

requirements.txt

Procfile

runtime.txt

تفعيل collectstatic

تهيئة إعدادات الأمان الأساسية

فصل الإعدادات الحساسة عن الكود

- رفع المشروع على GitHub

إنشاء مستودع Git

إعداد .gitignore

رفع الكود بدون أي مفاتيح سرية (Secrets)

الالتزام بقواعد GitHub Push Protection

 - النشر على Render

ربط المستودع مع Render

تحديد:

Build Command

Start Command

تشغيل المشروع بنجاح على الاستضافة

التحقق من عمل الموقع أونلاين

 إدارة متغيرات البيئة (Environment Variables)

استخدام متغيرات البيئة بدل القيم الحساسة

مثال:

SECRET_KEY

DEBUG

مفاتيح API (مثل Hugging Face لاحقًا)

ضبط المتغيرات من لوحة تحكم Render

  - التقنيات المستخدمة

Python

Django

HTML / CSS / JavaScript

Git & GitHub

Render Cloud Hosting

 ملاحظات مستقبلية

إضافة AI لوصف الصور عبر API خارجي

تحسين الواجهة الأمامية

دعم تحميل ومعالجة صور أكبر

تحسين الأداء والأمان

 طريقة التشغيل محليًا
python -m venv venv
source venv/bin/activate  # أو venv\Scripts\activate على ويندوز
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
