import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransportSystem } from 'app/shared/model/transport-system.model';

@Component({
  selector: 'jhi-transport-system-detail',
  templateUrl: './transport-system-detail.component.html'
})
export class TransportSystemDetailComponent implements OnInit {
  transportSystem: ITransportSystem;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ transportSystem }) => {
      this.transportSystem = transportSystem;
    });
  }

  previousState() {
    window.history.back();
  }
}
