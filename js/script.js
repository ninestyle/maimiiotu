document.addEventListener('DOMContentLoaded', function() {

    // --- 요소 선택 ---
    const langSwitcher = document.getElementById('lang-switcher');
    const langButtons = langSwitcher.querySelectorAll('button');
    const elementsToTranslate = document.querySelectorAll('[data-lang]');
    const htmlTag = document.documentElement;
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

    changeLanguage(currentLang);

    // --- 부드러운 스크롤 ---
    function smoothScrollTo(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });

    // --- 스크롤 애니메이션 ---
    const sections = document.querySelectorAll('.fade-in-section');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    sections.forEach(section => { observer.observe(section); });

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


    // --- ✨ 홈 섹션 배경 슬라이더 추가 ✨ ---
    const slides = document.querySelectorAll('#home .slide');
    let currentSlideIndex = 0;
    const slideInterval = 5000; // 이미지 전환 간격 (5000ms = 5초)

    function showSlide(index) {
        slides.forEach((slide, i) => {
            // 모든 슬라이드의 active 클래스 제거
            slide.classList.remove('active');
        });
        // 해당 인덱스의 슬라이드에 active 클래스 추가
        slides[index].classList.add('active');
    }

    function nextSlide() {
        // 다음 슬라이드 인덱스 계산 (마지막이면 처음으로)
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
    }

    // 슬라이드가 2개 이상일 때만 슬라이더 실행
    if (slides.length > 1) {
        showSlide(currentSlideIndex); // 첫 번째 슬라이드 보여주기
        setInterval(nextSlide, slideInterval); // 일정 간격으로 nextSlide 함수 호출
    } else if (slides.length === 1) {
        showSlide(0); // 슬라이드가 하나면 그냥 보여주기
    }
    // --- 슬라이더 코드 끝 ---

});
