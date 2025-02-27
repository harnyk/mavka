import Instruction from "./instruction.js";
import WaitNode from "mavka-parser/src/ast/WaitNode.js";
import IdentifierNode from "mavka-parser/src/ast/IdentifierNode.js";

class AssignInstruction extends Instruction {
  /**
   * @param {Context} context
   * @param {AssignNode} node
   * @returns {*}
   */
  runSync(context, node) {
    if (node.wait) {
      throw "Cannot wait in sync context";
    }

    const value = this.mavka.runSync(context, node.value);

    if (node.id instanceof IdentifierNode) {
      context.set(node.id.name, value);
    } else {
      const val = this.mavka.runSync(context, node.id.left);

      val.set(node.id.right.name, value);
    }

    return value;
  }

  /**
   * @param {Context} context
   * @param {AssignNode} node
   * @returns {Promise<*>}
   */
  async runAsync(context, node) {
    const value = await this.mavka.runAsync(context, node.wait ? new WaitNode(context, { value: node.value }) : node.value);

    if (node.id instanceof IdentifierNode) {
      context.set(node.id.name, value);
    } else {
      const val = await this.mavka.runAsync(context, node.id.left);

      val.set(node.id.right.name, value);
    }

    return value;
  }
}

export default AssignInstruction;
