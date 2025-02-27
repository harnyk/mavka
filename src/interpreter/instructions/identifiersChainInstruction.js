import Instruction from "./instruction.js";

class IdentifiersChainInstruction extends Instruction {
  /**
   * @param {Context} context
   * @param {IdentifiersChainNode} node
   * @returns {*}
   */
  runSync(context, node) {
    let value = this.mavka.runSync(context, node.left);
    if (!value) {
      value = this.mavka.emptyCellInstance;
    }

    return value.get(node.right.name);
  }

  /**
   * @param {Context} context
   * @param {IdentifiersChainNode} node
   * @returns {Promise<*>}
   */
  async runAsync(context, node) {
    let value = await this.mavka.runAsync(context, node.left);
    if (!value) {
      value = this.mavka.emptyCellInstance;
    }

    return value.get(node.right.name);
  }
}

export default IdentifiersChainInstruction;
