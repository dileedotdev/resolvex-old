const base = require('./base')

module.exports = {
  ...base,
  plugins: [...(base.plugins ?? []), require('prettier-plugin-tailwindcss')],
}
