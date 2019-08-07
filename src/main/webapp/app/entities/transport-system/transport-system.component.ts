import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITransportSystem } from 'app/shared/model/transport-system.model';
import { AccountService } from 'app/core';
import { TransportSystemService } from './transport-system.service';

@Component({
  selector: 'jhi-transport-system',
  templateUrl: './transport-system.component.html'
})
export class TransportSystemComponent implements OnInit, OnDestroy {
  transportSystems: ITransportSystem[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected transportSystemService: TransportSystemService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.transportSystemService
      .query()
      .pipe(
        filter((res: HttpResponse<ITransportSystem[]>) => res.ok),
        map((res: HttpResponse<ITransportSystem[]>) => res.body)
      )
      .subscribe(
        (res: ITransportSystem[]) => {
          this.transportSystems = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTransportSystems();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITransportSystem) {
    return item.id;
  }

  registerChangeInTransportSystems() {
    this.eventSubscriber = this.eventManager.subscribe('transportSystemListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
