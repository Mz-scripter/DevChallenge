import html2canvas from "html2canvas";

window.shareStats = function() {
    html2canvas(document.querySelector('.card')).then(function(canvas) {
        document.body.appendChild(canvas);
    });
}

