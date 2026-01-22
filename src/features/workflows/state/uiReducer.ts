import type { SortOption, Workflow } from "../types/workflow";

export type UIState = {
  searchQuery: string;
  sortOption: SortOption;
  editingWorkflow: Workflow | null;
  deletingWorkflow: Workflow | null;
};

export type UIAction =
  | { type: "search/set"; payload: string }
  | { type: "sort/set"; payload: SortOption }
  | { type: "edit/open"; payload: Workflow }
  | { type: "edit/close" }
  | { type: "delete/open"; payload: Workflow }
  | { type: "delete/close" };

export const initialUIState: UIState = {
  searchQuery: "",
  sortOption: "lastUpdated-desc",
  editingWorkflow: null,
  deletingWorkflow: null,
};

export function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case "search/set":
      return { ...state, searchQuery: action.payload };
    case "sort/set":
      return { ...state, sortOption: action.payload };
    case "edit/open":
      return { ...state, editingWorkflow: action.payload };
    case "edit/close":
      return { ...state, editingWorkflow: null };
    case "delete/open":
      return { ...state, deletingWorkflow: action.payload };
    case "delete/close":
      return { ...state, deletingWorkflow: null };
    default:
      return state;
  }
}
