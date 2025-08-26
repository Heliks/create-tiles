import { CoreBundle, runtime } from '@heliks/tiles-engine';
import { Play } from './states/play';


window.onload = function main() {
  const app = runtime().bundle(new CoreBundle());

  app
    .build()
    .start(new Play());
};
