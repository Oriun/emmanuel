/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");

const conf = nextTranslate();

module.exports = {
  ...conf,
  reactStrictMode: true
};
