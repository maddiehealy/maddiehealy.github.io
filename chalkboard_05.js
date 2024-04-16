function triviaQuestion() {
    const answer = document.getElementById("triviaAnswer").value;
    const correctAnswers = ["Three", "3"]; 
    const isCorrect = correctAnswers.includes(answer.toLowerCase());
    const response = isCorrect ? "correct" : "incorrect";
    alert(`Your guess was: ${answer} and it is ${response}.`);
}


function checkNumber() {
    const number = document.getElementById("numberInput").value;
    if (!/^\d{5}$/.test(number)) {
        alert("Please enter a 5-digit number.");
        return;
    }
    const num = parseInt(number, 10);
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
