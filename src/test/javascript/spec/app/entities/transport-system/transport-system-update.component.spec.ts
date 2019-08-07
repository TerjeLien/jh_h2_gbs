/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhGbsTestModule } from '../../../test.module';
import { TransportSystemUpdateComponent } from 'app/entities/transport-system/transport-system-update.component';
import { TransportSystemService } from 'app/entities/transport-system/transport-system.service';
import { TransportSystem } from 'app/shared/model/transport-system.model';

describe('Component Tests', () => {
  describe('TransportSystem Management Update Component', () => {
    let comp: TransportSystemUpdateComponent;
    let fixture: ComponentFixture<TransportSystemUpdateComponent>;
    let service: TransportSystemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhGbsTestModule],
        declarations: [TransportSystemUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TransportSystemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransportSystemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransportSystemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TransportSystem(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TransportSystem();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
