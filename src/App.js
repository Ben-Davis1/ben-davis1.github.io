import "./App.css";
import { useState, useEffect } from "react";
import _ from "underscore";
import { PieChart } from "react-minimal-pie-chart";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const result = getRandomIntInclusive(0, 360);

const turns = Math.ceil(Math.random() * 10);

const options = _.shuffle([
  "Hendo",
  "Ben",
  "Ines",
  "Pradeep",
  "Peter",
  "Mitchell",
  "Arjun"
]);

console.log(turns);

console.log(result);

const percent = 100 / options.length;

const numbers = options.map((o, i) => {
  const actualPercent = i * percent;

  return { name: o, number: 360 * (actualPercent / 100), actualPercent };
});

const winner = numbers.reduce((acc, curr, i) => {
  if (curr.number <= result && curr.number >= (acc.number || 0)) {
    return curr;
  }

  if (i === options.length - 1 && acc === {}) {
    return options[0];
  }

  return acc;
}, {});

console.log(winner);

function App() {
  const [showWinner, setShowWinner] = useState(false);

  useEffect(() => {
    const storageWinner = localStorage.getItem(winner.name);
    if (storageWinner) {
      localStorage.setItem(winner.name, parseInt(storageWinner) + 1);
    } else {
      localStorage.setItem(winner.name, 1);
    }
    setTimeout(() => setShowWinner(true), 4000);
  }, []);

  const range = numbers[1].number - numbers[0].number;
  return (
    <>
      <div className="pie">
        <PieChart
          startAngle={270}
          data={[
            { title: options[0], value: range, color: "#ABDBB9" },
            { title: options[1], value: range, color: "#2EA450" },
            { title: options[2], value: range, color: "#ABDBB9" },
            { title: options[3], value: range, color: "#2EA450" },
            { title: options[4], value: range, color: "#ABDBB9" },
            { title: options[5], value: range, color: "#2EA450" },
            { title: options[6], value: range, color: "#1B2450" },
          ]}
          label={({ dataEntry }) => {
            return dataEntry.title;
          }}
          labelStyle={{
            fontSize: "5px",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            fill: "#fff",
          }}
        />
        <div
          className="App"
          style={{ transform: `rotate(${360 * turns + result}deg)` }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 172 172"
            style={{ fill: "#000000" }}
          >
            <g transform="translate(4.73,4.73) scale(0.945,0.945)">
              <g
                fill="none"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="none"
                stroke-linecap="butt"
                stroke-linejoin="none"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                style={{ mixBlendMode: "normal" }}
              >
                <g
                  fill="#0070ff"
                  stroke="#000000"
                  stroke-width="10"
                  stroke-linejoin="round"
                >
                  <path d="M114.66667,35.83333h-21.5v129h-14.33333v-129h-21.5l28.66667,-28.66667z"></path>
                </g>
                <path
                  d="M0,172v-172h172v172z"
                  fill="none"
                  stroke="none"
                  stroke-width="1"
                  stroke-linejoin="miter"
                ></path>
                <g
                  fill="#0070ff"
                  stroke="none"
                  stroke-width="1"
                  stroke-linejoin="miter"
                >
                  <path d="M86,7.16667l-28.66667,28.66667h21.5v129h14.33333v-129h21.5z"></path>
                </g>
                <path
                  d=""
                  fill="none"
                  stroke="none"
                  stroke-width="1"
                  stroke-linejoin="miter"
                ></path>
              </g>
            </g>
          </svg>
        </div>

        {showWinner && <div>{winner.name}</div>}
      </div>
    </>
  );
}

export default App;
