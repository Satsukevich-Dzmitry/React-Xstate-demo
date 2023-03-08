import { useMachine } from '@xstate/react';
import { textEditorMachine } from './machine';

const pretendThatWeSendTextToServer = async (): Promise<{ message: string }> => {
  return await new Promise((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({ message: 'Success' });
      }
      reject({ message: 'Error Blabla' });
    }, 500),
  );
};

export const TextEditor = () => {
  const [state, send] = useMachine(textEditorMachine, {
    services: {
      SendToServer: pretendThatWeSendTextToServer,
    },
  });

  return (
    <div>
      {JSON.stringify(state.value)}
      {JSON.stringify(state.context)}
      {state.matches('idle') && (
        <button
          onClick={() => {
            send({ type: 'StartCreation' });
          }}
        >
          CreatePost
        </button>
      )}
      {state.matches('Creating') && (
        <form
          style={{
            border: state.matches('Creating.Error.ErrorCatched')
              ? '1px solid red'
              : '1px solid black',
          }}
          onSubmit={(e) => {
            e.preventDefault();
            send('CreationDone');
          }}
        >
          {state.matches('Creating.EDIT.Editing') && (
            <div>
              <textarea
                value={state.context.text}
                onChange={(e) => {
                  send({ type: 'KeyPressed', payload: e.target.value });
                }}
              ></textarea>
              <button onClick={() => send({ type: 'SwitchToPreview' })}>Preview</button>
            </div>
          )}
          {state.matches('Creating.EDIT.Preview') && (
            <div>
              <p>{state.context.text}</p>
              <button onClick={() => send({ type: 'SwitchToEditing' })}>Edit</button>
            </div>
          )}
          <button type='submit'>Send text</button>
        </form>
      )}
      {state.matches('Done') && <h2>Sending to server</h2>}
      {state.matches('Finish') && <h2>Post created</h2>}
      {state.matches('ErrorInRequest') && (
        <h2>
          Error in request <strong>Message: </strong>
          {state.context.error}. Retrying
        </h2>
      )}
    </div>
  );
};
