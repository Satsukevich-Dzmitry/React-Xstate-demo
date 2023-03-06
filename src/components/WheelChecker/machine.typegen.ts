// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'done.invoke.getColor': {
      type: 'done.invoke.getColor';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.getColor': { type: 'error.platform.getColor'; data: unknown };
    'xstate.after(500)#wheelMachine.Error In Color Request': {
      type: 'xstate.after(500)#wheelMachine.Error In Color Request';
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    getWheelColor: 'done.invoke.getColor';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: 'getWheelColor';
  };
  eventsCausingActions: {
    setDefaultContext: '';
    setWheelColor: 'done.invoke.getColor';
    thankForTest: 'requestNewWheel';
    updateLeftSpinCheck: 'stopWheel';
    updateRightSpinCheck: 'stopWheel';
    updateWheelsCheckedCount: '';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    wheelTested: '' | 'finishTest';
  };
  eventsCausingServices: {
    getWheelColor:
      | 'requestNewWheel'
      | 'xstate.after(500)#wheelMachine.Error In Color Request'
      | 'xstate.init';
  };
  matchesStates:
    | 'Done'
    | 'Error In Color Request'
    | 'On Ground'
    | 'idle'
    | 'onTest'
    | 'onTest.spinLeft'
    | 'onTest.spinRight'
    | 'onTest.stay'
    | { onTest?: 'spinLeft' | 'spinRight' | 'stay' };
  tags: 'noWheel';
}
