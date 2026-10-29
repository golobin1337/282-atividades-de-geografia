(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};

  /* ---------- Checkout ---------- */
  var checkouts = {
    BASICO: cfg.URL_CHECKOUT_BASICO,
    COMPLETO: cfg.URL_CHECKOUT_COMPLETO,
    DESCONTO: cfg.URL_CHECKOUT_DESCONTO
  };
  var FALLBACK_HREF = "#planos";
  var pageParams = window.location.search;

  // Repassa UTMs e demais parâmetros da página para o checkout.
  function withPageParams(url) {
    if (!pageParams) return url;
    try {
      var target = new URL(url, window.location.href);
      new URLSearchParams(pageParams).forEach(function (value, key) {
        if (!target.searchParams.has(key)) target.searchParams.set(key, value);
      });
      return target.toString();
    } catch (e) {
      return url;
    }
  }

  var missing = [];
  document.querySelectorAll("[data-checkout]").forEach(function (link) {
    var key = link.getAttribute("data-checkout");
    var url = (checkouts[key] || "").trim();
    if (url) {
      link.href = withPageParams(url);
    } else {
      link.href = FALLBACK_HREF;
      if (missing.indexOf(key) === -1) missing.push(key);
    }
  });

  if (missing.length) {
    console.warn(
      "[checkout] Links não configurados em js/config.js: " +
        missing.map(function (k) { return "URL_CHECKOUT_" + k; }).join(", ") +
        ". Os botões estão rolando até a seção de planos."
    );
  }

  /* ---------- Carrossel infinito de folhas ---------- */
  // Repete as folhas até cobrir a tela e duplica o conjunto; a animação
  // desloca -50% da trilha, então o loop fica contínuo.
  var SECONDS_PER_SHEET = 4;

  document.querySelectorAll("[data-marquee]").forEach(function (marquee) {
    var track = marquee.querySelector(".marquee__track");
    var originals = Array.prototype.slice.call(track.children);
    if (!originals.length) return;

    var secondsPerItem = Number(marquee.getAttribute("data-marquee-seconds")) || SECONDS_PER_SHEET;
    var setWidth = track.scrollWidth;
    var copies = Math.max(1, Math.ceil(window.innerWidth / setWidth));

    for (var i = 1; i < copies * 2; i++) {
      originals.forEach(function (el) {
        var clone = el.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        clone.querySelectorAll("img").forEach(function (img) { img.alt = ""; });
        track.appendChild(clone);
      });
    }

    track.style.setProperty("--marquee-duration", originals.length * copies * secondsPerItem + "s");
  });

  /* ---------- Popup da oferta especial ---------- */
  // Sem suporte a <dialog> (ou sem JS), o botão segue direto para o checkout.
  document.querySelectorAll("[data-upsell]").forEach(function (trigger) {
    var dialog = document.getElementById(trigger.getAttribute("data-upsell"));
    if (!dialog || typeof dialog.showModal !== "function") return;

    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      dialog.showModal();
      dialog.focus();
    });
  });

  document.querySelectorAll("dialog").forEach(function (dialog) {
    dialog.addEventListener("click", function (e) {
      // clique no fundo escurecido, no botão fechar ou em link interno (#)
      var link = e.target.closest("a[href^='#']");
      if (e.target === dialog || e.target.closest("[data-close]") || link) {
        dialog.close();
      }
    });
  });

  /* ---------- Rodapé ---------- */
  var rodape = cfg.RODAPE || {};

  function footerEls(key) {
    return document.querySelectorAll('[data-footer="' + key + '"]');
  }

  footerEls("ano").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  if ((rodape.marca || "").trim()) {
    footerEls("marca").forEach(function (el) { el.textContent = rodape.marca.trim(); });
  }

  ["termos", "privacidade"].forEach(function (key) {
    var url = (rodape[key] || "").trim();
    if (!url) return;
    footerEls(key).forEach(function (link) { link.href = url; link.hidden = false; });
  });

  var email = (rodape.email || "").trim();
  if (email) {
    footerEls("email").forEach(function (link) {
      link.href = "mailto:" + email;
      link.querySelector("span").textContent = email;
      link.hidden = false;
    });
  }

  /* ---------- Depoimentos ---------- */
  var depoimentos = cfg.DEPOIMENTOS || [];

  function markLoaded(img) {
    img.parentNode.classList.add("is-loaded");
  }

  document.querySelectorAll("[data-depoimento]").forEach(function (card) {
    var d = depoimentos[Number(card.getAttribute("data-depoimento"))];
    if (!d) return;

    var nome = (d.nome || "").trim();
    var texto = (d.texto || "").trim();
    var print = (d.print || "").trim();

    if (print) {
      var img = new Image();
      img.loading = "lazy";
      img.decoding = "async";
      img.width = 800;
      img.height = 1000;
      img.alt = nome ? "Print do depoimento de " + nome : "Print de depoimento";
      img.onload = function () { markLoaded(img); };
      img.onerror = function () { img.remove(); };
      img.src = print;
      card.querySelector(".media").appendChild(img);
    }

    if (nome) {
      card.querySelector(".quote__name").textContent = nome;
    }

    if (texto) {
      card.querySelector(".quote__text").textContent = "“" + texto + "”";
    }

    if (nome || texto) card.classList.add("is-filled");
    // só o print (vários comentários reais numa imagem): esconde nome/texto
    else if (print) card.classList.add("is-print-only");
  });
})();
