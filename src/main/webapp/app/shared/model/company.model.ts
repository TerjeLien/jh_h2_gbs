import { Moment } from 'moment';
import { ICompany } from 'app/shared/model/company.model';

export interface ICompany {
  id?: number;
  code?: string;
  name?: string;
  shortName?: string;
  validFromDate?: Moment;
  validToDate?: Moment;
  modDate?: Moment;
  modUser?: string;
  removerCompany?: ICompany;
}

export class Company implements ICompany {
  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
    public shortName?: string,
    public validFromDate?: Moment,
    public validToDate?: Moment,
    public modDate?: Moment,
    public modUser?: string,
    public removerCompany?: ICompany
  ) {}
}
