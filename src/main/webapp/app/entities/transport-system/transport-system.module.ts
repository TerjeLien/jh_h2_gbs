import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhGbsSharedModule } from 'app/shared';
import {
  TransportSystemComponent,
  TransportSystemDetailComponent,
  TransportSystemUpdateComponent,
  TransportSystemDeletePopupComponent,
  TransportSystemDeleteDialogComponent,
  transportSystemRoute,
  transportSystemPopupRoute
} from './';

const ENTITY_STATES = [...transportSystemRoute, ...transportSystemPopupRoute];

@NgModule({
  imports: [JhGbsSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TransportSystemComponent,
    TransportSystemDetailComponent,
    TransportSystemUpdateComponent,
    TransportSystemDeleteDialogComponent,
    TransportSystemDeletePopupComponent
  ],
  entryComponents: [
    TransportSystemComponent,
    TransportSystemUpdateComponent,
    TransportSystemDeleteDialogComponent,
    TransportSystemDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhGbsTransportSystemModule {}
