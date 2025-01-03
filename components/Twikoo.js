import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useRef } from 'react'

/**
 * Twikoo 评论组件
 * @see https://twikoo.js.org/
 * @returns {JSX.Element}
 */

const Twikoo = ({ isDarkMode }) => {
  const envId = siteConfig('COMMENT_TWIKOO_ENV_ID') || 'https://twikoo-six-smoky.vercel.app' // 默认环境地址
  const el = siteConfig('COMMENT_TWIKOO_ELEMENT_ID') || '#twikoo' // 评论容器
  const twikooCDNURL = siteConfig('COMMENT_TWIKOO_CDN_URL') || 'https://cdn.jsdelivr.net/npm/twikoo@1.6.17/dist/twikoo.all.min.js'
  const lang = siteConfig('LANG') || 'zh-CN' // 默认语言为中文
  const isInit = useRef(false) // 初始化标志

  const loadTwikoo = async () => {
    try {
      console.log('[Twikoo] Loading Twikoo script from:', twikooCDNURL)
      await loadExternalResource(twikooCDNURL, 'js') // 动态加载 Twikoo 脚本

      const twikoo = window?.twikoo
      if (twikoo && typeof twikoo.init === 'function') {
        console.log('[Twikoo] Initializing...')
        twikoo.init({
          envId: envId, // Twikoo 环境地址
          el: el, // 评论区容器
          lang: lang, // 评论区语言
          path: location.pathname || '/', // 当前页面路径
        })
        console.log('[Twikoo] Initialized successfully.')
        isInit.current = true // 标记已初始化
      } else {
        console.error('[Twikoo] Twikoo is not loaded or init function is missing.')
      }
    } catch (error) {
      console.error('[Twikoo] Failed to load or initialize Twikoo:', error)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isInit.current) {
        console.log('[Twikoo] Initialization complete. Clearing interval.')
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
