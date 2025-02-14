const mongoose = require('mongoose');
const { getIO } = require('./socketConfig');
const admin = require('./firebaseConfig');
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  bought: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const ShoppingItem = mongoose.model('ShoppingItem', itemSchema);

// פונקציה לקבלת כל המוצרים
const getItems = async (req, res) => {
  try {
    const userId = req.user.userId;
    const items = await ShoppingItem.find({ userId }).populate('userId', 'name');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// פונקציה להוספת מוצר חדש
const addItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, quantity, bought } = req.body;

    const newItem = new ShoppingItem({ name, quantity, bought, userId });
    await newItem.save();
    
    // עדכון כל הלקוחות
    updateClientsForUserWithMessage(userId); 
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item' });
  }
};

// פונקציה לעדכון מוצר
const updateItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bought, quantity } = req.body;

    const updatedItem = await ShoppingItem.findOneAndUpdate(
      { _id: req.params.id, userId },
      { bought, quantity },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(403).json({ error: 'Unauthorized: Item does not belong to you' });
    }

    updateClientsForUserNoMessage(userId); 
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};

// פונקציה למחיקת מוצר
const deleteItem = async (req, res) => {
  try {
    const userId = req.user.userId;

    const deletedItem = await ShoppingItem.findOneAndDelete({
      _id: req.params.id,
      userId
    });

    if (!deletedItem) {
      return res.status(403).json({ error: 'Unauthorized: Item does not belong to you' });
    }

    updateClientsForUserWithMessage(userId); 
    res.json({ message: 'Item deleted successfully', item: deletedItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
};

// פונקציה לשלוח עדכון לכל הלקוחות
const updateClientsForUserWithMessage = async (userId) => {
  const items = await ShoppingItem.find({ userId }).populate('userId', 'name').lean();

  console.log("📡 שליחת עדכון למשתמש:", userId, "👀 נתונים:", items);
  getIO().to(userId.toString()).emit('updateList', items); // שליחה לכל הלקוחות שמחוברים לחדר הזה

  try {
    // שליחת התראה Firebase
    const message = {
      notification: {
        title: 'עדכון ברשימת הקניות',
        body: 'הרשימה שלך התעדכנה!'
      },
      data: {
        type: 'LIST_UPDATE',
        userId: userId.toString()
      },
      topic: `user_${userId}` // נושא ייחודי לכל משתמש
    };

    const response = await admin.messaging().send(message);
    console.log('Successfully sent FCM message:', response);
  } catch (error) {
    console.error('Error sending FCM message:', error);
  }
};

  const updateClientsForUserNoMessage = async (userId) => {
    const items = await ShoppingItem.find({ userId }).populate('userId', 'name').lean();
  
    console.log("📡 שליחת עדכון למשתמש:", userId, "👀 נתונים:", items);
    getIO().to(userId.toString()).emit('updateList', items); // שליחה לכל הלקוחות שמחוברים לחדר הזה
  
  
  };

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem,
};
