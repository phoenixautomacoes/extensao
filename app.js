/**
 * Phoenix Video Downloader — Landing Page Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordion();
  initMobileMenu();
  initSmoothScroll();
});

/* ================= FAQ ACCORDION ================= */
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-btn');

  faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const content = item.querySelector('.faq-content');
      const isOpen = item.classList.contains('active');

      // Close other open items
      document.querySelectorAll('.faq-item').forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherContent) otherContent.classList.add('hidden');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('active');
        content.classList.add('hidden');
      } else {
        item.classList.add('active');
        content.classList.remove('hidden');
      }
    });
  });
}

/* ================= MOBILE NAVIGATION MENU ================= */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.add('hidden');
  }
}

/* ================= SMOOTH SCROLL ================= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    });
  });
}

/* ================= INTERACTIVE SIMULATOR ================= */
function simulateDownload(buttonElement, qualityLabel) {
  const streamCard = buttonElement.closest('.stream-item');
  if (!streamCard) return;

  const progressContainer = streamCard.querySelector('.progress-container');
  const progressBar = streamCard.querySelector('.progress-bar');
  const progressStatus = streamCard.querySelector('.progress-status');
  const progressPct = streamCard.querySelector('.progress-pct');

  if (!progressContainer || buttonElement.disabled) return;

  // Set downloading state
  buttonElement.disabled = true;
  buttonElement.classList.add('downloading');
  buttonElement.innerHTML = `
    <svg class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span>Baixando...</span>
  `;

  progressContainer.classList.remove('hidden');
  let currentProgress = 0;

  const interval = setInterval(() => {
    currentProgress += Math.floor(Math.random() * 15) + 10;

    if (currentProgress < 30) {
      progressStatus.textContent = 'Conectando aos segmentos HLS...';
    } else if (currentProgress < 75) {
      progressStatus.textContent = 'Baixando fragmentos multithread...';
    } else if (currentProgress < 99) {
      progressStatus.textContent = 'Mesclando faixas de áudio e vídeo...';
    }

    if (currentProgress >= 100) {
      currentProgress = 100;
      clearInterval(interval);
      progressBar.style.width = '100%';
      progressPct.textContent = '100%';
      progressStatus.textContent = 'Download concluído com sucesso!';

      buttonElement.classList.remove('downloading');
      buttonElement.classList.add('completed');
      buttonElement.innerHTML = `
        <svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
        <span>Salvo</span>
      `;

      showToast(`Phoenix Video Downloader: Arquivo ${qualityLabel} salvo!`, 'success');

      // Reset after 6 seconds so user can test again
      setTimeout(() => {
        buttonElement.disabled = false;
        buttonElement.classList.remove('completed');
        buttonElement.innerHTML = `
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          <span>Baixar</span>
        `;
        progressContainer.classList.add('hidden');
        progressBar.style.width = '0%';
      }, 6000);
    } else {
      progressBar.style.width = `${currentProgress}%`;
      progressPct.textContent = `${currentProgress}%`;
    }
  }, 350);
}

/* ================= MODAL LOGIC ================= */
function openInstallModal() {
  const modal = document.getElementById('installModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeInstallModal() {
  const modal = document.getElementById('installModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function confirmInstall() {
  const btn = document.getElementById('confirmInstallBtn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `
      <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Iniciando Download...</span>
    `;

    // Trigger download of the extension zip
    const link = document.createElement('a');
    link.href = 'Phoenix_Video_Downloader_v10.5.49.7.zip';
    link.download = 'Phoenix_Video_Downloader_v10.5.49.7.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      btn.classList.remove('bg-slate-900', 'hover:bg-slate-800');
      btn.classList.add('bg-emerald-600', 'text-white');
      btn.innerHTML = `
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
        <span>Download Concluído! Abrindo Instruções...</span>
      `;

      showToast('Download do Phoenix Video Downloader iniciado com sucesso!', 'success');

      setTimeout(() => {
        closeInstallModal();
        btn.disabled = false;
        btn.classList.add('bg-slate-900', 'hover:bg-slate-800');
        btn.classList.remove('bg-emerald-600');
        btn.innerHTML = `<img src="chrome.png" alt="Chrome" class="w-4 h-4 object-contain flex-shrink-0"><span>Baixar Phoenix Video Downloader</span>`;
        window.location.href = '/welcome';
      }, 1200);
    }, 1200);
  }
}

function openSupportModal() {
  const modal = document.getElementById('supportModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeSupportModal() {
  const modal = document.getElementById('supportModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

async function handleSupportSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('supportUserEmail');
  const msgInput = document.getElementById('supportUserMsg');
  const userEmail = emailInput ? emailInput.value : '';
  const userMsg = msgInput ? msgInput.value : '';
  const submitBtn = e.target.querySelector('button[type="submit"]');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Enviando...';
  }

  const payload = {
    "E-mail": userEmail,
    "Mensagem": userMsg,
    "_subject": `[Suporte Rápido] ${userEmail}`,
    "_replyto": userEmail,
    "_template": "table",
    "_captcha": "false"
  };

  try {
    await fetch('https://formsubmit.co/ajax/extensao@phoenixautomacoes.com.br', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error('Erro ao enviar suporte:', err);
  } finally {
    closeSupportModal();
    showToast('Mensagem enviada com sucesso para extensao@phoenixautomacoes.com.br!', 'success');
  }
}

// Close modals on Escape or Backdrop click
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeInstallModal();
    closeSupportModal();
  }
});

const installModal = document.getElementById('installModal');
if (installModal) {
  installModal.addEventListener('click', (e) => {
    if (e.target === installModal) closeInstallModal();
  });
}

const supportModal = document.getElementById('supportModal');
if (supportModal) {
  supportModal.addEventListener('click', (e) => {
    if (e.target === supportModal) closeSupportModal();
  });
}

/* ================= TOAST NOTIFICATION ================= */
let toastTimeout;
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = document.getElementById('toastIcon');

  if (!toast || !toastMsg) return;

  clearTimeout(toastTimeout);
  toastMsg.textContent = message;

  if (toastIcon) {
    if (type === 'success') {
      toastIcon.className = 'w-2 h-2 rounded-full bg-emerald-400';
    } else {
      toastIcon.className = 'w-2 h-2 rounded-full bg-cyan-400';
    }
  }

  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 4000);
}

async function handleLandingContactSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const successCard = document.getElementById('landingFormSuccess');
  const submitBtn = document.getElementById('landingSubmitBtn');

  const name = document.getElementById('landingName') ? document.getElementById('landingName').value : '';
  const whatsapp = document.getElementById('landingWhatsapp') ? document.getElementById('landingWhatsapp').value : '';
  const email = document.getElementById('landingEmail') ? document.getElementById('landingEmail').value : '';
  const reason = document.getElementById('landingReason') ? document.getElementById('landingReason').value : '';
  const url = document.getElementById('landingUrl') ? document.getElementById('landingUrl').value : '';
  const message = document.getElementById('landingMessage') ? document.getElementById('landingMessage').value : '';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="w-4 h-4 animate-spin text-cyan-400 inline-block mr-2" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Enviando solicitação...</span>
    `;
  }

  const payload = {
    "Nome Completo": name || 'Não informado',
    "WhatsApp": whatsapp || 'Não informado',
    "E-mail de Contato": email,
    "Motivo": reason || 'Dúvida Geral',
    "URL / Site do Vídeo": url || 'Nenhum',
    "Mensagem": message,
    "_subject": `[Suporte Extensão] ${reason || 'Contato'} - ${name || email}`,
    "_replyto": email,
    "_template": "table",
    "_captcha": "false"
  };

  try {
    await fetch('https://formsubmit.co/ajax/extensao@phoenixautomacoes.com.br', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error('Erro ao enviar contato:', err);
  } finally {
    if (form) form.classList.add('hidden');
    if (successCard) successCard.classList.remove('hidden');
    showToast('Solicitação enviada com sucesso para nossa equipe!', 'success');
  }
}

function resetLandingContactForm() {
  const form = document.getElementById('contactForm');
  const successCard = document.getElementById('landingFormSuccess');
  const submitBtn = document.getElementById('landingSubmitBtn');

  if (form && successCard && submitBtn) {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <svg class="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
      <span>Enviar Solicitação de Suporte</span>
    `;
    form.classList.remove('hidden');
    successCard.classList.add('hidden');
  }
}

