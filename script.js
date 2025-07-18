$(document).ready(function() {

    loadUsers();
    
    // Butona tıklandığında kullanıcıları getir
    $("#loadUsers").click(function() {
        loadUsers();
    });

    function loadUsers() {
        // Mevcut kartları temizle
        $("#userCards").children().fadeOut(300, function() {
            $(this).remove();
        });
        
        // Yükleniyor durumunu göster
        $("#loadUsers").prop("disabled", true).text("Loading...");
        
        // Çekilecek kullanıcı sayısı
        const userCount = 8;
        
        // Random User API'den veri çek
        $.ajax({
            url: `https://randomuser.me/api/?results=${userCount}`,
            dataType: 'json',
            success: function(data) {
                // Eski kartların temizlenmesi için kısa gecikme
                setTimeout(function() {
                    displayUsers(data.results);
                    $("#loadUsers").prop("disabled", false).text("Load New Users");
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
});
