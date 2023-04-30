/*
// Add these imports to HTML <head>
  <script src="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css"/>

// Add these to HTML before </body>
  <script src='/js/purchasePopup.js'></script>

*/

const source = new EventSource('https://secure.jointherealworld.com/api/purchases');
source.addEventListener('purchase', purchaseEvent => {
  const data = JSON.parse(purchaseEvent.data);
  if(data.name && data.countryName) addPurchasePopup(abbreviateName(data.Name), data.countryName);
})


function addPurchasePopup(name, country){
  var div = document.createElement("div");

  div.innerHTML = `<div class='purchase-popup'>
    <img src="./images/Mask-group-1_1Mask-group-1.webp" loading="lazy" alt="The Real World logo">
    <p><strong>${name}</strong> from <strong>${country}</strong> has purchased THE REAL WORLD and is escaping The Matrix.</p>
    </div>`;

  var screenW = document.documentElement.clientWidth;
  var position = screenW < 767 ? 'top-left' : 'bottom-left';

  alertify.set('notifier','position', position);
  alertify.message(div);
}

function abbreviateName(name){
  
  if(!name) return '';

  var nameSplit = name.split(' ');
  if(nameSplit.length > 1 && nameSplit[nameSplit.length - 1].length > 0){
    name = nameSplit[0] + ' ' + nameSplit[nameSplit.length - 1].charAt(0).toUpperCase() + '.';
  }

  return name.trim();
}