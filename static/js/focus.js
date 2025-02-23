function triggerKeyboard() {
    const input = document.getElementById("answer");

    if (input) {
        input.focus();
        input.click(); // Simulate user click
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(triggerKeyboard, 200); // Small delay ensures it works
});
