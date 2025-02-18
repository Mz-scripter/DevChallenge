score = document.getElementById('score').value;

function shareStats() {
    navigator.share({
       text: `
        Can you beat my score on DevChallenge
        🔗 https://github.com/Mz-scripter
       `
    })
}

function shareOnX() {
    let text = encodeURIComponent(`🔥 Check out my DevChallenge stats! 🏆\n\n⭐ Rank: #1\n💯 Score: 2500\n🔥 Max Streak: 10\n🏆 Total Score: 15000\n\nCan you beat my score? Play now! 👇`);
    let url = encodeURIComponent("https://github.com/Mz-scripter");
    let twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(twitterUrl, "_blank");
}

 function snap() {
    html2canvas(document.querySelector('.card'), {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
    }).then(function(canvas) {
        let link = document.createElement('a');
        link.href = canvas.toDataURL("image/png");
        link.download = "game-stats.png";
        link.click();
    });
}
