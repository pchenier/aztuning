/* =========================================================================
   AZ MOTORSPORT — BILINGUAL (EN / FR)
   Loaded after the data files, before the components. Provides:
     t(key)     → short UI label in the active language (English fallback)
     content()  → the SITE_CONTENT copy block in the active language
     getLang() / setLang(l)
   Edit French copy freely below. Keep this file's wrapper lines intact.
   ========================================================================= */
(function () {
  let AZ_LANG = "en";
  try { const s = localStorage.getItem("az_lang"); if (s === "fr" || s === "en") AZ_LANG = s; } catch (e) {}
  if (typeof document !== "undefined") document.documentElement.lang = AZ_LANG;

  function getLang() { return AZ_LANG; }
  function setLang(l) {
    AZ_LANG = l === "fr" ? "fr" : "en";
    try { localStorage.setItem("az_lang", AZ_LANG); } catch (e) {}
    if (typeof document !== "undefined") document.documentElement.lang = AZ_LANG;
  }

  /* ── UI label dictionary (semantic keys + data-string keys) ─────────────── */
  const UI = {
    // nav / header
    "nav.catalogue": { en: "Catalogue", fr: "Catalogue" },
    "nav.tuning": { en: "Tuning", fr: "Tuning" },
    "nav.dyno": { en: "Dyno", fr: "Dyno" },
    "nav.dealers": { en: "Dealers", fr: "Revendeurs" },
    "nav.contact": { en: "Contact", fr: "Contact" },
    "nav.appointment": { en: "Appointment", fr: "Rendez-vous" },
    "header.find": { en: "Find your vehicle", fr: "Trouvez votre véhicule" },
    "lang.toggleTo": { en: "Passer en français", fr: "Switch to English" },

    // search modal
    "search.placeholder": { en: "Find your vehicle — brand, model or engine…", fr: "Trouvez votre véhicule — marque, modèle ou moteur…" },
    "search.noMatch": { en: "No match for", fr: "Aucun résultat pour" },
    "search.cantFind": { en: "Can’t find your vehicle? Contact us →", fr: "Vous ne trouvez pas votre véhicule? Contactez-nous →" },
    "type.brand": { en: "brand", fr: "marque" },
    "type.model": { en: "model", fr: "modèle" },
    "type.engine": { en: "engine", fr: "moteur" },
    "lbl.Model": { en: "Model", fr: "Modèle" },
    "unit.models": { en: "models", fr: "modèles" },
    "unit.model": { en: "model", fr: "modèle" },
    "unit.gen": { en: "gen", fr: "gén" },
    "unit.engines": { en: "engines", fr: "moteurs" },
    "unit.engine": { en: "engine", fr: "moteur" },
    "unit.stages": { en: "stages", fr: "stages" },
    "lbl.soon": { en: "soon", fr: "bientôt" },

    // home / selector
    "home.eyebrow": { en: "ECU Tuning Catalogue", fr: "Catalogue de reprogrammation ECU" },
    "home.h1a": { en: "ECU Tuning", fr: "Catalogue de" },
    "home.h1b": { en: "Catalogue", fr: "Reprogrammation" },
    "home.sub": { en: "Pick your brand, model and year — we’ll show every available calibration with real power & torque gains and pricing. Can’t find your vehicle? We almost certainly tune it; just reach out.", fr: "Choisissez votre marque, modèle et année — on vous montre chaque calibration offerte avec les vrais gains de puissance et de couple, et les prix. Vous ne trouvez pas votre véhicule? On le reprogramme presque assurément; écrivez-nous." },
    "sel.eyebrow": { en: "Select your vehicle", fr: "Sélectionnez votre véhicule" },
    "sel.title": { en: "Find what we can unlock for your car", fr: "Découvrez ce qu’on peut débloquer pour votre voiture" },
    "sel.brand": { en: "Brand", fr: "Marque" },
    "sel.model": { en: "Model", fr: "Modèle" },
    "sel.year": { en: "Year", fr: "Année" },
    "sel.engine": { en: "Engine", fr: "Moteur" },
    "sel.pickBrand": { en: "Select a brand", fr: "Choisir une marque" },
    "sel.pickModel": { en: "Select a model", fr: "Choisir un modèle" },
    "sel.pickYear": { en: "Select a year", fr: "Choisir une année" },
    "sel.pickEngine": { en: "Select your engine", fr: "Choisir votre moteur" },
    "sel.brandFirst": { en: "Select a brand first", fr: "Choisissez d’abord une marque" },
    "sel.modelFirst": { en: "Select a model first", fr: "Choisissez d’abord un modèle" },
    "sel.tune": { en: "Tune my car", fr: "Reprogrammer ma voiture" },
    "sel.cantFind": { en: "Can’t find your vehicle?", fr: "Vous ne trouvez pas votre véhicule?" },
    "sel.searchFull": { en: "Search the full catalogue →", fr: "Rechercher dans le catalogue →" },

    // results / detail
    "res.back": { en: "Back to selector", fr: "Retour au sélecteur" },
    "res.horsepower": { en: "Horsepower", fr: "Puissance" },
    "res.torque": { en: "Torque", fr: "Couple" },
    "res.customTune": { en: "Custom ECU Tune", fr: "Reprogrammation ECU sur mesure" },
    "res.chassis": { en: "Chassis", fr: "Châssis" },
    "res.engine": { en: "Engine", fr: "Moteur" },
    "res.fuel": { en: "Fuel", fr: "Carburant" },
    "res.stock": { en: "Stock", fr: "Origine" },
    "res.priceOnDemand": { en: "Price on demand", fr: "Prix sur demande" },
    "res.quote": { en: "Contact us for a quote", fr: "Contactez-nous pour un devis" },
    "res.from": { en: "from", fr: "à partir de" },
    "res.onDemand": { en: "On demand", fr: "Sur demande" },
    "res.contactPricing": { en: "Contact for pricing", fr: "Prix sur demande" },
    "res.stage": { en: "Stage", fr: "Stage" },
    "res.factory": { en: "Factory", fr: "Origine" },
    "res.azTuned": { en: "AZ Tuned →", fr: "Reprogrammé AZ →" },
    "res.estGains": { en: "Estimated gains — Stage 1 ≈ +20% and Stage 2 ≈ +35% over stock (HP & torque). Rough figures for guidance only; every calibration is dyno-validated and final output varies by vehicle, fuel grade and supporting hardware.", fr: "Gains estimés — Stage 1 ≈ +20 % et Stage 2 ≈ +35 % par rapport à l’origine (puissance et couple). Chiffres approximatifs à titre indicatif; chaque calibration est validée au dyno et le résultat final varie selon le véhicule, l’octane et les modifications installées." },
    "res.options": { en: "[ Options & add-ons ]", fr: "[ Options et ajouts ]" },
    "res.tcuTitle": { en: "TCU / Gearbox Tune", fr: "Reprogrammation TCU / boîte" },
    "res.tcuBody": { en: "Faster shifts, raised torque limit & launch control for your DSG / PDK / ZF gearbox.", fr: "Passages plus rapides, limite de couple rehaussée et launch control pour votre boîte DSG / PDK / ZF." },
    "res.mmTitle": { en: "Multimap Switching", fr: "Multi-cartographies" },
    "res.mmBody": { en: "Valet, Sport, Race & Custom maps switchable on the fly from the steering wheel.", fr: "Cartographies Valet, Sport, Race et sur mesure, commutables à la volée depuis le volant." },
    "res.basicTitle": { en: "Basic Options", fr: "Options de base" },
    "res.basicBody": { en: "Rev-limiter delete · Pops, bangs & crackle · Cold-start delete · Top-speed delimiter · CEL off & more.", fr: "Retrait du limiteur de régime · Pops, bangs et crépitements · Suppression du démarrage à froid · Déblocage de la vitesse de pointe · Voyant moteur désactivé et plus." },
    "res.from$": { en: "From", fr: "À partir de" },
    "res.s4t": { en: "Maximum-effort builds via Stage 4 Tuning Canada.", fr: "Préparations sans compromis via Stage 4 Tuning Canada." },
    "res.contactArrow": { en: "Contact us →", fr: "Contactez-nous →" },
    "res.consult": { en: "Request a consultation", fr: "Demander une consultation" },
    "res.book": { en: "Book an appointment", fr: "Prendre rendez-vous" },
    "res.disclaimer": { en: "Each vehicle is treated individually; figures are given for information only and final results may vary. Each calibration is adapted to your vehicle to respect the equipment installed and the mechanical tolerances.", fr: "Chaque véhicule est traité individuellement; les chiffres sont fournis à titre indicatif et les résultats finaux peuvent varier. Chaque calibration est adaptée à votre véhicule pour respecter l’équipement installé et les tolérances mécaniques." },
    "res.resultsAfter": { en: "Results after reprogramming the engine of your", fr: "Résultats après la reprogrammation du moteur de votre" },

    // content stack
    "cs.processEyebrow": { en: "The process", fr: "Le processus" },
    "cs.processTitle": { en: "From your car to", fr: "De votre voiture à" },
    "cs.processAccent": { en: "dyno-validated power", fr: "la puissance validée au dyno" },
    "cs.mapEyebrow": { en: "On-the-fly map switching", fr: "Changement de cartographie à la volée" },
    "cs.mapTitle": { en: "Four maps.", fr: "Quatre cartographies." },
    "cs.mapAccent": { en: "One throttle.", fr: "Un seul accélérateur." },
    "cs.mapSub": { en: "Toggle calibrations from the driver’s seat to suit the moment — locked-down valet, daily Sport, full-send Race, or your own Custom spec.", fr: "Changez de calibration depuis le siège conducteur selon le moment — Valet bridé, Sport au quotidien, Race à fond, ou votre propre réglage sur mesure." },
    "cs.optEyebrow": { en: "Options & features", fr: "Options et fonctions" },
    "cs.optTitle": { en: "Everything we can", fr: "Tout ce qu’on peut" },
    "cs.optAccent": { en: "dial in", fr: "régler" },
    "cs.workEyebrow": { en: "See our work", fr: "Voir notre travail" },
    "cs.workTitle": { en: "Builds, dyno runs &", fr: "Préparations, passages au dyno et" },
    "cs.workAccent": { en: "results", fr: "résultats" },
    "cs.workSub": { en: "Real cars, real numbers — straight from the shop floor.", fr: "Vraies voitures, vrais chiffres — directement de l’atelier." },
    "cs.moreIg": { en: "More on Instagram", fr: "Plus sur Instagram" },
    "cs.faqEyebrow": { en: "FAQ", fr: "FAQ" },
    "cs.faqTitle": { en: "Questions, answered", fr: "Questions, réponses" },
    "cs.ctaTitle": { en: "Ready to unlock your", fr: "Prêt à débloquer vos" },
    "cs.ctaAccent": { en: " real numbers?", fr: " vrais chiffres?" },
    "cs.ctaSub": { en: "Built by enthusiasts, for enthusiasts. Let’s calibrate your car — in Brossard or remotely, anywhere in the world.", fr: "Conçu par des passionnés, pour des passionnés. Calibrons votre voiture — à Brossard ou à distance, partout dans le monde." },
    "cs.contactUs": { en: "Contact us", fr: "Contactez-nous" },
    "cs.visitStore": { en: "Visit the store", fr: "Visiter la boutique" },

    // tuning page
    "tun.eyebrow": { en: "Tuning", fr: "Tuning" },
    "tun.title": { en: "Platform-specific,", fr: "Spécifique à la plateforme," },
    "tun.accent": { en: "fully reversible.", fr: "entièrement réversible." },
    "tun.sub": { en: "Dyno-validated ECU calibrations for Euro & exotic platforms. Built by enthusiasts, for enthusiasts — here’s exactly how it works.", fr: "Calibrations ECU validées au dyno pour les plateformes européennes et exotiques. Conçues par des passionnés, pour des passionnés — voici exactement comment ça fonctionne." },
    "tun.browse": { en: "Browse the catalogue", fr: "Parcourir le catalogue" },
    "tun.engineer": { en: "Talk to an engineer", fr: "Parler à un technicien" },

    // dyno page
    "dyno.eyebrow": { en: "Dyno", fr: "Dyno" },
    "dyno.title": { en: "Real numbers,", fr: "De vrais chiffres," },
    "dyno.accent": { en: "measured.", fr: "mesurés." },
    "dyno.makeAppt": { en: "Make an appointment", fr: "Prendre rendez-vous" },
    "dyno.ask": { en: "Ask a question", fr: "Poser une question" },
    "dyno.whyEyebrow": { en: "Why our dyno", fr: "Pourquoi notre dyno" },
    "dyno.whyTitle": { en: "Dyno-validated,", fr: "Validé au dyno," },
    "dyno.whyAccent": { en: "not guessed", fr: "pas estimé" },
    "dyno.rollersEyebrow": { en: "On the rollers", fr: "Sur les rouleaux" },
    "dyno.rollersTitle": { en: "Dyno runs &", fr: "Passages au dyno et" },
    "dyno.rollersAccent": { en: "results", fr: "résultats" },
    "dyno.rollersSub": { en: "Real cars on our dyno — straight from the shop floor.", fr: "De vraies voitures sur notre dyno — directement de l’atelier." },
    "dyno.interested": { en: "Interested in our service?", fr: "Intéressé par notre service?" },
    "dyno.bookA": { en: "Book your", fr: "Réservez votre" },
    "dyno.bookB": { en: "dyno session", fr: "séance de dyno" },
    "dyno.bookSub": { en: "Power runs, data logging and tuning — all in-house at our Brossard shop.", fr: "Passages de puissance, acquisition de données et reprogrammation — le tout sur place à notre atelier de Brossard." },

    // dealers page
    "deal.eyebrow": { en: "Dealers", fr: "Revendeurs" },
    "deal.title": { en: "Performance shops in", fr: "Ateliers performance au" },
    "deal.accent": { en: "Québec & Ontario", fr: "Québec et en Ontario" },
    "deal.partners": { en: "Authorized partners", fr: "Partenaires autorisés" },
    "deal.locations": { en: "locations", fr: "emplacements" },
    "deal.soon": { en: "Soon", fr: "Bientôt" },
    "deal.opening": { en: "New location opening — stay tuned.", fr: "Nouvel emplacement à venir — restez à l’affût." },
    "deal.maps": { en: "Open in Maps", fr: "Ouvrir dans Maps" },
    "deal.becomeTitle": { en: "Want to become a dealer?", fr: "Devenir revendeur?" },
    "deal.becomeBody": { en: "Run a performance shop and want to offer AZ Motorsport calibrations? Let’s talk.", fr: "Vous gérez un atelier performance et souhaitez offrir les calibrations AZ Motorsport? Parlons-en." },
    "deal.getInTouch": { en: "Get in touch", fr: "Nous contacter" },

    // contact page
    "con.eyebrow": { en: "Contact", fr: "Contact" },
    "con.titleA": { en: "Book your", fr: "Réservez votre" },
    "con.titleB": { en: "appointment", fr: "rendez-vous" },
    "con.sub": { en: "Tell us about your car and your goals. We’ll confirm the right calibration, pricing and a slot — in-person at Brossard or a remote session anywhere in the world.", fr: "Parlez-nous de votre voiture et de vos objectifs. On confirmera la bonne calibration, le prix et une plage horaire — en personne à Brossard ou à distance, partout dans le monde." },
    "con.name": { en: "Name", fr: "Nom" },
    "con.email": { en: "Email", fr: "Courriel" },
    "con.phone": { en: "Phone", fr: "Téléphone" },
    "con.vehicle": { en: "Vehicle", fr: "Véhicule" },
    "con.message": { en: "Message / stage of interest", fr: "Message / stage souhaité" },
    "con.req": { en: "Required", fr: "Requis" },
    "con.emailReq": { en: "Valid email required", fr: "Courriel valide requis" },
    "con.msgReq": { en: "Tell us a little about your goals", fr: "Parlez-nous un peu de vos objectifs" },
    "con.send": { en: "Send enquiry", fr: "Envoyer la demande" },
    "con.sending": { en: "Sending…", fr: "Envoi…" },
    "con.orCall": { en: "or call", fr: "ou appelez le" },
    "con.sent": { en: "Message sent", fr: "Message envoyé" },
    "con.ready": { en: "Message ready to send", fr: "Message prêt à envoyer" },
    "con.thanksSent": { en: "we’ve got your enquiry and we’ll get back to you within one business day.", fr: "on a bien reçu votre demande et on vous répond d’ici un jour ouvrable." },
    "con.thanksReady": { en: "Confirm via your preferred channel below and we’ll get back within one business day.", fr: "Confirmez par le canal de votre choix ci-dessous et on vous répond d’ici un jour ouvrable." },
    "con.prefer": { en: "Prefer to talk now?", fr: "Préférez-vous discuter maintenant?" },
    "con.emailUs": { en: "Email us", fr: "Écrivez-nous" },
    "con.emailBtn": { en: "Email", fr: "Courriel" },
    "con.theShop": { en: "The shop", fr: "L’atelier" },
    "con.thanks": { en: "Thanks", fr: "Merci" },

    // footer
    "ft.tagline": { en: "Euro & exotic custom ECU tuning — built by enthusiasts, for enthusiasts. In-person in Brossard, Québec, or remote worldwide.", fr: "Reprogrammation ECU sur mesure pour véhicules européens et exotiques — conçue par des passionnés, pour des passionnés. En personne à Brossard, Québec, ou à distance partout dans le monde." },
    "ft.explore": { en: "Explore", fr: "Explorer" },
    "ft.mainStore": { en: "Main store ↗", fr: "Boutique principale ↗" },
    "ft.visit": { en: "Visit", fr: "Nous visiter" },
    "ft.rights": { en: "AZ Motorsport. Calibrations intended for off-road / motorsport use.", fr: "AZ Motorsport. Calibrations destinées à un usage hors route / compétition." },
    "ft.figures": { en: "Figures are estimates — every calibration is dyno-validated per vehicle.", fr: "Les chiffres sont des estimations — chaque calibration est validée au dyno, véhicule par véhicule." },

    // engine list (selector flow screens — mostly unused, kept for completeness)
    "stage.unitBHP": { en: "BHP stock", fr: "ch d’origine" },

    // Stage-2 supporting-hardware panel → store
    "hw.requires": { en: "requires", fr: "nécessite" },
    "hw.exactPre": { en: "Shop the exact part matched to your ", fr: "Achetez la pièce exacte adaptée à votre " },
    "hw.findPre": { en: "Find the right part for your ", fr: "Trouvez la bonne pièce pour votre " },
    "hw.storeSuffix": { en: "on the AZ Motorsport store.", fr: "sur la boutique AZ Motorsport." },
    "hw.viewPart": { en: "View part", fr: "Voir la pièce" },
    "hw.shop": { en: "Shop", fr: "Magasiner" },
    "downpipes": { en: "downpipes", fr: "des downpipes" },
    "a downpipe": { en: "a downpipe", fr: "un downpipe" },
    "headers": { en: "headers", fr: "des collecteurs" },
    "a pulley & exhaust": { en: "a pulley & exhaust", fr: "une poulie et un échappement" },
    "sport cats": { en: "sport cats", fr: "des catalyseurs sport" },
    "a sport exhaust": { en: "a sport exhaust", fr: "un échappement sport" },

    // ── data-derived strings (looked up by their English value) ──
    "Petrol": { en: "Petrol", fr: "Essence" },
    "Diesel": { en: "Diesel", fr: "Diesel" },
    "No mods required": { en: "No mods required", fr: "Aucune modification requise" },
    "Downpipe required": { en: "Downpipe required", fr: "Downpipe requis" },
    "Downpipe + intake required": { en: "Downpipe + intake required", fr: "Downpipe + admission requis" },
    "Downpipes required": { en: "Downpipes required", fr: "Downpipes requis" },
    "Downpipes / sport cats required": { en: "Downpipes / sport cats required", fr: "Downpipes / catalyseurs sport requis" },
    "Pulley / exhaust required": { en: "Pulley / exhaust required", fr: "Poulie / échappement requis" },
    "Sport cats / exhaust required": { en: "Sport cats / exhaust required", fr: "Catalyseurs sport / échappement requis" },
    "Headers / exhaust required": { en: "Headers / exhaust required", fr: "Collecteurs / échappement requis" },
    "Race exhaust required": { en: "Race exhaust required", fr: "Échappement course requis" },
    "Downpipe / DPF-back required": { en: "Downpipe / DPF-back required", fr: "Downpipe / ligne DPF-back requise" },
    "Hybrid / built engine — by consultation": { en: "Hybrid / built engine — by consultation", fr: "Hybride / moteur préparé — sur consultation" },
  };

  function t(key) {
    const e = UI[key];
    if (!e) return key;                       // unknown → return as-is (English passthrough)
    return e[AZ_LANG] != null ? e[AZ_LANG] : e.en;
  }

  /* ── French SITE_CONTENT (inherits non-translatable fields from English) ── */
  function buildFR() {
    const EN = window.SITE_CONTENT || {};
    return Object.assign({}, EN, {
      credibility: [
        { k: "15+", v: "Marques euro & exotiques" },
        { k: "400+", v: "Plateformes calibrées" },
        { k: "100%", v: "Validé au dyno" },
        { k: "2013+", v: "Couverture depuis 2013" },
      ],
      whatIsTune: {
        title: "Qu’est-ce qu’une reprogrammation ECU?",
        body: "L’ECU est le cerveau électronique de votre voiture — il gère la suralimentation, le carburant, l’avance à l’allumage et l’accélérateur. On réécrit cette calibration de façon spécifique à la plateforme pour libérer plus de puissance, une réponse plus vive et une meilleure conduite, le tout dans les tolérances mécaniques de votre moteur.",
      },
      reversible: {
        title: "Votre fichier d’origine est toujours conservé.",
        body: "Avant de toucher à quoi que ce soit, on lit et archive votre calibration d’usine. Chaque reprogrammation AZ est entièrement réversible — un retour à l’origine est possible en tout temps pour l’entretien, la garantie ou la revente, sans aucune trace.",
      },
      process: [
        { n: "01", t: "Dites-nous votre véhicule", d: "Année, moteur et toute pièce installée. On confirme la bonne calibration." },
        { n: "02", t: "En personne ou à distance", d: "Passez à l’atelier de Brossard — ou reprogrammez de partout : on envoie les outils et on vous guide pour un flash OBD en appel vidéo." },
        { n: "03", t: "On calibre & on valide", d: "Cartographie sur mesure adaptée à votre voiture, puis validée au dyno pour une puissance sûre et répétable." },
        { n: "04", t: "Profitez", d: "Repartez avec les gains. Changement de carte à la volée offert là où c’est pris en charge." },
      ],
      maps: [
        { name: "Valet", note: "Puissance limitée, bridée." },
        { name: "Sport", note: "Gains au quotidien, pleine conduite." },
        { name: "Race", note: "Rendement maximal, prêt pour la piste." },
        { name: "Sur mesure", note: "Votre réglage, votre carburant." },
      ],
      features: [
        { n: "01", t: "Pops, bangs & crépitements" },
        { n: "02", t: "Plusieurs cartes commutables" },
        { n: "03", t: "Ajustement octane / E85" },
        { n: "04", t: "Déblocage de la vitesse de pointe" },
        { n: "05", t: "Calibration entièrement sur mesure" },
        { n: "06", t: "Suppression du voyant / codes défaut" },
        { n: "07", t: "Suppression du démarrage à froid" },
        { n: "08", t: "Surveillance des données en temps réel" },
      ],
      faq: [
        { q: "La reprogrammation annule-t-elle ma garantie?", a: "Une reprogrammation peut affecter la garantie du groupe motopropulseur. Comme votre fichier d’origine est archivé, on peut remettre la voiture à l’usine en tout temps. On vous explique toujours les compromis propres à votre véhicule." },
        { q: "Quel carburant / octane me faut-il?", a: "La plupart des calibrations sont conçues pour du super 91/93. Les cartes à plus haut rendement peuvent exiger du 100 octane ou de l’E85 — on précise exactement ce que votre carte attend." },
        { q: "Est-ce sécuritaire au quotidien?", a: "Oui. Les cartes Stage 1 et Stage 2 sont conçues dans les tolérances mécaniques d’usine et validées au dyno pour une puissance fiable et répétable sur la route." },
        { q: "Stage 1 vs Stage 2 — quelle différence?", a: "Le Stage 1 ne nécessite aucune pièce. Le Stage 2 suppose des modifications de support (downpipes, admission ou échappement) pour plus de débit d’air et de plus gros gains." },
        { q: "Dois-je me rendre à Brossard?", a: "Non. La plupart des calibrations se font à distance — on vous envoie les outils et on vous guide pour un flash OBD en appel vidéo, partout dans le monde. La reprogrammation en personne, OBD et sur banc est aussi offerte à l’atelier de Brossard." },
        { q: "Pouvez-vous reprogrammer ma voiture si elle n’est pas listée?", a: "Presque assurément. Le catalogue est un point de départ — contactez-nous avec votre véhicule exact et on confirmera la disponibilité." },
      ],
      work: { videos: EN.work ? EN.work.videos : 3, stats: [
        { k: "2 500+", v: "Véhicules reprogrammés" },
        { k: "15+", v: "Marques prises en charge" },
        { k: "Mondial", v: "Reprogrammation à distance & en personne" },
      ]},
      shop: Object.assign({}, EN.shop, { hours: "Mar–Sam · 10 h – 18 h (HNE)" }),
      dyno: {
        intro: "Le dyno permet de mesurer la vraie puissance de votre véhicule. On lit la puissance et le couple (HP & Nm) à moins de 0,2 % de marge d’erreur. Que votre voiture soit propulsion, traction ou intégrale, notre dyno à frein lié encaisse jusqu’à 1700 hp pour une mesure exacte et répétable.",
        stats: [
          { k: "1700 HP", v: "Capacité à frein lié" },
          { k: "< 0,2 %", v: "Marge d’erreur" },
          { k: "PROP·TRAC·INT", v: "Toutes les transmissions" },
          { k: "HP & Nm", v: "Mesurés & enregistrés" },
        ],
        features: [
          { t: "Passages de puissance précis", d: "Chiffres de puissance et de couple précis à moins de 0,2 % de marge — les vrais chiffres, pas des estimations." },
          { t: "Toute transmission", d: "Les véhicules propulsion, traction et intégrale s’installent tous sur notre dyno à frein lié, calibré à 1700 hp." },
          { t: "Acquisition de données en direct", d: "Mélange air/carburant, suralimentation, avance et plus, captés en temps réel pour valider chaque calibration en toute sécurité." },
          { t: "Avant & après", d: "Passages d’origine et reprogrammés dos à dos, pour voir exactement ce que votre calibration a débloqué." },
        ],
      },
      dealers: Object.assign({}, EN.dealers, {
        intro: "On travaille étroitement avec les meilleurs garages partenaires au Québec et en Ontario, pour que nos clients partout reçoivent un service de premier ordre et le meilleur de leur véhicule.",
      }),
    });
  }

  let _fr = null;
  function content() {
    if (AZ_LANG !== "fr") return window.SITE_CONTENT;
    if (!_fr) _fr = buildFR();
    return _fr;
  }

  Object.assign(window, { getLang, setLang, t, content, AZ_UI: UI });
})();
