import { Router } from "express";

var router = Router();

router.get("/api/secret", async (req, res) => {
    res.json({message: 'esto es secreto', token: req.token})
});

export default router