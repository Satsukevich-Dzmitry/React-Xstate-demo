// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.SendToServer': {
      type: 'done.invoke.SendToServer';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.SendToServer': { type: 'error.platform.SendToServer'; data: unknown };
    'xstate.after(5000)#TextEditor.ErrorInRequest': {
      type: 'xstate.after(5000)#TextEditor.ErrorInRequest';
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    SendToServer: 'done.invoke.SendToServer';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: 'SendToServer';
  };
  eventsCausingActions: {
    UpdateText: 'KeyPressed';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    'Length>=100 && Length<=800': 'CreationDone';
  };
  eventsCausingServices: {
    SendToServer: 'CreationDone' | 'xstate.after(5000)#TextEditor.ErrorInRequest';
  };
  matchesStates:
    | 'Creating'
    | 'Creating.EDIT'
    | 'Creating.EDIT.Editing'
    | 'Creating.EDIT.Preview'
    | 'Creating.Error'
    | 'Creating.Error.ErrorCatched'
    | 'Creating.Error.NoError'
    | 'Done'
    | 'ErrorInRequest'
    | 'Finish'
    | 'idle'
    | {
        Creating?:
          | 'EDIT'
          | 'Error'
          | { EDIT?: 'Editing' | 'Preview'; Error?: 'ErrorCatched' | 'NoError' };
      };
  tags: never;
}
