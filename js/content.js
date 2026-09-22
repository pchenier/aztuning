(() => {
  const { useState: useStateC, useRef: useRefC, useEffect: useEffectC } = React;
  function Reveal({ children, className = "", delay = 0 }) {
    const ref = useRefC(null);
    const [show, setShow] = useStateC(false);
    useEffectC(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setShow(true);
        return;
      }
      const el = ref.current;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      }, { threshold: 0.16 });
      if (el) io.observe(el);
      return () => io.disconnect();
    }, []);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        ref,
        className: `az-reveal ${show ? "az-reveal-in" : ""} ${className}`,
        style: { transitionDelay: `${delay}ms` }
      },
      children
    );
  }
  function SectionHead({ eyebrow, title, accentWord, sub, center }) {
    return /* @__PURE__ */ React.createElement("div", { className: center ? "mx-auto max-w-2xl text-center" : "max-w-2xl" }, /* @__PURE__ */ React.createElement(Eyebrow, { className: center ? "justify-center" : "" }, eyebrow), /* @__PURE__ */ React.createElement("h2", { className: "font-display mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-black uppercase leading-[0.98] tracking-[-0.01em]" }, title, " ", accentWord && /* @__PURE__ */ React.createElement("span", { className: "text-[var(--accent)]" }, accentWord)), sub && /* @__PURE__ */ React.createElement("p", { className: `mt-4 text-[15px] leading-relaxed text-[var(--text2)] ${center ? "mx-auto" : ""}` }, sub));
  }
  function FaqItem({ q, a }) {
    const [open, setOpen] = useStateC(false);
    return /* @__PURE__ */ React.createElement("div", { className: "border-b border-[var(--line)]" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setOpen(!open),
        "aria-expanded": open,
        className: "flex w-full items-center justify-between gap-4 py-5 text-left"
      },
      /* @__PURE__ */ React.createElement("span", { className: "font-display text-[16px] font-bold uppercase tracking-[0.02em] text-white" }, q),
      /* @__PURE__ */ React.createElement("span", { className: `grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors ${open ? "border-[var(--accent)] bg-[var(--accent)] text-black" : "border-[var(--line)] text-[var(--text2)]"}` }, /* @__PURE__ */ React.createElement(Icon, { name: open ? "minus" : "plus", size: 15 }))
    ), /* @__PURE__ */ React.createElement("div", { className: "grid transition-all duration-300", style: { gridTemplateRows: open ? "1fr" : "0fr" } }, /* @__PURE__ */ React.createElement("div", { className: "overflow-hidden" }, /* @__PURE__ */ React.createElement("p", { className: "pb-5 pr-12 text-[14px] leading-relaxed text-[var(--text2)]" }, a))));
  }
  function MapSwitch() {
    const [active, setActive] = useStateC(1);
    const maps = content().maps;
    return /* @__PURE__ */ React.createElement("div", { className: "rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-7 md:p-8" }, /* @__PURE__ */ React.createElement("div", { className: "relative mx-auto mb-7 h-2 w-full max-w-sm overflow-hidden rounded-full bg-white/[0.06]" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--green)] transition-all duration-500",
        style: { width: `${(active + 1) / maps.length * 100}%` }
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3 md:grid-cols-4" }, maps.map((m, i) => {
      const on = i === active;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: m.name,
          onClick: () => setActive(i),
          className: `rounded-2xl border p-4 text-left transition-all duration-200 ${on ? "border-[var(--accent)] bg-[var(--accent)]/[0.08]" : "border-[var(--line)] hover:border-white/20"}`
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: `font-display text-[15px] font-bold uppercase tracking-[0.06em] ${on ? "text-[var(--accent)]" : "text-white"}` }, m.name), /* @__PURE__ */ React.createElement("span", { className: `h-2 w-2 rounded-full ${on ? "bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" : "bg-white/20"}` })),
        /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-[12px] leading-snug text-[var(--text2)]" }, m.note)
      );
    })));
  }
  function ContentStack({ onContact }) {
    const C = content();
    const [vid, setVid] = useStateC(null);
    useEffectC(() => {
      if (!vid) return;
      const f = (e) => {
        if (e.key === "Escape") setVid(null);
      };
      window.addEventListener("keydown", f);
      return () => window.removeEventListener("keydown", f);
    }, [vid]);
    return /* @__PURE__ */ React.createElement("div", { className: "mt-20 space-y-24 border-t border-[var(--line)] pt-20" }, /* @__PURE__ */ React.createElement("section", { className: "mx-auto max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "grid gap-6 lg:grid-cols-2" }, /* @__PURE__ */ React.createElement(Reveal, { className: "rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-8" }, /* @__PURE__ */ React.createElement("span", { className: "grid h-12 w-12 place-items-center rounded-full border border-[var(--line)] text-[var(--accent)]" }, /* @__PURE__ */ React.createElement(Icon, { name: "bolt", size: 22 })), /* @__PURE__ */ React.createElement("h3", { className: "font-display mt-5 text-[24px] font-bold uppercase tracking-[0.02em]" }, C.whatIsTune.title), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[15px] leading-relaxed text-[var(--text2)]" }, C.whatIsTune.body)), /* @__PURE__ */ React.createElement(Reveal, { delay: 80, className: "rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-8" }, /* @__PURE__ */ React.createElement("span", { className: "grid h-12 w-12 place-items-center rounded-full border border-[var(--line)] text-[var(--accent)]" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 22 })), /* @__PURE__ */ React.createElement("h3", { className: "font-display mt-5 text-[24px] font-bold uppercase tracking-[0.02em]" }, C.reversible.title), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[15px] leading-relaxed text-[var(--text2)]" }, C.reversible.body)))), /* @__PURE__ */ React.createElement("section", { className: "mx-auto max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement(SectionHead, { eyebrow: t("cs.processEyebrow"), title: t("cs.processTitle"), accentWord: t("cs.processAccent") }), /* @__PURE__ */ React.createElement("div", { className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" }, C.process.map((p, i) => /* @__PURE__ */ React.createElement(Reveal, { key: p.n, delay: i * 80, className: "relative rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6" }, /* @__PURE__ */ React.createElement("div", { className: "font-mono text-[34px] font-black leading-none text-[var(--accent)]/25" }, p.n), /* @__PURE__ */ React.createElement("h4", { className: "font-display mt-4 text-[16px] font-bold uppercase tracking-[0.04em]" }, p.t), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-[13px] leading-relaxed text-[var(--text2)]" }, p.d))))), /* @__PURE__ */ React.createElement("section", { className: "mx-auto max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]" }, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement(SectionHead, { eyebrow: t("cs.mapEyebrow"), title: t("cs.mapTitle"), accentWord: t("cs.mapAccent"), sub: t("cs.mapSub") })), /* @__PURE__ */ React.createElement(Reveal, { delay: 80 }, /* @__PURE__ */ React.createElement(MapSwitch, null)))), /* @__PURE__ */ React.createElement("section", { className: "mx-auto max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement(SectionHead, { eyebrow: t("cs.optEyebrow"), title: t("cs.optTitle"), accentWord: t("cs.optAccent") }), /* @__PURE__ */ React.createElement("div", { className: "mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4" }, C.features.map((f) => /* @__PURE__ */ React.createElement("div", { key: f.n, className: "group bg-[var(--panel)] p-6 transition-colors hover:bg-[var(--hover)]" }, /* @__PURE__ */ React.createElement("div", { className: "font-mono text-[12px] text-[var(--accent)]" }, f.n), /* @__PURE__ */ React.createElement("div", { className: "font-display mt-3 text-[15px] font-bold uppercase leading-tight tracking-[0.02em] text-white" }, f.t))))), /* @__PURE__ */ React.createElement("section", { className: "mx-auto max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" }, /* @__PURE__ */ React.createElement(
      SectionHead,
      {
        eyebrow: t("cs.workEyebrow"),
        title: t("cs.workTitle"),
        accentWord: t("cs.workAccent"),
        sub: t("cs.workSub")
      }
    ), /* @__PURE__ */ React.createElement(PrimaryBtn, { size: "md", icon: "arrow", href: content().instagram.url }, t("cs.moreIg"))), content().videos.length ? (
      /* horizontal thumbnails — click opens the vertical clip in a pop-up */
      /* @__PURE__ */ React.createElement("div", { className: "mt-10 grid gap-4 md:grid-cols-3" }, content().videos.map((v, i) => /* @__PURE__ */ React.createElement(Reveal, { key: i, delay: i * 70 }, /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          onClick: () => setVid(v.src),
          className: "group relative block aspect-video w-full overflow-hidden rounded-2xl border border-[var(--line)] bg-black"
        },
        /* @__PURE__ */ React.createElement(
          "video",
          {
            src: `${v.src}#t=0.5`,
            muted: true,
            playsInline: true,
            preload: "metadata",
            tabIndex: -1,
            className: "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
          }
        ),
        /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" }),
        /* @__PURE__ */ React.createElement("span", { className: "absolute inset-0 grid place-items-center" }, /* @__PURE__ */ React.createElement("span", { className: "grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-black/45 pl-1 text-white backdrop-blur transition-transform duration-300 group-hover:scale-110 group-hover:border-[var(--accent)]/60" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", width: "22", height: "22", fill: "currentColor", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M8 5v14l11-7z" }))))
      ))))
    ) : (
      /* placeholder tiles — replaced automatically once videos are added */
      /* @__PURE__ */ React.createElement("div", { className: "mt-10 grid gap-4 md:grid-cols-3" }, ["super", "coupe", "suv"].map((body, i) => /* @__PURE__ */ React.createElement(Reveal, { key: i, delay: i * 80 }, /* @__PURE__ */ React.createElement("div", { className: "group relative block aspect-video overflow-hidden rounded-2xl border border-dashed border-[var(--line)] bg-[var(--panel)]" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 az-grid-bg opacity-40" }), /* @__PURE__ */ React.createElement(CarArt, { body, className: "absolute inset-0 h-full w-full opacity-50" }), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 grid place-items-center" }, /* @__PURE__ */ React.createElement("span", { className: "grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-black/40 pl-1 text-white backdrop-blur" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", width: "22", height: "22", fill: "currentColor", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M8 5v14l11-7z" })))), /* @__PURE__ */ React.createElement("span", { className: "absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]" }, "Video coming soon")))))
    ), /* @__PURE__ */ React.createElement("div", { className: "mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3" }, C.work.stats.map((s) => /* @__PURE__ */ React.createElement("div", { key: s.v, className: "bg-[var(--panel)] px-6 py-7" }, /* @__PURE__ */ React.createElement("div", { className: "font-display text-[26px] font-black text-[var(--accent)]" }, s.k), /* @__PURE__ */ React.createElement("div", { className: "mt-1 text-[12px] uppercase tracking-[0.12em] text-[var(--text2)]" }, s.v))))), /* @__PURE__ */ React.createElement("section", { className: "mx-auto max-w-[860px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement(SectionHead, { eyebrow: t("cs.faqEyebrow"), title: t("cs.faqTitle"), center: true }), /* @__PURE__ */ React.createElement("div", { className: "mt-10" }, C.faq.map((f) => /* @__PURE__ */ React.createElement(FaqItem, { key: f.q, ...f })))), /* @__PURE__ */ React.createElement("section", { className: "mx-auto max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement(Reveal, { className: "relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--panel)] px-7 py-14 text-center md:py-20" }, /* @__PURE__ */ React.createElement("div", { className: "pointer-events-none absolute left-1/2 top-0 h-72 w-[640px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.08] blur-[110px]" }), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display mx-auto max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)] font-black uppercase leading-[0.98]" }, t("cs.ctaTitle"), /* @__PURE__ */ React.createElement("span", { className: "text-[var(--accent)]" }, t("cs.ctaAccent"))), /* @__PURE__ */ React.createElement("p", { className: "mx-auto mt-4 max-w-md text-[15px] text-[var(--text2)]" }, t("cs.ctaSub")), /* @__PURE__ */ React.createElement("div", { className: "mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" }, /* @__PURE__ */ React.createElement(PrimaryBtn, { size: "lg", icon: "arrow", onClick: onContact }, t("cs.contactUs")), /* @__PURE__ */ React.createElement(GhostBtn, { size: "lg", href: CONFIG.storeUrl }, t("cs.visitStore")))))), vid && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-[70] flex items-center justify-center p-4", onClick: () => setVid(null) }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-black/85 backdrop-blur-sm az-fade" }), /* @__PURE__ */ React.createElement("div", { className: "az-pop relative", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement(
      "video",
      {
        src: vid,
        controls: true,
        autoPlay: true,
        playsInline: true,
        className: "block max-h-[86vh] w-auto max-w-[92vw] rounded-2xl border border-[var(--line)] bg-black"
      }
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setVid(null),
        "aria-label": "Close",
        className: "absolute -right-3 -top-3 grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] bg-[#111114] text-white transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "close", size: 16 })
    ))));
  }
  function ContactScreen({ prefill, onBack }) {
    const sh = content().shop;
    const [form, setForm] = useStateC({
      name: "",
      email: "",
      phone: "",
      company: "",
      // company = honeypot (hidden; real people leave it blank)
      vehicle: prefill ? `${prefill.brand.name} ${prefill.model.name} (${prefill.gen.years[0]}\u2013${prefill.gen.years[1]}) ${prefill.engine.label}` : "",
      message: prefill ? getLang() === "fr" ? `Je suis int\xE9ress\xE9 par ${prefill.stage.name} pour ma ${prefill.model.name}.` : `I'm interested in ${prefill.stage.name} for my ${prefill.model.name}.` : ""
    });
    const [errors, setErrors] = useStateC({});
    const [sent, setSent] = useStateC(false);
    const [sending, setSending] = useStateC(false);
    const [delivered, setDelivered] = useStateC(false);
    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
    const validate = () => {
      const er = {};
      if (!form.name.trim()) er.name = t("con.req");
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = t("con.emailReq");
      if (!form.message.trim()) er.message = t("con.msgReq");
      setErrors(er);
      return Object.keys(er).length === 0;
    };
    const encode = (data) => Object.keys(data).map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k] || "")).join("&");
    const submit = async (e) => {
      e.preventDefault();
      if (sending) return;
      if (form.company) {
        setDelivered(true);
        setSent(true);
        return;
      }
      if (!validate()) return;
      const payload = { name: form.name, email: form.email, phone: form.phone, vehicle: form.vehicle, message: form.message };
      let ok = false;
      setSending(true);
      try {
        if (CONFIG.formProvider === "netlify") {
          const res = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", "bot-field": "", ...payload })
          });
          ok = res.ok;
        } else if (CONFIG.formProvider === "formspree" && CONFIG.formEndpoint) {
          const res = await fetch(CONFIG.formEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload)
          });
          ok = res.ok;
        }
      } catch (_) {
        ok = false;
      }
      setSending(false);
      setDelivered(ok);
      setSent(true);
    };
    const mailto = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Tuning enquiry \u2014 " + (form.vehicle || "vehicle"))}&body=${encodeURIComponent(`${form.message}

\u2014 ${form.name}
${form.phone}`)}`;
    const field = (label, k, type = "text", textarea = false) => /* @__PURE__ */ React.createElement("label", { className: "block" }, /* @__PURE__ */ React.createElement("span", { className: "font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--text2)]" }, label), textarea ? /* @__PURE__ */ React.createElement(
      "textarea",
      {
        name: k,
        value: form[k],
        onChange: set(k),
        rows: 4,
        className: "az-input mt-2 w-full resize-none rounded-xl px-4 py-3 text-[14px]"
      }
    ) : /* @__PURE__ */ React.createElement(
      "input",
      {
        name: k,
        value: form[k],
        onChange: set(k),
        type,
        className: "az-input mt-2 w-full rounded-xl px-4 py-3 text-[14px]"
      }
    ), errors[k] && /* @__PURE__ */ React.createElement("span", { className: "mt-1 block font-mono text-[11px] text-[var(--reprog)]" }, errors[k]));
    return /* @__PURE__ */ React.createElement("div", { className: "az-screen pb-24 pt-28 md:pt-32" }, /* @__PURE__ */ React.createElement(
      PageHead,
      {
        eyebrow: t("con.eyebrow"),
        title: t("con.titleA"),
        accentWord: t("con.titleB"),
        sub: t("con.sub")
      }
    ), /* @__PURE__ */ React.createElement("section", { className: "mx-auto mt-12 grid max-w-[1280px] gap-8 px-5 md:px-8 lg:grid-cols-[1.15fr_0.85fr]" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-7 md:p-8" }, sent ? /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center py-10 text-center" }, /* @__PURE__ */ React.createElement("span", { className: "grid h-16 w-16 place-items-center rounded-full bg-[var(--accent)] text-black" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 30, stroke: 3 })), /* @__PURE__ */ React.createElement("h3", { className: "font-display mt-6 text-[26px] font-black uppercase" }, delivered ? t("con.sent") : t("con.ready")), /* @__PURE__ */ React.createElement("p", { className: "mt-3 max-w-sm text-[14px] text-[var(--text2)]" }, delivered ? `${t("con.thanks")} ${form.name.split(" ")[0] || "\u2014"} \u2014 ${t("con.thanksSent")}` : `${t("con.thanks")} ${form.name.split(" ")[0] || "\u2014"}! ${t("con.thanksReady")}`), delivered && /* @__PURE__ */ React.createElement("p", { className: "mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]" }, t("con.prefer")), /* @__PURE__ */ React.createElement("div", { className: "mt-4 flex flex-wrap items-center justify-center gap-3" }, delivered ? /* @__PURE__ */ React.createElement(GhostBtn, { size: "md", icon: "mail", href: mailto }, t("con.emailBtn")) : /* @__PURE__ */ React.createElement(PrimaryBtn, { size: "md", icon: "arrow", href: mailto }, t("con.emailUs")), /* @__PURE__ */ React.createElement(GhostBtn, { size: "md", icon: "phone", href: `https://wa.me/${CONFIG.whatsapp}` }, "WhatsApp"), /* @__PURE__ */ React.createElement(GhostBtn, { size: "md", href: content().instagram.url }, "Instagram"))) : /* @__PURE__ */ React.createElement("form", { onSubmit: submit, noValidate: true, className: "space-y-5" }, /* @__PURE__ */ React.createElement("input", { name: "company", value: form.company, onChange: set("company"), tabIndex: -1, autoComplete: "off", "aria-hidden": "true", className: "hidden" }), /* @__PURE__ */ React.createElement("div", { className: "grid gap-5 sm:grid-cols-2" }, field(t("con.name"), "name"), field(t("con.email"), "email", "email")), /* @__PURE__ */ React.createElement("div", { className: "grid gap-5 sm:grid-cols-2" }, field(t("con.phone"), "phone", "tel"), field(t("con.vehicle"), "vehicle")), field(t("con.message"), "message", "text", true), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-4 pt-1" }, /* @__PURE__ */ React.createElement(PrimaryBtn, { size: "lg", icon: sending ? null : "arrow" }, sending ? t("con.sending") : t("con.send")), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-[12px] text-[var(--muted)]" }, t("con.orCall"), " ", sh.phone)))), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-7" }, /* @__PURE__ */ React.createElement("h3", { className: "font-display text-[18px] font-bold uppercase tracking-[0.04em]" }, t("con.theShop")), /* @__PURE__ */ React.createElement("ul", { className: "mt-5 space-y-4 text-[14px]" }, [["pin", sh.address], ["phone", sh.phone], ["mail", sh.email], ["clock", sh.hours]].map(([ic, v]) => /* @__PURE__ */ React.createElement("li", { key: v, className: "flex gap-3 text-[var(--text2)]" }, /* @__PURE__ */ React.createElement(Icon, { name: ic, size: 17, className: "mt-0.5 shrink-0 text-[var(--accent)]" }), /* @__PURE__ */ React.createElement("span", null, v)))), /* @__PURE__ */ React.createElement("div", { className: "mt-6 flex gap-2" }, [
      ["ig", sh.ig, `https://www.instagram.com/${sh.ig.replace(/^@/, "")}/`],
      ["tiktok", sh.tiktok, `https://www.tiktok.com/${sh.tiktok}`],
      ["youtube", sh.youtube, `https://www.youtube.com/${sh.youtube}`]
    ].map(([ic, v, url]) => /* @__PURE__ */ React.createElement("a", { key: v, href: url, target: "_blank", rel: "noreferrer", title: v, className: "grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--text2)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]" }, /* @__PURE__ */ React.createElement(Icon, { name: ic, size: 17 }))))), /* @__PURE__ */ React.createElement("div", { className: "relative h-72 overflow-hidden rounded-3xl border border-[var(--line)] bg-[#0e0e10]" }, /* @__PURE__ */ React.createElement(
      "iframe",
      {
        title: "AZ Motorsport \u2014 9620 Rue Ignace, Brossard, QC",
        src: "https://maps.google.com/maps?q=9620%20Rue%20Ignace%2C%20Brossard%2C%20QC%20J4Y%202R4&z=15&output=embed",
        loading: "lazy",
        referrerPolicy: "no-referrer-when-downgrade",
        className: "absolute inset-0 h-full w-full",
        style: { border: 0, pointerEvents: "none", filter: "invert(0.92) hue-rotate(180deg) saturate(0.6) brightness(0.92) contrast(0.95)" }
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "absolute left-4 top-4 max-w-[80%] rounded-xl border border-[var(--line)] bg-[#111114]/95 px-4 py-3 shadow-xl backdrop-blur" }, /* @__PURE__ */ React.createElement("div", { className: "font-display text-[13px] font-bold uppercase tracking-[0.04em] text-white" }, "AZ Motorsport"), /* @__PURE__ */ React.createElement("div", { className: "mt-1 text-[12px] leading-snug text-[var(--text2)]" }, "9620 Rue Ignace, local O", /* @__PURE__ */ React.createElement("br", null), "Brossard, QC J4Y 2R4")), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "https://www.google.com/maps/search/?api=1&query=9620%20Rue%20Ignace%2C%20Brossard%2C%20QC%20J4Y%202R4",
        target: "_blank",
        rel: "noreferrer",
        className: "az-btn-primary absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-lg px-3.5 py-2 font-display text-[11px] font-bold uppercase tracking-[0.14em]"
      },
      t("deal.maps"),
      " ",
      /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 13 })
    )))));
  }
  function TuningScreen({ onContact, onBrowse }) {
    return /* @__PURE__ */ React.createElement("div", { className: "az-screen pb-8 pt-28 md:pt-32" }, /* @__PURE__ */ React.createElement("section", { className: "relative overflow-hidden border-b border-[var(--line)] pb-14" }, /* @__PURE__ */ React.createElement("div", { className: "az-grid-bg pointer-events-none absolute inset-0 opacity-[0.5]" }), /* @__PURE__ */ React.createElement("div", { className: "pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.06] blur-[130px]" }), /* @__PURE__ */ React.createElement(
      PageHead,
      {
        eyebrow: t("tun.eyebrow"),
        title: t("tun.title"),
        accentWord: t("tun.accent"),
        sub: t("tun.sub")
      },
      /* @__PURE__ */ React.createElement("div", { className: "mt-8 flex flex-wrap gap-3" }, /* @__PURE__ */ React.createElement(PrimaryBtn, { size: "lg", icon: "arrow", onClick: onBrowse }, t("tun.browse")), /* @__PURE__ */ React.createElement(GhostBtn, { size: "lg", onClick: onContact }, t("tun.engineer")))
    )), /* @__PURE__ */ React.createElement(ContentStack, { onContact }));
  }
  function VideoGallery({ videos }) {
    const [vid, setVid] = useStateC(null);
    useEffectC(() => {
      if (!vid) return;
      const f = (e) => {
        if (e.key === "Escape") setVid(null);
      };
      window.addEventListener("keydown", f);
      return () => window.removeEventListener("keydown", f);
    }, [vid]);
    if (!videos || !videos.length) return null;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "grid gap-4 md:grid-cols-3" }, videos.map((v, i) => /* @__PURE__ */ React.createElement(Reveal, { key: i, delay: i * 70 }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => setVid(v.src),
        className: "group relative block aspect-video w-full overflow-hidden rounded-2xl border border-[var(--line)] bg-black"
      },
      /* @__PURE__ */ React.createElement(
        "video",
        {
          src: `${v.src}#t=0.5`,
          muted: true,
          playsInline: true,
          preload: "metadata",
          tabIndex: -1,
          className: "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
        }
      ),
      /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" }),
      /* @__PURE__ */ React.createElement("span", { className: "absolute inset-0 grid place-items-center" }, /* @__PURE__ */ React.createElement("span", { className: "grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-black/45 pl-1 text-white backdrop-blur transition-transform duration-300 group-hover:scale-110 group-hover:border-[var(--accent)]/60" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", width: "22", height: "22", fill: "currentColor", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M8 5v14l11-7z" }))))
    )))), vid && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-[70] flex items-center justify-center p-4", onClick: () => setVid(null) }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-black/85 backdrop-blur-sm az-fade" }), /* @__PURE__ */ React.createElement("div", { className: "az-pop relative", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement(
      "video",
      {
        src: vid,
        controls: true,
        autoPlay: true,
        playsInline: true,
        className: "block max-h-[86vh] w-auto max-w-[92vw] rounded-2xl border border-[var(--line)] bg-black"
      }
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setVid(null),
        "aria-label": "Close",
        className: "absolute -right-3 -top-3 grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] bg-[#111114] text-white transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "close", size: 16 })
    ))));
  }
  function DynoScreen({ onContact }) {
    const D = content().dyno;
    return /* @__PURE__ */ React.createElement("div", { className: "az-screen pb-8 pt-28 md:pt-32" }, /* @__PURE__ */ React.createElement("section", { className: "relative overflow-hidden border-b border-[var(--line)] pb-14" }, /* @__PURE__ */ React.createElement("div", { className: "az-grid-bg pointer-events-none absolute inset-0 opacity-[0.5]" }), /* @__PURE__ */ React.createElement("div", { className: "pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.06] blur-[130px]" }), /* @__PURE__ */ React.createElement(PageHead, { eyebrow: t("dyno.eyebrow"), title: t("dyno.title"), accentWord: t("dyno.accent"), sub: D.intro }, /* @__PURE__ */ React.createElement("div", { className: "mt-8 flex flex-wrap gap-3" }, /* @__PURE__ */ React.createElement(PrimaryBtn, { size: "lg", icon: "arrow", href: CONFIG.bookingUrl }, t("dyno.makeAppt")), /* @__PURE__ */ React.createElement(GhostBtn, { size: "lg", onClick: onContact }, t("dyno.ask")))), /* @__PURE__ */ React.createElement("div", { className: "mx-auto mt-12 max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-4" }, D.stats.map((c) => /* @__PURE__ */ React.createElement("div", { key: c.v, className: "bg-[var(--panel)] px-5 py-6" }, /* @__PURE__ */ React.createElement("div", { className: "font-display text-[clamp(1.1rem,3vw,1.6rem)] font-black leading-none text-[var(--accent)]" }, c.k), /* @__PURE__ */ React.createElement("div", { className: "mt-2 text-[11px] uppercase tracking-[0.12em] text-[var(--text2)]" }, c.v)))))), /* @__PURE__ */ React.createElement("section", { className: "mx-auto mt-16 max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement(SectionHead, { eyebrow: t("dyno.whyEyebrow"), title: t("dyno.whyTitle"), accentWord: t("dyno.whyAccent") }), /* @__PURE__ */ React.createElement("div", { className: "mt-10 grid gap-4 sm:grid-cols-2" }, D.features.map((f, i) => /* @__PURE__ */ React.createElement(Reveal, { key: f.t, delay: i * 70, className: "rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6" }, /* @__PURE__ */ React.createElement("span", { className: "grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] text-[var(--accent)]" }, /* @__PURE__ */ React.createElement(Icon, { name: "gauge", size: 20 })), /* @__PURE__ */ React.createElement("h3", { className: "font-display mt-4 text-[17px] font-bold uppercase tracking-[0.03em]" }, f.t), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-[14px] leading-relaxed text-[var(--text2)]" }, f.d))))), /* @__PURE__ */ React.createElement("section", { className: "mx-auto mt-20 max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" }, /* @__PURE__ */ React.createElement(
      SectionHead,
      {
        eyebrow: t("dyno.rollersEyebrow"),
        title: t("dyno.rollersTitle"),
        accentWord: t("dyno.rollersAccent"),
        sub: t("dyno.rollersSub")
      }
    ), /* @__PURE__ */ React.createElement(PrimaryBtn, { size: "md", icon: "arrow", href: content().instagram.url }, t("cs.moreIg"))), /* @__PURE__ */ React.createElement("div", { className: "mt-10" }, /* @__PURE__ */ React.createElement(VideoGallery, { videos: content().videos }))), /* @__PURE__ */ React.createElement("section", { className: "mx-auto mt-20 max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement(Reveal, { className: "relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--panel)] px-7 py-14 text-center md:py-16" }, /* @__PURE__ */ React.createElement("div", { className: "pointer-events-none absolute left-1/2 top-0 h-72 w-[640px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.08] blur-[110px]" }), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(Eyebrow, { className: "justify-center" }, t("dyno.interested")), /* @__PURE__ */ React.createElement("h2", { className: "font-display mx-auto mt-4 max-w-2xl text-[clamp(1.7rem,4vw,2.6rem)] font-black uppercase leading-[0.98]" }, t("dyno.bookA"), " ", /* @__PURE__ */ React.createElement("span", { className: "text-[var(--accent)]" }, t("dyno.bookB"))), /* @__PURE__ */ React.createElement("p", { className: "mx-auto mt-4 max-w-md text-[15px] text-[var(--text2)]" }, t("dyno.bookSub")), /* @__PURE__ */ React.createElement("div", { className: "mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" }, /* @__PURE__ */ React.createElement(PrimaryBtn, { size: "lg", icon: "arrow", href: CONFIG.bookingUrl }, t("dyno.makeAppt")), /* @__PURE__ */ React.createElement(GhostBtn, { size: "lg", onClick: onContact }, t("cs.contactUs")))))));
  }
  function DealersScreen({ onContact }) {
    const D = content().dealers;
    const mapUrl = (a) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a)}`;
    const tel = (p) => "tel:+1" + p.replace(/[^0-9]/g, "");
    return /* @__PURE__ */ React.createElement("div", { className: "az-screen pb-24 pt-28 md:pt-32" }, /* @__PURE__ */ React.createElement("section", { className: "relative overflow-hidden border-b border-[var(--line)] pb-14" }, /* @__PURE__ */ React.createElement("div", { className: "az-grid-bg pointer-events-none absolute inset-0 opacity-[0.5]" }), /* @__PURE__ */ React.createElement("div", { className: "pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.06] blur-[130px]" }), /* @__PURE__ */ React.createElement(PageHead, { eyebrow: t("deal.eyebrow"), title: t("deal.title"), accentWord: t("deal.accent"), sub: D.intro })), /* @__PURE__ */ React.createElement("section", { className: "mx-auto mt-12 max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-end justify-between gap-4" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-[20px] font-bold uppercase tracking-[0.06em]" }, t("deal.partners")), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-[12px] text-[var(--muted)]" }, D.list.filter((d) => !d.soon).length, " ", t("deal.locations"))), /* @__PURE__ */ React.createElement("div", { className: "mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" }, D.list.map((d, i) => /* @__PURE__ */ React.createElement(Reveal, { key: d.name, delay: i % 3 * 70 }, d.soon ? /* @__PURE__ */ React.createElement("div", { className: "flex h-full flex-col rounded-2xl border border-dashed border-[var(--line)] bg-white/[0.015] p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "font-display text-[18px] font-bold uppercase tracking-[0.02em]" }, d.name), /* @__PURE__ */ React.createElement("span", { className: "rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent)]" }, t("deal.soon"))), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-[13px] text-[var(--text2)]" }, d.city), /* @__PURE__ */ React.createElement("p", { className: "mt-auto pt-6 text-[12px] text-[var(--muted)]" }, t("deal.opening"))) : /* @__PURE__ */ React.createElement("div", { className: "az-tile flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-display text-[18px] font-bold uppercase leading-tight tracking-[0.02em]" }, d.name), /* @__PURE__ */ React.createElement("p", { className: "mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--accent)]" }, d.city)), /* @__PURE__ */ React.createElement("span", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line)] text-[var(--accent)]" }, /* @__PURE__ */ React.createElement(Icon, { name: "pin", size: 18 }))), /* @__PURE__ */ React.createElement("p", { className: "mt-4 flex gap-2 text-[13px] leading-relaxed text-[var(--text2)]" }, /* @__PURE__ */ React.createElement(Icon, { name: "pin", size: 15, className: "mt-0.5 shrink-0 text-[var(--muted)]" }), d.address), d.phone && /* @__PURE__ */ React.createElement("a", { href: tel(d.phone), className: "mt-2 flex items-center gap-2 text-[13px] text-[var(--text2)] transition-colors hover:text-white" }, /* @__PURE__ */ React.createElement(Icon, { name: "phone", size: 15, className: "shrink-0 text-[var(--muted)]" }), d.phone), /* @__PURE__ */ React.createElement("a", { href: mapUrl(d.address), target: "_blank", rel: "noreferrer", className: "mt-auto inline-flex items-center gap-1.5 pt-5 font-display text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent)] hover:underline" }, t("deal.maps"), " ", /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 13 })))))), /* @__PURE__ */ React.createElement("div", { className: "mt-12 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[var(--line)] bg-white/[0.015] px-6 py-9 text-center" }, /* @__PURE__ */ React.createElement("h3", { className: "font-display text-[20px] font-bold uppercase tracking-[0.03em]" }, t("deal.becomeTitle")), /* @__PURE__ */ React.createElement("p", { className: "max-w-md text-[14px] text-[var(--text2)]" }, t("deal.becomeBody")), /* @__PURE__ */ React.createElement(PrimaryBtn, { size: "sm", onClick: onContact, icon: "arrow" }, t("deal.getInTouch")))));
  }
  Object.assign(window, { ContentStack, ContactScreen, TuningScreen, Reveal, SectionHead, FaqItem, MapSwitch, VideoGallery, DynoScreen, DealersScreen });
})();
