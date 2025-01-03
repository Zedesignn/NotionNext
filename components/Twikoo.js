import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

/**
 * Twikoo 评论组件
 * @see https://twikoo.js.org/
 * @returns {JSX.Element}
 * @constructor
 */

const Twikoo = ({ isDarkMode }) => {
  const envId = siteConfig('COMMENT_TWIKOO_ENV_ID')
  const el = siteConfig('COMMENT_TWIKOO_ELEMENT_ID', '#twikoo')
  const twikooCDNURL = siteConfig('COMMENT_TWIKOO_CDN_URL')
  const lang = siteConfig('LANG') || 'zh-CN'
  const isInit = useRef(false) // 修改为正确的引用方式

  const loadTwikoo = async () => {
    try {
      console.log('Loading Twikoo script from:', twikooCDNURL)
      await loadExternalResource(twikooCDNURL, 'js') // 加载 Twikoo 脚本

      const twikoo = window?.twikoo
      if (twikoo && typeof twikoo.init === 'function') {
        console.log('Initializing Twikoo...')

        // 初始化 Twikoo 评论系统
        twikoo.init({
          envId: envId || 'https://twikoo-six-smoky.vercel.app', // 检查 envId 是否为空
          el: el, // 评论区容器
          lang: lang, // 评论区语言
          path: location.pathname || '/', // 确保 path 不为空
        })

        console.log('Twikoo initialized successfully')
        isInit.current = true // 标记为已初始化
      } else {
        console.error('Twikoo is not loaded correctly or init function is missing.')
      }
    } catch (error) {
      console.error('Failed to load or initialize Twikoo:', error)
    }
  }

  useEffect(() => {
    // 使用定时器检查是否初始化完成
    const interval = setInterval(() => {
      if (isInit.current) {
        console.log('Twikoo has been initialized! Clearing interval.')
        clearInterval(interval)
      } else {
        loadTwikoo()
      }
    }, 1000)

    return () => clearInterval(interval) // 清理定时器
  }, [isDarkMode])

  return <div id="twikoo"></div>
}

export default Twikoo
