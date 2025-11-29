import { useQuiz } from "../context/QuizContext";

function FinishScreen() {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) {
    emoji = "🥳";
  } else if (percentage >= 80) {
    emoji = "😃";
  } else if (percentage >= 50) {
    emoji = "😐";
  } else {
    emoji = "😞";
  }

  return (
    <>
      <p className="result">
        <span>{emoji} </span>You have scored {points} out {maxPossiblePoints} (
        {Math.round(percentage)}
        %) <br />
      </p>
      <p className="highscore">
        <strong>(Your Highest Score: {highscore} points)</strong>
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
