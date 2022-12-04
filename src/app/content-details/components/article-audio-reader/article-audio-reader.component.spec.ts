import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAudioReaderComponent } from './article-audio-reader.component';

describe('ArticleAudioReaderComponent', () => {
  let component: ArticleAudioReaderComponent;
  let fixture: ComponentFixture<ArticleAudioReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleAudioReaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAudioReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
