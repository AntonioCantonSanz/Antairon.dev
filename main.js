
        // â”€â”€ CURSOR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const cursor = document.getElementById('cursor');
        const ring = document.getElementById('cursor-ring');
        const heroContent = document.querySelector('.hero-content');
        const aboutFrame = document.querySelector('.about-img-frame');
        let mx = 0, my = 0, rx = 0, ry = 0;

        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            cursor.style.left = mx + 'px';
            cursor.style.top = my + 'px';

            const px = (e.clientX / window.innerWidth - 0.5);
            const py = (e.clientY / window.innerHeight - 0.5);

            if (heroContent) {
                heroContent.style.transform = 'translate(' + (px * -12) + 'px, ' + (py * -10) + 'px)';
            }

            if (aboutFrame) {
                aboutFrame.style.transform = 'translate(' + (px * 8) + 'px, ' + (py * 8) + 'px)';
            }
        });

        function animRing() {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            ring.style.left = rx + 'px';
            ring.style.top = ry + 'px';
            requestAnimationFrame(animRing);
        }
        animRing();

        document.querySelectorAll('a, button, .skill-pill, .project-card, .service-card, .learning-card, .achievement-card, .project-link-btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                ring.style.width = '60px';
                ring.style.height = '60px';
                ring.style.opacity = '0.3';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '12px';
                cursor.style.height = '12px';
                ring.style.width = '40px';
                ring.style.height = '40px';
                ring.style.opacity = '0.5';
            });
        });

        // â”€â”€ NAV SCROLL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const nav = document.getElementById('nav');
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 60);
        });

        // â”€â”€ REVEAL ON SCROLL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('visible'), 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        reveals.forEach(el => observer.observe(el));

        // â”€â”€ COUNTER ANIMATION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        function animCount(el, target, duration = 1800) {
            let start = null;
            function step(ts) {
                if (!start) start = ts;
                const p = Math.min((ts - start) / duration, 1);
                const ease = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(ease * target);
                if (p < 1) requestAnimationFrame(step);
                else el.textContent = target;
            }
            requestAnimationFrame(step);
        }

        const statsSection = document.getElementById('stats');
        let statsDone = false;
        const statsObs = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !statsDone) {
                statsDone = true;
                animCount(document.getElementById('stat1'), 5);
                animCount(document.getElementById('stat2'), 4);
                animCount(document.getElementById('stat3'), 1);
                animCount(document.getElementById('stat4'), 4);
            }
        }, { threshold: 0.3 });
        statsObs.observe(statsSection);

        // â”€â”€ HERO TYPEWRITER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const roles = ['Estudiante', 'Desarrollador', 'Programador', 'Creador'];
        let rIdx = 0, cIdx = 0, deleting = false;
        const target = document.querySelector('.hero-name .glitch');

        if (target) {
            function typeLoop() {
                const word = roles[rIdx];
                if (!deleting) {
                    cIdx++;
                    target.textContent = word.slice(0, cIdx);
                    target.setAttribute('data-text', target.textContent);
                    if (cIdx === word.length) { deleting = true; setTimeout(typeLoop, 2000); return; }
                } else {
                    cIdx--;
                    target.textContent = word.slice(0, cIdx);
                    target.setAttribute('data-text', target.textContent);
                    if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
                }
                setTimeout(typeLoop, deleting ? 60 : 110);
            }
            setTimeout(typeLoop, 1800);
        }

        // â”€â”€ CAROUSEL AUTOMÃTICO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const slides = document.querySelectorAll('.about-img');
        if (slides.length > 0) {
            let slideIdx = 0;
            function rotateCarousel() {
                slides.forEach(slide => slide.classList.remove('active'));
                slideIdx = (slideIdx + 1) % slides.length;
                slides[slideIdx].classList.add('active');
            }
            setInterval(rotateCarousel, 4000);
        }

        // â”€â”€ HAMBURGER MOBILE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const ham = document.getElementById('hamburger');
        const navLinks = document.querySelector('.nav-links');
        ham.addEventListener('click', () => {
            const open = navLinks.style.display === 'flex';
            navLinks.style.display = open ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'fixed';
            navLinks.style.top = '70px';
            navLinks.style.right = '1.5rem';
            navLinks.style.background = 'rgba(6,6,8,0.95)';
            navLinks.style.border = '1px solid rgba(255,255,255,0.07)';
            navLinks.style.padding = '1.5rem';
            navLinks.style.gap = '1.5rem';
            navLinks.style.backdropFilter = 'blur(12px)';
            if (open) navLinks.style.display = 'none';
        });

        // â”€â”€ PARALLAX HERO GLOWS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        window.addEventListener('mousemove', e => {
            const glow1 = document.querySelector('.hero-glow');
            const glow2 = document.querySelector('.hero-glow2');
            if (!glow1) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            glow1.style.transform = `translate(${x}px, ${y}px)`;
            glow2.style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
        });

        // â”€â”€ MOBILE CV FLOATING CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const mobileCv = document.getElementById('mobile-cv');
        function toggleMobileCv() {
            if (!mobileCv) return;
            if (window.innerWidth > 900) {
                mobileCv.classList.remove('show');
                return;
            }
            if (window.scrollY > 320) mobileCv.classList.add('show');
            else mobileCv.classList.remove('show');
        }

        window.addEventListener('scroll', toggleMobileCv);
        window.addEventListener('resize', toggleMobileCv);
        toggleMobileCv();
    
