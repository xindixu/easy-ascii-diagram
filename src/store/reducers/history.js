import type from "../actionTypes";
import { TRANSACTION } from "../../constants";

const initialState = {
  past: [],
  future: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case type.UNDO: {
      const { past } = state;
      const tx = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      if (tx) {
        switch (tx.type) {
          case TRANSACTION.create:
            present = content.pop();
            future.unshift(present);
            this.setState({
              content,
              future
            });
            break;
          case TRANSACTION.edit:
            target = this.nodes.get(tx.id);
            break;
          default:
            break;
        }
      }

      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false
          }
        }
      };
    }
    case type.REDO: {
      const { tx } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            completed: !state.byIds[id].completed
          }
        }
      };
    }
    default:
      return state;
  }
}
