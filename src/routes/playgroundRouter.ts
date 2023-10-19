import express, {Request, Response} from "express";
import fs from "fs";

export const playgroundRouter = express.Router();

class Person {
    protected nationality: string;
    private age: number;
    constructor(nationality: string, age: number) {
        this.nationality = nationality;
        this.age = age;
    }
    public getNationality() {
        return `Nationality of this person is ${this.nationality}`;
    }
}

class Student extends Person {
    public degree: string;

    constructor(nationality: string, age: number, degree: string) {
        super(nationality, age);
        this.degree = degree;
    }

    public getNationality(): string {
        return `Nationality of this student is ${this.nationality}`;
    }
}

playgroundRouter.get('/oop', async (request, response) => {
    const kyrylo = new Person('Ukrainian', 26);
    const nationality = kyrylo.getNationality();

    const kyryloStudent = new Student('Ukrainian', 26, 'master');
    const nationalityStudent = kyryloStudent.getNationality();

    response.send({nationality, nationalityStudent});
})


playgroundRouter.get('/streams', async(request: Request, response: Response) => {
    const readStream = fs.createReadStream('streamTest.txt', {encoding: 'utf8'});

    let text: any = [];
    readStream.on('data', (data) => {
        text.push(data.toString());
    })
    readStream.on('error', (err) => {
        console.log("error", err);
    })
    readStream.on('end', () => {
        console.log("file has been successfully raed");
    })
    console.log("function end");
    readStream.pipe(response);
})
