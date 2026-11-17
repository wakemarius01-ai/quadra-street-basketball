# QUADRA — Street Basketball

Jogo arcade de basquete em 3D para navegador e Android: 1v1/2v2, bots em quatro níveis, barra de timing, drible, enterradas com salto e trajetória física, rebotes, aro e tabela com colisões. Roubo durante o drible derruba o defensor e mostra o aviso vermelho “ANKLE BREAKER”. Bots também driblam, roubam e podem ser fintados.

No computador: WASD mover, Shift driblar, Espaço iniciar/soltar arremesso, E enterrar, F roubar, R bloquear e Q passe. No celular, use os controles na tela.

## Publicação

O workflow do GitHub Pages publica o site a cada push na branch `main`. O mesmo workflow compila um APK Android de debug e o disponibiliza em **Actions → Publish QUADRA → Artifacts → quadra-android-apk**.

## Banco de dados Google Apps Script (clasp)

O backend registra resultados em uma planilha Google. Em uma máquina com Node.js e acesso à conta Google:

1. `npm install -g @google/clasp`
2. `clasp login`
3. Crie um projeto Apps Script associado a uma planilha ou use `clasp create --type sheets --title "QUADRA Stats"` dentro de `apps-script`.
4. Copie o `.clasp.json` criado para a raiz do projeto, usando `rootDir: "apps-script"` e o Script ID informado pelo Google.
5. `clasp push`, depois `clasp deploy --description "QUADRA match database"`.

Depois de publicar como web app, configure a URL retornada na máquina do jogador (no console do navegador): `localStorage.setItem('quadraStatsEndpoint','URL_DO_WEB_APP')` e recarregue o jogo. O jogo enviará o placar ao fim de cada partida. A planilha é criada com a aba `Partidas` no primeiro resultado recebido.
