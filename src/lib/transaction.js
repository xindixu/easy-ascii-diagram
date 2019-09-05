import { TRANSACTION } from "../constants";

class Transaction {
  constructor(type, id, shape, oldProps, newProps) {
    if (!Object.values(TRANSACTION).includes(type)) {
      throw new Error("Invalid transaction type");
    }

    switch (type) {
      case TRANSACTION.edit:
        if (oldProps === newProps || oldProps === null || newProps === null) {
          throw new Error("Edit should receive both old props and new props");
        }
        break;
      case TRANSACTION.delete:
        if (oldProps === null || newProps !== null) {
          throw new Error("Delete should receive old props but not new props");
        }
        break;
      case TRANSACTION.create:
        if (oldProps !== null || newProps === null) {
          throw new Error("Create should receive new props but not old props");
        }
        break;
      default:
        break;
    }

    this.type = type;
    this.id = id;
    this.shape = shape;
    this.oldProps = oldProps;
    this.newProps = newProps;
  }
}

export default Transaction;
