// libs
import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

// app -> services
import uploadConfig from '@config/upload';

// app -> middlewares
import enforceAuthentication from '../middlewares/enforceAuthentication';

// app -> controllers
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.use('/avatar', enforceAuthentication, upload.single('avatar'));

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch('/avatar', userAvatarController.update);

export default usersRouter;
