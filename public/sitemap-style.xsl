<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>XML Sitemap</title>
        <style type="text/css">
          body { font-family: Arial, sans-serif; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>XML Sitemap</h1>
        <table>
          <tr>
            <th>Sitemap</th>
            <th>Last Modified</th>
          </tr>
          <xsl:for-each select="//*[local-name()='sitemap']">
            <tr>
              <td>
                <a href="{*[local-name()='loc']/text()}">
                  <xsl:value-of select="*[local-name()='loc']"/>
                </a>
              </td>
              <td>
                <xsl:value-of select="*[local-name()='lastmod']"/>
              </td>
            </tr>
          </xsl:for-each>

             <!-- For urlset (post-sitemap, page-sitemap, etc) -->
          <xsl:for-each select="//*[local-name()='url']">
            <tr>
              <td><a href="{*[local-name()='loc']/text()}"><xsl:value-of select="*[local-name()='loc']"/></a></td>
              <td><xsl:value-of select="*[local-name()='lastmod']"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
