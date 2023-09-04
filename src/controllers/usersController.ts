import axios from "axios";
import {GetUsers, MonthsEnum} from "../contracts/contracts";

export async function getUsers(): Promise<GetUsers> {
    try {

        return (await axios.get('https://reqres.in/api/users')).data;
    } catch(err: any) {
        throw err;
    }
}
