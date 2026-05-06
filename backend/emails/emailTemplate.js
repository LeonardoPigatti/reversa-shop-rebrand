export function emailBoasVindas(nome) {
  const primeiroNome = nome?.split(' ')[0] || 'você'

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Bem-vinda à Midnight Queens Club</title>
</head>
<body style="margin:0;padding:0;background:#0d0010;font-family:'Arial',sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0010;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1a0020;border-top:3px solid #ff00aa;border-bottom:1px solid #2a002a;padding:32px 40px;text-align:center;">
              <h1 style="font-family:Impact,sans-serif;font-size:42px;letter-spacing:6px;color:#ff00aa;margin:0;text-shadow:0 0 20px rgba(255,0,170,0.6);">
                MIDNIGHT QUEENS CLUB
              </h1>
              <p style="color:#c800ff;font-size:12px;letter-spacing:4px;margin:8px 0 0;text-transform:uppercase;">
                ✦ A sua loja alternativa ✦
              </p>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a0020 0%,#0d0010 100%);padding:48px 40px;text-align:center;border-left:1px solid #2a002a;border-right:1px solid #2a002a;">
              <p style="color:#ff4dbb;font-size:13px;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px;">
                💥🦇 BEM-VINDA À FAMÍLIA 🦇💥
              </p>
              <h2 style="font-family:Impact,sans-serif;font-size:36px;color:#ffffff;letter-spacing:2px;margin:0 0 20px;line-height:1.2;">
                OLÁ, ${primeiroNome.toUpperCase()}!
              </h2>
              <p style="color:#ccc;font-size:15px;line-height:1.8;margin:0 0 24px;">
                Você acabou de entrar para o lado mais <strong style="color:#ff00aa;">dark</strong>, 
                <strong style="color:#c800ff;">punk</strong> e <strong style="color:#ff4dbb;">alternativo</strong> da moda brasileira.
                Prepare-se para receber o melhor da Midnight Queens Club direto no seu email.
              </p>
              <div style="display:inline-block;background:linear-gradient(135deg,#ff00aa,#e8008a,#c800ff);padding:14px 40px;font-family:Impact,sans-serif;font-size:16px;letter-spacing:3px;color:#fff;text-decoration:none;margin-top:8px;">
                🖤 VOCÊ JÁ É DA NOSSA TRIBO 🖤
              </div>
            </td>
          </tr>

          <!-- O que você vai receber -->
          <tr>
            <td style="background:#0d0010;padding:40px;border-left:1px solid #2a002a;border-right:1px solid #2a002a;">
              <h3 style="font-family:Impact,sans-serif;font-size:22px;letter-spacing:3px;color:#ff00aa;margin:0 0 24px;text-align:center;border-bottom:1px solid #2a002a;padding-bottom:16px;">
                O QUE VOCÊ VAI RECEBER
              </h3>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1a0020;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="48" style="vertical-align:top;padding-top:2px;">
                          <div style="background:#1a0020;border:1px solid #ff00aa;width:36px;height:36px;text-align:center;line-height:36px;font-size:18px;">⚡</div>
                        </td>
                        <td style="padding-left:12px;vertical-align:top;">
                          <p style="color:#fff;font-size:14px;font-weight:bold;margin:0 0 4px;letter-spacing:1px;">OFERTAS EXCLUSIVAS</p>
                          <p style="color:#888;font-size:13px;margin:0;line-height:1.5;">Descontos que só chegam por email. Antes de todo mundo.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1a0020;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="48" style="vertical-align:top;padding-top:2px;">
                          <div style="background:#1a0020;border:1px solid #c800ff;width:36px;height:36px;text-align:center;line-height:36px;font-size:18px;">🌙</div>
                        </td>
                        <td style="padding-left:12px;vertical-align:top;">
                          <p style="color:#fff;font-size:14px;font-weight:bold;margin:0 0 4px;letter-spacing:1px;">LANÇAMENTOS EM PRIMEIRA MÃO</p>
                          <p style="color:#888;font-size:13px;margin:0;line-height:1.5;">Novas coleções, collabs e edições limitadas assim que chegarem.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1a0020;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="48" style="vertical-align:top;padding-top:2px;">
                          <div style="background:#1a0020;border:1px solid #ff4dbb;width:36px;height:36px;text-align:center;line-height:36px;font-size:18px;">👑</div>
                        </td>
                        <td style="padding-left:12px;vertical-align:top;">
                          <p style="color:#fff;font-size:14px;font-weight:bold;margin:0 0 4px;letter-spacing:1px;">COLLABS EXCLUSIVAS</p>
                          <p style="color:#888;font-size:13px;margin:0;line-height:1.5;">Saiba primeiro sobre nossas parcerias com artistas e marcas alternativas.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="48" style="vertical-align:top;padding-top:2px;">
                          <div style="background:#1a0020;border:1px solid #ff00aa;width:36px;height:36px;text-align:center;line-height:36px;font-size:18px;">🖤</div>
                        </td>
                        <td style="padding-left:12px;vertical-align:top;">
                          <p style="color:#fff;font-size:14px;font-weight:bold;margin:0 0 4px;letter-spacing:1px;">CONTEÚDO ALTERNATIVO</p>
                          <p style="color:#888;font-size:13px;margin:0;line-height:1.5;">Dicas de looks, inspirações, festivais e tudo que move a cena alternativa.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Cupom boas vindas -->
          <tr>
            <td style="background:#1a0020;padding:32px 40px;text-align:center;border:1px solid #2a002a;border-top:none;">
              <p style="color:#888;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">🎁 PRESENTE DE BOAS-VINDAS</p>
              <div style="border:2px dashed #ff00aa;padding:20px;display:inline-block;width:80%;max-width:300px;">
                <p style="color:#ff00aa;font-size:11px;letter-spacing:2px;margin:0 0 8px;text-transform:uppercase;">Use o cupom</p>
                <p style="font-family:Impact,sans-serif;font-size:32px;letter-spacing:6px;color:#fff;margin:0;text-shadow:0 0 10px rgba(255,0,170,0.5);">QUEENCLUB10</p>
                <p style="color:#888;font-size:12px;margin:8px 0 0;">10% OFF na primeira compra</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0a000e;padding:24px 40px;text-align:center;border-left:1px solid #2a002a;border-right:1px solid #2a002a;border-bottom:1px solid #2a002a;">
              <p style="color:#555;font-size:11px;margin:0 0 8px;line-height:1.6;">
                Midnight Queens Club · Av. São João, 439, Loja 280 · São Paulo/SP<br/>
                CNPJ: 19.517.809/0001-13
              </p>
              <p style="color:#333;font-size:11px;margin:0;">
                Para cancelar a inscrição, <a href="#" style="color:#555;text-decoration:underline;">clique aqui</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim()
}