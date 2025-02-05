const express = require('express');
const router = express.Router();

const { getItems, addItem, updateItem, deleteItem } = require('./shoppingController')
const authMiddleware = require('./authMiddleware'); // ה-Middleware לאימות משתמש

// נתיבים עבור המוצרים
router.get('/items', authMiddleware, getItems);
router.post('/items', authMiddleware, addItem);
router.patch('/items/:id', authMiddleware, updateItem);
router.delete('/items/:id', authMiddleware, deleteItem);

module.exports = router;
