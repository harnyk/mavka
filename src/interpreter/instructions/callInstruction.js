import Instruction from "./instruction.js";
import runArgs from "./args.js";
import ChainNode from "mavka-parser/src/ast/ChainNode.js";
import IdentifierNode from "mavka-parser/src/ast/IdentifierNode.js";

class CallInstruction extends Instruction {
  /**
   * @param {Context} context
   * @param {CallNode} node
   * @returns {*}
   */
  runSync(context, node) {
    let value = this.mavka.emptyCellInstance;

    const args = runArgs(this.mavka, context, node.args);

    if (node.value instanceof ChainNode) {
      value = this.mavka.runSync(context, node.value.left);

      let meValue = value;
      if (node.value.left instanceof IdentifierNode && node.value.left.name === "предок") {
        meValue = context.get("я");
      }

      const diia = value.get(node.value.right.name);
      return diia.call(context, args, { meValue });
    } else {
      const value = this.mavka.runSync(context, node.value);
      return value.call(context, args);
    }
  }

  /**
   * @param {Context} context
   * @param {CallNode} node
   * @returns {Promise<*>}
   */
  async runAsync(context, node) {
    let value = this.mavka.emptyCellInstance;

    const args = await runArgs(this.mavka, context, node.args);

    if (node.value instanceof ChainNode) {
      value = await this.mavka.runAsync(context, node.value.left);

      let meValue = value;
      if (node.value.left instanceof IdentifierNode && node.value.left.name === "предок") {
        meValue = context.get("я");
      }

      const diia = value.get(node.value.right.name);
      return diia.call(context, args, { meValue });
    } else {
      const value = await this.mavka.runAsync(context, node.value);
      return value.call(context, args);
    }
  }
}

export default CallInstruction;
