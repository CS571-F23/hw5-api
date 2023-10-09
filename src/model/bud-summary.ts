import crypto from 'crypto';

export default class BadgerBudSummary {
    id: string;
    name: string;
    age: number;
    gender: string;
    imgId: string;

    public constructor(name: string, age: number, gender: string, imgId: string) {
        this.id = crypto.createHash('sha256').update(name + String(age) + gender).digest('hex').substring(0, 32);
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.imgId = imgId;
    }
}