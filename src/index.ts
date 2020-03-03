import App from './app'

function init(): void {
  App.listen(App.get('port'))
  console.log(`Server on port: ${App.get('port')}`)
}

init()
