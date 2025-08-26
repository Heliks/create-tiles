import { System, Injectable, World } from '@heliks/tiles-engine';
import { Screen } from '@heliks/tiles-pixi';


/**
 * Dynamically resizes the renderer resolution to fit the available screen size.
 *
 * When the renderer is resized, the {@link Screen} is normally scaled to fit into the
 * available size while retaining the original resolution. Dynamic resolution will
 * disable that scaling.
 */
@Injectable()
export class DynamicResolution implements System {

  constructor(public readonly screen: Screen) {}
  
  /** @inheritDoc */
  public update(world: World): void {
    this.screen.resolution.x = this.screen.size.x;
    this.screen.resolution.y = this.screen.size.y;

    this.screen.scale.x = 1;
    this.screen.scale.y = 1;
  }

}
