import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatModelComponent } from './chat-model.component';

describe('ChatModelComponent', () => {
  let component: ChatModelComponent;
  let fixture: ComponentFixture<ChatModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
