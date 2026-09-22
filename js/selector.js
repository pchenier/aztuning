(() => {
  const { useState: useStateS, useEffect: useEffectS, useRef: useRefS, useMemo: useMemoS } = React;
  function Dropdown({ label, placeholder, value, options, disabled, onChange, renderLeading }) {
    const [open, setOpen] = useStateS(false);
    const [dropUp, setDropUp] = useStateS(false);
    const wrapRef = useRefS(null);
    const selected = options.find((o) => o.value === value) || null;
    const toggle = () => {
      if (disabled) return;
      if (!open && wrapRef.current) {
        const r = wrapRef.current.getBoundingClientRect();
        const below = window.innerHeight - r.bottom;
        setDropUp(below < 300 && r.top > below);
      }
      setOpen((v) => !v);
    };
    useEffectS(() => {
      if (!open) return;
      const onDoc = (e) => {
        if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
      };
      const onKey = (e) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("mousedown", onDoc);
      window.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("mousedown", onDoc);
        window.removeEventListener("keydown", onKey);
      };
    }, [open]);
    useEffectS(() => {
      if (disabled && open) setOpen(false);
    }, [disabled, open]);
    return /* @__PURE__ */ React.createElement("div", { className: "relative", ref: wrapRef }, /* @__PURE__ */ React.createElement("div", { className: "mb-2 font-display text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--muted)]" }, label), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        disabled,
        "aria-expanded": open,
        "aria-haspopup": "listbox",
        onClick: toggle,
        className: "az-dd-trigger flex w-full items-center gap-3 rounded-xl border border-[var(--line)] bg-[#0e0e10] px-4 py-3.5 text-left"
      },
      selected && renderLeading && /* @__PURE__ */ React.createElement("span", { className: "shrink-0 text-[var(--accent)]" }, renderLeading(selected)),
      /* @__PURE__ */ React.createElement("span", { className: `min-w-0 flex-1 truncate text-[15px] ${selected ? "font-semibold text-white" : "text-[var(--muted)]"}` }, selected ? selected.label : placeholder),
      selected && selected.sub && /* @__PURE__ */ React.createElement("span", { className: "hidden shrink-0 font-mono text-[12px] text-[var(--muted)] sm:inline" }, selected.sub),
      /* @__PURE__ */ React.createElement(
        Icon,
        {
          name: "chevronDown",
          size: 18,
          className: `shrink-0 text-[var(--accent)] transition-transform duration-200 ${open ? "rotate-180" : ""}`
        }
      )
    ), open && /* @__PURE__ */ React.createElement(
      "div",
      {
        role: "listbox",
        className: `az-dd-panel az-pop absolute left-0 right-0 z-50 max-h-[280px] overflow-y-auto overscroll-contain rounded-xl p-1.5 ${dropUp ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"}`
      },
      options.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "px-3 py-6 text-center text-[13px] text-[var(--muted)]" }, "Nothing here yet."),
      options.map((o) => {
        const active = o.value === value;
        return /* @__PURE__ */ React.createElement(
          "button",
          {
            key: o.value,
            type: "button",
            role: "option",
            "aria-selected": active,
            disabled: o.disabled,
            onClick: () => {
              if (o.disabled) return;
              onChange(o.value);
              setOpen(false);
            },
            className: `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors
                  ${o.disabled ? "cursor-not-allowed opacity-40" : active ? "bg-[var(--accent)]/12" : "hover:bg-white/5"}`
          },
          renderLeading && /* @__PURE__ */ React.createElement("span", { className: `shrink-0 ${active ? "text-[var(--accent)]" : "text-[var(--text2)]"}` }, renderLeading(o)),
          /* @__PURE__ */ React.createElement("span", { className: `min-w-0 flex-1 truncate text-[14px] font-semibold ${active ? "text-[var(--accent)]" : "text-white"}` }, o.label),
          o.sub && /* @__PURE__ */ React.createElement("span", { className: "shrink-0 font-mono text-[11px] text-[var(--muted)]" }, o.sub),
          active && /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 15, stroke: 3, className: "shrink-0 text-[var(--accent)]" })
        );
      })
    ));
  }
  function VehicleSelector({ initial, onSelect, compact }) {
    var _a, _b;
    const [brandSlug, setBrandSlug] = useStateS(((_a = initial == null ? void 0 : initial.brand) == null ? void 0 : _a.slug) || "");
    const [modelName, setModelName] = useStateS(((_b = initial == null ? void 0 : initial.model) == null ? void 0 : _b.name) || "");
    const [genIdx, setGenIdx] = useStateS("");
    const [engIdx, setEngIdx] = useStateS("");
    useEffectS(() => {
      var _a2, _b2;
      setBrandSlug(((_a2 = initial == null ? void 0 : initial.brand) == null ? void 0 : _a2.slug) || "");
      setModelName(((_b2 = initial == null ? void 0 : initial.model) == null ? void 0 : _b2.name) || "");
      setGenIdx("");
      setEngIdx("");
    }, [initial]);
    const brand = useMemoS(() => SEED_DATA.brands.find((b) => b.slug === brandSlug) || null, [brandSlug]);
    const model = useMemoS(() => (brand == null ? void 0 : brand.models.find((m) => m.name === modelName)) || null, [brand, modelName]);
    const gens = (model == null ? void 0 : model.generations) || [];
    const gen = genIdx !== "" ? gens[+genIdx] : null;
    const engines = (gen == null ? void 0 : gen.engines) || [];
    const needEngine = engines.length > 1;
    const engine = needEngine ? engIdx !== "" ? engines[+engIdx] : null : engines[0] || null;
    const brandOpts = SEED_DATA.brands.map((b) => ({
      value: b.slug,
      label: b.name,
      sub: b.models.length ? `${b.models.length} ${t(b.models.length > 1 ? "unit.models" : "unit.model")}` : t("lbl.soon"),
      disabled: b.models.length === 0
    }));
    const modelOpts = ((brand == null ? void 0 : brand.models) || []).map((m) => ({
      value: m.name,
      label: m.name,
      sub: `${m.generations.length} ${t("unit.gen")}`
    }));
    const yearOpts = gens.map((g, i) => {
      var _a2;
      return {
        value: String(i),
        label: `${g.years[0]} \u2013 ${g.years[1]}`,
        sub: g.engines.length > 1 ? `${g.engines.length} ${t("unit.engines")}` : (_a2 = g.engines[0]) == null ? void 0 : _a2.label
      };
    });
    const engineOpts = engines.map((e, i) => ({
      value: String(i),
      label: e.label,
      sub: `${e.power} CH`
    }));
    const onBrand = (v) => {
      setBrandSlug(v);
      setModelName("");
      setGenIdx("");
      setEngIdx("");
    };
    const onModel = (v) => {
      setModelName(v);
      setGenIdx("");
      setEngIdx("");
    };
    const onYear = (v) => {
      setGenIdx(v);
      setEngIdx("");
    };
    const ready = brand && model && gen && engine;
    const submit = () => {
      if (ready) onSelect({ brand, model, gen, engine });
    };
    return /* @__PURE__ */ React.createElement("div", { className: `relative rounded-3xl border border-[var(--line)] bg-[var(--panel)]/85 backdrop-blur-xl ${compact ? "p-6" : "p-7 md:p-9"}` }, /* @__PURE__ */ React.createElement("div", { className: "pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" }, /* @__PURE__ */ React.createElement("div", { className: "az-grid-bg absolute inset-0 opacity-[0.35]" }), /* @__PURE__ */ React.createElement("div", { className: "absolute -top-24 left-1/2 h-[260px] w-[420px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.07] blur-[100px]" })), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "h-px w-7 bg-[var(--accent)]" }), /* @__PURE__ */ React.createElement("span", { className: "font-display text-[12px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]" }, t("sel.eyebrow"))), /* @__PURE__ */ React.createElement("h2", { className: "font-display mt-3 text-[clamp(1.5rem,3vw,2rem)] font-black uppercase leading-[0.98] tracking-[-0.01em]" }, t("sel.title")), /* @__PURE__ */ React.createElement("div", { className: "mt-7 grid gap-5" }, /* @__PURE__ */ React.createElement(
      Dropdown,
      {
        label: t("sel.brand"),
        placeholder: t("sel.pickBrand"),
        value: brandSlug,
        options: brandOpts,
        onChange: onBrand
      }
    ), /* @__PURE__ */ React.createElement(
      Dropdown,
      {
        label: t("sel.model"),
        placeholder: brand ? t("sel.pickModel") : t("sel.brandFirst"),
        value: modelName,
        options: modelOpts,
        disabled: !brand,
        onChange: onModel
      }
    ), /* @__PURE__ */ React.createElement(
      Dropdown,
      {
        label: t("sel.year"),
        placeholder: model ? t("sel.pickYear") : t("sel.modelFirst"),
        value: genIdx,
        options: yearOpts,
        disabled: !model,
        onChange: onYear
      }
    ), needEngine && /* @__PURE__ */ React.createElement(
      Dropdown,
      {
        label: t("sel.engine"),
        placeholder: t("sel.pickEngine"),
        value: engIdx,
        options: engineOpts,
        disabled: !gen,
        onChange: setEngIdx,
        renderLeading: () => /* @__PURE__ */ React.createElement(Icon, { name: "gauge", size: 18 })
      }
    )), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: submit,
        disabled: !ready,
        className: `az-btn-primary mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full px-7 py-4 font-extrabold uppercase tracking-[0.16em]
            ${ready ? "" : "pointer-events-none opacity-45"}`
      },
      t("sel.tune"),
      /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 17, className: "transition-transform duration-300 group-hover:translate-x-1" })
    ), /* @__PURE__ */ React.createElement("p", { className: "mt-4 text-center text-[12px] text-[var(--muted)]" }, t("sel.cantFind"), " ", /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => onSelect(null), className: "font-semibold text-[var(--accent)] hover:underline" }, t("sel.searchFull")))));
  }
  function HomeScreen({ initial, onSelect, onSearch }) {
    return /* @__PURE__ */ React.createElement("div", { className: "az-screen pb-24 pt-28 md:pt-32" }, /* @__PURE__ */ React.createElement("section", { className: "relative pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "pointer-events-none absolute inset-0 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "az-grid-bg absolute inset-0 opacity-[0.5]" }), /* @__PURE__ */ React.createElement("div", { className: "absolute -top-40 left-1/2 h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.06] blur-[140px]" })), /* @__PURE__ */ React.createElement("div", { className: "relative mx-auto grid max-w-[1280px] items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr]" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Eyebrow, null, t("home.eyebrow")), /* @__PURE__ */ React.createElement("h1", { className: "font-display mt-5 text-[clamp(2.6rem,6vw,4.8rem)] font-black uppercase leading-[0.9] tracking-[-0.02em]" }, t("home.h1a"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { className: "text-[var(--accent)]" }, t("home.h1b"))), /* @__PURE__ */ React.createElement("p", { className: "mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--text2)]" }, t("home.sub")), /* @__PURE__ */ React.createElement("div", { className: "mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-4" }, content().credibility.map((c) => /* @__PURE__ */ React.createElement("div", { key: c.v, className: "bg-[var(--panel)] px-4 py-5" }, /* @__PURE__ */ React.createElement("div", { className: "font-display text-[22px] font-black text-[var(--accent)]" }, c.k), /* @__PURE__ */ React.createElement("div", { className: "mt-1 text-[11px] uppercase tracking-[0.12em] text-[var(--text2)]" }, c.v))))), /* @__PURE__ */ React.createElement(VehicleSelector, { initial, onSelect: (ctx) => ctx ? onSelect(ctx) : onSearch() }))));
  }
  Object.assign(window, { Dropdown, VehicleSelector, HomeScreen });
})();
