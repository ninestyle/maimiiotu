document.addEventListener('DOMContentLoaded', function() {

    // --- 요소 선택 ---
    const langSwitcher = document.getElementById('lang-switcher');
    const langButtons = langSwitcher.querySelectorAll('button');
    const elementsToTranslate = document.querySelectorAll('[data-lang]');
    const htmlTag = document.documentElement;
    const contactBtn = document.getElementById('contact-btn');
    const logoLink = document.querySelector('.logo');
    const navbar = document.getElementById('navbar');
    const toTopBtn = document.getElementById('to-top-btn');

    // --- 다국어 처리 ---
    let currentLang = localStorage.getItem('maimiiotu_lang') || 'en';

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
                // 아이콘은 그대로 두고 텍스트 부분만 변경 (span 태그를 사용하는 경우)
                const textSpan = el.querySelector('span:last-child');
                if (textSpan && el.querySelector('.material-symbols-outlined')) {
                    textSpan.innerHTML = languages[lang][key];
                } else if (el.tagName === 'TITLE') {
                    el.textContent = languages[lang][key];
                } else {
                    el.innerHTML = languages[lang][key];
                }
            }
        });

        updateActiveButton();
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

    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedLang = e.target.getAttribute('data-lang-set');
            changeLanguage(selectedLang);
        });
    });

    changeLanguage(currentLang); // 페이지 로드 시 언어 적용


    // --- 부드러운 스크롤 ---
    function smoothScrollTo(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition, // 1px 더하는 것 제거
                behavior: 'smooth'
            });
        }
    }

    // 모든 href="#" 링크에 스크롤 적용
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });


    // --- 스크롤 애니메이션 (Intersection Observer) ---
    const sections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 10% 보이면 실행 (좀 더 빨리 나타나도록)
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });


    // --- 스크롤 이벤트 (맨 위로 버튼) ---
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            toTopBtn.classList.remove('hidden');
            toTopBtn.classList.add('visible');
        } else {
            toTopBtn.classList.remove('visible');
            toTopBtn.classList.add('hidden');
        }
    }, false);

});
