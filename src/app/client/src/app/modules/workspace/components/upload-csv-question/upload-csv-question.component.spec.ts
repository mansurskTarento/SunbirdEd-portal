import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCsvQuestionComponent } from './upload-csv-question.component';

describe('UploadCsvQuestionComponent', () => {
  let component: UploadCsvQuestionComponent;
  let fixture: ComponentFixture<UploadCsvQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCsvQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCsvQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
