/* ============================================================
   SCRIPT PRINCIPAL DO SITE IMMEL
   Autor: Paulo Machado
   Versão: 0.08
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
   CADASTRO DE VOLUNTÁRIOS
   Autor: Paulo Machado
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    /* =====================
       MENU RESPONSIVO
    ===================== */
    const navMenu = document.querySelector('#navMenu');
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '☰';
    const nav = document.querySelector('nav');
    nav.insertBefore(menuToggle, nav.firstChild);

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    /* =====================
       ANIMAÇÃO DE ENTRADA
    ===================== */
    const fadeElements = document.querySelectorAll('section, header, form');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
    });

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    /* =====================
       FORMULÁRIO DE CADASTRO
    ===================== */
    const form = document.querySelector('form');
    const telefoneInput = document.querySelector('#telefone');

    // Máscara de telefone (formato BR)
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 6) {
            e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else {
            e.target.value = value;
        }
    });

    // Mensagens de erro
    const showError = (input, message) => {
        let error = input.parentNode.querySelector('.error-msg');
        if (!error) {
            error = document.createElement('small');
            error.classList.add('error-msg');
            input.parentNode.appendChild(error);
        }
        error.textContent = message;
        input.classList.add('input-error');
    };

    const clearError = (input) => {
        const error = input.parentNode.querySelector('.error-msg');
        if (error) error.textContent = '';
        input.classList.remove('input-error');
    };

    // Criação do popup de sucesso
    const createPopup = (message) => {
        const popup = document.createElement('div');
        popup.classList.add('popup-success');
        popup.innerHTML = `
            <div class="popup-content">
                <h2>✅ Sucesso!</h2>
                <p>${message}</p>
                <button id="closePopup">Fechar</button>
            </div>
        `;
        document.body.appendChild(popup);

        // animação de entrada
        setTimeout(() => popup.classList.add('show'), 100);

        // botão fechar
        document.querySelector('#closePopup').addEventListener('click', () => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 400);
        });

        // fechar ao clicar fora
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('show');
                setTimeout(() => popup.remove(), 400);
            }
        });
    };

    // Validação e envio
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const nome = document.querySelector('#nome');
        const email = document.querySelector('#email');
        const telefone = document.querySelector('#telefone');
        const interesses = document.querySelector('#interesses');

        if (nome.value.trim().length < 3) {
            showError(nome, 'Por favor, digite seu nome completo.');
            isValid = false;
        } else clearError(nome);

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            showError(email, 'Informe um e-mail válido.');
            isValid = false;
        } else clearError(email);

        if (telefone.value.replace(/\D/g, '').length < 10) {
            showError(telefone, 'Digite um telefone válido.');
            isValid = false;
        } else clearError(telefone);

        if (interesses.value === '') {
            showError(interesses, 'Selecione uma área de interesse.');
            isValid = false;
        } else clearError(interesses);

        if (isValid) {
            form.reset();
            createPopup('Cadastro realizado com sucesso! Obrigado por se voluntariar 💚');
        }
    });
});

// Máscaras de entrada acessíveis
document.addEventListener("DOMContentLoaded", () => {
  const cpf = document.getElementById("cpf");
  const telefone = document.getElementById("telefone");
  const cep = document.getElementById("cep");

  const aplicarMascara = (campo, mascara) => {
    campo.addEventListener("input", () => {
      let valor = campo.value.replace(/\D/g, "");
      let i = 0;
      campo.value = mascara.replace(/#/g, () => valor[i++] || "");
    });
  };

  aplicarMascara(cpf, "###.###.###-##");
  aplicarMascara(telefone, "(##) #####-####");
  aplicarMascara(cep, "#####-###");

  // Validação acessível
  const form = document.getElementById("formCadastro");
  form.addEventListener("submit", (e) => {
    const campos = form.querySelectorAll("input[required], select[required]");
    let valido = true;

    campos.forEach((campo) => {
      if (!campo.value.trim()) {
        valido = false;
        campo.setAttribute("aria-invalid", "true");
        campo.focus();
      } else {
        campo.removeAttribute("aria-invalid");
      }
    });

    if (!valido) {
      e.preventDefault();
      alert("Por favor, preencha todos os campos obrigatórios corretamente.");
    }
  });
});

/* ===================== ABA DE PROJETOS ===================== */
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-button");
  const panels = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Atualiza estado das abas
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      // Atualiza os painéis
      panels.forEach((panel) => {
        panel.hidden = true;
        panel.classList.remove("active");
      });
      const activePanel = document.getElementById(tab.getAttribute("aria-controls"));
      activePanel.hidden = false;
      activePanel.classList.add("active");
      activePanel.focus();
    });

    // Suporte para teclado (Setas)
    tab.addEventListener("keydown", (e) => {
      const currentIndex = Array.from(tabs).indexOf(tab);
      if (e.key === "ArrowRight") {
        e.preventDefault();
        tabs[(currentIndex + 1) % tabs.length].focus();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        tabs[(currentIndex - 1 + tabs.length) % tabs.length].focus();
      }
    });
  });
});

