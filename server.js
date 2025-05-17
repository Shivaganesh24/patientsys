const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Replace with your actual MongoDB URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://shivaganesh:shivaganesh12345@ganesh.mongodb.net/front?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected to database: front'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Define schema and specify collection name "back"
const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  symptoms: String
}, { collection: 'back' });  // <<< Collection name explicitly set

const Patient = mongoose.model('Patient', patientSchema);

app.post('/api/patients', async (req, res) => {
  const { name, age, symptoms } = req.body;

  try {
    const patient = new Patient({ name, age, symptoms });
    await patient.save();
    res.json({ message: '✅ Patient data saved successfully' });
  } catch (error) {
    console.error('❌ Error saving patient:', error);
    res.status(500).json({ message: '❌ Failed to save patient data' });
  }
});

app.listen(3000, () => {
  console.log('✅ Backend running at http://localhost:3000');
});
