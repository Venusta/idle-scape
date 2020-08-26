import { RootState } from "../redux-stuff";
import { Skills } from "../model/Skills";

/**
 * Selects the characters skills from state based on id
 * @param state RootState
 * @param id character id
 */
export const selectSkills = (state: RootState, id: string): Skills => state.characters.skills[id];
