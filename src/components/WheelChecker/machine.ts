import { createMachine, assign } from 'xstate';

const initialContext = {
  wheelColor: '',
  checkedRightSpin: false,
  checkedLeftSpin: false,
};
export const wheelCheckerMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHcAWYwBsDC6DGA1mAE4B0AlhJmAMRoaYCCADs2AIbEDaADALqJQzAPaxyAF3LCAdoJAAPRAEYALAHZSalTx4AmHmoCsSgJyGAzEt0AaEAE9EKi6V1m9KgBxqlH3QDZdAF9A23osXDBCElIZAHFiYQBXaQgaZkTxABVhTLhxXgEkEBExSRk5RQRjP1I-Dx0Lbx4TcyNbBwQlQxNakx0lAx4-Qw9zOuDQ9HD8IjIZXNhxGnE8gDFyaXJYdAgCuRKJKVkiyura+p5GgZa2+0RdQw0-c37DPxMlK1U-CZAwnBm0XmeVIi3YdhoYOI4gAyswNgAZMAAM3y-H2okO5RO9z0mm0egMxjMlhsdwQL10pHMBNMun8BhUQRCfymAMisxi0gW4lB4nBkP50LhGwASuQoKg0YUhJiysdQJV9FStDp9EZTBYrO1cUpSEz+jTdGo1DTzB5fv8IlE5tyQbB4dIkajBcJmHsigd5RV7moeNSjHpdB4Qz4xjqEA89SH+s9-H0VOZLWzrZzgYtQY7xZKlos3R7ZaUjj7I36A4YgyGPGG-BGuv6TH5+pdg28VE5gizpMIIHA5FbAcQMUXsYrEABaXQqCOTlTJhip6KUajDrEKhSOMkdJzmTQXB6eXRKE2m+fTDlA6TxJIpVfenEIPx+PWfHRqd48JmNkwRhm1etKM8PCqKeLIDheto8nexYPlOEbPPqFwGMegEvB4PxgSmg5cjyfLgtBo4bggahbsoAT6iY+ifH4TJOE2hhnuyNo4fajrOuIBHrpUYy7gMOhjAE1ytIYv5NvqKhPqMIYCWojGLpBrFihKUqcSWPGkHxPACUezTCXW3SkIY-h+Go9QeBYxpdHJ2EQDIYCqQ+TIRuYlGkEh9JWEZ7aqJ2gRAA */
    predictableActionArguments: true,
    tsTypes: {} as import('./machine.typegen').Typegen0,
    schema: {} as {
      services: {
        getWheelColor: {
          data: string;
        };
      };
    },
    id: 'wheelChecker',
    initial: 'idle',
    states: {
      idle: {
        invoke: {
          id: 'getWheelColor',
          src: 'getWheelColor',
          onDone: {
            actions: 'setWheelColor',
            target: 'onGround',
          },
        },
      },
      onGround: {
        on: {
          putToTest: {
            target: 'onTest',
          },
        },
        always: {
          cond: 'spinsCorrectly',
          target: 'done',
        },
      },
      onTest: {
        initial: 'stay',
        states: {
          stay: {
            on: {
              startSpinLeft: {
                target: 'spinLeft',
              },
              startSpinRight: {
                target: 'spinRight',
              },
              testFinished: {
                target: '#wheelChecker.onGround',
              },
            },
          },
          spinLeft: {
            exit: 'leftSpinChecked',
            on: {
              stop: {
                target: 'stay',
              },
            },
          },
          spinRight: {
            exit: 'rightSpinChecked',
            on: {
              stop: {
                target: 'stay',
              },
            },
          },
        },
      },
      done: {
        entry: 'onWheelCheckFinish',
        on: {
          requestNewWheel: {
            target: 'idle',
          },
        },
      },
    },
    context: {
      ...initialContext,
      checkedWheels: 0,
    },
  },
  {
    actions: {
      leftSpinChecked: assign((context) => ({
        ...context,
        checkedLeftSpin: true,
      })),
      rightSpinChecked: assign((context) => ({
        ...context,
        checkedRightSpin: true,
      })),
      onWheelCheckFinish: assign((context) => ({
        ...initialContext,
        checkedWheels: context.checkedWheels + 1,
      })),
      setWheelColor: assign((ctx, evt) => ({
        ...ctx,
        wheelColor: evt.data,
      })),
    },
    guards: {
      spinsCorrectly: (context) => context.checkedLeftSpin && context.checkedRightSpin,
    },
  },
);
