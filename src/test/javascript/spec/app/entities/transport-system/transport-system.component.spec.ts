/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhGbsTestModule } from '../../../test.module';
import { TransportSystemComponent } from 'app/entities/transport-system/transport-system.component';
import { TransportSystemService } from 'app/entities/transport-system/transport-system.service';
import { TransportSystem } from 'app/shared/model/transport-system.model';

describe('Component Tests', () => {
  describe('TransportSystem Management Component', () => {
    let comp: TransportSystemComponent;
    let fixture: ComponentFixture<TransportSystemComponent>;
    let service: TransportSystemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhGbsTestModule],
        declarations: [TransportSystemComponent],
        providers: []
      })
        .overrideTemplate(TransportSystemComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransportSystemComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransportSystemService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TransportSystem(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.transportSystems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
