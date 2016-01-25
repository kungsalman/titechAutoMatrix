chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              schemes: [ "https" ],
              hostEquals: "portal.nap.gsic.titech.ac.jp",
              pathEquals: "/GetAccess/Login",
              queryContains: "Template=idg_key&AUTHMETHOD=IG&GASF=CERTIFICATE,IG.GRID"
            },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  console.log("hej");
});
