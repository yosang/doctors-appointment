import { updateDOM, hideDOMElements } from "./utils.js";

const ws = new WebSocket("ws://localhost:8001");

const header = document.getElementById("header");
const main = document.getElementById("main");
const footer = document.getElementById("footer");

const lineElement = document.getElementById("line");
const lineNumberElement = document.getElementById("lineNumber");
const takeNumberBtn = document.getElementById("takeNumber");

ws.addEventListener("message", (e) => {
  const message = JSON.parse(e.data);
  const { type } = message;

  switch (type) {
    case "queue_update":
      // Messages to show on screen based on how many patients are ahead.
      const upNext = "The doctor is getting ready for you!";
      const oneAhead = `${message.ahead} patient ahead of you...`;
      const moreThanOneAhead = `${message.ahead} patients ahead of you...`;

      const messageToShow = message.ahead > 1 ? moreThanOneAhead : message.ahead === 1 ? oneAhead : upNext;

      updateDOM(messageToShow, footer);

      break;
    case "number_enqueued":
      updateDOM(null, null, () => hideDOMElements(takeNumberBtn, header, lineElement)); // Hides everything but the number the patient just took
      break;
    case "ticket_called":
      updateDOM("You have been called! Please walk in to the doctor.", main, () => hideDOMElements(lineNumberElement)); // Shows a message when called and hides the ticket number from the screen
      break;
    default:
      const { line, number } = message;
      updateDOM(line, lineElement);
      updateDOM(number, lineNumberElement);
      break;
  }
});

takeNumberBtn.addEventListener("click", () => ws.send(JSON.stringify({ type: "patient_takes_ticket" })));
