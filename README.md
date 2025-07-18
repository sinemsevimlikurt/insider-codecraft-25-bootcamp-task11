# Random User Profilleri

Bu proje, Insider Codecraft Bootcamp'in 11. görevi kapsamında geliştirilmiştir. Uygulama, Random User API kullanarak rastgele kullanıcı profilleri çeker ve bunları çeşitli jQuery animasyonları ile gösterir.

## Özellikler

- **Random User API Entegrasyonu:** [RandomUser.me](https://randomuser.me/) API'den AJAX ile kullanıcı verileri çeker
- **Animasyonlu Kullanıcı Kartları:** FadeIn ve SlideDown animasyonları ile kartları ekrana getirir
- **Hover Efektleri:** Kartların üzerine gelindiğinde görsel değişiklikler
- **Özel Animasyon Efektleri:** 
  - Shake (Sallama) butonu ile kartları sallama efekti
  - Bounce (Zıplama) butonu ile kartları zıplatma efekti
- **Fancybox Modal:** Kullanıcı kartına tıklandığında açılan detaylı kullanıcı profil modalı
- **Slick Slider:** Öne çıkan kullanıcıları gösteren otomatik kaydırmalı slider

## Kullanılan Teknolojiler

- HTML5
- CSS3
- JavaScript
- jQuery
- [Fancybox](https://fancyapps.com/fancybox/) - Modal pencereler için
- [Slick Slider](https://kenwheeler.github.io/slick/) - Kaydırmalı gösterim için
- [Random User API](https://randomuser.me/) - Rastgele kullanıcı verileri için

## Kurulum

1. Projeyi bilgisayarınıza klonlayın:
   ```
   git clone https://github.com/kullanici_adi/insider-codecraft-25-bootcamp-task11.git
   ```

2. Proje klasörüne gidin:
   ```
   cd insider-codecraft-25-bootcamp-task11
   ```

3. `index.html` dosyasını bir web tarayıcısında açın veya bir yerel web sunucusu kullanın:
VS Code Live Server eklentisi ile açın.

## Nasıl Kullanılır

- Sayfa yüklenince otomatik olarak rastgele kullanıcılar görüntülenir.
- "Kullanıcıları Yenile" butonuna tıklayıp yeni rastgele kullanıcılar yükleyebilirsiniz.
- "Shake Effect" butonuna tıklayarak kartlara sallama efekti uygulayabilirsiniz.
- "Bounce Effect" butonuna tıklayarak kartlara zıplama efekti uygulayabilirsiniz.
- Herhangi bir kullanıcı kartına tıklayıp daha detaylı bilgi görebilirsiniz.
- Üst kısımdaki slider ile öne çıkan kullanıcıları görebilirsiniz.
