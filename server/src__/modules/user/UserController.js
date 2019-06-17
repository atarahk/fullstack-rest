import bcrypt from 'bcrypt';
import User from '../../database/models/user';
import tokenizer from '../../helpers/tokenizer';


class UserController {
  static async signUpUser(req, res) {
    const {
      username, email, password,
    } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userParams = {
        username,
        email,
        password: hashedPassword,
      };
      const newUser = await User.create(userParams);
      const token = await tokenizer.createToken(newUser);
      return res.status(201).json({
        message: 'Successfully registered',
        token,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Unable to perfom this action',
        error,
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const { user } = req;
      delete user.password;
      const token = await tokenizer.createToken(user);
      return res.status(200).json({
        message: `Welcome back ${user.username} 😃`,
        token,
        user: { id: user._id, username: user.username, email: user.email },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Unable to perfom this action',
        error,
      });
    }
  }
}

export default UserController;
