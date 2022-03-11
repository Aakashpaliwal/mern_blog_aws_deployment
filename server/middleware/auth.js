import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (req, res, next) => {
  console.log("req.headers", req.headers);
  try {
    const token = req.headers.authorization.split(" ")[1];
    // const token = req.header("Authorization");
    console.log("tokenserver==", token);
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
