import { Moment } from 'moment';
import { ICompany } from 'app/shared/model/company.model';

export interface ITransportSystem {
  id?: number;
  code?: string;
  name?: string;
  validToDate?: Moment;
  modDate?: Moment;
  modUser?: string;
  company?: ICompany;
}

export class TransportSystem implements ITransportSystem {
  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
    public validToDate?: Moment,
    public modDate?: Moment,
    public modUser?: string,
    public company?: ICompany
  ) {}
}
