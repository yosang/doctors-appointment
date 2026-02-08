require("dotenv").config();

const ws = require("ws");
const port = process.env.WS_PORT || 8001;
const server = new ws.Server({ port });
const QueueService = require("./services/QueueService");

const queue = new QueueService(server);

server.on("connection", (socket, req) => {
  const path = new URL(req.url, "http://localhost.com");
  const isReceptionist = path.searchParams.get("client") === "receptionist"; // ! Future reference: We want to replace this logic with keycloak auth

  if (isReceptionist) socket.receptionist = isReceptionist; // Attach a Boolean value to the socket so we can identify it later

  queue.updateScreens(); // Updates the screens of the specific type of client upon connection

  socket.on("message", (e) => {
    const message = JSON.parse(e);
    const { type } = message;

    switch (type) {
      case "patient_takes_ticket":
        const { number } = queue.takeTicket();

        socket.ticketNumber = number; // Attach the ticket number to the socket so we can identify the socket later
        socket.send(JSON.stringify({ type: "number_enqueued" })); // Notifies the patient

        queue.enqueue(number); // ! Future reference: could probably integrate this in the takeTicket method so its done internally
        queue.updateScreens();

        break;
      case "receptionist_calls_number":
        const numberCalled = queue.dequeue();

        // Notifies the patient with ticketNumber matching the dequeued number
        server.clients.forEach((socket) => {
          if (socket.ticketNumber === numberCalled) socket.send(JSON.stringify({ type: "ticket_called" }));
        });

        queue.updateScreens();

        break;
      default:
        break;
    }
  });

  // Cleans up after patients close their connection.
  socket.on("close", () => {
    if (socket.ticketNumber) {
      queue.removeFromQueue(socket.ticketNumber);
      queue.updateScreens();
    }
  });
});

console.log("WebSocket server is running on port 8001");
