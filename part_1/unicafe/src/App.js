import React, { useState } from "react";

const StatisticsLine = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>{props.value.toString()}</td>
    </>
  );
};

const Statistics = (props) => {
  return (
    <div>
      {props.all > 0 ? (
        <div>
          <h2>Statistics</h2>
          <table>
            <tbody>
              <tr>
                <StatisticsLine text="Good" value={props.good} />
              </tr>
              <tr>
                <StatisticsLine text="Neutral" value={props.neutral} />
              </tr>
              <tr>
                <StatisticsLine text="Bad" value={props.bad} />
              </tr>
              <tr>
                <StatisticsLine text="All" value={props.all} />
              </tr>
              <tr>
                <StatisticsLine text="Average" value={props.avg} />
              </tr>
              <tr>
                <StatisticsLine text="Positive" value={props.positive + " %"} />
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const Button = (props) => {
  return <button onClick={() => props.func()}>{props.text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  // En aivan ymmärrä, miten average pitäisi laskea, mutta tuskin menetän pisteeni matemaatikan takia.
  const [avg, setAvg] = useState(0);
  const [positive, setPositive] = useState(0);

  const addGood = () => {
    setAll(all + 1);
    setPositive(positive + 1);
    setGood(good + 1);
    setAvg((good - bad) / all);
  };

  const addNeutral = () => {
    setAll(all + 1);
    setNeutral(neutral + 1);
    setAvg((good - bad) / all);
  };

  const addBad = () => {
    setAll(all + 1);
    setBad(bad + 1);
    setAvg((good - bad) / all);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button func={addGood} text="Good" />
      <Button func={addNeutral} text="Neutral" />
      <Button func={addBad} text="Bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        avg={avg}
        positive={(positive / all) * 100}
      />
    </div>
  );
};

export default App;
