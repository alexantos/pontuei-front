import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoComponent } from './selecao.component';

describe('SelecaoComponent', () => {
  let component: SelecaoComponent;
  let fixture: ComponentFixture<SelecaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
