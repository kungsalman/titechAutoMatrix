// Check if a tab has correct url to show the page action and fill in the
// matrix authentication.
function checkForValidUrl(tabId, changeInfo, tab) {
  var a = document.createElement('a');
  a.href = tab.url;
  var scheme = a.protocol.replace(':', '');
  var host = a.hostname;
  var path = a.pathname;
  var query = a.search;

  if (scheme == 'https' &&
      host == 'portal.nap.gsic.titech.ac.jp' &&
      path == '/GetAccess/Login' &&
      query.lastIndexOf('Template=idg_key') > -1 &&
      query.lastIndexOf('AUTHMETHOD=IG') > -1 &&
      query.lastIndexOf('GASF=CERTIFICATE,IG.GRID') > -1) {
    chrome.pageAction.show(tabId);
    fillInTabId(tabId);
  }
}

// Fill fields of a tab given a tabs.Tab object.
function fillInTab(tab) {
  fillInTabId(tab.id);
}

// Fill fields of a tab given tab id.
function fillInTabId(tabId) {
  chrome.tabs.executeScript(tabId, {file: "fillMatrix.js"});
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.pageAction.onClicked.addListener(fillInTab);

