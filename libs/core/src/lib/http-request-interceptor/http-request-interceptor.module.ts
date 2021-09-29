// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * Http Request Interceptor
 */
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MsalInterceptor } from '../../msal/msal-interceptor';
import { RenderLabelPipe } from '../../pipe/render-label/render-label.pipe';

import { HttpRequestInterceptor } from './http-request.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    RenderLabelPipe,
  ],
})
export class HttpRequestInterceptorModule {}
