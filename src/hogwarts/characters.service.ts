/**
 * Data Model Interfaces
 */

import { Character, BaseCharacter, Gender } from "./character.interface";
import { Characters } from "./items.interface";

/**
 * In-Memory Store
 */

let items: Characters = {
    1: {
        id: 1,
        name: "Harry Potter",
        description: "The Spectacled Hero",
        gender: Gender.Male,
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
    },
    2: {
        id: 2,
        name: "Ronald Weasley",
        gender: Gender.Male,
        description: "Hero's Best Friend",
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
      },
      3: {
        id: 3,
        name: "Hermoine Grainger",
        gender: Gender.Female,
        description: "Very clever girlfriend of Ronald",
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
      }
};

/**
 * Service Methods
 */

export const findAll = async (): Promise<Character[]> => Object.values(items);

export const find = async (id: number): Promise<Character> => items[id];

export const create = async (newItem: BaseCharacter): Promise<Character> => {
    const id = new Date().valueOf();
    
    items[id] = {
        id,
        ...newItem
    }

    return items[id];
}

export const update = async (id: number, update: BaseCharacter): Promise<Character | null> => {
    const item = await find(id);

    if(!item) {
        return null;
    }

    items[id] = { id, ...update };
    return items[id];
}

export const remove = async (id: number): Promise<null | void> => {
    const item = await find(id);

    if(!item) {
        return null;
    }

    delete items[id];
}