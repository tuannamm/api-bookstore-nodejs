import * as service from "../services";
import { internalServerError } from "../middleware/handleError";

export const getBooks = async (req, res) => {
  try {
    const response = await service.getBooks(req.query);
    res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
