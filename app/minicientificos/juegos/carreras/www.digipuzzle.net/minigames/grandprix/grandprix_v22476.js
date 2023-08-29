/*global fwRegisterOnMouseUp, fwRegisterOnMouseDown, fwRegisterOnMouseMove, fwRegisterOnInit, fwRegisterOnDraw, fwRegisterOnKeyDown, fwRegisterOnKeyUp, fwRegisterOnLevelButtonUp, fwRegisterOnDrawHelp, fwRegisterOnKeyPressed */
/*global matchArray, fwEnableGameTimer */
/*global fwClearResult, fwResultAddPoint, fwResultOk, fwResultNotOk, fwGetScoreResult, SCORE_NONE, SCORE_OK, SCORE_NOK, fwIsInitialized */
/*global draw, debugMode, language, drawHelp*/
/*global fwTriggerNextPicture*/
/*global fwDrawCredits, fwDrawBottomAdd, fwDrawExampleButton, fwGetDistance*/
/*global puzzleImage, puzzleCanvas, watermark, watermarkImage, allPuzzles*/
/*global gameMode, GM_MEMORY, pictureArray, snapEnabled, gameStarted*/
/*global backgroundColor, borderColor, buttonColor*/
/*global canvas, bgctx, ctx, topctx, addctx*/
/*global graphicsFlipImage, graphicsMirrorImage, graphicsGrayScaleImage,  graphicsEdgeDetection, minEdge:true, stackBlurCanvasRGB*/
/*global LANG_EN, LANG_NL, LANG_DE, LANG_FR, LANG_ES, LANG_PT, LANG_DK*/
/*global fwPointInBox, fwFillRect, fwFillText, fwFillArc, fwDrawBgImage, fwDrawLogoButton*/
/*global BUTTON_X, MODE_BUTTON_Y*/
/*global categoryWords, getRnd, rndWord, extLogoImage, logoImageName*/
/*global gameLevel:true, gameLevels:true, fwIncGameLevel, fwDrawGameLevel, fwStartGame, fwAddButton, fwStrokeFillRect*/
/*global loadQuiz, textColor, fwRegisterGame, font*/
/*global rndQuestion, initRndList, getRnd, fwStroke, distance, MODE_BUTTON_X, MODE_BUTTON_Y, MODE_BUTTON_W, MODE_BUTTON_H, pictureIndex*/
/*global NEXT_BUTTON_X, NEXT_BUTTON_Y, NEXT_BUTTON_W, NEXT_BUTTON_H, GAME_BUTTON_X, GAME_BUTTON_Y, GAME_BUTTON_W, GAME_BUTTON_H*/
/*global noAutoNextPuzzle, startHighlightNext*/
/*global helpcanvas, helpctx, g_overlayCtx:true*/
/*global isTouchSupported, helpMode, fwStrokeFillText, fwFillText*/
/*global optionsBox, fwStartOptionsBox, fwRegisterOnOptionsSync, fwRegisterOnOptionsChanged, getFwString, sidFw*/
var m_drawBackground;
var GAME_INTERVAL_MS = 20;

var DASHBOARD_W = 400;
var DASHBOARD_H = 140;
var DASHBOARD_X = (788 / 2) - (DASHBOARD_W / 2);
var DASHBOARD_Y = (606 - 10) - DASHBOARD_H;

var CAR_HEIGHT = 39;
var CAR_WIDTH = 70;

var m_buttons = [];

var MT_MULTIPLICATIONS = "multiplications";
var MT_MATH_TILL_100 = "math_till_100";
var MT_MATH_TILL_20 = "math_till_20";
var MT_MATH_MIX = "math_mix";
var MT_DIVISIONS = "divisions";
var MT_TYPING = "typing";

var g_multiplayerGameId = g_multiplayerGameId || 1;
var g_trackMetaData = g_trackMetaData || undefined;
var g_trackImageFileName = g_trackImageFileName || undefined;
var g_mathType = g_mathType || MT_MULTIPLICATIONS;
var g_carsImageFileName = g_carsImageFileName || undefined || "cars.png";
var g_wordList = g_wordList || undefined;

var m_track;
var m_trackImage = new Image();
var m_debugOffsetX = 0, m_debugOffsetY = 0;
var m_carsImage = new Image();
var m_startTime;
var m_gameInterval;
var m_myCarIndex = 0;
var m_cars = [];
var m_question;
var m_smokeImage = new Image();
var m_medalsImage = new Image();
var m_questionTimer;
var m_timestamp;

var m_waiting3Sample = { startTime: 0, endTime: 1 };
var m_waiting2Sample = { startTime: 2, endTime: 3 };
var m_waiting1Sample = { startTime: 4, endTime: 5 };
var m_startSample = { startTime: 6, endTime: 7.2 };
var m_silenceSample = { startTime: 17, endTime: 17.2 };
var m_turboSample = { startTime: 18, endTime: 19.4 };
var m_honkSample = { startTime: 20, endTime: 21 };
var m_breakSample = { startTime: 12, endTime: 13.5 };
var m_rndLimit;
var m_raceTime;
var m_scorePushed = false;

var phases = {
    WAITING:                        0,
    WAITING_3:                      1,
    WAITING_2:                      2,
    WAITING_1:                      3,
    RACING:                         4,
    FINISHED:                       5,
    SCORE:                          6
}
var m_phase;

var sid = {
    TYPE_THE_WORD:                  0
};

function getString(id) {
    "use strict";
    var texts = [];
    switch (id) {
    case sid.TYPE_THE_WORD:
        texts = ["Type the word",
            "Typ het woord",
            "Tippe das Wort",
            "Tast ordet",
            "Escribe la palabra",
            "",
            "",
            "",
            "Skriv ordet",
            "Natipkaj besedo."];
        break;
    default:
        break;
    }
    return (fwPickLanguageText(texts));
}

function pushPlayerInfo() {
    "use strict";
    var info, i;
    if (multiplayerBox.playerId !== undefined) {
        info = multiplayerBox.playerId.toString() + "=" + m_cars[m_myCarIndex].timeStamps.toString();
        if (fwMultiplayerIsSessionOwner()) {
            // add computers
            for (i = multiplayerBox.players.length; i < 4; i+= 1) {
                info += ";" + i.toString() + "=" + m_cars[i].timeStamps.toString();
            }
        }
        // add score if final
        if (m_cars[m_myCarIndex].score !== undefined) {
            info += ";score=";
            for (i = 0; i < m_cars.length; i += 1) {
                info += (i > 0) ? "," : "";
                info += m_cars[i].score.toString() + "-" + m_cars[i].finishedTimeStamp.toString();
            }
        }
        fwPushPlayerInfo(info);
    }
}

function handleButton(button) {
    "use strict";
    if ((m_phase === phases.RACING) && (m_questionTimer === 0)) {
        if (button.correct) {
            m_cars[m_myCarIndex].scoreCnt = 20;
            m_cars[m_myCarIndex].timeStamps.push(m_timestamp);
            nextQuestion();
            pushPlayerInfo();
            fwPlayAudio(m_turboSample, false);
        } else {
            m_questionTimer = 80;
            fwPlayAudio(m_breakSample, false);
        }
    }
}

function grandPrixOnFirstMouseUp() {
    "use strict";
    fwPlayAudio(m_silenceSample, false);
}

function grandPrixOnMouseUp(mouseX, mouseY) {
    "use strict";
    var i, button;
    switch (multiplayerBox.state) {
    case multiplayerBoxStates.JOIN:
    case multiplayerBoxStates.JOIN_ENTER_NAME:
    case multiplayerBoxStates.JOIN_ENTER_PASSWORD:
        break;
    case multiplayerBoxStates.GAME_LOBBY:
        multiplayerBox.avatarid = (multiplayerBox.avatarid + 1) % 3;
        break;
    case multiplayerBoxStates.PLAY:
        if (m_questionTimer === 0) {
            for (i = 0; i < m_buttons.length; i += 1) {
                button = m_buttons[i];
                if (fwPointInBox(mouseX, mouseY, button.x, button.y, button.w, button.h)) {
                    handleButton(button);
                }
            }
        }
        break;
    case multiplayerBoxStates.CREATE_GAME:
    case multiplayerBoxStates.CREATE_GAME_ENTER_PASSWORD:
    case multiplayerBoxStates.SCORE_BOARD:
    default:
        break;
    }
}

function grandPrixOnKeyPressed(charCode) {
    "use strict";
    var c = String.fromCharCode(charCode);
    c = c.toLowerCase();
    switch (c) {
    case '1':
        handleButton(m_buttons[0]);
        break;
    case '2':
        handleButton(m_buttons[1]);
        break;
    case '3':
        handleButton(m_buttons[2]);
        break;
    case '4':
        handleButton(m_buttons[3]);
        break;
    case 'a':
    case 'b':
    case 'c':
    case 'd':
    case 'e':
    case 'f':
    case 'g':
    case 'h':
    case 'i':
    case 'j':
    case 'k':
    case 'l':
    case 'm':
    case 'n':
    case 'o':
    case 'p':
    case 'q':
    case 'r':
    case 's':
    case 't':
    case 'u':
    case 'v':
    case 'w':
    case 'x':
    case 'y':
    case 'z':
    case 'æ': // danish
    case 'ø':
    case 'å':
    case 'ä': // german
    case 'ö':
    case 'ü':
    case 'ß':
    case 'č': // slovenian
    case 'š':
    case 'ž':
        if ((g_mathType === MT_TYPING) && (m_phase === phases.RACING) && (m_questionTimer === 0)) {
            if (c === m_typingWord.target[m_typingWord.value.length].toLowerCase()) {
                m_typingWord.value += m_typingWord.target[m_typingWord.value.length];
                if (m_typingWord.value.length === m_typingWord.target.length) {
                    m_cars[m_myCarIndex].scoreCnt = 20;
                    m_cars[m_myCarIndex].timeStamps.push(m_timestamp);
                    nextQuestion();
                    pushPlayerInfo();
                    fwPlayAudio(m_turboSample, false);
                }
            } else {
                m_typingWord.error += c;
                m_questionTimer = 80;
                fwPlayAudio(m_breakSample, false);
            }
        }
        break;
    /*
    case ' ':
        if (m_phase === phases.WAITING) {
            // start the race
            m_phase = phases.WAITING_3;
            m_startTime = new Date().getTime();
        } else if (m_phase === phases.SCORE) {
            grandPrixOnInit();
            // start the race
            m_phase = phases.WAITING_3;
            m_startTime = new Date().getTime();
        }
        break;
    */
    }

}

function grandPrixOnKeyUp(keyCode) {
    "use strict";
    var handled;
    switch (keyCode) {
    case 38: // up
        if (m_debugOffsetY > 0) {
            m_debugOffsetY -= 1;
            draw();
        }
        handled = true;
        break;
    case 40: // down
        if (m_debugOffsetY < (24 - 5)) {
            m_debugOffsetY += 1;
            draw();
        }
        handled = true;
        break;
    case 39: // right
        if (m_debugOffsetX < (24 - 6)) {
            m_debugOffsetX += 1;
            draw();
        }
        handled = true;
        break;
    case 37: // left
        if (m_debugOffsetX > 0) {
            m_debugOffsetX -= 1;
            draw();
        }
        handled = true;
        break;
    default:
        break;
    } // switch
    return handled;
}

function getDistance(x1, y1, x2, y2) {
    "use strict";
    return Math.sqrt(Math.pow(Math.abs((x1) - (x2)), 2) + Math.pow(Math.abs((y1) - (y2)), 2));
}

function getTrackDistance(index) {
    "use strict;"
    var f, trackDist, pieceDist, p1, p2, p1a, p2a, r;
    f = 0.2 * (index + 1);

    trackDist = 0;

    for (i = 0; i < m_track.points.length; i += 1) {
        p1 = m_track.points[i % m_track.points.length];
        p2 = m_track.points[(i + 1) % m_track.points.length];

        p1a = {};
        p2a = {};

        p1a.x = (p1.xl + (f * (p1.xr - p1.xl))) * 128;
        p1a.y = (p1.yl + (f * (p1.yr - p1.yl))) * 128;
        p2a.x = (p2.xl + (f * (p2.xr - p2.xl))) * 128;
        p2a.y = (p2.yl + (f * (p2.yr - p2.yl))) * 128;

        if (p2.xlc !== undefined) {
            p2a.xlc = p2.xlc + (f * (p2.xr - p2.xlc));
            p2a.ylc = p2.ylc + (f * (p2.yr - p2.ylc));

            r = Math.abs(p1a.y - (p1.yr * 128));
            if (r === 0) {
                r = Math.abs(p1a.x - (p1.xr * 128))
            }
            pieceDist = (Math.PI / 2) * r;

        } else if (p2.xrc !== undefined) {
            p2a.xrc = p2.xl + (f * (p2.xrc - p2.xl));
            p2a.yrc = p2.yl + (f * (p2.yrc - p2.yl));

            r = Math.abs(p1a.x - (p1.xl * 128));
            if (r === 0) {
                r = Math.abs(p1a.y - (p1.yl * 128));
            }
            pieceDist = (Math.PI / 2) * r;
        } else {
            // straight line
            pieceDist = getDistance(p1a.x, p1a.y, p2a.x, p2a.y);
        }
        trackDist += pieceDist;
    }
    return trackDist;
}

function getCarDistance(index, t) {
    "use strict";
    var i, carDist, timePast;
    // calculate distance travelled
    carDist = (t / 1000) * m_cars[index].minSpeed; // 5 pixels per second

    for (i = 0; i < m_cars[index].timeStamps.length; i += 1) {
        timePast = Math.min(1000, m_timestamp - m_cars[index].timeStamps[i]); // turbo max 1 sec
        carDist += Math.floor((timePast / 1000) * (m_cars[index].minSpeed * 0.5)); // turbo = +50%
    }
    return carDist;
}

function getPos(index) {
    "use strict";
    var carDist, t, f, i, p1, p2, p1a, p2a, trackDist, pieceDist, pos = {x: 0, y: 0, angle: 0}, dist, r, angle, timePast;

    // calculate distance travelled
    /*
    carDist = (t / 1000) * m_cars[index].minSpeed; // 5 pixels per second

    for (i = 0; i < m_cars[index].timeStamps.length; i += 1) {
        timePast = Math.min(1000, m_timestamp - m_cars[index].timeStamps[i]); // turbo max 1 sec
        carDist += Math.floor((timePast / 1000) * (m_cars[index].minSpeed * 0.5)); // turbo = +50%
    }
    */

    carDist = m_cars[index].dist;

    // carDist += m_cars[index].timeStamps.length * (m_cars[index].minSpeed * 0.5);

    f = 0.2 * (index + 1);

    // distance in curve based on r

    trackDist = 0;

    i = 0;

    while (true) {
        p1 = m_track.points[i % m_track.points.length];
        p2 = m_track.points[(i + 1) % m_track.points.length];
        i += 1;

        p1a = {};
        p2a = {};

        p1a.x = (p1.xl + (f * (p1.xr - p1.xl))) * 128;
        p1a.y = (p1.yl + (f * (p1.yr - p1.yl))) * 128;
        p2a.x = (p2.xl + (f * (p2.xr - p2.xl))) * 128;
        p2a.y = (p2.yl + (f * (p2.yr - p2.yl))) * 128;

        // working with straight lines!!
        pieceDist = getDistance(p1a.x, p1a.y, p2a.x, p2a.y);

        if (p2.xlc !== undefined) {
            p2a.xlc = p2.xlc + (f * (p2.xr - p2.xlc));
            p2a.ylc = p2.ylc + (f * (p2.yr - p2.ylc));

            r = Math.abs(p1a.y - (p1.yr * 128));
            if (r === 0) {
                r = Math.abs(p1a.x - (p1.xr * 128))
            }
            pieceDist = (Math.PI / 2) * r;

        } else if (p2.xrc !== undefined) {
            p2a.xrc = p2.xl + (f * (p2.xrc - p2.xl));
            p2a.yrc = p2.yl + (f * (p2.yrc - p2.yl));

            r = Math.abs(p1a.x - (p1.xl * 128));
            if (r === 0) {
                r = Math.abs(p1a.y - (p1.yl * 128));
            }
            pieceDist = (Math.PI / 2) * r;
        } else {
            // straight line
            pieceDist = getDistance(p1a.x, p1a.y, p2a.x, p2a.y);
        }

        if ((trackDist + pieceDist) < carDist) {
            // move on to next part
            trackDist += pieceDist;
        } else {
            // car is on this track piece
            dist = carDist - trackDist; // dist is how far on this track piece
            if ((p2.xlc !== undefined) && (p2.xl > p1.xl) && (p2.yl > p1.yl)) {
                // Q1
                angle = (0.5 * Math.PI) - ((0.5 * Math.PI) * (dist / pieceDist));
                pos.x = (p1.xr * 128) + (r * Math.cos(angle));
                pos.y = (p1.yr * 128) - (r * Math.sin(angle));
                pos.angle = (0.5 * Math.PI) - angle;
            } else if ((p2.xlc !== undefined) && (p2.xl > p1.xl) && (p2.yl < p1.yl)) {
                // Q2
                angle = ((0.5 * Math.PI) * (dist / pieceDist));
                pos.x = (p1.xr * 128) - (r * Math.cos(angle));
                pos.y = (p1.yr * 128) - (r * Math.sin(angle));
                pos.angle = angle + (1.5 * Math.PI);
            } else if ((p2.xlc !== undefined) && (p2.xl < p1.xl) && (p2.yl < p1.yl)) {
                // Q3
                angle = (1.5 * Math.PI) - ((0.5 * Math.PI) * (dist / pieceDist));
                pos.x = (p1.xr * 128) + (r * Math.cos(angle));
                pos.y = (p1.yr * 128) - (r * Math.sin(angle));
                pos.angle = (0.5 * Math.PI) - angle;
            } else if ((p2.xlc !== undefined) && (p2.xl < p1.xl) && (p2.yl > p1.yl)) {
                // Q4
                angle = ((0.5 * Math.PI) * (dist / pieceDist));
                pos.x = (p1.xr * 128) + (r * Math.cos(angle));
                pos.y = (p1.yr * 128) + (r * Math.sin(angle));
                pos.angle = (0.5 * Math.PI) + angle;
            } else if ((p2.xrc !== undefined) && (p2.xr < p1.xr) && (p2.yr > p1.yr)) {
                // Q1
                angle = (0.5 * Math.PI) - ((0.5 * Math.PI) * (dist / pieceDist));
                pos.x = (p1.xl * 128) - (r * Math.cos(angle));
                pos.y = (p1.yl * 128) - (r * Math.sin(angle));
                pos.angle = (0.5 * Math.PI) + angle;

            } else if ((p2.xrc !== undefined) && (p2.xr < p1.xr) && (p2.yr < p1.yr)) {
                // Q2
                angle = ((0.5 * Math.PI) * (dist / pieceDist));
                pos.x = (p1.xl * 128) + (r * Math.cos(angle));
                pos.y = (p1.yl * 128) - (r * Math.sin(angle));
                pos.angle = (1.5 * Math.PI) - angle;
            } else if ((p2.xrc !== undefined) && (p2.xr > p1.xr) && (p2.yr > p1.yr)) {
                // Q3
                angle = ((0.5 * Math.PI) * (dist / pieceDist));
                pos.x = (p1.xl * 128) - (r * Math.cos(angle));
                pos.y = (p1.yl * 128) + (r * Math.sin(angle));
                pos.angle = (0.5 * Math.PI) - angle;
            } else if ((p2.xrc !== undefined) && (p2.xr > p1.xr) && (p2.yr < p1.yr)) {
                // Q4
                angle = (0.5 * Math.PI) - ((0.5 * Math.PI) * (dist / pieceDist));
                pos.x = (p1.xl * 128) + (r * Math.cos(angle));
                pos.y = (p1.yl * 128) + (r * Math.sin(angle));
                pos.angle = angle + (1.5 * Math.PI);
                // Q1 and Q2 not used atm!!!!! not implemented and tested
            } else {
                pos.x = (p1a.x + ((p2a.x - p1a.x) * (dist / pieceDist)));
                pos.y = (p1a.y + ((p2a.y - p1a.y) * (dist / pieceDist)));
                if (p2.xr > p1.xr) {
                    // to right
                    pos.angle = 0;
                } else if (p2.xr < p1.xr) {
                    // to left
                    pos.angle = Math.PI;
                } else if (p2.yr < p1.yr) {
                    // to bottom
                    pos.angle = 1.5 * Math.PI;
                } else {
                    pos.angle = 0.5 * Math.PI;
                }
            }
            return pos;
        }


    }
    return pos;
}

var m_smallTrackCanvas;
function grandPrixCreateSmallTrackCanvas() {
    "use strict";
    var lctx, size, i, p1, p2, f, p1a, p2a;
    m_smallTrackCanvas = document.createElement('canvas');
    m_smallTrackCanvas.id     = "smallTrackCanvas";
    m_smallTrackCanvas.width  = 200;
    m_smallTrackCanvas.height = 150;
    lctx = m_smallTrackCanvas.getContext("2d");

    size = 8;
    for (i = 0; i < m_track.points.length - 1; i += 1) {
        p1 = m_track.points[i];
        p2 = m_track.points[(i + 1) % m_track.points.length];

        f = 0.5;
        p1a = {};
        p2a = {};

        p1a.x = p1.xl + (f * (p1.xr - p1.xl));
        p1a.y = p1.yl + (f * (p1.yr - p1.yl));
        p2a.x = p2.xl + (f * (p2.xr - p2.xl));
        p2a.y = p2.yl + (f * (p2.yr - p2.yl));
        if (p2.xlc !== undefined) {
            p2a.xlc = p2.xlc + (f * (p2.xr - p2.xlc));
            p2a.ylc = p2.ylc + (f * (p2.yr - p2.ylc));
        }
        if (p2.xrc !== undefined) {
            p2a.xrc = p2.xl + (f * (p2.xrc - p2.xl));
            p2a.yrc = p2.yl + (f * (p2.yrc - p2.yl));
        }

        if (p2a.xlc !== undefined) {
            lctx.strokeStyle = 'white';
            lctx.lineWidth = 8;
            lctx.beginPath();
            lctx.moveTo((p1a.x * size), (p1a.y * size));
            lctx.quadraticCurveTo((p2a.xlc  * size), (p2a.ylc * size), (p2a.x * size), (p2a.y * size));
            lctx.stroke();
        } else if (p2a.xrc !== undefined) {
            lctx.strokeStyle = 'white';
            lctx.lineWidth = 8;
            lctx.beginPath();
            lctx.moveTo((p1a.x * size), (p1a.y * size));
            lctx.quadraticCurveTo((p2a.xrc  * size), (p2a.yrc * size), (p2a.x * size), (p2a.y * size));
            lctx.stroke();
        } else {
            // go in straight line
            fwStrokeToPoint(lctx, (p1a.x * size), (p1a.y * size), (p2a.x * size), (p2a.y * size), 'white', 8);
        }
    }
}

function grandPrixOnDraw() {
    "use strict";
    var i, j, p1, p2, pr, p1a = {}, p2a = {}, xOffset, yOffset, f, carPos, pos, t, size, car, smallTrackOffset, button, pick, cy, text, w, x;
    if (m_drawBackground) {
        m_drawBackground = false;
    }

    carPos = m_cars[m_myCarIndex].pos;

    xOffset = carPos.x - (canvas.width / 2);
    xOffset = Math.max(xOffset, 0);
    xOffset = Math.min(xOffset, m_trackImage.width - canvas.width);
    yOffset = carPos.y - ((canvas.height / 2) - 80);
    yOffset = Math.max(yOffset, 0);
    yOffset = Math.min(yOffset, m_trackImage.height - canvas.height);

    /*
    xOffset = m_debugOffsetX * 128;
    yOffset = m_debugOffsetY * 128;
    */

    ctx.drawImage(m_trackImage, xOffset, yOffset, Math.min(canvas.width, m_trackImage.width - m_debugOffsetX * 128), Math.min(canvas.height, m_trackImage.height - m_debugOffsetY * 128), 0, 0, Math.min(canvas.width, m_trackImage.width - m_debugOffsetX * 128), Math.min(canvas.height, m_trackImage.height - m_debugOffsetY * 128));
    fwFillRect(ctx, canvas.width - 84, 0, 84, canvas.height, 'rgba(255, 255, 255, 0.25)');

    for (i = 0; i < m_track.points.length - 1; i += 1) {
        p1 = m_track.points[i];
        p2 = m_track.points[(i + 1) % m_track.points.length];
        /*
        if (p2.xlc === undefined) {
            // go in straight line
            fwStrokeToPoint(ctx, (p1.xl * 128) - xOffset, (p1.yl * 128) - yOffset, (p2.xl * 128) - xOffset, (p2.yl * 128) - yOffset, 'black', 3);
        } else {
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo((p1.xl * 128) - xOffset, (p1.yl * 128) - yOffset);
            ctx.quadraticCurveTo((p2.xlc  * 128) - xOffset, (p2.ylc * 128) - yOffset, (p2.xl * 128) - xOffset, (p2.yl * 128) - yOffset);
            ctx.stroke();
        }
        */

        // debug red lines; car tracks
        /*
        for (j = 0; j < 4; j += 1) {
            f = 0.2 * (j + 1);
            p1a = {};
            p2a = {};

            p1a.x = p1.xl + (f * (p1.xr - p1.xl));
            p1a.y = p1.yl + (f * (p1.yr - p1.yl));
            p2a.x = p2.xl + (f * (p2.xr - p2.xl));
            p2a.y = p2.yl + (f * (p2.yr - p2.yl));
            if (p2.xlc !== undefined) {
                p2a.xlc = p2.xlc + (f * (p2.xr - p2.xlc));
                p2a.ylc = p2.ylc + (f * (p2.yr - p2.ylc));
            }
            if (p2.xrc !== undefined) {
                p2a.xrc = p2.xl + (f * (p2.xrc - p2.xl));
                p2a.yrc = p2.yl + (f * (p2.yrc - p2.yl));
            }

            if (p2a.xlc !== undefined) {
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo((p1a.x * 128) - xOffset, (p1a.y * 128) - yOffset);
                ctx.quadraticCurveTo((p2a.xlc  * 128) - xOffset, (p2a.ylc * 128) - yOffset, (p2a.x * 128) - xOffset, (p2a.y * 128) - yOffset);
                ctx.stroke();
            } else if (p2a.xrc !== undefined) {
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo((p1a.x * 128) - xOffset, (p1a.y * 128) - yOffset);
                ctx.quadraticCurveTo((p2a.xrc  * 128) - xOffset, (p2a.yrc * 128) - yOffset, (p2a.x * 128) - xOffset, (p2a.y * 128) - yOffset);
                ctx.stroke();
            } else {
                // go in straight line
                fwStrokeToPoint(ctx, (p1a.x * 128) - xOffset, (p1a.y * 128) - yOffset, (p2a.x * 128) - xOffset, (p2a.y * 128) - yOffset, 'red', 3);
            }
        }
        */



        /*
        p1a = {x: p1.x + p1.w, y: p1.y + p1.h};
        p2a = {x: p2.x + p2.w, y: p2.y + p2.h, rx: p2.rx + p2.w, ry: p2.ry + p2.h};
        if (p2.rx === undefined) {
            // go in straight line
            fwStrokeToPoint(ctx, p1a.x, p1a.y, p2a.x, p2a.y, 'red', 3);
        } else {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(p1a.x, p1a.y);
            ctx.quadraticCurveTo(p2a.rx, p2a.ry, p2a.x, p2a.y);
            ctx.stroke();
        }
        */

    }

    for (i = 0; i < 4; i += 1) {
        car = m_cars[i];
        pos = car.pos;
        ctx.save();
        ctx.translate(car.pos.x - xOffset, car.pos.y - yOffset);
        ctx.rotate(car.pos.angle);
        if (car.scoreCnt > 0) {
            pick = Math.floor(Math.random() * (m_smokeImage.width / 32));
            ctx.drawImage(m_smokeImage, pick * 32, 0, 32, 32, (-CAR_WIDTH / 2) - 20 - (5 - (car.scoreCnt / 4)), -16, 32, 32);
        }
        ctx.drawImage(m_carsImage, car.avatarid * CAR_WIDTH, (i * CAR_HEIGHT), CAR_WIDTH, CAR_HEIGHT, -(CAR_WIDTH / 2), -(CAR_HEIGHT / 2), CAR_WIDTH, CAR_HEIGHT);
        ctx.restore(); // restore translate/rotate
    }

    // overlay small track
    smallTrackOffset = {x: 0, y: canvas.height - 192 + 48};
    ctx.save();
    ctx.translate(smallTrackOffset.x, smallTrackOffset.y);
    ctx.drawImage(m_smallTrackCanvas, 0, 0);

    size = 8;
    for (i = 0; i < 4; i += 1) {
        pos = m_cars[i].pos;
        fwFillArc(ctx, (pos.x / 128) * size, (pos.y / 128) * size, 3, m_cars[i].color);
    }
    ctx.restore(); // restore smallTrackOffset translate

    if (m_phase < phases.FINISHED) { // hide during scoreboard
        // draw question
        fwFillRect(ctx, DASHBOARD_X, DASHBOARD_Y, DASHBOARD_W, DASHBOARD_H, 'rgba(0,0,0,0.4)');
        if (m_buttons && m_buttons.length) {
            for (i = 0; i < m_buttons.length; i += 1) {
                button = m_buttons[i];
                fwStrokeFillRect(ctx, button.x, button.y, button.w, button.h, 'black', 1, m_cars[m_myCarIndex].color);
                if ((m_questionTimer === 0) || (button.correct)) {
                    if (m_phase >= phases.RACING) {
                        fwFillText(ctx, button.txt, button.x + (button.w / 2), button.y + (button.h / 2) + 12, '24pt ' + font, 'white', 'center');
                    }
                    fwFillText(ctx, (i + 1).toString() + '.', button.x + 5, button.y + 8 + 5, '10pt ' + font, 'black', 'left');
                }
            }
            if (m_phase >= phases.RACING) {
                fwFillText(ctx, m_question, DASHBOARD_X + (DASHBOARD_W / 2), DASHBOARD_Y + 35 + 18, '36pt ' + font, 'white', 'center');
            }
        } else if (m_typingWord) {
            if (m_phase >= phases.RACING) {
                ctx.font = '32pt ' + font;
                w = ctx.measureText(m_typingWord.target).width;
                x = (DASHBOARD_X + (DASHBOARD_W / 2)) - Math.floor(w / 2);
                fwFillText(ctx, getString(sid.TYPE_THE_WORD), DASHBOARD_X + (DASHBOARD_W / 2), DASHBOARD_Y + 15 + 8, '16pt ' + font, 'white', 'center');

                fwFillText(ctx, m_typingWord.target, x, DASHBOARD_Y + 52 + 14, '28pt ' + font, 'white', 'left');

                fwStrokeFillRect(ctx, DASHBOARD_X + 8, DASHBOARD_Y + 82, DASHBOARD_W - 16, DASHBOARD_H - (82 + 4), 'black', 1, m_cars[m_myCarIndex].color);

                if (m_typingWord.error.length === 0) {
                    fwFillText(ctx, m_typingWord.target, x, DASHBOARD_Y + 106 + 14, '28pt ' + font, 'rgba(255,255,255,0.3)', 'left');
                }
                fwFillText(ctx, m_typingWord.value, x, DASHBOARD_Y + 106 + 14, '28pt ' + font, 'white', 'left');
                x += ctx.measureText(m_typingWord.value).width;
                fwFillText(ctx, m_typingWord.error, x, DASHBOARD_Y + 106 + 14, '28pt ' + font, 'red', 'left');
            }
        }
    }

    if (document.location.pathname.indexOf("D:") >= 0) { // debugging only
        if (m_rndLimit) {
            //fwFillText(ctx, m_rndLimit.toFixed(4), 778, 20, '16pt ' + font, 'black', 'right');
        }
    }

    switch (m_phase) {
    case phases.WAITING_3:
        fwFillText(ctx, "3", DASHBOARD_X + (DASHBOARD_W / 2), DASHBOARD_Y + 35 + 22, '44pt ' + font, 'white', 'center');
        break;
    case phases.WAITING_2:
        fwFillText(ctx, "2", DASHBOARD_X + (DASHBOARD_W / 2), DASHBOARD_Y + 35 + 22, '44pt ' + font, 'white', 'center');
        break;
    case phases.WAITING_1:
        fwFillText(ctx, "1", DASHBOARD_X + (DASHBOARD_W / 2), DASHBOARD_Y + 35 + 22, '44pt ' + font, 'white', 'center');
        break;
    case phases.FINISHED:
        break;
    case phases.SCORE:
        break;
    default:
        break;
    }
}

function handleGame() {
    "use strict";
    var i, j, car, timePast, allFinished, extraDist = 400, rndLimit, delta;
    // take timestamp to calculate positions
    timePast = new Date().getTime() - m_startTime;
    switch (m_phase) {
    case phases.WAITING:
        break;
    case phases.WAITING_3:
        if (timePast >= 1000) {
            m_startTime = new Date().getTime();
            m_phase = phases.WAITING_2;
            fwPlayAudio(m_waiting2Sample, false);
        }
        break;
    case phases.WAITING_2:
        if (timePast >= 1000) {
            m_startTime = new Date().getTime();
            m_phase = phases.WAITING_1;
            fwPlayAudio(m_waiting1Sample, false);
        }
        break;
    case phases.WAITING_1:
        if (timePast >= 1000) {
            m_startTime = new Date().getTime();
            m_phase = phases.RACING;
            fwPlayAudio(m_startSample, false);
        }
        break;
    case phases.RACING:
    case phases.FINISHED:
        m_timestamp = timePast;

        // first calculate all new distances and positions
        for (i = 0; i < m_cars.length; i += 1) {
            car = m_cars[i];
            car.dist = getCarDistance(i, m_timestamp);
            car.dist = Math.min(car.trackDistance + extraDist, car.dist);
            car.pos = getPos(i);
        }
        for (i = 0; i < m_cars.length; i += 1) {
            car = m_cars[i];
            /*
            car.dist = getCarDistance(i, m_timestamp);
            car.dist = Math.min(car.trackDistance + extraDist, car.dist);
            car.pos = getPos(i);
            */

            if (car.scoreCnt > 0) {
                car.scoreCnt -= 1;
            }

            if (i !== m_myCarIndex) {
                if (car.turboDelay > 0) {
                    car.turboDelay -= 1;
                }
                if (fwMultiplayerIsSessionOwner()) {
                    // session owner simulates computer players
                    if (i >= multiplayerBox.players.length) {
                        if ((car.turboDelay === 0) && (car.finishedTimeStamp === undefined)) {
                            // rndLimit is based on the distance between the AI car and the player car
                            // rndLimit larger; more chance on extra turbo
                            // processed 50 times p/s
                            // rndLimit = Math.max(0, (0.02 / 4) + (((m_cars[m_myCarIndex].dist - car.dist) / car.trackDistance) / 4));
                            delta = m_cars[m_myCarIndex].timeStamps.length - car.timeStamps.length;
                            if (delta > 0) {
                                // player in front of AI
                                rndLimit = Math.max(0, (0.02 / 8) + (Math.abs(delta) * 0.02 / 16));
                            } else {
                                // AI in front of player
                                rndLimit = Math.max(0, (0.02 / 8) -  (Math.abs(delta) * 0.02 / 32));
                            }
                            if (i === 3) {
                                m_rndLimit = rndLimit;
                            }
                            if (Math.random() < rndLimit) {
                                car.scoreCnt = 20;
                                car.timeStamps.push(m_timestamp);
                                car.turboDelay += 1200 / GAME_INTERVAL_MS;
                                pushPlayerInfo(); // push computer turbo
                            }
                        }
                    }
                }
            }

            if (car.finishedTimeStamp === undefined) {
                if (car.dist > (car.trackDistance)) {
                    car.finishedTimeStamp = m_timestamp;
                }
            }
        }
        if (m_questionTimer > 0) {
            m_questionTimer -= 1;
            if (m_questionTimer === 0) {
                nextQuestion();
            }
        }

        // first check if player finished
        if (m_phase !== phases.FINISHED) {
            if (m_cars[m_myCarIndex].finishedTimeStamp !== undefined) {
                fwPlayAudio(m_honkSample, false);
                m_phase = phases.FINISHED;
            }
        }

        allFinished = true;
        // wait till all cars finished and at end position
        for (i = 0; i < m_cars.length; i += 1) {
            if ((m_cars[i].finishedTimeStamp === undefined) || (m_cars[i].dist < (m_cars[i].trackDistance + extraDist))) {
                allFinished = false;
            }
        }

        if (allFinished && !m_scorePushed) {
            // check positions
            for (i = 0; i < m_cars.length; i += 1) {
                m_cars[i].score = 1;
                for (j = 0; j < m_cars.length; j += 1) {
                    if ((i !== j) && (m_cars[j].finishedTimeStamp < m_cars[i].finishedTimeStamp)) {
                        // a faster car
                        m_cars[i].score += 1;
                    }
                }
            }
            // push final score (to have consistent score for all players
            // framework will normally take score from session owner, but if not present own score is taken
            pushPlayerInfo();

            m_scorePushed = true;
        }
        break;
    default:
        break;
    }
    draw();
}

function nextMultiplication() {
    "use strict";
    var i, a, f, pickArray, pick, b, n;
    do {
        // select 'correct' button
        b = Math.floor(Math.random() * 4);
        f = 1 + Math.floor(Math.random() * 10); // factor
        pickArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (i = 0; i < m_buttons.length; i += 1) {
            pick = Math.floor(Math.random() * pickArray.length);
            a = pickArray[pick];
            m_buttons[i].txt = (a * f).toString();
            m_buttons[i].correct = (i === b);
            if (i === b) {
                m_question = a.toString() + " x " + f.toString();
            }
            pickArray.splice(pick, 1);
        }
    } while (!fwQuestionListCheck(m_question));
    fwQuestionListAdd(m_question);
}

function nextDivision() {
    "use strict";
    var i, a, f, pickArray, pick, b;
    do {
        // select 'correct' button
        b = Math.floor(Math.random() * 4);
        f = 2 + Math.floor(Math.random() * 9); // factor 2 - 10
        pickArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (i = 0; i < m_buttons.length; i += 1) {
            pick = Math.floor(Math.random() * pickArray.length);
            a = pickArray[pick];
            m_buttons[i].txt = a.toString();
            m_buttons[i].correct = (i === b);
            if (i === b) {
                m_question = (a * f).toString() +  (((language === LANG_NL) || (language === LANG_DE)) ? " : " : " ÷ ") + f.toString();
            }
            pickArray.splice(pick, 1);
        }
    } while (!fwQuestionListCheck(m_question));
    fwQuestionListAdd(m_question);
}

var m_wordList = ["world", "water", "winter", "hello", "summer", "games", "country", "math", "count", "alphabet"];
var m_typingWord;
var m_rndTypingWord = { max: 0, list: [] };

function nextTypingWord() {
    "use strict";
    var r;
    r = getRnd(m_rndTypingWord);
    m_typingWord = {target: m_wordList[r], value: "", error: ""};
}

function nextSum(max) {
    "use strict";
    var i, a, f, pickArray, pick, b, n;
    do {
        if (Math.random() >= 0.5) {
            n = 10 + Math.floor(Math.random() * 91); // answer 10 - 100
            switch (max) {
            case 10:
                n = 2 + Math.floor(Math.random() * 9); // answer 2 - 10
                break;
            case 20:
                n = 10 + Math.floor(Math.random() * 11); // answer 10 - 20
                break;
            default: // case 100:
                n = 10 + Math.floor(Math.random() * 91); // answer 10 - 100
                break;
            }
            a = 1 + Math.floor(Math.random() * (n - 1));
            b = n - a;
            m_question = a + " + " + b;
        } else {
            // subtraction
            switch (max) {
            case 10:
                a = 2 + Math.floor(Math.random() * 9); // a =  2 - 10
                break;
            case 20:
                a = 10 + Math.floor(Math.random() * 11); // a = 10 - 20
                break;
            default: // case 100:
                a = 10 + Math.floor(Math.random() * 91); // a = 10 - 100
                break;
            }
            b = 1 + Math.floor(Math.random() * (a - 1));
            n = a - b;
            m_question = a + " - " + b;
        }
        pickArray = [];
        if (((n - 1) > 0) && ((n - 1) <= max)) { pickArray.push(n - 1); }
        if (((n - 2) > 0) && ((n - 2) <= max)) { pickArray.push(n - 2); }
        if (((n + 1) > 0) && ((n + 1) <= max)) { pickArray.push(n + 1); }
        if (((n + 2) > 0) && ((n + 2) <= max)) { pickArray.push(n + 2); }
        if (((n - 10) > 0) && ((n - 10) <= max)) { pickArray.push(n - 10); }
        if (((n + 10) > 0) && ((n + 10) <= max)) { pickArray.push(n + 10); }
        if (pickArray.length < 4) {
            if (((n - 3) > 0) && ((n - 3) <= max)) { pickArray.push(n - 3); }
            if (((n - 4) > 0) && ((n - 4) <= max)) { pickArray.push(n - 4); }
            if (((n + 3) > 0) && ((n + 3) <= max)) { pickArray.push(n + 3); }
            if (((n + 4) > 0) && ((n + 4) <= max)) { pickArray.push(n + 4); }
        }
        b = Math.floor(Math.random() * 4);
        for (i = 0; i < m_buttons.length; i += 1) {
            if (i === b) {
                m_buttons[i].txt = n.toString();
                m_buttons[i].correct = (i === b);
            } else {
                pick = Math.floor(Math.random() * pickArray.length);
                m_buttons[i].txt = pickArray[pick].toString();
                m_buttons[i].correct = false;
                pickArray.splice(pick, 1);
            }
        }
    } while (!fwQuestionListCheck(m_question));
    fwQuestionListAdd(m_question);
}

function nextQuestion() {
    "use strict";
    var r;
    switch (g_mathType) {
    case MT_MATH_TILL_100:
        nextSum(100);
        break;
    case MT_MATH_TILL_20:
        nextSum(20);
        break;
    case MT_MATH_MIX:
        // math mix is a combination of math till 100 (add + sub) + multiplication tables + divisions
        r = Math.random();
        if (r <= 0.25) {
            nextMultiplication();
        } else if (r <= 0.50) {
            nextDivision();
        } else {
            nextSum(100);
        }
        break;
    case MT_DIVISIONS:
        nextDivision();
        break;
    case MT_TYPING:
        nextTypingWord();
        break;
    // case MT_MULTIPLICATIONS:
    default:
        nextMultiplication();
        break;
    }
}

function grandPrixOnInit() {
    "use strict";
    var i, trackDistanceArray, minTrackDistance, trackDist, colorArray, minSpeedArray, minSpeed;
    m_drawBackground = true;
    // re-disable next button
    fwEnableNextBtn(false);

    trackDistanceArray = [];
    for (i = 0; i < 4; i += 1) {
        trackDistanceArray.push(getTrackDistance(i));
    }
    //console.log(trackDistanceArray);
    minTrackDistance = trackDistanceArray[0];
    for (i = 1; i < 4; i += 1) {
        if (trackDistanceArray[i] < minTrackDistance) {
            minTrackDistance = trackDistanceArray[i];
        }
    }
    minSpeedArray = [];
    for (i = 0; i < 4; i += 1) {
        minSpeedArray.push(200 * (trackDistanceArray[i] / minTrackDistance));
    }
    //console.log(minSpeedArray);

    console.log((100 * trackDistanceArray[0]) / minSpeedArray[0]);

    colorArray = ['#2F95D0', '#39C272', '#E86A17', '#FFCC00'];
    m_cars = [];
    for (i = 0; i < 4; i += 1) {
        m_cars.push({index: i, color: colorArray[i], avatarid: 0, pos: {x: 0, y: 0}, trackDistance: trackDistanceArray[i], minSpeed: minSpeedArray[i], scoreCnt: 0, timeStamps: [], turboDelay: 0, dist: 0, finishedTimeStamp: undefined, score: undefined, playerName: undefined, prevTimeStampsLen: 0, syncScore: undefined, syncFinishedTimeStamp: undefined});
    }

    switch (g_mathType) {
    case MT_TYPING:
        if (g_wordList) {
            m_wordList = g_wordList.split(';');
        }
        initRndList(m_rndTypingWord, m_wordList.length);
        break;
    default:
        m_buttons = [];
        for (i = 0; i < 4; i += 1) {
            m_buttons.push({x: DASHBOARD_X + 8 + (i * 97), y: DASHBOARD_Y + 72, w: 92, h: 60, txt: i.toString()});
        }
        fwQuestionListInit(5);
        break;
    }

    nextQuestion();
    m_questionTimer = 0;

    m_phase = phases.WAITING;
    // initialise car positions
    m_timestamp = 0;
    for (i = 0; i < m_cars.length; i += 1) {
        m_cars[i].pos = getPos(i);
    }

    m_startTime = new Date().getTime();

    m_scorePushed = false;

    if (m_gameInterval !== null) {
        clearInterval(m_gameInterval);
        m_gameInterval = null;
    }
    m_gameInterval = setInterval(function () {
        handleGame();
    }, GAME_INTERVAL_MS);
}

function grandPrixOnDrawHelp() {
    "use strict";
}

// called before options box is opened
function grandPrixOnOptionsSync() {
    "use strict";
}

// called when options box is closed (with ok button)
function grandPrixOnOptionsChanged() {
    "use strict";
}

function grandPrixOnOptionsButton() {
    "use strict";
    fwStartOptionsBox();
    draw();
}

function grandPrixOnMultiplayerStart() {
    "use strict";
    var i;
    grandPrixOnInit();

    // get m_myCarIndex for player list
    for (i = 0; i < multiplayerBox.players.length; i += 1) {
        if (multiplayerBox.players[i].id === multiplayerBox.playerId) {
            m_myCarIndex = i;
        }
    }
    m_cars[m_myCarIndex].playerName = multiplayerBox.name;

    pushPlayerInfo();

    // start the race
    m_phase = phases.WAITING_3;
    m_startTime = new Date().getTime();
    fwPlayAudio(m_waiting3Sample, false);
}

function grandPrixOnInfoUpdate() {
    "use strict";
    var i, j, racers = multiplayerBox.racers, tmp, ts, scores;
    for (i = 0; i < racers.length; i += 1) {
        if ((racers[i].id !== undefined) && (racers[i].id !== multiplayerBox.playerId)) {
            // sync other players
            if (racers[i].id < 10) {
                if (!fwMultiplayerIsSessionOwner()) {
                    // not my computer racers
                    /*
                    m_cars[i].timeStamps = [];
                    tmp = racers[i].info.split(',');
                    for (j = 0; j < tmp.length; j += 1) {
                        if (tmp[j] !== "") {
                            ts = parseInt(tmp[j]);
                            if (j >= m_cars[i].prevTimeStampsLen) {
                                // set to now to avoid jumps
                                ts = m_timestamp;
                                m_cars[i].scoreCnt = 20;
                            }
                            m_cars[i].timeStamps.push(ts);
                        }
                    }
                    */
                    tmp = racers[i].info.split(',');
                    for (j = m_cars[i].timeStamps.length; j < tmp.length; j += 1) {
                        if (tmp[j] !== "") {
                            // set to now to avoid jumps
                            m_cars[i].timeStamps.push(m_timestamp);
                            m_cars[i].scoreCnt = 20;
                        }
                    }
                }
            } else {
                /*
                m_cars[i].timeStamps = [];
                tmp = racers[i].info.split(',');
                for (j = 0; j < tmp.length; j += 1) {
                    if (tmp[j] !== "") {
                        ts = parseInt(tmp[j]);
                        if (j >= m_cars[i].prevTimeStampsLen) {
                            // set to now to avoid jumps
                            ts = m_timestamp;
                            m_cars[i].scoreCnt = 20;
                        }
                        m_cars[i].timeStamps.push(ts);
                    }
                }
                */
                tmp = racers[i].info.split(',');
                for (j = m_cars[i].timeStamps.length; j < tmp.length; j += 1) {
                    if (tmp[j] !== "") {
                        // set to now to avoid jumps
                        m_cars[i].timeStamps.push(m_timestamp);
                        m_cars[i].scoreCnt = 20;
                    }
                }
            }
            if (m_cars[i].playerName === undefined) {
                m_cars[i].playerName = racers[i].name;
            }
            m_cars[i].avatarid = Math.max(0, Math.min(racers[i].avatarid, 2));
            m_cars[i].prevTimeStampsLen = m_cars[i].timeStamps.length;
        }
    }
    if (multiplayerBox.scoreInfo !== undefined) {
        scores = multiplayerBox.scoreInfo.split(',');
        for (i = 0; i < scores.length; i += 1) {
            tmp = scores[i].split('-');
            m_cars[i].syncScore = parseInt(tmp[0]);
            m_cars[i].syncFinishedTimeStamp = parseInt(tmp[1]);
        }
        fwMultiplayerStartScoreBoard();
        m_phase = phases.SCORE;
    }
}

function grandPrixGameLobbyOnDraw(lctx) {
    "use strict";
    var i, cy, text, avatarid = 0;
    cy = 50;
    if (multiplayerBox.players.length > 0) {
        for (i = 0; i < 4; i += 1) {
            avatarid = 0;
            if (i < multiplayerBox.players.length) {
                if (multiplayerBox.players[i].id === multiplayerBox.playerId) {
                    lctx.clearRect(0, cy - 50, 760, 100);
                    fwFillRect(lctx, 0, cy - 50, 760, 100, 'rgba(192,192,192,0.95)');
                }
                avatarid = multiplayerBox.players[i].avatarid;
            }
            lctx.drawImage(m_carsImage, avatarid * CAR_WIDTH, (i * CAR_HEIGHT), CAR_WIDTH, CAR_HEIGHT, 20, cy - 20, CAR_WIDTH, CAR_HEIGHT);

            if (i < multiplayerBox.players.length) {
                text = multiplayerBox.players[i].name; // + ' (' + multiplayerBox.players[i].id + ')';
            } else {
                text = multiplayerGetString(sidMultiplayer.COMPUTER) + (i + 1).toString();
            }
            fwFillText(lctx, text, 180, cy + 12, '24pt ' + font, 'black', 'left');
            cy += 110;
        }
    }
}

function grandPrixScoreBoardOnDraw(lctx) {
    "use strict";
    var i, j, cy, text;
    cy = 50;
    for (i = 1; i <= m_cars.length; i += 1) {
        for (j = 0; j < m_cars.length; j += 1) {
            if (m_cars[j].syncScore === i) {
                if (j === m_myCarIndex) {
                    fwFillRect(lctx, 0, cy - 50, 760, 100, 'rgba(0,0,0,0.1)');
                }
                if (i <= 3) { // gold, silver, bronze medals
                    lctx.drawImage(m_medalsImage, ((i - 1) * 100), 0, 100, 100, 20, cy - 50, 100, 100);
                }
                fwFillText(lctx, m_cars[j].playerName, 150 + 30, cy + 12, '24pt ' + font, 'black', 'left');
                fwFillText(lctx, m_cars[j].syncScore.toString(), 150 + 440, cy + 12, '24pt ' + font, 'black', 'left');
                text = Math.floor(Math.round(m_cars[j].syncFinishedTimeStamp / 100) / 10).toString() + '.' + (Math.round(m_cars[j].syncFinishedTimeStamp / 100) % 10).toString() + 's';
                fwFillText(lctx, text, 150 + 500, cy + 12, '24pt ' + font, 'black', 'left');
                cy += 110;
            }
        }
    }
}

function grandPrixOnConfigure() {
    "use strict";
    var items;

    m_track = g_trackMetaData;

    // prepare small track display on separate canvas
    grandPrixCreateSmallTrackCanvas();

    hideGameBtn = true;
    hideNextBtn = true;
    noAutoNextPuzzle = true;

    fwRegisterOnInit(grandPrixOnInit);
    fwRegisterOnMouseUp(grandPrixOnMouseUp);
    fwRegisterOnKeyPressed(grandPrixOnKeyPressed);
    if (document.location.pathname.indexOf("D:") >= 0) { // debugging only
        fwRegisterOnKeyUp(grandPrixOnKeyUp);
    }
    fwRegisterOnDraw(grandPrixOnDraw);
    fwRegisterOnDrawHelp(grandPrixOnDrawHelp);
    fwRegisterOnLevelButtonUp(grandPrixOnOptionsButton);
    fwRegisterOnOptionsSync(grandPrixOnOptionsSync);
    fwRegisterOnOptionsChanged(grandPrixOnOptionsChanged);

    fwMultiPlayerInit(g_multiplayerGameId, grandPrixOnMultiplayerStart, grandPrixOnInfoUpdate, grandPrixGameLobbyOnDraw, grandPrixScoreBoardOnDraw, grandPrixOnMouseUp, grandPrixOnFirstMouseUp);
    fwMultiPlayerStart();

    fwAddImageToLoad(m_trackImage, g_trackImageFileName);
    fwAddImageToLoad(m_carsImage, g_carsImageFileName);
    fwAddImageToLoad(m_smokeImage, "smoke.png");
    fwAddImageToLoad(m_medalsImage, "medals.png");

    fwInitAudio('grandprix');
}

// register the game so it is (automatically) started
fwRegisterGame(grandPrixOnConfigure);
