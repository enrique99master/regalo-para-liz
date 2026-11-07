
'use strict';

// ==========================================
// REGALO ESPECIAL PARA LIZ / SCARLET 🐱💗
// ==========================================

const $ = (selector) => document.querySelector(selector);
const screens = [...document.querySelectorAll('.screen')];

// ==========================================
// 1. NAVEGACIÓN ENTRE PANTALLAS
// ==========================================

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.toggle('active', screen.id === id);
  });

  window.scrollTo({
    top: 0,
    behavior: 'instant'
  });
}

// ==========================================
// 2. CONFIGURACIÓN DE LA MÚSICA
// ==========================================

const music = $('#music');
const musicBtn = $('#musicBtn');

music.volume = 0.55;

// Inicia la música al tocar el primer botón.
function iniciarMusica() {
  if (!music.paused) return;

  music.play()
    .then(() => {
      musicBtn.textContent = '♫ Pausar música';
      musicBtn.setAttribute('aria-pressed', 'true');
    })
    .catch(error => {
      console.warn('No se pudo reproducir la canción:', error);
      musicBtn.textContent = '♫ Activar música';
    });
}

// Permite pausar o reanudar la canción.
musicBtn.addEventListener('click', () => {
  if (music.paused) {
    iniciarMusica();
  } else {
    music.pause();

    musicBtn.textContent = '♫ Activar música';
    musicBtn.setAttribute('aria-pressed', 'false');
  }
});

// ==========================================
// 3. BOTONES PARA CAMBIAR DE PANTALLA
// ==========================================

document.querySelectorAll('[data-next]').forEach(btn => {
  btn.addEventListener('click', () => {

    // Cuando Liz toca el primer botón,
    // comienza la canción y la sorpresa.
    if (btn.dataset.next === 'names') {
      iniciarMusica();
    }

    showScreen(btn.dataset.next);
  });
});

// ==========================================
// 4. BROMA DE LOS NOMBRES 😂
// ==========================================

const jokes = [
  'Este regalo es para Diana... 💌',
  '¡Espera! ¿Diana? 😳',
  'Perdón, perdón... ¡Liz! 😅',
  'Aunque también Scarlet... ¡ya me hice bolas! 🐾',
  'Sea Diana, Liz o Scarlet, esta sorpresa es para ti. 💗'
];

let jokeIndex = 0;

$('#jokeBtn').addEventListener('click', () => {
  if (jokeIndex < jokes.length - 1) {
    jokeIndex++;

    $('#nameJoke').textContent = jokes[jokeIndex];

    if (jokeIndex === jokes.length - 1) {
      $('#jokeBtn').textContent = 'Abrir mi sorpresa 🎁';
    }
  } else {
    showScreen('gift');
  }
});

// ==========================================
// 5. CAJA DE REGALO ANIMADA 🎁
// ==========================================

$('#giftBox').addEventListener('click', () => {
  const box = $('#giftBox');

  if (box.classList.contains('open')) return;

  box.classList.add('open');
  box.setAttribute('aria-expanded', 'true');

  setTimeout(() => {
    $('#giftReveal').hidden = false;

    $('#giftReveal').scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }, 650);
});

// ==========================================
// 6. GALERÍA DE RECUERDOS 📸
// ==========================================

const memories = [
  {
    src: 'images/WhatsApp Image 2026-10-29 at 2.10.27 PM.jpeg',
    caption: 'Hay recuerdos que se guardan con una sonrisa. 💗'
  },
  {
    src: 'images/WhatsApp Image 2026-10-29 at 2.13.51 PM.jpeg',
    caption: 'Una foto juntos y un momento bonito para recordar. 🐾'
  },
  {
    src: 'images/IMG_20261005_160423538_HDR.jpg',
    caption: 'Un día especial, una sonrisa especial. 🌷'
  },
  {
    src: 'images/IMG_20261029_141620787_HDR.jpg',
    caption: 'Scarlet, que nunca te falten momentos así. ✨'
  },
  {
    src: 'images/IMG_20260914_111900169_HDR.jpg',
    caption: 'Las pequeñas aventuras también cuentan. 🐈'
  },
  {
    src: 'images/IMG_20261029_145827766_HDR.jpg',
    caption: 'Y que vengan muchos recuerdos más. ♡'
  }
];

let photoIndex = 0;

function renderPhoto() {
  const item = memories[photoIndex];
  const img = $('#memoryImg');

  img.onerror = () => {
    img.onerror = null;
    img.removeAttribute('src');

    img.alt = 'No se encontró esta fotografía';

    $('#memoryCaption').textContent =
      'No se encontró la imagen. Revisa su nombre en script.js.';
  };

  img.alt = 'Recuerdo ' + (photoIndex + 1) + ' para Liz';
  img.src = item.src;

  $('#memoryCaption').textContent = item.caption;

  $('#photoCounter').textContent =
    `${photoIndex + 1} / ${memories.length}`;
}

$('#prevPhoto').addEventListener('click', () => {
  photoIndex = (photoIndex - 1 + memories.length) % memories.length;
  renderPhoto();
});

$('#nextPhoto').addEventListener('click', () => {
  photoIndex = (photoIndex + 1) % memories.length;
  renderPhoto();
});

renderPhoto();

// ==========================================
// 7. CARTA ESPECIAL PARA LIZ 💌
// ==========================================

$('#envelope').addEventListener('click', () => {
  $('#letterText').hidden = false;
  $('#envelope').hidden = true;
  $('#envelope').setAttribute('aria-expanded', 'true');
});

// ==========================================
// 8. REINICIAR LA SORPRESA
// ==========================================

$('#restart').addEventListener('click', () => {
  jokeIndex = 0;

  $('#nameJoke').textContent = jokes[0];
  $('#jokeBtn').textContent = 'Continúa 😅';

  $('#giftBox').classList.remove('open');
  $('#giftBox').setAttribute('aria-expanded', 'false');

  $('#giftReveal').hidden = true;

  $('#letterText').hidden = true;
  $('#envelope').hidden = false;
  $('#envelope').setAttribute('aria-expanded', 'false');

  photoIndex = 0;
  renderPhoto();

  // Al volver al inicio, se detiene la música.
  // Volverá a sonar al tocar "Tengo algo para ti".
  music.pause();
  music.currentTime = 0;

  musicBtn.textContent = '♫ Activar música';
  musicBtn.setAttribute('aria-pressed', 'false');

  showScreen('welcome');
});

// ==========================================
// 9. CORAZONES Y HUELLITAS FLOTANTES 🐾
// ==========================================

const particleHost = $('#particles');

for (let i = 0; i < 15; i++) {
  const el = document.createElement('span');

  el.className = 'particle';
  el.textContent = ['♡', '🐾', '✦'][i % 3];

  el.style.left = `${(i * 29 + 7) % 100}%`;
  el.style.animationDelay = `-${(i * 1.7) % 18}s`;
  el.style.animationDuration = `${13 + (i % 6) * 2}s`;
  el.style.fontSize = `${12 + (i % 4) * 3}px`;

  particleHost.appendChild(el);
}


// ====================================
// VALES DE AMISTAD PARA LIZ 🐾
// ====================================

function redeemVoucher(button, name) {

  const confirmed = confirm(
    `🐱 Scarlet, ¿quieres canjear tu vale por:\n\n${name}?\n\n💗`
  );

  if (!confirmed) return;

  button.textContent = '✓ Canjeado 💗';
  button.disabled = true;

  const card = button.closest('.voucher');
  card.style.opacity = '0.8';

  document.querySelector('#voucherMessage')
    .textContent =
      `🐾 ¡Vale de "${name}" canjeado! Enséñaselo a Enrique para hacerlo válido. 💗`;
}

// Volver al inicio desde los vales.
document.querySelector('#restartVouchers')
  .addEventListener('click', () => {
    document.querySelector('#restart').click();
  });
