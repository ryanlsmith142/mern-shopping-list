const { response } = require('express');
const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @description GET ALL items
// @access Public
router.get('/', (request, response) => {
    Item.find()
    .sort({ date: -1 })
    .then(items => response.json(items))
});

// @route POST api/items
// @description Create a Item
// @access Public
router.post('/', (request, response) => {
    const newItem = new Item({
        name: request.body.name
    });

    newItem.save().then(item => response.json(item));
});

// @route DELETE api/items
// @description Delete a Item
// @access Public
router.delete('/:id', (request, response) => {
    Item.findById(request.params.id)
    .then(item => item.remove().then(() => response.json({success: true})))
    .catch(err => response.status(404).json({succes: false}));
})
module.exports = router;