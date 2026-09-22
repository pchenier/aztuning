(() => {
  function FindField({ placeholder, onFocus }) {
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onFocus,
        className: "group flex w-full items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-5 py-4 text-left transition-colors hover:border-white/20"
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "search", size: 18, className: "text-[var(--muted)] group-hover:text-[var(--accent)]" }),
      /* @__PURE__ */ React.createElement("span", { className: "text-[14px] text-[var(--text2)]" }, placeholder),
      /* @__PURE__ */ React.createElement("kbd", { className: "ml-auto hidden rounded bg-white/8 px-2 py-1 text-[11px] text-[var(--muted)] md:inline" }, "Press /")
    );
  }
  function PageHead({ eyebrow, title, accentWord, sub, children }) {
    return /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement(Eyebrow, null, eyebrow), /* @__PURE__ */ React.createElement("h1", { className: "font-display mt-4 text-[clamp(2.4rem,6vw,4.6rem)] font-black uppercase leading-[0.92] tracking-[-0.02em]" }, title, " ", accentWord && /* @__PURE__ */ React.createElement("span", { className: "text-[var(--accent)]" }, accentWord)), sub && /* @__PURE__ */ React.createElement("p", { className: "mt-5 max-w-2xl text-[15px] leading-relaxed text-[var(--text2)]" }, sub), children);
  }
  function BrandScreen({ onSelectBrand, onSearch }) {
    return /* @__PURE__ */ React.createElement("div", { className: "az-screen pb-24 pt-28 md:pt-32" }, /* @__PURE__ */ React.createElement("section", { className: "relative overflow-hidden border-b border-[var(--line)] pb-16" }, /* @__PURE__ */ React.createElement("div", { className: "az-grid-bg pointer-events-none absolute inset-0 opacity-[0.5]" }), /* @__PURE__ */ React.createElement("div", { className: "pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.06] blur-[130px]" }), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(
      PageHead,
      {
        eyebrow: "ECU Tuning Catalogue",
        title: "ECU Tuning",
        accentWord: "Catalogue",
        sub: "Discover everything possible for your vehicle in our reprogramming catalogue. Every available calibration is listed with all its options \u2014 if you can\u2019t find your vehicle, don\u2019t hesitate to contact us."
      },
      /* @__PURE__ */ React.createElement("div", { className: "mt-9 max-w-xl" }, /* @__PURE__ */ React.createElement(FindField, { placeholder: "Enter the make / model of your vehicle\u2026", onFocus: onSearch }))
    ), /* @__PURE__ */ React.createElement("div", { className: "mx-auto mt-12 max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-4" }, SITE_CONTENT.credibility.map((c) => /* @__PURE__ */ React.createElement("div", { key: c.v, className: "bg-[var(--panel)] px-5 py-6" }, /* @__PURE__ */ React.createElement("div", { className: "font-display text-[26px] font-black text-[var(--accent)]" }, c.k), /* @__PURE__ */ React.createElement("div", { className: "mt-1 text-[12px] uppercase tracking-[0.14em] text-[var(--text2)]" }, c.v))))))), /* @__PURE__ */ React.createElement("section", { className: "mx-auto mt-16 max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-end justify-between gap-4" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-[20px] font-bold uppercase tracking-[0.06em]" }, "Select your brand"), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-[12px] text-[var(--muted)]" }, SEED_DATA.brands.length, " brands")), /* @__PURE__ */ React.createElement("div", { className: "mt-7 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" }, SEED_DATA.brands.map((b) => {
      const count = b.models.length;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: b.slug,
          onClick: () => onSelectBrand(b),
          className: "az-tile group relative flex aspect-[4/3.1] flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40"
        },
        /* @__PURE__ */ React.createElement("span", { className: "text-white/80 transition-colors group-hover:text-[var(--accent)]" }, /* @__PURE__ */ React.createElement(BrandBadge, { brand: b, size: 56 })),
        /* @__PURE__ */ React.createElement("span", { className: "az-pill mt-3 max-w-full whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-extrabold uppercase leading-none tracking-[0.06em]" }, b.name),
        /* @__PURE__ */ React.createElement("span", { className: "absolute right-3 top-3 font-mono text-[10px] text-[var(--muted)]" }, count ? `${count} model${count > 1 ? "s" : ""}` : "soon")
      );
    })), /* @__PURE__ */ React.createElement("div", { className: "mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[var(--line)] bg-white/[0.015] px-6 py-7 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-[14px] text-[var(--text2)]" }, "Can\u2019t find your vehicle in the list?"), /* @__PURE__ */ React.createElement(PrimaryBtn, { size: "sm", onClick: onSearch, icon: "arrow" }, "Contact us"))));
  }
  function ModelScreen({ brand, onSelectModel, onBack, onJump, onSearch }) {
    const hasModels = brand.models.length > 0;
    return /* @__PURE__ */ React.createElement("div", { className: "az-screen pb-24 pt-28 md:pt-32" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement(GhostBtn, { size: "sm", icon: "arrow", iconLeft: true, onClick: onBack, className: "mb-7" }, "Back to brands")), /* @__PURE__ */ React.createElement(
      PageHead,
      {
        eyebrow: `Mark \xB7 ${brand.name}`,
        title: "ECU Tuning",
        accentWord: brand.name,
        sub: `Select your ${brand.name} model below to see every available stage, the power & torque gains, and pricing.`
      }
    ), /* @__PURE__ */ React.createElement("section", { className: "mx-auto mt-12 max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-[20px] font-bold uppercase tracking-[0.06em]" }, "Or select your ", brand.name, " model"), hasModels ? /* @__PURE__ */ React.createElement("div", { className: "mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" }, brand.models.map((m) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: m.name,
        onClick: () => onSelectModel(m),
        className: "az-tile group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40"
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          style: { background: "radial-gradient(60% 70% at 50% 40%, rgba(255,92,0,0.07), transparent 70%)" }
        }
      ),
      /* @__PURE__ */ React.createElement(VehicleImage, { model: m, brand, className: "relative h-36 w-full rounded-xl" }),
      /* @__PURE__ */ React.createElement("div", { className: "relative mt-3 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "az-pill whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-extrabold uppercase tracking-[0.06em]" }, m.name), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-[12px] text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]" }, m.generations.length, " gen \xB7 view \u203A"))
    ))) : /* @__PURE__ */ React.createElement(
      EmptyState,
      {
        title: `No published calibrations for ${brand.name} yet`,
        body: "We almost certainly tune this platform \u2014 it just isn\u2019t in the catalogue yet. Tell us your exact vehicle and we\u2019ll confirm availability.",
        onSearch
      }
    )));
  }
  function YearScreen({ brand, model, onSelectGen, onBack, onSearch }) {
    return /* @__PURE__ */ React.createElement("div", { className: "az-screen pb-24 pt-28 md:pt-32" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement(GhostBtn, { size: "sm", icon: "arrow", iconLeft: true, onClick: onBack, className: "mb-7" }, "Back to model")), /* @__PURE__ */ React.createElement("div", { className: "mx-auto grid max-w-[1280px] items-center gap-8 px-5 md:grid-cols-2 md:px-8" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Eyebrow, null, brand.name, " \xB7 ", model.name), /* @__PURE__ */ React.createElement("h1", { className: "font-display mt-4 text-[clamp(2.2rem,5.5vw,4rem)] font-black uppercase leading-[0.92] tracking-[-0.02em]" }, brand.name, " ", /* @__PURE__ */ React.createElement("span", { className: "text-[var(--accent)]" }, model.name)), /* @__PURE__ */ React.createElement("p", { className: "mt-5 max-w-md text-[15px] leading-relaxed text-[var(--text2)]" }, "Select the generation / year range that matches your ", model.name, ".")), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "pointer-events-none absolute inset-0 rounded-full bg-[var(--accent)] opacity-[0.05] blur-[90px]" }), /* @__PURE__ */ React.createElement(VehicleImage, { model, brand, className: "relative aspect-[2/1] w-full rounded-2xl" }))), /* @__PURE__ */ React.createElement("section", { className: "mx-auto mt-12 max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-[20px] font-bold uppercase tracking-[0.06em]" }, "Select year"), /* @__PURE__ */ React.createElement("div", { className: "mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" }, model.generations.map((g, i) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: i,
        onClick: () => onSelectGen(g),
        className: "az-tile group flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-6 py-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40"
      },
      /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--muted)]" }, "Generation"), /* @__PURE__ */ React.createElement("div", { className: "font-mono mt-2 flex items-center gap-2 text-[26px] font-bold tabular-nums" }, /* @__PURE__ */ React.createElement("span", null, g.years[0]), /* @__PURE__ */ React.createElement(Icon, { name: "chevron", size: 18, className: "text-[var(--accent)]" }), /* @__PURE__ */ React.createElement("span", null, g.years[1])), /* @__PURE__ */ React.createElement("div", { className: "mt-2 text-[12px] text-[var(--text2)]" }, g.engines.length, " engine", g.engines.length > 1 ? "s" : "")),
      /* @__PURE__ */ React.createElement("span", { className: "grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--text2)] transition-colors group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black" }, /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 16 }))
    ))), /* @__PURE__ */ React.createElement("div", { className: "mt-8 max-w-xl" }, /* @__PURE__ */ React.createElement(FindField, { placeholder: "Wrong car? Find your vehicle\u2026", onFocus: onSearch }))));
  }
  function EngineScreen({ brand, model, gen, onSelectEngine, onBack, onSearch }) {
    return /* @__PURE__ */ React.createElement("div", { className: "az-screen pb-24 pt-28 md:pt-32" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement(GhostBtn, { size: "sm", icon: "arrow", iconLeft: true, onClick: onBack, className: "mb-7" }, "Back to year")), /* @__PURE__ */ React.createElement(
      PageHead,
      {
        eyebrow: `${brand.name} \xB7 ${model.name} \xB7 ${yearLabel(gen.years)}`,
        title: "Select your",
        accentWord: "engine",
        sub: `Choose the engine variant fitted to your ${model.name} (${yearLabel(gen.years)}).`
      }
    ), /* @__PURE__ */ React.createElement("section", { className: "mx-auto mt-12 max-w-[1280px] px-5 md:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-4" }, gen.engines.map((e, i) => {
      const top = e.stages.filter((s) => s.powerGain != null).reduce((m, s) => Math.max(m, s.powerGain), 0);
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: i,
          onClick: () => onSelectEngine(e),
          className: "az-tile group grid grid-cols-1 items-center gap-5 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40 md:grid-cols-[auto_1fr_auto]"
        },
        /* @__PURE__ */ React.createElement("span", { className: "grid h-12 w-12 place-items-center rounded-full border border-[var(--line)] text-[var(--accent)]" }, /* @__PURE__ */ React.createElement(Icon, { name: "gauge", size: 22 })),
        /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-display text-[22px] font-bold uppercase tracking-[0.02em]" }, e.label), /* @__PURE__ */ React.createElement("div", { className: "mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[12px] text-[var(--text2)]" }, /* @__PURE__ */ React.createElement("span", { className: "text-white" }, e.power, " ", /* @__PURE__ */ React.createElement("span", { className: "text-[var(--muted)]" }, "BHP stock")), /* @__PURE__ */ React.createElement("span", null, e.fuel), /* @__PURE__ */ React.createElement("span", null, "Chassis ", e.chassis), /* @__PURE__ */ React.createElement("span", null, e.stages.length, " stages"))),
        /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 md:justify-end" }, top > 0 && /* @__PURE__ */ React.createElement("span", { className: "rounded-full border border-[var(--green)]/30 bg-[var(--green)]/10 px-3 py-1.5 font-mono text-[12px] font-semibold text-[var(--green)]" }, "up to +", top, " Hp"), /* @__PURE__ */ React.createElement("span", { className: "grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--text2)] transition-colors group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black" }, /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 16 })))
      );
    })), /* @__PURE__ */ React.createElement("div", { className: "mt-8 max-w-xl" }, /* @__PURE__ */ React.createElement(FindField, { placeholder: "Different engine? Find your vehicle\u2026", onFocus: onSearch }))));
  }
  function EmptyState({ title, body, onSearch }) {
    return /* @__PURE__ */ React.createElement("div", { className: "mt-7 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-[var(--line)] bg-white/[0.015] px-6 py-14 text-center" }, /* @__PURE__ */ React.createElement("span", { className: "grid h-12 w-12 place-items-center rounded-full border border-[var(--line)] text-[var(--accent)]" }, /* @__PURE__ */ React.createElement(Icon, { name: "spark", size: 22 })), /* @__PURE__ */ React.createElement("h3", { className: "font-display text-[20px] font-bold uppercase tracking-[0.04em]" }, title), /* @__PURE__ */ React.createElement("p", { className: "max-w-md text-[14px] leading-relaxed text-[var(--text2)]" }, body), /* @__PURE__ */ React.createElement(PrimaryBtn, { size: "sm", onClick: onSearch, icon: "arrow" }, "Contact us"));
  }
  Object.assign(window, { BrandScreen, ModelScreen, YearScreen, EngineScreen, FindField, PageHead, EmptyState });
})();
