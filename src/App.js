import "semantic-ui-css/semantic.min.css";
import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Grid, Ref } from "semantic-ui-react";
import axios from "axios";
import css from "./App.scss";
import Comments from "./components/Comments";
import CommentModal from "./components/CommentModal/index";

function App() {
  let [comments, setComments] = useState([]);
  let [page, setPage] = useState(1);
  let [open, setOpen] = React.useState(false);
  const commentsRef = useRef(null);

  /**
   * Retrieves data from https://jsonplaceholder.typicode.com/
   * and adds data to current comments state
   * @param {void}
   * @public
   */
  const getComments = async () => {
    let { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`
    );
    if (data.length !== 0) {
      setComments([...comments, ...data]);
    }
  };
  useEffect(() => {
    document.addEventListener("scroll", hasReachedBottom);
  }, []);

  useEffect(() => {
    getComments();
  }, [page]);

  /**
   * Determines if user has reached the bottom of the page
   *
   * @param {array} comments
   * @public
   */
  const hasReachedBottom = () => {
    const rect = commentsRef.current.getBoundingClientRect();
    /*
        0.2 is the precentage from the bottom that 
        indicates when the data will begin to be fetched
        In this case when the user scrolls to 80% of the page
    */
    if (
      Math.floor(rect.bottom) <
      window.innerHeight + window.innerHeight * 0.2
    ) {
      setPage(page++);
    }
  };

  return (
    <React.Fragment>
      <CommentModal open={open} setOpen={setOpen} />
      <Container className={css.container} id="app">
        <Grid>
          <Grid.Row>
            <Container textAlign="right">
              <Button onClick={() => setOpen(true)}>Add Comment</Button>
            </Container>
          </Grid.Row>
        </Grid>

        <Ref innerRef={commentsRef}>
          <Comments comments={comments} />
        </Ref>
      </Container>
    </React.Fragment>
  );
}

export default App;
