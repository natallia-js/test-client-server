const { Router } = require('express');

const router = Router();

router.get('/info',
           async (_req_, res) => {
  try {
    res.status(201).json('Hello from Server');

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
