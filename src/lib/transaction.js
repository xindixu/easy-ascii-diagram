import { TRANSACTION } from "../constants";

class Transaction {
  constructor(type, id, shape, oldProps, newProps) {
    if (!Object.values(TRANSACTION).includes(type)) {
      throw new Error("Invalid transaction type");
    }

    if (type === TRANSACTION.edit) {
      if (oldProps === newProps || oldProps === null || newProps === null) {
        throw new Error("Old props or new props is invalid");
      }
    } else if (oldProps !== null) {
      throw new Error("Old props will be ignored");
    }

    this.type = type;
    this.id = id;
    this.shape = shape;
    this.oldProps = oldProps;
    this.newProps = newProps;
  }
}

export default Transaction;
