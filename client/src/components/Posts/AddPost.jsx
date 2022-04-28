import React, { Fragment, useState } from "react";
import "./post.scss";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button, Container, TextField } from "@mui/material";
import FileBase64 from "react-file-base64";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Utils/api";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AddPost = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    title: "",
    content: "",
    image: "",
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(state);
    const result = await axios.post(
      `${API_URL}api/posts/addPost`,
      state,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
    console.log("result==", result);
    if (result.status === 200) {
      navigate("/viewPosts");
    }
  };
  return (
    <Fragment>
      <Container>
        <Grid container spacing={2} style={{ marginTop: 20 }}>
          <Grid item xs={12}>
            <Item>
              <form onSubmit={submitHandler}>
                <div>
                  <TextField
                    id="standard-basic"
                    label="title"
                    name="title"
                    variant="standard"
                    fullWidth={true}
                    onChange={(e) => {
                      setState({
                        ...state,
                        title: e.target.value,
                      });
                    }}
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
                    onChange={(e) => {
                      setState({
                        ...state,
                        content: e.target.value,
                      });
                    }}
                  />
                </div>
                <div style={{ float: "left", marginBottom: 20 }}>
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) =>
                      setState({ ...state, image: base64 })
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
            </Item>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default AddPost;
