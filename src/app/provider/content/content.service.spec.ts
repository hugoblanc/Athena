import { TestBed } from '@angular/core/testing';
import { Post } from '../../models/content/wordpress/post';
import { MetaMediaService } from '../meta-media/meta-media.service';
import { ContentService } from './content.service';


describe('ContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({providers: [MetaMediaService]}));

  it('should be created', () => {
    const service: ContentService<Post> = TestBed.get(ContentService);
    expect(service).toBeTruthy();
  });
});
