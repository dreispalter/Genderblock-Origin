// background.js

let tabSubstitutionCounts = {};
let tabReplacedStrings = {};

// Update the browser action badge with the current substitution count for the active tab
function updateBadge(tabId) {
  const count = tabSubstitutionCounts[tabId] || 0;
  browser.browserAction.setBadgeText({ text: count.toString(), tabId: tabId });
}

// Listen for messages from the content script indicating a substitution occurred
browser.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "substitution") {
    const tabId = sender.tab.id;
    tabSubstitutionCounts[tabId] = (tabSubstitutionCounts[tabId] || 0) + 1;
    updateBadge(tabId);

    const sourceString = message.sourceString;
    const replacedString = message.replacedString;
    if (!tabReplacedStrings[tabId]) {
      tabReplacedStrings[tabId] = [];
    }
    tabReplacedStrings[tabId].push(`'${sourceString}' -> '${replacedString}'`);
  }
});

// Listen for tab removal to clear the substitution count for closed tabs
browser.tabs.onRemoved.addListener((tabId) => {
  delete tabSubstitutionCounts[tabId];
  delete tabReplacedStrings[tabId];
});

// Listen for tab URL changes to clear the substitution count and replaced strings for the tab
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    delete tabSubstitutionCounts[tabId];
    delete tabReplacedStrings[tabId];
    browser.browserAction.setBadgeText({ text: '', tabId: tabId });
  }
});

// Listen for messages from the popup script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getReplacedStrings") {
    const tabId = message.tabId;
    const replacedStrings = tabReplacedStrings[tabId] || [];

    sendResponse(replacedStrings);
  }
});

