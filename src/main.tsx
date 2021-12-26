import { UseRequestProvider } from 'ahooks'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App'
import useRequestMethod from './common/http/useRequestMethod'
import './index.scss'

function Main(): JSX.Element {
  const requestMethod = useRequestMethod()
  return (
    <ConfigProvider locale={zhCN}>
      <UseRequestProvider value={{ requestMethod }}>
        <Router>
          <Switch>
            <Route path="/">
              <App />
            </Route>
          </Switch>
        </Router>
      </UseRequestProvider>
    </ConfigProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root'),
)
