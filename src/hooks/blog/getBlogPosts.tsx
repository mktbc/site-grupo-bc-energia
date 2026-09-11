import { useCallback, useEffect, useState } from 'react'

import { getBlogPosts } from '@/services'
import { RequestStatus } from '@/types'

type Rendered = {
  rendered: string
}

type Image = Array<{
  width: number
  height: number
  url: string
  type: string
}>

type DataStructure = {
  id: string
  date: Date
  link: string
  title: Rendered
  excerpt: Rendered
  featured_media: number
  yoast_head_json: {
    description: string
    og_image: Image
  }
}

const useGetBlogPosts = () => {
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.Idle)
  const [data, setData] = useState<DataStructure[]>()

  const handle = useCallback(async () => {
    if (status === RequestStatus.Idle) {
      setStatus(RequestStatus.Pending)

      try {
        const res = await getBlogPosts()

        if (!res) {
          setStatus(RequestStatus.Rejected)
          return false
        }

        setStatus(RequestStatus.Resolved)
        setData(res)

        return res
      } catch (e) {
        setStatus(RequestStatus.Rejected)
      }
    }
    return null
  }, [])

  useEffect(() => {
    handle().then()
  }, [])

  return { status, data }
}

export { useGetBlogPosts }
