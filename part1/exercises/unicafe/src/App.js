import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick()}>{text}</button>

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)
const Statistics = (props) => {
  if(props.stats[3].value === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text={props.stats[0].text} value={props.stats[0].value} />
        <StatisticLine text={props.stats[1].text} value={props.stats[1].value} />
        <StatisticLine text={props.stats[2].text} value={props.stats[2].value} />
        <StatisticLine text={props.stats[3].text} value={props.stats[3].value} />
        <StatisticLine text={props.stats[4].text} value={props.stats[4].value} />
        <StatisticLine text={props.stats[5].text} value={props.stats[5].value} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = good + neutral + bad
  let average = (good - bad) / (total > 0 ? total : 1)
  let positive = good / (total > 0 ? total : 1) * 100

  const statistics = [
      { 
      text: "good",
      value: good
    },
    {
      text: "neutral",
      value: neutral
    },
    {
      text: "bad",
      value: bad
    },
    {
      text: "total",
      value: total
    },
    {
      text: "average",
      value: average
    },
    {
      text: "positive",
      value: positive + "%"
    }
  ];

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => () => setGood(good + 1)} text="good" />
      <Button handleClick={() => () => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => () => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics stats={statistics} />
    </div>
  )
}

export default App