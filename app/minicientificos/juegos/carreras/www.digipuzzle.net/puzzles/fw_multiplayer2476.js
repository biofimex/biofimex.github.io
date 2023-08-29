/*global canvas, addctx, draw, font, fwPointInBox, $ */
/*global language, LANG_EN, LANG_NL, LANG_DK, LANG_ES, LANG_DE*/
/*global multiplayerBoxHandleKey, multiplayerBoxHandleKeyTxt, multiplayerCheckNameLength, getmultiplayers*/
/*global fwFillRect, fwStrokeFillRect, fwStrokeFillRectRounded, fwFillText, fwStroke, DIGIPUZZLE_GREEN*/
/*global getFwString, sidFw*/
/*global onLogoPressed, LOGO_BUTTON_X, LOGO_BUTTON_Y, LOGO_BUTTON_W, LOGO_BUTTON_H*/

var g_multiplayerEasyMode = g_multiplayerEasyMode || false;

var PHP_FILENAME = "//www.digipuzzle.net/php/multiplayer/updateplayer_v3.php";

var sidMultiplayer = {
    ENTER_YOUR_NAME:            1,
    CREATE_GAME:                2,
    PLAY_NOW:                   3,
    JOIN:                       4,
    START_GAME:                 5,
    LEAVE_GAME:                 6,
    CONTINUE_GAME:              7,
    END_GAME:                   8,
    GAME_LOBBY:                 9,
    GAME_RESULTS:               10,
    JOIN_GAME:                  11,
    COMPUTER:                   12,
    PUBLIC_GAME:                13,
    PRIVATE_GAME:               14,
    PRIVATE_EXPLANATION:        15,
    ENTER_PASSWORD:             16,
    PASSWORD:                   17,
    CANCEL:                     18,
    PRIVATE_EXLANATION:         19,
    PLAYERS_GAME:               20,
    PLAYERS:                    21,
    PLAYER:                     22,
    OK:                         23
};

var multiplayerBoxStates = {
    INACTIVE:                   0,
    JOIN_ENTER_NAME:            1,
    JOIN:                       2,
    JOIN_ENTER_PASSWORD:        3,
    CREATE_GAME:                4,
    CREATE_GAME_ENTER_PASSWORD: 5,
    GAME_LOBBY:                 6,
    GAME_LOBBY_COUNTDOWN:       7,
    SCORE_BOARD:                8,
    PLAY:                       9
};

var multiplayerBox = {
    active:                 false,
    state:                  multiplayerBoxStates.INACTIVE,
    context:                null,
    createGameBtn:          {w: 200, h: 56, sid: sidMultiplayer.CREATE_GAME},
    playNowBtn:             {w: 200, h: 56, sid: sidMultiplayer.PLAY_NOW},
    startGameBtn:           {w: 200, h: 56, sid: sidMultiplayer.START_GAME},
    leaveGameBtn:           {w: 200, h: 56, sid: sidMultiplayer.LEAVE_GAME},
    scoreLeaveGameBtn:      {w: 200, h: 56, sid: sidMultiplayer.END_GAME},
    scoreContinueGameBtn:   {w: 200, h: 56, sid: sidMultiplayer.CONTINUE_GAME},
    createCancelBtn:        {w: 200, h: 56, sid: sidMultiplayer.CANCEL},
    createOkBtn:            {w: 200, h: 56, sid: sidMultiplayer.OK},
    gameLobbyBox:           {},
    updateInterval:         null,
    sessionId:              undefined,
    playerId:               undefined,
    players:                [],
    scoreInfo:              undefined,
    sessionState:           undefined,
    startGameFunction:      undefined,
    infoUpdateFunction:     undefined,
    gameLobbyOnDraw:        undefined,
    scoreBoardOnDraw:       undefined,
    appOnMouseUp:           undefined,
    // CREATE GAME CONTROLS
    checkboxPublic:         {w: 56, h: 56, sid: sidMultiplayer.PUBLIC_GAME},
    checkBoxPrivate:        {w: 56, h: 56, sid: sidMultiplayer.PRIVATE_GAME},
    publicSelected:         true,
    password:               "",
    name:                   "",
    avatarid:               0,
    mouseUpDelayActive:     false,
    mouseUpDelayTimeout:    undefined,
    easyMode:               false,
    gameInfo:               undefined
};

// __TEXTS -------------------------------------------------------------------------------------------------------------
function multiplayerGetString(id) {
    "use strict";
    var texts = [];
    switch (id) {
    case sidMultiplayer.ENTER_YOUR_NAME:
        texts = ["Enter a nickname",
            "Kies een leuke naam",
            "Gib einen Spitznamen ein",
            "Skriv et brugernavn",
            "Ingresa un apodo",
            "",
            "",
            "Ange ett smeknamn",
            "Oppgi et kallenavn",
            "Vpiši svoj vzdevek",
            "Saisir un surnom"];
        break;
    case sidMultiplayer.CREATE_GAME:
        texts = ["Create game",
            "Nieuw spel",
            "Spiel erstellen",
            "Start nyt spil",
            "Crear juego",
            "",
            "",
            "Skapa spel",
            "Lag spillet",
            "Ustvari igro",
            "Créer un jeu"];
        break;
    case sidMultiplayer.PLAY_NOW:
        texts = ["Play now",
            "Nu Spelen",
            "Jetzt spielen",
            "Spil nu",
            "Jugar ahora",
            "",
            "",
            "Spela nu",
            "Spill nå",
            "Igraj zdaj",
            "Jouer maintenant"];
        break;
    case sidMultiplayer.JOIN:
        texts = ["Join",
            "Meedoen",
            "Mitmachen",
            "Deltag",
            "Únete",
            "",
            "",
            "Gå med",
            "Bli med",
            "Pridruži se",
            "Rejoindre"];
        break;
    case sidMultiplayer.START_GAME:
        texts = ["Start Game",
            "Start spel",
            "Spiel starten",
            "Begynd spil",
            "Comenzar el juego",
            "",
            "",
            "Starta Spelet",
            "Start spillet",
            "Začni igro",
            "Commencer le jeu"];
        break;
    case sidMultiplayer.LEAVE_GAME:
        texts = ["Leave Game",
            "Verlaat spel",
            "Spiel verlassen",
            "Forlad spil",
            "Salir del juego",
            "",
            "",
            "Lämna spelet",
            "Forlat spillet",
            "Zapusti igro",
            "Quitter le jeu"];
        break;
    case sidMultiplayer.CONTINUE_GAME:
        texts = ["Continue",
            "Doorgaan",
            "Weiter",
            "Fortsæt",
            "Continuar",
            "",
            "",
            "Fortsätt",
            "Fortsett",
            "Nadaljuj",
            "Continuer"];
        break;
    case sidMultiplayer.END_GAME:
        texts = ["End Game",
            "Stoppen",
            "Spiel beenden",
            "Afslut spil",
            "Cerrar el juego",
            "",
            "",
            "Sluta Spela",
            "Avslutt spillet",
            "Konec igre",
            "Terminer le jeu"];
        break;
    case sidMultiplayer.JOIN_GAME:
        texts = ["Join Game",
            "Speel mee",
            "Spiel beitreten",
            "Deltag i spillet",
            "Únete al juego",
            "",
            "",
            "Gå med i spelet",
            "Bli med i spillet",
            "Pridruži se igri",
            "Rejoindre le jeu"];
        break;
    case sidMultiplayer.GAME_LOBBY:
        texts = ["Game Lobby",
            "Verzamelplek",
            "Spiel-Lobby",
            "Spil-lobby",
            "Vestíbulo",
            "",
            "",
            "Spellobbyn",
            "Spill lobby",
            "Čakalnica",
            "Lobby du jeu"];
        break;
    case sidMultiplayer.GAME_RESULTS:
        texts = ["Game Results",
            "Resultaten",
            "Spielergebnisse",
            "Score",
            "Resultados",
            "",
            "",
            "Spelresultat",
            "Spillresultater",
            "Rezultati igre",
            "Résultats du jeu"];
        break;
    case sidMultiplayer.COMPUTER:
        texts = ["Computer",
            "Computer",
            "Computer",
            "Computer",
            "Computadora",
            "",
            "",
            "Dator",
            "Datamaskin",
            "Računalnik",
            "Ordinateur"];
        break;
    case sidMultiplayer.PUBLIC_GAME:
        texts = ["Public Game",
            "Spel met iedereen",
            "Öffentliches Spiel",
            "Åbent spil",
            "Juego público",
            "",
            "",
            "Offentligt Spel",
            "Offentlig spill",
            "Javna igra",
            "Jeu public"];
        break;
    case sidMultiplayer.PRIVATE_GAME:
        texts = ["Private Game",
            "Spel met vrienden",
            "Privates Spiel",
            "Spil med venner",
            "Juego privado",
            "",
            "",
            "Privat Spel",
            "Privat spill",
            "Zasebna igra",
            "Jeu privé"];
        break;
    case sidMultiplayer.ENTER_PASSWORD:
        texts = ["Enter password",
            "Voer je wachtwoord in",
            "Passwort eingeben",
            "Skriv adgangskode",
            "Ingresar contraseña",
            "",
            "",
            "Ange lösenord",
            "Oppgi passord",
            "Vpiši geslo",
            "Saisissez le mot de passe"];
        break;
    case sidMultiplayer.PASSWORD:
        texts = ["Password",
            "Wachtwoord",
            "Passwort",
            "Adgangskode",
            "Contraseña",
            "",
            "",
            "Lösenord",
            "Passord",
            "Geslo",
            "Mot de passe"];
        break;
    case sidMultiplayer.CANCEL:
        texts = ["Cancel",
            "Annuleren",
            "Abbrechen",
            "Annuller",
            "Cancelar",
            "",
            "",
            "Avbryta",
            "Avbryt",
            "Prekliči",
            "Annuler"];
        break;
    case sidMultiplayer.OK:
        texts = ["Ok",
            "Ok",
            "OK",
            "Ok",
            "Ok",
            "",
            "",
            "Ok",
            "Ok",
            "V redu",
            "Ok"];
        break;
    case sidMultiplayer.PRIVATE_EXLANATION:
        texts = ["When you create a public game anyone can join. When you create a private game only people|that know the password (classmates, friends, etc) can join ",
            "Iedereen kan met een 'Spel met iedereen' mee doen. Alleen spelers die het wachtwoord weten kunnen bij|een 'Spel met vrienden' mee doen",
            "Wenn du ein öffentliches Spiel erstellt, kann jeder mitmachen. Wenn du ein privates Spiel erstellst,|dann können nur Menschen beitreten die das Passwort kennen (Klassenkameraden, Freunde, etc.)",
            "Et 'åbent spil' kan alle deltage i. Hvis du starter et 'spil med venner' er det kun dem|der kender adgangskoden (klassekammerater, venner osv.) der kan deltage",
            "Cuando creas un juego público, cualquiera puede unirse. Cuando creas un juego privado,|sólo pueden participar personas que conozcan la contraseña (compañeros de clase, amigos, etc.).",
            "",
            "",
            "När du skapar ett offentligt spel kan vem som helst gå med. När du skapar ett privat spel|kan bara personer som känner till lösenordet (klasskamrater, vänner etc.) gå med ",
            "Når du spiller et offentlig spill kan hvem som helst bli med. Når du starter et privat spill|kan bare de som kjenner til passordet bli med (klassekamerater, venner, etc).",
            "Ko ustvariš javno igro, se ji lahko pridruži kdorkoli. Ko ustvariš zasebno igro,|se ji lahko pridružijo samo tisti, ki poznajo geslo (sošolci, prijatelji itd.).",
            "Quand tu crées un jeu public, tout le monde peut y participer. Lorsque tu crées un jeu privé,|seules les personnes qui connaissent le mot de passe (camarades de classe, amis, etc.) peuvent s'inscrire."];
        break;
    case sidMultiplayer.PLAYERS_GAME:
        texts = ["%1's Game",
            "Spel van %1",
            "%1's Spiel",
            "%1's spil",
            "Juego de %1",
            "",
            "",
            "Spel av %1",
            "%1s Spill",
            "Igra: %1",
            "Le jeu de %1"];
        break;
    case sidMultiplayer.PLAYERS:
        texts = ["players",
            "spelers",
            "Mitspieler",
            "Spillere",
            "jugadores",
            "",
            "",
            "spelare",
            "spillere",
            "igralci",
            "joueurs"];
        break;
    case sidMultiplayer.PLAYER:
        texts = ["player",
            "speler",
            "Mitspieler",
            "Spiller",
            "jugador",
            "",
            "",
            "spelare",
            "spiller",
            "igralec",
            "joueur"];
        break;

    default:
        break;
    }
    return fwPickLanguageText(texts);
}

function multiplayerWrapName(name) {
    "use strict";
    return name.split('æ').join('_ae').split('Æ').join('_AE').split('ø').join('_oe').split('Ø').join('_OE').split('å').join('_aa').split('Å').join('_AA').split('č').join('_cc').split('Č').join('_CC').split('š').join('_ss').split('Š').join('_SS').split('ž').join('_zz').split('Ž').join('_ZZ');

}
function multiplayerUnwrapName(name) {
    "use strict";
    return name.split('_ae').join('æ').split('_AE').join('Æ').split('_oe').join('ø').split('_OE').join('Ø').split('_aa').join('å').split('_AA').join('Å').split('_cc').join('č').split('_CC').join('Č').split('_ss').join('š').split('_SS').join('Š').split('_zz').join('ž').split('_ZZ').join('Ž');
}

function multiplayerOnMouseDown(mouseX, mouseY) {
    "use strict";
    if (!multiplayerBox.keyboard.active) {
        if (multiplayerBox.listBox.scrollbar && fwPointInBox(mouseX, mouseY, multiplayerBox.listBox.scrollbar.button.x, multiplayerBox.listBox.scrollbar.button.y, multiplayerBox.listBox.scrollbar.button.w, multiplayerBox.listBox.scrollbar.button.h)) {
            multiplayerBox.listBox.scrollbar.button.pressed = true;
            multiplayerBox.listBox.scrollbar.button.pressedY = mouseY - multiplayerBox.listBox.scrollbar.button.y;
        }
    }
}

function multiplayerOnMouseMove(mouseX, mouseY) {
    "use strict";
    if (multiplayerBox.listBox.scrollbar && multiplayerBox.listBox.scrollbar.button.pressed) {
        // calculate scrollbar position
        multiplayerBox.listBox.scrollbar.button.y =
            Math.max(multiplayerBox.listBox.scrollbar.y, Math.min((multiplayerBox.listBox.scrollbar.y + multiplayerBox.listBox.scrollbar.h) - multiplayerBox.listBox.scrollbar.button.h,
                mouseY - multiplayerBox.listBox.scrollbar.button.pressedY));
        draw();
    }
}

function multiplayerActivateKeyboard() {
    "use strict";
    multiplayerBox.keyboard.textBox.text = "";
    multiplayerBox.keyboard.textBox.inputOk = false;
    multiplayerBox.keyboard.active = true;
}

function multiplayerKeyboardOnMouseUp(mouseX, mouseY) {
    "use strict";
    var i, key;
    for (i = 0; i < multiplayerBox.keyboard.keys.length; i += 1) {
        key = multiplayerBox.keyboard.keys[i];
        if (fwPointInBox(mouseX, mouseY, key.x, key.y, key.w, key.h)) {
            multiplayerBoxHandleKey(key);
        }
    }
}

function multiplayerLeaveSession() {
    "use strict";
    multiplayerStartMouseUpDelay();
    $.get(PHP_FILENAME + "?gameid=" + multiplayerBox.gameId.toString() + "&cmd=leave&playerid=" + multiplayerBox.playerId, function(data) {
        multiplayerClearMouseUpDelay();
        multiplayerBox.sessionId = undefined;
        multiplayerBox.playerId = undefined;
        multiplayerBox.players = [];
        multiplayerBox.state = multiplayerBoxStates.JOIN;
        draw();
    });
}

function clearInfo() {
    "use strict";
    multiplayerBox.sessionId = undefined;
    multiplayerBox.playerId = undefined;
    // clear player information
    multiplayerBox.players = [];
    // clean up session (will not be updated anymore; so will get out of sync)
    m_multiplayerSessions = [];
    processMultiplayer();
    // clear password edit
    multiplayerBox.password = "";
    // clear score information
    multiplayerBox.scoreInfo = undefined;
}

function startGameLobby(sessionId, playerId) {
    "use strict";
    clearInfo();
    // store session and player id
    multiplayerBox.sessionId = sessionId;
    multiplayerBox.playerId = playerId;
    // activate game lobby
    multiplayerBox.state = multiplayerBoxStates.GAME_LOBBY;
}

function multiplayerClearMouseUpDelay() {
    "use strict";
    clearTimeout(multiplayerBox.mouseUpDelayTimeout);
    multiplayerBox.mouseUpDelayActive = false;
}

function multiplayerStartMouseUpDelay() {
    "use strict";
    multiplayerBox.mouseUpDelayActive = true;
    multiplayerBox.mouseUpDelayTimeout = setTimeout(multiplayerClearMouseUpDelay, 1000);
}

function multiplayerOnMouseUp(mouseX, mouseY) {
    "use strict";
    var i, key, j, button;

    if (multiplayerBox.mouseUpDelayActive) {
        // debouncing mechanism active
        return;
    }

    // check if logo pressed outside of multiplayer box
    if (!fwPointInBox(mouseX, mouseY, multiplayerBox.x, multiplayerBox.y, multiplayerBox.x, multiplayerBox.y)) {
        if (fwPointInBox(mouseX, mouseY, LOGO_BUTTON_X, LOGO_BUTTON_Y, LOGO_BUTTON_W, LOGO_BUTTON_H)) {
            onLogoPressed();
        }
    }

    if (multiplayerBox.appOnFirstMouseUp !== undefined) {
        // one trigger to enable audio on iPad
        multiplayerBox.appOnFirstMouseUp();
        multiplayerBox.appOnFirstMouseUp = undefined;
    }

    switch (multiplayerBox.state) {
    case multiplayerBoxStates.JOIN:
        // check if SCROLLBAR released
        if (multiplayerBox.listBox.scrollbar && multiplayerBox.listBox.scrollbar.button.pressed) {
            multiplayerBox.listBox.scrollbar.button.pressed = false;
            draw();
            return;
        }
        // check if CREATE button pressed
        if (fwPointInBox(mouseX, mouseY, multiplayerBox.createGameBtn.x, multiplayerBox.createGameBtn.y, multiplayerBox.createGameBtn.w, multiplayerBox.createGameBtn.h)) {
            multiplayerBox.state = multiplayerBoxStates.CREATE_GAME;
            multiplayerBox.publicSelected = true;
            multiplayerBox.password = "";
            draw();
        }
        // check if PLAY NOW button pressed
        if (fwPointInBox(mouseX, mouseY, multiplayerBox.playNowBtn.x, multiplayerBox.playNowBtn.y, multiplayerBox.playNowBtn.w, multiplayerBox.playNowBtn.h)) {
            multiplayerStartMouseUpDelay();
            // join any public session
            $.get(PHP_FILENAME + "?gameid=" + multiplayerBox.gameId.toString() + "&cmd=join&name=" + multiplayerWrapName(multiplayerBox.name) + "&sessionid=-1" + "&password=''", function(data) {
                var rxData;
                multiplayerClearMouseUpDelay();
                rxData = JSON.parse(data);
                if (rxData.sessionid && rxData.playerid) {
                    startGameLobby(rxData.sessionid, rxData.playerid);
                }
            });
        }
        // check if any JOIN button is pressed
        for (i = 0; i < multiplayerBox.listBox.size; i += 1) {
            j = i + multiplayerBox.listBox.scrollPos;
            button = {x: multiplayerBox.listBox.x + 650 - 40, y: multiplayerBox.listBox.y + (i * 50) + 5, w: 100, h: 40};
            if (fwPointInBox(mouseX, mouseY, button.x, button.y, button.w, button.h)) {
                // join the session
                if (m_multiplayerSessions[j].password === "") {
                    multiplayerStartMouseUpDelay();
                    // join public session
                    $.get(PHP_FILENAME + "?gameid=" + multiplayerBox.gameId.toString() + "&cmd=join&name=" + multiplayerWrapName(multiplayerBox.name) + "&sessionid=" + m_multiplayerSessions[j].id.toString() + "&password=''", function(data) {
                        var rxData;
                        multiplayerClearMouseUpDelay();
                        rxData = JSON.parse(data);
                        if (rxData.sessionid && rxData.playerid) {
                            startGameLobby(rxData.sessionid, rxData.playerid);
                        }
                    });
                } else {
                    // joining private session; open keyboard for password
                    multiplayerBox.state = multiplayerBoxStates.JOIN_ENTER_PASSWORD;
                    multiplayerBox.password = "";
                    multiplayerBox.passwordSessionInfo = {id: m_multiplayerSessions[j].id, password: m_multiplayerSessions[j].password};
                    multiplayerActivateKeyboard();
                }
            }
        }
        break;
    case multiplayerBoxStates.JOIN_ENTER_NAME:
        if (multiplayerBox.keyboard.active && fwPointInBox(mouseX, mouseY, multiplayerBox.keyboard.x, multiplayerBox.keyboard.y, multiplayerBox.keyboard.w, multiplayerBox.keyboard.h)) {
            multiplayerKeyboardOnMouseUp(mouseX, mouseY);
        }
        break;
    case multiplayerBoxStates.JOIN_ENTER_PASSWORD:
        if (multiplayerBox.keyboard.active && fwPointInBox(mouseX, mouseY, multiplayerBox.keyboard.x, multiplayerBox.keyboard.y, multiplayerBox.keyboard.w, multiplayerBox.keyboard.h)) {
            multiplayerKeyboardOnMouseUp(mouseX, mouseY);
        } else {
            // leave keyboard mode
            multiplayerBox.keyboard.active = false;
            multiplayerBox.state = multiplayerBoxStates.JOIN;
            draw();
        }
        break;
    case multiplayerBoxStates.CREATE_GAME:
        // check if PUBLIC radio button pressed
        if (fwGetDistance(mouseX, mouseY, multiplayerBox.checkboxPublic.cx, multiplayerBox.checkboxPublic.cy) < multiplayerBox.checkboxPublic.r) {
            multiplayerBox.publicSelected = true;
            multiplayerBox.password = "";
            multiplayerBox.keyboard.active = false;
            draw();
        }
        // check if PRIVATE radio button pressed
        if (fwGetDistance(mouseX, mouseY, multiplayerBox.checkboxPrivate.cx, multiplayerBox.checkboxPrivate.cy) < multiplayerBox.checkboxPrivate.r) {
            multiplayerBox.publicSelected = false;
            multiplayerBox.state = multiplayerBoxStates.CREATE_GAME_ENTER_PASSWORD;
            multiplayerActivateKeyboard();
            draw();
        }
        // check if CANCEL button pressed
        if (fwPointInBox(mouseX, mouseY, multiplayerBox.createCancelBtn.x, multiplayerBox.createCancelBtn.y, multiplayerBox.createCancelBtn.w, multiplayerBox.createCancelBtn.h)) {
            // back to JOIN BOARD
            multiplayerBox.state = multiplayerBoxStates.JOIN;
            draw();
        }
        // check if OK button pressed
        if (fwPointInBox(mouseX, mouseY, multiplayerBox.createOkBtn.x, multiplayerBox.createOkBtn.y, multiplayerBox.createOkBtn.w, multiplayerBox.createOkBtn.h)) {
            multiplayerStartMouseUpDelay();
            // create my own session
            $.get(PHP_FILENAME + "?gameid=" + multiplayerBox.gameId.toString() + "&cmd=join&name=" + multiplayerWrapName(multiplayerBox.name) + "&sessionid=0" + "&password='" + multiplayerWrapName(multiplayerBox.password) + "'", function(data) {
                var rxData;
                multiplayerClearMouseUpDelay();
                rxData = JSON.parse(data);
                console.log(rxData);
                if (rxData.sessionid && rxData.playerid) {
                    startGameLobby(rxData.sessionid, rxData.playerid);
                }
                draw();
            });
            draw();
        }
        break;
    case multiplayerBoxStates.CREATE_GAME_ENTER_PASSWORD:
        if (multiplayerBox.keyboard.active && fwPointInBox(mouseX, mouseY, multiplayerBox.keyboard.x, multiplayerBox.keyboard.y, multiplayerBox.keyboard.w, multiplayerBox.keyboard.h)) {
            multiplayerKeyboardOnMouseUp(mouseX, mouseY);
        } else {
            // leave keyboard mode
            multiplayerBox.keyboard.active = false;
            // switch back to public game
            multiplayerBox.publicSelected = true;
            multiplayerBox.state = multiplayerBoxStates.CREATE_GAME;
            draw();
        }
        break;
    case multiplayerBoxStates.GAME_LOBBY:
    case multiplayerBoxStates.GAME_LOBBY_COUNTDOWN:
        if (multiplayerBox.state === multiplayerBoxStates.GAME_LOBBY) {
            multiplayerStartMouseUpDelay();
            // check if START GAME button pressed
            if (fwPointInBox(mouseX, mouseY, multiplayerBox.startGameBtn.x, multiplayerBox.startGameBtn.y, multiplayerBox.startGameBtn.w, multiplayerBox.startGameBtn.h)) {
                // start countdown
                $.get(PHP_FILENAME + "?gameid=" + multiplayerBox.gameId.toString() + "&cmd=startcountdown&sessionid=" + multiplayerBox.sessionId, function(data) {
                    multiplayerClearMouseUpDelay();
                    draw();
                });
            }
        }

        // check if LEAVE GAME button pressed
        if (fwPointInBox(mouseX, mouseY, multiplayerBox.leaveGameBtn.x, multiplayerBox.leaveGameBtn.y, multiplayerBox.leaveGameBtn.w, multiplayerBox.leaveGameBtn.h)) {
            // leave session
            multiplayerLeaveSession();
        }


        if (fwPointInBox(mouseX, mouseY, multiplayerBox.gameLobbyBox.x, multiplayerBox.gameLobbyBox.y, multiplayerBox.gameLobbyBox.w, multiplayerBox.gameLobbyBox.h)) {
            if (multiplayerBox.appOnMouseUp) {
                multiplayerBox.appOnMouseUp(mouseX - multiplayerBox.gameLobbyBox.x, mouseY - multiplayerBox.gameLobbyBox.y);
            }
        }
        break;
    case multiplayerBoxStates.SCORE_BOARD:
        // check if LEAVE GAME button pressed
        if (fwPointInBox(mouseX, mouseY, multiplayerBox.scoreLeaveGameBtn.x, multiplayerBox.scoreLeaveGameBtn.y, multiplayerBox.scoreLeaveGameBtn.w, multiplayerBox.scoreLeaveGameBtn.h)) {
            if (linkBackTo !== undefined) {
                try {
                    location.href = linkBackTo;
                } catch (err) {};
            } else {
                try {
                    if (language === LANG_NL) {
                        window.location = "http://www.digipuzzle.net/nl/index.htm";
                    } else {
                        window.location = "http://www.digipuzzle.net/index.htm";
                    }
                } catch (err) {};
            }
        }
        // check if CONTINUE GAME button pressed
        if (fwPointInBox(mouseX, mouseY, multiplayerBox.scoreContinueGameBtn.x, multiplayerBox.scoreContinueGameBtn.y, multiplayerBox.scoreContinueGameBtn.w, multiplayerBox.scoreContinueGameBtn.h)) {
            // back to join session board
            clearInfo();
            multiplayerBox.state = multiplayerBoxStates.JOIN;
        }
        break;
    case multiplayerBoxStates.JOIN_ENTER_NAME:
    case multiplayerBoxStates.CREATE_GAME_ENTER_PASSWORD:
    case multiplayerBoxStates.JOIN_ENTER_PASSWORD:
    default:
        // do nothing
        break;
    }
    //}
}

function multiplayerOnKeyDown(event) {
    "use strict";
    if (multiplayerBox.keyboard.active) {
        var keyHandled = false;
        switch (event.keyCode) {
        case 8:  // backspace
        case 13: // enter
            keyHandled = true;
            break;
        }
        if (keyHandled) {
            event.preventDefault();
        }
    }
}

function multiplayerOnKeyUp(event) {
    "use strict";
    if (multiplayerBox.keyboard.active) {
        var keyHandled = false, i;
        switch (event.keyCode) {
        case 8:  // backspace
            multiplayerBoxHandleKeyTxt("Backspace");
            keyHandled = true;
            break;
        case 13: // enter
            multiplayerBoxHandleKeyTxt("Enter");
            keyHandled = true;
            break;
        }
        if (keyHandled) {
            event.preventDefault();
        }
    }
}

function getAlphabet(language) {
    var abc = fwGetAlphabet(language);
    if (language === LANG_SI) {
        // allow english names to be entered
        abc += "qwyx";
    }
    return abc;
}

function multiplayerOnKeyPressed(event) {
    "use strict";
    if (multiplayerBox.keyboard.active) {
        var charCode = (typeof event.which === "number") ? event.which : event.keyCode,
            c = String.fromCharCode(charCode),
            i;
        if ((getAlphabet(language).toUpperCase() + "0123456789 ").indexOf(c.toUpperCase()) >= 0) {
            for (i = 0; i < multiplayerBox.keyboard.keys.length; i += 1) {
                if ((multiplayerBox.keyboard.keys[i].txtT === c.toUpperCase()) || (multiplayerBox.keyboard.keys[i].txtB === c.toUpperCase())) {
                    if (multiplayerCheckNameLength(multiplayerBox.keyboard.textBox.text + c)) {
                        multiplayerBox.keyboard.textBox.text += c;
                    }
                }
            }
            multiplayerKeyboardCheckInputOk();
        }
        draw();
    } else {
        var charCode = (typeof event.which === "number") ? event.which : event.keyCode,
            c = String.fromCharCode(charCode);
        // debug options
        switch (c) {
        case 'a':
            m_debugSessions = Math.max(0, m_debugSessions - 1);
            break;
        case 'b':
            m_debugSessions += 1;
            break;
        }
    }
}

function multiplayerInitKeyboard() {
    "use strict";
    var KEY_X = 60,
        KEY_Y = 320,
        KEY_W = 45,
        KEY_H = 45,
        KEY_FREE_X = 5,
        KEY_FREE_Y = 5,
        KEY_TILDE_X = KEY_X,
        KEY_TILDE_Y = KEY_Y,
        KEY_TAB_W = 75,
        KEY_CAPS_W = 90,
        KEY_SHIFTL_W = 115,
        KEY_CTRLL_W = 70,
        KEY_ALT_W = 70,
        KEY_SPACE_W = 440,
        KEY_CTRLR_W = 70,
        KEY_SHIFTR_W = 120,
        KEY_ENTER_W = 95,
        KEY_SLASH_W = 60,
        KEY_BACKSPACE_W = 90,
        KEY_Q_X = KEY_X + KEY_TAB_W + KEY_FREE_X,
        KEY_Q_Y = KEY_TILDE_Y + KEY_H + KEY_FREE_Y,
        KEY_A_X = KEY_X + KEY_CAPS_W + KEY_FREE_X,
        KEY_A_Y = KEY_Q_Y + KEY_H + KEY_FREE_Y,
        KEY_Z_X = KEY_X + KEY_SHIFTL_W + KEY_FREE_X,
        KEY_Z_Y = KEY_A_Y + KEY_H + KEY_FREE_Y,
        KEY_CTRLL_X = KEY_X,
        KEY_CTRLL_Y = KEY_Z_Y + KEY_H + KEY_FREE_Y,
        i, row, x, y;

    // initialize keys
    y = KEY_TILDE_Y;
    multiplayerBox.keyboard.keys = [];
    row = [{t: '~', b: '`'}, {t: '!', b: '1'}, {t: '@', b: '2'}, {t: '#', b: '3'}, {t: '$', b: '4'}, {t: '%', b: '5'}, {t: '^', b: '6'}, {t: '&', b: '7'}, {t: '*', b: '8'}, {t: '(', b: '9'}, {t: ')', b: '0'}, {t: '_', b: '-'}, {t: '+', b: '='}];
    x = KEY_TILDE_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_BACKSPACE_W, h: KEY_H, txtT: 'Backspace'});

    y = KEY_Q_Y;
    multiplayerBox.keyboard.keys.push({x: KEY_X, y: y, w: KEY_TAB_W, h: KEY_H, txtT: 'Tab'});
    row = [{t: 'Q'}, {t: 'W'}, {t: 'E'}, {t: 'R'}, {t: 'T'}, {t: 'Y'}, {t: 'U'}, {t: 'I'}, {t: 'O'}, {t: 'P'}, {t: '{', b: '['}, {t: '}', b: ']'}];
    x = KEY_Q_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_SLASH_W, h: KEY_H, txtT: '|', txtB: '\\'});

    y = KEY_A_Y;
    multiplayerBox.keyboard.keys.push({x: KEY_X, y: y, w: KEY_CAPS_W, h: KEY_H, txtT: 'Caps'});
    row = [{t: 'A'}, {t: 'S'}, {t: 'D'}, {t: 'F'}, {t: 'G'}, {t: 'H'}, {t: 'J'}, {t: 'K'}, {t: 'L'}, {t: ':', b: ';'}, {t: '"', b: "'"}];
    x = KEY_A_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_ENTER_W, h: KEY_H, txtT: 'Enter'});

    y = KEY_Z_Y;
    multiplayerBox.keyboard.keys.push({x: KEY_X, y: y, w: KEY_SHIFTL_W, h: KEY_H, txtT: 'Shift'});
    row = [{t: 'Z'}, {t: 'X'}, {t: 'C'}, {t: 'V'}, {t: 'B'}, {t: 'N'}, {t: 'M'}, {t: '<', b: ','}, {t: '>', b: '.'}, {t: '?', b: '/'}];
    x = KEY_Z_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_SHIFTR_W, h: KEY_H, txtT: 'Shift'});

    y = KEY_CTRLL_Y;
    x = KEY_CTRLL_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_CTRLL_W, h: KEY_H, txtT: 'CtrlL'});
    x += KEY_CTRLL_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_ALT_W, h: KEY_H, txtT: 'Alt'});
    x += KEY_ALT_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_SPACE_W, h: KEY_H, txtT: ' '});
    x += KEY_SPACE_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_ALT_W, h: KEY_H, txtT: 'Alt'});
    x += KEY_ALT_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_CTRLR_W, h: KEY_H, txtT: 'Ctrl'});
}

function multiplayerInitDanishKeyboard() {
    "use strict";
    var KEY_X = 60,
        KEY_Y = 320,
        KEY_W = 45,
        KEY_H = 45,
        KEY_FREE_X = 5,
        KEY_FREE_Y = 5,
        KEY_TILDE_X = KEY_X,
        KEY_TILDE_Y = KEY_Y,
        KEY_TAB_W = 75,
        KEY_CAPS_W = 90,
        KEY_SHIFTL_W = 115,
        KEY_CTRLL_W = 70,
        KEY_ALT_W = 70,
        KEY_SPACE_W = 440,
        KEY_CTRLR_W = 70,
        KEY_SHIFTR_W = 120,
        KEY_ENTER_W = 95,
        KEY_SLASH_W = 60,
        KEY_BACKSPACE_W = 90,
        KEY_Q_X = KEY_X + KEY_TAB_W + KEY_FREE_X,
        KEY_Q_Y = KEY_TILDE_Y + KEY_H + KEY_FREE_Y,
        KEY_A_X = KEY_X + KEY_CAPS_W + KEY_FREE_X,
        KEY_A_Y = KEY_Q_Y + KEY_H + KEY_FREE_Y,
        KEY_Z_X = KEY_X + KEY_SHIFTL_W + KEY_FREE_X,
        KEY_Z_Y = KEY_A_Y + KEY_H + KEY_FREE_Y,
        KEY_CTRLL_X = KEY_X,
        KEY_CTRLL_Y = KEY_Z_Y + KEY_H + KEY_FREE_Y,
        i, row, x, y;

    // initialize keys
    y = KEY_TILDE_Y;
    multiplayerBox.keyboard.keys = [];
    row = [{t: '~', b: '$'}, {t: '!', b: '1'}, {t: '"', b: '2'}, {t: '#', b: '3'}, {t: '€', b: '4'}, {t: '%', b: '5'}, {t: '&', b: '6'}, {t: '/', b: '7'}, {t: '(', b: '8'}, {t: ')', b: '9'}, {t: '=', b: '0'}, {t: '?', b: '+'}, {t: "'", b: "'"}];
    x = KEY_TILDE_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_BACKSPACE_W, h: KEY_H, txtT: 'Backspace'});

    y = KEY_Q_Y;
    multiplayerBox.keyboard.keys.push({x: KEY_X, y: y, w: KEY_TAB_W, h: KEY_H, txtT: 'Tab'});
    row = [{t: 'Q'}, {t: 'W'}, {t: 'E'}, {t: 'R'}, {t: 'T'}, {t: 'Y'}, {t: 'U'}, {t: 'I'}, {t: 'O'}, {t: 'P'}, {t: 'Å'}, {t: '^', b: '-'}];
    x = KEY_Q_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_SLASH_W, h: KEY_H, txtT: '|', txtB: '\\'});

    y = KEY_A_Y;
    multiplayerBox.keyboard.keys.push({x: KEY_X, y: y, w: KEY_CAPS_W, h: KEY_H, txtT: 'Caps'});
    row = [{t: 'A'}, {t: 'S'}, {t: 'D'}, {t: 'F'}, {t: 'G'}, {t: 'H'}, {t: 'J'}, {t: 'K'}, {t: 'L'}, {t: 'Æ'}, {t: 'Ø'}];
    x = KEY_A_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_ENTER_W, h: KEY_H, txtT: 'Enter'});

    y = KEY_Z_Y;
    multiplayerBox.keyboard.keys.push({x: KEY_X, y: y, w: KEY_SHIFTL_W, h: KEY_H, txtT: 'Shift'});
    row = [{t: 'Z'}, {t: 'X'}, {t: 'C'}, {t: 'V'}, {t: 'B'}, {t: 'N'}, {t: 'M'}, {t: ';', b: ','}, {t: ':', b: '.'}, {t: '_', b: '-'}];
    x = KEY_Z_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_SHIFTR_W, h: KEY_H, txtT: 'Shift'});

    y = KEY_CTRLL_Y;
    x = KEY_CTRLL_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_CTRLL_W, h: KEY_H, txtT: 'CtrlL'});
    x += KEY_CTRLL_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_ALT_W, h: KEY_H, txtT: 'Alt'});
    x += KEY_ALT_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_SPACE_W, h: KEY_H, txtT: ' '});
    x += KEY_SPACE_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_ALT_W, h: KEY_H, txtT: 'Alt'});
    x += KEY_ALT_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_CTRLR_W, h: KEY_H, txtT: 'Ctrl'});
}

function multiplayerInitSwedishKeyboard() {
    "use strict";
    var KEY_X = 60,
        KEY_Y = 320,
        KEY_W = 45,
        KEY_H = 45,
        KEY_FREE_X = 5,
        KEY_FREE_Y = 5,
        KEY_TILDE_X = KEY_X,
        KEY_TILDE_Y = KEY_Y,
        KEY_TAB_W = 75,
        KEY_CAPS_W = 90,
        KEY_SHIFTL_W = 115,
        KEY_CTRLL_W = 70,
        KEY_ALT_W = 70,
        KEY_SPACE_W = 440,
        KEY_CTRLR_W = 70,
        KEY_SHIFTR_W = 120,
        KEY_ENTER_W = 95,
        KEY_SLASH_W = 60,
        KEY_BACKSPACE_W = 90,
        KEY_Q_X = KEY_X + KEY_TAB_W + KEY_FREE_X,
        KEY_Q_Y = KEY_TILDE_Y + KEY_H + KEY_FREE_Y,
        KEY_A_X = KEY_X + KEY_CAPS_W + KEY_FREE_X,
        KEY_A_Y = KEY_Q_Y + KEY_H + KEY_FREE_Y,
        KEY_Z_X = KEY_X + KEY_SHIFTL_W + KEY_FREE_X,
        KEY_Z_Y = KEY_A_Y + KEY_H + KEY_FREE_Y,
        KEY_CTRLL_X = KEY_X,
        KEY_CTRLL_Y = KEY_Z_Y + KEY_H + KEY_FREE_Y,
        i, row, x, y;

    // initialize keys
    y = KEY_TILDE_Y;
    multiplayerBox.keyboard.keys = [];
    row = [{t: '~', b: '$'}, {t: '!', b: '1'}, {t: '"', b: '2'}, {t: '#', b: '3'}, {t: '€', b: '4'}, {t: '%', b: '5'}, {t: '&', b: '6'}, {t: '/', b: '7'}, {t: '(', b: '8'}, {t: ')', b: '9'}, {t: '=', b: '0'}, {t: '?', b: '+'}, {t: "'", b: "'"}];
    x = KEY_TILDE_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_BACKSPACE_W, h: KEY_H, txtT: 'Backspace'});

    y = KEY_Q_Y;
    multiplayerBox.keyboard.keys.push({x: KEY_X, y: y, w: KEY_TAB_W, h: KEY_H, txtT: 'Tab'});
    row = [{t: 'Q'}, {t: 'W'}, {t: 'E'}, {t: 'R'}, {t: 'T'}, {t: 'Y'}, {t: 'U'}, {t: 'I'}, {t: 'O'}, {t: 'P'}, {t: 'Å'}, {t: '^', b: '-'}];
    x = KEY_Q_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_SLASH_W, h: KEY_H, txtT: '|', txtB: '\\'});

    y = KEY_A_Y;
    multiplayerBox.keyboard.keys.push({x: KEY_X, y: y, w: KEY_CAPS_W, h: KEY_H, txtT: 'Caps'});
    row = [{t: 'A'}, {t: 'S'}, {t: 'D'}, {t: 'F'}, {t: 'G'}, {t: 'H'}, {t: 'J'}, {t: 'K'}, {t: 'L'}, {t: 'Ö'}, {t: 'Ä'}];
    x = KEY_A_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_ENTER_W, h: KEY_H, txtT: 'Enter'});

    y = KEY_Z_Y;
    multiplayerBox.keyboard.keys.push({x: KEY_X, y: y, w: KEY_SHIFTL_W, h: KEY_H, txtT: 'Shift'});
    row = [{t: 'Z'}, {t: 'X'}, {t: 'C'}, {t: 'V'}, {t: 'B'}, {t: 'N'}, {t: 'M'}, {t: ';', b: ','}, {t: ':', b: '.'}, {t: '_', b: '-'}];
    x = KEY_Z_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_SHIFTR_W, h: KEY_H, txtT: 'Shift'});

    y = KEY_CTRLL_Y;
    x = KEY_CTRLL_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_CTRLL_W, h: KEY_H, txtT: 'CtrlL'});
    x += KEY_CTRLL_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_ALT_W, h: KEY_H, txtT: 'Alt'});
    x += KEY_ALT_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_SPACE_W, h: KEY_H, txtT: ' '});
    x += KEY_SPACE_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_ALT_W, h: KEY_H, txtT: 'Alt'});
    x += KEY_ALT_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_CTRLR_W, h: KEY_H, txtT: 'Ctrl'});
}

function multiplayerInitGermanKeyboard() {
    "use strict";
    var KEY_X = 60,
        KEY_Y = 320,
        KEY_W = 45,
        KEY_H = 45,
        KEY_FREE_X = 5,
        KEY_FREE_Y = 5,
        KEY_TILDE_X = KEY_X,
        KEY_TILDE_Y = KEY_Y,
        KEY_TAB_W = 75,
        KEY_CAPS_W = 90,
        KEY_SHIFTL_W = 115,
        KEY_CTRLL_W = 70,
        KEY_ALT_W = 70,
        KEY_SPACE_W = 440,
        KEY_CTRLR_W = 70,
        KEY_SHIFTR_W = 120,
        KEY_ENTER_W = 95,
        KEY_SLASH_W = 60,
        KEY_BACKSPACE_W = 90,
        KEY_Q_X = KEY_X + KEY_TAB_W + KEY_FREE_X,
        KEY_Q_Y = KEY_TILDE_Y + KEY_H + KEY_FREE_Y,
        KEY_A_X = KEY_X + KEY_CAPS_W + KEY_FREE_X,
        KEY_A_Y = KEY_Q_Y + KEY_H + KEY_FREE_Y,
        KEY_Z_X = KEY_X + KEY_SHIFTL_W + KEY_FREE_X,
        KEY_Z_Y = KEY_A_Y + KEY_H + KEY_FREE_Y,
        KEY_CTRLL_X = KEY_X,
        KEY_CTRLL_Y = KEY_Z_Y + KEY_H + KEY_FREE_Y,
        i, row, x, y;

    // initialize keys
    y = KEY_TILDE_Y;
    multiplayerBox.keyboard.keys = [];
    row = [{t: '~', b: '$'}, {t: '!', b: '1'}, {t: '"', b: '2'}, {t: '#', b: '3'}, {t: '€', b: '4'}, {t: '%', b: '5'}, {t: '&', b: '6'}, {t: '/', b: '7'}, {t: '(', b: '8'}, {t: ')', b: '9'}, {t: '=', b: '0'}, {t: '?', b: '+'}, {t: "'", b: "'"}];
    x = KEY_TILDE_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_BACKSPACE_W, h: KEY_H, txtT: 'Backspace'});

    y = KEY_Q_Y;
    multiplayerBox.keyboard.keys.push({x: KEY_X, y: y, w: KEY_TAB_W, h: KEY_H, txtT: 'Tab'});
    row = [{t: 'Q'}, {t: 'W'}, {t: 'E'}, {t: 'R'}, {t: 'T'}, {t: 'Y'}, {t: 'U'}, {t: 'I'}, {t: 'O'}, {t: 'P'}, {t: 'Ü'}, {t: '^', b: '-'}];
    x = KEY_Q_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_SLASH_W, h: KEY_H, txtT: '|', txtB: '\\'});

    y = KEY_A_Y;
    multiplayerBox.keyboard.keys.push({x: KEY_X, y: y, w: KEY_CAPS_W, h: KEY_H, txtT: 'Caps'});
    row = [{t: 'A'}, {t: 'S'}, {t: 'D'}, {t: 'F'}, {t: 'G'}, {t: 'H'}, {t: 'J'}, {t: 'K'}, {t: 'L'}, {t: 'Ö'}, {t: 'Ä'}];
    x = KEY_A_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_ENTER_W, h: KEY_H, txtT: 'Enter'});

    y = KEY_Z_Y;
    multiplayerBox.keyboard.keys.push({x: KEY_X, y: y, w: KEY_SHIFTL_W, h: KEY_H, txtT: 'Shift'});
    row = [{t: 'Z'}, {t: 'X'}, {t: 'C'}, {t: 'V'}, {t: 'B'}, {t: 'N'}, {t: 'M'}, {t: ';', b: ','}, {t: ':', b: '.'}, {t: '_', b: '-'}];
    x = KEY_Z_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_SHIFTR_W, h: KEY_H, txtT: 'Shift'});

    y = KEY_CTRLL_Y;
    x = KEY_CTRLL_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_CTRLL_W, h: KEY_H, txtT: 'CtrlL'});
    x += KEY_CTRLL_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_ALT_W, h: KEY_H, txtT: 'Alt'});
    x += KEY_ALT_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_SPACE_W, h: KEY_H, txtT: ' '});
    x += KEY_SPACE_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_ALT_W, h: KEY_H, txtT: 'Alt'});
    x += KEY_ALT_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_CTRLR_W, h: KEY_H, txtT: 'Ctrl'});
}

function multiplayerInitSlovenianKeyboard() {
    "use strict";
    var KEY_X = 60,
        KEY_Y = 320,
        KEY_W = 45,
        KEY_H = 45,
        KEY_FREE_X = 5,
        KEY_FREE_Y = 5,
        KEY_TILDE_X = KEY_X,
        KEY_TILDE_Y = KEY_Y,
        KEY_TAB_W = 75,
        KEY_CAPS_W = 90,
        KEY_SHIFTL_W = 115,
        KEY_CTRLL_W = 70,
        KEY_ALT_W = 70,
        KEY_SPACE_W = 440,
        KEY_CTRLR_W = 70,
        KEY_SHIFTR_W = 120,
        KEY_ENTER_W = 95,
        KEY_SLASH_W = 60,
        KEY_BACKSPACE_W = 90,
        KEY_Q_X = KEY_X + KEY_TAB_W + KEY_FREE_X,
        KEY_Q_Y = KEY_TILDE_Y + KEY_H + KEY_FREE_Y,
        KEY_A_X = KEY_X + KEY_CAPS_W + KEY_FREE_X,
        KEY_A_Y = KEY_Q_Y + KEY_H + KEY_FREE_Y,
        KEY_Z_X = KEY_X + KEY_SHIFTL_W + KEY_FREE_X,
        KEY_Z_Y = KEY_A_Y + KEY_H + KEY_FREE_Y,
        KEY_CTRLL_X = KEY_X,
        KEY_CTRLL_Y = KEY_Z_Y + KEY_H + KEY_FREE_Y,
        i, row, x, y;

    // initialize keys
    y = KEY_TILDE_Y;
    multiplayerBox.keyboard.keys = [];
    row = [{t: '~', b: '`'}, {t: '!', b: '1'}, {t: '@', b: '2'}, {t: '#', b: '3'}, {t: '$', b: '4'}, {t: '%', b: '5'}, {t: '^', b: '6'}, {t: '&', b: '7'}, {t: '*', b: '8'}, {t: '(', b: '9'}, {t: ')', b: '0'}, {t: '_', b: '-'}, {t: '+', b: '='}];
    x = KEY_TILDE_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_BACKSPACE_W, h: KEY_H, txtT: 'Backspace'});

    y = KEY_Q_Y;
    multiplayerBox.keyboard.keys.push({x: KEY_X, y: y, w: KEY_TAB_W, h: KEY_H, txtT: 'Tab'});
    row = [{t: 'Q'}, {t: 'W'}, {t: 'E'}, {t: 'R'}, {t: 'T'}, {t: 'Z'}, {t: 'U'}, {t: 'I'}, {t: 'O'}, {t: 'P'}, {t: 'Š'}, {t: '}', b: ']'}];
    x = KEY_Q_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_SLASH_W, h: KEY_H, txtT: '|', txtB: '\\'});

    y = KEY_A_Y;
    multiplayerBox.keyboard.keys.push({x: KEY_X, y: y, w: KEY_CAPS_W, h: KEY_H, txtT: 'Caps'});
    row = [{t: 'A'}, {t: 'S'}, {t: 'D'}, {t: 'F'}, {t: 'G'}, {t: 'H'}, {t: 'J'}, {t: 'K'}, {t: 'L'}, {t: 'Č'}, {t: 'Ž'}];
    x = KEY_A_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_ENTER_W, h: KEY_H, txtT: 'Enter'});

    y = KEY_Z_Y;
    multiplayerBox.keyboard.keys.push({x: KEY_X, y: y, w: KEY_SHIFTL_W, h: KEY_H, txtT: 'Shift'});
    row = [{t: 'Y'}, {t: 'X'}, {t: 'C'}, {t: 'V'}, {t: 'B'}, {t: 'N'}, {t: 'M'}, {t: ';', b: ','}, {t: ':', b: '.'}, {t: '?', b: '/'}];
    x = KEY_Z_X;
    for (i = 0; i < row.length; i += 1) {
        multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_W, h: KEY_H, txtT: row[i].t, txtB: row[i].b});
        x += KEY_W + KEY_FREE_X;
    }
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_SHIFTR_W, h: KEY_H, txtT: 'Shift'});

    y = KEY_CTRLL_Y;
    x = KEY_CTRLL_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_CTRLL_W, h: KEY_H, txtT: 'CtrlL'});
    x += KEY_CTRLL_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_ALT_W, h: KEY_H, txtT: 'Alt'});
    x += KEY_ALT_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_SPACE_W, h: KEY_H, txtT: ' '});
    x += KEY_SPACE_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_ALT_W, h: KEY_H, txtT: 'Alt'});
    x += KEY_ALT_W + KEY_FREE_X;
    multiplayerBox.keyboard.keys.push({x: x, y: y, w: KEY_CTRLR_W, h: KEY_H, txtT: 'Ctrl'});
}

function multiplayerCheckNameLength(str) {
    "use strict";
    var lctx, fits = true;
    lctx = multiplayerBox.context;
    lctx.font = '16pt ' + font;
    if (lctx.measureText(str).width > 250) { // check if it fits in multiplayer list
        fits = false;
    }
    lctx.font = '24pt ' + font;
    if (lctx.measureText(str).width > (multiplayerBox.keyboard.textBox.w - 40)) { // check if it fits in multiplayer list
        fits = false;
    }
    return fits;
}

function multiplayerKeyboardCheckInputOk() {
    "use strict";
    var badWords = [], i;
    if (language === LANG_NL) {
        badWords = ['lul', 'kut', 'neuk', 'fuck', 'penis', 'gvd', 'verdomme', 'hoer', 'seks', 'stom', 'stink', 'pedo'];
    } else if (language === LANG_DK) {
        badWords = ['røv', 'lort', 'pik', 'fisse', 'knep', 'fuck', 'luder', 'spasser', 'bøsse', 'lebbe', 'perker', 'skid', 'pis', 'patter', 'milf', 'bitch', 'hitler'];
    }

    badWords = badWords.concat(['milf', 'bitch', 'fuck', 'cunt', 'cock', 'wank', 'dick', 'suck', 'nigger', 'sex', 'vagina', 'asshole', 'ass hole', 'mother', 'moter', 'ass holl', 'myballs', 'miballs', 'is a', 'fukk', 'moter', 'motter', 'hitler']);

    // update inputOk field
    switch (multiplayerBox.state) {
        case multiplayerBoxStates.JOIN_ENTER_NAME:
            multiplayerBox.keyboard.textBox.inputOk = (multiplayerBox.keyboard.textBox.text.length >= 3);
            for (i = 0; i < badWords.length; i += 1) {
                if (multiplayerBox.keyboard.textBox.text.toLowerCase().indexOf(badWords[i]) >= 0) {
                    multiplayerBox.keyboard.textBox.inputOk = false;
                }
            }
            break;
        case multiplayerBoxStates.CREATE_GAME_ENTER_PASSWORD:
            multiplayerBox.keyboard.textBox.inputOk = (multiplayerBox.keyboard.textBox.text.length >= 4);
            for (i = 0; i < badWords.length; i += 1) {
                if (multiplayerBox.keyboard.textBox.text.toLowerCase().indexOf(badWords[i]) >= 0) {
                    multiplayerBox.keyboard.textBox.inputOk = false;
                }
            }
            break;
        case multiplayerBoxStates.JOIN_ENTER_PASSWORD:
            multiplayerBox.keyboard.textBox.inputOk = (multiplayerBox.keyboard.textBox.text === multiplayerUnwrapName(multiplayerBox.passwordSessionInfo.password));
            break;
    }
}

function multiplayerBoxHandleKey(key) {
    "use strict";
    if (key.txtT === 'Enter') {
        if (multiplayerBox.keyboard.textBox.inputOk) {
            switch (multiplayerBox.state) {
            case multiplayerBoxStates.JOIN_ENTER_NAME:
                multiplayerBox.name = multiplayerBox.keyboard.textBox.text;
                multiplayerBox.state = multiplayerBoxStates.JOIN;
                multiplayerBox.keyboard.active = false; // leave keyboard mode
                break;
            case multiplayerBoxStates.CREATE_GAME_ENTER_PASSWORD:
                multiplayerBox.password = multiplayerBox.keyboard.textBox.text;
                multiplayerBox.state = multiplayerBoxStates.CREATE_GAME;
                multiplayerBox.keyboard.active = false; // leave keyboard mode
                break;
            case multiplayerBoxStates.JOIN_ENTER_PASSWORD:
                multiplayerBox.password = multiplayerBox.keyboard.textBox.text;
                multiplayerBox.state = multiplayerBoxStates.JOIN;

                if (!multiplayerBox.mouseUpDelayActive) {
                    multiplayerStartMouseUpDelay();

                    $.get(PHP_FILENAME + "?gameid=" + multiplayerBox.gameId.toString() + "&cmd=join&name=" + multiplayerWrapName(multiplayerBox.name) + "&sessionid=" + multiplayerBox.passwordSessionInfo.id.toString() + "&password='" + multiplayerWrapName(multiplayerBox.passwordSessionInfo.password) + "'", function(data) {
                        var rxData;
                        multiplayerClearMouseUpDelay();
                        rxData = JSON.parse(data);
                        if (rxData.sessionid && rxData.playerid) {
                            startGameLobby(rxData.sessionid, rxData.playerid);
                        } else {
                            // error
                            multiplayerBox.state = multiplayerBoxStates.JOIN;
                        }
                        multiplayerBox.keyboard.active = false;
                    });
                }
                break;
            default:
                break;
            }
            draw();
        }
    } else if (key.txtT === "Backspace") {
        if (multiplayerBox.keyboard.textBox.text.length > 0) {
            multiplayerBox.keyboard.textBox.text = multiplayerBox.keyboard.textBox.text.slice(0, -1);
        }
    } else if (key.txtT === "Shift") {
        multiplayerBox.keyboard.textBox.shift = (multiplayerBox.keyboard.textBox.shift === false);
    } else if (key.txtT === "Caps") {
        multiplayerBox.keyboard.textBox.caps = (multiplayerBox.keyboard.textBox.caps === false);
    } else {
        if (getAlphabet(language).toUpperCase().indexOf(key.txtT) >= 0) {
            if (multiplayerCheckNameLength(multiplayerBox.keyboard.textBox.text + key.txtT)) {
                if (multiplayerBox.keyboard.textBox.caps || multiplayerBox.keyboard.textBox.shift) {
                    multiplayerBox.keyboard.textBox.text += key.txtT;
                } else  {
                    multiplayerBox.keyboard.textBox.text += key.txtT.toLowerCase();
                }
                multiplayerBox.keyboard.textBox.shift = false;
            }
        } else if (key.txtB && ("1234567890".indexOf(key.txtB) >= 0)) {
            if (multiplayerCheckNameLength(multiplayerBox.keyboard.textBox.text + key.txtB)) {
                multiplayerBox.keyboard.textBox.text += key.txtB.toLowerCase();
                multiplayerBox.keyboard.textBox.shift = false;
            }
        }
    }

    multiplayerKeyboardCheckInputOk();
    draw();
}

function multiplayerBoxHandleKeyTxt(txt) {
    "use strict";
    var i, key;
    for (i = 0; i < multiplayerBox.keyboard.keys.length; i += 1) {
        key = multiplayerBox.keyboard.keys[i];
        if ((key.txtT === txt) || (key.txtB === txt)) {
            multiplayerBoxHandleKey(key);
        }
    }
}

function fwMultiPlayerInit(gameId, startGameFunction, infoUpdateFunction, gameLobbyOnDraw, scoreBoardOnDraw, appOnMouseUp, appOnFirstMouseUp) {
    "use strict";
    multiplayerBox.context = addctx;

    if (g_multiplayerEasyMode === true) {
        multiplayerBox.easyMode = true;
    }

    multiplayerBox.gameId = gameId;
    multiplayerBox.startGameFunction = startGameFunction;
    multiplayerBox.infoUpdateFunction = infoUpdateFunction;
    multiplayerBox.gameLobbyOnDraw = gameLobbyOnDraw;
    multiplayerBox.scoreBoardOnDraw = scoreBoardOnDraw;
    multiplayerBox.appOnMouseUp = appOnMouseUp;
    multiplayerBox.appOnFirstMouseUp = appOnFirstMouseUp;

    multiplayerBox.w = 780;
    multiplayerBox.h = 550;
    multiplayerBox.x = Math.floor((canvas.width - multiplayerBox.w) / 2);
    multiplayerBox.y = Math.floor((canvas.height - multiplayerBox.h) / 2);

    // GAME LOBBY
    multiplayerBox.leaveGameBtn.x = (multiplayerBox.x + multiplayerBox.w) - (10 + multiplayerBox.leaveGameBtn.w);
    multiplayerBox.leaveGameBtn.y = multiplayerBox.y + 10;

    multiplayerBox.startGameBtn.x = multiplayerBox.leaveGameBtn.x - (20 + multiplayerBox.startGameBtn.w);
    multiplayerBox.startGameBtn.y = multiplayerBox.leaveGameBtn.y;

    multiplayerBox.gameLobbyBox.x = multiplayerBox.x + 10;
    multiplayerBox.gameLobbyBox.y = multiplayerBox.y + 100;
    multiplayerBox.gameLobbyBox.w = multiplayerBox.w - 20;
    multiplayerBox.gameLobbyBox.h = multiplayerBox.h - 110;

    // SCORE BOARD
    multiplayerBox.scoreLeaveGameBtn.x = (multiplayerBox.x + multiplayerBox.w) - (10 + multiplayerBox.scoreLeaveGameBtn.w);
    multiplayerBox.scoreLeaveGameBtn.y = multiplayerBox.y + 10;

    multiplayerBox.scoreContinueGameBtn.x = multiplayerBox.scoreLeaveGameBtn.x - (20 + multiplayerBox.startGameBtn.w);
    multiplayerBox.scoreContinueGameBtn.y = multiplayerBox.scoreLeaveGameBtn.y;

    // JOIN GAME BOARD
    if (multiplayerBox.easyMode !== true) {
        multiplayerBox.createGameBtn.x = (multiplayerBox.x + multiplayerBox.w) - (10 + multiplayerBox.createGameBtn.w);
        multiplayerBox.createGameBtn.y = multiplayerBox.y + 10;

        multiplayerBox.playNowBtn.x = multiplayerBox.createGameBtn.x - (20 + multiplayerBox.playNowBtn.w);
        multiplayerBox.playNowBtn.y = multiplayerBox.createGameBtn.y;
    } else {
        multiplayerBox.playNowBtn.w = 256 + 20 + 256;
        multiplayerBox.playNowBtn.x = (multiplayerBox.x + multiplayerBox.w) - (10 + multiplayerBox.playNowBtn.w);
        multiplayerBox.playNowBtn.y = multiplayerBox.y + 10;

        multiplayerBox.createGameBtn.w = 0;
    }

    multiplayerBox.listBox = {x: multiplayerBox.x + 10, y: multiplayerBox.y + 96, w: multiplayerBox.w - 20, h: 400, scrollPos: 0, size: 0, maxSize: 8};
    multiplayerBox.keyboard = {active: false, x: multiplayerBox.x + 15, y: 230, w: multiplayerBox.w - 30, h: 405 - 62, keys: []};
    multiplayerBox.keyboard.textBox = {x: (multiplayerBox.keyboard.x + multiplayerBox.keyboard.w) - (460 + 7), y: multiplayerBox.keyboard.y + 20, w: 460, h: 50, text: "ABC", shift: false, caps: false};

    // CREATE GAME BOARD
    multiplayerBox.checkboxPublic = {cx: multiplayerBox.x + 20 + 24, cy: multiplayerBox.y + 96 + 24, r: 24};
    multiplayerBox.checkboxPrivate = {cx: (862 / 2) + 20 + 24, cy: multiplayerBox.y + 96 + 24/* + 10 + 24 + 24*/, r: 24};

    multiplayerBox.createOkBtn.x = multiplayerBox.createGameBtn.x;
    multiplayerBox.createOkBtn.y = multiplayerBox.createGameBtn.y;

    multiplayerBox.createCancelBtn.x = multiplayerBox.playNowBtn.x;
    multiplayerBox.createCancelBtn.y = multiplayerBox.playNowBtn.y;

    switch (language) {
    case LANG_DK:
    case LANG_NO:
        multiplayerInitDanishKeyboard();
        break;
    case LANG_SE:
        multiplayerInitSwedishKeyboard();
        break;
    case LANG_DE:
        multiplayerInitGermanKeyboard();
        break;
    case LANG_SI:
        multiplayerInitSlovenianKeyboard();
        break;
    default:
        multiplayerInitKeyboard();
        break;
    }
}

var m_multiplayerSessions = [];

function processMultiplayer() {
    "use strict";
    var h, scrollbarW = 40, savy;
    if (multiplayerBox.listBox.scrollbar) {
        if (m_multiplayerSessions.length <= multiplayerBox.listBox.maxSize) {
            // scrollbar not needed anymore; remove it
            multiplayerBox.listBox.scrollbar = undefined;
            multiplayerBox.listBox.scrollPos = 0;
        } else {
            // update scrollbar hight
            multiplayerBox.listBox.scrollbar.button.h =
                Math.max(50, Math.floor((multiplayerBox.listBox.maxSize / m_multiplayerSessions.length) * multiplayerBox.listBox.scrollbar.h));
            if (multiplayerBox.listBox.scrollbar.button.y > ((multiplayerBox.listBox.y + multiplayerBox.listBox.h) - multiplayerBox.listBox.scrollbar.button.h)) {
                multiplayerBox.listBox.scrollbar.button.y = (multiplayerBox.listBox.y + multiplayerBox.listBox.h) - multiplayerBox.listBox.scrollbar.button.h;
            }
            //multiplayerBox.listBox.scrollbar.button.y = Math.min(multiplayerBox.listBox.scrollbar.button.y, ((multiplayerBox.listBox.y + multiplayerBox.listBox.h) - multiplayerBox.listBox.scrollbar.button.h));
        }
    } else {
        if (m_multiplayerSessions.length > multiplayerBox.listBox.maxSize) {
            // add scrollbar (at top)
            multiplayerBox.listBox.scrollbar = {x: multiplayerBox.listBox.x + multiplayerBox.listBox.w - scrollbarW, y: multiplayerBox.listBox.y, w: scrollbarW, h: multiplayerBox.listBox.h};
            h = Math.max(50, Math.floor((multiplayerBox.listBox.maxSize / m_multiplayerSessions.length) * multiplayerBox.listBox.scrollbar.h));
            multiplayerBox.listBox.scrollbar.button = {x: multiplayerBox.listBox.scrollbar.x, y: savy ? savy : multiplayerBox.listBox.scrollbar.y, w: scrollbarW, h: h};
        }
    }
    multiplayerBox.listBox.size = Math.min(m_multiplayerSessions.length, multiplayerBox.listBox.maxSize);
}

var m_debugSessions = 4;
var m_getPendingCount = 0;

function multiplayerGetSessions(force) {
    "use strict";
    var i, j, dateStr, strArray;

    if (force || (m_getPendingCount === 0)) {
        m_getPendingCount += 1;
        $.get(PHP_FILENAME + "?gameid=" + multiplayerBox.gameId.toString() + "&cmd=getsessions", function(data) {
            // use the result
            var i, rxData;
            rxData = JSON.parse(data);
            m_multiplayerSessions = [];
            // find the active sessions
            for (i = 0; i < rxData.players.length; i += 1) {
                if (rxData.players[i].sessionstate !== undefined) {
                    m_multiplayerSessions.push({name: multiplayerUnwrapName(rxData.players[i].name), id: rxData.players[i].sessionid, state: rxData.players[i].sessionstate, password: rxData.players[i].password, count: 1});
                }
            }
            // check for players that joined sessions (to calculate number of players per session)
            for (i = 0; i < rxData.players.length; i += 1) {
                if (rxData.players[i].sessionstate === undefined) {
                    for (j = 0; j < m_multiplayerSessions.length; j += 1) {
                        if (m_multiplayerSessions[j].id === rxData.players[i].sessionid) {
                            m_multiplayerSessions[j].count += 1;
                        }
                    }
                }
            }
            processMultiplayer();
            draw(); // make sure draw is called on this async return

            m_getPendingCount = Math.max(0, m_getPendingCount - 1);
        });
    }
}

function multiplayerGetSessionInfo(force) {
    "use strict";
    var j, gameInfoReceived;
    //if (document.location.pathname.indexOf("D:") < 0) {

    if (force || (m_getPendingCount === 0)) {
        m_getPendingCount += 1;
        $.get(PHP_FILENAME + "?gameid=" + multiplayerBox.gameId.toString() + "&cmd=getsessioninfo&sessionid=" + multiplayerBox.sessionId + "&playerid=" + multiplayerBox.playerId + "&avatarid=" + multiplayerBox.avatarid, function(data) {
            // use the result
            var i, rxData, infoArray, userArray, id, sessionOwnerPresent = false, timePast;
            rxData = JSON.parse(data);
            multiplayerBox.players = [];
            for (i = 0; i < rxData.players.length; i += 1) {
                multiplayerBox.players.push({name: multiplayerUnwrapName(rxData.players[i].name), id: rxData.players[i].id, avatarid: rxData.players[i].avatarid, timestamp: rxData.players[i].timestamp, info: rxData.players[i].info});
            }
            if (multiplayerBox.sessionState !== rxData.sessionstate) {
                multiplayerBox.sessionState = rxData.sessionstate;
                // handle new state
                switch (multiplayerBox.sessionState) {
                case 1:
                    // countdown started
                    multiplayerBox.countdownStartTime = new Date().getTime();
                    multiplayerBox.state = multiplayerBoxStates.GAME_LOBBY_COUNTDOWN;

                    // clear previous game
                    multiplayerBox.gameInfo = undefined;
                    break;
                case 2:
                    // game started

                    // close multiplayer box
                    multiplayerBox.active = false;
                    // clear screen
                    multiplayerBox.context.clearRect(0, 0, canvas.width, canvas.height);

                    multiplayerBox.state = multiplayerBoxStates.PLAY;
                    // and start game (handler stays active on background)
                    multiplayerBox.startGameFunction();
                    draw();
                    break;
                case -2:
                    // session owner fleed the game :-(
                    break;
                default:
                    break;
                }
            }
            switch (multiplayerBox.sessionState) {
            case 1:
                if (multiplayerBox.playerId === multiplayerBox.players[0].id) {
                    // session owner (first player) will start the game after timeout has finished
                    timePast = new Date().getTime() - multiplayerBox.countdownStartTime;
                    if (timePast > 3000) {
                        $.get(PHP_FILENAME + "?gameid=" + multiplayerBox.gameId.toString() + "&cmd=start&sessionid=" + multiplayerBox.sessionId, function(data) {
                            draw();
                        });
                    }
                }
                break;
            default:
                break;
            }

            if (multiplayerBox.state === multiplayerBoxStates.PLAY) {
                // always continue; even if session owner left
                multiplayerBox.racers = [];
                for (i = 0; i < 4; i += 1) {
                    multiplayerBox.racers.push({});
                }
                gameInfoReceived = false;
                for (i = 0; i < multiplayerBox.players.length; i += 1) {
                    infoArray = multiplayerBox.players[i].info.split(';');
                    for (j = 0; j < infoArray.length; j += 1) {
                        userArray = infoArray[j].split('=');
                        if (userArray[0] === "score") {
                            if (i === multiplayerGetSessionOwnerIndex()) {
                                multiplayerBox.scoreInfo = userArray[1];
                            }
                        } else if (userArray[0] === "game") {
                            // game initialisation information
                            if (!gameInfoReceived) {
                                gameInfoReceived = false;
                                multiplayerBox.gameInfo = userArray[1];
                            }
                        } else {
                            id = parseInt(userArray[0]);
                            if (id < 10) {
                                // computer user (make sure they are at the correct position)
                                multiplayerBox.racers[multiplayerBox.players.length + (j - 1)] = {name: multiplayerGetString(sidMultiplayer.COMPUTER) + id.toString(), id: id, avatarid: 0, info: userArray.length >= 2 ? userArray[1] : ""};
                            } else {
                                multiplayerBox.racers[i] = {name: multiplayerBox.players[i].name, id: id, avatarid: multiplayerBox.players[i].avatarid, info: userArray.length >= 2 ? userArray[1] : ""};
                            }
                        }
                    }
                }
            }

            // always update game with data during PLAY
            if (multiplayerBox.sessionState === 2) {
                if (multiplayerBox.infoUpdateFunction) {
                    // trigger new information is available
                    multiplayerBox.infoUpdateFunction();
                }
            }

            draw(); // make sure draw is called on this async return

            m_getPendingCount = Math.max(0, m_getPendingCount - 1);
        });
    }
}

var m_updatePrescaler = 0;

function multiplayerUpdateHandler() {
    "use strict";
    switch (multiplayerBox.state) {
    case multiplayerBoxStates.JOIN:
    case multiplayerBoxStates.JOIN_ENTER_NAME:
    case multiplayerBoxStates.JOIN_ENTER_PASSWORD:
        if ((m_updatePrescaler % 2) === 1) {
            multiplayerGetSessions((m_updatePrescaler === 7));
        }
        break;
    case multiplayerBoxStates.GAME_LOBBY:
        if ((m_updatePrescaler % 2) === 1) {
            multiplayerGetSessionInfo((m_updatePrescaler === 7));
        }
        break;
    case multiplayerBoxStates.GAME_LOBBY_COUNTDOWN:
    case multiplayerBoxStates.PLAY:
        multiplayerGetSessionInfo((m_updatePrescaler === 7));
        break;
    //case multiplayerBoxStates.CREATE_GAME:
    //case multiplayerBoxStates.CREATE_GAME_ENTER_PASSWORD:
    //case multiplayerBoxStates.SCORE_BOARD:
    default:
        break;
    }
    m_updatePrescaler = (m_updatePrescaler + 1) % 8;
}

function fwMultiPlayerStart(debug) {
    "use strict";
    console.log('fwMultiPlayerStart');
    m_updatePrescaler = 0;
    multiplayerGetSessions(true);
    if (multiplayerBox.updateInterval !== null) {
        clearInterval(multiplayerBox.updateInterval);
        multiplayerBox.updateInterval = null;
    }
    multiplayerBox.updateInterval = setInterval(function () {
        multiplayerUpdateHandler();
    }, 1000);

    multiplayerBox.active = true;
    if (debug === true) {
        multiplayerBox.name = 'debug';
        $.get(PHP_FILENAME + "?gameid=" + multiplayerBox.gameId.toString() + "&cmd=join&name=" + multiplayerWrapName(multiplayerBox.name) + "&sessionid=-1" + "&password=''", function(data) {
            var rxData;
            multiplayerClearMouseUpDelay();
            rxData = JSON.parse(data);
            if (rxData.sessionid && rxData.playerid) {
                startGameLobby(rxData.sessionid, rxData.playerid);

                $.get(PHP_FILENAME + "?gameid=" + multiplayerBox.gameId.toString() + "&cmd=startcountdown&sessionid=" + multiplayerBox.sessionId, function(data) {
                    multiplayerClearMouseUpDelay();
                    draw();
                });
            }
        });

    } else {
        multiplayerBox.state = multiplayerBoxStates.JOIN_ENTER_NAME;
        multiplayerActivateKeyboard();
    }
    draw();
}

function fwMultiplayerStartScoreBoard() {
    "use strict";
    multiplayerBox.active = true;
    multiplayerBox.state = multiplayerBoxStates.SCORE_BOARD;
    draw();
}

function fwPushPlayerInfo(info) {
    "use strict";
    $.get(PHP_FILENAME + "?gameid=" + multiplayerBox.gameId.toString() + "&cmd=pushplayerinfo&playerid=" + multiplayerBox.playerId + "&playerinfo=\"" + info + "\"", function(data) {
    });
}

function multiplayerGetSessionOwnerIndex() {
    "use strict";
    var i, timestamp, playerTimestamp, sessionOwnerIndex = -1;
    // find player with recent timestamp
    if (multiplayerBox.players && (multiplayerBox.players.length > 0)) {
        for (i = 0; i < multiplayerBox.players.length; i += 1) {
            if (multiplayerBox.players[i].id === multiplayerBox.playerId) {
                playerTimestamp = multiplayerBox.players[i].timestamp;
            }
        }
        for (i = 0; i < multiplayerBox.players.length; i += 1) {
            if (sessionOwnerIndex < 0) {
                if (multiplayerBox.players[i].id === multiplayerBox.playerId) {
                    sessionOwnerIndex = i;
                } else {
                    timestamp = playerTimestamp - multiplayerBox.players[i].timestamp;
                    if (timestamp < 5) {
                        sessionOwnerIndex = i;
                    }
                }
            }
        }
    }
    return sessionOwnerIndex;
}

function fwMultiplayerIsSessionOwner() {
    "use strict";
    var sessionOwnerIndex;
    // find player with recent timestamp
    sessionOwnerIndex = multiplayerGetSessionOwnerIndex();
    return (sessionOwnerIndex >= 0) && (multiplayerBox.playerId === multiplayerBox.players[sessionOwnerIndex].id)
    // return (multiplayerBox.players && (multiplayerBox.players.length > 0) && multiplayerBox.playerId === multiplayerBox.players[0].id);
}

function multiplayerDrawButton(lctx, button) {
    "use strict";
    if (button.w > 0) {
        var g;
        lctx.save();
        lctx.translate(button.x, button.y);
        g = lctx.createLinearGradient(0, 0, 0, button.h);
        g.addColorStop(0, "rgb(128, 128, 128)");
        g.addColorStop(1, "black");
        lctx.fillStyle = g;
        fwStrokeFillRect(lctx, 0, 0, button.w, button.h, 'black', 2, g);
        fwFillText(lctx, multiplayerGetString(button.sid), Math.floor(button.w / 2), Math.floor(button.h / 2) + 7, "bold 13pt " + font, 'white', 'center');
        lctx.restore();
    }
}

function multiplayerOnLoad() {
    "use strict";
    multiplayerBox.image = new Image();
    fwAddImageToLoad(multiplayerBox.image, "multiplayer.png");
}

function multiplayerOnDraw() {
    "use strict";
    var lctx, i, j, button, g, cx, x, y, key, style, scoreStr, m, s, t, cursorX, text, id, timePast, texts, text;
    lctx = multiplayerBox.context;
    lctx.clearRect(0, 0, canvas.width, canvas.height);
    fwFillRect(lctx, multiplayerBox.x, multiplayerBox.y, multiplayerBox.w, multiplayerBox.h, 'rgba(255,255,255,0.95)');
    cx = multiplayerBox.x + (multiplayerBox.w / 2);
    switch (multiplayerBox.state) {
    case multiplayerBoxStates.JOIN:
    case multiplayerBoxStates.JOIN_ENTER_NAME:
    case multiplayerBoxStates.JOIN_ENTER_PASSWORD:
        lctx.clearRect(multiplayerBox.x, multiplayerBox.y, multiplayerBox.w, 80);
        // draw header
        fwFillRect(lctx, multiplayerBox.x, multiplayerBox.y, multiplayerBox.w, 80, 'rgba(128,128,128,0.95)');
        fwFillText(lctx, multiplayerGetString(sidMultiplayer.JOIN_GAME), multiplayerBox.x + 15, multiplayerBox.y + 10 + 28 + 16, '32pt ' + font, 'white', 'left');
        // draw PLAY NOW button
        multiplayerDrawButton(lctx, multiplayerBox.playNowBtn);
        // draw CREATE GAME button
        multiplayerDrawButton(lctx, multiplayerBox.createGameBtn);

        // draw SESSION BOX frame
        fwFillRect(lctx, multiplayerBox.listBox.x, multiplayerBox.listBox.y, multiplayerBox.listBox.w, multiplayerBox.listBox.h, 'rgb(235,235,235)');
        // calculate scrollbar position
        if (multiplayerBox.listBox.scrollbar) {
            if ((multiplayerBox.listBox.scrollbar.button.y + multiplayerBox.listBox.scrollbar.button.h) === (multiplayerBox.listBox.scrollbar.y + multiplayerBox.listBox.scrollbar.h)) {
                // at lowest position
                // this causes 'jump', but does not occur with 100 entries!
                multiplayerBox.listBox.scrollPos = m_multiplayerSessions.length - multiplayerBox.listBox.size;
            } else {
                multiplayerBox.listBox.scrollPos = Math.floor(((multiplayerBox.listBox.scrollbar.button.y - multiplayerBox.listBox.scrollbar.y) / multiplayerBox.listBox.scrollbar.h) * m_multiplayerSessions.length);
            }
        }
        // draw SESSION BOX items
        for (i = 0; i < multiplayerBox.listBox.size; i += 1) {
            j = i + multiplayerBox.listBox.scrollPos;
            y = multiplayerBox.listBox.y + (i * 50);
            if ((j % 2) === 1) {
                fwFillRect(lctx, multiplayerBox.listBox.x, y, multiplayerBox.listBox.w, 50, 'rgb(192,192,192)');
            }
            if (m_multiplayerSessions[j].password !== "") {
                lctx.drawImage(multiplayerBox.image, multiplayerBox.listBox.x + 10, y + 25 - Math.floor(multiplayerBox.image.height / 2));
            }
            // fwFillText(lctx, (m_multiplayerSessions[j].password !== "") ? 'L' : 'P', multiplayerBox.listBox.x + 10, y + 25 + 8, '16pt ' + font, 'black', 'left');
            fwFillText(lctx, multiplayerGetString(sidMultiplayer.PLAYERS_GAME).replace('%1', m_multiplayerSessions[j].name), multiplayerBox.listBox.x + 55, y + 25 + 8, '16pt ' + font, 'black', 'left');

            if (document.location.pathname.indexOf("D:") >= 0) {
                fwFillText(lctx, m_multiplayerSessions[j].id.toString(), multiplayerBox.listBox.x + 540, y + 25 + 8, '16pt ' + font, 'black', 'left');
            }
            text = "(" + m_multiplayerSessions[j].count.toString() + " " + multiplayerGetString(m_multiplayerSessions[j].count > 1 ? sidMultiplayer.PLAYERS : sidMultiplayer.PLAYER) + ")";
            fwFillText(lctx, text, multiplayerBox.listBox.x + 440, y + 25 + 8, '16pt ' + font, 'black', 'left');

            button = {x: multiplayerBox.listBox.x + 650 - 40, y: y + 5, w: 100, h: 40, sid: sidMultiplayer.JOIN};
            lctx.save();
            lctx.translate(button.x, button.y);
            g = lctx.createLinearGradient(0, 0, 0, 40);
            g.addColorStop(0, "rgb(128, 128, 128)");
            g.addColorStop(1, "black");
            lctx.fillStyle = g;
            fwStrokeFillRect(lctx, 0, 0, button.w, button.h, 'black', 2, g);
            fwFillText(lctx, multiplayerGetString(button.sid), Math.floor(button.w / 2), Math.floor(button.h / 2) + 7, "bold 13pt " + font, 'white', 'center');
            lctx.restore();

            y += 50;
        }
        fwStrokeRect(lctx, multiplayerBox.listBox.x, multiplayerBox.listBox.y, multiplayerBox.listBox.w, multiplayerBox.listBox.h, 'black', 3);

        // draw SESSION BOX scrollbar
        if (multiplayerBox.listBox.scrollbar) {
            fwStrokeFillRect(lctx, multiplayerBox.listBox.scrollbar.x, multiplayerBox.listBox.scrollbar.y, multiplayerBox.listBox.scrollbar.w, multiplayerBox.listBox.scrollbar.h, 'black', 3, 'rgb(235,235,235)');
            fwStrokeFillRect(lctx, multiplayerBox.listBox.scrollbar.button.x, multiplayerBox.listBox.scrollbar.button.y, multiplayerBox.listBox.scrollbar.button.w, multiplayerBox.listBox.scrollbar.button.h, 'black', 5, 'rgb(210,210,210)');
        }

        break;
    case multiplayerBoxStates.CREATE_GAME:
    case multiplayerBoxStates.CREATE_GAME_ENTER_PASSWORD:
        lctx.clearRect(multiplayerBox.x, multiplayerBox.y, multiplayerBox.w, 80);
        fwFillRect(lctx, multiplayerBox.x, multiplayerBox.y, multiplayerBox.w, 80, 'rgba(128,128,128,0.95)');
        fwFillText(lctx, multiplayerGetString(sidMultiplayer.CREATE_GAME), multiplayerBox.x + 15, multiplayerBox.y + 10 + 28 + 16, '32pt ' + font, 'white', 'left');

        multiplayerDrawButton(lctx, multiplayerBox.createCancelBtn);
        multiplayerDrawButton(lctx, multiplayerBox.createOkBtn);

        fwStrokeFillArc(lctx, multiplayerBox.checkboxPublic.cx, multiplayerBox.checkboxPublic.cy, multiplayerBox.checkboxPublic.r, 'black', 3, 'white');
        if (multiplayerBox.publicSelected) {
            fwFillArc(lctx, multiplayerBox.checkboxPublic.cx, multiplayerBox.checkboxPublic.cy, multiplayerBox.checkboxPublic.r - 6, 'black');
        }
        fwFillText(lctx, multiplayerGetString(sidMultiplayer.PUBLIC_GAME), multiplayerBox.checkboxPublic.cx + multiplayerBox.checkboxPublic.r + 20,
            multiplayerBox.checkboxPublic.cy + 12, '24pt ' + font, 'black', 'left');
        fwStrokeFillArc(lctx, multiplayerBox.checkboxPrivate.cx, multiplayerBox.checkboxPrivate.cy, multiplayerBox.checkboxPrivate.r, 'black', 3, 'white');
        if (!multiplayerBox.publicSelected) {
            fwFillArc(lctx, multiplayerBox.checkboxPrivate.cx, multiplayerBox.checkboxPrivate.cy, multiplayerBox.checkboxPrivate.r - 6, 'black');
        }
        fwFillText(lctx, multiplayerGetString(sidMultiplayer.PRIVATE_GAME), multiplayerBox.checkboxPrivate.cx + multiplayerBox.checkboxPrivate.r + 20,
            multiplayerBox.checkboxPrivate.cy + 12, '24pt ' + font, 'black', 'left');
        fwFillText(lctx, multiplayerGetString(sidMultiplayer.PASSWORD) + ": " + multiplayerBox.password, multiplayerBox.checkboxPrivate.cx + multiplayerBox.checkboxPrivate.r + 20,
            multiplayerBox.checkboxPrivate.cy + 30 + 7, '14pt ' + font, 'black', 'left');

        texts = multiplayerGetString(sidMultiplayer.PRIVATE_EXLANATION).split('|');
        for (i = 0; i < texts.length; i += 1) {
            fwFillText(lctx, texts[i], multiplayerBox.checkboxPublic.cx - multiplayerBox.checkboxPublic.r, multiplayerBox.checkboxPrivate.cy + 50 + (i * 18) + 6, '12pt ' + font, 'black', 'left');
        }
        break;
    case multiplayerBoxStates.GAME_LOBBY:
    case multiplayerBoxStates.GAME_LOBBY_COUNTDOWN:
        // DRAW GAME LOBBY FRAMEWORK
        lctx.clearRect(multiplayerBox.x, multiplayerBox.y, multiplayerBox.w, 80);
        fwFillRect(lctx, multiplayerBox.x, multiplayerBox.y, multiplayerBox.w, 80, 'rgba(128,128,128,0.95)');
        fwFillText(lctx, multiplayerGetString(sidMultiplayer.GAME_LOBBY), multiplayerBox.x + 15, multiplayerBox.y + 10 + 28 + 16, '32pt ' + font, 'white', 'left');
        multiplayerDrawButton(lctx, multiplayerBox.leaveGameBtn);
        if (multiplayerBox.state === multiplayerBoxStates.GAME_LOBBY) {
            multiplayerDrawButton(lctx, multiplayerBox.startGameBtn);
        } else {
            timePast = new Date().getTime() - multiplayerBox.countdownStartTime;
            s = Math.max(1, 3 - Math.floor(timePast / 1000));
            fwFillText(lctx, s.toString(), multiplayerBox.startGameBtn.x + (multiplayerBox.startGameBtn.w / 2), multiplayerBox.startGameBtn.y + (multiplayerBox.startGameBtn.h / 2) + 20, '40pt ' + font, 'white', 'center');
        }

        lctx.save();
        lctx.translate(multiplayerBox.x + 10, multiplayerBox.y + 100);
        if (multiplayerBox.gameLobbyOnDraw) {
            multiplayerBox.gameLobbyOnDraw(lctx);
        }
        lctx.restore();
        break;
    case multiplayerBoxStates.SCORE_BOARD:
        // draw SCORE BOARD framework
        lctx.clearRect(multiplayerBox.x, multiplayerBox.y, multiplayerBox.w, 80);
        fwFillRect(lctx, multiplayerBox.x, multiplayerBox.y, multiplayerBox.w, 80, 'rgba(128,128,128,0.95)');
        fwFillText(lctx, multiplayerGetString(sidMultiplayer.GAME_RESULTS), multiplayerBox.x + 15, multiplayerBox.y + 10 + 28 + 16, '32pt ' + font, 'white', 'left');

        multiplayerDrawButton(lctx, multiplayerBox.scoreLeaveGameBtn);
        multiplayerDrawButton(lctx, multiplayerBox.scoreContinueGameBtn);

        // draw SCORE BOARD user part
        lctx.save();
        lctx.translate(multiplayerBox.x + 10, multiplayerBox.y + 100);
        if (multiplayerBox.scoreBoardOnDraw) {
            multiplayerBox.scoreBoardOnDraw(lctx);
        }
        lctx.restore();
        break;
    default:
        break;
    }
    // draw KEYBOARD on top of other
    if (multiplayerBox.keyboard.active) {
        fwFillRect(lctx, multiplayerBox.x, multiplayerBox.y, multiplayerBox.w, multiplayerBox.h, 'rgba(0,0,0,0.7)');
        lctx.clearRect(multiplayerBox.keyboard.x, multiplayerBox.keyboard.y, multiplayerBox.keyboard.w, multiplayerBox.keyboard.h);
        fwFillRect(lctx, multiplayerBox.keyboard.x, multiplayerBox.keyboard.y, multiplayerBox.keyboard.w, multiplayerBox.keyboard.h, 'rgba(255,255,255,0.95)');

        id = (multiplayerBox.state === multiplayerBoxStates.JOIN_ENTER_NAME) ? sidMultiplayer.ENTER_YOUR_NAME : sidMultiplayer.ENTER_PASSWORD;
        fwFillText(lctx, multiplayerGetString(id), multiplayerBox.keyboard.x + 10, multiplayerBox.keyboard.textBox.y + (multiplayerBox.keyboard.textBox.h / 2) + 8, '16pt ' + font, 'black', 'left');
        fwStrokeFillRect(lctx, multiplayerBox.keyboard.textBox.x, multiplayerBox.keyboard.textBox.y, multiplayerBox.keyboard.textBox.w, multiplayerBox.keyboard.textBox.h, 'black', 3, 'white');

        fwFillText(lctx, multiplayerBox.keyboard.textBox.text, multiplayerBox.keyboard.textBox.x + 10, multiplayerBox.keyboard.textBox.y + (multiplayerBox.keyboard.textBox.h / 2) + 12, '24pt ' + font, 'black', 'left');
        cursorX = multiplayerBox.keyboard.textBox.x + 10 + lctx.measureText(multiplayerBox.keyboard.textBox.text).width;
        fwStroke(lctx, cursorX, multiplayerBox.keyboard.textBox.y + (multiplayerBox.keyboard.textBox.h / 2) + 16 + 2, 20, 0, 'black', 2);

        for (i = 0; i < multiplayerBox.keyboard.keys.length; i += 1) {
            key = multiplayerBox.keyboard.keys[i];
            style = 'white';
            if ((key.txtT === 'Shift') && multiplayerBox.keyboard.textBox.shift) {
                style = 'rgb(200,200,200)';
            } else if ((key.txtT === 'Caps') && multiplayerBox.keyboard.textBox.caps) {
                style = 'rgb(200,200,200)';
            } else if ((key.txtT === 'Enter') && multiplayerBox.keyboard.textBox.inputOk) {
                style = DIGIPUZZLE_GREEN;
            }
            fwStrokeFillRect(lctx, key.x, key.y, key.w, key.h, 'gray', 3, style);
            if (key.txtT.length === 1) {
                style = ((getAlphabet(language).toUpperCase() + "1234567890").indexOf(key.txtT) >= 0) ? 'gray' : 'rgb(210,210,210)';
                fwFillText(lctx, key.txtT, key.x + 8, key.y + Math.floor(key.h * 0.250) + 6, '12pt ' + font, style, 'left');
            } else {
                style = ((key.txtT === 'Shift') || (key.txtT === 'Caps') || (key.txtT === 'Backspace') || (key.txtT === 'Enter')) ? 'gray' : 'rgb(210,210,210)';
                fwFillText(lctx, key.txtT, key.x + 8, key.y + Math.floor(key.h * 0.250) + 4, '8pt ' + font, style, 'left');
            }
            if (key.txtB) {
                style = ((getAlphabet(language).toUpperCase() + "1234567890").indexOf(key.txtB) >= 0) ? 'gray' : 'rgb(210,210,210)';
                fwFillText(lctx, key.txtB, key.x + 8, key.y + Math.floor(key.h * 0.750) + 6, '12pt ' + font, style, 'left');
            }
        }
    }
}
