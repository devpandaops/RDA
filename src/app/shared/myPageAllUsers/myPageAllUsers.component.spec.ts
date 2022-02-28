import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPageAllUsersComponent } from './myPageAllUsers.component';

describe('MyPageAllUsersComponent', () => {
  let component: MyPageAllUsersComponent;
  let fixture: ComponentFixture<MyPageAllUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPageAllUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPageAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
