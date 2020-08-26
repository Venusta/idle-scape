import { RootState } from "../redux-stuff";
import { ItemData } from "../types/types";

/**
 * Selects the characters bank from state based on id
 * @param state RootState
 * @param id character Id
 */
export const selectBank = (state: RootState, id: string): ItemData[] => state.characters.banks[id];
