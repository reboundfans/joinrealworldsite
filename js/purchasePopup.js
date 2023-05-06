/*
// Add these to HTML before <script src='js/purchasePopup.js'></script>
</body>
  <script src='/js/purchasePopup.js'></script>


*/



$('head').append('<script src="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css"/>');
$('head').append("<style>.alertify-notifier .ajs-message.ajs-visible {\n   padding: 0 !important;\n}\n .alertify-notifier .ajs-message{\n   background-color: transparent !important;\n   border:none !important;\n}\n .purchase-popup{\n   position: relative;\n   z-index: 999;\n   max-width: 80vw;\n   width: 500px;\n   padding: 10px 50px 10px 15px;\n   background-color: #fff;\n   border-radius: 0 15px 15px 0;\n   color: #000;\n   display: flex;\n   flex-direction: column;\n   flex-wrap: nowrap;\n   justify-content: center;\n   align-items: center;\n   -webkit-box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.5);\n   -moz-box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.5);\n   box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.5);\n   align-content: center;\n}\n .purchase-popup svg{\n   position: absolute;\n   content: '';\n   top: 10px;\n   right: 10px;\n   width: 20px;\n   height: 20px;\n   cursor: pointer;\n}\n .purchase-popup img{\n   position: absolute;\n   content: '';\n   top: calc(50% - 35px);\n   right: -35px;\n   width: 70px;\n   height: 70px;\n}\n .purchase-popup p{\n   font-size: 16px;\n   line-height: 130%;\n   margin:0;\n   color:#000;\n   text-align:start;\n}\n</style>");

const source = new EventSource('https://secure.jointherealworld.com/api/purchases');
source.addEventListener('purchase', purchaseEvent => {
  const data = JSON.parse(purchaseEvent.data);
  if(data.name && data.countryName) addPurchasePopup(data.name, data.countryName);
})


function addPurchasePopup(name, country){
  var div = document.createElement("div");

  div.innerHTML = `<div class='purchase-popup'>
    <img src="images/Mask-group-1_1Mask-group-1.webp" loading="lazy" alt="The Real World">
    <p><strong>${abbreviateName(name)}</strong> ${country && country.trim().length > 0 ? 'from <strong>' + country.trim() + '</strong>' : ''} has purchased The Real World and is escaping The Matrix.</p>
    </div>`;

  var screenW = document.documentElement.clientWidth;
  var position = screenW < 767 ? 'top-left' : 'bottom-left';

  alertify.set('notifier','position', position);
  alertify.message(div);
}

function abbreviateName(name){
  
  if(!name || name.trim().length <= 0) return 'Anon';

  var nameSplit = name.trim().split(' ');
  if(nameSplit.length > 1 && nameSplit[nameSplit.length - 1].length > 0){
    name = nameSplit[0] + ' ' + nameSplit[nameSplit.length - 1].charAt(0).toUpperCase() + '.';
  }

  return name.trim();
}