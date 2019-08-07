/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TransportSystemService } from 'app/entities/transport-system/transport-system.service';
import { ITransportSystem, TransportSystem } from 'app/shared/model/transport-system.model';

describe('Service Tests', () => {
  describe('TransportSystem Service', () => {
    let injector: TestBed;
    let service: TransportSystemService;
    let httpMock: HttpTestingController;
    let elemDefault: ITransportSystem;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(TransportSystemService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new TransportSystem(0, 'AAAAAAA', 'AAAAAAA', currentDate, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            validToDate: currentDate.format(DATE_TIME_FORMAT),
            modDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a TransportSystem', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            validToDate: currentDate.format(DATE_TIME_FORMAT),
            modDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            validToDate: currentDate,
            modDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new TransportSystem(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a TransportSystem', async () => {
        const returnedFromService = Object.assign(
          {
            code: 'BBBBBB',
            name: 'BBBBBB',
            validToDate: currentDate.format(DATE_TIME_FORMAT),
            modDate: currentDate.format(DATE_TIME_FORMAT),
            modUser: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            validToDate: currentDate,
            modDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of TransportSystem', async () => {
        const returnedFromService = Object.assign(
          {
            code: 'BBBBBB',
            name: 'BBBBBB',
            validToDate: currentDate.format(DATE_TIME_FORMAT),
            modDate: currentDate.format(DATE_TIME_FORMAT),
            modUser: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            validToDate: currentDate,
            modDate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TransportSystem', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
