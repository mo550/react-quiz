function NextQuestion({ index, totalQuestions, answer, dispatch }) {
  if (answer === null) return null;

  if (index < totalQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === totalQuestions - 1 && answer !== null) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finishQuiz" })}
      >
        Finish
      </button>
    );
  }
}

export default NextQuestion;
