import { TRANSACTION } from "../constants";

class Transaction {
  constructor(type, id, shape, oldState, newState) {
    if (!Object.values(TRANSACTION).includes(type)) {
      throw new Error("Invalid transaction type");
    }

    switch (type) {
      case TRANSACTION.edit:
        if (oldState === newState || oldState === null || newState === null) {
          throw new Error("Edit should receive both old props and new props");
        }
        break;
      case TRANSACTION.delete:
        if (oldState === null || newState !== null) {
          throw new Error("Delete should receive old props but not new props");
        }
        break;
      case TRANSACTION.create:
        if (oldState !== null || newState === null) {
          throw new Error("Create should receive new props but not old props");
        }
        break;
      default:
        break;
    }

    this.type = type;
    this.id = id;
    this.shape = shape;
    this.oldState = oldState;
    this.newState = newState;
  }
}

export default Transaction;
