import {Composition} from 'remotion';
import {SperowPromo} from './SperowPromo';

const durationInFrames = 1465;

export const Root = () => {
  return (
    <Composition
      id="SperowPromo"
      component={SperowPromo}
      durationInFrames={durationInFrames}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
