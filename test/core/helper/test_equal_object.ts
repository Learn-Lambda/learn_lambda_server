import { expect } from 'chai';
export const testEqualObject = (obj: any, equalObj: any) => {
    expect(JSON.stringify(obj)).equal(JSON.stringify(equalObj));
}