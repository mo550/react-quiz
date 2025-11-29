import { createContext, useContext, useEffect, useReducer } from "react";
// Import your JSON data directly
import questionsData from "../data/questions.json";

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready, 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

const QuizContext = createContext();

function reducer(state, action) {
  const totalQuestionsTime = state.questions.length * SECS_PER_QUESTION;

  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: totalQuestionsTime,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finishQuiz":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "active",
        highscore: state.highscore,
        secondsRemaining: totalQuestionsTime,
      };
    case "timerTick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error(`Unknown action`);
  }
}

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  const totalQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(function () {
    // Simulate async loading to keep the same flow
    const loadQuestions = async () => {
      try {
        // Simulate a small delay like a real fetch
        await new Promise((resolve) => setTimeout(resolve, 500));
        dispatch({ type: "dataReceived", payload: questionsData.questions });
      } catch (error) {
        dispatch({ type: "dataFailed", payload: error.message });
      }
    };

    loadQuestions();

    // fetch("/data/questions")
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => dispatch({ type: "dataReceived", payload: data }))
    //   .catch((error) =>
    //     dispatch({ type: "dataFailed", payload: error.message })
    //   );
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        totalQuestions,
        maxPossiblePoints,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext is outside Provider...");
  return context;
}
export { QuizProvider, useQuiz };
