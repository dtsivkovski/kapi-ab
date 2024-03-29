const typeArea = document.getElementById('typingArea');
const paragraph = "The purpose of this fraternity shall be to foster knowledge of the law for undergraduate students; to provide service to the greater community and campus; to promote a strong sense of fraternalism among members; to uphold the ideals and integrity of Kappa Alpha Pi Pre-Law Co-ed Fraternity; so that each member may advance their intellect while contributing actively to the well-being of others.";
typeArea.style.backgroundColor = "rgb(20, 20, 20)";
typeArea.style.color = "white";

// add event listener to the typing area on update
typeArea.addEventListener('input', function() {
    // get the text from the typing area
    const text = typeArea.value;
    // get the length of the text
    const length = text.length;
    // get the substring of the paragraph that is the same length as the text
    const substring = paragraph.substring(0, length);
    // check if the text is equal to the substring
    if (text == substring) {
        // if it is, change the color of the typing area to green
        typeArea.style.backgroundColor = "rgb(20, 128, 20)";
    } else {
        // if it is not, change the color of the typing area to red
        typeArea.style.backgroundColor = "rgb(128, 20, 20)";
    }
});