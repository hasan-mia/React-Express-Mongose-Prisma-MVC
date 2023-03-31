let count = 0;

const viewCount = (req, res, next) => {
  count++;
  res.send({ success: true, messages: `Total view: ${count}` });
  next();
};

module.exports = viewCount;
