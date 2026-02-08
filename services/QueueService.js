const Queue = require("./Queue.js");

class QueueService extends Queue {
  constructor(server) {
    super();
    this.server = server;
  }

  /**
   * Updates the screens of patients and receptionists based on the variable attached to the socket
   * @returns {void}
   */
  updateScreens() {
    this.server.clients.forEach((socket) => {
      if (socket.readyState !== WebSocket.OPEN) return;

      if (socket.receptionist) return socket.send(JSON.stringify({ type: "next_number", number: this.nextNumberInQueue() }));

      if (socket.ticketNumber) {
        socket.send(
          JSON.stringify({
            type: "queue_update",
            ahead: this.howManyAhead(socket.ticketNumber),
          }),
        );
      } else {
        socket.send(
          JSON.stringify({
            ...this.nextAvailableNumber(),
          }),
        );
      }
    });
  }
}

module.exports = QueueService;
