const { PrismaClient, Prisma } = require(`@prisma/client`);
const prisma = new PrismaClient();

require("dotenv").config();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ResponseTemplate = require("../../helper/template");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .max(30)
      .regex(/(?=.*[a-z])/) //Memeriksa setidaknya ada satu huruf kecil.
      .regex(/(?=.*[A-Z])/) // Memeriksa setidaknya ada satu huruf besar.
      .regex(/(?=.*\d)/) // Memeriksa setidaknya ada satu angka.
      .regex(/(?=.*[~!@#$%^&*()`])/) //Memeriksa setidaknya ada satu karakter
      .required(),
    repeat_password: Joi.ref("password"),
  });
  // validation register
  try {
    const { error, value } = await schema.validateAsync({
      name: name,
      email: email,
      password: password,
    });
    if (error) {
      throw new Error(error);
    }
  } catch (error) {
    console.error("Validation error:", error.message);
    return res
      .status(400)
      .json(ResponseTemplate(null, "Bad Request", error.message, false));
  }
  // check email duplicate?
  try {
    const isUserDuplicate = await prisma.users.findUnique({
      where: { email: email },
    });
    if (isUserDuplicate) {
      throw new Error("Email is already used");
    }
  } catch (error) {
    res
      .status(400)
      .json(ResponseTemplate(null, "Bad Request", error.message, false));
    return;
  }
  // Create new account
  try {
    const saltRounds = 15;

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.status(201).json(ResponseTemplate(user, "Created", null, true));
    return;
  } catch (error) {
    res
      .status(500)
      .json(
        ResponseTemplate(null, "Internal server error", error.message, false)
      );
    return;
  }
};

const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    // check is user exist
    let user = await prisma.users.findUnique({
      where: { email },
    });

    // check if user is exist;
    if (!user) {
      res
        .status(400)
        .json(ResponseTemplate(null, "Bad Request", "Invalid email", false));
      return;
    }

    let isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res
        .status(400)
        .json(
          ResponseTemplate(null, "Bad Request", "Password is incorrect", false)
        );
      return;
    }
    // If user is available and password is correct
    // create token

    let selectedUser = {
      id: user.id,
      email: user.email,
    };
    // 1 day expired
    const tokenExpiration = 15 * 60;
    let token = jwt.sign(selectedUser, process.env.JWT_SECRET_KEY, {
      expiresIn: tokenExpiration,
      algorithm: "HS256",
    });
    return res
      .status(200)
      .json(
        ResponseTemplate(
          { access_token: token, user: selectedUser },
          "ok",
          null,
          true
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
