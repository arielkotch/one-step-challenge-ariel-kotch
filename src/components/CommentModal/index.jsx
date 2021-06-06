import axios from "axios";
import React, { useState } from "react";
import { Modal, Form, Button } from "semantic-ui-react";

/**
 * Submits post request to test.steps.me with
 * title and comment
 *
 * @param {string} title
 * @param {string} comment
 * @public
 */

const addComment = ({ title, comment }) => {
  axios({
    method: "post",
    url: "test.steps.me/test/testAssignComment",
    data: {
      title,
      comment,
    },
  });
};

/**
 * Comment modal opened when user clicks Add Comment button
 *
 * @param {func} setOpen
 * @param {boolean} open
 * @public
 */

const CommentModal = ({ setOpen, open }) => {
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Add Comment</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            value={title}
            onChange={(e, { value }) => {
              setTitle(value);
            }}
            fluid
            label="Title"
            placeholder="Title"
          />

          <Form.TextArea
            fluid
            value={comment}
            onChange={(e, { value }) => {
              setComment(value);
            }}
            label="Comment"
            placeholder="Write a comment..."
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            setOpen(false);
            addComment({ comment, title });
          }}
          positive
        >
          Comment
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CommentModal;
