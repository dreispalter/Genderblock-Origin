// Don't process these words
const blacklist = [
  "berlin",
  "prigoschin",
  "martin",
  "plugin",
  "termin",
  "login",
  "origin",
];

// Regular expressions to apply to texts
const substitutions = [
  {
    // Replace "Chefinnen und|oder Chefs" with "Chefs" (plural and singular)
    pattern: /[\wöäüÖÄÜß]{3,}[bcdfghjklmnpqrstvwxys]in(nen)?\ (und|oder)\ -?([\wöäüÖÄÜß]{3,})(?=\b)/g,
    replacement: "$3"
  },
  {
    // Replace "Chefs und|oder Chefinnen" with "Chefs" (plural and singular)
    pattern: /([\wöäüÖÄÜß]{4,}) (und|oder) (-?[\wöäüÖÄÜß]{3,}[bcdfghjklmnpqrstvwxys]|-)in(nen)?(?=\b)/g,
    replacement: "$1"
  },
  {
    // Replace "Chefin" or "Chefinnen" with "Chef"
    pattern: /([A-ZÖÄÜ][a-zöäüÖÄÜß]{2,}[bdfgklmnprtvwxs])[:*]?in(nen)?(?=\b)/g,
    replacement: "$1"
  },
];

// Look in these tags for text (avoiding mutating html code)
const contentTags = [
  'li', 'a', 'span', 'p',
  'h1', 'h2', 'h3', 'h4',
  'h5', 'h6', 'label', 'textarea',
  'em', 'strong', 'b',
];

function substituteTextNode(textNode) {
  let newText = textNode.nodeValue;
    let originalText = newText;

    for (const substitution of substitutions) {
      const { pattern, replacement } = substitution;
      const regex = new RegExp(pattern.source, "g");

      let match;
      while ((match = regex.exec(newText)) !== null) {
        const matchedText = match[0];
        const groups = match.slice(1);

        if (blacklist.includes(matchedText.toLowerCase())) {
          continue;
        }

        const replacedText = replacement.replace(/\$(\d+)/g, (m, index) => groups[index - 1]);
        newText = newText.slice(0, match.index) + replacedText + newText.slice(match.index + matchedText.length);

        console.log(`Replaced '${matchedText}' with '${replacedText}'`);
        // Increment the substitution count and send a message to the background script
        browser.runtime.sendMessage({ type: "substitution", sourceString: matchedText, replacedString: replacedText });

        regex.lastIndex = match.index + replacedText.length;
      }
    }

    if (newText !== originalText) {
      textNode.nodeValue = newText;
    }
}

function traverseNodes(node) {
  const childNodes = node.childNodes;

  for (let i = 0; i < childNodes.length; i++) {
    const childNode = childNodes[i];

    if (childNode.nodeType === Node.TEXT_NODE) {
      const parentElement = childNode.parentElement;

      if (contentTags.includes(parentElement.tagName.toLowerCase())) {
        substituteTextNode(childNode);
      }
    } else if (childNode.nodeType === Node.ELEMENT_NODE) {
      traverseNodes(childNode);
    }
  }
}

function substituteText(node) {
  traverseNodes(node);
}

// Perform initial substitution when the page finishes loading
substituteText(document.body);

// Observe mutations in the DOM and apply substitutions
const observer = new MutationObserver(function (mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      const addedNodes = mutation.addedNodes;

      for (let i = 0; i < addedNodes.length; i++) {
        const addedNode = addedNodes[i];

        if (addedNode.nodeType === Node.TEXT_NODE) {
          substituteText(addedNode);
        } else if (addedNode.nodeType === Node.ELEMENT_NODE) {
          traverseNodes(addedNode);
        }
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// Listen for tab content loads.
tabs.on('ready', function(tab) {
  console.log('tab is loaded', tab.title, tab.url);
});



