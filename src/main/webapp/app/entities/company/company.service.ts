import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompany } from 'app/shared/model/company.model';

type EntityResponseType = HttpResponse<ICompany>;
type EntityArrayResponseType = HttpResponse<ICompany[]>;

@Injectable({ providedIn: 'root' })
export class CompanyService {
  public resourceUrl = SERVER_API_URL + 'api/companies';

  constructor(protected http: HttpClient) {}

  create(company: ICompany): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(company);
    return this.http
      .post<ICompany>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(company: ICompany): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(company);
    return this.http
      .put<ICompany>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICompany>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICompany[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(company: ICompany): ICompany {
    const copy: ICompany = Object.assign({}, company, {
      validFromDate: company.validFromDate != null && company.validFromDate.isValid() ? company.validFromDate.toJSON() : null,
      validToDate: company.validToDate != null && company.validToDate.isValid() ? company.validToDate.toJSON() : null,
      modDate: company.modDate != null && company.modDate.isValid() ? company.modDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.validFromDate = res.body.validFromDate != null ? moment(res.body.validFromDate) : null;
      res.body.validToDate = res.body.validToDate != null ? moment(res.body.validToDate) : null;
      res.body.modDate = res.body.modDate != null ? moment(res.body.modDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((company: ICompany) => {
        company.validFromDate = company.validFromDate != null ? moment(company.validFromDate) : null;
        company.validToDate = company.validToDate != null ? moment(company.validToDate) : null;
        company.modDate = company.modDate != null ? moment(company.modDate) : null;
      });
    }
    return res;
  }
}
