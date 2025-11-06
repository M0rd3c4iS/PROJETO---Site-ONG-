/* ============================================================
   SCRIPT PRINCIPAL DO SITE IMMEL
   Autor: Paulo Machado
   Versão: 1.0
   ============================================================ */

/* =====================
   MENU RESPONSIVO
===================== */
const menuToggle = document.createElement('button');
menuToggle.classList.add('menu-toggle');
menuToggle.innerHTML = '☰';
const header = document.querySelector('header nav') || document.querySelector('header ul');
if (header && header.parentNode) header.parentNode.insertBefore(menuToggle, header);

const navMenu = document.querySelector('#navMenu');
if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
}

/* =====================
   SCROLL REVEAL SUAVE
===================== */
const elementsToReveal = document.querySelectorAll('section, .form-container, footer');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  elementsToReveal.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}

// Aplica estilo inicial e ativa evento de scroll
elementsToReveal.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

/* ============================================================
   FORMULÁRIO DE CADASTRO (Máscaras e Validação)
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const cpfInput = document.querySelector('#cpf');
  const telefoneInput = document.querySelector('#telefone');
  const cepInput = document.querySelector('#cep');
  const form = document.querySelector('form');

  // Funções de máscara
  const masks = {
    cpf: (value) => value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'),

    telefone: (value) => value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d{4})$/, '$1-$2'),

    cep: (value) => value
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d{3})$/, '$1-$2'),
  };

  // Eventos de input para aplicar máscaras
  if (cpfInput) cpfInput.addEventListener('input', e => e.target.value = masks.cpf(e.target.value));
  if (telefoneInput) telefoneInput.addEventListener('input', e => e.target.value = masks.telefone(e.target.value));
  if (cepInput) cepInput.addEventListener('input', e => e.target.value = masks.cep(e.target.value));

  // Validação nativa aprimorada
  if (form) {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        alert('⚠️ Por favor, preencha todos os campos obrigatórios corretamente antes de enviar.');
      } else {
        alert('✅ Cadastro realizado com sucesso! Obrigado por se voluntariar 💚');
      }
    });
  }
});
