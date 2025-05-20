const express = require('express');
const app = express();
const personRoutes = require('./routes/person');
require('dotenv').config();

app.use(express.json());
app.use('/api/persona', personRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
