import crypto from 'crypto'

export default class BadgerBudDetail {
    id: string;
    name: string;
    age: number;
    breed: string;
    gender: string;
    colors: string[];
    spayed: boolean;
    neutered: boolean;
    declawed: boolean;
    imgIds: string[];
    description?: string;

    public constructor(
        name: string,
        age: number,
        breed: string,
        gender: string,
        colors: string[],
        spayed: boolean,
        neutered: boolean,
        declawed: boolean,
        imgIds: string[],
        description?: string
    ) {
        this.id = crypto.createHash('sha256').update(name + String(age) + gender).digest('hex').substring(0, 32);
        this.name = name;
        this.age = age;
        this.breed = breed;
        this.gender = gender;
        this.colors = [...colors];
        this.spayed = spayed;
        this.neutered = neutered;
        this.declawed = declawed;
        this.imgIds = [...imgIds];
        this.description = description;
    }
}