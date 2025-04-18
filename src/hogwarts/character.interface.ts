export interface BaseCharacter {
    name: string;
    gender: Gender;
    description: string;
    image: string;
}

export interface Character extends BaseCharacter {
    id: number;
}

export enum Gender {
    Male,
    Female,
    PreferNotToSay
}