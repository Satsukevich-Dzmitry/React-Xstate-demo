import { useMachine } from '@xstate/react';
import { Wheel, WheelProps } from '../Wheel';
import { wheelCheckerMachine } from './machine';
import './index.css';
import { ReactElement } from 'react';
import { Statistics } from './Stats';

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

  const getCurrentStepLabel = (): ReactElement => {
    switch (true) {
      case state.matches('idle'):
        return <p>Awaiting for wheel</p>;
      case state.matches('Error In Color Request'):
        return (
          <div>
            <p style={{ color: 'red' }}>Error while awaiting for wheel</p>
            <p>Retrying</p>
          </div>
        );
      case state.matches('On Ground'):
        return <p>Wheel on the ground</p>;
      case state.matches('onTest.stay'):
        return <p>Stays on test</p>;
      case state.matches('onTest.spinLeft'):
        return <p>Testing left spinning</p>;
      case state.matches('onTest.spinRight'):
        return <p>Test right spinning</p>;
      case state.matches('Done'):
        return <p>Check done</p>;
      default:
        return <p>unknown</p>;
    }
  };

  const getWheelPosition: () => WheelProps['position'] = () => {
    switch (true) {
      case state.matches('On Ground'):
        return { top: 85, left: 50 };
      case state.matches('onTest'):
        return { top: 50, left: 50 };
      case state.matches('Done'):
        return { top: 85, left: 200 };
      default:
        return { top: 85, left: 0 };
    }
  };

  const wheelProps: WheelProps = {
    position: getWheelPosition(),
    shouldShow: !state.hasTag('noWheel'),
    color: state.context.wheelColor,
    spinsRight: state.matches('onTest.spinRight'),
    spinsLeft: state.matches('onTest.spinLeft'),
  };

  return (
    <div className='scene'>
      {JSON.stringify(state.context)}
      <Wheel {...wheelProps} />
      <Statistics {...state.context} />
      <div>
        <h2>Current Step</h2>
        {getCurrentStepLabel()}
      </div>
      <div className='controls'>
        {state.matches('On Ground') && (
          <>
            <button onClick={() => send('toTest')}>Start tests</button>
          </>
        )}
        {state.matches('onTest') && (
          <div>
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
                send({ type: 'stopWheel', result: Math.random() > 0.1 });
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
                send({ type: 'requestNewWheel', message: 'Good work. Keep this pace' });
              }}
            >
              Next wheel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WheelChecker;
