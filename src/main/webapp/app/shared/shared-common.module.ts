import { NgModule } from '@angular/core';

import { Vdemo8SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [Vdemo8SharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [Vdemo8SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class Vdemo8SharedCommonModule {}
