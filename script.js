
const navLinks = document.querySelectorAll(".navLinks");
const path = window.location.pathname.split("/").pop(); // pega só o nome do arquivo

switch (path) {
  case "index.html":
  case "": // caso seja a raiz
    document.querySelector('a[href="index.html"]').classList.add("active");
    break;

  case "sobre.html":
    document.querySelector('a[href="sobre.html"]').classList.add("active");
    break;

  case "servicos.html":
    document.querySelector('a[href="servicos.html"]').classList.add("active");
    break;

  case "planos.html":
    document.querySelector('a[href="planos.html"]').classList.add("active");
    break;

  default:
    break;
}

const unorderedList = document.getElementById("ul");
const navBtn = document.getElementById("nav-btn");
const main = document.getElementById("main");

const menuBars = document.getElementById("menu-bars");

menuBars.addEventListener("click", () => {
  if (menuBars.classList.contains("fa-bars")) {
    menuBars.classList.remove("fa-bars");
    menuBars.classList.add("fa-x");

    unorderedList.classList.remove("none");
    navBtn.classList.remove("none");
    main.style.marginTop = "280px";
  }
  else {
    menuBars.classList.remove("fa-x");
    menuBars.classList.add("fa-bars");
    unorderedList.classList.add("none");
    navBtn.classList.add("none");
    main.style.marginTop = "2rem";
  }
})

const mediaQuery = window.matchMedia("(min-width: 750px)");

function handleScreenChange(e) {
  if (e.matches) {
    menuBars.classList.remove("fa-x")
    menuBars.classList.add("fa-bars")
    // Desktop
    unorderedList.classList.remove("none");
    navBtn.classList.remove("none");
  } else {
    // Mobile
    unorderedList.classList.add("none");
    navBtn.classList.add("none");
  }
}

// Executa no carregamento
handleScreenChange(mediaQuery);

// Escuta mudanças de largura
mediaQuery.addEventListener("change", handleScreenChange);

if (document.body.id === "servicos") {

  const botoes = document.querySelectorAll('.saibaMais-button');

  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      const box = botao.closest('.servicos-box');
      const saibaMais = box.querySelector(".saibaMais");

      // Fecha todas as outras boxes antes de abrir a atual
      botoes.forEach(b => {
        const otherBox = b.closest('.servicos-box');
        const otherSaibaMais = otherBox.querySelector(".saibaMais");

        if (b !== botao) {
          b.textContent = "Saiba Mais";
          otherBox.style.borderRadius = "15px";
          otherSaibaMais.style.opacity = "0";
          setTimeout(() => {
            otherSaibaMais.classList.add("displayNone");
          }, 200);
        }
      });

      // Abre ou fecha a box clicada
  
      if (botao.textContent === "Saiba Mais") {
        botao.textContent = "Ver Menos";
        box.style.borderRadius = "15px 15px 0 0";
        saibaMais.classList.remove("displayNone");
        void saibaMais.offsetWidth; // força recalculo do layout
        saibaMais.style.opacity = "1";
      } else {
        botao.textContent = "Saiba Mais";
        box.style.borderRadius = "15px";
        saibaMais.style.opacity = "0";
        setTimeout(() => {
          saibaMais.classList.add("displayNone");
        }, 200);
      }
      
    });
  });

}

if (document.body.id === "planos") {

const mensalBtn = document.getElementById("mensal-btn");
const anualBtn = document.getElementById("anual-btn");
const prices = document.querySelectorAll(".price");
const economize = document.querySelectorAll(".economize");

mensalBtn.addEventListener("click", changeClass);
anualBtn.addEventListener("click", changeClass);

function changeClass(event) {
  const botao = event.target;
  const botaoSibling = botao.nextElementSibling || botao.previousElementSibling;

  if (!botao.classList.contains("chosen")) {
    botao.classList.add("chosen");
    botaoSibling.classList.remove("chosen");

    // Atualiza os preços de todos os cards
    prices.forEach(price => {
      const novoPreco = botao.id === "mensal-btn" 
        ? price.dataset.mensal 
        : price.dataset.anual;

      // Divide o valor e o período (ex: "R$ 89/mês" → "R$ 89" e "/mês")
      const [valor, periodo] = novoPreco.split("/");
      price.innerHTML = `${valor}<span>/${periodo}</span>`;
    });
  }
      economize.forEach(div => {
      if (botao.id === "anual-btn") {
        div.style.display = "block";
      } else {
        div.style.display = "none";
      }
    });
}

}

AOS.init({
  offset: 100,        // distância do elemento até o topo da tela antes de animar
  delay: 0,           // sem atraso
  duration: 1000,      // duração de 400ms
  easing: 'ease',     // tipo de transição
  once: true,        // anima de novo toda vez que o elemento entra na tela
  mirror: false,      // não anima de novo ao rolar pra cima
  anchorPlacement: 'top-bottom', // ponto de disparo da animação
});