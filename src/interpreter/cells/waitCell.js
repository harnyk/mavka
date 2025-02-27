import { Cell } from "./cell.js";

class WaitCell extends Cell {
  /**
   * @param {Mavka} mavka
   * @param {AsyncCell} value
   */
  constructor(mavka, value) {
    super(mavka, "Очікувач");

    this.value = value;
  }

  asString() {
    return this.mavka.toCell("Очікувач");
  }
}

export default WaitCell;
