import { NgModule } from '@angular/core';

import { JhGbsSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [JhGbsSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [JhGbsSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhGbsSharedCommonModule {}
