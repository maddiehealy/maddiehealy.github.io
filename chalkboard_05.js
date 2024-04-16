function triviaQuestion() {
    const answer = document.getElementById("triviaAnswer").value;
    const correctAnswers = ["Three", "3"]; 
    const isCorrect = correctAnswers.includes(answer.toLowerCase());
    const response = isCorrect ? "correct" : "incorrect";
    alert(`Your guess was: ${answer} and it is ${response}.`);
}


function checkNumber() {
    const number = document.getElementById("numberInput").value;
    const num = parseInt(number, 10);

    if (isNaN(num) || number.length !== 5) {
        alert("Please enter a valid 5-digit number.");
        return;
    }

    const result = num % 2 === 0 ? "even" : "odd";
    alert(`The number ${num} is ${result}.`);
}

document.getElementById("triviaAnswer").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        triviaQuestion();
    }
});

document.getElementById("numberInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkNumber();
    }
});
