function checkForValidUrl(tabID, changeInfo, tab) {
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
    chrome.pageAction.show(tabID);
    chrome.tabs.executeScript(tabID, {file: "fillMatrix.js"});
  }
}

function fillIn(tab) {
  console.log('Test');
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.pageAction.onClicked.addListener(fillIn);

