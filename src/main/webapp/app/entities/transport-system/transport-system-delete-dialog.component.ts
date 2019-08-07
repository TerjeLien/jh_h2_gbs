import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransportSystem } from 'app/shared/model/transport-system.model';
import { TransportSystemService } from './transport-system.service';

@Component({
  selector: 'jhi-transport-system-delete-dialog',
  templateUrl: './transport-system-delete-dialog.component.html'
})
export class TransportSystemDeleteDialogComponent {
  transportSystem: ITransportSystem;

  constructor(
    protected transportSystemService: TransportSystemService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.transportSystemService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'transportSystemListModification',
        content: 'Deleted an transportSystem'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-transport-system-delete-popup',
  template: ''
})
export class TransportSystemDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ transportSystem }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TransportSystemDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.transportSystem = transportSystem;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/transport-system', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/transport-system', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
