import { promises as fs } from 'fs';
export const getFake = async (name: string) => {
    return (await fs.readFile(__dirname + `/../fake/${name}`)).toString();
} 