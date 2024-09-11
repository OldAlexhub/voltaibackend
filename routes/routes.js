import Router from "express";
import protectRoute from "../middleware/protectRoute.js";
import Signup from "../controllers/Signup.js";
import Login from "../controllers/Login.js";
import PostData from "../controllers/PostData.js";
import GetEntries from "../controllers/GetEntries.js";
import GetAnalyzed from "../controllers/GetAnalysis.js";
import SendData from "../controllers/SendData.js";

const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);

router.post("/postdata", protectRoute, PostData);
router.get("/getentries/:userId", protectRoute, GetEntries);
router.get("/analyzed/:userId", protectRoute, GetAnalyzed);
router.get("/sendinguserid/:userId", SendData);

export default router;
