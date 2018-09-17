import { IndicationPipe } from './indication.pipe';

describe('IndicationPipe', () => {
  it('create an instance', () => {
    const pipe = new IndicationPipe();
    expect(pipe).toBeTruthy();
});
  
  it('should return if null value is passed', () => {
    const pipe = new IndicationPipe();
    expect(pipe.transform(null)).toBeFalsy();
});
  
  it('should return BURNING if distance is < 30', () => {
    const pipe = new IndicationPipe();
    expect(pipe.transform(29)).toBe("Burning");
});
  
  it('should return GLACIAL if distance is > 500', () => {
    const pipe = new IndicationPipe();
    expect(pipe.transform(550)).toBe("Glacial");
});
  
    it('should return TEPID if distance is > 200', () => {
    const pipe = new IndicationPipe();
    expect(pipe.transform(250)).toBe("Tepid");
});
  
});
