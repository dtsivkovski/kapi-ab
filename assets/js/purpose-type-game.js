const typeArea = document.getElementById('typingArea');
const paragraph = "The purpose of this fraternity shall be to foster knowledge of the law for undergraduate students; to provide service to the greater community and campus; to promote a strong sense of fraternalism among members; to uphold the ideals and integrity of Kappa Alpha Pi Pre-Law Co-ed Fraternity; so that each member may advance their intellect while contributing actively to the well-being of others.";
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
    if (length == 0) {
        // if it is, change the color of the typing area to black
        typeArea.style.backgroundColor = "rgba(0,0,0, 0.5)";
    }
    else if (text == substring) {
        // if it is, change the color of the typing area to green
        typeArea.style.backgroundColor = "rgba(20, 128, 20, 0.6)";
    } else {
        // if it is not, change the color of the typing area to red
        typeArea.style.backgroundColor = "rgb(128, 20, 20, 0.6)";
    }
});

// event listener for a button that will give a hint to the user (the next letter)
document.getElementById('hintButton').addEventListener('click', function() {
    // get the text from the typing area
    var text = typeArea.value;
    // reset text length back to the most recent correct length
    for (i = 0; i < text.length; i++) {
        if (text.charAt(i) != paragraph.charAt(i)) {
            text = text.substring(0, i);
            break;
        }
    }
    // get the length of the text
    const length = text.length;
    // get the next letter from the paragraph
    const nextLetter = paragraph.charAt(length);
    // add the next letter to the text
    typeArea.value = text + nextLetter;
    // change the color of the typing area to green
    typeArea.style.backgroundColor = "rgba(20, 128, 20, 0.6)";
});

// event listener for a button that will reset the typing area
document.getElementById('resetButton').addEventListener('click', function() {
    // reset the typing area
    typeArea.value = "";
    // change the color of the typing area to black
    typeArea.style.backgroundColor = "rgba(0,0,0, 0.5)";
});
