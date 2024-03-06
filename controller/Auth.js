import User from "../model/User.js";

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // TODO: this is just temporary, we will use strong password auth
    console.log({ user });
    if (!user) {
      res.status(401).json({ message: "no such user email" });
    } else if (user.password === req.body.password) {
      // TODO: We will make addresses independent of login
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        addresses: user.addresses,
      });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
