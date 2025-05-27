document.addEventListener('DOMContentLoaded', function() {

    // 네비게이션 부드러운 스크롤
    const navLinks = document.querySelectorAll('#navbar a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 기본 동작(점프) 방지

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // targetSection.scrollIntoView({
                //     behavior: 'smooth'
                // });
                
                // 네비게이션 바 높이를 고려한 스크롤 (선택 사항)
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 스크롤 시 네비게이션 바 스타일 변경 (선택 사항)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) { // 50px 이상 스크롤되면
            navbar.style.background = 'rgba(0, 0, 0, 0.9)'; // 배경을 더 진하게
            navbar.style.padding = '5px 0';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.7)';
             navbar.style.padding = '10px 0';
        }
    });

});
