import { Router } from 'express';
import {pool} from "../../db.js"

const router = Router();
/*un token es un string que se va intercambiando entre el criente y el servidor para decirle al servidor que 
determinado usuari puede consultar cosas */
import jwt from "jsonwebtoken"
import {conf} from '../../config.js'
import {verifyToken} from './verifyToken.js'

export const signupController = async (req, res) => {
  try {
    // Receiving Data
    const { username, email , Constrasena } = req.body;
    const [row] = await pool.query(
        "INSERT INTO pro"
    )
    // Creating a new User
  

    // encrypt the user's password
    user.password = await user.encryptPassword(password);

    await user.save();

    // Create a Token
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 60 * 60 * 24, // expires in 24 hours
    });

    res.json({ auth: true, token });
  } catch (e) {
    console.log(e);
    res.status(500).send("There was a problem registering your user");
  }
};

export const getProfile = async (req, res) => {
  // res.status(200).send(decoded);
  // Search the Info base on the ID
  // const user = await User.findById(decoded.id, { password: 0});
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) {
    return res.status(404).send("No user found.");
  }
  res.status(200).json(user);
};

export const signinController = async (req, res) => {
  const {email, Contrasena} = req.body;
  if (!user) {
    return res.status(404).send("The email doesn't exists");
  }
  const validPassword = await user.comparePassword(
    req.body.password,
    user.password
  );
  if (!validPassword) {
    return res.status(401).send({ auth: false, token: null });
  }
  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60 * 24,
  });
  res.status(200).json({ auth: true, token });
};

export const logout = async (req, res) => {
  res.status(200).send({ auth: false, token: null });
};