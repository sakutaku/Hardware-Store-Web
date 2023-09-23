import express from "express";
import User from "../modeles/User";
import mongoose from "mongoose";
import auth, {IRequestWithUser} from "../midlleware/auth";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName,
            phone: req.body.phone
        });

        user.generateToken();


        await user.save();

        return res.send(user);
    } catch (e) {
        if(e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }
});

usersRouter.post('/sessions', async (req, res, next) =>{
    try {
        const user = await User.findOne({username: req.body.username});

        if(!user) {
            return res.status(401).send({error: 'Wrong password or username'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if(!isMatch) {
            return res.status(401).send('Wrong password or username');
        }

        user.generateToken();
        await user.save();
        res.send({message: 'Username and password correct!', user: user});
    } catch (e) {
        next(e);
    }
});

usersRouter.delete('/sessions', async (req, res, next) => {
   try {
       const token = req.get('Authorization');

       if(!token) {
           return res.send({message: 'Success'});
       }

       const user = await User.findOne({token});

       if(!user) {
           return res.send({message: 'Success'});
       }

       user.generateToken();
       user.save();

       return res.send({message: 'Success'});
   } catch (e) {
       next(e);
   }

});

usersRouter.get('/secret',auth,  async (req, res) => {
  const user = (req as IRequestWithUser).user;

   res.send({
       message: 'Secret message!',
       username: user.username
   });
});

export default usersRouter;