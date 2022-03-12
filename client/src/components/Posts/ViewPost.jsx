import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import "./post.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia, Container, Divider, Grid, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClipLoader from "react-spinners/ClipLoader";
import FileBase64 from "react-file-base64";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ViewPost = () => {
  const [posts, setPosts] = useState(null);
  const [showAllBlog, setShowAllBlog] = useState(true);
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const inputRef = useRef();

  //   const countRef = useRef(0);
  //   const counterHandler = () => {
  //     console.log(countRef);
  //     countRef.current += 1;
  //   };
  //   console.log("I rendered", countRef.current, "times");

  const modalHandler = (id) => {
    setPostData(posts.find((post) => post._id === id));
    handleOpen();
  };

  const getPosts = async () => {
    setLoading(true);
    const posts = await axios.get("http://localhost:5000/api/posts/allPosts");
    console.log("posts==", posts);
    if (posts) {
      setPosts(posts.data);
      setLoading(false);
    }
  };

  const getPostByUser = async () => {
    setLoading(true);
    const singlePostsresult = await axios.get(
      `http://localhost:5000/api/posts/allPosts/${sessionStorage.getItem(
        "userId"
      )}`
    );
    console.log("singlePostsresult==", singlePostsresult);
    if (singlePostsresult.status === 200) {
      setPosts(singlePostsresult.data.posts);
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    const deleteResult = await axios.delete(
      `http://localhost:5000/api/posts/deletePost/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
    console.log("deleteresult", deleteResult);
    if (deleteResult.status === 200) {
      getPostByUser();
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log(postData);
    const result = await axios.patch(
      `http://localhost:5000/api/posts/updatePost/${postData._id}`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
    console.log("result", result);
    if (result.status === 200) {
      getPostByUser();
      handleClose();
    }
  };

  // useEffect(() => {
  //   // console.log(inputRef.current.blur());
  //   inputRef.current.focus();
  // }, []);

  useEffect(() => {
    // console.log(inputRef.current);
    if (showAllBlog) {
      getPosts();
    } else {
      getPostByUser();
    }
  }, [showAllBlog]);

  return (
    <Fragment>
      {" "}
      <Container>
        <Grid container spacing={2} style={{ marginTop: 20, marginBottom: 20 }}>
          <Grid item xs={12}>
            <Stack
              spacing={2}
              direction="row"
              alignItems={"right"}
              justifyContent="space-between"
            >
              <Button
                variant="outlined"
                onClick={() => setShowAllBlog(!showAllBlog)}
              >
                {showAllBlog ? "Show My Blogs" : "Show All Blogs"}
              </Button>

              <Link to="/">
                {" "}
                <Button variant="outlined">Upload</Button>
              </Link>
            </Stack>
            <Divider style={{ marginTop: 15 }} />
            {/* <input type="text" ref={inputRef} /> */}
          </Grid>

          {!posts || loading ? (
            <Fragment>
              <div className="loader">
                {" "}
                <ClipLoader loading={true} color={"#1976d2"} size={50} />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {/* <Button onClick={counterHandler}>Click</Button> */}

              {posts &&
                posts.map((post) => {
                  return (
                    <Grid item xs={4} key={post._id}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={post.image}
                          alt="green iguana"
                        />
                        <CardContent style={{ height: 100 }}>
                          <Typography gutterBottom variant="h5" component="div">
                            {post.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className="blog-para-truncate"
                          >
                            {post.content}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          {sessionStorage.getItem("userId") === post.creator ? (
                            <Stack direction="row" spacing={2}>
                              <Button
                                variant="outlined"
                                size="small"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={() => deleteHandler(post._id)}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<EditIcon />}
                                onClick={() => modalHandler(post._id)}
                              >
                                Edit
                              </Button>
                            </Stack>
                          ) : (
                            <Fragment>
                              <Button size="small">Share</Button>
                              <Button size="small">Learn More</Button>
                            </Fragment>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
            </Fragment>
          )}
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={submitHandler}>
              <div>
                <TextField
                  id="standard-basic"
                  label="title"
                  name="title"
                  variant="standard"
                  fullWidth={true}
                  value={postData && postData.title}
                  onChange={(e) =>
                    setPostData({ ...postData, title: e.target.value })
                  }
                />
              </div>

              <div style={{ marginTop: 20, marginBottom: 20 }}>
                <TextField
                  minRows={4}
                  id="standard-basic"
                  label="content"
                  name="content"
                  variant="standard"
                  multiline
                  fullWidth={true}
                  value={postData && postData.content}
                  onChange={(e) =>
                    setPostData({ ...postData, content: e.target.value })
                  }
                />
              </div>
              <div style={{ float: "left", marginBottom: 20 }}>
                <FileBase64
                  multiple={false}
                  // onDone={({ base64 }) =>
                  //   setState({ ...state, image: base64 })
                  // }
                  onDone={({ base64 }) =>
                    setPostData({ ...postData, image: base64 })
                  }
                />
                {/* <Button variant="contained" component="label">
                    Upload File
                    <input type="file" hidden />
                  </Button> */}
              </div>

              <Button
                variant="contained"
                className="submit_btn"
                color="primary"
                size="large"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      </Container>
    </Fragment>
  );
};

export default ViewPost;
