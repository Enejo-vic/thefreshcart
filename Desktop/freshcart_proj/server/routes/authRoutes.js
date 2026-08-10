const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/* =========================================
   CREATE JWT TOKEN
========================================= */

const createToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};


/* =========================================
   SIGN UP
   POST /api/auth/signup
========================================= */

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("SIGNUP ATTEMPT:", email);

        // Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Check if email already exists
        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // SAVE USER TO MONGODB
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });

        console.log("USER SAVED TO DATABASE:", user.email);

        // Create JWT
        const token = createToken(user._id);

        return res.status(201).json({
            message: "Account created successfully",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("SIGNUP ERROR:", error);

        return res.status(500).json({
            message: "Unable to create account",
        });
    }
});


/* =========================================
   SIGN IN
   POST /api/auth/signin
========================================= */

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("SIGNIN ATTEMPT:", email);

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Find actual user in MongoDB
        const user = await User.findOne({
            email: normalizedEmail,
        });

        // User does not exist
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Compare entered password with stored hash
        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // User is valid
        const token = createToken(user._id);

        return res.status(200).json({
            message: "Signed in successfully",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("SIGNIN ERROR:", error);

        return res.status(500).json({
            message: "Unable to sign in",
        });
    }
});


module.exports = router;