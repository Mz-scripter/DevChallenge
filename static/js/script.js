

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

let timeLeft = 60;
let timeInterval = setInterval(updateTimer, 1000);

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("time-left").textContent = timeLeft;
    } else {
        clearInterval(timeInterval);
        endGame();
    }
}

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