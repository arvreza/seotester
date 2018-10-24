chrome.runtime.sendMessage({
    action: "collectSEORelatedTags",
    source: collectSEO(document)
});

function collectSEO(doc) {
    var msg = '';
    var node = doc.firstChild;

    msg += '<h4>Canonical:</h4>'; 

    if (document.querySelector("link[rel='canonical']")) {
        msg += document.querySelector("link[rel='canonical']").href;
    }

    msg += '<h4>noindex:</h4>';

    var noindex = document.head.querySelector("meta[content*=noindex][content]");
    if (noindex) {
        msg += noindex.content;
    }

    msg += "<h4>Structured data:</h4>";

    if (document.querySelector("script[type='application/ld+json']")) {
        msg += document.querySelector("script[type='application/ld+json']").innerText;
    }

    msg += "<h4>Internal links:</h4>";
    var allLinks = Array.from(document.querySelectorAll("a"));
    msg += allLinks.filter(p => new RegExp(window.location.hostname, 'g' ).test(p)).length;

    return msg;
}

