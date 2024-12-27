import "./App.css";
import React, { useState } from "react";
import { QuestionGroup } from "./components/QuestionGroup.tsx";
import { AllQuestions } from "./components/AllQuestions.tsx";

function App() {
  const [selectedOption, setSelectedOption] = useState("randomQuestions");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="container">
      <form>
        <div>
          <input
            required
            type="radio"
            id="randomQuestions"
            name="toggle"
            value="randomQuestions"
            checked={selectedOption === "randomQuestions"}
            onChange={handleOptionChange}
          />
          <label htmlFor="randomQuestions">33 Random Questions</label>
        </div>
        <div>
          <input
            required
            type="radio"
            id="allQuestions"
            name="toggle"
            value="allQuestions"
            checked={selectedOption === "allQuestions"}
            onChange={handleOptionChange}
          />
          <label htmlFor="allQuestions">All Questions</label>
        </div>
      </form>
      {selectedOption === "allQuestions" ? <AllQuestions /> : <QuestionGroup />}
    </div>
  );
}

export default App;
