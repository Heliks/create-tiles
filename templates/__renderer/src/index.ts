import { AssetsBundle, LoadJSON } from '@heliks/tiles-assets';
import { CoreBundle, runtime, Vec2 } from '@heliks/tiles-engine';
import { LoadTexture, PixiBundle, RendererSchedule } from '@heliks/tiles-pixi';
import { LoadTileset } from '@heliks/tiles-tilemap';
import { UNIT_SIZE } from './common';
import { DynamicResolution, setupRendererLayers } from './renderer';
import { Play } from './states/play';


window.onload = function main() {
  const app = runtime()
    .bundle(new CoreBundle())
    .bundle(
      new AssetsBundle('assets')
        .use(new LoadJSON())
        .use(new LoadTexture())
        .use(new LoadTileset())
    )
    .bundle(new PixiBundle({
      background: 0x45283c,
      layers: setupRendererLayers,
      resolution: new Vec2(180, 320),
      selector: '#stage',
      unitSize: UNIT_SIZE
    }))

  // Scale game resolution with screen size.
  app.system(DynamicResolution, RendererSchedule.Update)

  app
    .build()
    .start(new Play());
};
