import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TransportSystem } from 'app/shared/model/transport-system.model';
import { TransportSystemService } from './transport-system.service';
import { TransportSystemComponent } from './transport-system.component';
import { TransportSystemDetailComponent } from './transport-system-detail.component';
import { TransportSystemUpdateComponent } from './transport-system-update.component';
import { TransportSystemDeletePopupComponent } from './transport-system-delete-dialog.component';
import { ITransportSystem } from 'app/shared/model/transport-system.model';

@Injectable({ providedIn: 'root' })
export class TransportSystemResolve implements Resolve<ITransportSystem> {
  constructor(private service: TransportSystemService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITransportSystem> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TransportSystem>) => response.ok),
        map((transportSystem: HttpResponse<TransportSystem>) => transportSystem.body)
      );
    }
    return of(new TransportSystem());
  }
}

export const transportSystemRoute: Routes = [
  {
    path: '',
    component: TransportSystemComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TransportSystems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TransportSystemDetailComponent,
    resolve: {
      transportSystem: TransportSystemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TransportSystems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TransportSystemUpdateComponent,
    resolve: {
      transportSystem: TransportSystemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TransportSystems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TransportSystemUpdateComponent,
    resolve: {
      transportSystem: TransportSystemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TransportSystems'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const transportSystemPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TransportSystemDeletePopupComponent,
    resolve: {
      transportSystem: TransportSystemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TransportSystems'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
