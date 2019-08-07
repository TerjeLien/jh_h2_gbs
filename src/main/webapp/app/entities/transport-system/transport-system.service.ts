import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransportSystem } from 'app/shared/model/transport-system.model';

type EntityResponseType = HttpResponse<ITransportSystem>;
type EntityArrayResponseType = HttpResponse<ITransportSystem[]>;

@Injectable({ providedIn: 'root' })
export class TransportSystemService {
  public resourceUrl = SERVER_API_URL + 'api/transport-systems';

  constructor(protected http: HttpClient) {}

  create(transportSystem: ITransportSystem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transportSystem);
    return this.http
      .post<ITransportSystem>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(transportSystem: ITransportSystem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transportSystem);
    return this.http
      .put<ITransportSystem>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITransportSystem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITransportSystem[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(transportSystem: ITransportSystem): ITransportSystem {
    const copy: ITransportSystem = Object.assign({}, transportSystem, {
      validToDate:
        transportSystem.validToDate != null && transportSystem.validToDate.isValid() ? transportSystem.validToDate.toJSON() : null,
      modDate: transportSystem.modDate != null && transportSystem.modDate.isValid() ? transportSystem.modDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.validToDate = res.body.validToDate != null ? moment(res.body.validToDate) : null;
      res.body.modDate = res.body.modDate != null ? moment(res.body.modDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((transportSystem: ITransportSystem) => {
        transportSystem.validToDate = transportSystem.validToDate != null ? moment(transportSystem.validToDate) : null;
        transportSystem.modDate = transportSystem.modDate != null ? moment(transportSystem.modDate) : null;
      });
    }
    return res;
  }
}
