/* AZ Motorsport — scope wrapper. Keep this line and the matching one at the bottom.
   Edit the catalogue data freely BETWEEN the wrappers. */
(function () {
/* =========================================================================
   AZ MOTORSPORT — EUROPEAN BRANDS (ex-Germany) · each trim its own model
   Ferrari · Lamborghini · McLaren · Aston Martin · Bentley · Maserati ·
   Alfa Romeo · Jaguar · Land Rover · MINI · Alpine · Lotus · Cupra ·
   Volvo · Bugatti   —   2013+ ·  X = exotic supercar (price on demand)
   ========================================================================= */
const { brand: b, model: m, gen: g, eng: e, X } = window.__AZHELP;

window.__AZB.push(

  /* ───────────────────────────── FERRARI ────────────────────────────── */
  b("Ferrari", "ferrari", "super",
    m("458 Italia / Speciale", "super", g(2013, 2015, e("4.5 V8", "F136", "F142", 570, 540, "na", X))),
    m("California T", "super", g(2014, 2017, e("3.9 V8 Twin-Turbo", "F154", "F149M", 560, 755, "exo", X))),
    m("488 GTB / Spider", "super", g(2015, 2019, e("3.9 V8 Twin-Turbo", "F154", "F142M", 670, 760, "exo", X))),
    m("488 Pista", "super", g(2018, 2020, e("3.9 V8 Twin-Turbo", "F154", "F142M", 720, 770, "exo", X))),
    m("F8 Tributo / Spider", "super", g(2019, 2023, e("3.9 V8 Twin-Turbo", "F154", "F142M", 720, 770, "exo", X))),
    m("Portofino / M", "super", g(2018, 2024, e("3.9 V8 Twin-Turbo", "F154", "F164", 600, 760, "exo", X))),
    m("Roma", "super", g(2020, 2024, e("3.9 V8 Twin-Turbo", "F154", "F169", 620, 760, "exo", X))),
    m("GTC4Lusso T", "super", g(2016, 2020, e("3.9 V8 Twin-Turbo", "F154", "F151", 610, 760, "exo", X))),
    m("812 Superfast", "super", g(2017, 2024, e("6.5 V12", "F140", "F152M", 800, 718, "na", X))),
    m("F12berlinetta", "super", g(2013, 2017, e("6.3 V12", "F140", "F152", 730, 690, "na", X)))),

  /* ──────────────────────────── LAMBORGHINI ─────────────────────────── */
  b("Lamborghini", "lamborghini", "super",
    m("Gallardo", "super", g(2013, 2014, e("5.2 V10", "5.2 V10", "LP560", 560, 540, "nav", X))),
    m("Huracán", "super", g(2014, 2024, e("5.2 V10", "5.2 V10", "LB724", 610, 560, "nav", X))),
    m("Huracán Performante", "super", g(2017, 2019, e("5.2 V10", "5.2 V10", "LB724", 640, 600, "nav", X))),
    m("Huracán STO / Tecnica", "super", g(2021, 2024, e("5.2 V10", "5.2 V10", "LB724", 640, 565, "nav", X))),
    m("Aventador LP700-4", "super", g(2013, 2017, e("6.5 V12", "6.5 V12", "LB834", 700, 690, "nav", X))),
    m("Aventador S", "super", g(2017, 2022, e("6.5 V12", "6.5 V12", "LB834", 740, 690, "nav", X))),
    m("Aventador SVJ", "super", g(2018, 2022, e("6.5 V12", "6.5 V12", "LB834", 770, 720, "nav", X))),
    m("Urus", "suv", g(2018, 2024, e("4.0 V8 Twin-Turbo", "4.0 TFSI", "LB736", 650, 850, "v8", 230))),
    m("Urus Performante / S", "suv", g(2022, 2024, e("4.0 V8 Twin-Turbo", "4.0 TFSI", "LB736", 666, 850, "v8", 250)))),

  /* ───────────────────────────── McLAREN ────────────────────────────── */
  b("McLaren", "mclaren", "super",
    m("12C", "super", g(2013, 2014, e("3.8 V8 Twin-Turbo", "M838T", "MP4", 616, 600, "exo", X))),
    m("540C", "super", g(2015, 2021, e("3.8 V8 Twin-Turbo", "M838TE", "P13", 540, 540, "exo", X))),
    m("570S / 570GT", "super", g(2015, 2021, e("3.8 V8 Twin-Turbo", "M838TE", "P13", 570, 600, "exo", X))),
    m("600LT", "super", g(2018, 2021, e("3.8 V8 Twin-Turbo", "M838TE", "P14", 600, 620, "exo", X))),
    m("650S", "super", g(2014, 2016, e("3.8 V8 Twin-Turbo", "M838T", "P11", 650, 678, "exo", X))),
    m("675LT", "super", g(2015, 2017, e("3.8 V8 Twin-Turbo", "M838T", "P11", 666, 700, "exo", X))),
    m("720S", "super", g(2017, 2023, e("4.0 V8 Twin-Turbo", "M840T", "P14", 720, 770, "exo", X))),
    m("765LT", "super", g(2020, 2024, e("4.0 V8 Twin-Turbo", "M840T", "P14", 755, 800, "exo", X))),
    m("GT", "super", g(2019, 2024, e("4.0 V8 Twin-Turbo", "M840TE", "P14", 620, 630, "exo", X)))),

  /* ────────────────────────── ASTON MARTIN ──────────────────────────── */
  b("Aston Martin", "aston-martin", "super",
    m("Vantage", "super", g(2018, 2024, e("4.0 V8 Twin-Turbo", "AMG M177", "AM6", 510, 685, "v8", 160))),
    m("DB11 V8", "super", g(2017, 2024, e("4.0 V8 Twin-Turbo", "AMG M177", "AM5", 510, 675, "v8", X))),
    m("DB11 V12", "super", g(2016, 2024, e("5.2 V12 Twin-Turbo", "AM29", "AM5", 600, 700, "v12", X))),
    m("DBS Superleggera", "super", g(2018, 2023, e("5.2 V12 Twin-Turbo", "AM29", "AM7", 715, 900, "v12", X))),
    m("Vanquish", "super", g(2013, 2018, e("6.0 V12", "AM11", "VH", 568, 630, "na", X))),
    m("DBX", "suv", g(2020, 2024, e("4.0 V8 Twin-Turbo", "AMG M177", "AM9", 550, 700, "v8", 190))),
    m("DBX 707", "suv", g(2022, 2024, e("4.0 V8 Twin-Turbo", "AMG M177", "AM9", 707, 900, "v8", X)))),

  /* ───────────────────────────── BENTLEY ────────────────────────────── */
  b("Bentley", "bentley", "coupe",
    m("Continental GT V8", "coupe", g(2013, 2024, e("4.0 V8 Twin-Turbo", "EA825", "3S", 550, 770, "v8", 230))),
    m("Continental GT W12", "coupe", g(2013, 2024, e("6.0 W12 Twin-Turbo", "W12 TT", "3S", 626, 900, "v12", 250))),
    m("Flying Spur V8", "sedan", g(2013, 2024, e("4.0 V8 Twin-Turbo", "EA825", "BY", 550, 770, "v8", 230))),
    m("Flying Spur W12", "sedan", g(2013, 2024, e("6.0 W12 Twin-Turbo", "W12 TT", "BY", 626, 900, "v12", 250))),
    m("Bentayga V8", "suv", g(2016, 2024, e("4.0 V8 Twin-Turbo", "EA825", "4V", 550, 770, "v8", 220))),
    m("Bentayga W12", "suv", g(2016, 2024, e("6.0 W12 Twin-Turbo", "W12 TT", "4V", 626, 900, "v12", 245)))),

  /* ───────────────────────────── MASERATI ───────────────────────────── */
  b("Maserati", "maserati", "sedan",
    m("Ghibli", "sedan", g(2014, 2024, e("3.0 V6 Twin-Turbo", "F160", "M157", 350, 500, "t6", 90))),
    m("Ghibli Trofeo", "sedan", g(2021, 2024, e("3.8 V8 Twin-Turbo", "F154", "M157", 580, 730, "v8", 140))),
    m("Quattroporte", "sedan", g(2013, 2024, e("3.0 V6 Twin-Turbo", "F160", "M156", 410, 550, "t6", 130))),
    m("Quattroporte GTS", "sedan", g(2013, 2024, e("3.8 V8 Twin-Turbo", "F154", "M156", 530, 710, "v8", 160))),
    m("Levante", "suv", g(2016, 2024, e("3.0 V6 Twin-Turbo", "F160", "M161", 350, 500, "t6", 95))),
    m("Levante Trofeo", "suv", g(2019, 2024, e("3.8 V8 Twin-Turbo", "F154", "M161", 580, 730, "v8", 150))),
    m("GranTurismo (4.7 V8)", "coupe", g(2013, 2019, e("4.7 V8", "F136", "M145", 460, 520, "na", 150))),
    m("GranTurismo (Nettuno V6)", "coupe", g(2023, 2024, e("3.0 V6 Twin-Turbo", "F161", "M189", 550, 650, "t6", 200))),
    m("MC20", "super", g(2020, 2024, e("3.0 V6 Nettuno Twin-Turbo", "F161", "M240", 630, 730, "exo", X)))),

  /* ──────────────────────────── ALFA ROMEO ──────────────────────────── */
  b("Alfa Romeo", "alfa-romeo", "sedan",
    m("Giulia", "sedan", g(2016, 2024, e("2.0 Turbo", "GME T4", "952", 280, 400, "t4", 50))),
    m("Giulia Quadrifoglio", "sedan", g(2016, 2024, e("2.9 V6 Bi-Turbo", "690T", "952", 510, 600, "t6", 95))),
    m("Stelvio", "suv", g(2017, 2024, e("2.0 Turbo", "GME T4", "949", 280, 400, "t4", 55))),
    m("Stelvio Quadrifoglio", "suv", g(2017, 2024, e("2.9 V6 Bi-Turbo", "690T", "949", 510, 600, "t6", 100))),
    m("4C", "coupe", g(2013, 2020, e("1.75 Turbo", "55263", "960", 240, 350, "t4", 75)))),

  /* ───────────────────────────── JAGUAR ─────────────────────────────── */
  b("Jaguar", "jaguar", "coupe",
    m("F-Type P300", "coupe", g(2013, 2024, e("2.0 Turbo", "Ingenium", "X152", 300, 400, "t4", 75))),
    m("F-Type P380", "coupe", g(2013, 2024, e("3.0 V6 Supercharged", "AJ126", "X152", 380, 460, "t6", 90))),
    m("F-Type R", "coupe", g(2013, 2024, e("5.0 V8 Supercharged", "AJ133", "X152", 550, 680, "sc8", 130))),
    m("XE / XF", "sedan", g(2015, 2024, e("2.0 Turbo", "Ingenium", "X760", 250, 365, "t4", 55))),
    m("XE SV Project 8", "sedan", g(2018, 2020, e("5.0 V8 Supercharged", "AJ133", "X760", 600, 700, "sc8", 200))),
    m("F-Pace SVR", "suv", g(2018, 2024, e("5.0 V8 Supercharged", "AJ133", "X761", 550, 680, "sc8", 110)))),

  /* ─────────────────────────── LAND ROVER ───────────────────────────── */
  b("Land Rover", "land-rover", "suv",
    m("Range Rover SC V6", "suv", g(2013, 2024, e("3.0 V6 Supercharged", "AJ126", "L405", 340, 450, "t6", 130))),
    m("Range Rover SC V8", "suv", g(2013, 2024, e("5.0 V8 Supercharged", "AJ133", "L405", 565, 625, "sc8", 180))),
    m("Range Rover SDV8 Diesel", "suv", g(2013, 2024, e("4.4 SDV8 Diesel", "AJ8", "L405", 339, 740, "tdi", 140))),
    m("Range Rover Sport SC V6", "suv", g(2013, 2024, e("3.0 V6 Supercharged", "AJ126", "L494", 340, 450, "t6", 100))),
    m("Range Rover Sport SVR", "suv", g(2015, 2024, e("5.0 V8 Supercharged", "AJ133", "L494", 575, 700, "sc8", 150))),
    m("Defender 3.0", "suv", g(2020, 2024, e("3.0 Turbo", "Ingenium", "L663", 400, 550, "t6", 70))),
    m("Defender V8", "suv", g(2021, 2024, e("5.0 V8 Supercharged", "AJ133", "L663", 525, 625, "sc8", 130)))),

  /* ────────────────────────────── MINI ──────────────────────────────── */
  b("MINI", "mini", "hatch",
    m("Cooper S", "hatch", g(2014, 2024, e("2.0 Turbo", "B48", "F56", 192, 280, "t4", 35))),
    m("John Cooper Works", "hatch", g(2015, 2024, e("2.0 Turbo", "B48", "F56", 231, 320, "t4", 42))),
    m("JCW GP", "hatch", g(2020, 2023, e("2.0 Turbo", "B48", "F56", 306, 450, "t4", 55)))),

  /* ───────────────────────────── ALPINE ─────────────────────────────── */
  b("Alpine", "alpine", "coupe",
    m("A110", "coupe", g(2017, 2024, e("1.8 Turbo", "M5Pt", "A110", 252, 320, "t4", 75))),
    m("A110 S / R", "coupe", g(2019, 2024, e("1.8 Turbo", "M5Pt", "A110", 300, 340, "t4", 85)))),

  /* ────────────────────────────── LOTUS ─────────────────────────────── */
  b("Lotus", "lotus", "super",
    m("Evora", "coupe", g(2013, 2021, e("3.5 V6 Supercharged", "2GR", "Type 122", 400, 410, "na", 100))),
    m("Emira V6", "super", g(2022, 2024, e("3.5 V6 Supercharged", "2GR", "Type 131", 400, 420, "na", 110))),
    m("Emira i4", "super", g(2022, 2024, e("2.0 Turbo (AMG)", "M139", "Type 131", 360, 430, "t4", 95)))),

  /* ──────────────────────────── CUPRA / SEAT ────────────────────────── */
  b("Cupra", "cupra", "hatch",
    m("Leon Cupra", "hatch", g(2014, 2020, e("2.0 TSI", "EA888 Gen3", "5F", 290, 350, "t4", 45))),
    m("Cupra Leon", "hatch", g(2020, 2024, e("2.0 TSI", "EA888 EVO4", "KL", 300, 400, "t4", 48))),
    m("Cupra Ateca", "suv", g(2018, 2024, e("2.0 TSI", "EA888 EVO4", "KH", 300, 400, "t4", 50))),
    m("Cupra Formentor", "suv", g(2020, 2024, e("2.0 TSI", "EA888 EVO4", "KM", 310, 400, "t4", 50)))),

  /* ──────────────────────── VOLVO / POLESTAR ────────────────────────── */
  b("Volvo", "volvo", "sedan",
    m("S60 / V60 Polestar", "sedan", g(2014, 2018, e("3.0 T6 SC+Turbo", "B6304", "P3", 350, 500, "t6", 60))),
    m("S60 / V60 / XC60 T6", "suv", g(2019, 2024, e("2.0 SC+Turbo", "B420", "P3", 310, 400, "t4", 55))),
    m("S60 / V60 / XC60 T8", "suv", g(2019, 2024, e("2.0 Hybrid", "B420", "P3", 340, 430, "t4", 60)))),

  /* ───────────────────────────── BUGATTI ────────────────────────────── */
  b("Bugatti", "bugatti", "super",
    m("Veyron", "super", g(2013, 2015, e("8.0 W16 Quad-Turbo", "W16", "VW744", 1001, 1250, "exo", X))),
    m("Chiron", "super", g(2016, 2024, e("8.0 W16 Quad-Turbo", "W16", "VW744", 1500, 1600, "exo", X))))
);

})();
