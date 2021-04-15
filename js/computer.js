
fetch(
    'https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple'
).then(res => {
    // console.log(res);
    return res.json();

}).then(loadedQuestions => {
    // console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map((loadedQuestion) => {
        const formattedQuestion = {
            question: loadedQuestion.question,
        }
        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);
        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice;
        })
        // console.log(answerChoices);
        return formattedQuestion;
    });
    startGame();
}).catch(err => {
    console.error(err);

})