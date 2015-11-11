require('babel-core/register')

const app = require('./server').default
console.log('\n\n\n\n\n')
console.log(app)

const port = process.env.PORT || 3000

app.listen(port, (error) => {
  if (error) throw error
  console.log(`Listening at localhost:${port}`)
})
