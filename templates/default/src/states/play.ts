import { Stack, State, World } from '@heliks/tiles-engine';


export class Play implements State<World> {

  public onStart(world: World): void {
    console.log('Game started');
  }

  public update(stack: Stack<State<World>>, world: World): void {}

}
