const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const Joi = require("joi");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const ResponseTemplate = require("../helper/template");
const { JWT_SECRET_KEY } = process.env;
const isAuthenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res
      .status(401)
      .json(
        ResponseTemplate(null, "Unauthorized", "you're not authorized", false)
      );
    return;
  }
  //  Using Bearer token
  // e.g  'Bearer th1sIsatOKEN213'
  const token = authorization.slice(7);
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      res
        .status(401)
        .json(
          ResponseTemplate(
            null,
            "Unauthorized",
            "Token is invalid or expired",
            false
          )
        );
      return;
    }

    // Check if the token is not expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTimestamp) {
      res
        .status(401)
        .json(
          ResponseTemplate(null, "Unauthorized", "Token has expired", false)
        );
      return;
    }
    req.user = decoded;

    next();
  });
};

const isAuthorize = (req, res, next) => {
  const { id } = req.user;
  const isIdEqual = id === req.params.id;
  if (!isIdEqual) {
    res
      .status(401)
      .json(
        ResponseTemplate(null, "Unauthorized", "you're not authorized", false)
      );
    return;
  }
  next();
};
const isUserAvail = async (req, res, next) => {
  const isUserExist = await prisma.users.findUnique({
    where: { id: req.params.id },
  });
  if (!isUserExist) {
    res
      .status(404)
      .json(ResponseTemplate(null, "Not Found", "user is not found", false));
    return;
  }
  next();
};
module.exports = {
  isAuthenticate,
  isAuthorize,
  isUserAvail,
};
