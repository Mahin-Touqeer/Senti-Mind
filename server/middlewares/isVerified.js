// middleware/isVerified.js

const isVerified = async (req, res, next) => {
  try {
    // Check if email is verified
    if (!req.user.verified_email) {
      return res.status(403).json({
        message: "Email verification required to access this resource",
      });
    }

    // User is verified, proceed to next middleware/route
    next();
  } catch (error) {
    console.error("Email verification check error:", error);
    res.status(500).json({
      message: "Internal server error during verification check",
    });
  }
};

module.exports = { isVerified };
