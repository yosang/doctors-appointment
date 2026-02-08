class Queue {
  counter = 1;
  numberTracker = new Set();
  currentNumber = null;
  queue = [];

  /**
   * Adds a new number to the end of the queue.
   * @param {number} number
   */
  enqueue(number) {
    if (typeof number !== "number") throw new Error("The argument passed to this method must be a number");
    this.queue.push(number);
  }

  /**
   * Removes and returns the first number from the start of the queue.
   * @returns {number} - The next number in line.
   */
  dequeue() {
    return this.queue.shift();
  }

  /**
   * Returns at the first number in the queue (without removing it).
   * @returns {number|null}
   */
  nextNumberInQueue() {
    if (this.queue.length < 1) return null;
    return this.queue[0];
  }

  /**
   * Returns the current line position and next available number.
   * @returns {{ line: number, number: number}}
   */
  nextAvailableNumber() {
    if (this.currentNumber === null) this.currentNumber = this.genRandomNumber(); // If currentNumber is null, generates a new one

    return {
      line: this.counter,
      number: this.currentNumber,
    };
  }

  /**
   * @param {number} number - The patient number to find in the quueue.
   * @returns {number} - Their position in the queue (index-based).
   */
  howManyAhead(number) {
    return this.queue.indexOf(number);
  }

  /**
   * Assigns the current ticket number to a patient and prepares the next available number.
   * @returns {{ line: number, number: number}}
   */
  takeTicket() {
    if (this.currentNumber === null) this.currentNumber = this.genRandomNumber();

    const response = {
      line: this.counter,
      number: this.currentNumber,
    };

    this.numberTracker.add(this.currentNumber); // Adds the taken number to the number tracker so we dont generate the same number again
    this.currentNumber = null; // Resets current number so a new number can be generated

    this.counter++; // Increases the counter by 1

    return response;
  }

  /**
   * Generates a unique number between 0 and 999.
   * @returns {number}
   */
  genRandomNumber() {
    let num;

    // Generates a new random number for as long as that number has not been seen before
    do {
      num = Math.floor(Math.random() * 1000);
    } while (this.numberTracker.has(num)); // Loop for another number if num is already in the set

    return num;
  }

  /**
   * Removes a number from the queue.
   * @satisfies - This is used in scenarios where a patient closes connection and we no longer need to access their number in the queue.
   * @param {number} number - The number to remove from the queue.
   */
  removeFromQueue(number) {
    if (typeof number !== "number") throw new Error("The argument passed to this method must be a number");

    this.queue = this.queue.filter((num) => num != number);

    this.numberTracker.delete(number);
  }
}

module.exports = Queue;
