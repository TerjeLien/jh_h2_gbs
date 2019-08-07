import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ICompany, Company } from 'app/shared/model/company.model';
import { CompanyService } from './company.service';

@Component({
  selector: 'jhi-company-update',
  templateUrl: './company-update.component.html'
})
export class CompanyUpdateComponent implements OnInit {
  isSaving: boolean;

  companies: ICompany[];

  editForm = this.fb.group({
    id: [],
    code: [],
    name: [],
    shortName: [],
    validFromDate: [],
    validToDate: [],
    modDate: [],
    modUser: [],
    removerCompany: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected companyService: CompanyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ company }) => {
      this.updateForm(company);
    });
    this.companyService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICompany[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICompany[]>) => response.body)
      )
      .subscribe((res: ICompany[]) => (this.companies = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(company: ICompany) {
    this.editForm.patchValue({
      id: company.id,
      code: company.code,
      name: company.name,
      shortName: company.shortName,
      validFromDate: company.validFromDate != null ? company.validFromDate.format(DATE_TIME_FORMAT) : null,
      validToDate: company.validToDate != null ? company.validToDate.format(DATE_TIME_FORMAT) : null,
      modDate: company.modDate != null ? company.modDate.format(DATE_TIME_FORMAT) : null,
      modUser: company.modUser,
      removerCompany: company.removerCompany
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const company = this.createFromForm();
    if (company.id !== undefined) {
      this.subscribeToSaveResponse(this.companyService.update(company));
    } else {
      this.subscribeToSaveResponse(this.companyService.create(company));
    }
  }

  private createFromForm(): ICompany {
    return {
      ...new Company(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      name: this.editForm.get(['name']).value,
      shortName: this.editForm.get(['shortName']).value,
      validFromDate:
        this.editForm.get(['validFromDate']).value != null
          ? moment(this.editForm.get(['validFromDate']).value, DATE_TIME_FORMAT)
          : undefined,
      validToDate:
        this.editForm.get(['validToDate']).value != null ? moment(this.editForm.get(['validToDate']).value, DATE_TIME_FORMAT) : undefined,
      modDate: this.editForm.get(['modDate']).value != null ? moment(this.editForm.get(['modDate']).value, DATE_TIME_FORMAT) : undefined,
      modUser: this.editForm.get(['modUser']).value,
      removerCompany: this.editForm.get(['removerCompany']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompany>>) {
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
