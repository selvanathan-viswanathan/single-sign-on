
import models from '../model';

const { userModel }= models;

export const createUser = (req, res) => {
    const { body } = req;
    const user = new userModel(body);
    return res.json(user);
}