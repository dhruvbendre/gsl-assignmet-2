(function () {
    const dialogue = document.querySelector("body > p");
    if (!dialogue) return;

    const fullText = dialogue.textContent;
    const characters = Array.from(fullText);
    const textNode = document.createTextNode("");
    let index = 0;

    dialogue.textContent = "";
    dialogue.appendChild(textNode);
    dialogue.classList.add("is-typing");

    const timer = window.setInterval(() => {
        textNode.nodeValue += characters[index];
        index += 1;

        if (index >= characters.length) {
            window.clearInterval(timer);
            dialogue.classList.remove("is-typing");
        }
    }, 35);
})();
