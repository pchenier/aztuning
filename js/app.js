(() => {
  const { useState: useStateA, useEffect: useEffectA, useMemo: useMemoA } = React;
  function buildIndex() {
    const out = [];
    SEED_DATA.brands.forEach((brand) => {
      out.push({ type: "brand", label: brand.name, sub: `${brand.models.length} ${t("unit.models")}`, brand });
      brand.models.forEach((model) => {
        out.push({ type: "model", label: `${brand.name} ${model.name}`, sub: t("lbl.Model"), brand, model });
        model.generations.forEach((gen) => {
          gen.engines.forEach((engine) => {
            out.push({
              type: "engine",
              label: `${brand.name} ${model.name} ${engine.label}`,
              sub: `${yearLabel(gen.years)} \xB7 ${engine.power} BHP \xB7 ${t(engine.fuel)}`,
              brand,
              model,
              gen,
              engine
            });
          });
        });
      });
    });
    return out;
  }
  function SearchModal({ open, onClose, onPick, onContact, lang }) {
    const [q, setQ] = useStateA("");
    const index = useMemoA(buildIndex, [lang]);
    useEffectA(() => {
      if (open) setQ("");
    }, [open]);
    useEffectA(() => {
      const f = (e) => {
        if (e.key === "Escape") onClose();
      };
      if (open) window.addEventListener("keydown", f);
      return () => window.removeEventListener("keydown", f);
    }, [open, onClose]);
    if (!open) return null;
    const term = q.trim().toLowerCase();
    const results = term ? index.filter((r) => r.label.toLowerCase().includes(term)).slice(0, 8) : index.filter((r) => r.type === "engine").slice(0, 6);
    return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-black/70 backdrop-blur-sm az-fade" }), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "az-pop relative w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--line)] bg-[#111114] shadow-2xl",
        onClick: (e) => e.stopPropagation()
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 border-b border-[var(--line)] px-5 py-4" }, /* @__PURE__ */ React.createElement(Icon, { name: "search", size: 20, className: "text-[var(--accent)]" }), /* @__PURE__ */ React.createElement(
        "input",
        {
          autoFocus: true,
          value: q,
          onChange: (e) => setQ(e.target.value),
          placeholder: t("search.placeholder"),
          className: "w-full bg-transparent text-[15px] text-white placeholder:text-[var(--muted)] focus:outline-none"
        }
      ), /* @__PURE__ */ React.createElement("button", { onClick: onClose, className: "grid h-7 w-7 place-items-center rounded-full text-[var(--muted)] hover:bg-white/5 hover:text-white" }, /* @__PURE__ */ React.createElement(Icon, { name: "close", size: 16 }))),
      /* @__PURE__ */ React.createElement("div", { className: "max-h-[52vh] overflow-y-auto p-2" }, results.length ? results.map((r, i) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: i,
          onClick: () => onPick(r),
          className: "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-white/5"
        },
        /* @__PURE__ */ React.createElement("span", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line)] text-[var(--text2)]" }, /* @__PURE__ */ React.createElement(BrandBadge, { brand: r.brand, size: 26 })),
        /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "truncate font-display text-[14px] font-bold uppercase tracking-[0.02em] text-white" }, r.label), /* @__PURE__ */ React.createElement("div", { className: "truncate font-mono text-[12px] text-[var(--muted)]" }, r.sub)),
        /* @__PURE__ */ React.createElement("span", { className: "rounded-full bg-white/[0.04] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]" }, t("type." + r.type))
      )) : /* @__PURE__ */ React.createElement("div", { className: "px-4 py-10 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-[14px] text-[var(--text2)]" }, t("search.noMatch"), " \u201C", q, "\u201D."), /* @__PURE__ */ React.createElement("button", { onClick: onContact, className: "mt-3 font-display text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--accent)] hover:underline" }, t("search.cantFind"))))
    ));
  }
  const STATIC_VIEWS = ["tuning", "dyno", "dealers", "contact"];
  function pathFor(view, sel) {
    if (view === "results" && sel && sel.brand && sel.model && sel.gen && sel.engine) {
      const gi = sel.model.generations.indexOf(sel.gen);
      const ei = sel.gen.engines.indexOf(sel.engine);
      return `/vehicle/${sel.brand.slug}/${slugify(sel.model.name)}/${gi}/${ei}`;
    }
    return view === "home" ? "/" : `/${view}`;
  }
  function parsePath() {
    const segs = (location.pathname || "/").split("/").filter(Boolean);
    if (!segs.length) return { view: "home" };
    const [a, b, c, d, e] = segs;
    if (STATIC_VIEWS.indexOf(a) !== -1) return { view: a };
    if (a === "vehicle") {
      const brand = SEED_DATA.brands.find((x) => x.slug === b);
      const model = brand && brand.models.find((m) => slugify(m.name) === c);
      const gen = model && model.generations[+d];
      const engine = gen && gen.engines[+e];
      if (brand && model && gen && engine) return { view: "results", sel: { brand, model, gen, engine } };
    }
    return { view: "home" };
  }
  function titleFor(view, sel) {
    const base = "AZ Motorsport";
    if (view === "results" && sel && sel.brand) return `${sel.brand.name} ${sel.model.name} \u2014 ${base}`;
    const keys = { home: "home.eyebrow", tuning: "nav.tuning", dyno: "nav.dyno", dealers: "nav.dealers", contact: "nav.contact" };
    return keys[view] ? `${t(keys[view])} \u2014 ${base}` : base;
  }
  function App() {
    var _a, _b, _c;
    const [route, setRoute] = useStateA(() => parsePath());
    const [prefill, setPrefill] = useStateA(null);
    const [selInit, setSelInit] = useStateA(null);
    const [search, setSearch] = useStateA(false);
    const [lang, setLangState] = useStateA(getLang());
    const view = route.view;
    const sel = route.sel || {};
    const toggleLang = () => {
      const nl = lang === "fr" ? "en" : "fr";
      setLang(nl);
      setLangState(nl);
    };
    const navigate = (nextView, opts = {}) => {
      const nextSel = opts.sel || null;
      setRoute({ view: nextView, sel: nextSel || void 0 });
      setPrefill(opts.prefill || null);
      setSelInit(opts.selInit || null);
      const path = pathFor(nextView, nextSel);
      if (location.pathname !== path) history.pushState({}, "", path);
    };
    useEffectA(() => {
      const onPop = () => {
        setRoute(parsePath());
        setPrefill(null);
        setSelInit(null);
      };
      window.addEventListener("popstate", onPop);
      return () => window.removeEventListener("popstate", onPop);
    }, []);
    useEffectA(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
      if (typeof seoMeta !== "function") return;
      const m = seoMeta(view, sel);
      const set = (q, attr, val) => {
        const el = document.querySelector(q);
        if (el && val != null) el.setAttribute(attr, val);
      };
      set('meta[name="description"]', "content", m.description);
      set('link[rel="canonical"]', "href", m.canonical);
      set('meta[property="og:title"]', "content", m.title);
      set('meta[property="og:description"]', "content", m.description);
      set('meta[property="og:url"]', "content", m.canonical);
      set('meta[name="twitter:title"]', "content", m.title);
      set('meta[name="twitter:description"]', "content", m.description);
    }, [view, sel.brand, sel.model, sel.engine]);
    useEffectA(() => {
      document.title = titleFor(view, sel);
    }, [view, sel.brand, sel.model, sel.engine, lang]);
    useEffectA(() => {
      const f = (e) => {
        if (e.key === "/" && !/input|textarea/i.test(e.target.tagName)) {
          e.preventDefault();
          setSearch(true);
        }
      };
      window.addEventListener("keydown", f);
      return () => window.removeEventListener("keydown", f);
    }, []);
    const tune = (ctx) => navigate("results", { sel: ctx });
    const openContact = (pf = null) => navigate("contact", { prefill: pf });
    const goHome = (init = null) => navigate("home", { selInit: init });
    const onPick = (r) => {
      setSearch(false);
      if (r.type === "engine") tune({ brand: r.brand, model: r.model, gen: r.gen, engine: r.engine });
      else goHome({ brand: r.brand, model: r.type === "model" ? r.model : null });
    };
    const onNav = (v) => {
      if (v === "home") goHome(null);
      else if (v === "contact") openContact(null);
      else navigate(v);
    };
    let screen;
    if (view === "results" && sel.engine) screen = /* @__PURE__ */ React.createElement(ResultsScreen, { ctx: sel, onBack: () => goHome({ brand: sel.brand, model: sel.model }), onContact: openContact });
    else if (view === "tuning") screen = /* @__PURE__ */ React.createElement(TuningScreen, { onContact: () => openContact(null), onBrowse: () => goHome(null) });
    else if (view === "dyno") screen = /* @__PURE__ */ React.createElement(DynoScreen, { onContact: () => openContact(null) });
    else if (view === "dealers") screen = /* @__PURE__ */ React.createElement(DealersScreen, { onContact: () => openContact(null) });
    else if (view === "contact") screen = /* @__PURE__ */ React.createElement(ContactScreen, { prefill, onBack: () => goHome(null) });
    else screen = /* @__PURE__ */ React.createElement(HomeScreen, { initial: selInit, onSelect: tune, onSearch: () => setSearch(true) });
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Header, { onHome: () => goHome(null), onNav, onSearch: () => setSearch(true), view, lang, onLang: toggleLang }), /* @__PURE__ */ React.createElement("main", { key: lang + view + (((_a = sel.brand) == null ? void 0 : _a.slug) || "") + (((_b = sel.model) == null ? void 0 : _b.name) || "") + (((_c = sel.engine) == null ? void 0 : _c.label) || "") }, screen), /* @__PURE__ */ React.createElement(Footer, { onNav }), /* @__PURE__ */ React.createElement(SearchModal, { open: search, onClose: () => setSearch(false), onPick, onContact: () => {
      setSearch(false);
      openContact(null);
    }, lang }));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
})();
