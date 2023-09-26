document.addEventListener("DOMContentLoaded", function(){

    var cookieConsent = document.querySelector("#consent");
    if (cookieConsent.getAttribute('config-mode') == 'true') {
        var openCookieSettings = document.querySelector("#openCookieSettings");
        openCookieSettings.addEventListener("click", function(e) {
            cookieConsent.openConfig();
        });
    } else {
        cookieConsent.open();  
    }
    cookieConsent.addEventListener('cookies-status-changed', function(e) {
        var cookiesAccepted = [];
        var url = cookieConsent.getAttribute('post-url');
        if(e.detail.consent.indexOf("analytics") !== -1) {
            cookiesAccepted.push('analytics');
            try {
                executeAnalytics();
            } catch(err) {
            }
            try {
                document.getElementById('actividadIF').contentWindow.executeAnalytics();
            } catch(err) {
            }
        }
        if(e.detail.consent.indexOf("advertising") !== -1) {
            cookiesAccepted.push('advertising');
        }
        fetch(url, {
            method: 'POST',
            body: new URLSearchParams({
                cookiesAccepted: JSON.stringify(cookiesAccepted)
            })
        });
    });
})