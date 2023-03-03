// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'done.invoke.getWheelColor': {
      type: 'done.invoke.getWheelColor';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.getWheelColor': { type: 'error.platform.getWheelColor'; data: unknown };
    'xstate.init': { type: 'xstate.init' };
    'xstate.stop': { type: 'xstate.stop' };
  };
  invokeSrcNameMap: {
    getWheelColor: 'done.invoke.getWheelColor';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: 'getWheelColor';
  };
  eventsCausingActions: {
    leftSpinChecked: 'stop' | 'xstate.stop';
    onWheelCheckFinish: '';
    rightSpinChecked: 'stop' | 'xstate.stop';
    setWheelColor: 'done.invoke.getWheelColor';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    spinsCorrectly: '';
  };
  eventsCausingServices: {
    getWheelColor: 'requestNewWheel' | 'xstate.init';
  };
  matchesStates:
    | 'done'
    | 'idle'
    | 'onGround'
    | 'onTest'
    | 'onTest.spinLeft'
    | 'onTest.spinRight'
    | 'onTest.stay'
    | { onTest?: 'spinLeft' | 'spinRight' | 'stay' };
  tags: never;
}
