document.addEventListener('DOMContentLoaded', function() {

    // --- 요소 선택 ---
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const langSwitcher = document.getElementById('lang-switcher');
    const langButtons = langSwitcher.querySelectorAll('button');
    const elementsToTranslate = document.querySelectorAll('[data-lang]');
    const htmlTag = document.documentElement;
    const contactBtn = document.getElementById('contact-btn');
    const logoLink = document.querySelector('.logo');
    const navbar = document.getElementById('navbar');
    const toTopBtn = document.getElementById('to-top-btn');

    // --- 다국어 처리 ---
    let currentLang = localStorage.getItem('maimiiotu_lang') || 'en'; // 기본 언어 'en'으로 변경

    function changeLanguage(lang) {
        if (typeof languages === 'undefined' || !languages[lang]) {
            console.error("Language data not found or language not supported:", lang);
            return;
        }

        currentLang = lang;
        localStorage.setItem('maimiiotu_lang', lang);
        htmlTag.lang = lang;

        elementsToTranslate.forEach(el => {
            const key = el.getAttribute('data-lang');
            if (languages[lang][key] !== undefined) {
                if (el.tagName === 'TITLE') {
                    el.textContent = languages[lang][key];
                } else {
                    el.innerHTML = languages[lang][key];
                }
            }
        });

        updateActiveButton();
        langSwitcher.classList.add('hidden'); // 언어 선택 후 메뉴 숨기기
    }

    function updateActiveButton() {
         langButtons.forEach(button => {
            if (button.getAttribute('data-lang-set') === currentLang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    langToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        langSwitcher.classList.toggle('hidden');
    });

    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedLang = e.target.getAttribute('data-lang-set');
            changeLanguage(selectedLang);
        });
    });

    // 다른 곳 클릭 시 언어 메뉴 숨기기
    document.addEventListener('click', (e) => {
        if (!langSwitcher.contains(e.target) && e.target !== langToggleBtn) {
            langSwitcher.classList.add('hidden');
        }
    });

    changeLanguage(currentLang); // 페이지 로드 시 언어 적용


    // --- 부드러운 스크롤 ---
    function smoothScrollTo(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition + 1,
                behavior: 'smooth'
            });
        }
    }

    contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollTo('#contact');
    });

    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollTo('#home');
    });

    toTopBtn.addEventListener('click', (e) => {
         e.preventDefault();
         smoothScrollTo('#home');
    });

    // --- 스크롤 애니메이션 (Intersection Observer) ---
    const sections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null, // 뷰포트를 기준으로
        rootMargin: '0px',
        threshold: 0.15 // 15% 보이면 실행
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // 한 번만 실행되도록 관찰 중지
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });


    // --- 스크롤 이벤트 (네비바 & 맨 위로 버튼) ---
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // 네비바 숨김/표시 (선택 사항)
        /*
        if (currentScroll > lastScrollTop && currentScroll > navbar.offsetHeight){
           navbar.style.top = `-${navbar.offsetHeight + 5}px`;
        } else {
           navbar.style.top = "0";
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        */

        // 맨 위로 가기 버튼 표시/숨김
        if (window.scrollY > 300) { // 300px 이상 스크롤되면
            toTopBtn.classList.remove('hidden');
            toTopBtn.classList.add('visible');
        } else {
            toTopBtn.classList.remove('visible');
            toTopBtn.classList.add('hidden');
        }

    }, false);

});
