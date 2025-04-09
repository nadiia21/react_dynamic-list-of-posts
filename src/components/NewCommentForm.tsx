import React, { useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  createComment: (comm: Omit<Comment, 'id'>) => Promise<void>;
  loadingNewComm: boolean;
  selectedPost: Post | null;
};

export const NewCommentForm: React.FC<Props> = ({
  createComment,
  loadingNewComm,
  selectedPost,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.length || !email.length || !body.length || !selectedPost) {
      setSending(true);

      return;
    }

    createComment({ name, email, body, postId: selectedPost.id })
      .then(() => {
        setBody('');
        setSending(true);
      })
      .finally(() => {
        setSending(false);
      });
  };

  const clear = () => {
    setName('');
    setEmail('');
    setBody('');
    setSending(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': sending && name.length === 0,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {sending && name.length === 0 && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {sending && name.length === 0 && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': sending && email.length === 0,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {sending && email.length === 0 && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {sending && email.length === 0 && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Type comment here"
            className={classNames('input', {
              'is-danger': sending && body.length === 0,
            })}
          />
        </div>

        {sending && body.length === 0 && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': loadingNewComm,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            onClick={clear}
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
