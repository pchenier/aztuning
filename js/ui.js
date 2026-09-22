(() => {
  const { useState, useEffect, useRef, useCallback } = React;
  function fmtPrice(price) {
    if (!CONFIG.showPrices) return null;
    if (price == null) return t("res.contactPricing");
    return `${price.toLocaleString(getLang() === "fr" ? "fr-CA" : "en-CA")}${CONFIG.currencySuffix}`;
  }
  const yearLabel = (yrs) => `${yrs[0]} \u203A ${yrs[1]}`;
  function useCountUp(target, deps = []) {
    const [val, setVal] = useState(target);
    useEffect(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setVal(target);
        return;
      }
      let raf, start;
      const from = 0, dur = 650;
      const tick = (t2) => {
        if (!start) start = t2;
        const p = Math.min(1, (t2 - start) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(from + (target - from) * e));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      const fallback = setTimeout(() => setVal(target), dur + 120);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(fallback);
      };
    }, deps);
    return val;
  }
  function Icon({ name, className = "", size = 18, stroke = 2 }) {
    const p = {
      search: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "m20 20-3.5-3.5" })),
      arrow: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14" }), /* @__PURE__ */ React.createElement("path", { d: "m13 6 6 6-6 6" })),
      chevron: /* @__PURE__ */ React.createElement("path", { d: "m9 6 6 6-6 6" }),
      chevronDown: /* @__PURE__ */ React.createElement("path", { d: "m6 9 6 6 6-6" }),
      close: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M6 6 18 18" }), /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18" })),
      menu: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M4 6h16" }), /* @__PURE__ */ React.createElement("path", { d: "M4 12h16" }), /* @__PURE__ */ React.createElement("path", { d: "M4 18h16" })),
      check: /* @__PURE__ */ React.createElement("path", { d: "m5 12 5 5L20 6" }),
      plus: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14" }), /* @__PURE__ */ React.createElement("path", { d: "M5 12h14" })),
      minus: /* @__PURE__ */ React.createElement("path", { d: "M5 12h14" }),
      bolt: /* @__PURE__ */ React.createElement("path", { d: "M13 2 4 14h7l-1 8 9-12h-7z" }),
      gauge: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 14 8 8" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "13", r: "9" })),
      phone: /* @__PURE__ */ React.createElement("path", { d: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" }),
      mail: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "m3 7 9 6 9-6" })),
      pin: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "10", r: "2.5" })),
      ig: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "5" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "4" }), /* @__PURE__ */ React.createElement("circle", { cx: "17.3", cy: "6.7", r: "1", fill: "currentColor", stroke: "none" })),
      tiktok: /* @__PURE__ */ React.createElement("path", { d: "M15 4c.4 2.2 1.9 3.7 4 4v2.6c-1.5 0-2.9-.5-4-1.3V15a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v2.7a2.8 2.8 0 1 0 2 2.7V4z", fill: "currentColor", stroke: "none" }),
      youtube: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "2", y: "5", width: "20", height: "14", rx: "4" }), /* @__PURE__ */ React.createElement("path", { d: "m10 9 5 3-5 3z", fill: "currentColor", stroke: "none" })),
      clock: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M12 7v5l3 2" })),
      spark: /* @__PURE__ */ React.createElement("path", { d: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" })
    }[name];
    return /* @__PURE__ */ React.createElement(
      "svg",
      {
        viewBox: "0 0 24 24",
        width: size,
        height: size,
        fill: "none",
        stroke: "currentColor",
        strokeWidth: stroke,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className,
        "aria-hidden": "true"
      },
      p
    );
  }
  function Wordmark({ h = 30, onClick, className = "" }) {
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick,
        className: `az-word ${className}`,
        "aria-label": "Apex Calibration \u2014 home",
        style: { display: "flex", alignItems: "center", gap: 0 }
      },
      /* @__PURE__ */ React.createElement("img", { src: "/assets/apex-logo.webp", alt: "Apex Calibration", style: { height: h, width: "auto", display: "block" } })
    );
  }
  function PrimaryBtn({ children, onClick, href, className = "", size = "md", icon = "arrow" }) {
    const pad = size === "lg" ? "px-7 py-4 text-[15px]" : size === "sm" ? "px-4 py-2.5 text-[12px]" : "px-6 py-3.5 text-[13px]";
    const cls = `az-btn-primary group inline-flex items-center justify-center gap-2.5 rounded-full font-extrabold uppercase tracking-[0.14em] ${pad} ${className}`;
    const inner = /* @__PURE__ */ React.createElement(React.Fragment, null, children, icon && /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 16, className: "transition-transform duration-300 group-hover:translate-x-1" }));
    return href ? /* @__PURE__ */ React.createElement("a", { href, target: href.startsWith("http") ? "_blank" : void 0, rel: "noreferrer", className: cls }, inner) : /* @__PURE__ */ React.createElement("button", { onClick, className: cls }, inner);
  }
  function GhostBtn({ children, onClick, href, className = "", size = "md", icon = null, iconLeft = false }) {
    const pad = size === "lg" ? "px-7 py-4 text-[15px]" : size === "sm" ? "px-4 py-2.5 text-[12px]" : "px-6 py-3.5 text-[13px]";
    const cls = `az-btn-ghost inline-flex items-center justify-center gap-2.5 rounded-full font-bold uppercase tracking-[0.14em] ${pad} ${className}`;
    const inner = /* @__PURE__ */ React.createElement(React.Fragment, null, iconLeft && icon && /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 16, className: "rotate-180" }), children, !iconLeft && icon && /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 16 }));
    return href ? /* @__PURE__ */ React.createElement("a", { href, target: href.startsWith("http") ? "_blank" : void 0, rel: "noreferrer", className: cls }, inner) : /* @__PURE__ */ React.createElement("button", { onClick, className: cls }, inner);
  }
  function Eyebrow({ children, className = "" }) {
    return /* @__PURE__ */ React.createElement("div", { className: `flex items-center gap-3 ${className}` }, /* @__PURE__ */ React.createElement("span", { className: "h-px w-7 bg-[var(--accent)]" }), /* @__PURE__ */ React.createElement("span", { className: "font-display text-[12px] font-bold uppercase tracking-[0.32em] text-[var(--accent)]" }, children));
  }
  const CARS = {
    sport: {
      path: "M8,120 C6,108 11,101 24,100 L44,98 C50,80 66,73 96,73 L156,71 C158,52 182,40 218,39 C252,38 274,45 290,61 L334,88 L374,92 C386,93 391,100 391,109 L391,120 L344,120 A34,34 0 0 0 276,120 L130,120 A34,34 0 0 0 62,120 L8,120 Z",
      glass: "M158,71 C160,55 182,45 216,44 C246,43 266,49 280,62 L274,64 L162,70 Z",
      fw: { cx: 96, cy: 120, r: 30 },
      rw: { cx: 310, cy: 120, r: 30 }
    },
    coupe: {
      path: "M8,120 C6,108 11,101 24,100 L44,98 C50,82 64,76 92,75 L146,73 C150,52 174,42 210,42 C246,42 272,50 290,72 L322,96 L374,99 C386,100 391,106 391,113 L391,120 L344,120 A34,34 0 0 0 276,120 L130,120 A34,34 0 0 0 62,120 L8,120 Z",
      glass: "M148,73 C152,56 176,47 210,47 C242,47 266,56 282,74 L150,75 Z",
      fw: { cx: 96, cy: 120, r: 30 },
      rw: { cx: 310, cy: 120, r: 30 }
    },
    sedan: {
      path: "M8,120 C6,108 11,101 24,100 L46,98 C52,84 64,78 92,77 L150,75 C154,54 176,44 214,44 L286,46 C300,47 312,54 318,72 L324,96 L376,99 C388,100 391,106 391,113 L391,120 L344,120 A34,34 0 0 0 276,120 L130,120 A34,34 0 0 0 62,120 L8,120 Z",
      glass: "M150,75 C154,58 178,49 214,49 L284,50 C298,52 308,58 314,72 L152,74 Z",
      fw: { cx: 96, cy: 120, r: 30 },
      rw: { cx: 310, cy: 120, r: 30 }
    },
    hatch: {
      path: "M8,120 C6,108 11,101 24,100 L44,98 C50,82 64,75 94,74 L150,72 C154,50 178,40 214,40 C250,40 276,52 290,76 L306,100 L332,103 C340,104 343,109 343,114 L343,120 L344,120 A34,34 0 0 0 276,120 L130,120 A34,34 0 0 0 62,120 L8,120 Z",
      glass: "M150,72 C154,54 178,45 214,45 C246,45 268,54 282,74 L152,74 Z",
      fw: { cx: 96, cy: 120, r: 30 },
      rw: { cx: 310, cy: 120, r: 30 }
    },
    suv: {
      path: "M8,116 C7,104 12,98 24,97 L42,96 C46,76 60,66 92,64 L150,62 C152,40 172,30 206,30 L286,32 C300,33 312,42 316,62 L320,98 L378,101 C390,102 392,108 392,116 L392,124 L342,124 A36,36 0 0 0 270,124 L128,124 A36,36 0 0 0 56,124 L8,124 Z",
      glass: "M150,62 C152,44 172,35 206,35 L284,37 C298,39 308,46 312,62 L152,64 Z",
      fw: { cx: 92, cy: 124, r: 32 },
      rw: { cx: 306, cy: 124, r: 32 }
    }
  };
  const BODY_MAP = { super: "sport", coupe: "coupe", sedan: "sedan", hatch: "hatch", suv: "suv" };
  function Wheel({ cx, cy, r }) {
    return /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement("circle", { cx, cy, r, fill: "#0d0d0f" }), /* @__PURE__ */ React.createElement("circle", { cx, cy, r, fill: "none", stroke: "#3a3a42", strokeWidth: "3" }), /* @__PURE__ */ React.createElement("circle", { cx, cy, r: r * 0.52, fill: "#17171b", stroke: "#2b2b32", strokeWidth: "1.5" }), /* @__PURE__ */ React.createElement("circle", { cx, cy, r: r * 0.13, fill: "#33333b" }));
  }
  let __carId = 0;
  function CarArt({ body = "super", className = "", monogram = "" }) {
    const uid = useRef(`car${++__carId}`).current;
    const car = CARS[BODY_MAP[body] || "sport"];
    const { path, glass, fw, rw } = car;
    return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 400 200", className, role: "img", "aria-label": "Vehicle render placeholder" }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("radialGradient", { id: `${uid}-spot`, cx: "50%", cy: "62%", r: "62%" }, /* @__PURE__ */ React.createElement("stop", { offset: "0%", stopColor: "#ffffff", stopOpacity: "0.08" }), /* @__PURE__ */ React.createElement("stop", { offset: "55%", stopColor: "#ffffff", stopOpacity: "0.02" }), /* @__PURE__ */ React.createElement("stop", { offset: "100%", stopColor: "#ffffff", stopOpacity: "0" })), /* @__PURE__ */ React.createElement("linearGradient", { id: `${uid}-body`, x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "0%", stopColor: "#34343c" }), /* @__PURE__ */ React.createElement("stop", { offset: "45%", stopColor: "#26262c" }), /* @__PURE__ */ React.createElement("stop", { offset: "100%", stopColor: "#141418" }))), /* @__PURE__ */ React.createElement("ellipse", { cx: "200", cy: "126", rx: "190", ry: "58", fill: `url(#${uid}-spot)` }), monogram && /* @__PURE__ */ React.createElement(
      "text",
      {
        x: "200",
        y: "118",
        textAnchor: "middle",
        fontFamily: "Archivo, sans-serif",
        fontWeight: "900",
        fontSize: "120",
        fill: "#ffffff",
        opacity: "0.025",
        style: { letterSpacing: "-6px" }
      },
      monogram
    ), /* @__PURE__ */ React.createElement("g", { opacity: "0.16", transform: "translate(0,266) scale(1,-0.5)" }, /* @__PURE__ */ React.createElement("path", { d: path, fill: "#2a2a30" })), /* @__PURE__ */ React.createElement("path", { d: path, fill: `url(#${uid}-body)`, stroke: "rgba(255,255,255,0.10)", strokeWidth: "1" }), /* @__PURE__ */ React.createElement("path", { d: glass, fill: "#0c0c0f", opacity: "0.85" }), /* @__PURE__ */ React.createElement(Wheel, { ...fw }), /* @__PURE__ */ React.createElement(Wheel, { ...rw }));
  }
  function VehicleImage({ model, brand, className = "" }) {
    const [err, setErr] = useState(false);
    if (model.image && !err) {
      return /* @__PURE__ */ React.createElement("div", { className: `relative overflow-hidden ${className}` }, /* @__PURE__ */ React.createElement(
        "img",
        {
          src: model.image,
          alt: `${(brand == null ? void 0 : brand.name) || ""} ${model.name}`,
          loading: "lazy",
          onError: () => setErr(true),
          className: "h-full w-full object-cover"
        }
      ));
    }
    return /* @__PURE__ */ React.createElement(CarArt, { body: model.body, monogram: brandMono((brand == null ? void 0 : brand.name) || model.name), className });
  }
  function brandMono(name) {
    const clean = name.replace(/[^A-Za-z ]/g, "");
    const words = clean.split(" ").filter(Boolean);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return clean.slice(0, 2).toUpperCase();
  }
  const BRAND_FRAME = {
    audi: "bars",
    bmw: "roundel",
    "mercedes-benz": "roundel",
    porsche: "shield",
    ferrari: "shield",
    lamborghini: "shield",
    mclaren: "wing",
    volkswagen: "roundel",
    nissan: "circle",
    toyota: "hex",
    abarth: "shield",
    "alfa-romeo": "shield",
    "aston-martin": "wing",
    bentley: "wing",
    bugatti: "diamond",
    cadillac: "shield",
    chevrolet: "bars",
    fiat: "bars",
    ford: "roundel",
    honda: "bars",
    hyundai: "hex",
    jaguar: "diamond",
    "land-rover": "hex",
    maserati: "shield",
    mazda: "wing",
    mini: "roundel"
  };
  function BrandFrame({ kind }) {
    const s = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinejoin: "round" };
    switch (kind) {
      case "shield":
        return /* @__PURE__ */ React.createElement("path", { d: "M50,6 L88,19 V50 C88,73 71,89 50,96 C29,89 12,73 12,50 V19 Z", ...s });
      case "hex":
        return /* @__PURE__ */ React.createElement("path", { d: "M50,5 L88,27 V73 L50,95 L12,73 V27 Z", ...s });
      case "diamond":
        return /* @__PURE__ */ React.createElement("path", { d: "M50,5 L95,50 L50,95 L5,50 Z", ...s });
      case "circle":
        return /* @__PURE__ */ React.createElement("circle", { cx: "50", cy: "50", r: "45", ...s });
      case "roundel":
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "50", cy: "50", r: "45", ...s }), /* @__PURE__ */ React.createElement("circle", { cx: "50", cy: "50", r: "35", ...s, strokeWidth: "1.5", opacity: "0.45" }));
      case "bars":
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "8", y: "24", width: "84", height: "52", rx: "6", ...s }), /* @__PURE__ */ React.createElement("line", { x1: "8", y1: "18", x2: "92", y2: "18", stroke: "currentColor", strokeWidth: "4", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("line", { x1: "8", y1: "82", x2: "92", y2: "82", stroke: "currentColor", strokeWidth: "4", strokeLinecap: "round" }));
      case "wing":
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M48,38 C34,30 16,32 4,44 C20,42 34,44 48,52 Z", fill: "currentColor", stroke: "none" }), /* @__PURE__ */ React.createElement("path", { d: "M52,38 C66,30 84,32 96,44 C80,42 66,44 52,52 Z", fill: "currentColor", stroke: "none" }), /* @__PURE__ */ React.createElement("circle", { cx: "50", cy: "50", r: "40", ...s, strokeWidth: "1.5", opacity: "0.4" }));
      default:
        return /* @__PURE__ */ React.createElement("circle", { cx: "50", cy: "50", r: "45", ...s });
    }
  }
  function BrandBadge({ brand, name, slug, size = 64, className = "" }) {
    const bName = (brand == null ? void 0 : brand.name) || name || "";
    const bSlug = (brand == null ? void 0 : brand.slug) || slug || bName.toLowerCase().replace(/[^a-z]+/g, "-");
    const mono = brandMono(bName);
    const kind = BRAND_FRAME[bSlug] || "roundel";
    const fs = mono.length > 2 ? 26 : 34;
    return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 100 100", width: size, height: size, className, role: "img", "aria-label": `${bName} badge` }, /* @__PURE__ */ React.createElement(BrandFrame, { kind }), /* @__PURE__ */ React.createElement(
      "text",
      {
        x: "50",
        y: "51",
        textAnchor: "middle",
        dominantBaseline: "central",
        fontFamily: "Archivo, sans-serif",
        fontWeight: "900",
        fontSize: fs,
        fill: "currentColor",
        style: { letterSpacing: "-1px" }
      },
      mono
    ));
  }
  const STEPS = ["Mark", "Model", "Year", "Engine", "Configuration"];
  function Stepper({ current, labels = {}, onJump }) {
    return /* @__PURE__ */ React.createElement("div", { className: "az-stepper w-full overflow-x-auto" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto flex w-max min-w-full items-center gap-1 px-5 py-3 md:justify-center" }, STEPS.map((s, i) => {
      const done = i < current, active = i === current;
      const ctx = labels[i];
      const clickable = i < current;
      return /* @__PURE__ */ React.createElement(React.Fragment, { key: s }, /* @__PURE__ */ React.createElement(
        "button",
        {
          disabled: !clickable,
          onClick: () => clickable && (onJump == null ? void 0 : onJump(i)),
          className: `flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${clickable ? "cursor-pointer hover:bg-white/5" : "cursor-default"}`,
          style: { color: active ? "var(--accent)" : done ? "rgba(255,92,0,0.62)" : "var(--muted)" }
        },
        /* @__PURE__ */ React.createElement("span", { className: `grid h-5 w-5 place-items-center rounded-full text-[10px] ${active ? "bg-[var(--accent)] text-black" : done ? "border border-[var(--accent)]/50 text-[var(--accent)]" : "border border-white/12 text-[var(--muted)]"}` }, done ? /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 11, stroke: 3 }) : i + 1),
        /* @__PURE__ */ React.createElement("span", { className: "font-display whitespace-nowrap" }, ctx || s)
      ), i < STEPS.length - 1 && /* @__PURE__ */ React.createElement(Icon, { name: "chevron", size: 13, className: "shrink-0 text-white/20" }));
    })));
  }
  const NAV = [["nav.catalogue", "home"], ["nav.tuning", "tuning"], ["nav.dyno", "dyno"], ["nav.dealers", "dealers"], ["nav.contact", "contact"]];
  function LangToggle({ lang, onLang, className = "" }) {
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onLang,
        "aria-label": t("lang.toggleTo"),
        title: t("lang.toggleTo"),
        className: `shrink-0 rounded-full border border-[var(--line)] px-2.5 py-2 font-mono text-[11px] font-semibold leading-none tracking-wide text-[var(--text2)] transition-colors hover:border-white/20 hover:text-white ${className}`
      },
      /* @__PURE__ */ React.createElement("span", { className: lang === "en" ? "text-[var(--accent)]" : "" }, "EN"),
      /* @__PURE__ */ React.createElement("span", { className: "mx-1 text-[var(--muted)]" }, "/"),
      /* @__PURE__ */ React.createElement("span", { className: lang === "fr" ? "text-[var(--accent)]" : "" }, "FR")
    );
  }
  function Header({ onHome, onNav, onSearch, view, lang, onLang }) {
    const [shrunk, setShrunk] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
      const f = () => setShrunk(window.scrollY > 24);
      window.addEventListener("scroll", f, { passive: true });
      return () => window.removeEventListener("scroll", f);
    }, []);
    useEffect(() => {
      setMenuOpen(false);
    }, [view]);
    useEffect(() => {
      const f = (e) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", f);
      return () => window.removeEventListener("keydown", f);
    }, []);
    const pick = (v) => {
      setMenuOpen(false);
      onNav(v);
    };
    return /* @__PURE__ */ React.createElement("header", { className: `az-header fixed inset-x-0 top-0 z-40 border-b border-[var(--line)] backdrop-blur-xl transition-colors duration-300 ${shrunk || menuOpen ? "bg-[#0b0b0c]/95 shadow-[0_8px_30px_rgba(0,0,0,0.5)]" : "bg-[#0b0b0c]/70"}` }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto flex w-full max-w-[1280px] items-center gap-3 px-5 md:gap-4 md:px-8", style: { height: "var(--header-h)" } }, /* @__PURE__ */ React.createElement(Wordmark, { h: 30, onClick: onHome }), /* @__PURE__ */ React.createElement("nav", { className: "ml-2 hidden items-center gap-1 md:flex" }, NAV.map(([label, v]) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: v,
        onClick: () => onNav(v),
        className: `rounded-full px-3.5 py-2 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors ${view === v ? "text-white" : "text-[var(--text2)] hover:text-white"}`
      },
      t(label)
    ))), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onSearch,
        "aria-label": t("header.find"),
        className: "group ml-auto flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-white/[0.03] px-3.5 py-2.5 text-[12px] font-medium text-[var(--text2)] transition-colors hover:border-white/20 hover:text-white"
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "search", size: 15 }),
      /* @__PURE__ */ React.createElement("span", { className: "hidden sm:inline tracking-wide" }, t("header.find")),
      /* @__PURE__ */ React.createElement("kbd", { className: "hidden rounded bg-white/8 px-1.5 py-0.5 text-[10px] text-[var(--muted)] md:inline" }, "/")
    ), /* @__PURE__ */ React.createElement(LangToggle, { lang, onLang }), /* @__PURE__ */ React.createElement(PrimaryBtn, { size: "sm", href: CONFIG.bookingUrl, icon: null, className: "hidden md:inline-flex" }, t("nav.appointment")), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setMenuOpen((o) => !o),
        "aria-label": "Menu",
        "aria-expanded": menuOpen,
        className: "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line)] text-white transition-colors hover:border-white/30 md:hidden"
      },
      /* @__PURE__ */ React.createElement(Icon, { name: menuOpen ? "close" : "menu", size: 18 })
    )), menuOpen && /* @__PURE__ */ React.createElement("div", { className: "az-pop border-t border-[var(--line)] bg-[#0b0b0c]/98 backdrop-blur-xl md:hidden" }, /* @__PURE__ */ React.createElement("nav", { className: "mx-auto flex max-w-[1280px] flex-col gap-1 px-5 py-3" }, NAV.map(([label, v]) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: v,
        onClick: () => pick(v),
        className: `flex items-center justify-between rounded-xl px-4 py-3 text-left font-display text-[14px] font-bold uppercase tracking-[0.12em] transition-colors ${view === v ? "bg-[var(--accent)]/[0.08] text-[var(--accent)]" : "text-[var(--text2)] hover:bg-white/5 hover:text-white"}`
      },
      t(label),
      /* @__PURE__ */ React.createElement(Icon, { name: "chevron", size: 14, className: "opacity-50" })
    )), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: CONFIG.bookingUrl,
        target: "_blank",
        rel: "noreferrer",
        onClick: () => setMenuOpen(false),
        className: "az-btn-primary mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-extrabold uppercase tracking-[0.14em]"
      },
      t("nav.appointment"),
      " ",
      /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 16 })
    ))));
  }
  function Footer({ onNav }) {
    const sh = content().shop;
    return /* @__PURE__ */ React.createElement("footer", { className: "border-t border-[var(--line)] bg-[#08080a] px-5 pt-16 pb-10 md:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-[1280px]" }, /* @__PURE__ */ React.createElement("div", { className: "grid gap-10 md:grid-cols-[1.6fr_1fr_1.4fr]" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Wordmark, { h: 34, onClick: () => onNav("home") }), /* @__PURE__ */ React.createElement("p", { className: "mt-5 max-w-xs text-[13px] leading-relaxed text-[var(--text2)]" }, t("ft.tagline")), /* @__PURE__ */ React.createElement("div", { className: "mt-6 flex gap-2" }, [
      ["ig", `https://www.instagram.com/${sh.ig.replace(/^@/, "")}/`],
      ["tiktok", `https://www.tiktok.com/${sh.tiktok}`],
      ["youtube", `https://www.youtube.com/${sh.youtube}`]
    ].map(([ic, url]) => /* @__PURE__ */ React.createElement(
      "a",
      {
        key: ic,
        href: url,
        target: "_blank",
        rel: "noreferrer",
        "aria-label": ic,
        className: "grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--text2)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      },
      /* @__PURE__ */ React.createElement(Icon, { name: ic, size: 17 })
    )))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "font-display text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--muted)]" }, t("ft.explore")), /* @__PURE__ */ React.createElement("ul", { className: "mt-4 space-y-2.5 text-[13px] text-[var(--text2)]" }, [["nav.catalogue", "home"], ["nav.tuning", "tuning"], ["nav.dyno", "dyno"], ["nav.dealers", "dealers"], ["nav.contact", "contact"]].map(([l, v]) => /* @__PURE__ */ React.createElement("li", { key: v }, /* @__PURE__ */ React.createElement("button", { onClick: () => onNav(v), className: "hover:text-white" }, t(l)))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: CONFIG.storeUrl, target: "_blank", rel: "noreferrer", className: "hover:text-white" }, t("ft.mainStore"))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "font-display text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--muted)]" }, t("ft.visit")), /* @__PURE__ */ React.createElement("ul", { className: "mt-4 space-y-2.5 text-[13px] text-[var(--text2)]" }, /* @__PURE__ */ React.createElement("li", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(Icon, { name: "pin", size: 15, className: "mt-0.5 shrink-0 text-[var(--muted)]" }), sh.address), /* @__PURE__ */ React.createElement("li", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(Icon, { name: "phone", size: 15, className: "shrink-0 text-[var(--muted)]" }), sh.phone), /* @__PURE__ */ React.createElement("li", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(Icon, { name: "clock", size: 15, className: "shrink-0 text-[var(--muted)]" }), sh.hours)))), /* @__PURE__ */ React.createElement("div", { className: "mt-12 flex flex-col gap-3 border-t border-[var(--line)] pt-6 text-[12px] text-[var(--muted)] md:flex-row md:items-center md:justify-between" }, /* @__PURE__ */ React.createElement("span", null, "\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " ", t("ft.rights")), /* @__PURE__ */ React.createElement("span", { className: "font-mono" }, t("ft.figures")))));
  }
  Object.assign(window, {
    fmtPrice,
    yearLabel,
    useCountUp,
    Icon,
    Wordmark,
    PrimaryBtn,
    GhostBtn,
    Eyebrow,
    CarArt,
    VehicleImage,
    brandMono,
    BrandBadge,
    Stepper,
    Header,
    Footer,
    STEPS
  });
})();
