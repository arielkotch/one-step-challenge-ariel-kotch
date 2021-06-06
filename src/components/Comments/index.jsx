import React from "react";
import { Card } from "semantic-ui-react";

/**
 * Comments component maps over comments array
 * from https://jsonplaceholder.typicode.com/
 *
 * @param {array} comments
 * @public
 */

const Comments = ({ comments }) => {
  return (
    <Card.Group itemsPerRow="1">
      {comments &&
        comments.map(({ name, email, body }) => (
          <Card>
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Meta>{email}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
          </Card>
        ))}
    </Card.Group>
  );
};

export default Comments;
