import { useMachine } from '@xstate/react';
import { textEditorMachine } from './machine';
import './index.css';
import classNames from 'classnames';

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
      <h2>Create Post</h2>
      <div className='editor'>
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
            className={classNames('create-form', {
              'create-form__error': state.matches('Creating.ERROR.ErrorCatched'),
            })}
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
              </div>
            )}
            {state.matches('Creating.EDIT.Preview') && (
              <div className='preview'>
                <p>{state.context.text}</p>
              </div>
            )}
            <div className='controls'>
              {state.nextEvents.includes('SwitchToEditing') && (
                <button onClick={() => send({ type: 'SwitchToEditing' })}>Edit</button>
              )}
              {state.nextEvents.includes('SwitchToPreview') && (
                <button onClick={() => send({ type: 'SwitchToPreview' })}>Preview</button>
              )}
              <button type='submit'>Send text</button>
            </div>
          </form>
        )}
        {state.matches('Done') && <h2>Sending to server</h2>}
        {state.done && <h2>Post created</h2>}
        {state.matches('ErrorInRequest') && (
          <h2>
            Error in request <strong>Message: </strong>
            {state.context.error}. Retrying for the {state.context.retries} time
          </h2>
        )}
      </div>
    </div>
  );
};
