/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://ahmed-abd-el-kareem.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin/*', '/api/*', '/private/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
    ],
    additionalSitemaps: [
      'https://ahmed-abd-el-kareem.vercel.app/sitemap.xml',
    ],
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // تحويل مخصص للروابط
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  additionalPaths: async (config) => {
    // إضافة مسارات إضافية
    const result = []
    
    // إضافة صفحات المشاريع
    const projects = [
      'project-1',
      'project-2',
      'project-3',
    ]
    
    projects.forEach((project) => {
      result.push({
        loc: `/projects/${project}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })
    })
    
    return result
  },
}
