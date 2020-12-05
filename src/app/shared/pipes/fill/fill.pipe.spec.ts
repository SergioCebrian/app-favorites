import { FillPipe } from './fill.pipe';

describe('FillPipe', () => {

  const pipe = new FillPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('must return [1,1,1,1]', () => {
    expect(pipe.transform(4)).toEqual([1,1,1,1])
  });
});
