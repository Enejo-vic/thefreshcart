const express = require("express");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


/* =========================================
   GET CURRENT USER PROFILE
   GET /api/profile
========================================= */

router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select(
            "-password"
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("PROFILE GET ERROR:", error);

        return res.status(500).json({
            message: "Unable to load profile",
        });
    }
});


/* =========================================
   UPDATE CURRENT USER PROFILE
   PUT /api/profile
========================================= */

router.put("/", authMiddleware, async (req, res) => {
    try {
        const {
            name,
            phone,
            address,
            city,
            province,
            postalCode,
            deliveryInstructions,
        } = req.body;

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (name !== undefined) {
            user.name = name.trim();
        }

        if (phone !== undefined) {
            user.phone = phone.trim();
        }

        if (address !== undefined) {
            user.address = address.trim();
        }

        if (city !== undefined) {
            user.city = city.trim();
        }

        if (province !== undefined) {
            user.province = province.trim();
        }

        if (postalCode !== undefined) {
            user.postalCode = postalCode
                .trim()
                .toUpperCase();
        }

        if (deliveryInstructions !== undefined) {
            user.deliveryInstructions =
                deliveryInstructions.trim();
        }

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                city: user.city,
                province: user.province,
                postalCode: user.postalCode,
                deliveryInstructions:
                    user.deliveryInstructions,
            },
        });
    } catch (error) {
        console.error("PROFILE UPDATE ERROR:", error);

        return res.status(500).json({
            message: "Unable to update profile",
        });
    }
});


module.exports = router;