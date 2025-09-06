import { siteConfig } from '@/lib/config'

// 固定以代码版本为准，避免被 Notion 配置覆盖
// 优先读取公开环境变量 NEXT_PUBLIC_VERSION，其次读取 package.json
const VERSION = process.env.NEXT_PUBLIC_VERSION || require('../package.json').version

/**
 * 驱动版权
 * @returns
 */
export default function PoweredBy(props) {
  return (
    <div className={`inline text-sm font-serif ${props.className || ''}`}>
      <span className='mr-1'>Powered by</span>
      <a
        href='https://github.com/tangly1024/NotionNext'
        className='underline justify-start'>
        NotionNext {VERSION}
      </a>
      .
    </div>
  )
}
