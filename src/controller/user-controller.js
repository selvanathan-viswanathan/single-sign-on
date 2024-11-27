
import models from '../model';

const { UserModel }= models;

export const createUser = (req, res) => {
    const { body } = req;
    const user = new UserModel(body);
    return res.json(user);
}

