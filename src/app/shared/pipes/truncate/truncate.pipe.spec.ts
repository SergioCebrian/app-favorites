import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  it('create an instance', () => {
    const pipe = new TruncatePipe();
    expect(pipe).toBeTruthy();
    /*it('transforms "abcdefghijk" to "abcdef..."', () => {
      expect(pipe.transform('abcdefghijk', [])).toBe('abcdef...');
    })*/
  });
});
