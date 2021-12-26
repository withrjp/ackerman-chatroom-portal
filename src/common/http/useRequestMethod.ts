import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

const HTTP_CODE_UNAUTHORIZED = 401

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useRequestMethod() {
  const history = useHistory()
  return useCallback(
    async (params: Promise<unknown> | AxiosRequestConfig) => {
      if (params instanceof Promise) {
        return params
      }
      try {
        const resp = await axios(params)
        const code = resp?.data?.code
        if (code !== 0) {
          throw new Error(resp?.data?.message || resp.statusText)
        }
        return resp?.data?.data
      } catch (err) {
        if ((err as AxiosError).response?.status === HTTP_CODE_UNAUTHORIZED) {
          history.push('/login')
          throw new Error('登录超时')
        }
        throw err
      }
    },
    [history],
  )
}
