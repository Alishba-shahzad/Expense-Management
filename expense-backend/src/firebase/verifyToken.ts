// import { Request, Response, NextFunction } from "express";
// import admin from "./firebaseAdmin";

// export interface AuthenticatedRequest extends Request {
//   user?: admin.auth.DecodedIdToken;
// }

// const verifyToken = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "Unauthorized: No token" });
//   }

//   const token = authHeader.split("Bearer ")[1];

//   try {
//     const decoded = await admin.auth().verifyIdToken(token);

//     console.log("Token verified");
//     console.log("UID:", decoded.uid);
//     console.log("Email:", decoded.email);

//     req.user = decoded;
//     next();
//   } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export default verifyToken;
