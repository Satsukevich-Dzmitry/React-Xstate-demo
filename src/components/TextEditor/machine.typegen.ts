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
    'xstate.after(IncrementalRetry)#TextEditor.ErrorInRequest': {
      type: 'xstate.after(IncrementalRetry)#TextEditor.ErrorInRequest';
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
    incrementRetryCount: 'xstate.after(IncrementalRetry)#TextEditor.ErrorInRequest';
  };
  eventsCausingDelays: {
    IncrementalRetry: 'error.platform.SendToServer';
  };
  eventsCausingGuards: {
    'Length>=100 && Length<=800': 'CreationDone';
  };
  eventsCausingServices: {
    SendToServer: 'CreationDone' | 'xstate.after(IncrementalRetry)#TextEditor.ErrorInRequest';
  };
  matchesStates:
    | 'Creating'
    | 'Creating.EDIT'
    | 'Creating.EDIT.Editing'
    | 'Creating.EDIT.Preview'
    | 'Creating.ERROR'
    | 'Creating.ERROR.ErrorCatched'
    | 'Creating.ERROR.NoError'
    | 'Done'
    | 'ErrorInRequest'
    | 'Finish'
    | 'idle'
    | {
        Creating?:
          | 'EDIT'
          | 'ERROR'
          | { EDIT?: 'Editing' | 'Preview'; ERROR?: 'ErrorCatched' | 'NoError' };
      };
  tags: never;
}
