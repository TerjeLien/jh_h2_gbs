import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JhGbsSharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [JhGbsSharedCommonModule],
  declarations: [HasAnyAuthorityDirective],
  exports: [JhGbsSharedCommonModule, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhGbsSharedModule {
  static forRoot() {
    return {
      ngModule: JhGbsSharedModule
    };
  }
}
