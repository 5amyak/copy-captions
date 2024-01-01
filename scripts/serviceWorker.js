function sendNotification(title, msg) {
  console.log("Sending notification with title :: ", title);

  const notificationOptions = {
    type: "basic",
    iconUrl: "../images/icon-64.png",
    title: title,
    message: msg,
  };

  chrome.notifications.create(notificationOptions);
}

// Listen for a message from the content script or popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('Running in background');
  if (message.action === "captionsCopied") {
    sendNotification('Copy Captions', 'Text copied to clipboard');
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo && changeInfo.status && changeInfo.status == "complete") {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files : [ "scripts/scrapeYT.js", "scripts/contentMain.js" ]
      })
      .then(() => console.log("Content Script Injected!!!"));
    }
  }
});
