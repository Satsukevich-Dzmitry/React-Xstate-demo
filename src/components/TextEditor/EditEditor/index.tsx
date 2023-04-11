import { useMachine } from '@xstate/react';
import { textEditorMachine } from '../machine';
import '../index.css';
import classNames from 'classnames';
import { useState } from 'react';

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

const useEditMachine = (text: string) => {
  const [state, send] = useMachine(textEditorMachine, {
    context: { text },
    services: {
      SendToServer: pretendThatWeSendTextToServer,
    },
  });

  return [state, send] as const;
};

export const EditEditor = ({ text }: { text: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [state, send] = useEditMachine(text);

  return (
    <div>
      <h2>EditPost</h2>
      {!isEditing && (
        <div className='post'>
          <p>{text}</p>
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        </div>
      )}
      {isEditing && (
        <div className='editor'>
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
          {state.done && <h2>Post updated</h2>}
          {state.matches('ErrorInRequest') && (
            <h2>
              Error in request <strong>Message: </strong>
              {state.context.error}. Retrying for the {state.context.retries} time
            </h2>
          )}
        </div>
      )}
    </div>
  );
};
