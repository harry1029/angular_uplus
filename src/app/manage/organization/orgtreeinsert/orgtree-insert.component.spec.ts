import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgtreeInsertComponent } from './orgtree-insert.component';

describe('OrgtreeInsertComponent', () => {
  let component: OrgtreeInsertComponent;
  let fixture: ComponentFixture<OrgtreeInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgtreeInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgtreeInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
