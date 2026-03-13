(function () {
  "use strict";

  const CONTROL_DEFS = {
    vadNameGroup: {
      hash: "000004cd",
      type: "radio",
      label: "Bitte NameVAD auswählen",
    },
    vadEmailGroup: {
      hash: "000004d1",
      type: "radio",
      label: "Const E-MAIL VAD",
    },
    vadPhoneGroup: {
      hash: "000004d3",
      type: "radio",
      label: "Const Phone VAD",
    },
    vadNameTarget: {
      hash: "000002ed",
      type: "text",
      label: "Name VAD für Kundenkontakt",
    },
    vadEmailTarget: {
      hash: "000002ef",
      type: "email",
      label: "E-Mail VAD für Kundenkontakt",
    },
    vadPhoneTarget: {
      hash: "00000344",
      type: "text",
      label: "Telefon VAD für Kundenkontakt",
    },
    countedAdminRaw: {
      hash: "00000207",
      type: "formula",
      label: "Anrechenbare Mitarbeitende mit administrativen Tätigkeiten",
    },
    countedAdminRounded: {
      hash: "00000483",
      type: "number",
      label: "Counted Admin Staff gerundet",
    },
    countedMarginalRaw: {
      hash: "0000020a",
      type: "formula",
      label: "Anrechenbare geringfügig Beschäftigte",
    },
    countedMarginalRounded: {
      hash: "0000046e",
      type: "number",
      label: "Counted Marginal Part Time Staff gerundet",
    },
    countedPartTimeRaw: {
      hash: "0000020d",
      type: "formula",
      label: "Anrechenbare Teilzeitbeschäftigte",
    },
    countedPartTimeRounded: {
      hash: "00000471",
      type: "number",
      label: "Counted Part Time Staff gerundet",
    },
    countedLeasedStaffRaw: {
      hash: "00000210",
      type: "formula",
      label: "Anrechenbare Leiharbeitskräfte",
    },
    countedLeasedStaffRounded: {
      hash: "00000474",
      type: "number",
      label: "Counted Seasonal Staff gerundet",
    },
    countedShiftWorkersRaw: {
      hash: "00000242",
      type: "formula",
      label: "Anrechenbare Schichten",
    },
    countedShiftWorkersRounded: {
      hash: "00000477",
      type: "number",
      label: "Counted Shift Workers gerundet",
    },
    effectiveEmployees: {
      hash: "0000023a",
      type: "formula",
      label: "Effektive Anzahl der Mitarbeiter",
    },
    auditHoursYear1Transferred: {
      hash: "0000046a",
      type: "text",
      label: "3. Übertrag Gesamtauditzeit Jahr 1 [h]",
    },
    auditHoursYear1Rounded: {
      hash: "00000452",
      type: "number",
      label: "Gesamtauditzeit Jahr 1 [h] gerundet",
    },
    auditHoursZaYear23: {
      hash: "00000391",
      type: "formula",
      label: "Gesamtauditzeit ÜA (bei Auswahl ZA) Jahr 2/3 [h]",
    },
    auditHoursZaYear23Rounded: {
      hash: "0000048d",
      type: "number",
      label: "Gesamtauditzeit ÜA (bei Auswahl ZA) Jahr 2/3 [h] gerundet",
    },
    auditHoursWaYear23: {
      hash: "000003d8",
      type: "formula",
      label: "Gesamtauditzeit ÜA (bei Auswahl WA) Jahr 2/3 [h]",
    },
    auditHoursWaYear23Rounded: {
      hash: "000004a0",
      type: "number",
      label: "Gesamtauditzeit ÜA (bei Auswahl WA) Jahr 2/3 [h] gerundet",
    },
    auditPtYear1: {
      hash: "00000384",
      type: "formula",
      label: "Gesamtauditzeit Jahr 1 [PT]",
    },
    auditPtZaYear23: {
      hash: "0000038e",
      type: "formula",
      label: "Gesamtauditzeit ÜA (bei Auswahl ZA) Jahr 2/3 [PT]",
    },
    auditPtWaYear23: {
      hash: "000003dc",
      type: "formula",
      label: "Gesamtauditzeit ÜA (bei Auswahl WA) Jahr 2/3 [PT]",
    },
    priceYear1Za: {
      hash: "000003c6",
      type: "formula",
      label: "Preis Jahr 1 [€]",
    },
    priceYear2Za: {
      hash: "000003c8",
      type: "formula",
      label: "Preis Jahr 2 [€]",
    },
    priceYear3Za: {
      hash: "000003ca",
      type: "formula",
      label: "Preis Jahr 3 [€]",
    },
    priceYear2Wa: {
      hash: "000003e0",
      type: "formula",
      label: "Preis Jahr 2 [€]",
    },
    priceYear3Wa: {
      hash: "000003e2",
      type: "formula",
      label: "Preis Jahr 3 [€]",
    },
  };

  const ROUNDING_RULES = [
    {
      source: "countedAdminRaw",
      target: "countedAdminRounded",
      rounder: roundToFullNumber,
    },
    {
      source: "countedMarginalRaw",
      target: "countedMarginalRounded",
      rounder: roundToFullNumber,
    },
    {
      source: "countedPartTimeRaw",
      target: "countedPartTimeRounded",
      rounder: roundToFullNumber,
    },
    {
      source: "countedLeasedStaffRaw",
      target: "countedLeasedStaffRounded",
      rounder: roundToFullNumber,
    },
    {
      source: "countedShiftWorkersRaw",
      target: "countedShiftWorkersRounded",
      rounder: roundToFullNumber,
    },
    {
      source: "effectiveEmployees",
      target: "effectiveEmployees",
      rounder: roundToFullNumberEffectiveMA,
    },
    {
      source: "auditHoursYear1Transferred",
      target: "auditHoursYear1Rounded",
      rounder: roundToNearestQuarter,
    },
    {
      source: "auditHoursZaYear23",
      target: "auditHoursZaYear23",
      rounder: roundToNearestQuarter,
    },
    {
      source: "auditHoursWaYear23",
      target: "auditHoursWaYear23",
      rounder: roundToNearestQuarter,
    },
    {
      source: "auditHoursZaYear23",
      target: "auditHoursZaYear23Rounded",
      rounder: roundToNearestQuarter,
    },
    {
      source: "auditHoursWaYear23",
      target: "auditHoursWaYear23Rounded",
      rounder: roundToNearestQuarter,
    },
    {
      source: "auditPtYear1",
      target: "auditPtYear1",
      rounder: roundToThreeDecimals,
    },
    {
      source: "auditPtZaYear23",
      target: "auditPtZaYear23",
      rounder: roundToThreeDecimals,
    },
    {
      source: "auditPtWaYear23",
      target: "auditPtWaYear23",
      rounder: roundToThreeDecimals,
    },
    {
      source: "priceYear1Za",
      target: "priceYear1Za",
      rounder: roundToTwoDecimals,
    },
    {
      source: "priceYear2Za",
      target: "priceYear2Za",
      rounder: roundToTwoDecimals,
    },
    {
      source: "priceYear2Wa",
      target: "priceYear2Wa",
      rounder: roundToTwoDecimals,
    },
    {
      source: "priceYear3Za",
      target: "priceYear3Za",
      rounder: roundToTwoDecimals,
    },
    {
      source: "priceYear3Wa",
      target: "priceYear3Wa",
      rounder: roundToTwoDecimals,
    },
  ];

  const RESOLUTION_CACHE = new Map();
  const WARNED_KEYS = new Set();
  const SERIALIZED_FORM_CACHE = { text: null };
  const ROUNDING_BURST_DELAYS = [0, 40, 120, 260];
  const INIT_MAX_ATTEMPTS = 120;
  const INIT_RETRY_DELAY_MS = 250;

  let eventListenersBound = false;
  let latestRoundingBurstToken = 0;

  function roundToFullNumber(number) {
    return number > 0 ? Math.ceil(number) : Math.floor(number);
  }

  function roundToFullNumberEffectiveMA(number) {
    return number > 0 ? Math.ceil(number) : 1;
  }

  function roundToNearestQuarter(number) {
    let result = Math.ceil(number * 4) / 4;
    if (result < 4) {
      result = 4;
    }
    return result;
  }

  function roundToTwoDecimals(number) {
    return Math.round(number * 100) / 100;
  }

  function roundToThreeDecimals(number) {
    return Math.round(number * 1000) / 1000;
  }

  function normalizeText(value) {
    return String(value || "")
      .replace(/%MI%/g, "-")
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .replace(/[‐‑‒–—]/g, "-")
      .trim()
      .toLowerCase();
  }

  function warnOnce(key, message) {
    if (WARNED_KEYS.has(key)) {
      return;
    }
    WARNED_KEYS.add(key);
    console.warn(message);
  }

  function getEngineDocument() {
    if (!window.loader || !window.loader.engine) {
      return null;
    }
    return window.loader.engine.getDocument
      ? window.loader.engine.getDocument()
      : window.loader.engine.document || null;
  }

  function getSerializedFormScriptText() {
    if (SERIALIZED_FORM_CACHE.text !== null) {
      return SERIALIZED_FORM_CACHE.text;
    }

    const scripts = Array.from(document.scripts);
    const script = scripts.find((candidate) =>
      candidate.textContent.includes("withInitialSerializedForm("),
    );

    SERIALIZED_FORM_CACHE.text = script ? script.textContent : "";
    return SERIALIZED_FORM_CACHE.text;
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function resolveIdFromSerializedForm(hash) {
    const scriptText = getSerializedFormScriptText();
    if (!scriptText) {
      return null;
    }

    const pattern = new RegExp(
      `\\[(?:\\d+|null)\\s*,\\s*(\\d+)\\s*,\\s*"${escapeRegExp(hash)}"\\b`,
    );
    const match = scriptText.match(pattern);
    if (!match) {
      return null;
    }

    const id = Number.parseInt(match[1], 10);
    return Number.isFinite(id) ? id : null;
  }

  function getControlElementByHash(hash) {
    return document.querySelector(`[data-role="control"][data-hash="${hash}"]`);
  }

  function getControlLabelText(controlEl) {
    const labelEl = controlEl?.querySelector('[data-role="label"]');
    return labelEl ? normalizeText(labelEl.textContent) : "";
  }

  function findControlElementByLabel(def) {
    const expectedLabel = normalizeText(def.label);
    const controls = Array.from(document.querySelectorAll('[data-role="control"]'));

    return (
      controls.find((controlEl) => {
        const controlType = controlEl.getAttribute("data-type");
        if (def.type && controlType !== def.type) {
          return false;
        }
        return getControlLabelText(controlEl) === expectedLabel;
      }) || null
    );
  }

  function resolveControlId(defKey) {
    if (RESOLUTION_CACHE.has(defKey)) {
      return RESOLUTION_CACHE.get(defKey);
    }

    const def = CONTROL_DEFS[defKey];
    if (!def) {
      warnOnce(
        `missing-definition:${defKey}`,
        `[main.js] Unbekannte Felddefinition "${defKey}".`,
      );
      return null;
    }

    let resolvedId = null;

    const controlElByHash = getControlElementByHash(def.hash);
    if (controlElByHash) {
      const domId = Number.parseInt(controlElByHash.getAttribute("data-id"), 10);
      if (Number.isFinite(domId)) {
        resolvedId = domId;
      }
    }

    if (!Number.isFinite(resolvedId)) {
      resolvedId = resolveIdFromSerializedForm(def.hash);
    }

    if (!Number.isFinite(resolvedId)) {
      const controlElByLabel = findControlElementByLabel(def);
      if (controlElByLabel) {
        const domId = Number.parseInt(controlElByLabel.getAttribute("data-id"), 10);
        if (Number.isFinite(domId)) {
          resolvedId = domId;
        }
      }
    }

    if (!Number.isFinite(resolvedId)) {
      warnOnce(
        `resolve:${defKey}`,
        `[main.js] Feld konnte nicht aufgeloest werden: ${defKey} (${def.hash} / ${def.label})`,
      );
      return null;
    }

    RESOLUTION_CACHE.set(defKey, resolvedId);
    return resolvedId;
  }

  function getControlElement(defKey) {
    const def = CONTROL_DEFS[defKey];
    if (!def) {
      return null;
    }

    const byHash = getControlElementByHash(def.hash);
    if (byHash) {
      return byHash;
    }

    const resolvedId = resolveControlId(defKey);
    if (!Number.isFinite(resolvedId)) {
      return findControlElementByLabel(def);
    }

    return (
      document.querySelector(`[data-role="control"][data-id="${resolvedId}"]`) ||
      findControlElementByLabel(def)
    );
  }

  function getEngineField(defKey) {
    const engineDocument = getEngineDocument();
    if (!engineDocument) {
      warnOnce("engine-document", "[main.js] loader.engine.document ist noch nicht verfuegbar.");
      return null;
    }

    const resolvedId = resolveControlId(defKey);
    if (!Number.isFinite(resolvedId)) {
      return null;
    }

    const field = engineDocument.getElementById(resolvedId);
    if (!field) {
      warnOnce(
        `engine-field:${defKey}`,
        `[main.js] Engine-Feld konnte nicht geladen werden: ${defKey} (${resolvedId})`,
      );
    }

    return field || null;
  }

  function parseNumericValue(value) {
    if (typeof value === "number") {
      return Number.isFinite(value) ? value : null;
    }

    if (typeof value !== "string") {
      return null;
    }

    const normalized = value.replace(/\s+/g, "").replace(",", ".");
    if (!normalized) {
      return null;
    }

    const parsed = Number.parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function readFieldNumber(defKey) {
    const field = getEngineField(defKey);
    if (!field) {
      return null;
    }

    const rawValue = field.getProperty("value.value");
    return parseNumericValue(rawValue);
  }

  function writeFieldValue(defKey, value) {
    const field = getEngineField(defKey);
    if (!field) {
      return false;
    }

    field.setValue({ value });
    return true;
  }

  function roundResult() {
    ROUNDING_RULES.forEach((rule) => {
      const sourceValue = readFieldNumber(rule.source);
      if (sourceValue === null) {
        return;
      }

      const roundedValue = rule.rounder(sourceValue);
      writeFieldValue(rule.target, roundedValue);
    });
  }

  function scheduleRoundingBurst() {
    latestRoundingBurstToken += 1;
    const currentToken = latestRoundingBurstToken;

    ROUNDING_BURST_DELAYS.forEach((delay) => {
      window.setTimeout(() => {
        if (currentToken !== latestRoundingBurstToken) {
          return;
        }
        roundResult();
      }, delay);
    });
  }

  function getRadioInputs(defKey) {
    const controlEl = getControlElement(defKey);
    if (!controlEl) {
      return [];
    }

    return Array.from(
      controlEl.querySelectorAll('input[data-role="i123-input"][type="radio"]'),
    );
  }

  function syncVadSelectionByIndex(index) {
    const normalizedIndex = String(index);
    const nameInputs = getRadioInputs("vadNameGroup");
    const emailInputs = getRadioInputs("vadEmailGroup");
    const phoneInputs = getRadioInputs("vadPhoneGroup");

    const selectedName = nameInputs.find(
      (input) => String(input.dataset.index) === normalizedIndex,
    );

    if (!selectedName) {
      return;
    }

    const selectedEmail = emailInputs.find(
      (input) => String(input.dataset.index) === normalizedIndex,
    );
    const selectedPhone = phoneInputs.find(
      (input) => String(input.dataset.index) === normalizedIndex,
    );

    selectedName.checked = true;
    writeFieldValue("vadNameTarget", selectedName.value);

    if (selectedEmail) {
      selectedEmail.checked = true;
      writeFieldValue("vadEmailTarget", selectedEmail.value);
    }

    if (selectedPhone) {
      selectedPhone.checked = true;
      writeFieldValue("vadPhoneTarget", selectedPhone.value);
    }
  }

  function syncVadSelectionFromCurrentState() {
    const selectedName = getRadioInputs("vadNameGroup").find((input) => input.checked);
    if (!selectedName) {
      return;
    }

    syncVadSelectionByIndex(selectedName.dataset.index);
  }

  function isVadNameInput(target) {
    if (!(target instanceof Element)) {
      return false;
    }

    if (!target.matches('input[data-role="i123-input"][type="radio"]')) {
      return false;
    }

    const controlEl = target.closest('[data-role="control"]');
    return controlEl?.getAttribute("data-hash") === CONTROL_DEFS.vadNameGroup.hash;
  }

  function onDocumentChange(event) {
    if (isVadNameInput(event.target)) {
      syncVadSelectionByIndex(event.target.dataset.index);
    }

    scheduleRoundingBurst();
  }

  function onDocumentClick() {
    scheduleRoundingBurst();
  }

  function createConfirmationOverlay(text, onYes, onNo) {
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "10000",
      pointerEvents: "auto",
      fontFamily: "Arial",
      color: "black",
    });

    const box = document.createElement("div");
    Object.assign(box.style, {
      position: "fixed",
      top: "100px",
      backgroundColor: "#fff",
      padding: "2em",
      borderRadius: "0",
      boxShadow: "0 6px 14px rgba(0, 0, 0, 0.45)",
      maxWidth: "90%",
      textAlign: "center",
      boxSizing: "border-box",
      fontFamily: "inherit",
    });

    const heading = document.createElement("h3");
    heading.textContent = "Bitte beantworten Sie die folgende kurze Frage:";
    Object.assign(heading.style, {
      color: "#0046AD",
      fontSize: "1.0rem",
      margin: "0 0 0.75em 0",
      fontFamily: "inherit",
    });
    box.appendChild(heading);

    const message = document.createElement("p");
    message.innerHTML = text;
    message.style.marginBottom = "1em";

    const btnYes = document.createElement("button");
    btnYes.textContent = "Ja, weiter zum Angebotskonfigurator";
    Object.assign(btnYes.style, {
      marginRight: "2.0em",
      marginTop: "0.2em",
      backgroundColor: "#0046AD",
      color: "#fff",
      border: "none",
      padding: "0.5em 1em",
      cursor: "pointer",
      fontSize: "1.0rem",
    });
    btnYes.addEventListener("click", () => {
      document.body.removeChild(overlay);
      onYes();
    });

    const btnNo = document.createElement("button");
    btnNo.textContent = "Nein, weiter zum Angebotsformular";
    Object.assign(btnNo.style, {
      marginRight: "2.0em",
      marginTop: "0.2em",
      backgroundColor: "#0046AD",
      color: "#fff",
      border: "none",
      padding: "0.5em 1em",
      cursor: "pointer",
      fontSize: "1.0rem",
    });
    btnNo.addEventListener("click", () => {
      document.body.removeChild(overlay);
      onNo();
    });

    box.appendChild(message);
    box.appendChild(btnYes);
    box.appendChild(btnNo);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  function drawLightbox() {
    createConfirmationOverlay(
      [
        '<p style="text-align:left; margin:0;">Hat Ihr Unternehmen <b>weniger als 46 Mitarbeitende,</b> nur <b>einen Standort</b> und ist in einer der folgenden <b>Branchen</b> taetig?</p>',
        '<ul style="text-align:left; margin:0.5em 0 1em 1.2em; padding:0;">',
        "<li>Herstellung von Gummi- und Kunststoffwaren</li>",
        "<li>Herstellung von Metallerzeugnissen</li>",
        "<li>Metallbearbeitung</li>",
        "<li>Maschinenbau, Anlagenbau</li>",
        "<li>Elektrotechnik, Feinmechanik, Optik</li>",
        "<li>Herstellung von Bueromaschinen, Datenverarbeitungsgeraeten und -einrichtungen</li>",
        "<li>Gross- und Einzelhandel</li>",
        "<li>Verkehr, Transport, Logistik</li>",
        "<li>Datenverarbeitung, Informationstechnik</li>",
        "</ul>",
      ].join(""),
      function () {},
      function () {
        window.top.location.href =
          "https://www.tuvsud.com/de-de/dienstleistungen/auditierung-und-zertifizierung/iso-9001/angebotsformular";
      },
    );
  }

  function bindEventListeners() {
    if (eventListenersBound) {
      return;
    }

    document.addEventListener("change", onDocumentChange, true);
    document.addEventListener("click", onDocumentClick, true);
    eventListenersBound = true;
  }

  function initBehavior() {
    bindEventListeners();
    syncVadSelectionFromCurrentState();
    scheduleRoundingBurst();
  }

  function hasRequiredRuntimeDependencies() {
    return Boolean(document.querySelector('[data-role="control"]') && getEngineDocument());
  }

  function waitForRuntimeDependencies(attempt) {
    if (hasRequiredRuntimeDependencies()) {
      initBehavior();
      return;
    }

    if (attempt >= INIT_MAX_ATTEMPTS) {
      warnOnce(
        "init-timeout",
        "[main.js] Initialisierung abgebrochen, weil Formular oder loader.engine nicht rechtzeitig verfuegbar waren.",
      );
      return;
    }

    window.setTimeout(() => {
      waitForRuntimeDependencies(attempt + 1);
    }, INIT_RETRY_DELAY_MS);
  }

  window.addEventListener("load", () => {
    const paramsURL = new URLSearchParams(window.location.search);
    const hasSubmissionId = paramsURL.has("submissionid");
    const hasToBeApproved = paramsURL.has("tobeapproved");
    const hasThankYouString = window.location.href.includes("thank-you-");
    const isApprovalFlow =
      hasSubmissionId || hasToBeApproved || hasThankYouString;

    if (!isApprovalFlow) {
      drawLightbox();
    }

    waitForRuntimeDependencies(0);
  });
})();
