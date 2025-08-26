import { XY } from '@heliks/tiles-engine';
import { Layers } from '@heliks/tiles-pixi';

/** Available render layers. */
export const enum RendererLayer {
  Ground = 'ground',
  Player = 'player',
  Overlay = 'overlay'
}

export function setupRendererLayers(layers: Layers): void {
  layers.add(RendererLayer.Ground);
  layers.add(RendererLayer.Overlay)

  // Depth sorting layer.
  layers
    .after(RendererLayer.Player, RendererLayer.Ground)
    .sortBy((a: XY, b: XY) => a.y - b.y);
}
