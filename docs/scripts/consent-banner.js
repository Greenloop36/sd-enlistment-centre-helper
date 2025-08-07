const modal = document.getElementById("consent-dialog")
const button_consent = document.getElementById("consent-consent")
const button_deny = document.getElementById("consent-deny")
const button_reset = document.getElementById("consent-reset")

var script_created = false

function create_script() {
    if (script_created == true) { return }
    script_created = true

    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-HXW2DNDNX8';

    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(gtagScript,firstScript);
}

function toggle_consent(consented) {
    if (consented == true) {
        localStorage.setItem("consentGranted", "true");
        create_script()
    } else {
        localStorage.setItem("consentGranted", "false");
    }

    function gtag() { dataLayer.push(arguments); }

    consent = null
    if (consented == true) {
        consent = "granted"
    } else {
        consent = "denied"
    }

    gtag('consent', 'update', {
      ad_user_data: consent,
      ad_personalization: consent,
      ad_storage: consent,
      analytics_storage: consent
    });

    console.log(`consent: ${consent}`)
}

function toggle_modal(toggle) {
    if (toggle == true) {
        modal.style.display = "flex"
    } else {
        // modal.setAttribute("hidden", "")
        modal.style.display = "none"
    }
}

button_consent.addEventListener("click", function() {
    toggle_modal(false)
    toggle_consent(true)
})

button_deny.addEventListener("click", function() {
    toggle_modal(false)
    toggle_consent(false)
})

button_reset.addEventListener("click", function() {
    toggle_consent(false)
    localStorage.removeItem("consentGranted")
    toggle_modal(true)
})

window.addEventListener("load", function() {
    if (localStorage.getItem("consentGranted") != "true") {
        toggle_modal(true)
    }
})

