import React from "react";

export const Instructions = ({
  omittedQuestions,
}: {
  omittedQuestions: number[];
}) => {
  return (
    <div className="column instructions">
      <p>
        <strong>Hidden questions:</strong>
        <span style={{ marginLeft: "5px" }}>
          {omittedQuestions
            .map((q) => q + 1)
            .sort((a, b) => a - b)
            .join(", ") || "none"}
        </span>
      </p>
      <br />
      <p>
        <strong>Info:</strong>
        <p>
          Questions come from <em>Mein Einbürgerungstest</em> by Hans Jörg
          Schrötter. 30 questions have been randomly chosen from the Allgemeine
          Fragenkatalog, and 3 from the Hamburg Fragenkatalog. The "Question #"
          refers to the actual Allgmeeine Fragenkatalog question number in the
          book.
        </p>
        <br />
        <strong>Instructions:</strong>
        <div>
          <ol>
            <li>Answer all questions.</li>
            <li>
              Click "Submit". Correctly answered questions will be highlighed in
              green. Incorrectly answered questions will be highlighted in
              yellow.
            </li>
            <li>
              Click "New questions" to get a set of 33 more randomly chosen
              questions.
            </li>
            <li>
              If you correctly answer the same question 3 times, it won't appear
              again. This is kept track of in your browser's Session Storage (if
              your browser allows it).
            </li>
            <li>
              If you want to delete your session storage, click "Delete Session
              Storage". You don't need to refresh the page afterwards.
            </li>
          </ol>
        </div>
      </p>
    </div>
  );
};
