import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ITransportSystem, TransportSystem } from 'app/shared/model/transport-system.model';
import { TransportSystemService } from './transport-system.service';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company';

@Component({
  selector: 'jhi-transport-system-update',
  templateUrl: './transport-system-update.component.html'
})
export class TransportSystemUpdateComponent implements OnInit {
  isSaving: boolean;

  companies: ICompany[];

  editForm = this.fb.group({
    id: [],
    code: [],
    name: [],
    validToDate: [],
    modDate: [],
    modUser: [],
    company: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected transportSystemService: TransportSystemService,
    protected companyService: CompanyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ transportSystem }) => {
      this.updateForm(transportSystem);
    });
    this.companyService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICompany[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICompany[]>) => response.body)
      )
      .subscribe((res: ICompany[]) => (this.companies = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(transportSystem: ITransportSystem) {
    this.editForm.patchValue({
      id: transportSystem.id,
      code: transportSystem.code,
      name: transportSystem.name,
      validToDate: transportSystem.validToDate != null ? transportSystem.validToDate.format(DATE_TIME_FORMAT) : null,
      modDate: transportSystem.modDate != null ? transportSystem.modDate.format(DATE_TIME_FORMAT) : null,
      modUser: transportSystem.modUser,
      company: transportSystem.company
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const transportSystem = this.createFromForm();
    if (transportSystem.id !== undefined) {
      this.subscribeToSaveResponse(this.transportSystemService.update(transportSystem));
    } else {
      this.subscribeToSaveResponse(this.transportSystemService.create(transportSystem));
    }
  }

  private createFromForm(): ITransportSystem {
    return {
      ...new TransportSystem(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      name: this.editForm.get(['name']).value,
      validToDate:
        this.editForm.get(['validToDate']).value != null ? moment(this.editForm.get(['validToDate']).value, DATE_TIME_FORMAT) : undefined,
      modDate: this.editForm.get(['modDate']).value != null ? moment(this.editForm.get(['modDate']).value, DATE_TIME_FORMAT) : undefined,
      modUser: this.editForm.get(['modUser']).value,
      company: this.editForm.get(['company']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransportSystem>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCompanyById(index: number, item: ICompany) {
    return item.id;
  }
}
