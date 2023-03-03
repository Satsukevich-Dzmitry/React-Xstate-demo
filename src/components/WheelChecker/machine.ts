import { createMachine, assign } from 'xstate';

export const wheelCheckerMachine = createMachine(
  {
    id: 'wheelMachine',
    initial: 'idle',
    states: {
      idle: {
        invoke: {
          src: 'getWheelColor',
          id: 'getColor',
          onDone: [
            {
              actions: 'setWheelColor',
              target: 'On Ground',
            },
          ],
          onError: [
            {
              target: 'Error In Color Request',
            },
          ],
        },
      },
      'On Ground': {
        always: {
          target: 'Done',
          cond: 'wheelTested',
        },
        on: {
          toTest: {
            target: 'onTest',
          },
        },
      },
      'Error In Color Request': {
        after: {
          '500': {
            target: '#wheelMachine.idle',
            actions: [],
            internal: false,
          },
        },
      },
      Done: {
        entry: ['updateWheelsCheckedCount', 'setDefaultContext'],
        on: {
          requestNewWheel: {
            target: 'idle',
          },
        },
      },
      onTest: {
        initial: 'stay',
        states: {
          stay: {
            on: {
              spinLeft: {
                target: 'spinLeft',
              },
              spinRight: {
                target: 'spinRight',
              },
              finishTest: {
                target: '#wheelMachine.On Ground',
                cond: 'wheelTested',
              },
            },
          },
          spinLeft: {
            exit: 'updateLeftSpinCheck',
            on: {
              stopWheel: {
                target: 'stay',
              },
            },
          },
          spinRight: {
            exit: 'updateRightSpinCheck',
            on: {
              stopWheel: {
                target: 'stay',
              },
            },
          },
        },
      },
    },
    schema: {
      context: {} as {
        leftSpinWorks: boolean | null;
        rightSpinWorks: boolean | null;
        brokenWheels: number;
        goodWheels: number;
        wheelColor: string;
      },
      events: {} as
        | { type: 'toTest' }
        | { type: 'spinLeft' }
        | { type: 'spinRight' }
        | { type: 'stopWheel'; payload: boolean }
        | { type: 'finishTest' }
        | { type: 'requestNewWheel' },
      services: {} as {
        getWheelColor: {
          data: string;
        };
      },
    },
    tsTypes: {} as import('./machine.typegen').Typegen0,
    context: {
      leftSpinWorks: null,
      rightSpinWorks: null,
      brokenWheels: 0,
      goodWheels: 0,
      wheelColor: '',
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      setWheelColor: assign((_, event) => ({ wheelColor: event.data })),
      updateLeftSpinCheck: assign((ctx) => ({
        ...ctx,
        leftSpinWorks: Math.random() > 0.1,
      })),
      updateRightSpinCheck: assign((ctx) => ({
        ...ctx,
        rightSpinWorks: Math.random() > 0.1,
      })),
      updateWheelsCheckedCount: assign((ctx) => {
        const wheelIsBroken = !ctx.leftSpinWorks || !ctx.rightSpinWorks;
        if (wheelIsBroken) return { brokenWheels: ctx.brokenWheels + 1 };
        return { goodWheels: ctx.goodWheels + 1 };
      }),
      setDefaultContext: assign((_) => ({
        leftSpinWorks: null,
        rightSpinWorks: null,
        wheelColor: '',
      })),
    },
    guards: {
      wheelTested: (ctx) => ctx.leftSpinWorks !== null && ctx.rightSpinWorks !== undefined,
    },
  },
);
