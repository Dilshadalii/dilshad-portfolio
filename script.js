// ============================================
//   DILSHAD ALI — MODEL CARD PORTFOLIO 2026
// ============================================

// ===== DATA =====
const data = {

    // §02 Experience — most recent first
    experience: [
        {
            id: 'RUN-01',
            status: 'complete',
            date: 'MAY 2026 — JUL 2026',
            role: 'AI/ML Intern',
            org: 'Khyber Pakhtunkhwa IT Board (KPITB)',
            loc: 'Peshawar, Pakistan',
            points: [
                'Worked on a computer vision project focused on brain angiography image recognition to help identify abnormalities.',
                'Applied Python and TensorFlow for model development.',
                'Gained hands-on experience with medical imaging data and deep learning workflows.'
            ],
            tags: ['Computer Vision', 'Python', 'TensorFlow', 'Medical Imaging']
        }
    ],

    // §03 Projects
    featuredProjects: [
        {
            title: 'Posture Correction System for Diabetic Exercise',
            subtitle: 'Real-time computer vision prototype',
            description: 'A computer vision prototype that uses real-time webcam input to help diabetic patients perform prescribed exercises with correct form. Uses MediaPipe for body landmark and pose detection, calculates joint angles in real time, and uses a CNN trained on medical exercise data to classify whether the posture is correct or incorrect — giving live feedback.',
            metrics: [
                { v: 'REAL-TIME', k: 'WEBCAM FEEDBACK' },
                { v: 'CNN', k: 'POSTURE CLASSIFICATION' }
            ],
            tags: ['Python', 'OpenCV', 'MediaPipe', 'CNN'],
            links: []
        },
        {
            title: 'House Price Prediction',
            subtitle: 'Regression on the classic Kaggle dataset',
            description: 'Built a regression model to predict house prices using the classic Kaggle House Prices dataset. Covered data cleaning, feature handling, and model training using linear regression.',
            metrics: [
                { v: 'LINEAR', k: 'REGRESSION MODEL' }
            ],
            tags: ['Python', 'Scikit-learn', 'Pandas'],
            links: []
        }
    ],

    // §04 Skills
    skills: [
        { group: 'LANGUAGES', items: ['Python', 'SQL', 'C++'] },
        { group: 'ML / AI', items: ['TensorFlow', 'Keras', 'Scikit-learn'] },
        { group: 'DATA & VISUALIZATION', items: ['Pandas', 'NumPy', 'Power BI', 'Matplotlib', 'Seaborn'] },
        { group: 'DATABASES & TOOLS', items: ['PostgreSQL', 'Git / GitHub', 'Jupyter', 'VS Code', 'Linux'] }
    ]
};

// ===== RENDERERS =====
function renderExperience() {
    const el = document.getElementById('experience-log');
    if (!el) return;
    el.innerHTML = data.experience.map(exp => `
        <li class="log-entry reveal ${exp.status === 'running' ? 'is-running' : ''}" id="${exp.id}">
            <div class="log-rail">
                <span class="log-id mono">${exp.id}</span>
                <span class="log-status mono ${exp.status === 'running' ? 'status-run' : 'status-done'}">
                    ${exp.status === 'running' ? '<span class="dot" aria-hidden="true"></span>RUNNING' : 'COMPLETE'}
                </span>
            </div>
            <div class="log-body">
                <p class="log-date mono">${exp.date}${exp.loc ? ` · ${exp.loc}` : ''}</p>
                <h3 class="log-role">${exp.role}</h3>
                <p class="log-org">${exp.org}</p>
                ${exp.points.length ? `<ul class="log-points">
                    ${exp.points.map(p => `<li>${p}</li>`).join('')}
                </ul>` : ''}
                <div class="tag-row">
                    ${exp.tags.map(t => `<span class="tag mono">${t}</span>`).join('')}
                </div>
            </div>
        </li>
    `).join('');
}

function renderFeatured() {
    const el = document.getElementById('featured-projects');
    if (!el) return;
    el.innerHTML = data.featuredProjects.map((p, i) => `
        <article class="eval-card reveal">
            <header class="eval-head">
                <span class="eval-id mono">P-${String(i + 1).padStart(2, '0')}</span>
                <div>
                    <h3 class="eval-title">${p.title}</h3>
                    <p class="eval-sub">${p.subtitle}</p>
                </div>
            </header>
            <p class="eval-desc">${p.description}</p>
            <div class="metric-row">
                ${p.metrics.map(m => `
                    <div class="metric">
                        <span class="metric-v">${m.v}</span>
                        <span class="metric-k mono">${m.k}</span>
                    </div>`).join('')}
            </div>
            <footer class="eval-foot">
                <div class="tag-row">${p.tags.map(t => `<span class="tag mono">${t}</span>`).join('')}</div>
                ${p.links.length ? `<div class="link-row">${p.links.map(l =>
                    `<a class="text-link mono" href="${l.url}" target="_blank" rel="noopener noreferrer">${l.name}</a>`).join('')}</div>` : ''}
            </footer>
        </article>
    `).join('');
}

function renderSkills() {
    const el = document.getElementById('skills-matrix');
    if (!el) return;
    el.innerHTML = data.skills.map(s => `
        <div class="cap-row reveal">
            <h3 class="cap-group mono">${s.group}</h3>
            <div class="tag-row">
                ${s.items.map(i => `<span class="tag tag-lg mono">${i}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// ===== INTERACTIONS =====
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupReveals() {
    const els = document.querySelectorAll('.reveal');
    if (reducedMotion || !('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('in'));
        return;
    }
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => obs.observe(el));
}

function setupSpecCard() {
    const rows = document.querySelectorAll('#spec-card .spec-row');
    if (reducedMotion) {
        rows.forEach(r => r.classList.add('in'));
        return;
    }
    rows.forEach((r, i) => setTimeout(() => r.classList.add('in'), 250 + i * 140));
}

function setupCounters() {
    const nums = document.querySelectorAll('[data-count]');
    if (reducedMotion || !('IntersectionObserver' in window)) {
        nums.forEach(n => { n.textContent = n.dataset.count; });
        return;
    }
    const animate = el => {
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const dur = 900;
        const t0 = performance.now();
        const tick = now => {
            const p = Math.min((now - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = (target * eased).toFixed(decimals);
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
        });
    }, { threshold: 0.5 });
    nums.forEach(n => obs.observe(n));
}

function setupNav() {
    const topbar = document.getElementById('topbar');
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('topbar-nav');

    window.addEventListener('scroll', () => {
        topbar.classList.toggle('scrolled', window.scrollY > 24);
    }, { passive: true });

    menuBtn.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        menuBtn.classList.toggle('open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            menuBtn.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');
    const spy = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                links.forEach(l => l.classList.toggle('active',
                    l.getAttribute('href') === `#${e.target.id}`));
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => spy.observe(s));
}

function setupForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form) return;

    // NOTE: This EmailJS key/service/template belong to Mihir's account —
    // the form will not actually send email until you set up your own
    // EmailJS account and replace these three values.
    const EMAILJS_PUBLIC_KEY = 'qT6B6jLTTyUb-mg92';
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const validators = {
        name: v => v.length >= 2 ? '' : 'Please enter your name.',
        email: v => EMAIL_RE.test(v) ? '' : 'Please enter a valid email address.',
        message: v => v.length >= 10 ? '' : 'Please write a message (at least 10 characters).'
    };

    const setFieldError = (field, msg) => {
        const input = form.elements[field];
        const errEl = document.getElementById(`${field}-error`);
        input.classList.toggle('invalid', !!msg);
        input.setAttribute('aria-invalid', msg ? 'true' : 'false');
        if (errEl) errEl.textContent = msg;
    };

    const validateField = field => {
        const msg = validators[field](form.elements[field].value.trim());
        setFieldError(field, msg);
        return !msg;
    };

    Object.keys(validators).forEach(field => {
        const input = form.elements[field];
        input.addEventListener('blur', () => {
            if (input.value.trim()) validateField(field);
        });
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) validateField(field);
        });
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();
        status.textContent = '';
        status.className = 'form-status mono';

        if (form.elements.company && form.elements.company.value) return;

        const fields = Object.keys(validators);
        const invalid = fields.filter(f => !validateField(f));
        if (invalid.length) {
            form.elements[invalid[0]].focus();
            status.textContent = '✗ PLEASE FIX THE HIGHLIGHTED FIELDS ABOVE.';
            status.className = 'form-status mono err';
            return;
        }

        if (typeof emailjs === 'undefined') {
            status.textContent = '✗ EMAIL SERVICE UNAVAILABLE — email me directly at dilshadali3d@gmail.com';
            status.className = 'form-status mono err';
            return;
        }

        const btn = form.querySelector('button[type="submit"]');
        const original = btn.textContent;
        btn.textContent = 'Sending…';
        btn.disabled = true;

        try {
            const payload = {
                from_name: form.elements.name.value.trim(),
                from_email: form.elements.email.value.trim(),
                message: form.elements.message.value.trim()
            };
            const res = await emailjs.send('service_kys8jha', 'template_0pjsd09', payload,
                { publicKey: EMAILJS_PUBLIC_KEY });
            if (res.status === 200) {
                status.textContent = '✓ MESSAGE SENT — I\'ll get back to you soon.';
                status.className = 'form-status mono ok';
                form.reset();
                fields.forEach(f => setFieldError(f, ''));
            } else {
                throw new Error('send failed');
            }
        } catch (err) {
            console.error('Contact form error:', err);
            status.textContent = '✗ SEND FAILED — email me directly at dilshadali3d@gmail.com';
            status.className = 'form-status mono err';
        } finally {
            btn.textContent = original;
            btn.disabled = false;
        }
    });
}

// ===== AWARD LAYER =====
const finePointer = window.matchMedia('(pointer: fine)').matches;

function runBoot(onDone) {
    const boot = document.getElementById('boot');
    const skip = reducedMotion || sessionStorage.getItem('mc-booted');
    if (!boot || skip) {
        if (boot) boot.remove();
        document.body.classList.add('booted');
        onDone();
        return;
    }
    document.body.classList.add('booting');
    const linesEl = document.getElementById('boot-lines');
    const pctEl = document.getElementById('boot-pct');
    const fillEl = document.getElementById('boot-fill');
    const lines = [
        'DILSHAD.ALI — SYSTEM INIT',
        'LOADING WEIGHTS ............. <span class="ok">OK</span>',
        'CALIBRATING TYPE ............ <span class="ok">OK</span>',
        'MOUNTING PROJECTS ........... <span class="ok">OK</span>',
        'HUMAN VERIFIED .............. <span class="ok">OK</span>'
    ];
    lines.forEach((l, i) => setTimeout(() => {
        const div = document.createElement('div');
        div.innerHTML = l;
        linesEl.appendChild(div);
    }, 120 + i * 170));

    const dur = 1250;
    const t0 = performance.now();
    const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 2);
        pctEl.textContent = Math.round(eased * 100) + '%';
        fillEl.style.width = (eased * 100) + '%';
        if (p < 1) { requestAnimationFrame(tick); return; }
        sessionStorage.setItem('mc-booted', '1');
        boot.classList.add('done');
        document.body.classList.remove('booting');
        document.body.classList.add('booted');
        setTimeout(() => boot.remove(), 750);
        onDone();
    };
    requestAnimationFrame(tick);
}

function splitHeroName() {
    const h1 = document.getElementById('hero-name');
    if (!h1) return;
    let idx = 0;
    h1.innerHTML = ['Dilshad', 'Ali'].map(word =>
        `<span class="hn-line" aria-hidden="true">${[...word].map(c =>
            `<span class="ch" style="--d:${(idx++ * 0.035).toFixed(3)}s">${c}</span>`).join('')}</span>`
    ).join('');
}

function setupKineticName() {
    if (reducedMotion || !finePointer) return;
    const hero = document.querySelector('.hero');
    const chars = [...document.querySelectorAll('#hero-name .ch')];
    if (!hero || !chars.length) return;
    let raf = null, mx = 0, my = 0;
    const RADIUS = 220;
    const update = () => {
        raf = null;
        chars.forEach(ch => {
            const r = ch.getBoundingClientRect();
            const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
            const t = Math.max(0, 1 - d / RADIUS);
            ch.style.fontVariationSettings = t > 0.01
                ? `'wght' ${(850 - 330 * t).toFixed(0)}, 'wdth' ${(125 - 45 * t).toFixed(1)}`
                : '';
        });
    };
    hero.addEventListener('pointermove', e => {
        mx = e.clientX; my = e.clientY;
        if (!raf) raf = requestAnimationFrame(update);
    });
    hero.addEventListener('pointerleave', () => {
        chars.forEach(ch => { ch.style.fontVariationSettings = ''; });
    });
}

function setupCtaTip() {
    if (!finePointer) return;
    const cta = document.querySelector('.contact-big');
    const tip = document.getElementById('cta-tip');
    if (!cta || !tip) return;
    cta.addEventListener('pointermove', e => {
        tip.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }, { passive: true });
    cta.addEventListener('pointerenter', () => tip.classList.add('on'));
    cta.addEventListener('pointerleave', () => tip.classList.remove('on'));
}

function setupScramble() {
    const els = document.querySelectorAll('[data-scramble]');
    if (!els.length || reducedMotion || !('IntersectionObserver' in window)) return;
    const CHARS = '█▓▒░<>/[]{}=+*#01';
    const scramble = el => {
        const text = el.textContent;
        const dur = 650;
        const t0 = performance.now();
        const tick = now => {
            const p = Math.min((now - t0) / dur, 1);
            const settled = Math.floor(p * text.length);
            el.textContent = [...text].map((c, i) =>
                i < settled || c === ' ' ? c : CHARS[Math.random() * CHARS.length | 0]).join('');
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = text;
        };
        requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { scramble(e.target); obs.unobserve(e.target); }
        });
    }, { threshold: 0.6 });
    els.forEach(el => obs.observe(el));
}

function setupScrolling() {
    const progress = document.getElementById('progress');
    if (!progress) return;
    let raf = null;
    const updateProgress = () => {
        raf = null;
        const max = document.documentElement.scrollHeight - innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
    };
    window.addEventListener('scroll', () => {
        if (!raf) raf = requestAnimationFrame(updateProgress);
    }, { passive: true });
    updateProgress();
}

function setupMarquee() {
    const track = document.getElementById('marquee-track');
    if (track) track.innerHTML += track.innerHTML;
}

function setupMagnetic() {
    if (reducedMotion || !finePointer) return;
    document.querySelectorAll('.btn, .theme-btn').forEach(el => {
        el.addEventListener('pointermove', e => {
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            el.style.transform = `translate(${dx * 0.16}px, ${dy * 0.3}px)`;
        });
        el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
}

function setupTilt() {
    if (reducedMotion || !finePointer) return;
    const wrap = document.querySelector('.hero-photo-wrap');
    const img = document.querySelector('.hero-photo');
    if (!wrap || !img) return;
    wrap.addEventListener('pointermove', e => {
        const r = wrap.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        img.style.transform = `perspective(700px) rotateY(${(px * 6).toFixed(2)}deg) rotateX(${(-py * 6).toFixed(2)}deg)`;
    });
    wrap.addEventListener('pointerleave', () => { img.style.transform = ''; });
}

function setupTheme() {
    const btn = document.getElementById('theme-btn');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!btn) return;
    const root = document.documentElement;
    const apply = (mode, animate) => {
        if (animate) {
            root.classList.add('theme-anim');
            setTimeout(() => root.classList.remove('theme-anim'), 400);
        }
        root.setAttribute('data-theme', mode);
        btn.textContent = mode === 'dark' ? 'LIGHT' : 'DARK';
        btn.setAttribute('aria-pressed', String(mode === 'dark'));
        if (meta) meta.setAttribute('content', mode === 'dark' ? '#101116' : '#F2F1EB');
    };
    apply(root.getAttribute('data-theme') || 'light', false);
    btn.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('mc-theme', next); } catch (e) { /* private mode */ }
        apply(next, true);
    });
}

function setupCopyEmail() {
    const btn = document.getElementById('copy-email');
    if (!btn || !navigator.clipboard) return;
    let timer;
    btn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(btn.dataset.email);
            btn.textContent = 'COPIED ✓';
            btn.classList.add('copied');
            clearTimeout(timer);
            timer = setTimeout(() => {
                btn.textContent = 'COPY';
                btn.classList.remove('copied');
            }, 1800);
        } catch (e) { /* clipboard unavailable — mailto link still works */ }
    });
}

function setupClock() {
    const el = document.getElementById('local-time');
    if (!el) return;
    const fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Karachi', hour12: false,
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    const tick = () => { el.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 1000);
}

function consoleEgg() {
    console.log(
        '%c DILSHAD.ALI %c You opened the console — clearly we should talk.\n' +
        '%c → dilshadali3d@gmail.com · github.com/Dilshadalii',
        'background:#1828CE;color:#F2F1EB;font-weight:bold;padding:4px 8px;',
        'color:inherit;padding:4px 0;',
        'color:#1828CE;padding:2px 0;'
    );
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderExperience();
    renderFeatured();
    renderSkills();
    splitHeroName();

    setupTheme();
    setupNav();
    setupForm();
    setupMarquee();
    setupClock();
    setupCopyEmail();
    setupScrolling();
    setupCtaTip();
    setupMagnetic();
    setupTilt();
    setupKineticName();
    consoleEgg();

    runBoot(() => {
        setupSpecCard();
        setupReveals();
        setupCounters();
        setupScramble();
    });
});