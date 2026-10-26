// Monta e anima um anúncio 9:16 a partir de window.AD.
// Em ?render=1 a timeline fica pausada e é avançada quadro a quadro por render.js.
(function () {
  const AD = window.AD;
  const stage = document.getElementById("stage");
  const $ = (html) => { const d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstElementChild; };
  const lines = (arr, cls) => arr.map((l) => `<div class="ln ${cls}"><span>${l.replace(/<em>/g, '<em><i class="mk"></i>')}</span></div>`).join("");
  const CHECK = '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28"/><path d="M19 33 l9 9 l17 -19"/></svg>';
  const CHAT = '<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.1 14.9l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 0 1 12 4z"/></svg>';

  stage.innerHTML = `
    <div class="glow"></div><div class="facade"></div><div class="vignette"></div>
    <div class="progress"><i></i></div><div class="rule"></div>
    <div class="brand">${AD.brand}</div><div class="grain"></div>`;

  const builders = {
    hook: (s) => `<div class="scene">${lines(s.lines, "h1")}${s.sub ? `<div class="sub">${s.sub}</div>` : ""}</div>`,
    statement: (s) => `<div class="scene">${lines(s.lines, "h2")}${s.note ? `<div class="note">${s.note}</div>` : ""}</div>`,
    chips: (s) => `<div class="scene">${lines(s.lines, "h2")}<div class="chips">${s.chips.map((c) => `<div class="chip">${c}</div>`).join("")}</div></div>`,
    checklist: (s) => `<div class="scene">${lines(s.lines, "h2")}<div class="check">${s.items.map((c) => `<div class="item">${CHECK}<span>${c}</span></div>`).join("")}</div></div>`,
    counter: (s) => `<div class="scene">${lines(s.lines, "h2")}<div class="counter"><span class="num">${s.from}</span><small>%</small></div>
      <div class="meter"><i></i></div><div class="meter-legend"><span>${s.legend[0]}</span><span>${s.legend[1]}</span></div>${s.note ? `<div class="note">${s.note}</div>` : ""}</div>`,
    holerite: (s) => `<div class="scene">${lines(s.lines, "h2")}<div class="paper"><div class="ph"><span>Recibo de pagamento</span><span>Mês/ano</span></div>
      ${s.rows.map((r, i) => `<div class="row" data-i="${i}">${i === s.highlight ? '<div class="hl"></div>' : ""}<span>${r}</span><b>R$ ••••,••</b></div>`).join("")}
      <div class="scan"></div></div><div class="callout">${s.callout}</div></div>`,
    cta: (s) => `<div class="scene cta-scene"><div class="portrait"></div><img class="logo" src="assets/logo.png" alt="">
      <div class="cta-copy">${lines(s.lines, "h2")}<div class="btn">${CHAT}<span>${s.button}</span></div></div>
      <div class="disclaimer">${s.disclaimer}</div></div>`,
  };

  const tl = gsap.timeline({ paused: true });
  const total = AD.scenes.reduce((a, s) => a + s.dur, 0);

  // camadas globais
  tl.fromTo(".facade", { scale: 1.0 }, { scale: 1.1, duration: total, ease: "none" }, 0);
  tl.fromTo(".glow", { x: -120, y: 60 }, { x: 80, y: -80, duration: total, ease: "sine.inOut" }, 0);
  tl.to(".progress i", { scaleX: 1, duration: total, ease: "none" }, 0);
  tl.from(".rule", { scaleX: 0, duration: 0.9, ease: "power3.inOut" }, 0.05);
  tl.from(".brand", { autoAlpha: 0, y: 20, duration: 0.6 }, 0.3);

  let t = 0;
  AD.scenes.forEach((s, idx) => {
    const el = $(builders[s.type](s));
    stage.insertBefore(el, stage.querySelector(".grain"));
    const q = (sel) => { const n = el.querySelectorAll(sel); return n.length ? n : []; };
    const isLast = idx === AD.scenes.length - 1;
    const t0 = t + 0.05;

    tl.set(el, { visibility: "visible" }, t);
    tl.from(q(".ln > span"), { yPercent: 115, rotate: 2, duration: 0.85, ease: "power4.out", stagger: 0.09 }, t0);
    const afterLines = t0 + 0.55 + q(".ln").length * 0.09;
    tl.to(q("em .mk"), { scaleX: 1, duration: 0.5, ease: "power2.inOut", stagger: 0.15 }, afterLines);
    tl.from(q(".sub, .note"), { autoAlpha: 0, y: 24, duration: 0.6, ease: "power2.out" }, afterLines + 0.1);

    if (s.type === "chips") tl.from(q(".chip"), { autoAlpha: 0, scale: 0.6, y: 40, duration: 0.55, ease: "back.out(2)", stagger: 0.14 }, afterLines);
    if (s.type === "checklist") {
      q(".item").forEach((it, i) => {
        const at = afterLines + i * 0.42;
        tl.from(it, { autoAlpha: 0, x: -40, duration: 0.45, ease: "power3.out" }, at);
        tl.to(it.querySelector("path"), { strokeDashoffset: 0, duration: 0.35, ease: "power2.out" }, at + 0.2);
      });
    }
    if (s.type === "counter") {
      const num = el.querySelector(".num"), o = { v: s.from };
      tl.from(q(".counter, .meter, .meter-legend"), { autoAlpha: 0, y: 40, duration: 0.5, stagger: 0.1 }, afterLines);
      tl.to(o, { v: s.to, duration: 1.4, ease: "power2.inOut", onUpdate: () => (num.textContent = Math.round(o.v)) }, afterLines + 0.6);
      tl.to(q(".meter i"), { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, afterLines + 0.6);
      tl.fromTo(q(".counter"), { scale: 1 }, { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1, transformOrigin: "0 80%" }, afterLines + 2.0);
    }
    if (s.type === "holerite") {
      const paper = el.querySelector(".paper"), row = el.querySelector(`.row[data-i="${s.highlight}"]`);
      tl.from(paper, { yPercent: 60, rotate: -6, autoAlpha: 0, duration: 0.9, ease: "power3.out" }, afterLines - 0.2);
      tl.to(paper, { rotate: -1.5, duration: 3, ease: "sine.inOut" }, afterLines + 0.7);
      tl.fromTo(q(".scan"), { autoAlpha: 1, y: 0 }, { y: row.offsetTop + 10, duration: 0.9, ease: "power1.inOut" }, afterLines + 0.7);
      tl.to(q(".scan"), { autoAlpha: 0, duration: 0.3 }, afterLines + 1.6);
      tl.to(row.querySelector(".hl"), { scaleX: 1, duration: 0.5, ease: "power3.inOut" }, afterLines + 1.5);
      tl.to(row.querySelectorAll("span, b"), { color: "#fff", duration: 0.2 }, afterLines + 1.7);
      tl.from(q(".callout"), { autoAlpha: 0, x: -30, duration: 0.5 }, afterLines + 1.9);
    }
    if (s.type === "cta") {
      tl.to(".brand, .rule", { autoAlpha: 0, duration: 0.4 }, t);
      tl.from(q(".portrait"), { xPercent: 40, autoAlpha: 0, duration: 1.1, ease: "power3.out" }, t);
      tl.from(q(".logo"), { autoAlpha: 0, y: -30, duration: 0.7 }, t + 0.2);
      tl.from(q(".btn"), { autoAlpha: 0, scale: 0.7, duration: 0.6, ease: "back.out(2)" }, afterLines);
      tl.to(q(".btn"), { scale: 1.06, duration: 0.45, yoyo: true, repeat: 3, ease: "sine.inOut" }, afterLines + 0.7);
      tl.from(q(".disclaimer"), { autoAlpha: 0, duration: 0.6 }, afterLines + 0.3);
    }
    if (!isLast) tl.to(el, { autoAlpha: 0, y: -70, duration: 0.45, ease: "power2.in" }, t + s.dur - 0.45);
    t += s.dur;
  });
  tl.set({}, {}, total);

  window.__tl = tl;
  window.__duration = total;
  if (!/render=1/.test(location.search)) document.fonts.ready.then(() => tl.play());
})();
