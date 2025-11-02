let previous = "";
const MAX_PROMPT_ATTEMPTS = 5;

function getPassedPrompt() {
  const params = new URLSearchParams(window.location.search);
  const passed = params.get("prompt");
  if (passed && passed.trim().length > 0) {
    previous = passed;
    window.previous = passed;
    return passed;
  }
  return previous;
}

function generatePrompt(promptset) {
  if (!promptset || typeof promptset.get !== "function") {
    console.error("Prompt set is missing or invalid.");
    return "";
  }
  let attempt = 0;
  let candidate = "";
  do {
    candidate = buildPrompt(promptset);
    attempt += 1;
  } while (candidate === previous && attempt < MAX_PROMPT_ATTEMPTS);

  previous = candidate;
  window.previous = candidate;
  return candidate;
}

function buildPrompt(promptset) {
  const formats = promptset.get("Formats");
  if (!formats || formats.length === 0) {
    console.error("No prompt formats available.");
    return "";
  }
  let format = String(randomSelect(formats));
  let resolved = "";

  while (format.length > 0) {
    while (format.length > 0 && !format.startsWith("%")) {
      resolved = resolved.concat(format[0]);
      format = format.slice(1);
    }

    if (format.length < 1) {
      break;
    }

    format = format.slice(1);
    const endIndex = format.indexOf("%");
    const placeholder = endIndex >= 0 ? format.slice(0, endIndex) : "";
    format = endIndex >= 0 ? format.slice(endIndex + 1) : "";
    const substitution = resolveFormat(placeholder, promptset);
    resolved = resolved.concat(substitution);
  }

  const cleaned = resolved.replace(/\s+/g, " ").trim();
  return appendModifier(cleaned, promptset);
}

function resolveFormat(placeholder, promptset) {
  const options = promptset.get(placeholder);
  if (!options || options.length === 0) {
    console.warn(`No prompt options found for placeholder: ${placeholder}`);
    return placeholder;
  }
  return randomSelect(options);
}

function randomSelect(options) {
  return options[Math.floor(Math.random() * options.length)];
}

function appendModifier(basePrompt, promptset) {
  const modifiers = promptset.get("Modifiers");
  if (!modifiers || modifiers.length === 0) {
    return basePrompt;
  }

  const shouldAddModifier = Math.random() < 0.5;
  if (!shouldAddModifier) {
    return basePrompt;
  }

  const modifier = randomSelect(modifiers);
  const separator = basePrompt.endsWith(".") ? " " : ". ";
  return `${basePrompt}${separator}${modifier}`;
}

function goToNextRound(target) {
  if (!target) {
    return;
  }
  const activePrompt = previous || getPassedPrompt() || "";
  const url = new URL(target, window.location.href);
  url.searchParams.set("prompt", activePrompt);
  window.location.href = url.toString();
}

window.previous = previous;
window.goToNextRound = goToNextRound;
window.generatePrompt = generatePrompt;
window.getPassedPrompt = getPassedPrompt;
