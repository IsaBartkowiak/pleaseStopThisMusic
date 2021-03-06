import { IndicationPipe } from './indication.pipe';

describe('IndicationPipe', () => {
    it('create an instance', () => {
        const pipe = new IndicationPipe();
        expect(pipe).toBeTruthy();
    });

    it('should return start text if null value is passed', () => {
        const pipe = new IndicationPipe();
        expect(pipe.transform(null)).toBe('Click to stop this music');
    });

    it('should return BURNING if distance is < 30', () => {
        const pipe = new IndicationPipe();
        expect(pipe.transform(29)).toBe('Burning');
    });

    it('should return GLACIAL if distance is > 500', () => {
        const pipe = new IndicationPipe();
        expect(pipe.transform(550)).toBe('Glacial');
    });

    it('should return TEPID if distance is > 200', () => {
        const pipe = new IndicationPipe();
        expect(pipe.transform(250)).toBe('Tepid');
    });

    it('should stop if wrong format', () => {
        const pipe = new IndicationPipe();
        expect(pipe.transform(250, 'test')).toBeFalsy();
    });

    it('should return good format', () => {
        const pipe = new IndicationPipe();
        expect(pipe.transform(250, 'human')).toBe('Tepid');
        expect(pipe.transform(250, 'class')).toBe('tepid');
    });

});
