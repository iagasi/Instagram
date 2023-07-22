import r, { CookieOptions } from "express";
import { refreshAcessToken } from "../services/tokenservice";
import { cookieName } from "../../../constants";
import { log } from "console";
const router = r.Router();
const cookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 1 * 60 * 60 * 24 * 1000,
  sameSite:false,
  secure: true,
};

router.post("/refresTokens", async (req, res) => {
  try {
    const tokens = await refreshAcessToken(req.cookies[cookieName]);

    if (!tokens) {
      res.clearCookie(cookieName);
      //// res.cookie(cookieName,{    expires: new Date('2016-10-05'),
      //})
    }

    res.cookie(cookieName, tokens?.refreshToken, cookieOptions);
    res.send({ acessToken: tokens?.acessToken, _id: tokens?.user._id });
    return;
  } catch (e) {
    res.clearCookie(cookieName);
  }

  res.send();
});

export const refreshTokensApi = router;
