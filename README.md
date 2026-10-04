# ModelDefteri

**Makine öğrenmesi deneylerini kaydet, karşılaştır, en iyi modeli bul.**

ModelDefteri, bir ML projesinde denediğin modelleri (Random Forest, CNN, Logistic Regression vb.) tek yerde tutmanı sağlayan bir deney günlüğüdür. Hangi modeli, hangi veri setiyle, hangi skorla denediğini ve notlarını kaydeder; sonuçları liste ve sıralama olarak gösterir.

> **Canlı demo:** [BURAYA NETLIFY LİNKİNİ YAPIŞTIR](https://ornek-link.netlify.app)

---

Makine öğrenmesi çalışırken farklı model ve parametreleri deneriz, ama sonuçlar çoğu zaman defterlerde, Colab hücrelerinde ya da aklımızda kalır. Bu uygulama, deneyleri düzenli tutmak ve "hangi model daha iyiydi?" sorusuna hızlı cevap vermek için geliştirildi.

## Özellikler

| İşlem | Açıklama |
|---|---|
| **Ekle** | Başlık, model, tür, veri seti, başarı skoru ve not ile yeni deney kaydı |
| **Listele** | Kartlar halinde listeleme, arama (başlık/model/veri seti) ve türe göre filtreleme |
| **Güncelle** | Kayıtlı bir deneyi aynı form üzerinden düzenleme |
| **Sil** | Onay sorusuyla deney silme |

Ek olarak:
- Toplam deney sayısı, ortalama skor ve en iyi model özet kartlarında gösterilir.
- Skoru en yüksek 5 deney "En iyi sonuçlar" bölümünde çubuklarla karşılaştırılır.
- Veriler tarayıcıda **LocalStorage** ile saklanır, sayfa yenilense de kaybolmaz.
- Telefon, tablet ve masaüstünde uyumlu (responsive) çalışır.

## Kullanılan teknolojiler

- **React 18** ile bileşen tabanlı arayüz
- **TypeScript** ile tip güvenliği (`interfaces` klasörü)
- **Vite** ile hızlı geliştirme ve build
- **Tailwind CSS** ile stil
- **LocalStorage** ile veri saklama (özel `useLocalStorage` hook'u)

## Klasör yapısı

```
modeldefteri/
├── src/
│   ├── components/      # ExperimentForm, ExperimentCard, StatsBar
│   ├── pages/           # Dashboard
│   ├── interfaces/      # Experiment tip tanımları
│   ├── hooks/           # useLocalStorage
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```

## Kurulum ve çalıştırma

Bilgisayarında [Node.js](https://nodejs.org) (LTS sürümü) kurulu olmalıdır.

```bash
# 1. Projeyi indir

# 2. Bağımlılıkları yükle
npm install

# 3. Geliştirme sunucusunu başlat
npm run dev
```

Uygulama genellikle `http://localhost:5173` adresinde açılır.

Yayına almak için:

```bash
npm run build
```
