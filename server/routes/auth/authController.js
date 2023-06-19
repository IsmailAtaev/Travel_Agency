const users = [
  {
    fullName: "Atayev Ismayyl",
    password: "qwerty123",
    role: "ADMIN",
    email: "ataewisma@gmail.com",
  },
  {
    fullName: "Atayev Muhammed",
    password: "ahum123",
    role: "USER",
    email: "ahum@gmail.com",
  },
];



class AuthController {
  async getUsers(req, res) {
    try {
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }

  // async registration(req, res, next) {
  //   try {
  //       const {email, password, role, fio} = req.body;
  //       const userData = await UserService.registration(email, password, role, fio);
  //       return res.json(userData);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // async registration(req, res, next) {
  //   try {
  //     const errors = validationResult(req);
  //     if (!errors.isEmpty()) {
  //       return next(
  //         ApiError.BadRequest("Ошибка при валидации", errors.array())
  //       );
  //     }
  //     const { email, password } = req.body;
  //     const userData = await userService.registration(email, password);
  //     res.cookie("refreshToken", userData.refreshToken, {
  //       maxAge: 30 * 24 * 60 * 60 * 1000,
  //       httpOnly: true,
  //     });
  //     return res.json(userData);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

module.exports = new AuthController();
