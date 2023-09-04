import {User} from "../models/models";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function login(login: string, password: string) {
    return !!(await User.findOne({where: {login, password}}));
}

export async function register({name, login, password}: {name: string, login: string, password: string}) {
    const userExists = {rows: [1, 2, 3]}; // TODO change to sequelize implementation
    // const userExists = await client.query(`SELECT * FROM users WHERE login = '${login}'`);
    if (userExists.rows.length !== 0) {
        return false;
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        // await client.query(`INSERT INTO users (name, login, password) VALUES (${name}, ${login}, ${hashedPassword}`);
    } catch(err: any) {
        throw new Error(`Error while register: ${err.message}`);
    }
    return true;
}


