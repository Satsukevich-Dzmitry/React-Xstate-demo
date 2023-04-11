import { createMachine, sendTo, sendParent } from 'xstate';

const Recorder = createMachine(
  {
    id: 'recorder',
    initial: 'notWorking',
    states: {
      working: {
        after: {
          5000: {
            actions: [
              sendParent('RECORD_DONE'),
              () => {
                alert('record stopped');
              },
            ],
          },
        },
      },
      notWorking: {
        on: {
          TurnOn: {
            target: 'working',
            actions: 'startRecording',
          },
        },
      },
    },
  },
  {
    actions: {
      startRecording: () => {
        alert('record start');
      },
    },
  },
);

export const Page = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcCGMB0AbA9qiAlgHZQDEAMgPICCAIgKK0DaADALqIo6wEAuBOIpxAAPRAEYAbOIziAHC0UsAzCwCs4gOxrNcgDQgAnhK0YALHIBMalXICcLO3fGXxAXzcG0mXPkikAJXoAYUoA2gB9WkoAOXpWDiQQZG4+ASEksQQzCww7TUUpM007MztLSwNjBHFTC2tbBycXdw8DIhwIOGFvMB7U-kFhLIBaSSrEMbbk9DBsPEISfp5BjNAss0qjE008yW0WMxtxZU3NTWne+b8IZbShzMRLOTM88SVlSUlXRzMJhDkMgsH2UakkdmUn0uswwYBEfEgd1Ww0Q32UGEsdhsz0kckkaksp3+tUkGE0FRsn2+7whcg8HiAA */
  id: 'page',
  initial: 'loading',
  states: {
    loading: {
      on: {
        LOADED: {
          target: 'loaded',
        },
      },
    },
    loaded: {
      invoke: {
        id: 'recorder',
        src: Recorder,
      },
      entry: sendTo('recorder', { type: 'TurnOn' }),
      on: {
        RECORD_DONE: {
          target: 'exited',
        },
      },
    },
    exited: {
      entry: () => {
        alert('machine stopped');
      },
      type: 'final',
    },
  },
});
