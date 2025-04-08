import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();


export const ApiRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // 5 requests
    message: "Too many attempts, please try again later.",
  });
  

  export const generateRefreshToken=(user)=>{

    const refreshToken=jwt.sign(
        {id:user._id},
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d'}
    )

    return refreshToken;

  }

  export const generateAccessToken=(user)=>{
    const accessToken=jwt.sign(
      {id:user._id, email:user.email},process.env.JWT_ACCESS_SECRET,
      {expiresIn:'15m'}

    )
    return accessToken;
  }


  // export const verify=async(req, res, next)=>{

  //   try {
  //     const authHeader=req.headers['cookie']
  //     if (!authHeader) return res.sendStatus(401);
      
  //   } catch (error) {
  //     res.status(500).json({
  //       status: "error",
  //       code: 500,
  //       data: [],
  //       message: "Internal Server Error",
  //   });
  //   }

  // }