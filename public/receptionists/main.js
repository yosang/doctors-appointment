import { updateDOM, enableCallButton, disableCallButton } from "./utils.js";

const ws = new WebSocket("ws://localhost:8001?client=receptionist");
const numberEle = document.getElementById("number");
const callBtnEle = document.getElementById("call");

const ENABLE_BTN_CLASSNAME = "btnEnabled";
const DISABLE_BTN_CLASSNAME = "btnDisabled";

ws.addEventListener("message", (e) => {
  const message = JSON.parse(e.data);

  switch (message.type) {
    case "next_number":
      if (message.number) {
        updateDOM(message.number, numberEle, () => enableCallButton(callBtnEle, ENABLE_BTN_CLASSNAME));
      } else {
        updateDOM("Waiting for patients...", numberEle, () => disableCallButton(callBtnEle, DISABLE_BTN_CLASSNAME));
      }
      break;
    default:
      break;
  }
});

callBtnEle.addEventListener("click", () => ws.send(JSON.stringify({ type: "receptionist_calls_number" })));
