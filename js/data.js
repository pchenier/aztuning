/* Apex Calibration — scope wrapper. Keep this line and the matching one at the bottom.
   Edit the catalogue data freely BETWEEN the wrappers. */
(function () {
/* =========================================================================
   APEX CALIBRATION — CATALOGUE CORE  (helpers · tune profiles · static copy)
   =========================================================================
   The catalogue is split across data files for sanity:
     data.jsx        ← this file: config, helpers, tune profiles, site copy
     data-de.jsx     ← German brands (Audi, BMW, Mercedes-AMG, Porsche, VW)
     data-eu.jsx     ← rest of Europe (Ferrari, Lambo, McLaren, exotics, …)
     data-intl.jsx   ← popular non-European + assembles window.SEED_DATA

   ── HOW THE GENERATOR WORKS ──────────────────────────────────────────────
   Instead of hand-writing every stage, each engine is ONE line:

     eng("2.0 TFSI", "EA888 EVO4", "8Y", 310, 400, "t4")
         label        family        chassis  hp   Nm  profile

   The profile (see PROFILES below) auto-derives Stage 1 / Stage 2 / AZM+
   plus Sound-Effect and GearBox add-ons where they make sense. PRICES are
   confirmed accurate by Apex Calibration. Power & torque GAINS are estimates (disclosed on
   every detail page) — tweak the PROFILES table to refine them globally.

   Per-engine overrides:  eng(...,"t4", { fuel:"Diesel", sound:false, p1:899 })
   Add a real photo:      set  image:"/assets/cars/audi-r8.webp"  on the model.

   ── STAGE-2 PART LINK (the "downpipe / exhaust required" shop button) ─────
   Selecting Stage 2 reveals a drop-down that links to the matching hardware on
   the apexcalibration.ca store. By default it deep-links a store search built from
   the brand + chassis (works for every car). To point a vehicle at its EXACT
   product page instead, add a `part` override to that engine:

     eng("3.0 Twin-Turbo","S58","G80",480,550,"t6",85,
         { part:"https://apexcalibration.ca/products/azm-g80-m3-g2-m4-...-downpipe" })

   `part` may be one URL (string) or { downpipe:"…", exhaust:"…" } when a car
   needs different parts at different stages. Paste the URL straight from the
   store — no rebuild needed, this is data only.

   ── TOGGLE PRICES ────────────────────────────────────────────────────────
   CONFIG.showPrices = false  hides every price across the whole site.
   ── OLDEST YEAR WE TUNE: 2013. Nothing in the catalogue predates it. ──────
   ========================================================================= */

/* ── SITE CONFIG ──────────────────────────────────────────────────────────
   Everything here is safe to edit by hand.  The contact form is the only part
   that needs a one-time setup — see CONTACT FORM below and DEPLOYMENT.md.
   ───────────────────────────────────────────────────────────────────────── */
const CONFIG = {
  showPrices: true,                       // false → hides every price site-wide
  currencySuffix: "$",
  storeUrl: "https://apexcalibration.ca",    // main Shopify store (footer "Main store" + "Visit the store")
  bookingUrl: "https://www.gorendezvous.com/en/apexcalibration/", // online booking (header "Appointment" + "Book an appointment")
  siteUrl: "https://aztuning.ca", // this catalogue's own URL (used in <head>/sitemap) — confirm your domain

  /* ── CONTACT FORM ────────────────────────────────────────────────────────
     formProvider controls where enquiries are delivered:
       "netlify"  → zero-backend. Works automatically when hosted on Netlify.
                    Submissions appear in your Netlify dashboard + email alerts.
       "formspree"→ set formEndpoint to your Formspree URL (https://formspree.io/f/xxxx)
       "none"     → no automatic delivery; the form still works as a one-click
                    email / WhatsApp hand-off (always available as a fallback).
     Whatever you pick, the success screen ALWAYS offers Email / WhatsApp / IG,
     so a customer can never hit a dead end.                                   */
  formProvider: "formspree",
  formEndpoint: "https://formspree.io/f/xzdqrqvn",  // Apex Calibration — Formspree endpoint

  email: "info@apexcalibration.ca",
  whatsapp: "15817458680",                // digits only, intl format (for wa.me links)
};

/* ── low-level stage builders ───────────────────────────────────────────── */
const S = {
  p: (name, requirement, pO, pG, tO, tG, price) => ({
    name, requirement, powerOrigin: pO, powerGain: pG,
    torqueOrigin: tO, torqueGain: tG, price,
  }),
  d: (name, description, price) => ({ name, description, price }),
};

/* =========================================================================
   PRICING — based on vehicle MSRP ($k).  Edit PRICING once to change globally.
   ── MSRP TIERS ($ thousands) ─────────────────────────────────────────────
     ≤ 80k          → t1
     80k – 150k     → t2
     150k – 250k    → t3
     exotic supers  → POD (pass  X  as the MSRP, or msrp > 250)
   ──────────────────────────────────────────────────────────────────────────
   Stage 1 :  t1 899   · t2 1699 · t3 2899 · exotic POD
   Stage 2 :  t1 1199  · t2 2099 · t3 4499 · exotic POD
   Stage 3 :  always POD (contact us)
   TCU tune :  exactly 40% of the Stage-2 price (POD if Stage 2 is POD)
   Multimap :  exactly 20% of the Stage-2 price
   Basic options / Stage 4 Tuning : POD (handled on the detail page)
   ── POWER / TORQUE GAINS (rough estimates — disclosed on every detail page) ─
     Stage 1 ≈ +20%  ·  Stage 2 ≈ +35%  ·  Stage 3 ≈ +50%  (HP & torque, vs stock)
   ========================================================================= */
const X = "exotic";                       // POD sentinel — true exotic supercars
const GAINS = { stage1: 0.20, stage2: 0.35, stage3: 0.50 };  // flat % uplift over stock
const PRICING = {
  stage1: { t1: 899, t2: 1699, t3: 2899 },
  stage2: { t1: 1199, t2: 2099, t3: 4499 },
  tcuPct: 0.40,
  multimapPct: 0.20,
  basicFrom: 350,
};
function tierOf(msrp) {
  if (msrp === X || typeof msrp !== "number" || msrp > 250) return null;  // → POD
  if (msrp <= 80) return "t1";
  if (msrp <= 150) return "t2";
  return "t3";                              // 150 – 250k
}

/* ── tune profiles — gain shapes only (pricing is MSRP-based, see above) ──
   s1 / s2 / plus = [hpFraction, torqueFraction] applied to stock figures.    */
const PROFILES = {
  t4:  { s1: [.22, .28], s2: [.40, .47], plus: [.62, .70], req2: "Downpipe required" },        // turbo 4-cyl
  t5:  { s1: [.19, .25], s2: [.33, .42], plus: [.55, .62], req2: "Downpipe + intake required" }, // turbo 5-cyl
  t6:  { s1: [.21, .26], s2: [.36, .43], plus: [.52, .58], req2: "Downpipes required" },        // turbo 6-cyl
  v8:  { s1: [.16, .22], s2: [.28, .35], plus: [.44, .52], req2: "Downpipes required" },        // turbo V8
  v12: { s1: [.14, .18], s2: [.24, .30], plus: [.38, .44], req2: "Downpipes / sport cats required" }, // TT W12/V12
  sc8: { s1: [.10, .13], s2: [.18, .23], plus: [.28, .33], req2: "Pulley / exhaust required" }, // supercharged V8
  exo: { s1: [.09, .11], s2: [.15, .18], plus: [.26, .30], req2: "Sport cats / exhaust required" }, // exotic TT
  na:  { s1: [.04, .05], s2: [.08, .10], plus: [.14, .17], req2: "Headers / exhaust required" }, // naturally aspirated
  nav: { s1: [.03, .04], s2: [.06, .08], plus: [.12, .14], req2: "Race exhaust required" },     // NA V10 / V12 super
  tdi: { s1: [.24, .30], s2: [.36, .45], plus: [.50, .60], req2: "Downpipe / DPF-back required" }, // turbo-diesel
};

/* ── build the Stage 1 / 2 / 3 list (flat % gains · price from MSRP tier) ── */
function mkStages(power, torque, profile, msrp, opts = {}) {
  const P = PROFILES[profile];
  if (!P) throw new Error("Unknown tune profile: " + profile);
  const g = (pct) => Math.round(power * pct / 5) * 5;     // hp gain, rounded to 5
  const t = (pct) => Math.round(torque * pct / 5) * 5;    // torque gain, rounded to 5
  const tier = tierOf(msrp);
  // per-car price override — eng(..., msrp, { p1: 1899, p2: 2499 }) wins over the MSRP tier
  const p1 = opts.p1 != null ? opts.p1 : (tier ? PRICING.stage1[tier] : null);   // null = POD
  const p2 = opts.p2 != null ? opts.p2 : (tier ? PRICING.stage2[tier] : null);
  return [
    S.p("Stage 1", "No mods required",                          power, g(GAINS.stage1), torque, t(GAINS.stage1), p1),
    S.p("Stage 2", P.req2,                                      power, g(GAINS.stage2), torque, t(GAINS.stage2), p2),
    S.p("Stage 3", "Hybrid / built engine — by consultation",  power, g(GAINS.stage3), torque, t(GAINS.stage3), null),
  ];
}

/* ── terse authoring helpers (used by the brand data files) ──────────────
   eng(label, family, chassis, hp, Nm, profile, msrp, opts?)
   msrp = number in $thousands  ·  X = exotic supercar (price on demand)      */
function eng(label, family, chassis, power, torque, profile, msrp, opts = {}) {
  return {
    label, power, chassis, engineFamily: family, msrp,
    fuel: opts.fuel || (profile === "tdi" ? "Diesel" : "Petrol"),
    stages: mkStages(power, torque, profile, msrp, opts),
    part: opts.part || null,           // exact apexcalibration.ca product URL(s) for the Stage-2 hardware
    tcu: opts.tcu != null ? opts.tcu : null,             // $ TCU / gearbox tune  — else 40% of Stage 2
    multimap: opts.multimap != null ? opts.multimap : null, // $ multimap add-on  — else 20% of Stage 2
  };
}
const gen = (yFrom, yTo, ...engines) => ({ years: [yFrom, yTo], engines });
const model = (name, body, ...generations) => ({ name, body, image: "", generations });
const brand = (name, slug, body, ...models) => ({ name, slug, body, models });

/* shared accumulator — brand files push into this; data-intl.jsx finalises it */
window.__AZB = [];
window.__AZHELP = { brand, model, gen, eng, mkStages, S, PROFILES, X, PRICING };

/* =========================================================================
   SITE_CONTENT — static copy for the supporting sections (same per vehicle)
   ========================================================================= */
const SITE_CONTENT = {
  credibility: [
    { k: "15+", v: "Euro & exotic brands" },
    { k: "400+", v: "Platforms calibrated" },
    { k: "100%", v: "Dyno-validated" },
    { k: "2013+", v: "Coverage from 2013 on" },
  ],
  whatIsTune: {
    title: "What is an ECU tune?",
    body: "The ECU is the electronic brain of your car — it governs boost, fuel, ignition timing and throttle. We rewrite that calibration on a platform-specific basis to unlock more power, sharper response and better drivability, all within your engine's mechanical tolerances.",
  },
  reversible: {
    title: "Your stock file is always saved.",
    body: "Before we touch anything, we read and archive your factory calibration. Every Apex tune is fully reversible — return to stock anytime for service, warranty or resale, no trace left behind.",
  },
  process: [
    { n: "01", t: "Tell us your vehicle", d: "Year, engine and any hardware you're running. We confirm the right calibration." },
    { n: "02", t: "In-person or remote", d: "Drop by the Brossard shop — or tune from anywhere: we ship the tools and guide you through an OBD flash over a video call." },
    { n: "03", t: "We calibrate & validate", d: "Custom map adapted to your car, then dyno-validated for safe, repeatable power." },
    { n: "04", t: "Enjoy", d: "Drive away with the gains. On-the-fly map switching available where supported." },
  ],
  maps: [
    { name: "Valet", note: "Limited power, locked-down." },
    { name: "Sport", note: "Daily-driver gains, full drivability." },
    { name: "Race", note: "Maximum output, track-ready." },
    { name: "Custom", note: "Your spec, your fuel." },
  ],
  features: [
    { n: "01", t: "Pops, bangs & burble" },
    { n: "02", t: "Multiple switchable maps" },
    { n: "03", t: "Octane / E85 adjustment" },
    { n: "04", t: "Top-speed delimiter removal" },
    { n: "05", t: "Fully custom calibration" },
    { n: "06", t: "CEL / fault-code removal" },
    { n: "07", t: "Cold-start delete" },
    { n: "08", t: "Real-time data monitoring" },
  ],
  faq: [
    { q: "Will tuning void my warranty?", a: "A tune can affect powertrain warranty. Because your stock file is archived, we can return the car to factory at any time. We'll always walk you through the trade-offs for your specific vehicle." },
    { q: "What fuel / octane do I need?", a: "Most calibrations are built for 91/93 octane premium. Higher-output maps may require 100 octane or E85 — we'll spec exactly what your map expects." },
    { q: "Is it safe for daily driving?", a: "Yes. Stage 1 and Stage 2 maps are built within OEM mechanical tolerances and dyno-validated for repeatable, reliable power on the street." },
    { q: "Stage 1 vs Stage 2 — what's the difference?", a: "Stage 1 needs no hardware. Stage 2 assumes supporting mods (downpipes, intake or exhaust) to unlock more airflow and bigger gains." },
    { q: "Do I have to come to Brossard?", a: "No. Most calibrations can be done remotely — we send you the tools and walk you through an OBD flash over a video call, anywhere in the world. In-person, OBD and bench tuning are also available at the Brossard shop." },
    { q: "Can you tune my car if it isn't listed?", a: "Almost certainly. The catalogue is a starting point — contact us with your exact vehicle and we'll confirm availability." },
  ],
  work: { videos: 3, stats: [
    { k: "2,500+", v: "Vehicles tuned" },
    { k: "15+", v: "Brands supported" },
    { k: "Worldwide", v: "Remote & in-person tuning" },
  ]},
  // Your own clips. Drop files in assets/videos/ and list them here — the
  // "See our work" section auto-switches from placeholders to real videos.
  //   { src: "/assets/videos/r35-dyno.mp4", poster: "/assets/videos/r35-dyno.jpg", title: "R35 GT-R — Stage 2 dyno" },
  videos: [
    { src: "/assets/videos/clip-01.mp4" },
    { src: "/assets/videos/dyno-2026-05-15.mp4" },
    { src: "/assets/videos/dyno-2026-03-14.mp4" },
  ],
  instagram: {
    handle: "apex.calibration",
    url: "https://www.instagram.com/apex.calibration/",
    widget: "",
  },
  shop: {
    address: "9620 Rue Ignace, local O, Brossard, QC J4Y 2R4",
    phone: "+1 (581) 745-8680",
    email: "info@apexcalibration.ca",
    hours: "Tue–Sat · 10 AM – 6 PM EST",
    ig: "@apex.calibration",
    tiktok: "@apex.calibration",
    youtube: "@apex.calibration",
  },

  /* ── DYNO page ──────────────────────────────────────────────────────────── */
  dyno: {
    intro: "The dyno lets us measure your vehicle's true power. We read horsepower and torque (HP & Nm) to within a 0.2% margin of error. Whether your car is RWD, FWD or AWD, our linked braked dyno handles up to 1700 hp for an exact, repeatable measurement.",
    stats: [
      { k: "1700 HP", v: "Linked braked capacity" },
      { k: "< 0.2%", v: "Margin of error" },
      { k: "RWD·FWD·AWD", v: "Every drivetrain" },
      { k: "HP & Nm", v: "Measured & logged" },
    ],
    features: [
      { t: "Accurate power runs", d: "Precise HP & torque figures within a 0.2% margin of error — the real numbers, not estimates." },
      { t: "Any drivetrain", d: "RWD, FWD and AWD vehicles all strap onto our linked braked dyno, rated to 1700 hp." },
      { t: "Live data logging", d: "Air/fuel, boost, timing and more, captured in real time to validate every calibration safely." },
      { t: "Before & after", d: "Back-to-back stock and tuned pulls, so you see exactly what your calibration unlocked." },
    ],
  },

  /* ── DEALERS page ── partner shops that install / represent Apex Calibration ── */
  dealers: {
    intro: "We work closely with the finest partner garages across Québec and Ontario, so clients everywhere get top-notch service and the very best from their vehicle.",
    list: [
      { name: "Itani Performance", city: "Pierrefonds-Roxboro, QC", address: "9620 Boul Gouin O, Pierrefonds-Roxboro, QC H8Y 1R5", phone: "(514) 685-7295" },
      { name: "LGS Prime Service", city: "Terrebonne, QC", address: "3330 Bd des Entreprises, Terrebonne, QC J6X 4J8", phone: "(514) 257-1111" },
      { name: "Garage BG Autoworks", city: "Repentigny, QC", address: "585 Rue Leclerc, Suite #1, Repentigny, QC J6A 7N3", phone: "(438) 864-2886" },
      { name: "Atelier Mécanique Euro-Spec inc", city: "Saint-Raymond, QC", address: "700 Côte Joyeuse, Saint-Raymond, QC G3L 4B1", phone: "(418) 337-0170" },
      { name: "Linea Rossa", city: "Ontario", address: "91 Haist Ave, Unit 1, ON L4L 5V6", phone: "(416) 414-5657" },
      { name: "Miami", city: "FLORIDA, USA", address: "", phone: "", soon: true },
    ],
  },
};

/* =========================================================================
   CAR IMAGES — keyed by brand + chassis (one image covers every trim that
   shares a chassis).  Files live in  assets/cars/<brand>-<chassis>.png
   (transparent PNG, front-3/4).  See assets/cars/_CHASSIS_LIST.md for the
   full list + an AI-generation prompt.

   • Drop all files in and flip CARS_AUTO = true to light them all up, OR
   • Add individual entries to CHASSIS_IMAGES for a partial rollout.
   Any chassis without an image falls back to the silhouette — nothing breaks.
   ========================================================================= */
const CARS_AUTO = false;
const CHASSIS_IMAGES = {
  "alfa-romeo-949": "/assets/cars/alfa-romeo-949.webp",
  "alfa-romeo-952": "/assets/cars/alfa-romeo-952.webp",
  "alfa-romeo-960": "/assets/cars/alfa-romeo-960.webp",
  "alpine-a110": "/assets/cars/alpine-a110.webp",
  "aston-martin-am5": "/assets/cars/aston-martin-am5.webp",
  "aston-martin-am6": "/assets/cars/aston-martin-am6.webp",
  "aston-martin-am7": "/assets/cars/aston-martin-am7.webp",
  "aston-martin-am9": "/assets/cars/aston-martin-am9.webp",
  "aston-martin-vh": "/assets/cars/aston-martin-vh.webp",
  "audi-4m": "/assets/cars/audi-4m.webp",
  "audi-4s": "/assets/cars/audi-4s.webp",
  "audi-8r": "/assets/cars/audi-8r.webp",
  "audi-8s": "/assets/cars/audi-8s.webp",
  "audi-8u": "/assets/cars/audi-8u.webp",
  "audi-8v": "/assets/cars/audi-8v.webp",
  "audi-8v-8y": "/assets/cars/audi-8v-8y.webp",
  "audi-8y": "/assets/cars/audi-8y.webp",
  "audi-b8": "/assets/cars/audi-b8.webp",
  "audi-b8-b9": "/assets/cars/audi-b8-b9.webp",
  "audi-b9": "/assets/cars/audi-b9.webp",
  "audi-c7": "/assets/cars/audi-c7.webp",
  "audi-c8": "/assets/cars/audi-c8.webp",
  "audi-d4": "/assets/cars/audi-d4.webp",
  "audi-d5": "/assets/cars/audi-d5.webp",
  "audi-f3": "/assets/cars/audi-f3.webp",
  "audi-fy": "/assets/cars/audi-fy.webp",
  "audi-type-42": "/assets/cars/audi-type-42.webp",
  "bentley-3s": "/assets/cars/bentley-3s.webp",
  "bentley-4v": "/assets/cars/bentley-4v.webp",
  "bentley-by": "/assets/cars/bentley-by.webp",
  "bmw-f10": "/assets/cars/bmw-f10.webp",
  "bmw-f13": "/assets/cars/bmw-f13.webp",
  "bmw-f15": "/assets/cars/bmw-f15.webp",
  "bmw-f20": "/assets/cars/bmw-f20.webp",
  "bmw-f22": "/assets/cars/bmw-f22.webp",
  "bmw-f30": "/assets/cars/bmw-f30.webp",
  "bmw-f32": "/assets/cars/bmw-f32.webp",
  "bmw-f40": "/assets/cars/bmw-f40.webp",
  "bmw-f80": "/assets/cars/bmw-f80.webp",
  "bmw-f82": "/assets/cars/bmw-f82.webp",
  "bmw-f85": "/assets/cars/bmw-f85.webp",
  "bmw-f87": "/assets/cars/bmw-f87.webp",
  "bmw-f90": "/assets/cars/bmw-f90.webp",
  "bmw-f92": "/assets/cars/bmw-f92.webp",
  "bmw-f95": "/assets/cars/bmw-f95.webp",
  "bmw-f96": "/assets/cars/bmw-f96.webp",
  "bmw-f97": "/assets/cars/bmw-f97.webp",
  "bmw-f98": "/assets/cars/bmw-f98.webp",
  "bmw-g01": "/assets/cars/bmw-g01.webp",
  "bmw-g02": "/assets/cars/bmw-g02.webp",
  "bmw-g05": "/assets/cars/bmw-g05.webp",
  "bmw-g07": "/assets/cars/bmw-g07.webp",
  "bmw-g15": "/assets/cars/bmw-g15.webp",
  "bmw-g20": "/assets/cars/bmw-g20.webp",
  "bmw-g22": "/assets/cars/bmw-g22.webp",
  "bmw-g29": "/assets/cars/bmw-g29.webp",
  "bmw-g30": "/assets/cars/bmw-g30.webp",
  "bmw-g42": "/assets/cars/bmw-g42.webp",
  "bmw-g80": "/assets/cars/bmw-g80.webp",
  "bmw-g82": "/assets/cars/bmw-g82.webp",
  "bmw-g87": "/assets/cars/bmw-g87.webp",
  "bugatti-vw744": "/assets/cars/bugatti-vw744.webp",
  "chevrolet-a1xx": "/assets/cars/chevrolet-a1xx.webp",
  "chevrolet-c7": "/assets/cars/chevrolet-c7.webp",
  "chevrolet-c8": "/assets/cars/chevrolet-c8.webp",
  "cupra-5f": "/assets/cars/cupra-5f.webp",
  "cupra-kh": "/assets/cars/cupra-kh.webp",
  "cupra-kl": "/assets/cars/cupra-kl.webp",
  "cupra-km": "/assets/cars/cupra-km.webp",
  "ferrari-f142": "/assets/cars/ferrari-f142.webp",
  "ferrari-f142m": "/assets/cars/ferrari-f142m.webp",
  "ferrari-f149m": "/assets/cars/ferrari-f149m.webp",
  "ferrari-f151": "/assets/cars/ferrari-f151.webp",
  "ferrari-f152": "/assets/cars/ferrari-f152.webp",
  "ferrari-f152m": "/assets/cars/ferrari-f152m.webp",
  "ferrari-f164": "/assets/cars/ferrari-f164.webp",
  "ferrari-f169": "/assets/cars/ferrari-f169.webp",
  "ford-mk3": "/assets/cars/ford-mk3.webp",
  "ford-mk3-4": "/assets/cars/ford-mk3-4.webp",
  "ford-mk7-8": "/assets/cars/ford-mk7-8.webp",
  "ford-s550": "/assets/cars/ford-s550.webp",
  "ford-s550-s650": "/assets/cars/ford-s550-s650.webp",
  "honda-fc-fe": "/assets/cars/honda-fc-fe.webp",
  "honda-fk8": "/assets/cars/honda-fk8.webp",
  "honda-fl5": "/assets/cars/honda-fl5.webp",
  "hyundai-js": "/assets/cars/hyundai-js.webp",
  "hyundai-os": "/assets/cars/hyundai-os.webp",
  "hyundai-pd-cn7": "/assets/cars/hyundai-pd-cn7.webp",
  "jaguar-x152": "/assets/cars/jaguar-x152.webp",
  "jaguar-x760": "/assets/cars/jaguar-x760.webp",
  "jaguar-x761": "/assets/cars/jaguar-x761.webp",
  "lamborghini-lb724": "/assets/cars/lamborghini-lb724.webp",
  "lamborghini-lb736": "/assets/cars/lamborghini-lb736.webp",
  "lamborghini-lb834": "/assets/cars/lamborghini-lb834.webp",
  "lamborghini-lp560": "/assets/cars/lamborghini-lp560.webp",
  "land-rover-l405": "/assets/cars/land-rover-l405.webp",
  "land-rover-l494": "/assets/cars/land-rover-l494.webp",
  "land-rover-l663": "/assets/cars/land-rover-l663.webp",
  "lotus-type-122": "/assets/cars/lotus-type-122.webp",
  "lotus-type-131": "/assets/cars/lotus-type-131.webp",
  "maserati-m145": "/assets/cars/maserati-m145.webp",
  "maserati-m156": "/assets/cars/maserati-m156.webp",
  "maserati-m157": "/assets/cars/maserati-m157.webp",
  "maserati-m161": "/assets/cars/maserati-m161.webp",
  "maserati-m189": "/assets/cars/maserati-m189.webp",
  "maserati-m240": "/assets/cars/maserati-m240.webp",
  "mclaren-mp4": "/assets/cars/mclaren-mp4.webp",
  "mclaren-p11": "/assets/cars/mclaren-p11.webp",
  "mclaren-p13": "/assets/cars/mclaren-p13.webp",
  "mclaren-p14": "/assets/cars/mclaren-p14.webp",
  "mercedes-benz-c117": "/assets/cars/mercedes-benz-c117.webp",
  "mercedes-benz-c118": "/assets/cars/mercedes-benz-c118.webp",
  "mercedes-benz-c190": "/assets/cars/mercedes-benz-c190.webp",
  "mercedes-benz-c218": "/assets/cars/mercedes-benz-c218.webp",
  "mercedes-benz-c257": "/assets/cars/mercedes-benz-c257.webp",
  "mercedes-benz-h247": "/assets/cars/mercedes-benz-h247.webp",
  "mercedes-benz-r232": "/assets/cars/mercedes-benz-r232.webp",
  "mercedes-benz-w167": "/assets/cars/mercedes-benz-w167.webp",
  "mercedes-benz-w177": "/assets/cars/mercedes-benz-w177.webp",
  "mercedes-benz-w205": "/assets/cars/mercedes-benz-w205.webp",
  "mercedes-benz-w206": "/assets/cars/mercedes-benz-w206.webp",
  "mercedes-benz-w213": "/assets/cars/mercedes-benz-w213.webp",
  "mercedes-benz-w222": "/assets/cars/mercedes-benz-w222.webp",
  "mercedes-benz-w223": "/assets/cars/mercedes-benz-w223.webp",
  "mercedes-benz-w463": "/assets/cars/mercedes-benz-w463.webp",
  "mercedes-benz-x167": "/assets/cars/mercedes-benz-x167.webp",
  "mercedes-benz-x247": "/assets/cars/mercedes-benz-x247.webp",
  "mercedes-benz-x253": "/assets/cars/mercedes-benz-x253.webp",
  "mercedes-benz-x290": "/assets/cars/mercedes-benz-x290.webp",
  "mini-f56": "/assets/cars/mini-f56.webp",
  "nissan-r35": "/assets/cars/nissan-r35.webp",
  "nissan-rz34": "/assets/cars/nissan-rz34.webp",
  "nissan-z34": "/assets/cars/nissan-z34.webp",
  "porsche-95b": "/assets/cars/porsche-95b.webp",
  "porsche-971": "/assets/cars/porsche-971.webp",
  "porsche-982": "/assets/cars/porsche-982.webp",
  "porsche-991": "/assets/cars/porsche-991.webp",
  "porsche-991-2": "/assets/cars/porsche-991-2.webp",
  "porsche-992": "/assets/cars/porsche-992.webp",
  "porsche-9ya": "/assets/cars/porsche-9ya.webp",
  "subaru-va": "/assets/cars/subaru-va.webp",
  "subaru-vb": "/assets/cars/subaru-vb.webp",
  "subaru-zd8": "/assets/cars/subaru-zd8.webp",
  "toyota-a90": "/assets/cars/toyota-a90.webp",
  "toyota-gxpa16": "/assets/cars/toyota-gxpa16.webp",
  "toyota-gzea14": "/assets/cars/toyota-gzea14.webp",
  "toyota-zn8": "/assets/cars/toyota-zn8.webp",
  "volkswagen-13": "/assets/cars/volkswagen-13.webp",
  "volkswagen-3h": "/assets/cars/volkswagen-3h.webp",
  "volkswagen-a1": "/assets/cars/volkswagen-a1.webp",
  "volkswagen-a7": "/assets/cars/volkswagen-a7.webp",
  "volkswagen-ad1": "/assets/cars/volkswagen-ad1.webp",
  "volkswagen-aw": "/assets/cars/volkswagen-aw.webp",
  "volkswagen-b8": "/assets/cars/volkswagen-b8.webp",
  "volkswagen-mk7": "/assets/cars/volkswagen-mk7.webp",
  "volkswagen-mk7-5": "/assets/cars/volkswagen-mk7-5.webp",
  "volkswagen-mk7-8": "/assets/cars/volkswagen-mk7-8.webp",
  "volkswagen-mk8": "/assets/cars/volkswagen-mk8.webp",
  "volvo-p3": "/assets/cars/volvo-p3.webp",
};
function _carKey(brandSlug, chassis) {
  return brandSlug + "-" + String(chassis).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function carImage(brandSlug, chassis) {
  const k = _carKey(brandSlug, chassis);
  if (CHASSIS_IMAGES[k]) return CHASSIS_IMAGES[k];
  if (CARS_AUTO) return "/assets/cars/" + k + ".webp";
  return null;
}

/* turn a label into a clean URL segment, e.g. "M3 Competition" → "m3-competition" */
function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/* =========================================================================
   STAGE-2 HARDWARE → APEX CALIBRATION STORE LINK
   Stage 2 always needs supporting hardware (a downpipe, exhaust, headers…).
   needsHardware() flags any stage whose requirement names such a part;
   partLink() returns where to buy it on the store:
     • the engine's exact `part` URL when provided (opts.part), else
     • a brand + chassis search on the store (works for every vehicle).
   ========================================================================= */
function needsHardware(stage) {
  return /downpipe|exhaust|header|pulley|sport cat|dpf/i.test(String((stage && stage.requirement) || ""));
}
function partLink(brand, model, engine, stage) {
  const req = String((stage && stage.requirement) || "").toLowerCase();
  const keyword = (req.includes("downpipe") || req.includes("dpf")) ? "downpipe" : "exhaust";
  const noun =
      req.includes("downpipes") ? "downpipes"
    : req.includes("downpipe")  ? "a downpipe"
    : req.includes("header")    ? "headers"
    : req.includes("pulley")    ? "a pulley & exhaust"
    : req.includes("sport cat") ? "sport cats"
    :                             "a sport exhaust";
  // an exact product URL on the engine (opts.part) always wins
  let exact = null;
  const p = engine && engine.part;
  if (p) exact = typeof p === "string" ? p : (p[keyword] || p.downpipe || p.exhaust || null);
  if (exact) return { noun, keyword, exact: true, url: exact };
  // smart fallback — a brand + chassis product search on the store
  const chassis = String(engine.chassis).split(/[\/\s]+/)[0];   // primary chassis token
  const q = encodeURIComponent(`${brand.name} ${chassis} ${keyword}`);
  return { noun, keyword, exact: false, url: `${CONFIG.storeUrl}/search?q=${q}&type=product` };
}

/* =========================================================================
   SEO META — single source of truth for per-route <title>/description/canonical.
   Used by BOTH the build-time prerenderer (tools/prerender.js) AND the client
   router (app.jsx), so the static HTML Google first crawls and the in-app SPA
   navigation never drift. English only (prerendered pages are English; the FR
   toggle is client-side — a future /fr/ prerender would localise these).
   Edit the copy here and it updates everywhere on the next build.
   ========================================================================= */
function seoMeta(view, sel) {
  const base = "Apex Calibration";
  const site = String(CONFIG.siteUrl || "https://aztuning.ca").replace(/\/$/, "");
  // ── individual vehicle page ──
  if (view === "results" && sel && sel.brand && sel.model && sel.gen && sel.engine) {
    const { brand, model, gen, engine } = sel;
    const gi = model.generations.indexOf(gen);
    const ei = gen.engines.indexOf(engine);
    const path = `/vehicle/${brand.slug}/${slugify(model.name)}/${gi}/${ei}`;
    const yrs = `${gen.years[0]}–${gen.years[1]}`;
    const s2 = engine.stages && engine.stages.find((s) => s.name === "Stage 2");
    const gain = s2 && s2.powerGain ? `, up to +${s2.powerGain} hp at Stage 2` : "";
    return {
      title: `${brand.name} ${model.name} ECU Tuning${engine.chassis ? ` (${engine.chassis})` : ""} — Stage 1, 2 & 3 | ${base}`,
      description: `Dyno-validated Stage 1–3 ECU tuning for the ${yrs} ${brand.name} ${model.name} (${engine.chassis}, ${engine.power} hp stock${gain}). Fully reversible — in Brossard, QC or remote worldwide.`,
      canonical: site + path,
      path,
    };
  }
  // ── static sub-pages ──
  const PAGES = {
    tuning:  { title: `ECU Tuning — Stage 1, 2 & 3 Custom Calibrations | ${base}`,
               description: "Dyno-validated Stage 1, 2 & 3 ECU tuning for 400+ Euro & exotic platforms — more power, sharper throttle response, fully reversible. Brossard, QC or remote worldwide." },
    dyno:    { title: `Dyno Tuning — 1700 HP Linked Braked Dyno | ${base}`,
               description: "Precise dyno power runs within a 0.2% margin — RWD, FWD & AWD up to 1700 hp. HP & torque measured, logged and validated at Apex Calibration in Brossard, Québec." },
    dealers: { title: `Dealers & Partner Garages — Québec & Ontario | ${base}`,
               description: "Apex Calibration partner garages across Québec & Ontario — authorized shops for professional installation and tuning support near you." },
    contact: { title: `Contact & Booking — ECU Tuning in Brossard, QC | ${base}`,
               description: "Book your ECU tuning at Apex Calibration in Brossard, Québec, or arrange remote tuning worldwide. Call +1 (581) 745-8680 or message us." },
  };
  if (PAGES[view]) return { title: PAGES[view].title, description: PAGES[view].description, canonical: site + "/" + view, path: "/" + view };
  // ── home ──
  return {
    title: `${base} — ECU Tuning Catalogue | Brossard, Québec`,
    description: "Euro & exotic custom ECU tuning. Dyno-validated, platform-specific, fully reversible calibrations for 400+ platforms. In-person in Brossard, Québec, or remote worldwide.",
    canonical: site + "/",
    path: "/",
  };
}

Object.assign(window, { CONFIG, S, SITE_CONTENT, CHASSIS_IMAGES, carImage, slugify, needsHardware, partLink, seoMeta });

})();
