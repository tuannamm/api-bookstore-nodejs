import * as service from "../services";

export const getDataCurrentUser = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await service.getUser(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: -1,
      msg: "Internal Server Error",
    });
  }
};
