const router = require("express").Router();
const {
  RouterContext,
} = require("next/dist/shared/lib/router-context.shared-runtime");
const { cookies } = require("next/headers");
const passport = require("passport");
const CLIENT_URL = "http://localhost:3000";

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      // cookies: req.cookies,
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/login/failed", (req, res) => {
  res.status(401).send({
    success: false,
    message: "failure",
  });
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/blog",
    failureRedirect: "http://localhost:3000/login",
  })
);

module.exports = router;
