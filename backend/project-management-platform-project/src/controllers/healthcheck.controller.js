import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
/*
const helthCheck = async (req, res, next) => {
  try {
    const user = await getUserFromDB();
    res.status(200).json(
      new ApiResponse(200, {
        message: "Server is running",
      }),
    );
  } catch (err) {
    next(err)
  }
};
*/

const healthCheck = asyncHandler((req, res) => {
  res.status(200).json(
    new ApiResponse(200, {message: "Server is running"})
  )
})

export { healthCheck };
