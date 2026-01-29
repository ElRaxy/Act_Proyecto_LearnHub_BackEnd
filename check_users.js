const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user.model');

async function listUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_CONSTRING);
    console.log('Conectado a MongoDB');
    const users = await User.find({}, 'email dni phone');
    console.log('Usuarios encontrados:', JSON.stringify(users, null, 2));
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

listUsers();
