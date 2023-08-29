import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function connect() {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = { connect };

