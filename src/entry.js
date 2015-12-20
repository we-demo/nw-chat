
if (location.hash === '#/main') {
  require('./entryMain')
} else {
  require('./entryWeb')
}
