console.log('Running copy captions on :: ', window.location.href);
main(0);

function main(attemptCount) {
  console.log('Attempt number :: ', attemptCount);
  try {
    if (showTranscriptSection()) {
      addCopyBtn();
    } else {
      throw new Error("RETRY");
    }
  } catch (error) {
    if (attemptCount < 5 && error.message === "RETRY") {
      setTimeout(() => main(attemptCount + 1), 1000);
    }
    console.log('Target element not found');
  }
}

function showTranscriptSection() {
  let targetElement = document.getElementById("structured-description");
  if (targetElement) {
    let buttons = targetElement.querySelectorAll('button');
    console.log('Target element is loaded with buttons :: ', buttons);
    for (let i = 0; i < buttons.length; i++) {
      let btnLabel = buttons[i].getAttribute('aria-label');
      if (btnLabel.includes('transcript')) {
        buttons[i].click();
        return true;
      }
    }
  }
  throw new Error("RETRY");
}

function addCopyBtn() {
  const COPY_BTN_ID = 'copyBtnId';
  let curCopyBtn = document.getElementById(COPY_BTN_ID);
  if (curCopyBtn) {
    console.log("Copy btn already added to transcript section");
    return;
  }

  let copyBtn = document.createElement('yt-icon-button');
  copyBtn.setAttribute('id', COPY_BTN_ID);
  copyBtn.title = 'Copy';
  copyBtn.innerHTML = '<svg style="filter: brightness(0.95);" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 6.6V5C7 4.44772 7.44772 4 8 4H18C18.5523 4 19 4.44772 19 5V16C19 16.5523 18.5523 17 18 17H16.2308" stroke="#828282" stroke-width="1.5"></path><rect x="4.75" y="6.75" width="11.5" height="13.5" rx="1.25" stroke="#828282" stroke-width="1.5"></rect></svg>'
  copyBtn.addEventListener('click', globalThis.copyToClipboard);

  document
    .querySelector("ytd-menu-renderer.ytd-engagement-panel-title-header-renderer")
    .querySelector("#top-level-buttons-computed")
    .appendChild(copyBtn);
  console.log("Copy btn added to transcript section");
}