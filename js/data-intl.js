/* AZ Motorsport — scope wrapper. Keep this line and the matching one at the bottom.
   Edit the catalogue data freely BETWEEN the wrappers. */
(function () {
/* =========================================================================
   AZ MOTORSPORT — INTERNATIONAL BRANDS · each trim its own model
   Nissan · Toyota · Honda · Ford · Chevrolet · Hyundai · Subaru — 2013+
   This file loads LAST and assembles window.SEED_DATA from all brand files.
   ========================================================================= */
const { brand: br, model: mo, gen: ge, eng: en, X } = window.__AZHELP;

window.__AZB.push(

  /* ───────────────────────────── NISSAN ─────────────────────────────── */
  br("Nissan", "nissan", "coupe",
    mo("GT-R", "coupe", ge(2013, 2024, en("3.8 V6 Twin-Turbo", "VR38DETT", "R35", 565, 633, "t6", 130))),
    mo("GT-R Nismo", "coupe", ge(2017, 2024, en("3.8 V6 Twin-Turbo", "VR38DETT", "R35", 600, 652, "t6", 220))),
    mo("370Z", "coupe", ge(2013, 2020, en("3.7 V6", "VQ37VHR", "Z34", 332, 363, "na", 45))),
    mo("Z", "coupe", ge(2023, 2024, en("3.0 V6 Twin-Turbo", "VR30DDTT", "RZ34", 400, 475, "t6", 65)))),

  /* ───────────────────────────── TOYOTA ─────────────────────────────── */
  br("Toyota", "toyota", "coupe",
    mo("GR Supra 2.0", "coupe", ge(2020, 2024, en("2.0 Turbo", "B48", "A90", 258, 400, "t4", 55))),
    mo("GR Supra 3.0", "coupe", ge(2020, 2024, en("3.0 Turbo", "B58", "A90", 382, 500, "t6", 70))),
    mo("GR Yaris", "hatch", ge(2020, 2024, en("1.6 Turbo", "G16E", "GXPA16", 261, 360, "t4", 55))),
    mo("GR Corolla", "hatch", ge(2023, 2024, en("1.6 Turbo", "G16E", "GZEA14", 300, 370, "t4", 50))),
    mo("GR86", "coupe", ge(2022, 2024, en("2.4 Boxer", "FA24", "ZN8", 228, 250, "na", 35)))),

  /* ───────────────────────────── HONDA ──────────────────────────────── */
  br("Honda", "honda", "hatch",
    mo("Civic Type R (FK8)", "hatch", ge(2017, 2021, en("2.0 VTEC Turbo", "K20C1", "FK8", 306, 400, "t4", 48))),
    mo("Civic Type R (FL5)", "hatch", ge(2023, 2024, en("2.0 VTEC Turbo", "K20C1", "FL5", 315, 420, "t4", 50))),
    mo("Civic Si", "sedan", ge(2017, 2024, en("1.5 Turbo", "L15", "FC/FE", 205, 260, "t4", 35)))),

  /* ────────────────────────────── FORD ──────────────────────────────── */
  br("Ford", "ford", "coupe",
    mo("Mustang GT", "coupe", ge(2015, 2024, en("5.0 Coyote V8", "Coyote", "S550/S650", 460, 569, "na", 55))),
    mo("Mustang EcoBoost", "coupe", ge(2015, 2024, en("2.3 Turbo", "EcoBoost", "S550", 310, 475, "t4", 45))),
    mo("Focus RS", "hatch", ge(2016, 2018, en("2.3 Turbo", "EcoBoost", "MK3", 350, 470, "t4", 55))),
    mo("Focus ST", "hatch", ge(2013, 2024, en("2.0 Turbo", "EcoBoost", "MK3/4", 252, 360, "t4", 35))),
    mo("Fiesta ST", "hatch", ge(2014, 2024, en("1.5 / 1.6 Turbo", "EcoBoost", "MK7/8", 197, 290, "t4", 30)))),

  /* ──────────────────────────── CHEVROLET ───────────────────────────── */
  br("Chevrolet", "chevrolet", "coupe",
    mo("Corvette C7", "super", ge(2014, 2019, en("6.2 V8", "LT1", "C7", 460, 630, "na", 75))),
    mo("Corvette C7 Z06", "super", ge(2015, 2019, en("6.2 V8 Supercharged", "LT4", "C7", 650, 881, "sc8", 95))),
    mo("Corvette C8", "super", ge(2020, 2024, en("6.2 V8", "LT2", "C8", 495, 637, "na", 80))),
    mo("Camaro SS", "coupe", ge(2016, 2024, en("6.2 V8", "LT1", "A1XX", 455, 617, "na", 55))),
    mo("Camaro ZL1", "coupe", ge(2017, 2024, en("6.2 V8 Supercharged", "LT4", "A1XX", 650, 881, "sc8", 90)))),

  /* ───────────────────────────── HYUNDAI ────────────────────────────── */
  br("Hyundai", "hyundai", "hatch",
    mo("i30 N / Elantra N", "hatch", ge(2018, 2024, en("2.0 Turbo", "Theta II", "PD/CN7", 280, 392, "t4", 45))),
    mo("Veloster N", "coupe", ge(2019, 2022, en("2.0 Turbo", "Theta II", "JS", 275, 353, "t4", 42))),
    mo("Kona N", "suv", ge(2022, 2024, en("2.0 Turbo", "Theta II", "OS", 280, 392, "t4", 48)))),

  /* ───────────────────────────── SUBARU ─────────────────────────────── */
  br("Subaru", "subaru", "sedan",
    mo("WRX", "sedan",
      ge(2015, 2021, en("2.0 Turbo Boxer", "FA20", "VA", 268, 350, "t4", 40)),
      ge(2022, 2024, en("2.4 Turbo Boxer", "FA24", "VB", 271, 350, "t4", 42))),
    mo("WRX STI", "sedan", ge(2015, 2021, en("2.5 Turbo Boxer", "EJ257", "VA", 310, 393, "t4", 50))),
    mo("BRZ", "coupe", ge(2022, 2024, en("2.4 Boxer", "FA24", "ZD8", 228, 250, "na", 35))))
);

/* ── pricing override: newer M / RS / AMG sit in the 80k–150k tier ───────────
   Any current-generation (year range running to 2022+) M, RS or AMG model is
   floored at the 80k–150k tier for tuning (Stage 1 $1,699 · Stage 2 $2,099),
   even if its MSRP would otherwise place it lower. Older gens, POD exotics and
   already-higher (150k+) trims are untouched. TCU/Multimap follow Stage 2.    */
const NEWER_FROM = 2022;
function _isPerf(slug, name) {
  if (slug === "audi" && /RS/.test(name)) return true;                          // RS3, RS4, RS Q8, TT RS…
  if (slug === "bmw" && (/\bM\d/.test(name) || /\bM\b/.test(name) || /M Competition/.test(name))) return true;
  if (slug === "mercedes-benz" && (/(35|43|45|53|63)/.test(name) || /AMG|GT|SL/.test(name))) return true;
  return false;
}
window.__AZB.forEach((b) => b.models.forEach((m) => {
  if (!_isPerf(b.slug, m.name)) return;
  m.generations.forEach((g) => {
    if (g.years[1] < NEWER_FROM) return;                                          // newer gens only
    g.engines.forEach((e) => {
      const s1 = e.stages.find((s) => s.name === "Stage 1");
      const s2 = e.stages.find((s) => s.name === "Stage 2");
      if (s1 && s1.price != null && s1.price < 1699) s1.price = 1699;
      if (s2 && s2.price != null && s2.price < 2099) s2.price = 2099;
    });
  });
}));

/* ── FINALISE: hand the assembled brand list to the app ─────────────────── */
const SEED_DATA = { brands: window.__AZB };
Object.assign(window, { SEED_DATA });

})();
