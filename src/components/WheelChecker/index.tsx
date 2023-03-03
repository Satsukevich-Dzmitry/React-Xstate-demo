import { useMachine } from '@xstate/react';
import { wheelCheckerMachine } from './machine';

const COLORS = ['red', 'blue', 'black'];

const getRandomPromisedColor = (): Promise<string> => {
  return new Promise((resolve) =>
    setTimeout(resolve, 500, COLORS[Math.floor(Math.random() * COLORS.length)]),
  );
};

const OnTestControls = () => {
  return (
    <div>
      <button>ttt</button>
    </div>
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
      <h2>Wheels checked {state.context.checkedWheels}</h2>
      {JSON.stringify(state.value)}
      <br />
      {JSON.stringify(state.context)}
      <br />
      {state.matches('idle') && <div>Waiting for wheel</div>}
      {state.matches('onGround') && <button onClick={() => send('putToTest')}>Put to test</button>}
      {state.matches('onTest') && (
        <div>
          <button disabled={!state.nextEvents.includes('stop')} onClick={() => send('stop')}>
            Stop
          </button>
          <button
            disabled={!state.nextEvents.includes('startSpinRight')}
            onClick={() => {
              send('startSpinRight');
            }}
          >
            Spin Right
          </button>
          <button
            disabled={!state.nextEvents.includes('startSpinLeft')}
            onClick={() => {
              send('startSpinLeft');
            }}
          >
            Spin Left
          </button>
          <button
            disabled={!state.nextEvents.includes('testFinished')}
            onClick={() => {
              send('testFinished');
            }}
          >
            Finish Test
          </button>
        </div>
      )}
      {state.matches('done') && (
        <div>
          <button onClick={() => send('requestNewWheel')}>New wheel</button>
        </div>
      )}
    </div>
  );
};

export default WheelChecker;
