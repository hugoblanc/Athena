import { NgModule } from '@angular/core';
import { ImageProxyPipe } from './image-proxy.pipe';

/**
 * Pipes transverses réutilisables. Importer ce module dans une feature pour
 * disposer de `| imageProxy` (et des futurs pipes communs).
 */
@NgModule({
  declarations: [ImageProxyPipe],
  exports: [ImageProxyPipe],
})
export class PipesModule {}
