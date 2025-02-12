document.addEventListener("DOMContentLoaded", function () {
    let countdownOverlay = document.getElementById("countdown-overlay");
    let countdownText = document.getElementById("countdown-text");
    let countdown = 3;

    let countdownInterval = setInterval(() => {
        if (countdown > 1) {
            countdown--;
            countdownText.textContent = countdown;
        } else {
            countdownText.textContent = "Go!";
            setTimeout(() => {
                window.location.href = "/"; // Redirect to game page
            }, 1000);
            clearInterval(countdownInterval);
        }
    }, 1000);
});
