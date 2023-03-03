import { useMachine } from '@xstate/react';
import { wheelCheckerMachine } from './machine';

const getRandomPromisedColor = (): Promise<string> => {
  return new Promise((resolve) => setTimeout(resolve, 500, 'red'));
};

const WheelChecker = () => {
  const [state, send] = useMachine(wheelCheckerMachine, {
    services: {
      getWheelColor: async () => await getRandomPromisedColor(),
    },
  });
  return (
    <div>
      {JSON.stringify(state.value)}
      {state.nextEvents.map((evt) => (
        <button
          key={evt}
          onClick={() => {
            send(evt);
          }}
        >
          send ${evt}
        </button>
      ))}
    </div>
  );
};

export default WheelChecker;
