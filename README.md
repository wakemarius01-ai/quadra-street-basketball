# QUADRA — Street Basketball

Jogo de basquete arcade em português, para navegador e Android: 1v1/2v2, bots em quatro níveis, barra de timing, drible e enterrada. No computador: WASD, Shift, Espaço (toque para iniciar e solte para arremessar), E (enterrar), Q (passe). No celular, use os controles na tela.

## Publicação

O workflow do GitHub Pages publica o site a cada push na branch `main`. O mesmo workflow compila um APK Android de debug e o disponibiliza em **Actions → Publish QUADRA → Artifacts → quadra-android-apk**.

## Banco de dados Google Apps Script (clasp)

O backend registra resultados em uma planilha Google. Em uma máquina com Node.js e acesso à conta Google:

1. `npm install -g @google/clasp`
2. `clasp login`
3. Crie um projeto Apps Script associado a uma planilha ou use `clasp create --type sheets --title "QUADRA Stats"` dentro de `apps-script`.
4. Copie o `.clasp.json` criado para a raiz do projeto, usando `rootDir: "apps-script"` e o Script ID informado pelo Google.
5. `clasp push`, depois `clasp deploy --description "QUADRA match database"`.

O endpoint web do Apps Script pode ser conectado quando houver um deployment ativo. A planilha é criada com a aba `Partidas` no primeiro resultado recebido.
