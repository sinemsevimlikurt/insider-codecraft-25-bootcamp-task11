$(document).ready(function() {
    // Sayfa yüklendiğinde kullanıcıları getir
    loadUsers();
    
    // Butona tıklandığında kullanıcıları getir
    $("#loadUsers").click(function() {
        loadUsers();
    });
    
    // Shake efekti için olay dinleyici
    $("#shakeButton").click(function() {
        $(".user-card").addClass("shake");
        setTimeout(function() {
            $(".user-card").removeClass("shake");
        }, 1000);
    });
    
    // Bounce efekti için olay dinleyici
    $("#bounceButton").click(function() {
        $(".user-card").addClass("bounce");
        setTimeout(function() {
            $(".user-card").removeClass("bounce");
        }, 1000);
    });
    
    // Kullanıcı kartı tıklama olayı - modal göster
    $(document).on("click", ".user-card", function() {
        const userData = $(this).data("user");
        showUserModal(userData);
    });

    function loadUsers() {
        // Mevcut kartları temizle
        $("#userCards").children().fadeOut(300, function() {
            $(this).remove();
        });
        
        // Slider'ı temizle
        if ($("#userSlider").hasClass("slick-initialized")) {
            // Eğer slider zaten başlatılmışsa, önce unslick yap
            $("#userSlider").slick("unslick");
        }
        $("#userSlider").empty();
        
        // Yükleniyor durumunu göster
        $("#loadUsers").prop("disabled", true).text("Loading...");
        
        // Çekilecek kullanıcı sayısı
        const userCount = 12; // Ana grid için 8, slider için 4 farklı kullanıcı
        
        // Random User API'den veri çek
        $.ajax({
            url: `https://randomuser.me/api/?results=${userCount}`,
            dataType: 'json',
            success: function(data) {
                // Eski kartların temizlenmesi için kısa gecikme
                setTimeout(function() {
                    // Sonuçları ayır - ilk 4 slider için, kalan 8 grid için
                    const sliderUsers = data.results.slice(0, 4);
                    const gridUsers = data.results.slice(4);
                    
                    // Kullanıcıları görüntüle
                    displayUsers(gridUsers);
                    setupSlider(sliderUsers);
                    $("#loadUsers").prop("disabled", false).text("Kullanıcıları Yenile");
                }, 400);
            },
            error: function(error) {
                console.error("Error fetching user data:", error);
                $("#loadUsers").prop("disabled", false).text("Load New Users");
            }
        });
    }

    function displayUsers(users) {
        const userCardsContainer = $("#userCards");
        
        // Her kullanıcı için işlem yap
        users.forEach(function(user, index) {
            // Kullanıcı kartını oluştur
            const userCard = $(`
                <div class="user-card">
                    <img class="user-image" src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
                    <div class="user-info">
                        <div class="user-name">${user.name.first} ${user.name.last}</div>
                        <div class="user-details">${user.email}</div>
                        <div class="user-details">${user.phone}</div>
                        <div class="user-location">
                            <span>${user.location.city}, ${user.location.country}</span>
                        </div>
                    </div>
                </div>
            `);
            
            // Kullanıcı verisini karta ekle (modal için)
            userCard.data("user", user);
            
            // Konteynere ekle (başta gizli)
            userCardsContainer.append(userCard);
            
            // Sıralı animasyon ekle
            setTimeout(function() {
                // İki animasyon türünden rastgele seç
                const animationType = Math.random() > 0.5 ? 'fade' : 'slide';
                
                if (animationType === 'fade') {
                    userCard.fadeIn(600);
                } else {
                    userCard.slideDown(600);
                }
            }, index * 150); // Sıralı gecikme
        });

        // Hover efektlerini ekle
        $(document).on({
            mouseenter: function() {
                $(this).toggleClass('card-highlighted');
                $(this).fadeTo('fast', 1); // Hoverda tam opaklık
            },
            mouseleave: function() {
                $(this).toggleClass('card-highlighted');
                $(this).fadeTo('fast', 0.95); // Hover dışında hafif şeffaflık
            }
        }, '.user-card');
    }
    
    // Slider oluştur ve yapılandır
    function setupSlider(users) {
        const sliderContainer = $("#userSlider");
        
        // Slider için kartları oluştur
        users.forEach(function(user) {
            const sliderItem = $(`
                <div class="slider-card">
                    <div class="user-card">
                        <img class="user-image" src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
                        <div class="user-info">
                            <div class="user-name">${user.name.first} ${user.name.last}</div>
                            <div class="user-details">${user.email}</div>
                            <div class="user-location">
                                <span>${user.location.country}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            
            // Kullanıcı verisini karta ekle (modal için)
            sliderItem.find(".user-card").data("user", user);
            
            // Slider'a ekle
            sliderContainer.append(sliderItem);
        });
        
        // Slick slider başlat
        sliderContainer.slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
    
    // Kullanıcı detay modalını göster
    function showUserModal(user) {
        // Modal içeriği oluştur
        const modalContent = $(`
            <div class="user-modal-content">
                <img class="modal-image" src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
                <div class="modal-name">${user.name.title} ${user.name.first} ${user.name.last}</div>
                <div class="modal-details">${user.email}</div>
                <div class="modal-details">${user.phone}</div>
                
                <div class="modal-section">
                    <div class="modal-details"><strong>Doğum Tarihi:</strong> ${new Date(user.dob.date).toLocaleDateString()}</div>
                    <div class="modal-details"><strong>Yaş:</strong> ${user.dob.age}</div>
                    <div class="modal-details"><strong>Cinsiyet:</strong> ${user.gender === 'male' ? 'Erkek' : 'Kadın'}</div>
                </div>
                
                <div class="modal-section">
                    <div class="modal-details"><strong>Adres:</strong> ${user.location.street.number} ${user.location.street.name}</div>
                    <div class="modal-details">${user.location.city}, ${user.location.state}</div>
                    <div class="modal-details">${user.location.country}, ${user.location.postcode}</div>
                </div>
                
                <div class="modal-section">
                    <div class="modal-details"><strong>Kayıt Tarihi:</strong> ${new Date(user.registered.date).toLocaleDateString()}</div>
                </div>
            </div>
        `);
        
        // Fancybox ile modalı göster
        Fancybox.show([{
            src: modalContent.get(0),
            type: "html"
        }]);
    }
});
