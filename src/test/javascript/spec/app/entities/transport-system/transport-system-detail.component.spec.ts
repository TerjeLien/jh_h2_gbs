/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhGbsTestModule } from '../../../test.module';
import { TransportSystemDetailComponent } from 'app/entities/transport-system/transport-system-detail.component';
import { TransportSystem } from 'app/shared/model/transport-system.model';

describe('Component Tests', () => {
  describe('TransportSystem Management Detail Component', () => {
    let comp: TransportSystemDetailComponent;
    let fixture: ComponentFixture<TransportSystemDetailComponent>;
    const route = ({ data: of({ transportSystem: new TransportSystem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhGbsTestModule],
        declarations: [TransportSystemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TransportSystemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TransportSystemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.transportSystem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
