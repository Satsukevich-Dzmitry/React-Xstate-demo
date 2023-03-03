import { useMachine } from '@xstate/react';
import { wheelCheckerMachine } from './machine';

const COLORS = ['red', 'blue', 'black'];

const getRandomPromisedColor = (): Promise<string> => {
  return new Promise((resolve) =>
    setTimeout(resolve, 500, COLORS[Math.floor(Math.random() * COLORS.length)]),
  );
};

const WheelChecker = () => {
  const [state, send] = useMachine(wheelCheckerMachine, {
    services: {
      getWheelColor: async () => await getRandomPromisedColor(),
    },
  });
  return (
    <div>
      {JSON.stringify(state.context)}
      <div>
        <h2>Stats</h2>
        <p>Good wheels: {state.context.goodWheels}</p>
        <p>Broken wheels: {state.context.brokenWheels}</p>
        <p>Currently working on {state.context.wheelColor} wheel</p>
      </div>
      {state.matches('Error In Color Request') && <div>Retrying</div>}
      {state.matches('idle') && <div>Awaiting for wheel</div>}
      {state.matches('On Ground') && (
        <>
          <div>On the ground</div>
          <button onClick={() => send('toTest')}>Start tests</button>
        </>
      )}
      {state.matches('onTest') && (
        <div>
          On Test
          <button
            onClick={() => {
              send('spinLeft');
            }}
            disabled={!state.nextEvents.includes('spinLeft')}
          >
            Spin Left
          </button>
          <button
            onClick={() => {
              send('stopWheel');
            }}
            disabled={!state.nextEvents.includes('stopWheel')}
          >
            Stop
          </button>
          <button
            onClick={() => {
              send('spinRight');
            }}
            disabled={!state.nextEvents.includes('spinRight')}
          >
            Spin Right
          </button>
          <button
            onClick={() => {
              send('finishTest');
            }}
            disabled={!state.nextEvents.includes('finishTest')}
          >
            End test
          </button>
        </div>
      )}
      {state.matches('Done') && (
        <div>
          <button
            onClick={() => {
              send('requestNewWheel');
            }}
          >
            Next wheel
          </button>
        </div>
      )}
    </div>
  );
};

export default WheelChecker;
