import React, { useState } from 'react';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { CommentInfo } from './CommentInfo';
import { Loader } from './Loader';

type Props = {
  errorComments: boolean;
  loadingComments: boolean;
  selectedPost: Post | null;
  comments: Comment[];
  createComment: (comm: Omit<Comment, 'id'>) => Promise<void>;
  loadingNewComm: boolean;
  deleteComm: (id: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  errorComments,
  loadingComments,
  selectedPost,
  comments,
  createComment,
  loadingNewComm,
  deleteComm,
}) => {
  const { id, title, body } = selectedPost as Post;
  const [writing, setWriting] = useState(false);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{id}: {title}
          </h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {loadingComments && <Loader />}

          {!loadingComments && errorComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!loadingComments && !errorComments && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!loadingComments && !errorComments && comments.length !== 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
                <CommentInfo
                  key={comment.id}
                  comment={comment}
                  deleteComm={deleteComm}
                />
              ))}
            </>
          )}

          {!loadingComments && !errorComments && !writing && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setWriting(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {!loadingComments && writing && (
          <NewCommentForm
            loadingNewComm={loadingNewComm}
            createComment={createComment}
            selectedPost={selectedPost}
          />
        )}
      </div>
    </div>
  );
};
