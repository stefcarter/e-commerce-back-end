const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const dbTagData = await Tag.findAll({
        attributes: [
            'id', 'tag_name'
        ],
        include: [
            {
                model: Product,
                attributes: [
                    'id',
                    'product_name',
                    'price',
                    'stock',
                    'category_id'
                ]
            }
        ]
    });
    res.status(200).json(dbTagData);
} catch (err) {
    res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
      const dbTagData = await Tag.findOne({
          where: {
              id: req.params.id
          },
          attributes: [
              'id', 'tag_name'
          ],
          include: [
              {
                  model: Product,
                  attributes: [
                      'id',
                      'product_name',
                      'price',
                      'stock',
                      'category_id'
                  ]

              }
          ]
      });
      res.status(200).json(dbTagData);

  } catch (err) {
      res.status(500).json(err);
  }

});

router.post('/', async (req, res) => { // create a new tag
  try {
      const dbTagData = await Tag.create({tag_name: req.body.tag_name});
      res.status(200).json(dbTagData);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => { // update a tag's name by its `id` value
  try {
      const dbTagData = await Tag.update(req.body, {
          where: {
              id: req.params.id
          }
      });
      res.status(200).json(dbTagData);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => { // delete on tag by its `id` value
  try {
      const dbTagData = await Tag.destroy({
          where: {
              id: req.params.id
          }
      });
      res.status(200).json(dbTagData);
  } catch (err) {
      res.status(500).json(err);
  }
});
module.exports = router;
