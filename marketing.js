function getUTMParam (paramName) {
  console.log('getutmparam', window, window.location.href);
  const url = window.location.href;
  const utmRegex = new RegExp('[?&]' + paramName + '(=([^&#]*)|&|#|$)');
  const regexResults = utmRegex.exec(url);
  console.log(regexResults);
  if (!regexResults) {
    return null;
  }
  if (!regexResults[2]) {
    return '';
  }
  console.log('decodeURIComponent(regexResults[2])');
  return decodeURIComponent(regexResults[2]);
}

function setUTMCookie ( utmParam, utmValue ) {
  console.log(utmParam, utmValue);
  const expDate = new Date( new Date().setFullYear( new Date().getFullYear() + 1 ));
  document.cookie = utmParam + '=' + utmValue + ';expires='
    + expDate.toUTCString() + ';domain=' + process.env.AUTH_COOKIE_DOMAIN + ';secure=true;path=/';
  console.log(document.cookie)
}

function updateCookie () {
  console.log('starts update cookie');
  const utmSource = getUTMParam('utm_source');
  const utmMedium = getUTMParam('utm_medium');
  const utmCampaign = getUTMParam('utm_campaign');
  const utmTerm = getUTMParam('utm_term');
  const utmContent = getUTMParam('utm_content');
  console.log(utmSource, utmMedium, utmCampaign, utmTerm, utmContent);

  if (utmSource) {
    setUTMCookie('utmSource', utmSource);
  }
  if (utmMedium) {
    setUTMCookie('utmMedium', utmMedium);
  }
  if (utmCampaign) {
    setUTMCookie('utmCampaign', utmCampaign);
  }
  if (utmTerm) {
    setUTMCookie('utmTerm', utmTerm);
  }
  if (utmContent) {
    setUTMCookie('utmContent', utmContent);
  }
}

window.addEventListener('load', function () {
  console.log('window loaded', document.cookie);
  alert('Function #1');
});
