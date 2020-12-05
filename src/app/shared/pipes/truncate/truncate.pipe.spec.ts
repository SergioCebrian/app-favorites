import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();
  
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "Testing Truncate Pipe" to "Testing "', () => {
    expect(pipe.transform('Testing Truncate Pipe', [7])).toBe('Testing ');
  });
});
