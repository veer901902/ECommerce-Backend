import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sanitizeUser } from "../services/common.js";
const SECRET_KEY = "SECRET_KEY";

// export const createUser = async (req, res) => {
//   try {
//     const salt = crypto.randomBytes(16);
//     crypto.pbkdf2(
//       req.body.password,
//       salt,
//       310000,
//       32,
//       "sha256",
//       async function (err, hashedPassword) {
//         const user = new User({ ...req.body, password: hashedPassword, salt });
//         const doc = await user.save();

//         req.login(sanitizeUser(doc), (err) => {
//           // this also calls serializer and adds to session
//           if (err) {
//             res.status(400).json(err);
//           } else {
//             const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
//             res.status(201).json(token);
//           }
//         });
//       }
//     );
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

export const createUser = async (req, res) => {
  try {
    // Generate a salt using bcrypt
    const saltRounds = 10; // We can adjust the number of rounds as needed
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user with the hashed password and salt
    const user = new User({ ...req.body, password: hashedPassword, salt });
    const doc = await user.save();

    // Log in the newly created user and return a token
    req.login(sanitizeUser(doc), (err) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
        res
          .cookie("jwt", token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
          })
          .status(201)
          .json(token);
      }
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const loginUser = async (req, res) => {
  // console.log(req.user);
  res
    .cookie("jwt", req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json(req.user.token);
};

export const checkUser = async (req, res) => {
  res.json({ status: "success", user: req.user });
};
