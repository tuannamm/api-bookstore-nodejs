import * as services from "../services";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        err: 1,
        msg: "Email and password are required",
      });
    }
    const response = await services.register({ email, password });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: -1,
      msg: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        err: 1,
        msg: "Email and password are required",
      });
    }
    const response = await services.login({ email, password });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Internal Server Error",
    });
  }
};
