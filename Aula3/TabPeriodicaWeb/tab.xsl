<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>Tabela Periódica dos Elementos</title>
            </head>
            <body>
                <table width="100%" border="1">
                    <tr>
                        <td width="30%" valign="top">
                            <a name="indice"/>
                            <h3>Índice</h3>
                            <ol>
                                <xsl:apply-templates mode="indice" select="//ATOM">
                                    <xsl:sort select="SYMBOL"/>
                                </xsl:apply-templates>
                            </ol>
                        </td>
                        <td>
                            <xsl:apply-templates select="//ATOM">
                                <xsl:sort data-type="number" select="ATOMIC_NUMBER"/>
                            </xsl:apply-templates>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    </xsl:template>

    <!-- Templates para o indice -->
    <xsl:template match="ATOM" mode="indice">
        <li>
            <a href="#n{ATOMIC_NUMBER}">
                <xsl:value-of select="SYMBOL"/>
                -
                <xsl:value-of select="NAME"/>    
            </a>
        </li>
    </xsl:template>

    <!-- Templates para o conteudo -->
    <xsl:template match="ATOM">
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
        <address>[<a href="#indice">Voltar ao indice.</a>]</address>
        <center>
            <hr width="80%"/>
        </center>
    </xsl:template>


</xsl:stylesheet>