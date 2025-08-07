const modal = document.getElementById("consent-dialog")
const button_consent = document.getElementById("consent-consent")
const button_deny = document.getElementById("consent-deny")
const button_reset = document.getElementById("consent-reset")
let script_loaded = false; // Add this flag to prevent duplicates

function load_gtag() {
    if (script_loaded) return;
    script_loaded = true;

    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-HXW2DNDNX8';
    
    // Use `document.head.appendChild` to add it to the head
    document.head.appendChild(gtagScript);
}

function toggle_consent(consented) {
    if (consented == true) {
        localStorage.setItem("consentGranted", "true");
        // When consent is granted, update consent and then configure the tag
        load_gtag()
        gtag('consent', 'update', {
            ad_storage: 'granted',
            analytics_storage: 'granted'
        });
        gtag('config', 'G-HXW2DNDNX8'); // <-- Call this AFTER consent is granted
    } else {
        localStorage.setItem("consentGranted", "false");
        // When consent is denied, just update the consent state
        gtag('consent', 'update', {
            ad_storage: 'denied',
            analytics_storage: 'denied'
        });
    }

    // You can remove the gtag() function definition, as it's defined in the HTML
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
    if (localStorage.getItem("consentGranted") != "true") {
        toggle_modal(true)
    }
})

