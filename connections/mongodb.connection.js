const mongoose = require("mongoose")

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.MONGODB_LINK)

mongoose.connection.on('connected', () => console.log('MongoDB connected'))
mongoose.connection.on('error', () => console.log('Failed to connect MongoDB'))

require('@models/user.model')