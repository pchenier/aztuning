(() => {
  const { useState: useStateR, useEffect: useEffectR } = React;
  function StatCard({ brand, model, engine, hp, tq, stageKey }) {
    const [imgOk, setImgOk] = useStateR(true);
    const photo = carImage(brand.slug, engine.chassis) || model.image;
    const hasPhoto = !!photo && imgOk;
    const hpN = useCountUp(hp, [stageKey, hp]);
    const tqN = useCountUp(tq, [stageKey, tq]);
    return /* @__PURE__ */ React.createElement("div", { className: "relative overflow-hidden rounded-3xl border border-[var(--line)] bg-black" }, /* @__PURE__ */ React.createElement("div", { className: "pointer-events-none absolute -top-28 left-1/2 h-[300px] w-[420px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.08] blur-[110px]" }), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 flex justify-center pt-7" }, /* @__PURE__ */ React.createElement("img", { src: "/assets/apex-logo.webp", alt: "Apex Calibration", className: "h-8 w-auto opacity-90" })), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 grid grid-cols-2 gap-2 px-6 pt-6 text-center" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-display text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--text2)]" }, t("res.horsepower")), /* @__PURE__ */ React.createElement("div", { className: "font-stat mt-1 text-[clamp(4rem,11vw,8rem)] text-white" }, hpN)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-display text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--text2)]" }, t("res.torque")), /* @__PURE__ */ React.createElement("div", { className: "font-stat mt-1 text-[clamp(4rem,11vw,8rem)] text-white" }, tqN))), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 -mt-2" }, hasPhoto ? /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0", style: { background: "linear-gradient(180deg, rgba(234,234,232,0) 15%, rgba(234,234,232,0.5) 33%, #ececea 50%, #dcdcd9 100%)" } }), /* @__PURE__ */ React.createElement(
      "img",
      {
        src: photo,
        alt: `${brand.name} ${model.name}`,
        onError: () => setImgOk(false),
        className: "relative z-10 mx-auto block w-[90%] max-w-none object-contain drop-shadow-[0_22px_26px_rgba(0,0,0,0.38)]"
      }
    )) : /* @__PURE__ */ React.createElement("div", { className: "relative px-5 pb-6" }, /* @__PURE__ */ React.createElement(CarArt, { body: model.body, monogram: brandMono(brand.name), className: "w-full" }))), /* @__PURE__ */ React.createElement("div", { className: "absolute left-5 top-5 z-10 font-mono text-[11px] uppercase tracking-[0.18em] text-white/35" }, engine.chassis));
  }
  function StatBar({ label, unit, origin, gain, stageKey }) {
    const [w, setW] = useStateR(0);
    const total = origin + gain;
    const gainPct = Math.max(8, Math.min(46, gain / total * 100));
    useEffectR(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setW(100);
        return;
      }
      setW(0);
      const t2 = setTimeout(() => setW(100), 50);
      return () => clearTimeout(t2);
    }, [stageKey, origin, gain]);
    const tuned = useCountUp(total, [stageKey, total]);
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-end justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "font-display text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--text2)]" }, label), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-[15px] font-bold tabular-nums text-[var(--accent)]" }, tuned, /* @__PURE__ */ React.createElement("span", { className: "ml-1 text-[11px] text-[var(--text2)]" }, unit))), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "mt-2 flex h-9 w-full overflow-hidden rounded-lg border border-[var(--line)] bg-[#0e0e10]",
        style: { opacity: w ? 1 : 0.4, transition: "opacity .4s" }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "flex flex-1 items-center justify-center bg-white/[0.07] font-mono text-[12px] tabular-nums text-[var(--text2)]",
          style: { transition: "flex-grow .8s cubic-bezier(.2,.6,.2,1)", flexGrow: w ? 100 - gainPct : 0 }
        },
        origin,
        " ",
        unit
      ),
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "flex items-center justify-center bg-[var(--accent)] font-mono text-[12px] font-bold tabular-nums text-black",
          style: { transition: "flex-grow .8s cubic-bezier(.2,.6,.2,1)", flexGrow: w ? gainPct : 0, boxShadow: "0 0 18px rgba(255,92,0,.4)" }
        },
        "+",
        gain
      )
    ), /* @__PURE__ */ React.createElement("div", { className: "mt-1.5 flex items-center justify-between font-display text-[10px] font-bold uppercase tracking-[0.18em]" }, /* @__PURE__ */ React.createElement("span", { className: "text-[var(--muted)]" }, t("res.factory")), /* @__PURE__ */ React.createElement("span", { className: "text-[var(--accent)]" }, t("res.azTuned"))));
  }
  function StageRow({ stage, active, onPick, expandable, open }) {
    const price = stage.price == null ? t("res.onDemand") : fmtPrice(stage.price);
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: onPick,
        "aria-expanded": expandable ? !!open : void 0,
        className: `flex w-full items-center gap-3.5 rounded-xl border px-4 py-3.5 text-left transition-all duration-200
        ${active ? "border-[var(--accent)] bg-[var(--accent)]/[0.07] shadow-[0_0_22px_-6px_rgba(255,92,0,0.4)]" : "border-[var(--line)] bg-[var(--panel)] hover:border-white/20"}`
      },
      /* @__PURE__ */ React.createElement("span", { className: `grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors
        ${active ? "border-[var(--accent)] bg-[var(--accent)] text-black" : "border-white/25 text-transparent"}` }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 13, stroke: 3 })),
      /* @__PURE__ */ React.createElement("span", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("span", { className: "font-display text-[14px] font-bold uppercase tracking-[0.03em] text-white" }, stage.name), /* @__PURE__ */ React.createElement("span", { className: "block truncate text-[12px] text-[var(--text2)]" }, t(stage.requirement || stage.description || ""))),
      /* @__PURE__ */ React.createElement("span", { className: `shrink-0 font-mono text-[14px] font-bold ${active ? "text-[var(--accent)]" : "text-[var(--text2)]"}` }, price),
      expandable && /* @__PURE__ */ React.createElement(Icon, { name: "chevronDown", size: 16, className: `shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-[var(--accent)]" : "text-[var(--muted)]"}` })
    );
  }
  function HardwarePanel({ brand, model, engine, stage }) {
    const info = partLink(brand, model, engine, stage);
    return /* @__PURE__ */ React.createElement(
      "a",
      {
        href: info.url,
        target: "_blank",
        rel: "noreferrer",
        className: "az-pop group mt-2 flex items-center gap-3.5 rounded-xl border border-[var(--accent)]/35 bg-[var(--accent)]/[0.05] px-4 py-3.5 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/[0.09]"
      },
      /* @__PURE__ */ React.createElement("span", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[var(--accent)]/30 text-[var(--accent)]" }, /* @__PURE__ */ React.createElement(Icon, { name: "gauge", size: 17 })),
      /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "font-display text-[13px] font-bold uppercase tracking-[0.03em] text-white" }, stage.name, " ", t("hw.requires"), " ", t(info.noun)), /* @__PURE__ */ React.createElement("p", { className: "mt-0.5 text-[12px] leading-snug text-[var(--text2)]" }, info.exact ? t("hw.exactPre") : t("hw.findPre"), engine.chassis, " ", t("hw.storeSuffix"))),
      /* @__PURE__ */ React.createElement("span", { className: "inline-flex shrink-0 items-center gap-1.5 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--accent)]" }, info.exact ? t("hw.viewPart") : t("hw.shop"), /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 13, className: "transition-transform duration-200 group-hover:translate-x-0.5" }))
    );
  }
  function AddonRow({ icon, title, body, price, right, href, onClick, accent }) {
    const Tag = href ? "a" : onClick ? "button" : "label";
    const rightLabel = price != null ? `+ ${fmtPrice(price)}` : right;
    return /* @__PURE__ */ React.createElement(
      Tag,
      {
        href,
        onClick,
        target: href ? "_blank" : void 0,
        rel: "noreferrer",
        className: `flex w-full items-center gap-3.5 rounded-xl border p-4 text-left transition-colors
        ${accent ? "border-[var(--accent)]/40 bg-[var(--accent)]/[0.05] hover:border-[var(--accent)]" : "border-[var(--line)] bg-[var(--panel)] hover:border-white/20"}`
      },
      /* @__PURE__ */ React.createElement("span", { className: `grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[var(--line)] ${accent ? "text-[var(--accent)]" : "text-[var(--accent)]"}` }, /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 17 })),
      /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 font-display text-[14px] font-bold uppercase tracking-[0.03em] text-white" }, title, (href || onClick) && /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 13, className: "text-[var(--muted)]" })), /* @__PURE__ */ React.createElement("p", { className: "mt-0.5 text-[12px] leading-relaxed text-[var(--text2)]" }, body)),
      CONFIG.showPrices && rightLabel && /* @__PURE__ */ React.createElement("span", { className: `shrink-0 whitespace-nowrap font-mono text-[12px] font-bold ${accent ? "text-[var(--accent)]" : price != null ? "text-[var(--accent)]" : "bg-gradient-to-r from-[var(--green)] to-[var(--accent)] bg-clip-text text-transparent"}` }, rightLabel)
    );
  }
  function DetailTable({ stage }) {
    const rows = [
      { k: "Power", unit: "Hp", o: stage.powerOrigin, g: stage.powerGain },
      { k: "Torque", unit: "Nm", o: stage.torqueOrigin, g: stage.torqueGain }
    ];
    return /* @__PURE__ */ React.createElement("div", { className: "overflow-hidden rounded-2xl border border-[var(--line)]" }, /* @__PURE__ */ React.createElement("table", { className: "w-full border-collapse font-mono text-[13px] tabular-nums" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { className: "bg-white/[0.03] text-left text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]" }, /* @__PURE__ */ React.createElement("th", { className: "px-5 py-3 font-semibold" }, "Measure"), /* @__PURE__ */ React.createElement("th", { className: "px-5 py-3 text-right font-semibold" }, "Origin"), /* @__PURE__ */ React.createElement("th", { className: "px-5 py-3 text-right font-semibold" }, "Gain"), /* @__PURE__ */ React.createElement("th", { className: "px-5 py-3 text-right font-semibold" }, "Reprogrammed"))), /* @__PURE__ */ React.createElement("tbody", null, rows.map((r) => /* @__PURE__ */ React.createElement("tr", { key: r.k, className: "border-t border-[var(--line)]" }, /* @__PURE__ */ React.createElement("td", { className: "px-5 py-3.5 font-display text-[13px] font-bold uppercase tracking-[0.06em] text-white" }, r.k), /* @__PURE__ */ React.createElement("td", { className: "px-5 py-3.5 text-right text-[var(--text2)]" }, r.o, " ", r.unit), /* @__PURE__ */ React.createElement("td", { className: "px-5 py-3.5 text-right text-[var(--green)]" }, "+", r.g, " ", r.unit), /* @__PURE__ */ React.createElement("td", { className: "px-5 py-3.5 text-right font-bold text-[var(--reprog)]" }, r.o + r.g, " ", r.unit))))));
  }
  function ResultsScreen({ ctx, onBack, onContact }) {
    var _a, _b;
    const { brand, model, gen, engine } = ctx;
    const [idx, setIdx] = useStateR(0);
    const stage = engine.stages[idx];
    const isPower = stage.powerGain != null;
    const pod = stage.price == null;
    const priceLabel = pod ? t("res.priceOnDemand") : fmtPrice(stage.price);
    const powerStages = engine.stages.filter((s) => s.powerGain != null);
    const ref = isPower ? stage : powerStages[powerStages.length - 1] || null;
    const hp = ref ? ref.powerOrigin + ref.powerGain : engine.power;
    const tq = ref ? ref.torqueOrigin + ref.torqueGain : 0;
    const s2price = (_b = (_a = engine.stages.find((s) => s.name === "Stage 2")) == null ? void 0 : _a.price) != null ? _b : null;
    const tcuPrice = engine.tcu != null ? engine.tcu : s2price != null ? Math.round(s2price * 0.4) : null;
    const multimapPrice = engine.multimap != null ? engine.multimap : s2price != null ? Math.round(s2price * 0.2) : null;
    const basicFrom = (() => {
      const mm = engine.msrp;
      if (typeof mm !== "number" || mm > 250) return 750;
      if (mm <= 80) return 350;
      if (mm <= 150) return 550;
      return 750;
    })();
    return /* @__PURE__ */ React.createElement("div", { className: "az-screen pb-24 pt-28 md:pt-32" }, /* @__PURE__ */ React.createElement("div", { className: "pointer-events-none absolute inset-x-0 top-0 -z-0" }, /* @__PURE__ */ React.createElement("div", { className: "az-grid-bg h-[520px] w-full opacity-[0.4]" })), /* @__PURE__ */ React.createElement("section", { className: "relative mx-auto max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement(GhostBtn, { size: "sm", icon: "arrow", iconLeft: true, onClick: onBack, className: "mb-8" }, t("res.back")), /* @__PURE__ */ React.createElement("div", { className: "grid items-start gap-8 lg:grid-cols-[1fr_1.02fr]" }, /* @__PURE__ */ React.createElement("div", { className: "lg:sticky lg:top-[90px]" }, /* @__PURE__ */ React.createElement(StatCard, { brand, model, engine, hp, tq, stageKey: stage.name })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "font-display text-[clamp(2rem,4.4vw,3.2rem)] font-black uppercase leading-[0.96] tracking-[-0.01em]" }, brand.name, " ", /* @__PURE__ */ React.createElement("span", { className: "text-[var(--accent)]" }, model.name)), /* @__PURE__ */ React.createElement("div", { className: "mt-2 font-display text-[15px] font-bold uppercase tracking-[0.04em] text-[var(--accent)]" }, gen.years[0], " \u2013 ", gen.years[1], " \xB7 ", isPower ? t("res.customTune") : stage.name), /* @__PURE__ */ React.createElement("div", { className: "mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[12px]" }, [[t("res.chassis"), engine.chassis], [t("res.engine"), engine.engineFamily], [t("res.fuel"), t(engine.fuel)], [t("res.stock"), `${engine.power} BHP`]].map(([k, v]) => /* @__PURE__ */ React.createElement("span", { key: k, className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "uppercase tracking-[0.16em] text-[var(--muted)]" }, k), /* @__PURE__ */ React.createElement("span", { className: "text-white" }, v)))), /* @__PURE__ */ React.createElement("div", { className: "mt-6 flex items-baseline gap-3" }, /* @__PURE__ */ React.createElement("span", { className: `font-display text-[clamp(2rem,5vw,2.8rem)] font-black leading-none ${pod ? "text-[var(--text2)]" : "text-white"}` }, priceLabel), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-[12px] uppercase tracking-[0.16em] text-[var(--muted)]" }, pod ? t("res.quote") : `${stage.name} \xB7 ${t("res.from")}`)), /* @__PURE__ */ React.createElement("div", { className: "mt-7" }, /* @__PURE__ */ React.createElement("div", { className: "font-display text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--muted)]" }, t("res.stage")), /* @__PURE__ */ React.createElement("div", { className: "mt-3 grid gap-2.5" }, engine.stages.map((s, i) => {
      const active = i === idx;
      const hw = needsHardware(s);
      return /* @__PURE__ */ React.createElement("div", { key: s.name }, /* @__PURE__ */ React.createElement(StageRow, { stage: s, active, onPick: () => setIdx(i), expandable: hw, open: active && hw }), hw && active && /* @__PURE__ */ React.createElement(HardwarePanel, { brand, model, engine, stage: s }));
    }))), isPower ? /* @__PURE__ */ React.createElement("div", { className: "mt-7" }, /* @__PURE__ */ React.createElement("div", { className: "grid gap-6" }, /* @__PURE__ */ React.createElement(StatBar, { label: t("res.horsepower"), unit: "HP", origin: stage.powerOrigin, gain: stage.powerGain, stageKey: stage.name }), /* @__PURE__ */ React.createElement(StatBar, { label: t("res.torque"), unit: "Nm", origin: stage.torqueOrigin, gain: stage.torqueGain, stageKey: stage.name })), /* @__PURE__ */ React.createElement("p", { className: "mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-[var(--muted)]" }, /* @__PURE__ */ React.createElement(Icon, { name: "spark", size: 13, className: "mt-0.5 shrink-0 text-[var(--accent)]" }), /* @__PURE__ */ React.createElement("span", null, t("res.estGains")))) : /* @__PURE__ */ React.createElement("div", { className: "mt-7 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6" }, /* @__PURE__ */ React.createElement("span", { className: "grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--accent)]" }, /* @__PURE__ */ React.createElement(Icon, { name: "bolt", size: 19 })), /* @__PURE__ */ React.createElement("h3", { className: "font-display mt-4 text-[18px] font-bold uppercase tracking-[0.02em]" }, stage.name), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-[14px] leading-relaxed text-[var(--text2)]" }, stage.description)), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => onContact({ brand, model, gen, engine, stage }),
        className: "s4t-row mt-3 flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left"
      },
      /* @__PURE__ */ React.createElement("img", { src: "/assets/s4t-logo.webp", alt: "Stage 4 Tuning", className: "h-7 w-auto shrink-0" }),
      /* @__PURE__ */ React.createElement("span", { className: "min-w-0 flex-1 text-[12px] leading-snug text-[var(--text2)]" }, t("res.s4t")),
      /* @__PURE__ */ React.createElement("span", { className: "shrink-0 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-[#F2691E]" }, t("res.contactArrow"))
    ), /* @__PURE__ */ React.createElement("div", { className: "mt-7" }, /* @__PURE__ */ React.createElement("div", { className: "font-display text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--muted)]" }, t("res.options")), /* @__PURE__ */ React.createElement("div", { className: "mt-3 grid gap-2.5" }, /* @__PURE__ */ React.createElement(
      AddonRow,
      {
        icon: "gauge",
        title: t("res.tcuTitle"),
        body: t("res.tcuBody"),
        price: tcuPrice,
        right: t("res.onDemand")
      }
    ), /* @__PURE__ */ React.createElement(
      AddonRow,
      {
        icon: "bolt",
        title: t("res.mmTitle"),
        body: t("res.mmBody"),
        price: multimapPrice,
        right: t("res.onDemand")
      }
    ), /* @__PURE__ */ React.createElement(
      AddonRow,
      {
        icon: "spark",
        title: t("res.basicTitle"),
        body: t("res.basicBody"),
        right: `${t("res.from$")} ${basicFrom}${CONFIG.currencySuffix}`
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "mt-7 flex flex-col gap-3 sm:flex-row" }, /* @__PURE__ */ React.createElement(PrimaryBtn, { size: "lg", icon: "arrow", onClick: () => onContact({ brand, model, gen, engine, stage }), className: "flex-1" }, t("res.consult")), /* @__PURE__ */ React.createElement(GhostBtn, { size: "lg", href: CONFIG.bookingUrl }, t("res.book"))))), /* @__PURE__ */ React.createElement("p", { className: "mt-10 max-w-3xl text-[12px] leading-relaxed text-[var(--muted)]" }, t("res.resultsAfter"), " ", model.name, ". ", t("res.disclaimer"))), /* @__PURE__ */ React.createElement(ContentStack, { onContact: () => onContact({ brand, model, gen, engine, stage }) }));
  }
  Object.assign(window, { ResultsScreen, StatCard, StatBar, StageRow, HardwarePanel, AddonRow, DetailTable });
})();
