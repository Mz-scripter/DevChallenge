function focusInput() {
    const input = document.getElementById("answer");

    if (input) {
        input.setAttribute("readonly", "readonly");
        input.setAttribute("disabled", "true");
        input.focus();
        input.removeAttribute("readonly");
        input.removeAttribute("disabled");
    }
}

setTimeout(focusInput, 100);