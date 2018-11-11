module.exports = {
  extends: 'airbnb-base',
  plugins: ['json'],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
  }
};
