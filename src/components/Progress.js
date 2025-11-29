import { useQuiz } from "../context/QuizContext";

function Progress() {
  const { answer, points, index, totalQuestions, maxPossiblePoints } =
    useQuiz();
  return (
    <header className="progress">
      <progress max={totalQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> /{" "}
        <strong>{totalQuestions}</strong>
      </p>
      <p>
        <strong>{points}</strong> / <strong>{maxPossiblePoints}</strong> points
      </p>
    </header>
  );
}

export default Progress;
