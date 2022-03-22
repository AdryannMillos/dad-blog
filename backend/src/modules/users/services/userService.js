const userRepository = require("../repository/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const findAllUsers = async (res) => {
  try {
    const users = await userRepository.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: `Error:${err.message}` });
  }
};

async function createUser(req, res) {
  try {
    const {
      userName,
      fullName,
      phoneNumber,
      email,
      password,
      confirmPassword,
      selfIntroduction,
      isAdmin,
      canPost,
    } = req.body;

    const user = {
      userName: userName,
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      selfIntroduction: selfIntroduction,
      isAdmin: isAdmin,
      canPost: canPost,
    };

    if (password !== confirmPassword) {
      return res.status(401).json({ message: "Password Does Not Match" });
    } else {
        await bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              res.status(500).json({ message: err.message });
            } else {
              user.password = hash;
              userRepository.storeUser(user);
              return res.status(201).json({ message: "User Created successfully" });
            }
          });
    }
  } catch (err) {
    return res.status(500).json({ message: `Error:${err.message}` });
  }
}

const updateUser = async (req, res) => {
  try {
    const {
      userName,
      fullName,
      phoneNumber,
      email,
      password,
      confirmPassword,
      selfIntroduction,
      isAdmin,
      canPost,
    } = req.body;

    const userId = req.params.id;

    const userFound = await userRepository.getUserSpecificWithId(userId);

    if (!userFound) {
      return res.status(404).json({ message: `User Not Found` });
    } else {
      const user = {
        userName: userName,
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        selfIntroduction: selfIntroduction,
        isAdmin: isAdmin,
        canPost: canPost,
      };

      if (password !== confirmPassword) {
        return res.status(401).json({ message: "Password Does Not Match" });
      } else {
        await bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              res.status(500).json({ message: err.message });
            } else {
              user.password = hash;
              userRepository.renewUser(user, userId);
              return res.status(200).json({ message: "User Updated Successfully" });
            }
          });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: `Error:${err.message}` });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  const userFound = await userRepository.getUserSpecificWithId(userId);
  if (!userFound) {
    return res.status(404).json({ message: `User Not Found` });
  } else {
    await userRepository.destroyUser(userId);
    return res.status(200).json({ message: `User Deleted successfully` });
  }
};

const findSpecificUser = async (req) => {
  const userId = req.params.id;

  return await userRepository.getUserSpecificWithId(userId);
};

const loginUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  const userWithEmail = await userRepository.getUserSpecific({where : { email: email}});
  
  if (!userWithEmail) {
    return res.status(401).json({ message: "Email or password not found" });
  }
  if (!bcrypt.compareSync(password, userWithEmail.password)){
    return res.status(401).json({ message: "Email or password not found" });
  }

  const jwtToken = jwt.sign(
    {
      userName: userWithEmail.userName,
      fullName: userWithEmail.fullName,
      phoneNumber: userWithEmail.phoneNumber,
      email: userWithEmail.email,
      selfIntroduction: userWithEmail.selfIntroduction,
      isAdmin: userWithEmail.isAdmin,
      canPost: userWithEmail.canPost,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "1h",
    }
  );

  res.status(200).send({message: "Welcome Back!", token: jwtToken});
}


module.exports = {
  findAllUsers,
  createUser,
  updateUser,
  deleteUser,
  findSpecificUser,
  loginUser
};
