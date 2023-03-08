import { assign, createMachine } from 'xstate';

export const textEditorMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUwA8AuBRCBLDA9gE4B0uEANmAMQDKGAhkRgMJFgMa4EB2A2gAYAuolAAHArHzceokGkQBGAGyKSigBwDtygKyKA7If0GANCACeiZQLUCNAZicGBATgAsG5a+UBfX+aomDj4xCRsHFw8UNQRnDIAIrxggiJIIBJSXLxyCggargBMJBpaAoXK3j5euuZWCMqF7iS6js5unt5+ASBB2HiEpHFRMcOJyXyKaeKS0jnpeQ66xQ5likWr9g5mloiexRq6Tk4a7gYFTQ7+gej9oUPs8dEkWEREYQByBK-vRNQ-xAAEgwxGIwDxYKk5Jk5rIFoh9MoWjZyroDLplrpXHVEAZCg4SAZXE53GjTjpCtdercQoNwo8Ri8EgBJZAvAa4aJ0ADu+AAxgALZAEAAK7AAbrgwNyoekYdk4aA8sskYpFLpyrZ9IV1oocQgHEUSIanIUDEsTUSrj0+rSwmNnlgWWzaZyYgBpMAWMVwWCQWUzLIyXKIVYrNYbLSOHb1QqOEjuHyVATHInuZTuKm2gb2hlupmskg+yXSnn8oXfDnRAMZWYKkMII4Ehwo9Vmnyk9z6hzuNTE032LGuRyZm00nOkJI8GgQZJkHjiggAazAJFo4IgwvXRHFYCINflwfhjcK+rVnhaiicrdcmkUlLHwQnJCnND3vxIYgonAAZsQALZrhuW57ru+7CNCdZHkqiAXCUZQVFUyg1PqGhqGcriYchhSak4WbjvcLxvMQzI8AASmAACOACucAYNQaCwIwGCrgwP4sUQAAUGoCAAlNQ2aEQCRCkRRNF0QeUHzDB+RGqU2iIVhKG7Ag94aCQxKYbeaJxtsZr+D0PAEBAcByIJgyQUG0nyIgAC0yj6vZJDaC5Xg6q4GK3qONxPoR5BUJZsINu4p4qTYai6MhSwZumPbqvhvl0g6UCBfWx5xkimy2JGWwxko9gtC2lT4hoTSKLYCV3EleaOsRRCpdBNkGomxoRiVuX6soLbGleFpmmcWiuJVdoPJE+bCSQXzCQ11mLK4Bitdo6ztdG+p4s0Zojuc2mVMNz7JURH7CSwnCCpAM2Kk1yhEhpHkpgIyy3gUa0OBFiFoTYZwPYoe2EQdTqshdDYkot2UrdsZ4+M5KiVOcTSRcSBi-dVY2Os67LSNEQPHoazR6OiKjuC2AhddiKmrM0RKVI0vYaoURzI7mqNQAWbLFlK3LYzJRgEi4Cm2KV+hXt2GgLYUSY0+qqLWj5VVhK+XNNfet6FdoRNGFo94OSp5VIsSiYuHdoulIzpAAGKcrgsACoreRNOpnhLdenhYo0Z6KOmJD004yxmlTJOm4dJHkVRtFMbbeyhfUXjOemyblUs6JLAZvhAA */
    id: 'TextEditor',
    initial: 'idle',
    states: {
      idle: {
        on: {
          StartCreation: {
            target: 'Creating',
          },
        },
      },
      Creating: {
        states: {
          Error: {
            initial: 'NoError',
            states: {
              NoError: {
                on: {
                  ErrorHappens: {
                    target: 'ErrorCatched',
                  },
                },
              },
              ErrorCatched: {},
            },
          },
          EDIT: {
            initial: 'Editing',
            states: {
              Editing: {
                on: {
                  SwitchToPreview: {
                    target: 'Preview',
                  },
                  KeyPressed: {
                    actions: 'UpdateText',
                  },
                },
              },
              Preview: {
                on: {
                  SwitchToEditing: {
                    target: 'Editing',
                  },
                },
              },
            },
          },
        },
        on: {
          CreationDone: [
            {
              target: 'Done',
              cond: 'Length>=100 && Length<=800',
            },
            {
              target: '.Error.ErrorCatched',
              internal: false,
            },
          ],
        },
        type: 'parallel',
      },
      Done: {
        invoke: {
          src: 'SendToServer',
          id: 'SendToServer',
          onDone: [
            {
              target: 'Finish',
              actions: assign((_) => ({ error: null })),
            },
          ],
          onError: [
            {
              target: 'ErrorInRequest',
              actions: assign((_, { data }) => ({ error: data.message })),
            },
          ],
        },
      },
      Finish: {
        type: 'final',
      },
      ErrorInRequest: {
        after: {
          '5000': {
            target: '#TextEditor.Done',
            actions: [],
            internal: false,
          },
        },
      },
    },
    schema: {
      services: {} as {
        SendToServer: {
          data: { message: string | null };
        };
      },
      context: {} as {
        text: string;
        error: string | null;
      },
      events: {} as
        | { type: 'StartCreation' }
        | { type: 'CreationDone' }
        | { type: 'SwitchToPreview' }
        | { type: 'SwitchToEditing' }
        | { type: 'KeyPressed'; payload: string }
        | { type: 'ErrorHappens' },
    },
    context: { text: '', error: null },
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./machine.typegen').Typegen0,
  },
  {
    actions: {
      UpdateText: assign((_, { payload }) => ({ text: payload })),
    },
    guards: {
      'Length>=100 && Length<=800': ({ text }) => text.length >= 100 && text.length <= 800,
    },
  },
);
