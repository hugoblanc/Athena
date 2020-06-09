import { Post } from './post';
import { postMock } from '../../../../testing/postMock';


describe('Post', () => {
  it('should create an instance', () => {
    expect(new Post(postMock)).toBeTruthy();
  });
});
