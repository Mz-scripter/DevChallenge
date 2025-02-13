document.addEventListener("DOMContentLoaded", function () {
    let countdownOverlay = document.getElementById("countdown-overlay");
    let countdownText = document.getElementById("countdown-text");
    let gameContent = document.getElementById("game-content");
    let answerInput = document.getElementById("answer");

    // Define startCountdown globally so HTMX can access it
    window.startCountdown = function () {
        countdownOverlay.style.display = "flex";
        let countdown = 3;
        let countdownInterval = setInterval(() => {
            if (countdown > 1) {
                countdown--;
                countdownText.textContent = countdown;
            } else {
                countdownText.textContent = "Go!";
                clearInterval(countdownInterval);
                setTimeout(() => {
                    countdownOverlay.style.opacity = "0";
                    setTimeout(() => {
                        countdownOverlay.style.display = "none";
                        gameContent.style.display = "block";  
                        answerInput.focus();
                    }, 500);
                }, 1000);
            }
        }, 1000);
    };
});


function jsclick() {
    const user = document.getElementById("answer").value;
    const logo = document.getElementById("logo_name").value;
    const input = document.getElementById("answer");
    const pScore = document.getElementById("player_score").value;
    const pStreak = document.getElementById("player_streak").value;

    if (user === logo) {
        input.classList.add("correct");
        document.getElementById("score").innerText = pScore;
        document.getElementById("streak").innerText = pStreak;
    } else {
        input.classList.add("incorrect");
        document.getElementById("streak").innerText = pStreak;
        document.getElementById("score").innerText = pScore;
    }
    setTimeout(() => {
            input.value = "";
            input.classList.remove("correct", "incorrect");
            input.focus();
        }, 200);
}

let gameTimeLeft = 60;  // Initial time in seconds

function startGameTimer() {
    let timerElement = document.getElementById("time-left");

    let gameTimer = setInterval(() => {
        if (gameTimeLeft > 0) {
            gameTimeLeft--;
            timerElement.textContent = gameTimeLeft;
        } else {
            clearInterval(gameTimer);
            endGame();
        }
    }, 1000);
}

// Call startGameTimer() after countdown finishes
setTimeout(startGameTimer, 4000);  // Starts after countdown (3s + 1s "Go!")


function endGame() {
    fetch("game-result/")
        .then(response => response.text())
        .then(html => {
            document.getElementById("game-result").innerHTML = html;
        })
    
        const input = document.getElementById("answer");
        input.disabled = true;
        document.getElementById("game-form").style.display = "none";
}