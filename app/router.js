const express = require('express');
const router = express.Router();
const layout = require('./layout');
const { PageMapper, buildPage } = require('@webformula/pax-core');
const pageMapper = new PageMapper('app/pages');
pageMapper.pageNotFount = '404';
pageMapper.root = 'introduction';

// Page route
router.get('/*', async (req, res) => {
  const page = pageMapper.findPage(req.path);
  const { body, title, head } = await buildPage(page);
  res.send(layout({ body, title, head }));
});

module.exports = router;
