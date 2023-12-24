globalThis.copyToClipboard = () => {
  let title = scrapeTitle();
  let desc = scrapeDescription();
  let transcript = scrapeTranscript();

  let clipboardText = title + '\n' + desc + '\n' + transcript;
  navigator.clipboard.writeText(clipboardText).then(() => {
    chrome.runtime.sendMessage('', { action: 'captionsCopied' });
    console.log('Text copied to clipboard with length :: ', transcript.length);
  }).catch((error) => {
    console.error('Unable to copy text due to :: ', error);
  });
}

function scrapeTitle() {
  let titleNode = document.querySelector('h1.ytd-watch-metadata');

  if (titleNode) return 'TITLE: ' + titleNode.textContent.trim();
  return '';
}

function scrapeDescription() {
  let descNode = document.getElementById('attributed-snippet-text');

  if (descNode) return 'DESCRIPTION: ' +  descNode.textContent.trim();
  return '';
}

function scrapeTranscript() {
  let transcript = '';
  let transcriptTextNodes = document
    .getElementsByClassName('segment-text ytd-transcript-segment-renderer');
  for (let transcriptTextNode of transcriptTextNodes) {
    transcript += transcriptTextNode.textContent + ' ';
  }
  return 'TRANSCRIPT: ' + transcript + '\n\nSummarize it in bullet points.';
}

