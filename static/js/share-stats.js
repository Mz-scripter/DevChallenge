function shareStats() {
    html2canvas(document.body, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
        ignoreElements: element => element.classList.contains('exclude-from-screenshot')
    }).then(function(canvas) {
        let link = document.createElement('a');
        link.href = canvas.toDataURL("image/png");
        link.download = "game-stats.png";
        link.click();
    });
    const link = "github.com";
    let text = encodeURIComponent(`Hey dev! 👋 Just played #DevChallenge! Can you guess dev icons faster than me? Check out my stats and give it a shot here: ${link}`);
    let twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(twitterUrl, "_blank");
}