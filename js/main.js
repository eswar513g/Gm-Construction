/**
 * GM CONSTRUCTIONS — Master JavaScript
 * Handles dynamic data rendering, portfolio filtering, modal popups,
 * interactive cost calculator, before/after slider, and form submissions.
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.SITE_CONFIG || {};

  // 1. Initialize Site-wide Dynamic Data from config.js
  initSiteConfig(config);
  initAnalytics(config);
  trackPageVisit(config);

  // 2. Navigation & Sticky Header
  initNavigation();

  // 3. Render Dynamic Content
  renderStats(config.statistics);
  renderServices(config.services);
  renderProjects(config.projects);
  renderWhyChooseUs(config.whyChooseUs);
  renderFleet(config.machinery);
  renderTestimonials(config.testimonials);
  renderFAQs(config.faqs);

  // 4. Portfolio Filter System
  initPortfolioFilters();

  // 5. Interactive Before & After Slider
  initBeforeAfterSlider();

  // 6. Interactive Cost Estimator Calculator
  initCostCalculator(config.calculatorRates);

  // 7. Animated Statistics Counters
  initStatsCounters();

  // 8. Modals System (Project Details & Quick Quote)
  initModals();

  // 9. Contact & Quote Forms Validation & Submission
  initForms(config);

  // 10. Back to Top Button
  initBackToTop();
});

function initAnalytics(config) {
  const measurementId = String(config.analyticsMeasurementId || '').trim();
  if (!measurementId || !/^G-[A-Z0-9]+$/i.test(measurementId)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

function trackPageVisit(config) {
  const apiBaseUrl = String(config.apiBaseUrl || '').trim().replace(/\/$/, '');
  if (!apiBaseUrl) return;
  fetch(`${apiBaseUrl}/api/visit`, { method: 'POST', keepalive: true }).catch(() => {});
}

/* ==========================================================================
   1. Site Configuration Binding
   ========================================================================== */
function initSiteConfig(config) {
  if (!config) return;

  // Update company name
  if (config.companyName) {
    document.querySelectorAll('[data-bind="company-name"]').forEach(el => {
      el.textContent = config.companyName;
    });
  }

  // Update phone numbers
  if (config.phoneDisplay) {
    document.querySelectorAll('[data-bind="phone-display"]').forEach(el => {
      el.textContent = config.phoneDisplay;
    });
  }
  // Update phone links
  if (config.phoneRaw) {
    const cleanPhone = String(config.phoneRaw).replace(/\s+/g, '');
    document.querySelectorAll('[data-bind="phone-link"]').forEach(el => {
      el.setAttribute('href', `tel:${cleanPhone}`);
    });
  }

  // Update WhatsApp links
  if (config.whatsappNumber) {
    const cleanWa = String(config.whatsappNumber).replace(/\D/g, '');
    const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(config.whatsappPrefilledMessage || '')}`;
    document.querySelectorAll('[data-bind="whatsapp-link"]').forEach(el => {
      el.setAttribute('href', waUrl);
    });
  }

  // Update Email
  if (config.email) {
    document.querySelectorAll('[data-bind="email-display"]').forEach(el => {
      el.textContent = config.email;
    });
    document.querySelectorAll('[data-bind="email-link"]').forEach(el => {
      el.setAttribute('href', `mailto:${config.email}`);
    });
  }

  // Update Address & Hours
  if (config.address) {
    document.querySelectorAll('[data-bind="address-display"]').forEach(el => {
      el.textContent = config.address;
    });
  }
  if (config.businessHours) {
    document.querySelectorAll('[data-bind="hours-display"]').forEach(el => {
      el.textContent = config.businessHours;
    });
  }
  if (config.googleMapsUrl) {
    document.querySelectorAll('[data-bind="maps-link"]').forEach(el => {
      el.setAttribute('href', config.googleMapsUrl);
    });
  }

  // Update Social Links
  if (config.socials) {
    if (config.socials.facebook) {
      document.querySelectorAll('[data-bind="social-facebook"]').forEach(el => el.setAttribute('href', config.socials.facebook));
    }
    if (config.socials.instagram) {
      document.querySelectorAll('[data-bind="social-instagram"]').forEach(el => el.setAttribute('href', config.socials.instagram));
    }
    if (config.socials.linkedin) {
      document.querySelectorAll('[data-bind="social-linkedin"]').forEach(el => el.setAttribute('href', config.socials.linkedin));
    }
    if (config.socials.youtube) {
      document.querySelectorAll('[data-bind="social-youtube"]').forEach(el => el.setAttribute('href', config.socials.youtube));
    }
  }

  // Update stats if present
  if (config.statistics && config.statistics.length > 0) {
    const expStat = config.statistics[0];
    const floatExp = document.getElementById('floatingExpCount');
    if (floatExp && expStat) {
      floatExp.textContent = `${expStat.value}${expStat.suffix || '+'}`;
    }
  }
}

/* ==========================================================================
   2. Navigation & Sticky Header
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  mobileToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('mobile-open');
    const isOpen = navMenu?.classList.contains('mobile-open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('mobile-open');
    });
  });
}

/* ==========================================================================
   3. Render Services Grid
   ========================================================================== */
function renderServices(services) {
  const container = document.getElementById('services-grid-container');
  if (!container || !services) return;

  container.innerHTML = services.map(service => `
    <article class="service-card" data-service-id="${service.id}">
      <div class="service-image-box">
        <img src="${service.image}" alt="${service.title}" class="service-img" loading="lazy">
        <div class="service-icon-badge" aria-hidden="true">
          ${getSvgIcon(service.icon)}
        </div>
      </div>
      <div class="service-body">
        <h3 class="service-title">${service.title}</h3>
        <p class="service-tagline">${service.tagline}</p>
        <p class="service-desc">${service.description}</p>
        <div class="service-features-list">
          ${service.features.slice(0, 3).map(f => `
            <div class="service-feature-item">
              <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
              <span>${f}</span>
            </div>
          `).join('')}
        </div>
        <div class="service-footer">
          <button type="button" class="btn-sm btn-primary service-enquire-trigger" data-service="${service.title}">
            Enquire Now
          </button>
          <a href="#contact" class="service-enquire-btn">
            Details
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>
      </div>
    </article>
  `).join('');

  // Wire Enquire Now buttons to open quote form with that service selected
  container.querySelectorAll('.service-enquire-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = e.currentTarget.getAttribute('data-service');
      openQuoteForService(serviceName);
    });
  });
}

/* ==========================================================================
   4. Render Projects & Gallery
   ========================================================================== */
function renderProjects(projects) {
  const container = document.getElementById('projects-grid-container');
  if (!container || !projects) return;

  container.innerHTML = projects.map(proj => `
    <article class="project-card" data-category="${proj.category}" data-id="${proj.id}">
      <div class="project-thumbnail">
        <img src="${proj.image}" alt="${proj.title}" loading="lazy">
        <span class="project-status-badge ${proj.status.toLowerCase().includes('ongoing') ? 'ongoing' : 'completed'}">
          ${proj.status}
        </span>
        <span class="project-category-badge">${proj.categoryLabel}</span>
      </div>
      <div class="project-info">
        <h3 class="project-title">${proj.title}</h3>
        <div class="project-meta">
          <span class="project-meta-item">
            <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            ${proj.location}
          </span>
          <span class="project-meta-item">
            <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
            ${proj.area}
          </span>
        </div>
        <p class="project-summary">${proj.description}</p>
        <div class="project-footer">
          <span class="project-view-cta">
            View Project Details
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </span>
          <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted-dark);">${proj.timeline}</span>
        </div>
      </div>
    </article>
  `).join('');

  // Wire project card click for modal preview
  container.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-id');
      const project = projects.find(p => p.id === projId);
      if (project) openProjectModal(project);
    });
  });
}

/* ==========================================================================
   5. Portfolio Filter Buttons
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. Before & After Interactive Slider
   ========================================================================== */
function initBeforeAfterSlider() {
  const rangeInput = document.getElementById('beforeAfterRange');
  const afterWrapper = document.getElementById('afterWrapper');
  const sliderHandle = document.getElementById('sliderHandle');

  if (!rangeInput || !afterWrapper || !sliderHandle) return;

  rangeInput.addEventListener('input', (e) => {
    const val = e.target.value;
    afterWrapper.style.width = `${val}%`;
    sliderHandle.style.left = `${val}%`;
  });
}

/* ==========================================================================
   7. Interactive Construction Cost Estimator
   ========================================================================== */
function initCostCalculator(rates) {
  if (!rates) return;

  const typeButtons = document.querySelectorAll('.calc-type-btn');
  const tierCards = document.querySelectorAll('.calc-tier-card');
  const areaSlider = document.getElementById('calcAreaSlider');
  const areaValueDisplay = document.getElementById('calcAreaVal');
  const estimatedTotalDisplay = document.getElementById('calcEstimatedTotal');
  const ratePerSqFtDisplay = document.getElementById('calcRatePerSqFt');
  const summaryTypeDisplay = document.getElementById('calcSummaryType');
  const summaryTierDisplay = document.getElementById('calcSummaryTier');
  const applyQuoteBtn = document.getElementById('calcApplyQuoteBtn');

  let currentType = 'residential';
  let currentTier = 'premium';
  let currentArea = 2500;

  function recalculate() {
    const rate = rates[currentType]?.[currentTier] || 2200;
    const total = currentArea * rate;

    // Formatting in Indian currency (Lakhs / Crores) or localized format
    let formattedTotal = '';
    if (total >= 10000000) {
      formattedTotal = `₹ ${(total / 10000000).toFixed(2)} Cr`;
    } else if (total >= 100000) {
      formattedTotal = `₹ ${(total / 100000).toFixed(2)} Lakhs`;
    } else {
      formattedTotal = `₹ ${total.toLocaleString('en-IN')}`;
    }

    if (estimatedTotalDisplay) estimatedTotalDisplay.textContent = formattedTotal;
    if (ratePerSqFtDisplay) ratePerSqFtDisplay.textContent = `₹ ${rate.toLocaleString('en-IN')}/sq.ft`;
    if (summaryTypeDisplay) summaryTypeDisplay.textContent = capitalizeFirstLetter(currentType);
    if (summaryTierDisplay) summaryTierDisplay.textContent = capitalizeFirstLetter(currentTier);
  }

  // Type Selector
  typeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      typeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentType = btn.getAttribute('data-type');
      recalculate();
    });
  });

  // Tier Selector
  tierCards.forEach(card => {
    card.addEventListener('click', () => {
      tierCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentTier = card.getAttribute('data-tier');
      recalculate();
    });
  });

  // Slider change
  areaSlider?.addEventListener('input', (e) => {
    currentArea = parseInt(e.target.value, 10);
    if (areaValueDisplay) areaValueDisplay.textContent = `${currentArea.toLocaleString('en-IN')} sq. ft.`;
    recalculate();
  });

  // Transfer calculated values to Quote Form
  applyQuoteBtn?.addEventListener('click', () => {
    const projectTypeSelect = document.getElementById('quoteProjectType');
    const messageBox = document.getElementById('quoteMessage');

    if (projectTypeSelect) {
      projectTypeSelect.value = capitalizeFirstLetter(currentType);
    }
    if (messageBox) {
      messageBox.value = `Estimated Project Scope: ${currentArea} Sq. Ft. ${capitalizeFirstLetter(currentType)} Construction (${capitalizeFirstLetter(currentTier)} package). Please provide an itemized Bill of Quantities (BOQ) and schedule an on-site consultation.`;
    }

    // Smooth scroll to form
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
    showToast("Calculator estimate copied to Quote Form!");
  });

  recalculate();
}

/* ==========================================================================
   8. Animated Statistics Counters
   ========================================================================== */
function initStatsCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(num => {
          const target = parseInt(num.getAttribute('data-target'), 10);
          const suffix = num.getAttribute('data-suffix') || '';
          let current = 0;
          const increment = Math.ceil(target / 45);
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            num.textContent = `${current}${suffix}`;
          }, 35);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-strip');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   9. Render Supporting Sections (Stats, Why Choose Us, Fleet, Testimonials, FAQs)
   ========================================================================== */
function renderStats(statistics) {
  const container = document.querySelector('#stats-section .stats-grid');
  if (!container || !statistics || !statistics.length) return;

  container.innerHTML = statistics.map(stat => `
    <div class="stat-card">
      <div class="stat-number" data-target="${stat.value}" data-suffix="${stat.suffix || ''}">0${stat.suffix || '+'}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
}

function renderWhyChooseUs(items) {
  const container = document.getElementById('why-grid-container');
  if (!container || !items) return;

  container.innerHTML = items.map(item => `
    <div class="why-card">
      <div class="why-icon-box">
        ${getSvgIcon(item.icon)}
      </div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>
  `).join('');
}

function renderFleet(machinery) {
  const container = document.getElementById('fleet-grid-container');
  if (!container || !machinery) return;

  container.innerHTML = machinery.map(m => `
    <div class="fleet-card">
      <div class="fleet-header">
        <h4 class="fleet-title">${m.name}</h4>
        <span class="fleet-count">${m.count}</span>
      </div>
      <p class="fleet-desc">${m.desc}</p>
    </div>
  `).join('');
}

function renderTestimonials(testimonials) {
  const container = document.getElementById('testimonials-grid-container');
  if (!container || !testimonials) return;

  container.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <svg class="testimonial-quote-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
      </svg>
      <p class="testimonial-text">"${t.comment}"</p>
      <div class="testimonial-author">
        <img src="${t.avatar}" alt="${t.name}" class="author-avatar" loading="lazy">
        <div>
          <h4 class="author-name">${t.name}</h4>
          <p class="author-role">${t.role} • <span style="color:var(--color-accent); font-weight:600;">${t.project}</span></p>
          <div class="stars-rating" style="margin-top:4px;">
            ${'★'.repeat(t.rating)}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderFAQs(faqs) {
  const container = document.getElementById('faq-wrapper-container');
  if (!container || !faqs) return;

  container.innerHTML = faqs.map((faq, index) => `
    <div class="faq-item ${index === 0 ? 'active' : ''}">
      <button type="button" class="faq-question">
        <span>${faq.q}</span>
        <span class="faq-icon">
          <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </span>
      </button>
      <div class="faq-answer">
        <p>${faq.a}</p>
      </div>
    </div>
  `).join('');

  // Accordion toggle
  container.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasActive = item.classList.contains('active');

      // Close all
      container.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   10. Modals System (Project Details & Quote Trigger)
   ========================================================================== */
function initModals() {
  const modalBackdrop = document.getElementById('projectDetailModal');
  const closeBtn = document.getElementById('closeProjectModal');

  closeBtn?.addEventListener('click', () => {
    modalBackdrop?.classList.remove('active');
  });

  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalBackdrop?.classList.remove('active');
    }
  });
}

function openProjectModal(project) {
  const modalBackdrop = document.getElementById('projectDetailModal');
  const modalBody = document.getElementById('projectModalContent');
  if (!modalBackdrop || !modalBody) return;

  modalBody.innerHTML = `
    <div style="position:relative; margin:-36px -36px 24px -36px; height:380px; max-height:420px; background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%); overflow:hidden; border-radius:18px 18px 0 0; display:flex; align-items:center; justify-content:center;">
      <img src="${project.image}" alt="${project.title}" style="width:100%; height:100%; object-fit:contain;">
      <span class="project-status-badge ${project.status.toLowerCase().includes('ongoing') ? 'ongoing' : 'completed'}" style="position:absolute; bottom:16px; left:16px;">
        ${project.status}
      </span>
    </div>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
      <span class="section-tag">${project.categoryLabel}</span>
      <span style="font-weight:700; color:var(--color-accent); font-size:0.95rem;">Timeline: ${project.timeline}</span>
    </div>
    <h2 style="font-size:1.85rem; margin-bottom:12px; color:var(--text-primary-dark);">${project.title}</h2>
    <p style="display:flex; align-items:center; gap:8px; color:var(--text-muted-dark); font-size:0.95rem; margin-bottom:18px;">
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
      <strong>Location:</strong> ${project.location} • <strong>Total Built Area:</strong> ${project.area}
    </p>
    <p style="font-size:1.02rem; color:var(--text-secondary-dark); line-height:1.65; margin-bottom:24px;">
      ${project.description}
    </p>
    <div style="background-color:var(--bg-light); padding:20px; border-radius:12px; margin-bottom:28px;">
      <h4 style="margin-bottom:12px; font-size:1.05rem;">Key Engineering & Design Highlights</h4>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px;">
        ${project.highlights.map(h => `
          <div style="display:flex; align-items:center; gap:8px; font-size:0.88rem; color:var(--text-primary-dark);">
            <svg width="16" height="16" stroke="var(--color-success)" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            <span>${h}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div style="display:flex; gap:16px; flex-wrap:wrap;">
      <button type="button" class="btn btn-primary" id="modalEnquireSimilarBtn" style="flex:1;">
        Enquire About Similar Project
      </button>
      <a href="https://wa.me/${String(window.SITE_CONFIG?.whatsappNumber || '').replace(/\D/g, '')}?text=${encodeURIComponent(`Hi GM Constructions, I am interested in knowing more details about the ${project.title} project.`)}" target="_blank" class="btn btn-dark" style="display:inline-flex; align-items:center; gap:8px;">
        WhatsApp Inquiry
      </a>
    </div>
  `;

  modalBackdrop.classList.add('active');

  document.getElementById('modalEnquireSimilarBtn')?.addEventListener('click', () => {
    modalBackdrop.classList.remove('active');
    openQuoteForService(project.categoryLabel, `Interested in custom construction similar to ${project.title} (${project.location}).`);
  });
}

function openQuoteForService(serviceName, customMessage) {
  const contactSection = document.getElementById('contact');
  const projectTypeSelect = document.getElementById('quoteProjectType');
  const messageBox = document.getElementById('quoteMessage');

  if (projectTypeSelect && serviceName) {
    // Try matching select options
    for (let i = 0; i < projectTypeSelect.options.length; i++) {
      if (serviceName.toLowerCase().includes(projectTypeSelect.options[i].value.toLowerCase())) {
        projectTypeSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (messageBox && customMessage) {
    messageBox.value = customMessage;
  } else if (messageBox && serviceName) {
    messageBox.value = `I would like to enquire about your ${serviceName} service and request a site inspection/estimate.`;
  }

  contactSection?.scrollIntoView({ behavior: 'smooth' });
}

/* ==========================================================================
   11. Contact & Quote Forms Submission Handling
   ========================================================================== */
function initForms(config) {
  const quoteForm = document.getElementById('mainQuoteForm');
  if (!quoteForm) return;

  quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('quoteName')?.value.trim();
    const phone = document.getElementById('quotePhone')?.value.trim();
    const email = document.getElementById('quoteEmail')?.value.trim();
    const type = document.getElementById('quoteProjectType')?.value;
    const location = document.getElementById('quoteLocation')?.value.trim();
    const message = document.getElementById('quoteMessage')?.value.trim();

    // Validation
    if (!name) {
      alert("Please enter your full name.");
      return;
    }
    if (!phone || phone.length < 8) {
      alert("Please enter a valid contact phone number.");
      return;
    }

    const submitBtn = quoteForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="btn-icon" style="animation:spin 1s linear infinite" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
      Processing Request...
    `;

    const formEndpoint = String(config.enquiryFormEndpoint || '').trim();
    const apiBaseUrl = String(config.apiBaseUrl || '').trim().replace(/\/$/, '');
    const hasFormspree = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(formEndpoint);
    if (!hasFormspree && !apiBaseUrl) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      showToast('The enquiry form is not configured yet. Please call or WhatsApp us directly.');
      return;
    }

    try {
      if (hasFormspree) {
        const response = await fetch(formEndpoint, {
          method: 'POST',
          body: new FormData(quoteForm),
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error('Form submission failed');
      }

      if (apiBaseUrl) {
        await fetch(`${apiBaseUrl}/api/enquiry`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, email, projectType: type, location, message })
        });
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      quoteForm.reset();
      showToast(`Thank you, ${name}! Your quote request has been received. Our project team will call you at ${phone} within 2 business hours.`);

      // Optional quick handover prompt to open WhatsApp
      const userConfirmWa = confirm("Your quote enquiry is recorded! Would you also like to send this enquiry directly to GM Constructions on WhatsApp for instant response?");
      if (userConfirmWa) {
        const waMsg = `Hi GM Constructions, I just requested a quote on your website:\n- Name: ${name}\n- Phone: ${phone}\n- Project Type: ${type}\n- Location: ${location || 'N/A'}\n- Message: ${message || 'Site consultation requested'}`;
        window.open(`https://wa.me/${String(config.whatsappNumber || '').replace(/\D/g, '')}?text=${encodeURIComponent(waMsg)}`, '_blank');
      }
    } catch (error) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      showToast('We could not send your enquiry. Please call or WhatsApp us directly.');
    }
  });
}

function showToast(message) {
  let toast = document.getElementById('liveToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'liveToast';
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <span class="toast-icon">
        <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
      </span>
      <span class="toast-msg">${message}</span>
    `;
    document.body.appendChild(toast);
  } else {
    toast.querySelector('.toast-msg').textContent = message;
  }

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ==========================================================================
   12. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backBtn = document.getElementById('backToTopBtn');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   Helper Utilities
   ========================================================================== */
function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getSvgIcon(name) {
  switch (name) {
    case 'home':
      return `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`;
    case 'building':
      return `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`;
    case 'layers':
      return `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`;
    case 'tool':
      return `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`;
    case 'truck':
      return `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10h10zm0 0h5l3-4v-3h-8v7z"/></svg>`;
    case 'brush':
      return `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4 7 7 0 017-7h4a7 7 0 017 7 4 4 0 01-4 4H7zM7 3v4m10-4v4"/></svg>`;
    case 'wrench':
      return `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`;
    case 'compass':
      return `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>`;
    case 'shield-check':
      return `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`;
    case 'users':
      return `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`;
    case 'calendar-clock':
      return `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`;
    case 'cube':
      return `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`;
    case 'chart-line':
      return `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>`;
    case 'heart-handshake':
      return `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke-width="2"/></svg>`;
  }
}
