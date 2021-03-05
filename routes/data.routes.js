const { Router } = require('express');
const Country = require('../models/Country');

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


router.get('/countries',
           async (req, res) => {
  try {
    const data = await Country.find();

    res.status(201).json(data);

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});


router.post(
  '/addCountry',
  async (req, res) => {
    try {
      const { lang, name, photoLink } = req.body;

      const country = new Country({ name: [{ lang, value: name }], photoLink });
      await country.save();

      res.status(201).json({ message: 'Информация успешно сохранена', countryId: country._id });

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', e });
    }
  }
);


module.exports = router;
