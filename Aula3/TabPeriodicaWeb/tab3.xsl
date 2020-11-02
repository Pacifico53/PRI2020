<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/">
        <xsl:result-document href="tabsite/index.html">
            <html>
                <head>
                    <title>Tabela Periódica dos Elementos</title>
                </head>
                <body>
                    <h3>Tabela Periodica dos Elementos</h3>
                    <ul>
                        <xsl:apply-templates mode="indice" select="//ATOM">
                            <xsl:sort select="SYMBOL"/>
                        </xsl:apply-templates>
                    </ul>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>

    <!-- Templates para o indice -->
    <xsl:template match="ATOM" mode="indice">
        <li>
            <a name="#i{generate-id()}"/>
            <a href="{generate-id()}">
                <xsl:value-of select="SYMBOL"/>
                -
                <xsl:value-of select="NAME"/>    
            </a>
        </li>
    </xsl:template>

    <!-- Templates para o conteudo -->
    <xsl:template match="ATOM">
        <xsl:result-document href="tabsite/{generate-id()}.html">
        <html>
            <head>
                <title><xsl:value-of select="NAME"/></title>
            </head>
            <body>
                <a name="n{ATOMIC_NUMBER}"/>
                <p><b>Nome: </b> <xsl:value-of select="NAME"/></p>
                <p><b>Peso Atómico: </b> <xsl:value-of select="ATOMIC_WEIGHT"/></p>
                <p><b>Número Atómico: </b> <xsl:value-of select="ATOMIC_NUMBER"/></p>
                <xsl:if test="HEAT_OF_FUSION">
                    <p>
                        <b>Ponto de Fusão: </b>
                        <xsl:value-of select="HEAT_OF_FUSION"/>
                        <xsl:value-of select="HEAT_OF_FUSION/@UNITS"/>
                    </p>
                </xsl:if>
                <address>[<a href="index.html">Voltar ao indice.</a>]</address>
            </body>
        </html>
        </xsl:result-document>
    </xsl:template>


</xsl:stylesheet>