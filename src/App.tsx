import { useWebSocket } from 'ahooks'
import { ReadyState } from 'ahooks/lib/useWebSocket'
import { Button, Card, Col, Input, Layout, Row } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'

function App(): JSX.Element {
  const [input, setInput] = useState<string>('')
  const messagesEnd = useRef<HTMLDivElement>(null)
  const messageHistory = useRef<MessageEvent[]>([])

  const { sendMessage, readyState, latestMessage } = useWebSocket('ws://localhost:8080/ws')

  messageHistory.current = useMemo(() => {
    if (readyState === ReadyState.Open && latestMessage) {
      return messageHistory.current.concat(latestMessage)
    }
    return messageHistory.current
  }, [latestMessage, readyState])

  const handleClick = (data: string): void => {
    if (input && sendMessage) {
      sendMessage(data)
    }
    setInput('')
  }

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  })

  return (
    <Layout className="h-full overflow-hidden">
      <Layout.Header className="flex items-center fixed w-full h-14 z-50 bg-white">
        <span className="text-lg">Ackerman Chatroom</span>
      </Layout.Header>
      <Layout.Content className="h-full px-6 mb-24 mt-14 overflow-y-scroll">
        <div className="MessageContainer">
          <div className="MessagesList">
            {messageHistory.current.map(message => (
              <div className="py-2">
                <Card>
                  <pre className="mb-0">{message?.data}</pre>
                </Card>
              </div>
            ))}
          </div>
          <div style={{ float: 'left', clear: 'both' }} ref={messagesEnd} />
        </div>
      </Layout.Content>
      <Layout.Footer className="fixed bottom-0 w-full h-24">
        <Row className="items-center" gutter={16}>
          <Col span={20}>
            <Input.TextArea
              value={input}
              onChange={e => setInput(e.target.value)}
              className="resize-none"
            />
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={() => handleClick(input)}>
              发送
            </Button>
          </Col>
        </Row>
      </Layout.Footer>
    </Layout>
  )
}

export default App
