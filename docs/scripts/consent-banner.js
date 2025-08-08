const modal = document.getElementById("consent-dialog")
const button_consent = document.getElementById("consent-consent")
const button_deny = document.getElementById("consent-deny")
const button_reset = document.getElementById("consent-reset")
let script_loaded = false;

function load_gtag() {
    if (script_loaded) return;
    script_loaded = true;

    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-HXW2DNDNX8';
    
    gtagScript.onload = function() {
        gtag('config', 'G-HXW2DNDNX8');
    }

    document.head.appendChild(gtagScript);
}

function toggle_consent(consented) {
    if (consented == true) {
        localStorage.setItem("consentGranted", "true");
        // load_gtag()
        gtag('consent', 'update', {
            ad_storage: 'granted',
            analytics_storage: 'granted'
        });
    } else {
        localStorage.setItem("consentGranted", "false");
        gtag('consent', 'update', {
            ad_storage: 'denied',
            analytics_storage: 'denied'
        });
    }

    console.log(`consent: ${consented ? 'granted' : 'denied'}`);
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
    let consented = localStorage.getItem("consentGranted")
    if (consented == "true") {
        toggle_consent(true)
    } else if (consented != "false") {
        toggle_modal(true)
    }
})

