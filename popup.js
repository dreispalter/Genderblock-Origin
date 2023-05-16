// popup.js

// Get the current active tab
browser.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
  // Retrieve the tab ID
  const tabId = tabs[0].id;

  // Send a message to the background script requesting the replaced strings
  browser.runtime.sendMessage({ type: "getReplacedStrings", tabId: tabId }, function (replacedStrings) {
    // Handle the response and update the popup.html page
    handleReplacedStrings(replacedStrings);
  });
});


// Handle the received replaced strings and update the popup.html page
function handleReplacedStrings(replacedStrings) {
  const replacedStringsList = document.getElementById("replacedStrings");

  replacedStrings.forEach(function (replacedString) {
    listItem = document.createElement("li");
    listItem.textContent = replacedString;
    replacedStringsList.appendChild(listItem);
  });
}

