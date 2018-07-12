import fs from 'fs';

describe('blabla', () => {
    it('blabla', () => {
        const value = fs.readFileSync('.gitignore');
        expect(value.toString()).toEqual('blabla');
    });
});
