// Aviso de cookies (LGPD) + Modo de Consentimento do Google (v2).
// Nada do Google é carregado antes de "Aceitar". Quando o Google Ads/GA4 for configurado, basta preencher TAG.
(function () {
  var TAG = "";            // ex.: "AW-123456789" ou "G-XXXXXXX" (fica vazio até a conta do Google Ads existir)
  var CHAVE = "bt-cookies"; // "aceito" ou "recusado"
  // pasta onde o site está (funciona no domínio próprio e no GitHub Pages)
  var BASE = ((document.currentScript && document.currentScript.src) || "").replace(/consentimento\.js.*$/, "");

  // Padrão do Google: tudo negado até a pessoa aceitar
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied", wait_for_update: 500 });

  function ler() {
    try { var v = localStorage.getItem(CHAVE); if (v) return v; } catch (e) {}
    var m = document.cookie.match("(^|;)\\s*" + CHAVE + "=([^;]*)");
    return m ? m[2] : "";
  }
  function gravar(v) {
    try { localStorage.setItem(CHAVE, v); } catch (e) {}
    document.cookie = CHAVE + "=" + v + ";path=/;max-age=15552000;SameSite=Lax";
  }

  var carregado = false;
  function ligar() {
    gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" });
    if (!TAG || carregado) return;
    carregado = true;
    var s = document.createElement("script");
    s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + TAG;
    document.head.appendChild(s);
    gtag("js", new Date()); gtag("config", TAG);
  }
  function desligar() {
    gtag("consent", "update", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" });
  }

  var aviso = null;
  function estilo() {
    if (document.getElementById("bt-cookies-css")) return;
    var c = document.createElement("style");
    c.id = "bt-cookies-css";
    c.textContent =
      ".bt-aviso{position:fixed;left:10px;right:10px;bottom:10px;z-index:9999;max-width:520px;margin:0 auto;background:#16181c;color:#f3efe8;" +
      "border:1px solid #2f333a;border-top:4px solid #f5a30f;border-radius:8px;padding:14px 16px;box-shadow:0 18px 40px rgba(0,0,0,.55);" +
      "font-family:'Barlow',system-ui,sans-serif;font-size:.95rem;line-height:1.45;transform:translateY(140%);transition:transform .4s cubic-bezier(.2,.8,.2,1)}" +
      ".bt-aviso.mostra{transform:none}.bt-aviso p{margin:0 0 12px}.bt-aviso a{color:#f5a30f;font-weight:700}" +
      ".bt-aviso .bt-b{display:flex;gap:10px}.bt-aviso button{flex:1;min-height:46px;border-radius:4px;font:800 1.1rem 'Big Shoulders Display',Impact,sans-serif;" +
      "letter-spacing:1px;text-transform:uppercase;cursor:pointer}.bt-aviso .bt-r{background:transparent;color:#f3efe8;border:2px solid #f3efe8}" +
      ".bt-aviso .bt-a{background:#f5a30f;color:#111;border:2px solid #f5a30f}.bt-aviso button:focus-visible{outline:3px solid #fff;outline-offset:2px}" +
      ".bt-aberto .wpp-fixo{display:none!important}" +
      "@media(min-width:940px){.bt-aviso{left:auto;right:18px;bottom:18px;max-width:400px;margin:0}}";
    document.head.appendChild(c);
  }
  function fechar() {
    if (!aviso) return;
    aviso.classList.remove("mostra");
    document.documentElement.classList.remove("bt-aberto");
    var a = aviso; aviso = null;
    setTimeout(function () { a.remove(); }, 450);
  }
  function abrir() {
    if (aviso) return;
    estilo();
    aviso = document.createElement("div");
    aviso.className = "bt-aviso";
    aviso.setAttribute("role", "dialog");
    aviso.setAttribute("aria-label", "Aviso de cookies");
    aviso.innerHTML = '<p>🍪 Usamos cookies para medir as visitas e os anúncios do site. Você escolhe se aceita. <a href="' + BASE + 'privacidade/">Saiba mais</a></p>' +
      '<div class="bt-b"><button type="button" class="bt-r">Recusar</button><button type="button" class="bt-a">Aceitar</button></div>';
    aviso.querySelector(".bt-a").addEventListener("click", function () { gravar("aceito"); fechar(); ligar(); });
    aviso.querySelector(".bt-r").addEventListener("click", function () { gravar("recusado"); fechar(); desligar(); });
    document.body.appendChild(aviso);
    document.documentElement.classList.add("bt-aberto");
    setTimeout(function () { if (aviso) aviso.classList.add("mostra"); }, 40);
  }
  document.addEventListener("click", function (e) {
    var l = e.target.closest && e.target.closest("[data-cookies]");
    if (!l) return;
    e.preventDefault();
    abrir();
  });
  function pronto(fn) { if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn); else fn(); }
  var escolha = ler();
  if (escolha === "aceito") ligar();
  else if (escolha !== "recusado") pronto(abrir);
})();
