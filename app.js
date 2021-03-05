const express = require('express');
const path = require('path');
const config = require('config');

// Создаем объект приложения express
const app = express();

// express.json() is a method inbuilt in express to recognize the incoming Request Object
// as a JSON Object. This method is called as a middleware.
app.use(express.json({ extended: true }));

// CORS middleware
const allowCrossDomain = function(_req_, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}
app.use(allowCrossDomain);

// Маршрутизация
app.use('/api/data', require('./routes/data.routes'));

// Отдача статики в production mode (т.е. клиента)
// Это нужно, чтобы одновременно работал и frontend, и backend
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (_req_, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// Порт сервера
const PORT = process.env.PORT || config.get('port') || 4005;

/**
 * Действия, которые необходимо выполнить для запуска сервера.
 */
async function start() {
  try {
    // Подключаемся с серверу БД
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    // Запускаем http-сервер на указанном порту
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

// Запускаем сервер
start();
