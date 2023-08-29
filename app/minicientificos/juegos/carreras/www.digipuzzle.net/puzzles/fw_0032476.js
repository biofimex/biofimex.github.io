/*global $, self*/
/*global highscoresOnMouseDown, highscoresOnMouseMove, highscoresOnMouseUp, highscoresOnKeyDown, highscoresOnKeyUp, highscoresOnKeyPressed, drawHighscoreBox*/
/*global multiplayerOnMouseDown, multiplayerOnMouseUp, multiplayerOnMouseMove, multiplayerOnKeyDown, multiplayerOnKeyUp, multiplayerOnKeyPressed, multiplayerOnDraw, multiplayerOnLoad*/
/*global nameBoxOnMouseUp, nameBoxOnKeyDown, nameBoxOnKeyUp, nameBoxOnKeyPressed, drawNameBox*/
/*global levelsBoxOnMouseUp, drawLevelsBox*/
/*global wlStartBox, wlOnMouseUp, wlGetInfo, wlGetString, sidWl, wlDrawBox*/
/*global photoSearchOnConfigure, photoSwapOnConfigure, photoTurnOnConfigure, blockPuzzleOnConfigure, photoMahjongOnConfigure, slidingPuzzleOnConfigure, photoDiffOnConfigure*/
/*global memoryOnConfigure, hangmanOnConfigure, wordSearchOnConfigure, sudokuOnConfigure, jigsawOnConfigure, mineSweeperOnConfigure, solitaireOnConfigure, quizOnConfigure*/
/*global tilesQuizOnConfigure, tilesMathOnConfigure, crosswordOnConfigure, lingoOnConfigure*/
/*global allPuzzlesArray, menuOnInit, menuOnConfigure*/
/*global ga*/
/*exported DIGIPUZZLE_BLUE, DIGIPUZZLE_RED, DIGIPUZZLE_GREEN, DIGIPUZZLE_YELLOW, BUTTON_X, gameLevelEnum*/
/*exported fwGameStarted*/
/*exported fwEnableGameAds*/
/*exported playAudio, stopAudio, playAudioLoop, stopAudioLoop*/
/*exported fwInitAudio, fwPlayAudio, fwStopAudio*/
/*exported fwRegisterOnMouseUp, fwRegisterOnMouseMove, fwRegisterOnMouseDown, fwRegisterOnKeyDown, fwRegisterOnKeyUp, fwRegisterOnKeyPressed, fwRegisterOnInit, fwRegisterOnDraw, fwRegisterGame*/
/*exported fwRegisterOnLevelButtonUp, fwRegisterOnDrawHelp, fwRegisterOnOptionsChanged, fwRegisterOnOptionsSync, fwRegisterOnDrawInstructionsBox, fwRegisterOnClearSplashScreen*/
/*exported fwRegisterTitle, fwRegisterOverlayCtx, fwRegisterOnNextButton, fwRegisterOnHelpButton, fwRegisterVideoAdsStarted, fwRegisterVideoAdsFinished*/
/*exported graphicsFlipImage, graphicsMirrorImage, graphicsGrayScaleImage, graphicsEdgeDetection, decryptImage*/
/*exported distance, fwGetDistance, pointInBox, fwPointInBox, incGameLevel, fwIncGameLevel, displayGameLevel, fwQuestionListInit, rndPiece, rndQuestion, startHighlightNext, startOverlay*/
/*exported fwUpdateScore, fwStopGame, fwStartGame, continueGame, fwEnableGameTimer, fwEnableGamePointsCounter, fwEnableNextBtn, fwEnableModeBtn*/
/*exported fwStrokeToPoint, fwStrokeText, fwStrokeFillText, fwStrokeRect, fwStrokeArc, fwFillArc*/
/*exported fwDrawExampleButton, fwDrawGameLevel, fwDrawLogoButton, fwDrawBgImage, fwDrawBottomAdd, fwDrawCredits*/
/*exported fwStartInstructionsBox, fwStartOptionsBox*/
/*exported COLL_PIECE_W, COLL_PIECE_H, COLL_PIECES_X*/
/*exported getTitleString, ImageWorker, fwGetAlphabet, fwGetSum, fwAddButton*/
/*exported fwIsInitialized, fwResultAddPoint, fwResultRemovePoint, fwResultOk, fwResultNotOk, fwGetScoreResult*/
/*exported fwTriggerVideoAdsActive, fwTriggerVideoAdsFinished, fwCheckVideoAdsActive*/
/*global fwVideoAdsInit, fwVideoAdsStart, fwVideoAdsGetSize*/
var g_adsBlocked = false;
var g_adsJsLoaded = g_adsJsLoaded || undefined;
var g_videoAdsJsLoaded = g_videoAdsJsLoaded || undefined;
var g_adBlockerDetectionEnabled = g_adBlockerDetectionEnabled || undefined;
var g_adBlockerDetected = false;
var g_doAppOnMouseUpOnLogoButton = g_doAppOnMouseUpOnLogoButton || undefined;
var g_disableSocialButtons = g_disableSocialButtons || undefined;
var m_showAdBlockerMessage = 0;
var g_cookieConsentDetectionEnabled = g_cookieConsentDetectionEnabled || undefined;
var g_cookieConsentMissing = false;
var COOKIE_CONSENT_BTN;
var m_showCookieConsentMessage = 0;
var g_inlead = g_inlead || undefined;
var g_uolo = g_uolo || undefined;
var g_disableLogoLink = g_disableLogoLink || undefined;
var g_debugTouch = g_debugTouch || undefined;
var highscoreBox = highscoreBox || undefined;
var multiplayerBox = multiplayerBox || undefined;
var nameBox = nameBox || undefined;
var levelsBox = levelsBox || undefined;
var Howler = Howler || undefined;
var m_firstRun = true;
var g_titleNl = g_titleNl || undefined;
var g_titleDk = g_titleDk || undefined;
var g_titleDe = g_titleDe || undefined;
var g_titleEs = g_titleEs || undefined;
var g_titlePt = g_titlePt || undefined;
var g_titleIs = g_titleIs || undefined;
var g_titleSe = g_titleSe || undefined;
var g_titleNo = g_titleNo || undefined;
var g_titleSi = g_titleSi || undefined;
var g_titleFr = g_titleFr || undefined;
var g_titlePl = g_titlePl || undefined;
var g_gameId = g_gameId || undefined;
var g_enableVideoAds = g_enableVideoAds || undefined;
var g_onlyRewardedVideoAds = g_enableVideoAds || undefined;
var g_debugVideoAds = g_debugVideoAds || undefined;
var m_initializeVideoAdsTrigger = false;
var m_showVideoAdsMessage = false;
var m_videoAdsActive = false;
var m_videoDebugLine = "";
var canvas;
var ctx;
var scaleFactor;
var currentScaleW;
var currentScaleH;
var pictureArray = [];
var pictureIndex = 0;
var bgcanvas;
var bgctx;
var topcanvas;
var helpcanvas;
var topctx;
var addcanvas;
var addctx;
var helpctx;
var puzzleCanvas;
var puzzleCtx;
var snapEnabled = true;
var m_completedCount;
var DIGIPUZZLE_BLUE = 'rgb(0,38,255)';
var DIGIPUZZLE_RED = 'rgb(255,0,0)';
var DIGIPUZZLE_GREEN = 'rgb(0,255,33)';
var DIGIPUZZLE_YELLOW = 'rgb(255,216,0)';

var BUTTON_RIGHT_COLUMN = 10 + 768 + 10;
var BUTTON_X = BUTTON_RIGHT_COLUMN;
var BUTTON_W = 64;
var BUTTON_H = 64;

var SMALL_BUTTON_W = 30;
var SMALL_BUTTON_H = 30;

var LOGO_BUTTON_X = BUTTON_RIGHT_COLUMN;
var LOGO_BUTTON_Y = 8;
var LOGO_BUTTON_W = BUTTON_W;
var LOGO_BUTTON_H = 292;

var MODE_BUTTON_X = BUTTON_RIGHT_COLUMN;
var MODE_BUTTON_Y = 10 + 512 + 10;
var MODE_BUTTON_W = BUTTON_W;
var MODE_BUTTON_H = BUTTON_H;

var NEXT_BUTTON_X = BUTTON_RIGHT_COLUMN;
var NEXT_BUTTON_Y = (10 + 512 + 10) - (BUTTON_H + 10);
var NEXT_BUTTON_W = BUTTON_W;
var NEXT_BUTTON_H = BUTTON_H;

var GAME_BUTTON_X = BUTTON_RIGHT_COLUMN;
var GAME_BUTTON_Y = (10 + 512 + 10) - (2 * (BUTTON_H + 10));
var GAME_BUTTON_W = BUTTON_W;
var GAME_BUTTON_H = BUTTON_H;

var INFO_BUTTON_X = BUTTON_RIGHT_COLUMN;
var INFO_BUTTON_Y = (10 + 512 + 10) - (3 * (BUTTON_H + 10));
var INFO_BUTTON_W = SMALL_BUTTON_W;
var INFO_BUTTON_H = SMALL_BUTTON_H;

var SNAP_BUTTON_X = BUTTON_RIGHT_COLUMN;
var SNAP_BUTTON_Y = 8;
var SNAP_BUTTON_W = BUTTON_W;
var SNAP_BUTTON_H = BUTTON_H;

var BUTTON_FS_X = BUTTON_RIGHT_COLUMN + 34;
var BUTTON_FS_Y = INFO_BUTTON_Y;
var BUTTON_FS_W = SMALL_BUTTON_W;
var BUTTON_FS_H = SMALL_BUTTON_H;

var BUTTON_AUDIO_X = BUTTON_RIGHT_COLUMN + 34;
var BUTTON_AUDIO_Y = INFO_BUTTON_Y + 34;
var BUTTON_AUDIO_W = SMALL_BUTTON_W;
var BUTTON_AUDIO_H = SMALL_BUTTON_H;

var BUTTON_PHOTO_X = BUTTON_RIGHT_COLUMN;
var BUTTON_PHOTO_Y = INFO_BUTTON_Y + 34;
var BUTTON_PHOTO_W = SMALL_BUTTON_W;
var BUTTON_PHOTO_H = SMALL_BUTTON_H;

var COLL_PIECE_W = 192;
var COLL_PIECE_H = 128;
var COLL_PIECES_X = 4; // 768 / 192

var audioMuted = false;

var DEBUG_POS_X = 0;
var DEBUG_POS_Y = 0;

var matchArray = [];
var debugMode = false;

var puzzleImage = new Image();
var logoImage = new Image();
var addImage = new Image();
var extLogoImage;
var poweredImage = new Image();
var allPuzzlesAddImage = new Image();
var photoAddImage = new Image();
var watermarkImage = new Image();
var optionsImage = new Image();

var points = 0;
var timeLeft;
var timeBusy;
var gameStarted = false;
var exampleMode = false;
var helpMode = false;
var gameInterval = null; // game timer

var minEdge = 48;

var initialized = false;

var GM_PHOTOSEARCH = "photo_search";
var GM_PHOTOPUZZLE = "photo_puzzle";
var GM_SUDOKU = "sudoku";
var GM_SLIDER = "photo_slider";
var GM_PHOTOMIXUP = "photo_mixup";
var GM_MAHJONG = "mahjong";
var GM_COLLMAHJONG = "coll_mahjong";
var GM_SOLITAIRE = "solitaire";
var GM_MEMORY = "memory";
var GM_HANGMAN = "hangman";
var GM_WEEKPUZZLE = "weekpuzzle";
var GM_WEEKPUZZLE_EX = "weekpuzzle_ex";
var GM_SCRAMBLE = "scramble";
var GM_FOCUS = "focus";
var GM_MINESWEEPER = "minesweeper";
var GM_PHOTOSWAP = "photo_swap";
var GM_PHOTOTURN = "photo_turn";
var GM_WORDSEARCH = "word_search";
var GM_JIGSAW = "jigsaw";
var GM_DAILYJIGSAW = "dailyjigsaw";
var GM_PHOTODIFF = "spotdiff";
var GM_COLLMEMORY = "coll_memory";
var GM_WORDMEMORY = "word_memory";
var GM_QUIZ = "quiz";
var GM_TILESQUIZ = "tilesquiz";
var GM_TILESMATH = "tilesmath";
var GM_CROSSWORD = "crossword";
var GM_LINGO = "lingo";
var GM_RANDOM = "random";
var gameMode = GM_MINESWEEPER;
var gameLevel = 'normal';
var gameLevels = ['easy', 'normal', 'hard'];

var SCORE_NONE = 0;
var SCORE_OK = 1;
var SCORE_NOK = 2;
var scoreResult = SCORE_NONE;

var photoRef;
var nextImageLoading = false;

var firstImage = true;

var overlayCtx;
var overlayImage;
var OVERLAY_OFFSET_X = 30;
var OVERLAY_OFFSET_Y = 30;
var OVERLAY_H = 100;
var overlayPictures = 0;
var overlayPicture = 0;
var overlayGlobalAlpha = 0;
var overlayStep = 0;

var BOTTOM_ADD_X = 10;
var BOTTOM_ADD_Y = 512 + 22;
var BOTTOM_ADD_W = 468;
var BOTTOM_ADD_H = 60;
var SITE_NL = "digipuzzel.nl";
var SITE_EN = "digipuzzle.net";
var site = SITE_EN;

// Declare external variabled
var directGameMode = directGameMode || undefined;
var directGameLevel = directGameLevel || undefined;
var remoteLink = remoteLink || undefined;
var addImageName = addImageName || undefined;
var logoImageName = logoImageName || undefined;
var categoryWords = categoryWords || undefined;
var basicLink = basicLink || undefined;
var linkBackTo = linkBackTo || undefined;
var linkBackToViaUrl;
var linkBackToFromIFrame = linkBackToFromIFrame || undefined;
var directGameLink = directGameLink || undefined;
var directSudoku = directSudoku || undefined;
var puzzleCategory = puzzleCategory || undefined;
var allPuzzles = allPuzzles || undefined;
var allPuzzlesLevel = allPuzzlesLevel || undefined;
var allPuzzlesEasy = allPuzzlesEasy || undefined;
var extDirectory = extDirectory || undefined;
var allPuzzlesSelectionActive = false;
var allPuzzlesSelectedGameMode;
var allPuzzlesSelected = -1;
var skinBorderColor = skinBorderColor || undefined;
var borderColor = 'black';
var skinBackgroundColor = skinBackgroundColor || undefined;
var backgroundColor = 'darkgray';
var skinButtonColor = skinButtonColor || undefined;
var buttonColor = 'black';
var skinLevelColor = skinLevelColor || undefined;
var skinMenuColor = skinMenuColor || undefined;
var skinAudioMuteColor = skinAudioMuteColor || undefined;
var skinFullBackgroundColor = skinFullBackgroundColor || undefined;
var skinTextColor = skinTextColor || undefined;
var skinHelpBorderColor = skinHelpBorderColor || undefined;
var skinFont = skinFont || undefined;
var skinTitle = skinTitle || undefined;
var skinPhoto = skinPhoto || undefined;
var skinLogoImageFileName = skinLogoImageFileName || undefined;
var menuColor = 'black';
var textColor = 'black';
var helpBorderColor = 'black';
var font = 'impact';
var bottomAddLink = bottomAddLink || undefined;
var bottomAddBox;
var photoAddLink = photoAddLink || undefined;
var watermark = watermark || undefined;
var watermarkAlpha = watermarkAlpha || undefined;
var sanders = sanders || undefined;
var language = language || undefined;
var fixedWidth = fixedWidth || undefined;
var fixedHeight = fixedHeight || undefined;
var encrypted = encrypted || undefined;
var forceBottomAdd = forceBottomAdd || undefined;
var photoCreditLine = photoCreditLine || undefined;
var audioEnabled = audioEnabled || undefined;
var splashImageFileName = splashImageFileName || undefined;
var splashTimeout = splashTimeout || undefined;
var keepSpareX = keepSpareX || undefined;
var keepSpareY = keepSpareY || undefined;
var fixedMarginTop = fixedMarginTop || undefined;
var fixedMarginLeft = fixedMarginLeft || undefined;
var mobile = mobile || undefined;
var splashImage;
var splashScreenActive = false;
var puzzlePageMode = false;
var newScaling = newScaling || undefined;
var linkNextPuzzle = linkNextPuzzle || undefined;

var noAutoNextPuzzle = noAutoNextPuzzle || undefined;
var highlightNextInterval;
var doHighlightNext = false;
var highlightHelpInterval;
var highlightHelpCounter;
var startHighlightHelp = startHighlightHelp || undefined;
var doHighlightHelp = false;

var LANG_EN = "english";
var LANG_NL = "dutch";
var LANG_DE = "german";
var LANG_SDE = "swissgerman";
var LANG_FR = "french";
var LANG_ES = "spanish";
var LANG_PT = "portuguese";
var LANG_DK = "danish";
var LANG_IS = "icelandic";
var LANG_SE = "swedish";
var LANG_NO = "norwegian";
var LANG_SI = "slovenian";
var LANG_IT = "italian";
var LANG_PL = "polish";
var LANG_CA = "catalan";

// Declare external variables
var appOnMouseUp;
var appOnMouseDown;
var appOnMouseMove;
var appOnConfigure = appOnConfigure || undefined;
var appOnInit;
var appOnDraw;
var appOnKeyDown;
var appOnKeyUp;
var appOnKeyPressed;
var appOnDrop;
var appOnLevelButtonUp;
var appOnDrawHelp;
var appOnClearSplashScreen;
var appOnDrawInstructionsBox;
var appOnNextButton;
var appOnHelpButton;
var appOnVideoAdsFinished;
var appOnVideoAdsStarted;

var g_imagesToLoad = [];
var g_buttons = [];
var g_filesLoaded = 0;
var g_filesNeeded = 0;

var g_onConfigure;
var g_startTimer;
var g_title;
var g_overlayCtx;
var g_extraFont = g_extraFont || undefined;

var firstLoad = true;

var GS_STOPPED = "game_stopped";
var GS_STARTED = "game_started";
var GS_POPUP = "game_popup";
var GS_WAIT = "game_wait";
var gameState = GS_STOPPED;

var fwOnMouseDownDD = fwOnMouseDownDD || undefined;
var fwOnMouseMoveDD = fwOnMouseMoveDD || undefined;
var fwOnMouseUpDD = fwOnMouseUpDD || undefined;

var enableGameBtn = true;
var enableNextBtn = true;
var enableModeBtn = true;
var hideNextBtn = hideNextBtn || undefined;
var hideGameBtn = hideGameBtn || undefined;
var hidePhotoBtn = hidePhotoBtn || undefined;
var helpLogoText = helpLogoText || undefined;
var largeInfoBtn = largeInfoBtn || undefined;
var dummyGameBtn = dummyGameBtn || undefined;
var useBasicLinkAtModeButton = useBasicLinkAtModeButton || undefined;
var addCreditsToHelp = addCreditsToHelp || undefined;

var fixedOrder = fixedOrder || undefined;
var fixedOrderIndex = 0;
var gameAds = gameAds || undefined;
var gameAdsEnabled = false;
var dailyMode = dailyMode || undefined;
var dailyJigsawLock = true;

var TIMERMODE_POINTS = 0;
var TIMERMODE_TIMER = 1;
var timerMode;

var appOnOptionsChanged;
var appOnOptionsSync;
var wlBox = wlBox || undefined;
var m_canvasWidth, m_canvasHeight;

var optionsBox = {
    active:         false,
    context:        null,
    x:              0,
    y:              0,
    w:              0,
    h:              0,
    okBtn:          {w: 256, h: 56},
    cancelBtn:      {w: 256, h: 56},
    buttons:        [],
    rows:           []
};

var instructionsBox = {
    active:             false,
    context:            null,
    backgroundColor:    'white',
    x:                  0,
    y:                  0,
    w:                  0,
    h:                  0
};

var isTouchSupported = "ontouchend" in document;

var gameLevelEnum = {
    EASY:                   'easy',
    NORMAL:                 'normal',
    HARD:                   'hard'
};

var sidFw = {
    OK:                         0,
    CANCEL:                     1,
    MORE_GAMES:                 2,
    LEVEL_EASY:                 3,
    LEVEL_NORMAL:               4,
    LEVEL_HARD:                 5,
    LEVEL_EXTREME:              6,
    OPTIONS_AUDIO:              7,
    OPTIONS_FULL_SCREEN:        8,
    OPTIONS_GAME_FROM:          9,
    YES:                        10,
    NO:                         11,
    HELP_START_TIMER:           20,
    HELP_START_COUNTER:         21,
    HELP_BACK:                  22,
    HELP_NEXT:                  23,
    SCORE_CONGRATULATIONS:      30,
    SCORE_UNFORTUNATELY:        31,
    SCORE_POINT:                32,
    SCORE_POINTS:               33,
    SCORE_GAINED:               34,
    SCORE_SOLVED:               35,
    SCORE_NEXT:                 36,
    ADBLOCKER_1:                100,
    ADBLOCKER_2:                101,
    ADBLOCKER_3:                102,
    ADBLOCKER_4:                103,
    ADBLOCKER_5:                104,
    ADBLOCKER_6:                105,
    ADBLOCKER_7:                106,
    COOKIE_CONSENT_1:           110,
    COOKIE_CONSENT_2:           111,
    COOKIE_CONSENT_3:           112,
    COOKIE_CONSENT_4:           113,
};

function fwPickLanguageText(texts) {
    "use strict";
    switch (language) {
    case LANG_NL:
        if ((texts.length >= 2) && (texts[1] !== "")) { return texts[1]; }
        break;
    case LANG_DE:
    case LANG_SDE:
        if ((texts.length >= 3) && (texts[2] !== "")) { return texts[2]; }
        break;
    case LANG_DK:
        if ((texts.length >= 4) && (texts[3] !== "")) { return texts[3]; }
        break;
    case LANG_ES:
        if ((texts.length >= 5) && (texts[4] !== "")) { return texts[4]; }
        break;
    case LANG_PT:
        if ((texts.length >= 6) && (texts[5] !== "")) { return texts[5]; }
        break;
    case LANG_IS:
        if ((texts.length >= 7) && (texts[6] !== "")) { return texts[6]; }
        break;
    case LANG_SE:
        if ((texts.length >= 8) && (texts[7] !== "")) { return texts[7]; }
        break;
    case LANG_NO:
        if ((texts.length >= 9) && (texts[8] !== "")) { return texts[8]; }
        break;
    case LANG_SI:
        if ((texts.length >= 10) && (texts[9] !== "")) { return texts[9]; }
        break;
    case LANG_FR:
        if ((texts.length >= 11) && (texts[10] !== "")) { return texts[10]; }
        break;
    default:
        break;
    }
    return texts[0];
}

// __TEXTS -------------------------------------------------------------------------------------------------------------
function getFwString(id) {
    "use strict";
    var texts = [];
    switch (id) {
    case sidFw.OK:
        texts = ["Ok",
            "Oké",
            "Ok",
            "Ok",
            "Ok",
            "Ok",
            "Ok",
            "Ok",
            "Ok",
            "V redu",
            "Ok"];
        break;
    case sidFw.CANCEL:
        texts = ["Cancel",
            "Annuleren",
            "Abbrechen",
            "Annuller",
            "Cancelar",
            "Cancela",
            "Hætta við",
            "Avbryta",
            "Avbryt",
            "Prekliči",
            "Annuler"];
        break;
    case sidFw.MORE_GAMES:
        texts = ["More games",
            "Meer spellen",
            "Mehr spiele",
            "Flere spil",
            "Más juegos"];
        break;
    case sidFw.LEVEL_EASY:
        texts = ["Easy",
            "Makkelijk",
            "Enfach",
            "Let",
            "Fácil",
            "Fácil",
            "Auðvelt",
            "Lätt",
            "Lett",
            "Enostavna",
            "Facile"];
        break;
    case sidFw.LEVEL_NORMAL:
        texts = ["Normal",
            "Normaal",
            "Normal",
            "Normal",
            "Normal",
            "Normal",
            "Í meðallagi",
            "Normal",
            "Normal",
            "Srednja",
            "Normal"];
        break;
    case sidFw.LEVEL_HARD:
        texts = ["Hard",
            "Moeilijk",
            "Schwer",
            "Svær",
            "Difícil",
            "Difícil",
            "Erfitt",
            "Svårt",
            "Hard",
            "Zahtevna",
            "Difficile"];
        break;
    case sidFw.LEVEL_EXTREME:
        texts = ["Extreme",
            "Extreem",
            "Extrem",
            "",
            "Muy difícil",
            "Mjög erfitt",
            "",
            "Extrem",
            "Ekstrem",
            "Zelo zahtevna"];
        break;
    case sidFw.OPTIONS_AUDIO:
        texts = ["Audio",
            "Audio",
            "Audio",
            "Audio",
            "Sonido",
            "Áudio",
            "Hljóð",
            "Ljud",
            "Audio",
            "Zvok",
            "Audio"];
        break;
    case sidFw.OPTIONS_FULL_SCREEN:
        texts = ["Full screen",
            "Volledig scherm",
            "Vollbild",
            "Fuld skærm",
            "Pantalla completa",
            "Tela cheia",
            "Heill skjár",
            "Fullskärm",
            "Full skjerm",
            "Celoten zaslon",
            "Plein écran"];
        break;
    case sidFw.OPTIONS_GAME_FROM:
        texts = ["A game by",
            "Een leerspel van",
            "Ein spiel von",
            "Et spil af",
            "Un juego de",
            "Um jogo de",
            "leikur eftir",
            "Ett spel av"];
        break;
    case sidFw.YES:
        texts = ["Yes",
            "Ja",
            "Ja",
            "Ja",
            "Si",
            "Sim",
            "Já",
            "Ja",
            "Ja",
            "Da",
            "Oui"];
        break;
    case sidFw.NO:
        texts = ["No",
            "Nee",
            "Nein",
            "Nej",
            "No",
            "Não",
            "Nei",
            "Nej",
            "Nei",
            "Ne",
            "Non"];
        break;
    case sidFw.COOKIE_CONSENT_1:
        texts = ["Cookie consent missing :-("];
        break;
    case sidFw.COOKIE_CONSENT_2:
        texts = ["I need cookie consent for all games to operate properly, and to"];
        break;
    case sidFw.COOKIE_CONSENT_3:
        texts = ["monetize te site, so I can keep it free for everybody."];
        break;
    case sidFw.COOKIE_CONSENT_4:
        texts = ["Update cookie consent"];
        break;
    case sidFw.ADBLOCKER_1:
        texts = ["Adblocker detected :-(",
            "Adblocker gevonden :-(",
            "Adblocker gefunden :-(",
            "Adblocker fundet :-(",
            "Adblocker detectado :-(",
            "",
            "",
            "AdBlocker upptäckt :-(",
            "Adblocker oppdaget :-(",
            "",
            "Adblocker détecté :-("];
        break;
    case sidFw.ADBLOCKER_2:
        texts = ["Sorry to see you have an Adblocker installed ...",
            "Jammer dat je een adblocker hebt geïnstalleerd ...",
            "Schade, dass du einen Adblocker installiert hast ... Ich halte diese",
            "Ærgerligt, du har en Adblocker installeret ... Jeg kan bevare denne",
            "Lamento ver que tienes un Adblocker instalado...",
            "",
            "",
            "Ledsen att se att du har en Adblocker installerad...",
            "Beklager å se at du har en Adblocker installert...",
            "",
            "Désolé que tu aies un Adblocker installé..."];
        break;
    case sidFw.ADBLOCKER_3:
        texts = ["I can keep this site free for everybody with adding a single ad block per game",
            "Ik kan deze site gratis aanbieden met slechts 1 reclame blok per spel",
            "Seite kostenfrei für jeden, indem ich nur eine Werbeanzeige pro Spiel schalte",
            "side som gratis for alle, ved at tilføje én enkelt reklameblok per spil",
            "Puedo mantener este sitio libre para todos con un solo anuncio por juego",
            "",
            "",
            "Jag kan hålla den här sidan gratis för alla med ett enda annonsblock per spel",
            "Jeg kan holde dette nettstedet gratis med å legge en enkelt annonse per spill",
            "",
            "Je peux garder ce site gratuit pour tous en ajoutant un bloc publicitaire par jeu"];
        break;
    case sidFw.ADBLOCKER_4:
        texts = ["Please consider to disable the Adblocker for this site",
            "Overweeg aub om de Adblocker voor deze site uit te schakelen",
            "Bitte denke darüber nach, den Adblocker auf dieser Seite zu deaktivieren",
            "Overvej venligst at slå Adblockeren fra på denne side",
            "Por favor, considere desactivar el Adblocker para este sitio",
            "",
            "",
            "Tänk på att inaktivera Adblocker för denna hemsida",
            "Vennligst vurdere å deaktivere Adblocker for dette området",
            "",
            "Veuillez envisager de désactiver l'Adblocker pour ce site"];
        break;
    case sidFw.ADBLOCKER_5:
        texts = ["(disable the Adblocker or put www.digipuzzle.net in your whitelist)",
            "(de Adblocker uitschakelen of deze www.digipuzzle.net aan de whitelist toevoegen)",
            "(Deaktiviere den Adblocker oder füge www.digipuzzle.net zu deiner Whitelist hinzu)",
            "(slå Adblockeren fra eller tilføj www.digipuzzlee.net til din whitelist)",
            "(desactiva el Adblocker o pon www.digipuzzle.net en tu lista de sitios permitidos)",
            "",
            "",
            "(inaktivera Adblocker eller sätta www.digipuzzle.net i din vitlista)",
            "(Deaktivere Adblocker eller sette www.digipuzzle.net i whitelist)",
            "",
            "(désactive l'Adblocker ou mets www.digipuzzle.net dans ta liste blanche)"];
        break;
    case sidFw.ADBLOCKER_6:
        texts = ["for questions or an ad-free option contact me at marcel@digipuzzle.net",
            "voor vragen of opmerkingen kun je me bereiken op marcel@digipuzzle.net",
            "bei Fragen oder Feedback, kontaktiere mich unter marcel@digipuzzle.net",
            "for spørgsmål og kommentarer, kontakt mig på marcel@digipuzzle.net",
            "para preguntas o comentarios contáctame a marcel@digipuzzle.net",
            "",
            "",
            "för frågor eller kommentarer kontakta mig på marcel@digipuzzle.net",
            "for spørsmål eller kommentarer kontakt meg på marcel@digipuzzle.net",
            "",
            "Pour toute question ou remarque, contacte-moi à marcel@digipuzzle.net"];
        break;
    case sidFw.ADBLOCKER_7:
        texts = ["The game will start in %1 seconds.",
            "Het spel start over %1 seconden",
            "Das Spiel beginnt in %1 Sekunden.",
            "Spillet vil starte om %1 sekunder.",
            "El juego comenzará en %1 segundos.",
            "",
            "",
            "Spelet startar om %1 sekunder.",
            "Spillet starter i %1 sekunder.",
            "",
            "Le jeu commencera dans %1 seconde."];
        break;
    case sidFw.HELP_START_TIMER:
        texts = ["Start the timer to measure how long you need to solve the puzzle.",
            "Start de timer om te meten hoe lang je nodig hebt om de puzzel op te lossen.",
            "Starte den Timer, um zu messen, wie lange du brauchst um das Rätsel zu lösen.",
            "Start uret og tag tid på hvor længe du er om at lave puslespillet",
            "Empieza a contar el tiempo para resolver el puzle.",
            "Clique e marque seu tempo para completar o jogo.",
            "Hefja tímatöku. Hve lengi ertu að púsla?",
            "Starta timern för att mäta hur länge du behöver för att lösa pusslet.",
            "Start timeren til å måle hvor lang tid du trenger for å løse gåten.",
            "Vključi štoparico, da izmeriš, koliko časa potrebuješ za rešitev sestavljanke.",
            "Démarre la minuterie pour mesurer combien de temps\ntu as besoin pour résoudre le puzzle."];
        break;
    case sidFw.HELP_START_COUNTER:
        texts = ["Start the game to score as many points you can within 5 minutes.",
            "Hiermee start je het spel om binnen 5m zoveel mogelijk punten te scoren.",
            "Startet das Spiel innerhalb von 5m so viele wie möglich punkte zu holen.",
            "Start spillet her og scor så mange point du kan nå på 5 minutter.",
            "Empieza el juego y consigue tantos puntos como puedas en 5 minutos.",
            "Faça o máximo de pontos em 5 minutos.",
            "Byrjaðu leikinn og sjáðu hve mörgum stigum þú nærð á fimm mínútum.",
            "Starta spelet för att få så många poäng du kan inom 5 minuter.",
            "Start spillet for å score så mange poeng du kan i løpet av 5 minutter.",
            "Začni igro in osvoji čim več točk v 5 minutah.",
            "Commence le jeu pour marquer le plus de points possible en 5 minutes."];
        break;
    case sidFw.HELP_BACK:
        texts = ["Go back to the main puzzle page of %1",
            "Hiermee ga je terug naar de hoofdpagina van %1",
            "Zurück zum Haupt-Puzzle Seite von %1",
            "Gå til hovedsiden puslespils-startsiden af %1",
            "Vuelve a la página principal de %1",
            "Retorne para a página principal do %1",
            "Fara aftur á aðalsíðu %1",
            "Gå tillbaka till huvudpusselsidan i %1",
            "Gå tilbake til hovedpuslespillet siden av %1",
            "Vrni se na glavno stran sestavljank %1",
            "Retourne à la page principale du puzzle de %1"];
        break;
    case sidFw.HELP_NEXT:
        texts = ["Go to the next puzzle.",
            "Hiermee ga je verder naar de volgende puzzel.",
            "Zum nächsten puzzle.",
            "Gå til næste spil.",
            "Ir al siguiente puzzle.",
            "Vá para o próximo quebra-cabeça.",
            "Halda áfram.",
            "Gå till nästa pussel.",
            "Gå til neste puslespill.",
            "Pojdi na naslednjo sestavljanko.",
            "Aller au prochain puzzle."];
        break;
    case sidFw.SCORE_CONGRATULATIONS:
        texts = ["Congratulations!",
            "Gefeliciteerd!",
            "Glückwünsche!",
            "",
            "¡Felicidades!",
            "Parabéns!",
            "Til hamingju!",
            "",
            "",
            "Čestitam!",
            "Bravo!"];
        break;
    case sidFw.SCORE_UNFORTUNATELY:
        texts = ["Unfortunately...",
            "Helaas...",
            "Leider...",
            "",
            "Ohhhh...",
            "Infelizmente...",
            "Því miður",
            "",
            "",
            "Na žalost...",
            "Malheureusement..."];
        break;
    case sidFw.SCORE_POINT:
        texts = ["point",
            "punt",
            "Punkt",
            "point",
            "punto",
            "pontos",
            "stigum",
            "poäng",
            "poeng",
            "točk",
            "point"];
        break;
    case sidFw.SCORE_POINTS:
        texts = ["points",
            "punten",
            "Punkte",
            "points",
            "puntos",
            "pontos",
            "stigum",
            "poäng",
            "poeng",
            "točk",
            "points"];
        break;
    case sidFw.SCORE_GAINED:
        texts = ["You earned %1 %2",
            "Je hebt %1 %2 gehaald",
            "Du hast %1 %2 erreicht",
            "",
            "Has ganado %1 %2",
            "Você ganhou %1 %2",
            "Þú náðir %1 %2",
            "",
            "",
            "Zaslužil si %1 %2."];
        break;
    case sidFw.SCORE_SOLVED:
        texts = ["You solved the puzzle in %1",
            "Je hebt de puzzel opgelost in %1",
            "Du löste das puzzle in %1",
            "",
            "Resuelve el juego en %1",
            "Você resolveu o quebra-cabeça em %1",
            "Það tók þig %1 að leysa púslið.",
            "",
            "",
            "Za rešitev sestavljanke si potreboval %1."];
        break;
    case sidFw.SCORE_NEXT:
        texts = ["Click anywhere to view the image and then|the >> button to move to the next puzzle...",
            "Klik om deze box te sluiten, en dan op|'start' om nog een keer te spelen...",
            "Klicke auf die Maus, um weiterhin|zu gehen zum nächsten puzzle...",
            "",
            "Pincha en cualquier sitio para ver la imagen|y el botón >> para ir al siguiente puzle...",
            "Clique para ver a imagem e, em seguida no|botão para passar para um novo quebra-cabeça.",
            "Smelltu einhvers staðar til að sjá myndina|og síðan >> takkann til að fara í næstsa púsl.",
            "",
            "",
            "Klikni kjerkoli, da vidiš sliko in potem klikni|gumb >> za premik na naslednjo sestavljanko."];
        break;
    default:
        break;
    }
    return fwPickLanguageText(texts);
}

function fwGameStarted() {
    "use strict";
    return (gameState !== GS_STOPPED);
}

function fwEnableGameAds(enabled) {
    "use strict";
    gameAdsEnabled = enabled;
}

// __AUDIO OLD MODE-----------------------------------------------------------------------------------------------------
var audioType;
var m_audio; // old mode
//Function to play the exact file format
function detectAudioType() {
    "use strict";
    //if (isTouchSupported) { audioEnabled = false; }
    if (audioEnabled === true) {
        var audio = new Audio();
        if (audio.canPlayType("audio/mp3") || audio.canPlayType("audio/mpeg")) {
            audioType = ".mp3";
        } else {
            audioType = ".wav";
        }
    }
}

function playAudio(sampleName) {
    "use strict";
    detectAudioType();
    if ((audioEnabled === true) && (audioMuted === false)) {
        if (m_audio !== undefined) {
            m_audio.pause();
            m_audio.currentTime = 0;
        }
        m_audio = new Audio("sounds/" + sampleName + audioType);
        m_audio.play();
    }
}

function stopAudio() {
    "use strict";
    if (audioEnabled === true) {
        if (m_audio !== undefined) {
            m_audio.pause();
            m_audio.currentTime = 0;
        }
    }
}

function playAudioLoop(sampleName) {
    "use strict";
    detectAudioType();
    if ((audioEnabled === true) && (audioMuted === false)) {
        m_audio = new Audio("sounds/" + sampleName + audioType);
        m_audio.loop = true;
        m_audio.play();
    }
}

function stopAudioLoop(sampleName) {
    /*jshint unused:vars*/ 
    "use strict";
    m_audio.pause();
}

function fwCheckVideoAdsActive() {
    "use strict";
    return m_videoAdsActive;
}

// __AUDIO NEW MODE-----------------------------------------------------------------------------------------------------
var m_audioPlayer;
var m_audioPlayerLoaded = false;
var m_audioPlayerStartTime;
var m_audioPlayerEndTime;
var m_audioPlayerLoopActive;
var m_audioPlayerFree = false;
var m_audioSampleName; // used for debug only

function fwAudioPlayerTimeUpdate() {
    "use strict";
    if (m_audioPlayer.currentTime >= m_audioPlayerEndTime) {
        m_audioPlayer.pause();
        if (m_audioPlayerLoopActive) {
            m_audioPlayer.currentTime = m_audioPlayerStartTime;
            m_audioPlayer.play();
        } else {
            m_audioPlayerFree = true;
        }
    }
}

function fwAudioPlayerLoadedEvent() {
    "use strict";
    m_audioPlayerLoaded = true;
    //console.log('audio loaded');
}

function fwInitAudio(sampleName) {
    "use strict";
    var extension;
    // create audio player (max one supported on iOS)
    m_audioPlayer = new Audio();
    // detect supported audio by browser (mp3 or wav)
    if (m_audioPlayer.canPlayType("audio/mpeg")) {
        extension = ".mp3";
    } else if (m_audioPlayer.canPlayType("audio/ogg")) {
        extension = ".ogg";
    } else {
        extension = ".wav";
    }
    m_audioPlayer.addEventListener('timeupdate', fwAudioPlayerTimeUpdate, false);
    // load single audio file
    m_audioPlayer.src = "sounds/" + sampleName + extension;
    m_audioPlayer.addEventListener("canplay", fwAudioPlayerLoadedEvent, false);
    m_audioPlayer.load();
    // flag to signal audio player is free
    m_audioPlayerFree = true;
    // signal for optionsbox
    audioEnabled = true;
    m_audioSampleName = sampleName + extension;
}

function fwStopAudio() {
    "use strict";
    m_audioPlayer.pause();
    m_audioPlayerLoopActive = false;
    m_audioPlayerFree = true;
}

function fwPlayAudio(sample, loop) {
    "use strict";
    if ((audioEnabled === true) && (m_audioPlayerLoaded === true)) {
        //fwStopAudio();
        if (audioMuted === false) {
            // store sample information
            m_audioPlayerStartTime = sample.startTime;
            m_audioPlayerEndTime = sample.endTime;
            m_audioPlayerLoopActive = loop;
            // start player
            m_audioPlayerFree = false;
            m_audioPlayer.currentTime = m_audioPlayerStartTime;
            m_audioPlayer.loop = false; // handled in callback method
            m_audioPlayer.play();
        }
    }
}

// __FRAMEWORK ---------------------------------------------------------------------------------------------------------
function fwRegisterOnMouseUp(fnc) {
    "use strict";
    appOnMouseUp = fnc;
}
function fwRegisterOnMouseDown(fnc) {
    "use strict";
    appOnMouseDown = fnc;
}
function fwRegisterOnMouseMove(fnc) {
    "use strict";
    appOnMouseMove = fnc;
}
function fwRegisterOnInit(fnc) {
    "use strict";
    appOnInit = fnc;
}
function fwRegisterOnDraw(fnc) {
    "use strict";
    appOnDraw = fnc;
}
function fwRegisterOnKeyDown(fnc) {
    "use strict";
    appOnKeyDown = fnc;
}
function fwRegisterOnKeyUp(fnc) {
    "use strict";
    appOnKeyUp = fnc;
}
function fwRegisterOnKeyPressed(fnc) {
    "use strict";
    appOnKeyPressed = fnc;
}
function fwRegisterOnLevelButtonUp(fnc) {
    "use strict";
    appOnLevelButtonUp = fnc;
}
function fwRegisterOnDrawHelp(fnc) {
    "use strict";
    appOnDrawHelp = fnc;
}
function fwRegisterOnOptionsChanged(fnc) {
    "use strict";
    appOnOptionsChanged = fnc;
}
function fwRegisterOnOptionsSync(fnc) {
    "use strict";
    appOnOptionsSync = fnc;
}
function fwRegisterOnDrawInstructionsBox(fnc) {
    "use strict";
    appOnDrawInstructionsBox = fnc;
}

function fwRegisterOnClearSplashScreen(fnc) {
    "use strict";
    appOnClearSplashScreen = fnc;
}
function fwRegisterTitle(title) {
    "use strict";
    g_title = title;
}
function fwRegisterOverlayCtx(ctx) {
    "use strict";
    g_overlayCtx = ctx;
}
function fwRegisterOnNextButton(fnc) {
    "use strict";
    appOnNextButton = fnc;
}
function fwRegisterOnHelpButton(fnc) {
    "use strict";
    appOnHelpButton = fnc;
}
function fwRegisterVideoAdsStarted(fnc) {
    "use strict";
    appOnVideoAdsStarted = fnc;
}
function fwRegisterVideoAdsFinished(fnc) {
    "use strict";
    appOnVideoAdsFinished = fnc;
}

function clearApp() {
    "use strict";
    appOnMouseDown = undefined;
    appOnMouseUp = undefined;
    appOnMouseMove = undefined;
    appOnKeyDown = undefined;
    appOnKeyUp = undefined;
    appOnKeyPressed = undefined;
    appOnInit = undefined;
    appOnDraw = undefined;
    appOnDrop = undefined;
    appOnLevelButtonUp = undefined;
    appOnDrawHelp = undefined;
    appOnClearSplashScreen = undefined;
    appOnOptionsChanged = undefined;
    appOnOptionsSync = undefined;
    appOnNextButton = undefined;
    appOnHelpButton = undefined;
    appOnVideoAdsStarted = undefined;
    appOnVideoAdsFinished = undefined;
}

function clearFw() {
    "use strict";
    // clear current application function pointers
    clearApp();
    // clear application buttons
    g_buttons.length = 0;
    // clear file loading
    g_filesLoaded = 0;
    g_filesNeeded = 0;
}

function fwAddImageToLoad(img, src) {
    "use strict";
    var i;
    if (img.width > 0) { return; }
    for (i = 0; i < g_imagesToLoad.length; i += 1) {
        if (g_imagesToLoad[i].src === src) { return; } // image already in toLoad list; skip
    }
    g_imagesToLoad.push({ img: img, src: src });
}

function startLoadImages() {
    "use strict";
    var i;
    // start loading images
    g_filesLoaded = 0;
    g_filesNeeded = g_imagesToLoad.length;
    if (g_filesNeeded > 0) {
        for (i = 0; i < g_imagesToLoad.length; i += 1) {
            g_imagesToLoad[i].img.crossOrigin = '';
            g_imagesToLoad[i].img.onload = onImageLoad;
            g_imagesToLoad[i].img.src = g_imagesToLoad[i].src;
        }
    } else {
        // no files required; initialise app
        if (appOnInit !== undefined) {
            appOnInit();
        }
    }
}

function fwAddButton(x, y, w, h, hover, fnc, param) {
    "use strict";
    g_buttons.push({x: x, y: y, w: w, h: h, hover: hover, minHoldTime: undefined, disabled: false, fnc: fnc, param: param });
    return (g_buttons[g_buttons.length - 1]);
}

function fwAddButtonWithMinHoldTime(x, y, w, h, hover, minHoldTime, fnc, param) {
    "use strict";
    g_buttons.push({x: x, y: y, w: w, h: h, hover: hover, minHoldTime: minHoldTime, downTime: undefined, fnc: fnc, param: param });
}

// __GRAPHICS -----------------------------------------------------------------------------------------------------------
function graphicsFlipImage(lctx, x, y, width, height, x2, y2) {
    "use strict";
    var canvasData = lctx.getImageData(x, y, width, height),
        pixels = canvasData.data,
        l,
        k,
        p,
        tmp;

    for (l = 0, k = (height - 1); l < (height / 2); l += 1, k -= 1) {
        for (p = 0; p < (4 * width); p += 1) {
            tmp = pixels[(l * width * 4) + p];
            pixels[(l * width * 4) + p] = pixels[(k * width * 4) + p];
            pixels[(k * width * 4) + p] = tmp;
        }
    }

    lctx.putImageData(canvasData, x2, y2);
}

function graphicsMirrorImage(lctx, x, y, width, height, x2, y2) {
    "use strict";
    var canvasData = lctx.getImageData(x, y, width, height),
        pixels = canvasData.data,
        p,
        h,
        w,
        w2,
        offset,
        offset2,
        tmp;

    for (h = 0; h < height; h += 1) {
        for (w = 0, w2 = width - 1; w < (width / 2); w += 1, w2 -= 1) {
            offset = (h * width * 4) + (w * 4);
            offset2 = (h * width * 4) + (w2 * 4);
            for (p = 0; p < 4; p += 1) {
                tmp = pixels[offset + p];
                pixels[offset + p] = pixels[offset2 + p];
                pixels[offset2 + p] = tmp;
            }
        }
    }

    lctx.putImageData(canvasData, x2, y2);
}

function graphicsGrayScaleImage(lctx, x, y, width, height, x2, y2) {
    "use strict";
    try {
        var canvasData = lctx.getImageData(x, y, width, height),
            pixels = canvasData.data,
            p,
            val;

        for (p = 0; p < pixels.length; p += 4) {
            val = Math.floor(pixels[p] * 0.3 + pixels[p + 1] * 0.59 + pixels[p + 2] * 0.11);
            pixels[p] = val;        // red
            pixels[p + 1] = val;    // green
            pixels[p + 2] = val;    // blue
        }
        lctx.putImageData(canvasData, x2, y2);
    } catch (err) {
    }
}

function graphicsEdgeDetection(lctx, x, y, width, height) {
    "use strict";
    var canvasData = lctx.getImageData(x, y, width, height),
        pixels = canvasData.data,
        edges = 0,
    //diff = 0,
        lineArray = [],
        l,
        offset,
        prevGrayScale,
        grayScale,
        r,
        p;

    for (l = 0; l < height; l += 1) {
        offset = (l * width * 4);
        prevGrayScale = -1;
        r = 0;
        for (p = 0; p < (4 * width); p += 4) {
            grayScale = Math.floor(pixels[offset + p] * 0.3 + pixels[offset + p + 1] * 0.59 + pixels[offset + p + 2] * 0.11);

            if (p > 0) {
                //diff += Math.abs(prevGrayScale - grayScale);

                if (Math.abs(prevGrayScale - grayScale) > minEdge) {
                    edges += 1;
                }
            }
            prevGrayScale = grayScale;

            if (l > 0) {
                if (Math.abs(lineArray[r] - grayScale) > minEdge) {
                    edges += 1;
                }
            }
            lineArray[r] = grayScale;
            r += 1;
        }
    }

    //diff = diff / ((width - 1) * height);
    return parseInt(edges.toFixed(0), 10);
}

function decryptImage(lctx, width, height) {
    "use strict";
    try {
        var canvasData = lctx.getImageData(0, 0, width, height),
            pixels = canvasData.data,
            p,
            sp,
            y,
            x = 0,
            sx,
            i = 0,
            j,
            a,
            shift = [ 300, 80, 334, 41, 200, 460, 100, 4, 670, 345, 603, 140, 700, 240, 300, 240, 503, 380, 134, 541, 400, 160, 700, 404, 570, 445, 203, 340, 200, 740, 400, 640],
            offset = [ 100, 80, 10, 150, 200, 80, 50, 10, 170, 40, 100, 140, 180, 40, 20, 100, 190, 140, 200, 30, 80, 190, 20, 190, 120, 100, 200, 100, 20, 50, 140, 70],
            sourcePixels = [];

        for (j = 0; j < (width * 4); j += 1) {
            sourcePixels.push(0);
        }

        for (y = 0; y < height; y += 1) {
            for (j = 0; j < (width * 4); j += 1) {
                sourcePixels[j] = pixels[(y * (768 * 4)) + j];
            }
            for (x = 0; x < width; x += 1) {

                sx = (x + shift[i]) % 768;
                //sx = x;
                p = (y * (768 * 4)) + (x * 4);
                sp = sx * 4;

                a = sourcePixels[sp + 3];
                a = 10;

                pixels[p    ] = ((256 + sourcePixels[sp    ]) - offset[i]) % 256;
                pixels[p + 1] = ((256 + sourcePixels[sp + 1]) - offset[i]) % 256;
                pixels[p + 2] = ((256 + sourcePixels[sp + 2]) - offset[i]) % 256;

                //pixels[p] = sourcePixels[sp];
                //pixels[p + 1] = sourcePixels[sp + 1];
                //pixels[p + 2] = sourcePixels[sp + 2];
                pixels[p + 3] = 255;
            }
            i = (i + 1) % 32;
        }
        lctx.putImageData(canvasData, 0, 0);
    } catch (err) {
    }
}

// __UTILITY -----------------------------------------------------------------------------------------------------------
function distance(x1, y1, x2, y2) {
    "use strict";
    return Math.sqrt(Math.pow(Math.abs((x1 + 32) - (x2 + 32)), 2) + Math.pow(Math.abs((y1 + 32) - (y2 + 32)), 2));
}

function fwGetDistance(x1, y1, x2, y2) {
    "use strict";
    return Math.sqrt(Math.pow(Math.abs((x1 + 32) - (x2 + 32)), 2) + Math.pow(Math.abs((y1 + 32) - (y2 + 32)), 2));
}

function pointInBox(x, y, l, t, w, h) { //@@ remove method
    "use strict";
    return ((x >= l) && (x < (l + w)) && (y >= t) && (y < (t + h)));
}

function fwPointInBox(x, y, l, t, w, h) {
    "use strict";
    return ((x >= l) && (x < (l + w)) && (y >= t) && (y < (t + h)));
}

function incGameLevel() {
    "use strict";
    var i;
    for (i = 0; i < gameLevels.length; i += 1) {
        if (gameLevel === gameLevels[i]) {
            gameLevel = gameLevels[(i + 1) % gameLevels.length];
            break;
        }
    }
}
function fwIncGameLevel() {
    "use strict";
    incGameLevel();
}

function displayGameLevel() {
    "use strict";
    var i;
    for (i = 0; i < gameLevels.length; i += 1) {
        if (gameLevel === gameLevels[i]) {
            drawLevel(i + 1, gameLevels.length);
            break;
        }
    }
}

// __SITELOCK ----------------------------------------------------------------------------------------------------------
var lockImage;
var lockSiteName = lockSiteName || undefined;
function checkLock() {
    "use strict";
    var s = "", j, chr, hostname;
    if ((lockSiteName !== undefined) && (document.location.pathname.indexOf("D:") < 0)) {
        for (j = 0; j < lockSiteName.length; j += 1) {
        	chr = lockSiteName.charCodeAt(j) + 3;
            s += String.fromCharCode(chr);
        }
        hostname = document.location.hostname.toLowerCase();
        if ((hostname.indexOf(s) < 0)) {
            lockImage = new Image();
            fwAddImageToLoad(lockImage, "lock.png");
        }
    }
}

var fwQuestionList = { size: 5, list: []};
function fwQuestionListInit(size) {
    "use strict";
    fwQuestionList.list = [];
    fwQuestionList.size = size;
}

function fwQuestionListCheck(question) {
    "use strict";
    var i, found = false;
    for (i = 0; i < fwQuestionList.list.length; i += 1) {
        if (question === fwQuestionList.list[i]) {
            found = true;
        }
    }
    return !found;
}

function fwQuestionListAdd(question) {
    "use strict";
    fwQuestionList.list.push(question);

    if (fwQuestionList.list.length > fwQuestionList.size) {
        // if size is reached remove oldest entry
        fwQuestionList.list.splice(0, 1);
    }
}

// __RANDOM -------------------------------------------------------------------------------------------------------------
var rndPicture = { max: 0, list: [] };
var rndWord = { max: 0, list: [] };
var rndPiece = { max: 0, list: [] };
var rndQuestion = { max: 0, list: [] };

function initRndList(rnd, maxNumber) {
    "use strict";
    rnd.max = maxNumber;
    rnd.list = [];
}

function getRnd(rnd) {
    "use strict";
    var found = false, value = 0, i, limit;
    while (found === false) {
        found = true;
        value = Math.floor(Math.random() * rnd.max);
        for (i = 0; i < rnd.list.length; i += 1) {
            if (value === rnd.list[i]) {
                found = false;
                break; // break for loop
            }
        }
    }

    rnd.list.push(value);

    limit = Math.floor(rnd.max / 2);

    if (rnd.list.length > limit) {	// if random list reaches limit; remove the first item
        rnd.list.splice(0, 1);
    }
    return value;
}

// titles in different languages
var titles = [
    {game: GM_PHOTOSEARCH, en: "PhotoSearch", nl: "FotoZoeker", de: "FotoSuche", fr: 'PhotoRecherche'},
    {game: GM_PHOTOPUZZLE, en: "BlockPuzzle", nl: "BlokPuzzel", de: "BlöckePuzzle", fr: 'BlocPuzzle'},
    {game: GM_JIGSAW, en: "Jigsaw", nl: "Jigsaw", de: "Jigsaw Puzzle", fr: 'Jigsaw'},
    {game: GM_DAILYJIGSAW, en: "Daily Jigsaw", nl: "Dagelijkse Jigsaw", de: "Tägliche Jigsaw Puzzle", fr: 'Jigsaw Quotidien'},
    {game: GM_MAHJONG, en: "Mahjong", nl: "Mahjong", de: "Mahjong", fr: 'Mahjong'},
    {game: GM_PHOTOSWAP, en: "PhotoSwap", nl: "WisselFoto", de: "FotoSwap", fr: 'SwapDePhoto'},
    {game: GM_PHOTOTURN, en: "PhotoTurn", nl: "DraaiFoto", de: "FotoDrehen", fr: 'PhotoTourner'},
    {game: GM_SUDOKU, en: "Sudoku", nl: "Sudoku", de: "Sudoku", fr: "Sudoku"},
    {game: GM_WORDSEARCH, en: "Wordsearch", nl: "Woordzoeker", de: "WortPuzzle", fr: "JeuDeMots"},
    {game: GM_PHOTOMIXUP, en: "PhotoMixUp", nl: "FotoMixUp", de: "FotoMixUp", fr: "PhotoMixUp"},
    {game: GM_MEMORY, en: "Memory", nl: "Memory", de: "Memory", fr: "Mémoire" },
    {game: GM_COLLMEMORY, en: "Photo Memory", nl: "Foto Memory", de: "Foto Memory", fr: "Photo Mémoire" },
    {game: GM_COLLMAHJONG, en: "Photo Mahjong", nl: "Foto Mahjong", de: "Foto Mahjong", fr: "Photo Mahjong" },
    {game: GM_WORDMEMORY, en: "Word Memory", nl: "Woorden Memory", de: "Wort Memory", fr: "Mot Mémoire" },
    {game: GM_HANGMAN, en: "Hangman", nl: "Galgje", de: "Henkerspiel", fr: "Bourreau"},
    {game: GM_SLIDER, en: "15-game", nl: "Schuifpuzzel", de: "15-Puzzle", fr: "15-jeu"},
    {game: GM_PHOTODIFF, en: "Spot Differences", nl: "Zoek de verschillen", de: "Differenzen suche", fr: "Recherche différences" },
    {game: GM_SOLITAIRE, en: "Solitaire"},
    {game: GM_MINESWEEPER, en: "Minesweeper", nl: "Mijnenveger"},
    {game: GM_QUIZ, en: "DigiQuiz"},
    {game: GM_TILESQUIZ, en: "TilesQuiz"},
    {game: GM_CROSSWORD, en: "Crossword"},
    {game: GM_TILESMATH, en: "MathPuzzel", nl: "RekenPuzzel"}
];

function getTitleString(gameMode) {
    "use strict";
    var i, title = "";
    if (g_title !== undefined) { return g_title; }
	for (i = 0; i < titles.length; i += 1) {
		if (titles[i].game === gameMode) {
			title = titles[i].en;
			switch (language) {
			case LANG_NL:
				if (titles[i].nl !== undefined) {
					title = titles[i].nl;
				}
				break;
			case LANG_DE:
            case LANG_SDE:
				if (titles[i].de !== undefined) {
					title = titles[i].de;
				}
				break;
			case LANG_FR:
				if (titles[i].fr !== undefined) {
					title = titles[i].fr;
				}
				break;
			case LANG_ES:
				if (titles[i].es !== undefined) {
					title = titles[i].es;
				}
				break;
			case LANG_PT:
				if (titles[i].pt !== undefined) {
					title = titles[i].pt;
				}
				break;
            case LANG_IS:
                if (titles[i].is !== undefined) {
                    title = titles[i].is;
                }
                break;
            case LANG_SE:
                if (titles[i].se !== undefined) {
                    title = titles[i].se;
                }
                break;
            case LANG_NO:
                if (titles[i].no !== undefined) {
                    title = titles[i].no;
                }
                break;
			}
		}
	}
	return title;
}

// __SNAP
function CanvasSaver(url) {
    "use strict";
    this.url = url;
    this.saturation = function (cnvs, x, y, w, h, x2, y2) {
        var ctx = cnvs.getContext("2d"),
            canvasData = ctx.getImageData(x, y, w, h),
            pixels = canvasData.data,
            p,
            grayScale,
            delta;

        for (p = 0; p < pixels.length; p += 4) {
            grayScale = pixels[p] * 0.3 + pixels[p + 1] * 0.59 + pixels[p + 2] * 0.11;
            delta = Math.floor((pixels[p] - grayScale) / 2);
            pixels[p] = grayScale + delta;	// red
            delta = Math.floor((pixels[p + 1] - grayScale) / 2);
            pixels[p + 1] = grayScale + delta;	// green
            delta = Math.floor((pixels[p + 2] - grayScale) / 2);
            pixels[p + 2] = grayScale + delta;	// blue
            //pixels[i+3]              is alpha
        }
        ctx.putImageData(canvasData, x2, y2);
    };

    this.saveImgLarge = function (cnvs, fname, x, y, w, h, w2, h2) {
        var fileCanvas = document.createElement('canvas'),
            fileCtx = fileCanvas.getContext("2d");
        fileCanvas.width = w2;
        fileCanvas.height = h2;
        fileCtx.drawImage(cnvs, x, y, w, h, 0, 0, w2, h2);
        this.savePNG(fileCanvas, fname);
    };
    this.savePNG = function (cnvs, fname) {
        var data, dataInput, nameInput, myForm;
        if (!cnvs || !url) { return; }
        fname = fname || 'picture';
        data = cnvs.toDataURL("image/jpg");
        data = data.substr(data.indexOf(',') + 1).toString();
        dataInput = document.createElement("input");
        dataInput.setAttribute("name", 'imgdata');
        dataInput.setAttribute("value", data);

        nameInput = document.createElement("input");
        nameInput.setAttribute("name", 'name');
        nameInput.setAttribute("value", fname + '.jpg');

        myForm = document.createElement("form");
        myForm.method = 'post';
        myForm.action = url;
        myForm.appendChild(dataInput);
        myForm.appendChild(nameInput);

        document.body.appendChild(myForm);
        myForm.submit();
        document.body.removeChild(myForm);
    };
}

function highlightNext() {
	"use strict";
	doHighlightNext = (doHighlightNext === false);
	draw();
}

function startHighlightNext() {
	"use strict";
	if (noAutoNextPuzzle === true) {
		if (highlightNextInterval === undefined) {
			highlightNextInterval = setInterval(highlightNext, 1000);
		}
	}
}

function highlightHelp() {
    "use strict";
    doHighlightHelp = (doHighlightHelp === false);
    draw();
    highlightHelpCounter += 1;
    if (highlightHelpCounter === 10) {
        clearInterval(highlightHelpInterval);
        highlightHelpInterval = undefined;
        startHighlightHelp = false;
    }
}

function activateHighlightHelp() {
    "use strict";
    // first clean up
    if (highlightHelpInterval !== undefined) {
        clearInterval(highlightHelpInterval);
        highlightHelpInterval = undefined;
    }
    doHighlightHelp = false;

    // check if start required
    if (startHighlightHelp === true) {
        highlightHelpInterval = setInterval(highlightHelp, 1000);
        highlightHelpCounter = 0;
    }
}

function nextOverlay() {
    "use strict";
    overlayCtx.clearRect(OVERLAY_OFFSET_X - 2, OVERLAY_OFFSET_Y - 2, overlayImage.width + 4, OVERLAY_H + 4);
    overlayCtx.globalAlpha = overlayGlobalAlpha;
    if (overlayPicture < overlayPictures) {
        overlayCtx.fillStyle = 'black';
        overlayCtx.fillRect(OVERLAY_OFFSET_X - 2, OVERLAY_OFFSET_Y - 2, overlayImage.width + 4, OVERLAY_H + 4);
        overlayCtx.drawImage(overlayImage, 0, overlayPicture * OVERLAY_H, overlayImage.width, OVERLAY_H, OVERLAY_OFFSET_X, OVERLAY_OFFSET_Y, overlayImage.width, OVERLAY_H);
        overlayStep += 2;

        if (overlayStep < 20) {
            overlayGlobalAlpha = overlayStep * 0.04;
        } else if (overlayStep < 40) {
            overlayGlobalAlpha = 20 * 0.04;
        } else if (overlayStep < 60) {
            overlayGlobalAlpha = (20 - (overlayStep - 40)) * 0.04;
        } else {
            // finished; next picture
            overlayPicture += 1;
            overlayStep = 0;
        }

        if (overlayPicture <= overlayPictures) {
            setTimeout(nextOverlay, 100);
        }
    } else {
        overlayCtx.clearRect(OVERLAY_OFFSET_X, OVERLAY_OFFSET_Y, overlayImage.width, OVERLAY_H);
    }
}

function startOverlay(ctx, image) {
    "use strict";
    overlayCtx = ctx;
    overlayImage = image;
    OVERLAY_H = overlayImage.height;
    overlayPictures = overlayImage.height / OVERLAY_H;
    overlayPicture = 0;
    overlayStep = 0;
    overlayGlobalAlpha = 0;
    nextOverlay();
}

function gup(name) {
    "use strict";
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)",
        regex = new RegExp(regexS),
        results = regex.exec(window.location.href);
    return (results === null) ? "" : results[1];
}

function initCanvas() {
    "use strict";
    if (canvas === undefined) {
        canvas = document.getElementById("canvas");
        scaleFactor = canvas.width / canvas.height;
        ctx = canvas.getContext("2d");
        bgcanvas = document.getElementById("bgcanvas");
        bgctx = bgcanvas.getContext("2d");
        topcanvas = document.getElementById("topcanvas");
        topctx = topcanvas.getContext("2d");
        addcanvas = document.getElementById("addcanvas");
        addctx = addcanvas.getContext("2d");
        helpcanvas = document.getElementById("helpcanvas");
        if (helpcanvas !== null) {
            helpctx = helpcanvas.getContext("2d");
        }
    }
}

function mouseDown(e) {
    "use strict";
    e.preventDefault();

    if (g_debugTouch) {
        console.log('mouse down 2');
    }
    var mouseX = (e.pageX - (canvas.parentNode.offsetLeft)) * currentScaleW,
        mouseY = (e.pageY - (canvas.parentNode.offsetTop)) * currentScaleH,
        i,
        handled = false;
    //console.log('mousedown (x:' + mouseX, ', y:' + mouseY + ')');

    if ((gameAds !== undefined) && (gameAdsEnabled === true)) {
        for (i = 0; i < gameAds.length; i += 1) {
            if (fwPointInBox(mouseX, mouseY, gameAds[i].x, gameAds[i].y, gameAds[i].w, gameAds[i].h)) {
                handled = true;
                try {
                    window.open(gameAds[i].link, "_blank");
                } catch (err) {}
            }
        }
    }
    if (!handled) {
        if (onMouseDown !== undefined) {
            onMouseDown(Math.floor(mouseX), Math.floor(mouseY));
        }
    }
}
function mouseUp(e) {
    "use strict";
    e.preventDefault();
    if (g_debugTouch) {
        console.log('mouse up');
    }
    var mouseX = (e.pageX - (canvas.parentNode.offsetLeft)) * currentScaleW,
        mouseY = (e.pageY - (canvas.parentNode.offsetTop)) * currentScaleH;
    //console.log('mouseup (x:' + mouseX, ', y:' + mouseY + ')');
    if (onMouseUp !== undefined) {
        onMouseUp(Math.floor(mouseX), Math.floor(mouseY));
    }
    window.focus();
}
function mouseMove(e) {
    "use strict";
    e.preventDefault();
    if (g_debugTouch) {
        console.log('mouse move');
    }
    var mouseX = (e.pageX - (canvas.parentNode.offsetLeft)) * currentScaleW,
        mouseY = (e.pageY - (canvas.parentNode.offsetTop)) * currentScaleH,
        text;
    //console.log('mousemove (x:' + mouseX, ', y:' + mouseY + ')');
    if ((bgctx !== undefined) && (debugMode === true)) {
        bgctx.clearRect(DEBUG_POS_X, DEBUG_POS_Y, 2 * 96, 10);
        text = mouseX.toFixed(0) + ',' + mouseY.toFixed(0);
        bgctx.font = "12px impact";
        bgctx.textAlign = "left";
        bgctx.fillStyle = "black";
        bgctx.fillText(text, DEBUG_POS_X + 10, DEBUG_POS_Y + 10);
    }
    if (onMouseMove !== undefined) {
        onMouseMove(Math.floor(mouseX), Math.floor(mouseY));
    }
}

var touchX, touchY;

function touchDown(e) {
    "use strict";
    e.preventDefault();

    if (g_debugTouch) {
        console.log('touch down');
    }
    touchX = Math.floor((e.targetTouches[0].pageX - (canvas.parentNode.offsetLeft)) * currentScaleW);
    touchY = Math.floor((e.targetTouches[0].pageY - (canvas.parentNode.offsetTop)) * currentScaleH);
    //console.log('touchdown');
    if (onMouseDown !== undefined) {
        onMouseDown(touchX, touchY);
    }

    return false;
}

function touchUp(e) {
    "use strict";
    e.preventDefault();
    if (g_debugTouch) {
        console.log('touch up');
    }
    //console.log('touchup');
    if (onMouseUp !== undefined) {
        onMouseUp(touchX, touchY);
    }
    return false;
}

function touchMove(e) {
    "use strict";
    e.preventDefault();
    if (g_debugTouch) {
        console.log('touch move');
    }
    touchX = Math.floor((e.targetTouches[0].pageX - (canvas.parentNode.offsetLeft)) * currentScaleW);
    touchY = Math.floor((e.targetTouches[0].pageY - (canvas.parentNode.offsetTop)) * currentScaleH);
    //console.log('touchmove');
    if (onMouseMove !== undefined) {
        onMouseMove(touchX, touchY);
    }
    e.preventDefault();
    
    return false;
}

function drawLevel(level, nrLevels) {
    "use strict";
    var barHeight = Math.floor(60 / nrLevels),
        levelColor = [ 'rgb(255,216,0)', 'rgb(0,255,33)', 'rgb(255,0,0)', 'rgb(72,0,255)', 'rgb(255,216,0)', 'rgb(0,255,33)' ],
        i,
        y;
    for (i = 0; i < level; i += 1) {
        if (skinLevelColor !== undefined) {
            ctx.fillStyle = skinLevelColor;
        } else {
            ctx.fillStyle = levelColor[i];
        }
        y = MODE_BUTTON_Y + 64 - (barHeight * i);
        ctx.fillRect(MODE_BUTTON_X +  7,	y - barHeight, 64 - 14, barHeight - 4);
    }
}

function updateScore(force) {
    "use strict";
    var xPos, seconds, secondsText, timeText, text, style;
    if (hideGameBtn) { return; }
    if ((helpMode === true) && (force === false)) { return; }
    if (allPuzzlesSelectionActive) { return; }

    if (!force && !initialized) { return; }

    //ctx.fillStyle = (scoreResult === SCORE_NONE) ? buttonColor : ((scoreResult === SCORE_OK) ? "green" : "red");
    if (scoreResult === SCORE_OK) {
        style = DIGIPUZZLE_GREEN;
    } else if (scoreResult === SCORE_NOK) {
        style = DIGIPUZZLE_RED;
    } else {
        style = buttonColor;
    }

    fwFillRect(ctx, GAME_BUTTON_X, GAME_BUTTON_Y, GAME_BUTTON_W, GAME_BUTTON_H, style);
	if (!enableGameBtn) {
        fwFillRect(ctx, GAME_BUTTON_X, GAME_BUTTON_Y, GAME_BUTTON_W, GAME_BUTTON_H, 'rgba(255,255,255,0.5)');
    }
/*
	if (scoreResult === SCORE_OK) {
		fwFillRect(ctx, GAME_BUTTON_X, GAME_BUTTON_Y, GAME_BUTTON_W, GAME_BUTTON_H, 'rgba(0,255,0,0.5)');
	} else if (scoreResult === SCORE_NOK) {
		fwFillRect(ctx, GAME_BUTTON_X, GAME_BUTTON_Y, GAME_BUTTON_W, GAME_BUTTON_H, 'rgba(255,0,0,0.5)');
	}
*/
    if (gameState !== GS_STOPPED) {
        if (timeLeft !== undefined) {
            // Draw points and time left
            ctx.font = "30px " + font;
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            xPos = GAME_BUTTON_X + Math.floor(GAME_BUTTON_W / 2);
            ctx.fillText(points.toString(), xPos, GAME_BUTTON_Y + 32);

            ctx.font = "16px " + font;
            seconds = timeLeft % 60;
            secondsText = (seconds < 10 ? "0" : "") + seconds;
            timeText = Math.floor(timeLeft / 60) + ":" + secondsText;
            ctx.fillText(timeText, GAME_BUTTON_X + Math.floor(GAME_BUTTON_W / 2), GAME_BUTTON_Y + 58);
        } else if (timeBusy !== undefined) {
            ctx.font = "16px " + font;
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            seconds = timeBusy % 60;
            secondsText = (seconds < 10 ? "0" : "") + seconds;
            timeText = Math.floor(timeBusy / 60) + ":" + secondsText;
            ctx.fillText(timeText, GAME_BUTTON_X + Math.floor(GAME_BUTTON_W / 2), GAME_BUTTON_Y + Math.floor(GAME_BUTTON_H / 2) + 8);
        }
    } else {
        ctx.font = "24px " + font;
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        if (language === LANG_PT) {
            ctx.font = "24px " + font;
            text = "Início";
        } else if (language === LANG_IS) {
            text = "Byrja";
            ctx.font = "16pt " + font;
        } else if (language === LANG_ES) {
            text = "Iniciar";
            ctx.font = "15pt " + font;
        } else {
            text = "Start";
        }
        ctx.fillText(text, GAME_BUTTON_X + Math.floor(GAME_BUTTON_W / 2), GAME_BUTTON_Y + Math.floor(GAME_BUTTON_H / 2) + 8);
    }
    ctx.fillStyle = "#004A7F";
}

function fwUpdateScore(force) {
    "use strict";
    updateScore(force);
}

function onMouseDown(mouseX, mouseY) {
    "use strict";
    var i, button;

    if ((m_showAdBlockerMessage > 0) || (m_showCookieConsentMessage > 0) || m_videoAdsActive) {
        return;
    }
	if (gameState === GS_POPUP) {
		return;
	}

    if (highscoreBox && highscoreBox.active) {
        highscoresOnMouseDown(mouseX, mouseY);
        return;
    }

    if (multiplayerBox && multiplayerBox.active) {
        multiplayerOnMouseDown(mouseX, mouseY);
        return;
    }

	if (fwOnMouseDownDD !== undefined) {
		fwOnMouseDownDD(mouseX, mouseY);
	}

    if (!((optionsBox && optionsBox.active) || (instructionsBox && instructionsBox.active))) {
        if (appOnMouseDown !== undefined) {
            if (appOnMouseDown(mouseX, mouseY)) {
                return;
            }
        }

        if (nextImageLoading === false) {
            for (i = 0; i < g_buttons.length; i += 1) {
                button = g_buttons[i];
                if (button.minHoldTime !== undefined) {
                    if (fwPointInBox(mouseX, mouseY, button.x, button.y, button.w, button.h)) {
                        button.downTime = new Date().getTime();
                    } else {
                        button.downTime = undefined;
                    }
                }
            }
        }
    }
}

function startGame(tl) {
    "use strict";
    gameStarted = true;
	gameState = GS_STARTED;
    points = 0;

    if (timerMode === undefined) {
        if ((gameMode === GM_JIGSAW) || (gameMode === GM_DAILYJIGSAW) || (gameMode === GM_PHOTOSWAP) || (gameMode === GM_PHOTOPUZZLE) || (gameMode === GM_SLIDER) ||
            (gameMode === GM_WORDSEARCH) || (gameMode === GM_SUDOKU) || (gameMode === GM_QUIZ) || (gameMode === GM_TILESQUIZ) || (gameMode === GM_MINESWEEPER) || (gameMode === GM_SOLITAIRE) || g_startTimer) {
            timeBusy = 0;
            timeLeft = undefined;
        } else {
            timeBusy = undefined;
            if (tl !== undefined) {
                timeLeft = tl;
            } else {
                timeLeft = 5 * 60;
            }
        }
    } else {
        // timerMode defined
        if (timerMode === TIMERMODE_TIMER) {
            // measure time needed to complete puzzle
            timeBusy = 0;
            timeLeft = undefined;
        } else {
            // measure how many points are scored in x minutes
            timeBusy = undefined;
            if (tl !== undefined) {
                timeLeft = tl;
            } else {
                timeLeft = 5 * 60;
            }
        }
    }
}

function fwStopGame() {
    "use strict";
	if (gameState === GS_STARTED) {
		gameStarted = false;
		gameState = GS_WAIT;
		points = 0;
	}
}

function fwStartGame(tl) {
    "use strict";
    startGame(tl);
}

function continueGame() {
    "use strict";
    startGame();
    nextPicture();
}

function fwEnableGameBtn(enable) {
    "use strict";
	enableGameBtn = enable;
}

function fwEnableGameTimer() {
    "use strict";
    enableGameBtn = true;
    timerMode = TIMERMODE_TIMER;
}

function fwEnableGamePointsCounter() {
    "use strict";
    enableGameBtn = true;
    timerMode = TIMERMODE_POINTS;
}

function fwEnableNextBtn(enable) {
    "use strict";
	enableNextBtn = enable;
    if (!enableNextBtn) {
        // stop highlight
        if (highlightNextInterval !== undefined) {
            clearInterval(highlightNextInterval);
            highlightNextInterval = undefined;
        }
        doHighlightNext = false;
    }
}
function fwEnableModeBtn(enable) {
    "use strict";
	enableModeBtn = enable;
}

function fullScreenActive() {
    "use strict";
    return (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement);
}

function toggleFullScreen() {
    "use strict";
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
    }
}

function clearSplashScreen() {
    "use strict";
    if (splashScreenActive) {
        splashScreenActive = false;
        addctx.clearRect(0, 0, canvas.width, canvas.height);

        if (appOnClearSplashScreen !== undefined) {
            appOnClearSplashScreen();
        }
        draw();
        return true;
    }
    return false;
}

function onNextButtonPressed() {
    "use strict";
    if ((gameMode !== GM_DAILYJIGSAW) || (!dailyJigsawLock)) {
        if (enableNextBtn) {
            if (appOnNextButton !== undefined) {
                if (highlightNextInterval !== undefined) {
                    clearInterval(highlightNextInterval);
                    highlightNextInterval = undefined;
                }
                doHighlightNext = false;
                appOnNextButton();
            } else {
                if ((highlightNextInterval !== undefined) && (linkNextPuzzle !== undefined)) { // blink active and link configured
                    try {
                        window.open(linkNextPuzzle, "_blank");
                    } catch (errOnNextButtonPressed) {}
                }
                if (gameState === GS_STARTED) {
                    // points = Math.max(points - 3, 0);
                }
                fwTriggerNextPicture(50);
            }
        }
    }
}

function onModeButtonPressed() {
    "use strict";
    if (enableModeBtn && (appOnLevelButtonUp !== undefined)) {
        appOnLevelButtonUp();
    } else if (useBasicLinkAtModeButton) {
        if (basicLink !== "") {
            try {
                window.open(basicLink, "_blank");
            } catch (err) {}
        } // else no window is opened (which is the intention as basicLink === "")
    }
}


function onGameButtonPressed() {
    "use strict";
    if (enableGameBtn) {
        if ((gameMode !== GM_SCRAMBLE) && (gameMode !== GM_FOCUS) && (gameMode !== GM_WEEKPUZZLE) && (gameMode !== GM_WEEKPUZZLE_EX) && (gameMode !== GM_DAILYJIGSAW)) {
            if (gameState === GS_STOPPED) {
                // start game
                startGame();
                fwTriggerNextPicture();
            } else {
                gameState = GS_STOPPED;
            }
            updateScore(false);
        }
    }
}

function onHelpButtonPressed() {
    "use strict";
    if (appOnHelpButton !== undefined) {
        appOnHelpButton();
    } else {
        if (helpMode === false) {
            helpMode = true;
            draw();
        }
    }
}

/*
function onFullScreenButtonPressed() {
    "use strict";
    toggleFullScreen();
}

function onAudioMuteButtonPressed() {
    "use strict";
    audioMuted = (audioMuted === false);

    draw();
}
*/
function onSnapButtonPressed(force, x, y, w, h) {
    "use strict";
    var fn, cs, saveCanvas, saveCtx;

    if (snapEnabled || force) {
        cs = new CanvasSaver('https://www.digipuzzle.net/php/utility/saveme.php');
        draw();

        fn = '';
        switch (gameMode) {
            case GM_PHOTOSEARCH:
                fn = "photosearch";
                break;
            case GM_PHOTOTURN:
                fn = "phototurn";
                break;
            case GM_PHOTOPUZZLE:
                fn = "photopuzzle";
                break;
            case GM_SUDOKU:
                fn = "sudoku";
                break;
            case GM_SLIDER:
                fn = "photoslider";
                break;
            case GM_PHOTOMIXUP:
                fn = "photomixup";
                break;
            case GM_MAHJONG:
                fn = "mahjong";
                break;
            case GM_MEMORY:
                fn = "memory";
                break;
            case GM_COLLMEMORY:
                fn = "collmemory";
                break;
            case GM_COLLMAHJONG:
                fn = "collmahjong";
                break;
            case GM_WORDMEMORY:
                fn = "wordmemory";
                break;
            case GM_HANGMAN:
                fn = "hangman";
                break;
            case GM_WEEKPUZZLE:
            case GM_WEEKPUZZLE_EX:
                fn = "weekpuzzle";
                break;
            case GM_SCRAMBLE:
                fn = "scramble";
                break;
            case GM_FOCUS:
                fn = "focus";
                break;
            case GM_MINESWEEPER:
                fn = "minesweeper";
                break;
            case GM_PHOTOSWAP:
                fn = "photoswap";
                break;
            case GM_PHOTODIFF:
                fn = "spotdiff";
                break;
            case GM_WORDSEARCH:
                fn = "wordsearch";
                break;
            case GM_JIGSAW:
                fn = "jigsaw";
                break;
            case GM_DAILYJIGSAW:
                fn = "dailyjigsaw";
                break;
            case GM_QUIZ:
                fn = "quiz";
                break;
            case GM_TILESQUIZ:
                fn = "tilesquiz";
                break;
            case GM_CROSSWORD:
                fn = "crossword";
                break;
        }
        // Create new canvas for snapshot
        saveCanvas = document.createElement('canvas');
        saveCanvas.id     = "puzzleCanvas";
        saveCanvas.width  = w || canvas.width;
        saveCanvas.height = h || canvas.height;
        saveCtx = saveCanvas.getContext("2d");
        // Draw all other canvasses onto the saveCanvas in the correct order
        saveCtx.clearRect(0, 0, saveCanvas.width, saveCanvas.height);
        saveCtx.drawImage(bgcanvas, x || 0, y || 0, saveCanvas.width, saveCanvas.height, 0, 0, saveCanvas.width, saveCanvas.height);
        saveCtx.drawImage(canvas, x || 0, y || 0, saveCanvas.width, saveCanvas.height, 0, 0, saveCanvas.width, saveCanvas.height);
        saveCtx.drawImage(topcanvas, x || 0, y || 0, saveCanvas.width, saveCanvas.height, 0, 0, saveCanvas.width, saveCanvas.height);
        saveCtx.drawImage(addcanvas, x || 0, y || 0, saveCanvas.width, saveCanvas.height, 0, 0, saveCanvas.width, saveCanvas.height);

        if (g_gameId !== undefined) {
            cs.saveImgLarge(saveCanvas, g_gameId, 0, 0, saveCanvas.width, saveCanvas.height, saveCanvas.width, saveCanvas.height);
        } else {
            cs.saveImgLarge(saveCanvas, fn + "_large", 0, 0, canvas.width, canvas.height, 546, 383);
        }
    }
}

function onLogoPressed() {
    "use strict";
    if (g_disableLogoLink === true) {
        return;
    }
    if (basicLink !== undefined) {
        if (basicLink !== "") {
            try {
                window.open(basicLink, "_blank");
            } catch (err) {}
        } // else no window is opened (which is the intention as basicLink === "")
        return;
    }
    if ((gameMode !== GM_SCRAMBLE) && (gameMode !== GM_FOCUS) && (gameMode !== GM_WEEKPUZZLE) && (gameMode !== GM_WEEKPUZZLE_EX)) {
        if (!allPuzzles) {
            if (top === self) {
                if ((linkBackTo !== undefined) && (linkBackTo !== "")) {
                    // puzzle run in top window (so not in an iframe)
                    puzzleImage.src = "";
                    initialized = false;	// make sure no updates are done

                    if (linkBackTo !== undefined) {
                        // do something special for the template link (with specific language)
                        if ((linkBackTo.indexOf("www.digipuzzle.net/education") >= 0) && (language === LANG_NL)) {
                            location.href = "//www.digipuzzle.net/nl/leerspellen/";
                        } else if ((linkBackTo.indexOf("www.digipuzzle.net/education") >= 0) && ((language === LANG_DE) || (language === LANG_SDE))) {
                            location.href = "//www.digipuzzle.net/de/lernspiele/";
                        } else if ((linkBackTo.indexOf("www.digipuzzle.net/education") >= 0) && (language === LANG_DK)) {
                            location.href = "//www.digipuzzle.net/dk/skolespil/";
                        } else if ((linkBackTo.indexOf("www.digipuzzle.net/education") >= 0) && (language === LANG_PT)) {
                            location.href = "//www.digipuzzle.net/pt/jogoseducativos/";
                        } else if ((linkBackTo.indexOf("www.digipuzzle.net/education") >= 0) && (language === LANG_ES)) {
                            location.href = "//www.digipuzzle.net/es/juegoseducativos/";
                        } else if ((linkBackTo.indexOf("www.digipuzzle.net/education") >= 0) && (language === LANG_IS)) {
                            location.href = "//www.digipuzzle.net/is/namsleikir/";
                        } else if ((linkBackTo.indexOf("www.digipuzzle.net/education") >= 0) && (language === LANG_SE)) {
                            location.href = "//www.digipuzzle.net/se/skolspel/";
                        } else {
                            location.href = linkBackTo;
                        }
                    } else {
                        location.href = "../index.htm";
                    }
                } else if (directGameLink !== undefined) {
                    if (directGameLink !== "") {
                        try {
                            window.open(directGameLink, "_blank");
                        } catch (err6) {}
                    } // else no window is opened (which is the intention as directGameLink === "")
                }
            } else {
                /*
                // puzzle run in iframe
                if (directGameLink !== undefined) {
                    if (directGameLink !== "") {
                        try {
                            window.open(directGameLink, "_blank");
                        } catch (err5) {}
                    } // else no window is opened (which is the intention as directGameLink === "")
                } else if (linkBackToFromIFrame !== undefined) {
                    try {
                        window.open(linkBackToFromIFrame, "_blank");
                    } catch (err3) {}
                } else {
                */
                    try {
                        switch (language) {
                        case LANG_NL:
                            window.open("http://www.digipuzzle.net/nl/index.htm", "_blank");
                            break;
                        case LANG_DE:
                        case LANG_SDE:
                            window.open("http://www.digipuzzle.net/de/index.htm", "_blank");
                            break;
                        case LANG_DK:
                            window.open("http://www.digipuzzle.net/dk/index.htm", "_blank");
                            break;
                        case LANG_ES:
                            window.open("http://www.digipuzzle.net/es/index.htm", "_blank");
                            break;
                        case LANG_PT:
                            window.open("http://www.digipuzzle.net/pt/index.htm", "_blank");
                            break;
                        default:
                            window.open("http://www.digipuzzle.net/index.htm", "_blank");
                            break;
                        }
                    } catch (err4) {}
                /*
                }
                */
            }
        } else {
            if (!allPuzzlesSelectionActive) {
                allPuzzlesSelectionActive = true;
                loadPageGen();
                draw();
            }
        }
    }
}

function onMouseUp(mouseX, mouseY) {
    "use strict";
    var i, button, holdTime, pressed;

    if (m_showVideoAdsMessage) {
        // start video
        fwVideoAdsStart();
        m_showVideoAdsMessage = false;
        draw();
        return;
    }

    if (m_showCookieConsentMessage) {
        if (fwPointInBox(mouseX, mouseY, COOKIE_CONSENT_BTN.x, COOKIE_CONSENT_BTN.y, COOKIE_CONSENT_BTN.w, COOKIE_CONSENT_BTN.h)) {
            // expire Quantcast cookies to trigger box
            document.cookie = "addtl-consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.www.digipuzzle.net; path=/";
            document.cookie = "euconsent-v2=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.www.digipuzzle.net; path=/";
            setTimeout(function(){ location.reload(); }, 200);
        }
        return;
    }

    if ((m_showAdBlockerMessage > 0) || m_videoAdsActive) {
        return;
    }

    if (instructionsBox && instructionsBox.active) {
        instructionsBox.context.clearRect(0, 0, canvas.width, canvas.height);
        instructionsBox.active = false;
        draw();
        return;
    }
    if (optionsBox && optionsBox.active) {
        if (wlBox && wlBox.active) {
            wlOnMouseUp(mouseX, mouseY);
        } else {
            for (i = 0; i < optionsBox.buttons.length; i += 1) {
                if (fwPointInBox(mouseX, mouseY, optionsBox.buttons[i].x, optionsBox.buttons[i].y, optionsBox.buttons[i].w, optionsBox.buttons[i].h) && (optionsBox.buttons[i].disabled !== true)) {
                    // mouse released on top of button; handle button clicked
                    if (optionsBox.buttons[i].fnc !== undefined) {
                        if (optionsBox.buttons[i].item !== undefined) {
                            optionsBox.buttons[i].fnc(optionsBox.buttons[i].row, optionsBox.buttons[i].item);
                        } else {
                            optionsBox.buttons[i].fnc(optionsBox.buttons[i].row);
                        }
                    }
                    return;
                }
            }
        }
        return;
    }
    if (highscoreBox && highscoreBox.active) {
        highscoresOnMouseUp(mouseX, mouseY);
        return;
    }
    if (multiplayerBox && multiplayerBox.active) {
        multiplayerOnMouseUp(mouseX, mouseY);
        return;
    }
    if (nameBox && nameBox.active) {
        nameBoxOnMouseUp(mouseX, mouseY);
        return;
    }
    if (levelsBox && levelsBox.active) {
        levelsBoxOnMouseUp(mouseX, mouseY);
        return;
    }

    if (gameState === GS_POPUP) {
        gameState = GS_WAIT;
        if (g_overlayCtx !== undefined) {
            g_overlayCtx.clearRect(0, 0, canvas.width, canvas.height);
        }
        draw();
        return;
    }

    if (clearSplashScreen()) { return; }

    if (helpMode === true) {
        helpMode = false;
        if (g_overlayCtx !== undefined) {
            g_overlayCtx.clearRect(0, 0, canvas.width, canvas.height);
        }
        draw();
        return;
    }
	
	if (fwOnMouseUpDD !== undefined) {
		fwOnMouseUpDD(mouseX, mouseY);
	}

    if (nextImageLoading === false) {
        if (!fwPointInBox(mouseX, mouseY, LOGO_BUTTON_X, LOGO_BUTTON_Y, LOGO_BUTTON_W, LOGO_BUTTON_H) || (g_doAppOnMouseUpOnLogoButton === true)) {
            if (appOnMouseUp !== undefined) {
                if (appOnMouseUp(mouseX, mouseY)) {
                    return;
                }
            }
        }

        for (i = 0; i < g_buttons.length; i += 1) {
            button = g_buttons[i];
            if (fwPointInBox(mouseX, mouseY, button.x, button.y, button.w, button.h) && !button.disabled) {
                if (button.minHoldTime !== undefined) {
                    pressed = false;
                    if (button.downTime !== undefined) {
                        holdTime = (new Date().getTime()) - button.downTime;
                        //console.log("duration [ms] = " + holdTime);
                        if (holdTime >= button.minHoldTime) {
                            pressed = true;
                        }
                    }
                } else {
                    pressed = true;
                }
                if (pressed) {
                    if (g_buttons[i].param !== undefined) {
                        g_buttons[i].fnc(g_buttons[i].param);
                    } else {
                        g_buttons[i].fnc();
                    }
                }
                return;                
            }
        }



       if ((bottomAddBox !== undefined) && (bottomAddLink !== undefined)) {
            if (pointInBox(mouseX, mouseY, bottomAddBox.x, bottomAddBox.y, bottomAddBox.w, bottomAddBox.h)) {
                try {
                    window.open(bottomAddLink, "_blank");
                } catch (err2) {}
            }
        }
    } // if (nextImageLoading === false)
}

function onMouseMove(mouseX, mouseY) {
    "use strict";
    var text;
    if ((m_showAdBlockerMessage > 0) || (m_showCookieConsentMessage > 0) || m_videoAdsActive) {
        return;
    }
    if ((ctx !== undefined) && (debugMode === true)) {
        ctx.clearRect(DEBUG_POS_X, DEBUG_POS_Y, 96, 10);
        text = mouseX.toFixed(0) + ',' + mouseY.toFixed(0) + ',(' + canvas.offsetLeft + ')';
        ctx.font = "12px impact";
        ctx.textAlign = "left";

        ctx.fillText(text, DEBUG_POS_X + 10, DEBUG_POS_Y + 10);
    }

    if (highscoreBox && highscoreBox.active) {
        highscoresOnMouseMove(mouseX, mouseY);
        return;
    }
    if (multiplayerBox && multiplayerBox.active) {
        multiplayerOnMouseMove(mouseX, mouseY);
        return;
    }

    if (!((optionsBox && optionsBox.active) || (instructionsBox && instructionsBox.active))) {
        if (fwOnMouseMoveDD !== undefined) {
            fwOnMouseMoveDD(mouseX, mouseY);
        }

        if (appOnMouseMove !== undefined) {
            if (appOnMouseMove(mouseX, mouseY)) {
                return;
            }
        }
    }
}

function onKeyDown(event) {
    "use strict";
    event = event || window.event;

    if ((m_showAdBlockerMessage > 0) || (m_showCookieConsentMessage > 0) || m_videoAdsActive) {
        return;
    }
    if (highscoreBox && highscoreBox.active) {
        highscoresOnKeyDown(event);
        return;
    }
    if (multiplayerBox && multiplayerBox.active) {
        multiplayerOnKeyDown(event);
        return;
    }
    if (nameBox && nameBox.active) {
        nameBoxOnKeyDown(event);
        return;
    }
    if (!((optionsBox && optionsBox.active) || (instructionsBox && instructionsBox.active))) {
        if (helpMode === true) {
            helpMode = false;
            if (g_overlayCtx !== undefined) {
                g_overlayCtx.clearRect(0, 0, canvas.width, canvas.height);
            }
            draw();
            return;
        }

        if (clearSplashScreen()) { return; }

        if (appOnKeyDown !== undefined) {
            if (appOnKeyDown(event.keyCode)) {
                event.preventDefault();
            }
        }
    }
}

function onKeyUp(event) {
    "use strict";
    event = event || window.event;

    if ((m_showAdBlockerMessage > 0) || (m_showCookieConsentMessage > 0) || m_videoAdsActive) {
        return;
    }
    if (highscoreBox && highscoreBox.active) {
        highscoresOnKeyUp(event);
        return;
    }
    if (multiplayerBox && multiplayerBox.active) {
        multiplayerOnKeyUp(event);
        return;
    }
    if (nameBox && nameBox.active) {
        nameBoxOnKeyUp(event);
        return;
    }

    if (!((optionsBox && optionsBox.active) || (instructionsBox && instructionsBox.active))) {
        if (appOnKeyUp !== undefined) {
            if (appOnKeyUp(event.keyCode)) {
                event.preventDefault();
            }
        }
    }
}

function onKeyPressed(event) {
    "use strict";
    event = event || window.event;
    if ((m_showAdBlockerMessage > 0) || (m_showCookieConsentMessage > 0) || m_videoAdsActive) {
        return;
    }
    if (highscoreBox && highscoreBox.active) {
        highscoresOnKeyPressed(event);
        draw();
        return;
    }
    if (multiplayerBox && multiplayerBox.active) {
        multiplayerOnKeyPressed(event);
        draw();
        return;
    }
    if (nameBox && nameBox.active) {
        nameBoxOnKeyPressed(event);
        draw();
        return;
    }
    if (!((optionsBox && optionsBox.active) || (instructionsBox && instructionsBox.active))) {
        if (helpMode === true) {
            helpMode = false;
            if (g_overlayCtx !== undefined) {
                g_overlayCtx.clearRect(0, 0, canvas.width, canvas.height);
            }
            draw();
            return;
        }
        if (clearSplashScreen()) { return; }

        event = event || window.event;
        var charCode = (typeof event.which === "number") ? event.which : event.keyCode;

        if (appOnKeyPressed !== undefined) {
            if (appOnKeyPressed(charCode)) {
                event.preventDefault();
            }
        }
    }
}

function fwStroke(context, x, y, dx, dy, style, lineWidth) {
    "use strict";
    context.strokeStyle = style;
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + dx, y + dy);
    context.stroke();
}

function fwStrokeToPoint(context, x, y, x2, y2, style, lineWidth) {
    "use strict";
    context.strokeStyle = style;
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x2, y2);
    context.stroke();
}

function fwStartInstructionsBox() {
    "use strict";
    instructionsBox.active = true;
    instructionsBox.context = addctx;
    instructionsBox.w = 780;
    instructionsBox.h = 500;
    instructionsBox.x = Math.floor((canvas.width - instructionsBox.w) / 2);
    instructionsBox.y = Math.floor((canvas.height - instructionsBox.h) / 2);
}

function drawInstructionsBox() {
    "use strict";
    var lctx = instructionsBox.context;
    lctx.clearRect(0, 0, canvas.width, canvas.height);
    fwFillRect(lctx, 0, 0, canvas.width, canvas.height, "rgba(0, 0, 0, 0.5)");
    fwStrokeFillRectRounded(lctx, instructionsBox.x, instructionsBox.y, instructionsBox.w, instructionsBox.h, 10, 'black', 3, instructionsBox.backgroundColor);
    if (appOnDrawInstructionsBox !== undefined) {
        appOnDrawInstructionsBox();
    }
}

function fwStartOptionsBox(atStartup) {
    "use strict";
    optionsBox.active = true;
    optionsBox.initialised = false;
    optionsBox.atStartup = (atStartup === true);
    optionsBox.rows[0].items[0].selected = !audioMuted;
    optionsBox.rows[0].items[0].disabled = !audioEnabled;
    if (!g_inlead && !g_uolo) {
        optionsBox.rows[0].items[1].selected = fullScreenActive() ? true : false;
        optionsBox.rows[0].items[1].disabled = false;
    }
    if (atStartup && wlBox) {
        wlStartBox();
    }
    if (appOnOptionsSync !== undefined) {
        appOnOptionsSync();
    }
}

function optionsBoxOnLoad() {
    "use strict";
}

function optionsBoxOkPressed() {
    "use strict";
    optionsBox.active = false;
    optionsBox.context.clearRect(0, 0, canvas.width, canvas.height);
    if (optionsBox.rows[0].items[0].selected === audioMuted) {
        audioMuted = !optionsBox.rows[0].items[0].selected;
        if (Howler !== undefined) {
            Howler.volume(audioMuted ? 0 : 1);
        }
    }
    if (!g_inlead && !g_uolo) {
        if (optionsBox.rows[0].items[1].selected !== (fullScreenActive() ? true : false)) {
            toggleFullScreen();
        }
    }
    if (appOnOptionsChanged !== undefined) {
        appOnOptionsChanged();
    }
    draw();
}

function optionsBoxCancelPressed() {
    "use strict";
    if (!optionsBox.atStartup) {
        optionsBox.active = false;
        optionsBox.context.clearRect(0, 0, canvas.width, canvas.height);
        draw();
    }
}

function optionsBoxShareToGoogleClassroomPressed() {
    "use strict";
    var link = "https://classroom.google.com/u/0/share?url=" + encodeURIComponent(location.href);
    //console.log("sharing: " + link);
    if (typeof gtag !=='undefined') {
        gtag('event', 'optionsbox_share_google_classroom');
    }
    try {
        window.open(link, "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes");
    } catch (error) {}
}

function optionsBoxShareToFacebookPressed() {
    "use strict";
    var link = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(location.href);
    //console.log("sharing: " + link);
    if (typeof gtag !=='undefined') {
        gtag('event', 'optionsbox_share_facebook');
    }
    try {
        window.open(link, "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes");
    } catch (error) {}
}

function optionsBoxShareToTwitterPressed() {
    "use strict";
    var link, linkToImage, texts;

    texts = document.title.split('|');
    linkToImage = getShareImageUrl();

    link = "https://twitter.com/share?url=" + location.href;
    link = "https://twitter.com/share?text=" + encodeURIComponent(document.title) + "&url=" + encodeURIComponent(location.href);// + "&image-src=" + encodeURIComponent(linkToImage);
    //console.log("sharing: " + link);
    if (typeof gtag !=='undefined') {
        gtag('event', 'optionsbox_share_twitter');
    }
    try {
        window.open(link, "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes");
    } catch (error) {}
}

function getShareImageUrl() {
    "use strict";
    var i, texts, tmp = "", linkToImage;
    if (linkBackToViaUrl) {
        texts = location.pathname.split('/');
        for (i = 0; i < texts.length - 1; i += 1) {
            tmp += texts[i] + '/';
        }
        linkToImage = "https://www.digipuzzle.net/" + tmp + linkBackToViaUrl.replace("index.htm", "images/" + g_gameId + ".jpg");
    } else {
        linkToImage = "https://www.digipuzzle.net/share_default.jpg";
    }
    return linkToImage;
}

function optionsBoxShareToPinterestPressed() {
    "use strict";
    var link, linkToImage;

    linkToImage = getShareImageUrl();

    link = "https://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(location.href) + "&media=" + encodeURIComponent(linkToImage) + "&description=" + encodeURIComponent(document.title);
    //console.log("sharing: " + link);
    if (typeof gtag !=='undefined') {
        gtag('event', 'optionsbox_share_pinterest');
    }
    try {
        window.open(link, "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes");
    } catch (error) {}
}

function optionsBoxQRCodePressed() {
    "use strict";
    var link, linkToImage, texts;

    linkToImage = getShareImageUrl();

    texts = document.title.split('|');

    link = "https://www.digipuzzle.net/php/qr/qr.php/?link=" + encodeURIComponent(location.href) + "&image=" + encodeURIComponent(linkToImage) + "&title=" + encodeURIComponent(texts[0].trim());
    //console.log("sharing: " + link);
    if (typeof gtag !=='undefined') {
        gtag('event', 'optionsbox_share_qr');
    }
    try {
        window.open(link, "_blank", "location=yes,height=400,width=800,scrollbars=yes,status=yes");
    } catch (error) {}
}

function optionsBoxMoreGamesPressed() {
    "use strict";
    var link = 'http://www.digipuzzle.net/education/contact.htm';
    if (language === LANG_NL) { link = 'http://www.digipuzzle.net/nl/leerspellen/contact.htm'; }
    try {
        window.open(link, "_blank");
    } catch (error) {}
}

function optionsBoxItemPressed(r, index) {
    "use strict";
    var j, row = optionsBox.rows[r], n = 0;
    switch (row.type) {
        case 'header':
            row.items[index].selected = (row.items[index].selected === false);
            /*
            if (index === 0) {
                audioMuted = (audioMuted === false);
            } else if (index === 1) {
                toggleFullScreen();
            }*/
            break;
        case 'bar':
            if (!row.disabled) {
                for (j = 0; j < row.items.length; j += 1) {
                    row.items[j].selected = (j === index);
                }
                if (row.disableCheckboxBelow !== undefined) {
                    optionsBox.rows[r + 1].disabled = row.items[row.disableCheckboxBelow].selected;
                    optionsBox.rows[r + 1].button.disabled = optionsBox.rows[r + 1].disabled;
                }
                if (row.disableRowBelow !== undefined) {
                    optionsBox.rows[r + 1].disabled = row.items[row.disableRowBelow].selected;
                }
                if (row.enableRowBelow !== undefined) {
                    optionsBox.rows[r + 1].disabled = !row.items[row.enableRowBelow].selected;
                }
            }
            break;
        case 'listbox':
            if (!row.disabled) {
                if (index === -1) {
                    // move up
                    row.scrollOffset = Math.max(0, row.scrollOffset - (row.scrollSize - 1));
                } else if (index === -2) {
                    // move down
                    row.scrollOffset = Math.min(row.items.length - row.scrollSize, row.scrollOffset + (row.scrollSize - 1));
                } else {
                    n = 0;
                    for (j = 0; j < row.items.length; j += 1) {
                        n += row.items[j].selected ? 1 : 0;
                    }

                    if (row.items[index + row.scrollOffset].selected) {
                        if (n > 1) {
                            row.items[index + row.scrollOffset].selected = false;
                        } 
                    } else {
                        row.items[index + row.scrollOffset].selected = true;
                    }
                    // row.items[index + row.scrollOffset].selected = !row.items[index + row.scrollOffset].selected;
                }
                console.log('row.scrollOffset: ' + row.scrollOffset);
            }
            break;
        case 'circles':
            if (!row.disabled) {
                if (!row.multiple) {
                    // only select one item
                    for (j = 0; j < row.items.length; j += 1) {
                        row.items[j].selected = false;
                    }
                    row.items[index].selected = true;
                } else {
                    // possible to select multiple numbers
                    if (row.items[index].selected) {
                        for (j = 0; j < row.items.length; j += 1) {
                            if (row.items[j].selected) { n += 1; }
                        }
                        if (n > (row.min ? row.min : 1)) {
                            // only deselect if at least one other is active
                            row.items[index].selected = false;
                        }
                    } else {
                        row.items[index].selected = true;
                    }
                }
            }
            break;
        case 'checkbox':
            // toggle checkbox
            row.items[index].selected = (row.items[index].selected === false);
            break;
        case 'wl':
            wlStartBox();
            break;
        default:
            break;
    }
    draw();
}

function OB_CONV(v) {
    "use strict";
    return Math.floor(v * optionsBox.factor);
}

function optionsBoxOnInit() {
    "use strict";
    var i, j, row, offsetx, ROW_HEIGHT = 94, offsetY;
    optionsBox.context = addctx;

    optionsBox.factor = (canvas.height === 768) ? (768 / 606) : 1;

    optionsBox.w = OB_CONV(780);
    offsetx = OB_CONV(50);

    optionsBox.h = OB_CONV(120 + 80);
    ROW_HEIGHT = OB_CONV(94);

    optionsBox.okBtn.w = OB_CONV(256);
    optionsBox.okBtn.h = OB_CONV(56);
    optionsBox.cancelBtn.w = OB_CONV(256);
    optionsBox.cancelBtn.h = OB_CONV(56);



    for (i = 0; i < optionsBox.rows.length; i += 1) {
        row = optionsBox.rows[i];
        switch (row.type) {
        case 'bar':
            optionsBox.h += ROW_HEIGHT;
            break;
        case 'circles':
            optionsBox.h += ROW_HEIGHT;
            break;
        case 'checkbox':
            optionsBox.h += OB_CONV(50);
            if (i > 0) {
                if (optionsBox.rows[i - 1].type === 'circles') {
                    optionsBox.h += OB_CONV(20);
                } else {
                    optionsBox.h += OB_CONV(10);
                }
            }
            /*
            if ((i > 0) && (optionsBox.rows[i - 1].type === 'circles')) {
                optionsBox.h += 10;
            } else {

            }
            */
            break;
        case 'text':
            optionsBox.h += ROW_HEIGHT;
            break;
        case 'wl':
            optionsBox.h += ROW_HEIGHT;
            break;
        case 'listbox':
            optionsBox.h += 230;
            break;
        }
    }
    optionsBox.x = Math.floor((canvas.width - optionsBox.w) / 2);
    optionsBox.y = Math.floor((canvas.height - optionsBox.h) / 2);

    optionsBox.buttons = [];

    optionsBox.buttons.push({x: OB_CONV(444), y: optionsBox.y + optionsBox.h - OB_CONV(73), w: optionsBox.okBtn.w, h: optionsBox.okBtn.h, fnc: optionsBoxOkPressed });
    optionsBox.buttons.push({x: OB_CONV(164), y: optionsBox.y + optionsBox.h - OB_CONV(73), w: optionsBox.cancelBtn.w, h: optionsBox.cancelBtn.h, fnc: optionsBoxCancelPressed});


    if (g_disableSocialButtons !== true) {
        if (((canvas.height === 606) && (optionsImage.width === 594)) || (canvas.height === 768)) { // default values
            // add share to google classroom button
            optionsBox.shareButtonsActive = true;
            optionsBox.buttons.push({x: OB_CONV(520 + 0), y: optionsBox.y + OB_CONV(37), w: OB_CONV(50), h: OB_CONV(50), fnc: optionsBoxShareToFacebookPressed});
            optionsBox.buttons.push({x: OB_CONV(520 + 58), y: optionsBox.y + OB_CONV(37), w: OB_CONV(50), h: OB_CONV(50), fnc: optionsBoxShareToTwitterPressed});
            optionsBox.buttons.push({x: OB_CONV(520 + 116), y: optionsBox.y + OB_CONV(37), w: OB_CONV(50), h: OB_CONV(50), fnc: optionsBoxShareToPinterestPressed});
            optionsBox.buttons.push({x: OB_CONV(520 + 174), y: optionsBox.y + OB_CONV(37), w: OB_CONV(50), h: OB_CONV(50), fnc: optionsBoxShareToGoogleClassroomPressed});
            optionsBox.buttons.push({x: OB_CONV(520 + 232), y: optionsBox.y + OB_CONV(37), w: OB_CONV(50), h: OB_CONV(50), fnc: optionsBoxQRCodePressed});
        }
        if (((canvas.height === 606) && (optionsImage.width > 274)) || (canvas.height === 768)) { // default values
            // add share to google classroom button
            optionsBox.shareButtonsActive = true;
            optionsBox.buttons.push({x: OB_CONV(564 + 0), y: optionsBox.y + OB_CONV(37), w: OB_CONV(50), h: OB_CONV(50), fnc: optionsBoxShareToFacebookPressed});
            optionsBox.buttons.push({x: OB_CONV(564 + 58), y: optionsBox.y + OB_CONV(37), w: OB_CONV(50), h: OB_CONV(50), fnc: optionsBoxShareToTwitterPressed});
            optionsBox.buttons.push({x: OB_CONV(564 + 116), y: optionsBox.y + OB_CONV(37), w: OB_CONV(50), h: OB_CONV(50), fnc: optionsBoxShareToPinterestPressed});
            optionsBox.buttons.push({x: OB_CONV(564 + 174), y: optionsBox.y + OB_CONV(37), w: OB_CONV(50), h: OB_CONV(50), fnc: optionsBoxShareToGoogleClassroomPressed});
        } else {
            optionsBox.buttons.push({x: optionsBox.x + optionsBox.w - OB_CONV(146) - offsetx, y: optionsBox.y + OB_CONV(40), w: optionsBox.okBtn.w, h: optionsBox.okBtn.h, fnc: optionsBoxMoreGamesPressed });
        }
    } else {
        console.log('social buttons disabled');
    }

    if (g_inlead || g_uolo) {
        optionsBox.buttons.push({x: optionsBox.x + optionsBox.w - OB_CONV(146) - offsetx, y: optionsBox.y + OB_CONV(40), w: optionsBox.okBtn.w, h: optionsBox.okBtn.h });
    }

    offsetY = 0;
    for (i = 0; i < optionsBox.rows.length; i += 1) {
        row = optionsBox.rows[i];
        row.textx = optionsBox.x + offsetx;
        row.texty = optionsBox.y + OB_CONV(28) + offsetY;
        switch (row.type) {
        case 'header':
            for (j = 0; j < row.items.length; j += 1) {
                row.items[j].w = OB_CONV(40);
                row.items[j].h = OB_CONV(40);
                row.items[j].x = optionsBox.x + offsetx + (j * OB_CONV(200));
                row.items[j].y = optionsBox.y + OB_CONV(40) + offsetY + 4;
                if (row.items[j].disabled !== true) {
                    optionsBox.buttons.push({x: row.items[j].x, y: row.items[j].y, w: row.items[j].w, h: row.items[j].h, fnc: optionsBoxItemPressed, row: i, item: j});
                }
            }
            offsetY += ROW_HEIGHT;
            break;
        case 'bar':
            for (j = 0; j < row.items.length; j += 1) {
                if (row.items.length > 20) {
                    row.items[j].w = OB_CONV(27);
                } else {
                    row.items[j].w = (row.items.length <= 5) ? ((row.items.length <= 3) ? OB_CONV(160) : OB_CONV(130)) : OB_CONV(110);
                }
                row.items[j].h = OB_CONV(50);
                row.items[j].x = optionsBox.x + offsetx + (j * row.items[j].w);
                row.items[j].y = optionsBox.y + OB_CONV(40) + offsetY;
                optionsBox.buttons.push({x: row.items[j].x, y: row.items[j].y, w: row.items[j].w, h: row.items[j].h, fnc: optionsBoxItemPressed, row: i, item: j});
            }
            offsetY += ROW_HEIGHT;
            break;
        case 'listbox':
            for (j = 0; j < Math.min(6, row.items.length); j += 1) {
                row.items[j].w = OB_CONV(600);
                row.items[j].h = OB_CONV(30);
                row.items[j].x = optionsBox.x + offsetx;
                row.items[j].y = optionsBox.y + OB_CONV(40) + offsetY + (j * row.items[j].h);
                optionsBox.buttons.push({x: row.items[j].x, y: row.items[j].y, w: row.items[j].w, h: row.items[j].h, fnc: optionsBoxItemPressed, row: i, item: j});
            }
            row.scrollOffset = 0;
            row.scrollSize = 6;
            row.scrollbar = true;
            if (row.items.length > 6) {
                optionsBox.buttons.push({x: optionsBox.x + offsetx + OB_CONV(600), y: optionsBox.y + OB_CONV(40) + offsetY, h: OB_CONV(90), w: 40, fnc: optionsBoxItemPressed, row: i, item: -1});
                optionsBox.buttons.push({x: optionsBox.x + offsetx + OB_CONV(600), y: optionsBox.y + OB_CONV(40) + offsetY + OB_CONV(90), h: OB_CONV(90), w: 40, fnc: optionsBoxItemPressed, row: i, item: -2});
            }
            offsetY += 230;
            break;
        case 'circles':
            for (j = 0; j < row.items.length; j += 1) {
                row.items[j].x = optionsBox.x + offsetx + (j * OB_CONV(58 + 5));
                row.items[j].y = optionsBox.y + OB_CONV(40) + offsetY;
                row.items[j].w = OB_CONV(58);
                row.items[j].h = OB_CONV(58);
                optionsBox.buttons.push({x: row.items[j].x, y: row.items[j].y, w: row.items[j].w, h: row.items[j].h, fnc: optionsBoxItemPressed, row: i, item: j});
            }
            offsetY += ROW_HEIGHT;
            break;
        case 'wl':
            row.items = [{x: optionsBox.x + offsetx, y: optionsBox.y + OB_CONV(40) + offsetY, w: OB_CONV(256), h: OB_CONV(56)}];
            optionsBox.buttons.push({x: row.items[0].x, y: row.items[0].y, w: row.items[0].w, h: row.items[0].h, fnc: optionsBoxItemPressed, row: i, item: 0});
            offsetY += ROW_HEIGHT;
            break;
        case 'text':
            for (j = 0; j < row.items.length; j += 1) {
                row.items[j].x = optionsBox.x + Math.floor(optionsBox.w / 2);
                row.items[j].y = optionsBox.y + OB_CONV(40) + offsetY + (j * OB_CONV(26));

                if (row.items.length === 4) {
                    row.items[j].y -= OB_CONV(10);
                }
            }
            offsetY += ROW_HEIGHT;
            break;
        case 'checkbox':
            row.items[0].x = optionsBox.x + offsetx;
            row.items[0].y = optionsBox.y + OB_CONV(40) + offsetY - OB_CONV(42);
            row.items[0].w = OB_CONV(40);
            row.items[0].h = OB_CONV(40);

            offsetY += OB_CONV(50);

            if (i > 0) {
                if (optionsBox.rows[i - 1].type === 'circles') {
                    offsetY += OB_CONV(20);
                    row.items[0].y += OB_CONV(20);
                } else {
                    offsetY += OB_CONV(10);
                    row.items[0].y += OB_CONV(10);
                }
            }
            optionsBox.buttons.push({
                x: row.items[0].x,
                y: row.items[0].y,
                w: row.items[0].w,
                h: row.items[0].h,
                fnc: optionsBoxItemPressed,
                row: i,
                item: 0
            });
            row.button = optionsBox.buttons[optionsBox.buttons.length - 1]; // save button for disabled state
            break;
        }
    }
}

function fwDrawCheckBox(lctx, x, y, w, h, selected, disabled, hover) {
    /*jshint unused:vars*/ 
    "use strict";
    var g;

    lctx.save();
    lctx.translate(x, y);
    if (disabled !== true) {
        g = lctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, "white");
        g.addColorStop(1, "rgb(128, 128, 128)");
        lctx.fillStyle = g;
        fwStrokeFillRect(lctx, 0, 0, w, h, 'black', 2, g);
        if (selected) {
            console.log('measure: ', OB_CONV(50).toString());
            lctx.drawImage(optionsImage, OB_CONV(64), 0, OB_CONV(50), OB_CONV(50), 0, 0, OB_CONV(40), OB_CONV(40));
        }
    } else {
        fwStrokeFillRect(lctx, 0, 0, w, h, 'rgb(185,185,185)', 2, 'white');
    }
    lctx.restore();
}

function drawOptionsBox() {
    "use strict";
    var lctx, i, j, button, row, g, style, texts, item, fs, w, tooWide;

    if (!optionsBox.initialised) {
        optionsBoxOnInit();
        // check disabled checkboxes
        for (i = 0; i < optionsBox.rows.length; i += 1) {
            if (optionsBox.rows[i].disableCheckboxBelow !== undefined) {
                optionsBox.rows[i + 1].disabled = optionsBox.rows[i].items[optionsBox.rows[i].disableCheckboxBelow].selected;
                optionsBox.rows[i + 1].button.disabled = optionsBox.rows[i + 1].disabled;
            }
            if (optionsBox.rows[i].disableRowBelow !== undefined) {
                optionsBox.rows[i + 1].disabled = optionsBox.rows[i].items[optionsBox.rows[i].disableRowBelow].selected;
            }
            if (optionsBox.rows[i].enableRowBelow !== undefined) {
                optionsBox.rows[i + 1].disabled = !optionsBox.rows[i].items[optionsBox.rows[i].enableRowBelow].selected;
            }
        }
        optionsBox.initialised = true;
    }
    lctx = optionsBox.context;

    lctx.clearRect(0, 0, canvas.width, canvas.height);
    fwFillRect(lctx, 0, 0, canvas.width, canvas.height, "rgba(0, 0, 0, 0.5)");


    fwFillRect(lctx, optionsBox.x - 5, optionsBox.y - 5, optionsBox.w + 10, optionsBox.h + 10, 'rgba(255,255,255,0.7)');    
    fwStrokeFillRect(lctx, optionsBox.x, optionsBox.y, optionsBox.w, optionsBox.h, 'black', 2, 'white');

    //fwStrokeFillRectRounded(lctx, optionsBox.x, optionsBox.y, optionsBox.w, optionsBox.h, 10, 'black', 3, 'white');

    button = optionsBox.buttons[0];
    lctx.save();
    lctx.translate(button.x, button.y);
    g = lctx.createLinearGradient(0, 0, 0, button.h);
    g.addColorStop(0, "rgb(128, 128, 128)");
    g.addColorStop(1, "black");
    lctx.fillStyle = g;
    //lctx.fillRect(0, 0, button.w, button.h);
    fwStrokeFillRect(lctx, 0, 0, button.w, button.h, 'black', 2, g);
    fs = OB_CONV(13);
    fwFillText(lctx, getFwString(sidFw.OK), Math.floor(button.w / 2), Math.floor(button.h / 2) + Math.floor(fs / 2), "bold " + fs.toString() + "pt " + font, 'white', 'center');
    lctx.restore();

    button = optionsBox.buttons[1];
    lctx.save();
    lctx.translate(button.x, button.y);
    g = lctx.createLinearGradient(0, 0, 0, button.h);
    g.addColorStop(0, "white");
    g.addColorStop(1, "rgb(128, 128, 128)");
    lctx.fillStyle = g;
    fwStrokeFillRect(lctx, 0, 0, button.w, button.h, 'black', 2, g);
    fs = OB_CONV(13);
    fwFillText(lctx, getFwString(sidFw.CANCEL), Math.floor(button.w / 2), Math.floor(button.h / 2) + Math.floor(fs / 2), "bold " + fs.toString() + "pt " + font, 'black', 'center');
    if (optionsBox.atStartup) {
        fwFillRect(lctx, 0, 0, button.w, button.h, 'rgba(255, 255, 255, 0.8)');
    }
    lctx.restore();

    if (g_disableSocialButtons !== true) {
        if (optionsBox.shareButtonsActive) {
            button = optionsBox.buttons[2];
            lctx.drawImage(optionsImage, (canvas.height === 768) ? 360 : OB_CONV(274 + 7), OB_CONV(7), OB_CONV(50), OB_CONV(50), button.x, button.y, button.w, button.h);
            button = optionsBox.buttons[3];
            lctx.drawImage(optionsImage, (canvas.height === 768) ? 442 : OB_CONV(274 + 7 + 64), OB_CONV(7), OB_CONV(50), OB_CONV(50), button.x, button.y, button.w, button.h);
            button = optionsBox.buttons[4];
            lctx.drawImage(optionsImage, (canvas.height === 768) ? 524 : OB_CONV(274 + 7 + 128), OB_CONV(7), OB_CONV(50), OB_CONV(50), button.x, button.y, button.w, button.h);
            button = optionsBox.buttons[5];
            lctx.drawImage(optionsImage, (canvas.height === 768) ? 606 : OB_CONV(274 + 7 + 192), OB_CONV(7), OB_CONV(50), OB_CONV(50), button.x, button.y, button.w, button.h);
            if (optionsBox.buttons.length >= 7) {
                button = optionsBox.buttons[6];
                lctx.drawImage(optionsImage, (canvas.height === 768) ? 688 : OB_CONV(274 + 7 + 256), OB_CONV(7), OB_CONV(50), OB_CONV(50), button.x, button.y, button.w, button.h);
            }
        } else {
            button = optionsBox.buttons[2];
            lctx.save();
            lctx.translate(button.x, button.y);
            g = lctx.createLinearGradient(0, 0, 0, button.h);
            g.addColorStop(0, "rgb(128, 128, 128)");
            g.addColorStop(1, "black");
            lctx.fillStyle = g;
            //lctx.fillRect(0, 0, button.w, button.h);
            //fwStrokeFillRect(lctx, 0, 0, button.w, button.h, 'black', 2, g);
            fwFillText(lctx, getFwString(sidFw.OPTIONS_GAME_FROM) + ":", 0, /*Math.floor(button.h / 2) + */10, "bold 13pt " + font, 'rgb(85,85,85)', 'left');
            lctx.drawImage(optionsImage, OB_CONV(128), 0, OB_CONV(146), OB_CONV(32), 0, OB_CONV(18), OB_CONV(146), OB_CONV(32));
            lctx.restore();

        }
    }

    if (g_inlead || g_uolo) {
        button = optionsBox.buttons[2];
        lctx.save();
        lctx.translate(button.x, button.y);
        fwFillText(lctx, getFwString(sidFw.OPTIONS_GAME_FROM) + ":", 0, /*Math.floor(button.h / 2) + */10, "bold 13pt " + font, 'rgb(85,85,85)', 'left');
        lctx.drawImage(optionsImage, OB_CONV(128), 0, OB_CONV(146), OB_CONV(32), 0, OB_CONV(18), OB_CONV(146), OB_CONV(32));
        lctx.restore();
    }

    for (i = 0; i < optionsBox.rows.length; i += 1) {
        row = optionsBox.rows[i];
        if (row.text !== "") {
            lctx.save();
            if (row.disabled === true) {
                lctx.globalAlpha = 0.3;
            }
            fs = OB_CONV(16);
            fwFillText(lctx, row.text, row.textx, row.texty, fs + 'pt ' + font, 'rgb(85,85,85)', 'left');
            lctx.restore();
        }
        switch (row.type) {
        case 'header':
            for (j = 0; j < row.items.length; j += 1) {
                lctx.save();
                lctx.translate(row.items[j].x, row.items[j].y);
                if (row.items[j].disabled !== true) {
                    g = lctx.createLinearGradient(0, 0, 0, row.items[j].h);
                    g.addColorStop(0, "white");
                    g.addColorStop(1, "rgb(128, 128, 128)");
                    lctx.fillStyle = g;
                    fwStrokeFillRect(lctx, 0, 0, row.items[j].w, row.items[j].h, 'black', 2, g);
                    if (row.items[j].selected) {
                        lctx.drawImage(optionsImage, OB_CONV(64), 0, OB_CONV(50), OB_CONV(50), 0, 0, OB_CONV(40), OB_CONV(40));
                    }
                    style = 'rgb(85,85,85)';
                } else {
                    fwStrokeFillRect(lctx, 0, 0, row.items[j].w, row.items[j].h, 'rgb(185,185,185)', 2, 'white');
                    style = 'rgb(185,185,185)';
                }
                fs = OB_CONV(13);
                fwFillText(lctx, row.items[j].text, row.items[j].w + 10, Math.floor(row.items[j].h / 2) + Math.floor(fs / 2), "bold " + fs.toString() + "pt " + font, style, 'left');
                lctx.restore();
            }
            break;
        case 'bar':
            fs = OB_CONV(14);
            do {
                fs -= 1;
                lctx.font = "bold " + fs.toString() + "pt " + font;
                tooWide = false;
                for (j = 0; j < row.items.length; j += 1) {
                    w = lctx.measureText(row.items[j].text).width;
                    if (w > (row.items[j].w - 6)) {
                        tooWide = true;
                    }
                }
            } while (tooWide);

            lctx.save();
            if (row.disabled === true) {
                lctx.globalAlpha = 0.3;
            }

            for (j = 0; j < row.items.length; j += 1) {
                lctx.save();
                lctx.translate(row.items[j].x, row.items[j].y);
                g = lctx.createLinearGradient(0, 0, 0, row.items[j].h);
                if (row.items[j].selected) {
                    g.addColorStop(0, "rgb(128, 128, 128)");
                    g.addColorStop(1, "black");
                    style = 'white';
                } else {
                    g.addColorStop(0, "white");
                    g.addColorStop(1, "rgb(128, 128, 128)");
                    style = 'black';
                }
                lctx.fillStyle = g;
                fwStrokeFillRect(lctx, 0, 0, row.items[j].w, row.items[j].h, 'black', 2, g);
                fwFillText(lctx, row.items[j].text, Math.floor(row.items[j].w / 2), Math.floor(row.items[j].h / 2) + Math.floor(fs / 2), "bold " + fs.toString() + "pt " + font, style, 'center');
                lctx.restore();
            }
            lctx.restore();
            break;
        case 'listbox':
            fs = 14;

            lctx.save();
            if (row.disabled === true) {
                lctx.globalAlpha = 0.3;
            }

            if (row.scrollbar) {
                console.log('draw scrollbar ' + row.items[0].x + "," + row.items[0].y);
                lctx.save();
                lctx.translate(row.items[0].x + row.items[0].w, row.items[0].y);
                //fwStrokeRect(lctx, 0, 0, 40, 90, '#404040', 2);
                lctx.beginPath();
                lctx.moveTo(20, 5);
                lctx.lineTo(35, 22);
                lctx.lineTo(5, 22);
                lctx.closePath();
                lctx.fillStyle = (row.scrollOffset > 0) ? 'black' : '#e0e0e0';
                lctx.fill();
                lctx.restore();
                lctx.save();
                lctx.translate(row.items[0].x + row.items[0].w, row.items[0].y + 90);
                //fwStrokeRect(lctx, 0, 0, 40, 90, '#404040', 2);
                lctx.beginPath();
                lctx.moveTo(20, 85);
                lctx.lineTo(35, 85 - 17);
                lctx.lineTo(5, 85 - 17);
                lctx.closePath();
                lctx.fillStyle = (row.scrollOffset < (row.items.length - row.scrollSize)) ? 'black' : '#e0e0e0';
                lctx.fill();
                lctx.restore();
            }

            for (j = 0; j < Math.min(row.scrollSize, row.items.length); j += 1) {
                lctx.save();
                lctx.translate(row.items[j].x, row.items[j].y);

                //console.log('j + row.scrollOffset: ' + (j + row.scrollOffset));
                if ((j + row.scrollOffset) < row.items.length) {
                    fwStrokeFillRect(lctx, 0, 0, row.items[j].w, row.items[j].h, 'black', 2, row.items[j + row.scrollOffset].selected ? '#e0e0e0' : 'white');
                    fwFillText(lctx, row.items[j + row.scrollOffset].text, 10, Math.floor(row.items[j].h / 2) + Math.floor(fs / 2), "bold " + fs.toString() + "pt " + font, 'black', 'left');
                }
                lctx.restore();
            }
            fwStrokeToPoint(lctx, row.items[0].x + 600, row.items[0].y, row.items[0].x + 600, row.items[0].y + 180, 2, 'black');
            fwStrokeRect(lctx, row.items[0].x, row.items[0].y, 640, 180, 'black', 4);
            lctx.restore();
            break;
        case 'circles':
            lctx.save();
            if (row.disabled === true) {
                lctx.globalAlpha = 0.5;
            }
            for (j = 0; j < row.items.length; j += 1) {
                lctx.save();
                lctx.translate(row.items[j].x, row.items[j].y);
                g = lctx.createLinearGradient(0, 0, 0, 60);
                if (row.items[j].selected) {
                    g.addColorStop(0, "rgb(128, 128, 128)");
                    g.addColorStop(1, "black");
                    style = 'white';
                } else {
                    g.addColorStop(0, "white");
                    g.addColorStop(1, "rgb(128, 128, 128)");
                    style = 'black';
                }
                lctx.fillStyle = g;
                fwStrokeFillArc(lctx, row.items[j].w / 2, row.items[j].h / 2, Math.floor((row.items[j].w - 2) / 2), 'black', 2, g);

                if (row.items[j].text.indexOf('|') >= 0) {
                    fs = row.fs ? row.fs : 12;
                    texts = row.items[j].text.split('|');
                    fwFillText(lctx, texts[0], row.items[j].w / 2, (row.items[j].h / 2) - 12 + Math.round(fs / 2), "bold " + fs.toString() + "pt " + font, style, 'center');
                    fwFillText(lctx, texts[1], row.items[j].w / 2, (row.items[j].h / 2) + 12 + Math.round(fs / 2), "bold " + fs.toString() + "pt " + font, style, 'center');
                    fwStroke(lctx, row.items[j].w / 2 - 7, (row.items[j].h / 2), 14, 0, style, 2);
                } else {
                    fs = row.fs ? row.fs : OB_CONV(13);
                    fwFillText(lctx, row.items[j].text, Math.floor(row.items[j].w / 2), Math.floor(row.items[j].h / 2) + Math.round(fs / 2), "bold " + fs.toString() + "pt " + font, style, 'center');
                }
                lctx.restore();
            }
            lctx.restore();
            break;
        case 'wl':
            row.info = wlGetInfo();
            fwFillText(lctx, wlGetString(sidWl.TITLE), row.textx, row.texty, '16pt ' + font, 'rgb(85,85,85)', 'left');
            button = row.items[0];
            lctx.save();
            lctx.translate(button.x, button.y);
            g = lctx.createLinearGradient(0, 0, 0, button.h);
            g.addColorStop(0, "rgb(128, 128, 128)");
            g.addColorStop(1, "black");
            lctx.fillStyle = g;
            fwStrokeFillRect(lctx, 0, 0, button.w, button.h, 'black', 2, g);
            fwFillText(lctx, wlGetString(sidWl.PICK), Math.floor(button.w / 2), Math.floor(button.h / 2) + 7, "bold 13pt " + font, 'white', 'center');
            lctx.restore();
            fwFillText(lctx, row.info.text, button.x + button.w + 10, button.y + 18 + 6, '16pt ' + font, 'black', 'left');
            {
                var text, word, l, width, more, wMore, txtMore;
                lctx.font = '10pt ' + 'arial';
                text = "";
                width = 0;
                txtMore = "";
                for (l = 0; l < wlBox.words.length; l += 1) {
                    word = ((l > 0) ? ',' : '') + wlBox.words[l];
                    w = lctx.measureText(word).width;

                    more = wlBox.words.length - l;

                    if (more > 0) {
                        txtMore = ' + ' + more.toString() + ' meer';
                    } else {
                        txtMore = "";
                    }
                    wMore = lctx.measureText(txtMore).width;

                    if (more === 1) {
                        if ((width + w) < 430) {
                            text += word;
                            width += w;
                            txtMore = "";
                        } else {
                            break;
                        }            
                    } else {
                        if ((width + w) < (430 - wMore)) {
                            text += word;
                            width += w;
                        } else {
                            break;
                        }
                    }
                }
                fwFillText(lctx, text + txtMore, button.x + button.w + 10, button.y + 40 + 6, lctx.font, 'black', 'left');
            }
            break;
        case 'text':
            style = 'rgb(85,85,85)';
            for (j = 0; j < row.items.length; j += 1) {
                if (row.align === 'left') {
                    fwFillText(lctx, row.items[j].text, row.textx, row.items[j].y, "bold 16pt " + font, style, 'left');
                } else {
                    fwFillText(lctx, row.items[j].text, row.items[j].x, row.items[j].y, "bold 16pt " + font, style, 'center');
                }
            }
            break;
        case 'checkbox':
            item = row.items[0];
            lctx.save();
            if (row.disabled === true) {
                lctx.globalAlpha = 0.5;
            }
            fwDrawCheckBox(lctx, item.x, item.y, item.w, item.h, item.selected, item.disabled, item.hover);
            fwFillText(lctx, item.text, item.x + item.w + 20, item.y + (item.h / 2) + 8, '16pt ' + font, 'rgb(85,85,85)', 'left');
            lctx.restore();
            break;
        }
    }
}


function drawIt() {
    "use strict";
    var style, fs, texts, lines, i, w, cx, cy;
    if (appOnDraw !== undefined) {
        appOnDraw();
    }

    if (allPuzzlesSelectionActive === false) {
        // draw logo
        ctx.drawImage(logoImage, LOGO_BUTTON_X, LOGO_BUTTON_Y);

        // draw help button
        style = doHighlightHelp ? DIGIPUZZLE_GREEN : buttonColor;
        fwFillRect(ctx, INFO_BUTTON_X, INFO_BUTTON_Y, INFO_BUTTON_W, INFO_BUTTON_H, style);
        fs = (BUTTON_W === 64) ? 40 : 44;
        fwFillText(ctx, "?", INFO_BUTTON_X + Math.floor(INFO_BUTTON_W / 2), INFO_BUTTON_Y + Math.floor(INFO_BUTTON_H / 2) + Math.floor(fs / 2), fs.toString() + 'pt ' + font, "white", "center");

        // draw score button
        if (!hideGameBtn) {
            updateScore(true);
        } else {
            fwFillRect(ctx, GAME_BUTTON_X, GAME_BUTTON_Y, GAME_BUTTON_W, GAME_BUTTON_H, buttonColor);
            if (m_completedCount !== undefined) {
                fs = (m_completedCount < 100) ? 28 : 22;
                fwFillText(ctx, m_completedCount.toString(), GAME_BUTTON_X + Math.floor(GAME_BUTTON_W / 2), GAME_BUTTON_Y + Math.floor(GAME_BUTTON_H / 2) + Math.floor(fs / 2), fs.toString() + 'pt ' + font, 'white', 'center');
            }
        }

        // draw next button
        style = doHighlightNext ? DIGIPUZZLE_GREEN : buttonColor;
        fwFillRect(ctx, NEXT_BUTTON_X, NEXT_BUTTON_Y, NEXT_BUTTON_W, NEXT_BUTTON_H, style);
        if (!hideNextBtn) {
            ctx.fillStyle = "white";
            ctx.lineWidth = 2;
            if (BUTTON_W === 64) {
                ctx.beginPath();
                ctx.moveTo(NEXT_BUTTON_X + 12, NEXT_BUTTON_Y + 15);
                ctx.lineTo(NEXT_BUTTON_X + 32, NEXT_BUTTON_Y + 32);
                ctx.lineTo(NEXT_BUTTON_X + 12, NEXT_BUTTON_Y + 64 - 15);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(NEXT_BUTTON_X + 24 + 12, NEXT_BUTTON_Y + 15);
                ctx.lineTo(NEXT_BUTTON_X + 24 + 32, NEXT_BUTTON_Y + 32);
                ctx.lineTo(NEXT_BUTTON_X + 24 + 12, NEXT_BUTTON_Y + 64 - 15);
                ctx.closePath();
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.moveTo(NEXT_BUTTON_X + 15, NEXT_BUTTON_Y + 19);
                ctx.lineTo(NEXT_BUTTON_X + 41, NEXT_BUTTON_Y + 41);
                ctx.lineTo(NEXT_BUTTON_X + 15, NEXT_BUTTON_Y + 82 - 19);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(NEXT_BUTTON_X + 30 + 15, NEXT_BUTTON_Y + 19);
                ctx.lineTo(NEXT_BUTTON_X + 30 + 41, NEXT_BUTTON_Y + 41);
                ctx.lineTo(NEXT_BUTTON_X + 30 + 15, NEXT_BUTTON_Y + 82 - 19);
                ctx.closePath();
                ctx.fill();
            }

            if (!enableNextBtn) {
                fwFillRect(ctx, NEXT_BUTTON_X, NEXT_BUTTON_Y, NEXT_BUTTON_W, NEXT_BUTTON_H, 'rgba(255,255,255,0.4)');
            }
        }

        fwFillRect(ctx, MODE_BUTTON_X, MODE_BUTTON_Y, MODE_BUTTON_W, MODE_BUTTON_H, buttonColor);
        ctx.drawImage(optionsImage, 0, 0, BUTTON_W, BUTTON_H, MODE_BUTTON_X, MODE_BUTTON_Y, BUTTON_W, BUTTON_H);

		if (!enableModeBtn) {
			ctx.fillRect(NEXT_BUTTON_X, MODE_BUTTON_Y, MODE_BUTTON_W, MODE_BUTTON_H);
		}

        if (gameMode === GM_DAILYJIGSAW) {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.fillRect(NEXT_BUTTON_X, NEXT_BUTTON_Y, NEXT_BUTTON_W, NEXT_BUTTON_H);
        }
        if (nextImageLoading === true) {
            disableButtons();
        }

        // draw help over image
        if (helpMode === true) {
            handleHelpMode();
        }
        // draw message box over image
        if (gameState === GS_POPUP) {
            drawMessageBox();
        }
    }
    if (splashScreenActive) {
        //addctx.drawImage(splashImage, Math.floor((canvas.width - splashImage.width) / 2), Math.floor((canvas.height - splashImage.height) / 2));
        if (splashImage.width === canvas.width) {
            addctx.drawImage(splashImage, 0, 0);
        } else {
            addctx.drawImage(splashImage, 50, 50);
        }
        if (splashTimeout !== undefined) {
            setTimeout(clearSplashScreen, splashTimeout);
        }
    }
    if (instructionsBox.active) {
        drawInstructionsBox();
    } else if (optionsBox.active) {
        drawOptionsBox();
        if (wlBox && wlBox.active) {
            wlDrawBox();
        }
    } else if (highscoreBox && highscoreBox.active) {
        drawHighscoreBox();
    } else if (multiplayerBox && multiplayerBox.active) {
        multiplayerOnDraw();
    } else if (nameBox && nameBox.active) {
        drawNameBox();
    } else if (levelsBox && levelsBox.active) {
        drawLevelsBox();
    }

    if (g_adBlockerDetected && (m_showAdBlockerMessage > 0)) {
        addctx.clearRect(0, 0, canvas.width, canvas.height);
        fwFillRect(addctx, 0, 0, canvas.width, canvas.height, 'rgba(0,0,0,0.8)');
        fwFillRect(addctx, OB_CONV(36), OB_CONV(98), OB_CONV(780 + 10), OB_CONV(400 + 10), 'rgba(255,255,255,0.7)');
        fwStrokeFillRect(addctx, OB_CONV(41), OB_CONV(103), OB_CONV(780), OB_CONV(400), 'black', OB_CONV(2), 'white');
        fs = OB_CONV(32);
        fwFillText(addctx, getFwString(sidFw.ADBLOCKER_1), OB_CONV(431), OB_CONV(150) + Math.floor(fs / 2), fs.toString() + 'pt ' + font, 'black', 'center');
        fs = OB_CONV(16);
        fwFillText(addctx, getFwString(sidFw.ADBLOCKER_2), OB_CONV(431), OB_CONV(220) + Math.floor(fs / 2), fs.toString() + 'pt ' + font, 'black', 'center');
        fwFillText(addctx, getFwString(sidFw.ADBLOCKER_3), OB_CONV(431), OB_CONV(260) + Math.floor(fs / 2), fs.toString() + 'pt ' + font, 'black', 'center');
        fwFillText(addctx, getFwString(sidFw.ADBLOCKER_4), OB_CONV(431), OB_CONV(330) + Math.floor(fs / 2), fs.toString() + 'pt ' + font, 'black', 'center');
        fs = OB_CONV(14);
        fwFillText(addctx, getFwString(sidFw.ADBLOCKER_5), OB_CONV(431), OB_CONV(365) + Math.floor(fs / 2), fs.toString() + 'pt ' + font, 'black', 'center');
        fwFillText(addctx, getFwString(sidFw.ADBLOCKER_6), OB_CONV(431), OB_CONV(420) + Math.floor(fs / 2), fs.toString() + 'pt ' + font, 'black', 'center');
        fs = OB_CONV(16);
        fwFillText(addctx, getFwString(sidFw.ADBLOCKER_7).replace("%1", m_showAdBlockerMessage.toString()), OB_CONV(431), OB_CONV(470) + Math.floor(fs / 2), fs.toString() + 'pt ' + font, 'black', 'center');
    }

    if (g_cookieConsentMissing && (m_showCookieConsentMessage > 0)) {
        addctx.clearRect(0, 0, canvas.width, canvas.height);
        fwFillRect(addctx, 0, 0, canvas.width, canvas.height, 'rgba(0,0,0,0.8)');
        fwFillRect(addctx, OB_CONV(36), OB_CONV(98), OB_CONV(780 + 10), OB_CONV(400 + 10), 'rgba(255,255,255,0.7)');
        fwStrokeFillRect(addctx, OB_CONV(41), OB_CONV(103), OB_CONV(780), OB_CONV(400), 'black', OB_CONV(2), 'white');
        fs = OB_CONV(32);
        fwFillText(addctx, getFwString(sidFw.COOKIE_CONSENT_1), OB_CONV(431), OB_CONV(150) + Math.floor(fs / 2), fs.toString() + 'pt ' + font, 'black', 'center');
        fs = OB_CONV(16);
        fwFillText(addctx, getFwString(sidFw.COOKIE_CONSENT_2), OB_CONV(431), OB_CONV(220) + Math.floor(fs / 2), fs.toString() + 'pt ' + font, 'black', 'center');
        fwFillText(addctx, getFwString(sidFw.COOKIE_CONSENT_3), OB_CONV(431), OB_CONV(260) + Math.floor(fs / 2), fs.toString() + 'pt ' + font, 'black', 'center');

        fwFillRect(addctx, COOKIE_CONSENT_BTN.x, COOKIE_CONSENT_BTN.y, COOKIE_CONSENT_BTN.w, COOKIE_CONSENT_BTN.h, 'black');
        fs = OB_CONV(18);
        fwFillText(addctx, getFwString(sidFw.COOKIE_CONSENT_4), OB_CONV(431), OB_CONV(340) + Math.floor(fs / 2), fs.toString() + 'pt ' + font, 'white', 'center');
        fs = OB_CONV(14);
        fwFillText(addctx, getFwString(sidFw.ADBLOCKER_6), OB_CONV(431), OB_CONV(420) + Math.floor(fs / 2), fs.toString() + 'pt ' + font, 'black', 'center');
        fs = OB_CONV(16);
        fwFillText(addctx, getFwString(sidFw.ADBLOCKER_7).replace("%1", m_showCookieConsentMessage.toString()), OB_CONV(431), OB_CONV(470) + Math.floor(fs / 2), fs.toString() + 'pt ' + font, 'black', 'center');
    }

    if (m_videoAdsActive) {
        // dark background
        addctx.clearRect(0, 0, canvas.width, canvas.height);
        fwFillRect(addctx, 0, 0, canvas.width, canvas.height, 'rgba(0,0,0,0.8)');
        if (m_showVideoAdsMessage) {
            // large play button on touch devices
            cx = OB_CONV(862 / 2);
            cy = OB_CONV(606 / 2);
            fwFillRect(addctx, cx - OB_CONV(200), cy - OB_CONV(150), OB_CONV(400), OB_CONV(300), 'rgba(255,255,255,0.7)');
            fwStrokeArc(addctx, cx, cy, OB_CONV(120), 'black', OB_CONV(30));
            addctx.beginPath();
            addctx.moveTo(cx - OB_CONV(58), cy - OB_CONV(70));
            addctx.lineTo(cx + OB_CONV(80), cy);
            addctx.lineTo(cx - OB_CONV(58), cy + OB_CONV(70));
            addctx.closePath();
            addctx.fillStyle = 'black';
            addctx.fill();
        }
    }

    if (g_debugVideoAds && (m_videoDebugLine !== "")) {
        addctx.clearRect(0, 0, canvas.width, 100);
        fwFillRect(addctx, 0, 0, canvas.width, 100, 'rgba(0,0,0,0.8)');
        texts = m_videoDebugLine.split(';');
        lines = [""];
        for (i = 0; i < texts.length; i += 1) {
            addctx.font = '12pt arial';
            w = ctx.measureText(lines[lines.length - 1] + ";" + texts[i]).width;
            if (w > 800) {
                // force new line
                lines.push(texts[i]);
            } else {
                lines[lines.length - 1] += (";" + texts[i]);
            }
        }

        for (i = 0; i < lines.length; i += 1) {
            fwFillText(addctx, lines[i], 10, 15 + (i * 20), '12pt arial', 'white', 'left');
        }
    }
}

function showPlayer() {
    "use strict";
    var el, left, top, size;
    el = document.getElementById("content");
    /*
    if ((el !== undefined) && (el !== null)) {
        el.style.width = canvas.style.width;
        el.style.height = canvas.style.width;
        el.style.visibility = 'visible';
    }
    */
    el = document.getElementById("adContainer");
    if ((el !== undefined) && (el !== null)) {
        size = fwVideoAdsGetSize();

        fwAddDebugText("width:" + size.w.toString() + ";");
        fwAddDebugText("height:" + size.h.toString() + ";");
        el.style.width = size.w.toString() + "px";
        el.style.height = size.h.toString() + "px";
        left = Math.floor((m_canvasWidth / 2) - Math.floor(size.w / 2)).toString() + "px";
        top = Math.floor((m_canvasHeight / 2) - Math.floor(size.h / 2)).toString() + "px";
        fwAddDebugText("left:" + left + ";");
        fwAddDebugText("top:" + top + ";");
        el.style.left = left;
        el.style.top = top;
        el.style.visibility = 'visible';
    }
}

function hidePlayer() {
    "use strict";
    var el;
    /*
    el = document.getElementById("content");
    if ((el !== undefined) && (el !== null)) {
        el.style.visibility = 'hidden';
        el.style.height = 0;
    }
    */
    el = document.getElementById("adContainer");
    if ((el !== undefined) && (el !== null)) {
        el.style.visibility = 'hidden';
        el.style.height = 0;
    }
}

function fwTriggerVideoAdsActive(autoPlay) {
    "use strict";
    if (!m_videoAdsActive) {
        fwAddDebugText("adsactive: " + autoPlay.toString() + ";");
        m_videoAdsActive = true;
        if (!autoPlay) {
            m_showVideoAdsMessage = true;
        } else {
            showPlayer();
        }
        draw();
    } else {
        fwAddDebugText("adsactive2;");
        showPlayer();
    }
    if (appOnVideoAdsStarted !== undefined) {
        appOnVideoAdsStarted();
    }
}

function fwTriggerVideoAdsFinished() {
    "use strict";
    fwAddDebugText("finished;");
    m_videoAdsActive = false;
    m_showVideoAdsMessage = false;
    // make sure box is removed
    addctx.clearRect(0, 0, canvas.width, canvas.height);
    hidePlayer();
    if (appOnVideoAdsFinished !== undefined) {
        appOnVideoAdsFinished();
    }
    draw();
}

function fwAddDebugText(text) {
    "use strict";
    if (g_debugVideoAds) {
        m_videoDebugLine += text;
        draw();
    } else {
        console.log(text);
    }
}

function setCanvas() {
    "use strict";
    var w, h, el, spareX = 0, spareY = 0, offsetTop = 0, offsetLeft = 0, maskElement, width, height;
    initCanvas(); // make sure canvas is initialised

    if (keepSpareY !== undefined) {
        spareY = keepSpareY;
    }

    if (keepSpareX !== undefined) {
        spareX = keepSpareX;
    }

    if (fixedMarginTop !== undefined) {
        offsetTop = fixedMarginTop;
    } else {
        offsetTop = canvas.parentNode.offsetTop;
    }
    if (fixedMarginLeft !== undefined) {
        offsetLeft = fixedMarginLeft;
    } else {
        offsetLeft = canvas.parentNode.offsetLeft;
    }

    width = $(window).width();
    height = $(window).height();

    if (fixedWidth === undefined) {
        // canvas size (in memory) is allways fixed
        // style only determines the screen size
        if (((width - spareX) / (height - spareY)) > scaleFactor) {
            // Too wide; fix height
            m_canvasHeight = height - spareY -(offsetTop * 2);
            m_canvasWidth = Math.floor(m_canvasHeight * scaleFactor);
        } else {
            // Too high; fix width
            m_canvasWidth = width - spareX - (offsetLeft * 2);
            m_canvasHeight = Math.floor(m_canvasWidth / scaleFactor);
        }
    } else {
        m_canvasWidth = fixedWidth;
        m_canvasHeight = fixedHeight;
    }
    canvas.style.width = m_canvasWidth + "px";
    canvas.style.height = m_canvasHeight + "px";

    bgcanvas.style.width = canvas.style.width;
    bgcanvas.style.height = canvas.style.height;
    topcanvas.style.width = canvas.style.width;
    topcanvas.style.height = canvas.style.height;
    addcanvas.style.width = canvas.style.width;
    addcanvas.style.height = canvas.style.height;
    if (helpcanvas !== null) {
        helpcanvas.style.width = canvas.style.width;
        helpcanvas.style.height = canvas.style.height;
    }

    el = document.getElementById('canvasHold');
    el.style.width = canvas.style.width;
    el.style.height = canvas.style.height;
/*
    el.parentElement.style.minWidth = "600px";

    if (spareY === 0) {
        el.parentElement.parentElement.style.minWidth = "600px";
    }
*/
    w = parseInt(canvas.style.width, 10);
    currentScaleW = canvas.width / w;
    h = parseInt(canvas.style.height, 10);
    currentScaleH = canvas.height / h;

    maskElement = document.getElementById("loaderdiv");
    if ((maskElement !== undefined) && (maskElement !== null)) {
        //maskElement.style.minWidth = "600px";
        maskElement.style.visibility = 'hidden';
        maskElement.style.height = 0;
    }
    maskElement = document.getElementById("maindiv");
    if ((maskElement !== undefined) && (maskElement !== null)) {
        //maskElement.style.minWidth = "600px";
        maskElement.style.display = '';
    }


    // in debug mode; show scale factors
    /*
     if ((typeof(ctx) != "undefined") && (debugMode == true)) {
     ctx.clearRect ( BUTTON_X, POS_BUTTON_Y-64 , 64 , 64 );
     var text = currentScaleW.toFixed(2) + ',' + currentScaleH.toFixed(2);
     ctx.fillText(text,BUTTON_X + 10,POS_BUTTON_Y-64 + 10);
     }*/
}

function resizePage() {
    "use strict";
    setCanvas();

    // draw();

    setTimeout(draw, 10);
}

function selectPicture() {
    "use strict";
    var i, found, now, month, day, dateStr, puzzleFileName;

    // Clear matches
    matchArray = [];

    //@@ to sliding puzzle: pieces = [];
    //@@ to sliding puzzle: selPieces = [];

	// Just create a new image for each puzzle
    puzzleImage = new Image();

	if ((gameMode === GM_PHOTODIFF) || (gameMode === GM_COLLMEMORY) || (gameMode === GM_WORDMEMORY) || (gameMode === GM_COLLMAHJONG)) {
		// use overview image for these puzzle games
		puzzleFileName = "puzzleview.jpg";
	} else if ((gameMode === GM_DAILYJIGSAW) || (dailyMode === true)) {
		if (dailyJigsawLock) {
			found = false;
			// get current computer date ("21-09" format)
			now = new Date();
			month = now.getMonth() + 1;
			day = now.getDate();
			dateStr = ((month < 10) ? '0': '') + month + '-' + ((day < 10) ? '0': '') + day;
			// pick the correct image for this date
			for (i = 0; i < pictureArray.length; i += 1) {
				if (pictureArray[i].date === dateStr) {
					if (!found) {
						found = true;
						pictureIndex = i;
						puzzleFileName = pictureArray[i].fileName;
					}
				}
			}
			if (!found) { // as backup just take the first one from the list
				pictureIndex = 0;
				puzzleFileName = pictureArray[0].fileName;
			}
		} else {
			// special test mode to check daily puzzles
			pictureIndex = (pictureIndex + 1) % pictureArray.length;
			puzzleFileName = pictureArray[pictureIndex].fileName;
		}
	} else if (fixedOrder === true) {
        // get next image
        puzzleFileName = pictureArray[fixedOrderIndex].fileName;
        fixedOrderIndex = (fixedOrderIndex + 1) % pictureArray.length;
    } else {
        if (pictureArray.length > 0) {
            // get random image
            pictureIndex = getRnd(rndPicture);
            puzzleFileName = pictureArray[pictureIndex].fileName;
        }
	}
	
    if (puzzleFileName) {
	   fwAddImageToLoad(puzzleImage, puzzleFileName);
    }
}

function draw() {
    "use strict";
    if (initialized !== true) {
        return;
    }

    drawIt();
}

function fwIsInitialized() {
    "use strict";
    return initialized;
}

function drawLoading() {
    "use strict";
    /*
     ctx.clearRect(0,0,872,50);
     ctx.fillStyle = 'black';
     ctx.font = "30px impact";
     ctx.textAlign = "left";
     ctx.fillText('...' + filesLoaded + '/' + filesNeeded + "  " + myimage.src, 15, 50);
     */
}

function fwTriggerNextPicture(t) {
    "use strict";
    // signal loading
	nextImageLoading = true;
	disableButtons();
    draw();
	
	setTimeout(nextPicture, t);
}

function fwIncCompletedCount() {
    "use strict";
    if (m_completedCount === undefined) {
        m_completedCount = 1;
    } else {
        m_completedCount += 1;
    }
}

function disableButtons() {
    "use strict";
	ctx.fillStyle = 'rgba(255,255,255,0.5)';
	ctx.fillRect(LOGO_BUTTON_X, LOGO_BUTTON_Y, LOGO_BUTTON_W, LOGO_BUTTON_H);
	ctx.fillRect(INFO_BUTTON_X, INFO_BUTTON_Y, INFO_BUTTON_W, INFO_BUTTON_H);
    ctx.fillRect(GAME_BUTTON_X, GAME_BUTTON_Y, GAME_BUTTON_W, GAME_BUTTON_H);
	ctx.fillRect(NEXT_BUTTON_X, NEXT_BUTTON_Y, NEXT_BUTTON_W, NEXT_BUTTON_H);
	ctx.fillRect(MODE_BUTTON_X, MODE_BUTTON_Y, MODE_BUTTON_W, MODE_BUTTON_H);
}

function nextPicture() {
    "use strict";
    if (initialized === true) {
        initialized = false;
        exampleMode = false;
        fwClearResult();
        if (timeBusy !== undefined) { timeBusy = 0; }

        // disable next button
        nextImageLoading = true;

        selectPicture();
        drawLoading();
		startLoadImages();
    }
}

function handleAdBlockerMessage() {
    "use strict";
    m_showAdBlockerMessage -= 1;

    if (m_showAdBlockerMessage > 0) {
        setTimeout(handleAdBlockerMessage, 1000);
    } else {
        addctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
}

function handleCookieConsentMessage() {
    "use strict";
    m_showCookieConsentMessage -= 1;

    if (m_showCookieConsentMessage > 0) {
        setTimeout(handleCookieConsentMessage, 1000);
    } else {
        addctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
}

const tcfCallback = (tcData, success) => {
    if (success && ((tcData.eventStatus === 'tcloaded') || (tcData.eventStatus === 'useractioncomplete'))) {

        // do something with tcData.tcString

        console.log(tcData.eventStatus);
        console.log(tcData);

        g_cookieConsentMissing = false;

        if (!tcData.publisher || !tcData.publisher.consents) {
            g_cookieConsentMissing = true;
        } else {
            // console.log(tcData.publisher.consents);

            g_cookieConsentMissing = 
                !tcData.publisher.consents[Object.keys(tcData.publisher.consents)[0]] ||
                !tcData.publisher.consents[Object.keys(tcData.publisher.consents)[1]] ||
                !tcData.publisher.consents[Object.keys(tcData.publisher.consents)[2]] ||
                !tcData.publisher.consents[Object.keys(tcData.publisher.consents)[3]] ||
                !tcData.publisher.consents[Object.keys(tcData.publisher.consents)[6]] ||
                !tcData.publisher.consents[Object.keys(tcData.publisher.consents)[8]] ||
                !tcData.publisher.consents[Object.keys(tcData.publisher.consents)[9]];
        }

        if (g_cookieConsentMissing) {
            m_showCookieConsentMessage = 20;
            COOKIE_CONSENT_BTN = {x: OB_CONV(270), y: OB_CONV(310), w: OB_CONV(862 - 540), h: OB_CONV(60)};
            setTimeout(handleCookieConsentMessage, 1000);

            if (typeof gtag !=='undefined') {
                gtag('event', 'cookie_consent_missing');
            }

            draw();                      
        }

        // remove the ourself to not get called more than once
        __tcfapi('removeEventListener', 2, (success) => {
            if (success) {
            // oh good...
            }
        }, tcData.listenerId);
    } else {
        console.log('tcf callback, state = ' + tcData.eventStatus + ', success = ' + success.toString());
    }
}

function checkLicense() {
    // check if license is installed
    var code, valid = false, expired = false, LICENSE_MUL = [111, 122, 133, 144], school, size, month, year, crc, check, currentMonth, currentYear;
    try {
        code = localStorage.getItem("licenseCode");
    } catch (error) {
        console.log(error);
    }
    if (code) {
        valid = false;
        if (code.length === 12) {
            school = parseInt(code.substring(0, 3));
            size = parseInt(code.substring(3, 4));
            month = parseInt(code.substring(4, 6));
            year = parseInt(code.substring(6, 8));
            check = code.substring(8,12);
            crc = (((school * LICENSE_MUL[0]) + (size * LICENSE_MUL[1]) + (month * LICENSE_MUL[2]) + (year * LICENSE_MUL[3])) % 10000).toString().padStart(4, "0");
            valid = (check === crc) && (month !== 0) && (school !== 0);
        }
        if (valid) {
            var now = new Date();
            currentMonth = now.getMonth() + 1;
            currentYear = now.getFullYear() % 100;

            if ((currentYear > year) || ((currentYear === year) && (currentMonth > month))) {
                expired = true;
                console.log('expired license found: ' + code);
            } else {
                console.log('valid license found: ' + code);
            }
        } else {
            console.log('invalid license found: ' + code);
        }
    } else {
        console.log('no license found');
    }
    return {valid: valid, expired: expired, code: code};
}

function onImageLoad() {
    "use strict";
    var license;
    g_filesLoaded += 1;
    if ((g_filesLoaded < g_filesNeeded) || (g_filesLoaded === 0)) {
        return;
    }

	// automatically clear list when everything is loaded
	g_imagesToLoad.length = 0;

    if (gameInterval !== null) {
        clearInterval(gameInterval);
        gameInterval = null;
    }

    // clear all
    bgctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    topctx.clearRect(0, 0, canvas.width, canvas.height);
    addctx.clearRect(0, 0, canvas.width, canvas.height);

    if (helpctx) {
        helpctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (m_initializeVideoAdsTrigger) {
        console.log('call fwVideoAdsInit()');
        fwVideoAdsInit(m_canvasWidth, g_onlyRewardedVideoAds);
        m_initializeVideoAdsTrigger = false;
    }

    if (appOnInit !== undefined) {
        // console.log('screen.width: ' + screen.width + ', screen.height: ' + screen.height);
        appOnInit();
        if ((appOnClearSplashScreen !== undefined) && (splashImageFileName === undefined)) {
            appOnClearSplashScreen();
        }
    }

    optionsBoxOnInit();

    if (m_firstRun) {
        // check for adblocker
        if (g_adBlockerDetectionEnabled) {
            console.log('check for license');
            license = checkLicense();

            if (license.valid && !license.expired) {
                g_adBlockerDetectionEnabled = false;
            }
        }

        if (g_adBlockerDetectionEnabled) {
            console.log('check for adblocker');
            if ((g_adsJsLoaded !== true) || (g_adsBlocked)) {
                g_adBlockerDetected = true;
                m_showAdBlockerMessage = 30;
                setTimeout(handleAdBlockerMessage, 1000);
            }
            if (typeof gtag !=='undefined') {
                gtag('event', (g_adsJsLoaded === true) ? 'adblocker_not_found' : 'adblocker_detected');
            }

            if (typeof(window.adsbygoogle) == "undefined") {
                console.log('adblocker detected (window.adsbygoogle undefined)');
            } else {
                try {
                    console.log(typeof(window.adsbygoogle));
                } catch (e) {
                    console.log('error');
                }
            }

            // do this once per game (enough for now)
            g_adBlockerDetectionEnabled = false;
        }
        if (!g_adBlockerDetected) {

            if (g_cookieConsentDetectionEnabled) {
                // check cookie consent
                try {
                    window.__tcfapi('addEventListener', 2, tcfCallback);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        m_firstRun = false;
    }

    if (highlightNextInterval !== undefined) {
		clearInterval(highlightNextInterval);
		highlightNextInterval = undefined;
	}	
	doHighlightNext = false;

	if (gameState === GS_WAIT) {
		// restart game
		gameState = GS_STOPPED;
	}

    gameInterval = setInterval(function () {
        if ((timeLeft !== undefined) && (timeLeft > 0)) {
            timeLeft -= 1;
            updateScore(false);
            if (timeLeft === 0) {
                gameState = GS_POPUP;
                draw();
            }
        } else if ((timeBusy !== undefined) && (gameState === GS_STARTED) && (scoreResult === SCORE_NONE)) {
            timeBusy += 1;
            updateScore(false);
        }
    }, 1000);

    scoreResult = SCORE_NONE;
    initialized = true;

    if (nextImageLoading) { nextImageLoading = false; }

    // draw image to the puzzleCanvas
    puzzleCtx.globalAlpha = 1;
    puzzleCtx.drawImage(puzzleImage, 0, 0);
    // if required, decrypt image
    if (encrypted) { decryptImage(puzzleCtx, puzzleImage.width, puzzleImage.height); }
    if ((watermark === true) && (gameMode !== GM_PHOTODIFF)) {
        // add watermark to puzzleCanvas
        if (watermarkAlpha !== undefined) {
            puzzleCtx.globalAlpha = watermarkAlpha;
        } else {
            puzzleCtx.globalAlpha = 0.50;
        }
        puzzleCtx.drawImage(watermarkImage, puzzleCanvas.width - watermarkImage.width, puzzleCanvas.height - watermarkImage.height);
        puzzleCtx.globalAlpha = 1;
    }

    activateHighlightHelp();

    draw();
}

function fwClearResult() {
    "use strict";
    if (scoreResult !== SCORE_NONE) {
        scoreResult = SCORE_NONE;
        updateScore(false);
    }
}

function fwResultAddPoint() {
    "use strict";
    if ((gameState === GS_STARTED) && (timeLeft !== undefined) && (timeLeft > 0)) {
        points += 1;
        updateScore(false);
    }
}

function fwResultRemovePoint() {
    "use strict";
    if ((gameState === GS_STARTED) && (timeLeft !== undefined) && (timeLeft > 0)) {
        if (points > 0) { points -= 1; }
        updateScore(false);
    }
}

function fwResultOk(autoClear) {
    "use strict";
    if (scoreResult === SCORE_NONE) {
        if ((gameState === GS_STARTED) && (timeLeft !== undefined) && (timeLeft > 0)) {
            points += 1;
        }
        scoreResult = SCORE_OK;
        updateScore(false);
        if ((gameState === GS_STARTED) && (timeBusy !== undefined)) {
			gameState = GS_POPUP;
            if (gameMode !== GM_MINESWEEPER) {
                setTimeout(fwClearResult, 1500);
            }
        } else if (autoClear) { setTimeout(fwClearResult, 1500); }
    }
}

function fwResultNotOk(autoClear) {
    "use strict";
    if (scoreResult === SCORE_NONE) {
        if ((gameState === GS_STARTED) && (timeLeft !== undefined) && (timeLeft > 0)) {
            points -= 1;
            points = Math.max(points, 0);
        }
        scoreResult = SCORE_NOK;
        if (autoClear) { setTimeout(fwClearResult, 1500); }
        updateScore(false);
    }
}

function fwGetScoreResult() {
    "use strict";
    return scoreResult;
}

function drawMessageBox() {
    "use strict";
    var x = 10 + 40, y = 10 + 131, w = (768 - 80), h = 250, seconds, secondsText, timeText, text, l_ctx = ctx, texts;
    if (g_overlayCtx !== undefined) {
        l_ctx = g_overlayCtx;
    } else if ((gameMode === GM_JIGSAW) || (gameMode === GM_DAILYJIGSAW)) {
        l_ctx = addctx;
        l_ctx.globalAlpha = 1;
    }
    // Draw yellow background box
    l_ctx.fillStyle = menuColor;
    l_ctx.fillRect(x, y, w, h);
    // Black line in background box
    l_ctx.beginPath();
    l_ctx.lineWidth = 2;
    l_ctx.strokeStyle = 'white';
    l_ctx.rect(x + 3, y + 3, w - (2 * 3), h - (2 * 3));
    l_ctx.stroke();

    if (timeBusy !== undefined) {
        seconds = timeBusy % 60;
        secondsText = (seconds < 10 ? "0" : "") + seconds;
        timeText = Math.floor(timeBusy / 60) + ":" + secondsText;
    }

    l_ctx.font = "30px " + font;
    l_ctx.textAlign = 'left';
    l_ctx.fillStyle = 'white';

    if (timeLeft !== undefined) {
        if (points > 0) {
            l_ctx.fillText(getFwString(sidFw.SCORE_CONGRATULATIONS), x + 25, y + 60);
        } else {
            l_ctx.fillText(getFwString(sidFw.SCORE_UNFORTUNATELY), x + 25, y + 60);
        }
        text = getFwString((points === 1) ? sidFw.SCORE_POINT : sidFw.SCORE_POINTS);
        l_ctx.fillText(getFwString(sidFw.SCORE_GAINED).replace('%1', points.toString()).replace('%2', text), x + 25, y + 100);
    } else {
        l_ctx.fillText(getFwString(sidFw.SCORE_CONGRATULATIONS), x + 25, y + 60);
        l_ctx.fillText(getFwString(sidFw.SCORE_SOLVED).replace('%1', timeText), x + 25, y + 100);
    }
    texts = getFwString(sidFw.SCORE_NEXT).split('|');
    l_ctx.fillText(texts[0], x + 25, y + 170);
    l_ctx.fillText(texts[1], x + 25, y + 210);
}

function drawHelp(x, y, text, connectX, connectY) {
    "use strict";
    var i, w = 0, h, split, textSize, l_ctx = ctx;
    if (g_overlayCtx !== undefined) {
        l_ctx = g_overlayCtx; // for external games
    } else if ((gameMode === GM_JIGSAW) || (gameMode === GM_DAILYJIGSAW)) {
        l_ctx = addctx;
        l_ctx.globalAlpha = 1;
    }

    if (optionsBox.factor !== 1) {
        l_ctx.font = '18pt ' + font;
    } else {
        l_ctx.font = "18px " + font;
    }
    l_ctx.textAlign = "left";

    split = text.split("\n");
    for (i = 0; i < split.length; i += 1) {
        textSize = l_ctx.measureText(split[i]);
        if (textSize.width > w) {
            w = textSize.width;
        }
    }
    w = w + OB_CONV(20);
    h = OB_CONV((22 * split.length) + 12);

    // Draw yellow background box
    l_ctx.fillStyle = '#FFF499';
    l_ctx.fillRect(x, y, w, h);
    // Black line in background box
    l_ctx.beginPath();
    l_ctx.lineWidth = 2;
    l_ctx.strokeStyle = helpBorderColor;
    l_ctx.rect(x + 3, y + 3, w - (2 * 3), h - (2 * 3));
    l_ctx.stroke();

    if ((connectX >= 0) && (connectY >= 0)) {
        // Connection line
        l_ctx.beginPath();
        l_ctx.moveTo((connectX >= x) ? (x + w - 3) : x + 3, y + (h / 2));
        l_ctx.lineTo(connectX, connectY);
        l_ctx.closePath();
        l_ctx.stroke();

        l_ctx.beginPath();
        l_ctx.arc(connectX, connectY, 5, 0, 2 * Math.PI, false);
        l_ctx.fillStyle = '#FFF499';
        l_ctx.fill();
        l_ctx.lineWidth = 2;
        l_ctx.strokeStyle = helpBorderColor;
        l_ctx.stroke();
    }

    l_ctx.fillStyle = 'black';
    //l_ctx.font = "14px impact";
    //l_ctx.textAlign = "left";

    for (i = 0; i < split.length; i += 1) {
        l_ctx.fillText(split[i], x + OB_CONV(6), y + 2 + ((i + 1) * OB_CONV(22)));
    }
}

function handleHelpMode() {
    "use strict";
    var text;

    if ((gameMode !== GM_SCRAMBLE) && (gameMode !== GM_FOCUS) && (gameMode !== GM_WEEKPUZZLE) && (gameMode !== GM_WEEKPUZZLE_EX)) {
        if (addCreditsToHelp !== undefined) {
            // credits help text (used??)
            drawHelp(addCreditsToHelp.x, addCreditsToHelp.y, addCreditsToHelp.text);
        }
        if (enableGameBtn && !hideGameBtn) {
            // game button help text
            if (timerMode === TIMERMODE_TIMER) {
                drawHelp(OB_CONV(100), OB_CONV(374), getFwString(sidFw.HELP_START_TIMER), OB_CONV(796), OB_CONV(339 + 74));
            } else {
                drawHelp(OB_CONV(100), OB_CONV(374), getFwString(sidFw.HELP_START_COUNTER), OB_CONV(796), OB_CONV(339 + 74));
            }
        }
        if (skinLogoImageFileName === undefined) {
            // logo button help text
            drawHelp(OB_CONV(200), OB_CONV(100), getFwString(sidFw.HELP_BACK).replace('%1','Digipuzzle.net'), OB_CONV(796), OB_CONV(100));
        }

        if (enableNextBtn && !hideNextBtn) {
            // next button help text
            drawHelp(OB_CONV(300), OB_CONV(450), getFwString(sidFw.HELP_NEXT), OB_CONV(796), OB_CONV(485));
        }
    }

    // drawHelp(10, 10, m_audioSampleName + (m_audioPlayerLoaded ? ' loaded' : ' loading...'), -1, -1);
    if (appOnDrawHelp !== undefined) {
        appOnDrawHelp();
    }
}

function checkLinksIframe() {
    "use strict";
    var el, src, link, linkOut, checkEnThemes;
    el = document.getElementById("linksiframe");
    if (el) {
        src = el.src;
        if (src.indexOf("/links/links.htm") >= 0) { // only change on default links
            $.get("//www.digipuzzle.net/php/utility/getcountrycode.php", function(data) {
                var rx, el;
                rx = JSON.parse(data);
                switch (rx.country) {
                case "US":
                    break;
                case "NL":
                    link = "//www.digipuzzle.net/links/links_nl.htm";
                    break;
                case "CA":
                    link = "//www.digipuzzle.net/links/ca/links.htm";
                    break;
                case "AU":
                    link = "//www.digipuzzle.net/links/au/links.htm";
                    break;
                case "PL":
                    link = "//www.digipuzzle.net/links/pl/links.htm";
                    linkOut = "//www.digipuzzle.net/";
                    break;
                case "DE": // Germany
                case "CH": // Switzerland
                case "AT": // Austria
                case "LU": // Luxembourgh
                case "LI": // Liechtenstein
                    link = "//www.digipuzzle.net/links/de/links.htm";
                    break;
                case "AR": // Argentina
                case "BO": // Bolivia
                case "CL": // Chile
                case "CR": // Costa Rica
                case "CO": // Colombia
                case "CU": // Cuba
                case "DO": // Dominican Republic
                case "EC": // Ecuador
                case "SV": // El Salvador
                case "GT": // Guatemala
                case "HN": // Honduras
                case "MX": // Mexico
                case "NI": // Nicaragua
                case "PA": // Panama
                case "PY": // Paraguay
                case "PE": // Peru
                case "ES": // Spain
                case "UY": // Uruguay
                case "VE": // Venezuela
                    link = "//www.digipuzzle.net/links/es/links.htm";
                    if (rx.country === "ES") {
                        if (g_gameId.indexOf("christmas") >= 0) {
                            linkOut = "//www.digipuzzle.net/es/juegoseducativos/navidad/";
                        }
                    }
                    break;
                case "SE": // Sweden
                    link = "//www.digipuzzle.net/links/se/links.htm";
                    break;
                case "PT": // Portugal
                case "BR": // Brazil
                    link = "//www.digipuzzle.net/links/pt/links.htm";
                    if (g_gameId.indexOf("christmas") >= 0) {
                        linkOut = "//www.digipuzzle.net/pt/jogoseducativos/natal/";
                    }
                    break;
                case "NO": // Norway
                    linkOut = "//www.digipuzzle.net/no/laeringsspill/";
                    break;
                default:
                    break;
                }

                // handle English theme links
                switch (rx.country) {
                case "US": // USA
                case "CA": // Canada
                case "AU": // Australia
                case "NZ": // New Zealand
                case "UK": // United Kingdom
                case "IE": // Ireland
                case "NL": // Netherlands (testing)
                case "PL": // Poland
                    if (g_gameId.indexOf("christmas") >= 0) {
                        link = "//www.digipuzzle.net/links/christmas/links.htm";
                    }
                    if (g_gameId.indexOf("winter") >= 0) {
                        link = "//www.digipuzzle.net/links/winter/links.htm";
                    }
                    if (g_gameId.indexOf("valentine") >= 0) {
                        link = "//www.digipuzzle.net/links/valentine/links.htm";
                    }
                    if (g_gameId.indexOf("stpatricksday") >= 0) {
                        link = "//www.digipuzzle.net/links/stpatricksday/links.htm";
                    }
                    if (g_gameId.indexOf("spring") >= 0) {
                        link = "//www.digipuzzle.net/links/spring/links.htm";
                    }
                    if (g_gameId.indexOf("easter") >= 0) {
                        link = "//www.digipuzzle.net/links/easter/links.htm";
                    }
                    break;
                default:
                    break;
                }

                if (link) {
                    el = document.getElementById("linksiframe");
                    el.src = link;
                    if (typeof gtag !=='undefined') {
                        console.log('triggering event: ' + 'links_' + rx.country);
                        gtag('event', 'links_iframe_' + rx.country);

                        // ga('send', 'event', 'Videos', 'play', 'Fall Campaign');
                    }
                }
                if (linkOut) {
                    console.log('linkOut to ' + linkOut);
                    try {
                        window.open("https:" + linkOut, "_blank");

                        if (typeof gtag !=='undefined') {
                            console.log('triggering event: ' + 'links_' + rx.country);
                            gtag('event', 'link out to ' + linkOut);
                        }
                    } catch (error) {
                        console.log('error: ' + error);
                    }
                }
            });
        }
    }
}

var ADS_URL = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

function checkAdsBlocked(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            callback(xhr.status === 0 || xhr.responseURL !== ADS_URL);
        }
    };
    xhr.open('HEAD', ADS_URL, true);
    xhr.send(null);
}

function checkAdsBlockedCallback(blocked) {
    console.log('checkAdsBlockedCallback: ' + blocked.toString());
    g_adsBlocked = blocked;
}

function loadPageGen() {
    "use strict";
    var gm, ref, lvl, words, i, tmp, row = 826 - (64 + 10), mouseCanvas, linkBack, items = [], skinDigisnacks = false, text, texts;
    initCanvas();

    if (g_extraFont !== undefined) {
        fwFillText(bgctx, "___", 10, 10, '20pt ' + g_extraFont, 'rgba(255,255,255,0.05)', 'center');
    }

    if (allPuzzles) {
        menuOnInit();
    }

    if (canvas.height === 768) {
        BUTTON_RIGHT_COLUMN = 998;
        BUTTON_X = BUTTON_RIGHT_COLUMN;
        BUTTON_W = 82;
        BUTTON_H = 82;

        LOGO_BUTTON_X = BUTTON_RIGHT_COLUMN;
        LOGO_BUTTON_Y = 10;
        LOGO_BUTTON_W = BUTTON_W;
        LOGO_BUTTON_H = 374;

        INFO_BUTTON_X = BUTTON_RIGHT_COLUMN;
        INFO_BUTTON_Y = LOGO_BUTTON_Y + LOGO_BUTTON_H + 12;
        INFO_BUTTON_W = BUTTON_W;
        INFO_BUTTON_H = BUTTON_H;

        GAME_BUTTON_X = BUTTON_RIGHT_COLUMN;
        GAME_BUTTON_Y = INFO_BUTTON_Y + INFO_BUTTON_H + 12;
        GAME_BUTTON_W = BUTTON_W;
        GAME_BUTTON_H = BUTTON_H;

        NEXT_BUTTON_X = BUTTON_RIGHT_COLUMN;
        NEXT_BUTTON_Y = GAME_BUTTON_Y + GAME_BUTTON_H + 12;
        NEXT_BUTTON_W = BUTTON_W;
        NEXT_BUTTON_H = BUTTON_H;

        MODE_BUTTON_X = BUTTON_RIGHT_COLUMN;
        MODE_BUTTON_Y = NEXT_BUTTON_Y + NEXT_BUTTON_H + 12;
        MODE_BUTTON_W = BUTTON_W;
        MODE_BUTTON_H = BUTTON_H;

        SNAP_BUTTON_X = LOGO_BUTTON_X;
        SNAP_BUTTON_Y = LOGO_BUTTON_Y;
        SNAP_BUTTON_W = BUTTON_W;
        SNAP_BUTTON_H = BUTTON_H;
    }

    if (mobile === true) {
        // update key positions for mobile puzzle games
        LOGO_BUTTON_X = 14;
        LOGO_BUTTON_Y = row;
        LOGO_BUTTON_W = 292;
        LOGO_BUTTON_H = BUTTON_H;

        SNAP_BUTTON_X = 20;
        SNAP_BUTTON_Y = LOGO_BUTTON_Y;
        SNAP_BUTTON_W = BUTTON_W;
        SNAP_BUTTON_H = BUTTON_H;

        MODE_BUTTON_X = LOGO_BUTTON_X + LOGO_BUTTON_W + 10;
        MODE_BUTTON_Y = row;
        MODE_BUTTON_W = BUTTON_W;
        MODE_BUTTON_H = BUTTON_H;

        NEXT_BUTTON_X = MODE_BUTTON_X + 74;
        NEXT_BUTTON_Y = row;
        NEXT_BUTTON_W = BUTTON_W;
        NEXT_BUTTON_H = BUTTON_H;

        GAME_BUTTON_X = NEXT_BUTTON_X + 74;
        GAME_BUTTON_Y = row;
        GAME_BUTTON_W = BUTTON_W;
        GAME_BUTTON_H = BUTTON_H;

        INFO_BUTTON_X = GAME_BUTTON_X + 74;
        INFO_BUTTON_Y = row;
        INFO_BUTTON_W = SMALL_BUTTON_W;
        INFO_BUTTON_H = SMALL_BUTTON_H;

        BUTTON_FS_X = INFO_BUTTON_X + 34;
        BUTTON_FS_Y = INFO_BUTTON_Y;
        BUTTON_FS_W = SMALL_BUTTON_W;
        BUTTON_FS_H = SMALL_BUTTON_H;

        BUTTON_PHOTO_X = INFO_BUTTON_X;
        BUTTON_PHOTO_Y = INFO_BUTTON_Y + 34;
        BUTTON_PHOTO_W = SMALL_BUTTON_W;
        BUTTON_PHOTO_H = SMALL_BUTTON_H;

        BUTTON_AUDIO_X = BUTTON_PHOTO_X + 34;
        BUTTON_AUDIO_Y = BUTTON_PHOTO_Y;
        BUTTON_AUDIO_W = SMALL_BUTTON_W;
        BUTTON_AUDIO_H = SMALL_BUTTON_H;
    }

    //if (largeInfoBtn === true) {
        // change width and height to get large info button
        INFO_BUTTON_W = BUTTON_W;
        INFO_BUTTON_H = BUTTON_H;
    //}

    puzzleCanvas = document.createElement('canvas');
    puzzleCanvas.id     = "puzzleCanvas";
    puzzleCanvas.width  = 768;
    puzzleCanvas.height = 512;
    puzzleCtx = puzzleCanvas.getContext("2d");

    // initialise/clean-up
    firstImage = true;
    //allPuzzlesSelectionActive = false;
    allPuzzlesSelected = -1;
    bottomAddBox = undefined;
    // initialise/clean-up gameplay
    points = 0;
    timeLeft = undefined;
    timeBusy = undefined;
    gameStarted = false;
    exampleMode = false;
    helpMode = false;
	gameState = GS_STOPPED;

    // detectAudioType();

    if (snapEnabled) {
        if (document.location.pathname.indexOf("D:") < 0) {
            snapEnabled = false;
        }
    }
	
	if ((document.location.hostname.indexOf(".net") > 0) || (document.location.pathname.indexOf("Digipuzzle") >= 0)) {
		site = SITE_EN;
	} else {
		site = SITE_NL;
	}
	
    if (language === undefined) {
        // no specific language supplied; follow site for language choice
        if (site === SITE_NL) {
            language = LANG_NL;
        } else {
            language = LANG_EN;
        }
    }
    // do skinning
    if (skinBorderColor !== undefined) { borderColor = skinBorderColor; }
    if (skinBackgroundColor !== undefined) { backgroundColor = skinBackgroundColor; }
    if (skinButtonColor !== undefined) { buttonColor = skinButtonColor; }
    if (skinMenuColor !== undefined) { menuColor = skinMenuColor; }
    if (skinTextColor !== undefined) { textColor = skinTextColor; }
    if (skinHelpBorderColor !== undefined) { helpBorderColor = skinHelpBorderColor; }
    if (skinFont !== undefined) { 
        font = skinFont; 
    }

    if (hideGameBtn !== undefined) {
        fwEnableGameBtn(false);
    }

    if (firstLoad === true) {
        if (g_enableVideoAds && g_videoAdsJsLoaded) {
            m_initializeVideoAdsTrigger = true;
        }
        // get language from command line
        tmp = gup("language");
        if ((tmp !== null) && (tmp !== "")) {
            language = tmp;
        }

        if (language === LANG_PT) {
            linkBackTo = "http://www.digipuzzle.net/pt/jogoseducativos";
        }
        linkBack = gup("linkback");
        if ((linkBack !== null) && (linkBack !== "")) {
            linkBackTo = linkBack;
            linkBackToViaUrl = linkBackTo;
        }
        if (directGameMode !== undefined) {
            gameMode = directGameMode;
        } else {
            // get input parameters
            gm = gup("game_mode");
            if ((gm !== null) && (gm !== "")) {
                gameMode = gm;
            }
        }
        if (directGameLevel !== undefined) {
            gameLevel = directGameLevel;
        } else {
            lvl = gup("game_level");
            if ((lvl !== null) && (lvl !== "")) {
                gameLevel = lvl;
            }
        }
        ref = gup("photo");
        if ((ref !== null) && (ref !== "")) {
            photoRef = ref;
			// create a pictureArray with photoRef as the only element (so it is automatically picked)
            pictureArray = [];
            pictureArray.push({ name: "ext",  fileName: photoRef,  picked: 0 });
        }
        if (skinPhoto !== undefined) {
            pictureArray = [];
            pictureArray.push({ name: "ext",  fileName: skinPhoto,  picked: 0 });
        }
        tmp = gup("page_mode");
        if ((tmp !== null) && (tmp !== "")) {
            puzzlePageMode = true;
        }

        tmp = gup("skin");
        if ((tmp !== null) && (tmp === "digisnacks")) {
            skinDigisnacks = true;
        }

        if (allPuzzles === undefined) { allPuzzles = false; }
        if (gameMode === GM_RANDOM) { // if random, allways start with a game that shows the add block
            do {
                i = Math.floor(Math.random() * allPuzzlesArray.length);
                gameMode = allPuzzlesArray[i].game;
            } while ((gameMode !== GM_SLIDER) && (gameMode !== GM_JIGSAW) && (gameMode !== GM_MAHJONG) && (gameMode !== GM_MEMORY) && (gameMode !== GM_PHOTOSWAP) && (gameMode !== GM_COLLMEMORY) && (gameMode !== GM_PHOTODIFF));
        }
    } else {
        gameMode = allPuzzlesSelectedGameMode;
    }

    if (puzzlePageMode) {
        // override certain variables
        forceBottomAdd = undefined;
    }

    // initialize game
/*
} else if (pointInBox(mouseX, mouseY, BUTTON_X, NEXT_BUTTON_Y, BUTTON_W, BUTTON_H) && ((gameMode !== GM_DAILYJIGSAW) || (!dailyJigsawLock))) {
    if (enableNextBtn) {
        if (gameState === GS_STARTED) {
            points = Math.max(points - 3, 0);
        }
        fwTriggerNextPicture(50);
    }
*/


    // clear puzzle framework
	clearFw();

    items.push({selected: false, text: getFwString(sidFw.OPTIONS_AUDIO)});
    if (!g_inlead && !g_uolo) {
        items.push({selected: false, text: getFwString(sidFw.OPTIONS_FULL_SCREEN)});
    }
    optionsBox.rows.push({type: 'header', items: items, text: ""});

    if (allPuzzlesSelectionActive !== true) {
        if (g_onConfigure !== undefined) {
            // minigames register itself
            g_onConfigure();
        } else {
        switch (gameMode) {
            case GM_PHOTOSEARCH:
                // configure the photosearch puzzle game
                photoSearchOnConfigure();
                break;
            case GM_PHOTOSWAP:
                // configure the photoswap puzzle game
                photoSwapOnConfigure();
                break;
            case GM_PHOTOTURN:
                // configure the phototurn puzzle game
                photoTurnOnConfigure();
                break;
            case GM_PHOTOPUZZLE:
                // configure the block puzzle game
                blockPuzzleOnConfigure();
                break;
            case GM_MAHJONG:
            case GM_COLLMAHJONG:
                // configure the mahjong puzzle game
                photoMahjongOnConfigure();
                break;
            case GM_SLIDER:
                // configure the sliding puzzle puzzle game
                slidingPuzzleOnConfigure();
                break;
            case GM_PHOTODIFF:
                // configure the photodiff puzzle game
                photoDiffOnConfigure();
                break;
            case GM_MEMORY:
            case GM_COLLMEMORY:
            case GM_WORDMEMORY:
                // configure the memory puzzle game
                memoryOnConfigure();
                break;
            case GM_HANGMAN:
                // configure the hangman puzzle game
                hangmanOnConfigure();
                break;
            case GM_WORDSEARCH:
                // configure the wordsearch puzzle game
                wordSearchOnConfigure();
                break;
            case GM_SUDOKU:
                // configure the sudoku puzzle game
                sudokuOnConfigure();
                break;
            case GM_JIGSAW:
            case GM_DAILYJIGSAW:
                // configure the (daily) jigsaw puzzle game
                jigsawOnConfigure();
                break;
            case GM_MINESWEEPER:
                // configure the minesweeper puzzle game
                mineSweeperOnConfigure();
                break;
            case GM_SOLITAIRE:
                // configure the solitaire game
                solitaireOnConfigure();
                break;
            case GM_QUIZ:
                // configure the quiz game
                quizOnConfigure();
                break;
            case GM_TILESQUIZ:
                // configure the tiles quiz game
                tilesQuizOnConfigure();
                break;
            case GM_TILESMATH:
                // configure the tiles math game
                tilesMathOnConfigure();
                break;
            case GM_CROSSWORD:
                // configure the crossword puzzle game
                crosswordOnConfigure();
                break;
            case GM_LINGO:
                // configure the crossword puzzle game
                lingoOnConfigure();
                break;
            }
        }
    } else {
        // configure the ingame menu
        menuOnConfigure();
    }

    optionsBoxOnLoad();

    if (firstLoad === true) {
        text = skinDigisnacks ? "Digisnacks.net" : "Digipuzzle.net";
        switch (language) {
        case LANG_NL:
            if (g_titleNl) {
                document.title = g_titleNl + " | " + text;
            }
            break;
        case LANG_DK:
            if (g_titleDk) {
                document.title = g_titleDk + " | " + text;
            }
            break;
        case LANG_DE:
        case LANG_SDE:
            if (g_titleDe) {
                document.title = g_titleDe + " | " + text;
            }
            break;
        case LANG_ES:
            if (g_titleEs) {
                document.title = g_titleEs + " | " + text;
            }
            break;
        case LANG_PT:
            if (g_titlePt) {
                document.title = g_titlePt + " | " + text;
            }
            break;
        case LANG_IS:
            if (g_titleIs) {
                document.title = g_titleIs + " | " + text;
            }
            break;
        case LANG_SE:
            if (g_titleSe) {
                document.title = g_titleSe + " | " + text;
            }
            break;
        case LANG_NO:
            if (g_titleNo) {
                document.title = g_titleNo + " | " + text;
            }
            break;
        case LANG_SI:
            if (g_titleSi) {
                document.title = g_titleSi + " | " + text;
            }
            break;
        case LANG_FR:
            if (g_titleFr) {
                document.title = g_titleFr + " | " + text;
            }
            break;
        case LANG_PL:
            if (g_titlePl) {
                document.title = g_titlePl + " | " + text;
            }
            break;
        default:
            texts = document.title.split('|');
            if (texts.length >= 2) {
                document.title = texts[0].trim() + " | " + text;
            }
            break;
        }
    }

    if (!hideNextBtn) { fwAddButtonWithMinHoldTime(NEXT_BUTTON_X, NEXT_BUTTON_Y, NEXT_BUTTON_W, NEXT_BUTTON_H, true, 10, onNextButtonPressed); }
    fwAddButtonWithMinHoldTime(MODE_BUTTON_X, MODE_BUTTON_Y, MODE_BUTTON_W, MODE_BUTTON_H, true, 10, onModeButtonPressed);
    if (!hideGameBtn) { fwAddButtonWithMinHoldTime(GAME_BUTTON_X, GAME_BUTTON_Y, GAME_BUTTON_W, GAME_BUTTON_H, true, 10, onGameButtonPressed); }
    fwAddButtonWithMinHoldTime(INFO_BUTTON_X, INFO_BUTTON_Y, INFO_BUTTON_W, INFO_BUTTON_H, true, 10, onHelpButtonPressed);
    if (snapEnabled) {
        fwAddButtonWithMinHoldTime(SNAP_BUTTON_X, SNAP_BUTTON_Y, SNAP_BUTTON_W, SNAP_BUTTON_H, true, 10, onSnapButtonPressed);
    }
    fwAddButtonWithMinHoldTime(LOGO_BUTTON_X, LOGO_BUTTON_Y, LOGO_BUTTON_W, LOGO_BUTTON_H, true, 10, onLogoPressed);

    if (multiplayerBox && multiplayerOnLoad) {
        multiplayerOnLoad();
    }

    if (firstLoad === true) {
        checkLinksIframe();
    }

    if (firstLoad === true) {
        // register keys/mouse/touch events
        $(document).keydown(onKeyDown);
        $(document).keyup(onKeyUp);
        $(document).keypress(onKeyPressed);

        mouseCanvas = (helpcanvas !== null) ? helpcanvas : addcanvas;

        mouseCanvas.addEventListener('click', function(e) {
            e.preventDefault();
        }, false);

        mouseCanvas.addEventListener("mousedown", mouseDown, false);
        mouseCanvas.addEventListener("mousemove", mouseMove, false);
        document.body.addEventListener("mouseup", mouseUp, false);
        //if(isTouchSupported) {
            //console.log('register touch events');
        if (!g_debugTouch) {
            mouseCanvas.addEventListener("touchstart", touchDown, false);
            mouseCanvas.addEventListener("touchmove", touchMove, true);
            mouseCanvas.addEventListener("touchend", touchUp, false);
            document.body.addEventListener("touchcancel", touchUp, false);
        }
        //}
        mouseCanvas.addEventListener("contextmenu", function (e) { e.preventDefault(); }, false);

        if (newScaling === true) {
            window.addEventListener('resize', resizePage, false);
            window.addEventListener('orientationchange', resizePage, false);
        }
    }

    initRndList(rndPicture, pictureArray.length);
    if (categoryWords  !== undefined) {
        words = categoryWords.split(";");
        initRndList(rndWord, words.length);
    }

    if (firstLoad === true) {
        selectPicture();
		
		//fwAddImageToLoad(nextImage, (allPuzzles ? 'iframe_next.png' : 'next.png'));
        if (allPuzzles) {
		    fwAddImageToLoad(logoImage, 'iframe_menu.png');
        } else {
            if (skinDigisnacks) {
                skinLogoImageFileName = "skins/digisnacks.png";
            }

            if (g_inlead) {
                //console.log('skin inlead');
                skinLogoImageFileName = "skins/inlead.png";
            }

            if (skinLogoImageFileName !== undefined) {
                fwAddImageToLoad(logoImage, skinLogoImageFileName);
            } else {
                fwAddImageToLoad(logoImage, (mobile === true) ? 'digipuzzle_mobile.png' : (canvas.height > 606) ? 'digipuzzle_large.png' : 'digipuzzel.png');
            }
        }
		//fwAddImageToLoad(rotateImage, 'rotate.png');

        if (addImageName !== undefined) {
            fwAddImageToLoad(addImage, 'add.png');
        }
        if (logoImageName !== undefined) {
            extLogoImage = new Image();
            fwAddImageToLoad(extLogoImage, logoImageName);
        }
        if (watermark === true) {
            fwAddImageToLoad(watermarkImage, "watermark.png");
        }

        if (allPuzzles === true) {
            fwAddImageToLoad(allPuzzlesAddImage, 'iframe_add468x60.png');
            fwAddImageToLoad(poweredImage, 'powered.png');
            if (photoAddLink !== undefined) {
                fwAddImageToLoad(photoAddImage, 'photoadd.png');
            }
        } else if (forceBottomAdd !== undefined) {
            fwAddImageToLoad(allPuzzlesAddImage, forceBottomAdd);
        }
        if (splashImageFileName !== undefined) {
            splashImage = new Image();
            fwAddImageToLoad(splashImage, splashImageFileName);
            splashScreenActive = true;
        }
        if (gameAds !== undefined) {
            // mechanism to load images (is generic)
            for (i = 0; i < gameAds.length; i += 1) {
                gameAds[i].image = new Image();
                fwAddImageToLoad(gameAds[i].image, gameAds[i].imageFileName);
            }
        }
        fwAddImageToLoad(optionsImage, (canvas.height > 606) ? "options_large.png" : "options.png");
        /*
        if (gameMode === GM_QUIZ) { //@@ move to quiz puzzle
            fwAddImageToLoad(quizImage, 'puzzleview.jpg');
            fwAddImageToLoad(wikiImage, 'wikiquiz.png');
        }*/

        checkLock();

		startLoadImages();
    } else {
        nextPicture();
    }

    if (firstLoad) {
        checkAdsBlocked(checkAdsBlockedCallback);
    }

    setCanvas();

    firstLoad = false;
}

function ImageWorker() {
    "use strict";
    this.canvas = undefined;
    this.gridWidth = 0;
    this.gridHeight = 0;
    this.gridSizeX = 0;
    this.gridSizeY = 0;
    this.ctx = undefined;
    this.grid = [];

    this.fillBuckets = function () {
        var canvasData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height),
            pixels = canvasData.data,
            p,
            delta,
            val,
            pixelsPerLine = this.canvas.width * 4,
            gridX,
            gridY,
            gridI,
            bucket;

        for (p = 0; p < pixels.length; p += 4) {
            val = Math.floor(pixels[p] * 0.3 + pixels[p + 1] * 0.59 + pixels[p + 2] * 0.11);
            pixels[p] = val;        // red
            pixels[p + 1] = val;    // green
            pixels[p + 2] = val;    // blue
            //pixels[i+3]            is alpha
        }

        for (p = pixels.length - 4; p >= 0; p -= 4) {
            if ((p > pixelsPerLine) && ((p % pixelsPerLine) >= 4)) {
                delta = Math.floor(Math.abs(pixels[p] - pixels[p - 4]) + Math.abs(pixels[p] - pixels[p - pixelsPerLine]) / 2);
                delta = Math.min(delta, 255); // avoid underflow
                val = 255 - delta;
            } else {
                val = 255;
            }
            pixels[p] = val;
            pixels[p + 1] = val;
            pixels[p + 2] = val;
            gridX = Math.floor(((p % pixelsPerLine) / 4) / this.gridSizeX);
            gridY = Math.floor((p / pixelsPerLine) / this.gridSizeY);
            gridI = (gridY * this.gridWidth) + gridX;
            bucket = Math.min(Math.floor((255 - val) / 8), 7);

            this.grid[gridI].buckets[bucket] += 1;
        }

        //this.ctx.putImageData(canvasData, 0, 0);
    };

    this.sortFunction = function (a, b) {
        return (b.sum - a.sum);
    };

    this.process = function (canvas, gridWidth, gridHeight) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;

        var x,
            y,
            picked,
            i,
            j,
            sum,
            avg = 0,
            factor = [0, 0.3, 0.5, 0.7, 1, 3, 5, 7];

        this.grid = [];
        for (y = 0; y < this.gridHeight; y += 1) {
            for (x = 0; x < this.gridWidth; x += 1) {
                picked = false;
                if ((y < 4) || (y > (this.gridHeight - 4)) || (x < 4) || (x > (this.gridWidth - 4))) { picked = true; }
                this.grid.push({ sum: 0, x: x, y: y, picked: picked, reserved: false, buckets: [0, 0, 0, 0, 0, 0, 0, 0]});
            }
        }

        this.gridSizeX = this.canvas.width / this.gridWidth;
        this.gridSizeY = this.canvas.height / this.gridHeight;

//        console.log("imageWorker.process ");

        this.fillBuckets();
//        console.log("imageWorker buckets filled ");

        for (i = 0; i < this.grid.length; i += 1) {
            sum = 0;
            for (j = 0; j < 8; j += 1) {
                sum += this.grid[i].buckets[j] * factor[j];
                this.grid[i].sum = Math.floor(sum);
            }
            avg += this.grid[i].sum;
        }
        avg = Math.floor(avg / this.grid.length);

        this.grid.sort(this.sortFunction);
/*
        for (i = 0; i < this.grid.length; i += 1) {
            this.ctx.font = "14px impact";
            this.ctx.textAlign = "center";

            if (this.grid[i].sum >= avg) {
                this.ctx.fillStyle = "red";
            } else {
                this.ctx.fillStyle = "black";
            }
            this.ctx.fillText(this.grid[i].sum.toString(), (this.grid[i].x * this.gridSizeX) + Math.floor(this.gridSizeX / 2), (this.grid[i].y * this.gridSizeY) + Math.floor((this.gridSizeY * 2) / 3));
        }
*/		
/*
        for (i = 0; i < (this.gridHeight * this.gridWidth); i += 1) {
            console.log('i: ' + i + ', sum: ' + this.grid[i].sum + ', x:' + this.grid[i].x + ', y: ' + this.grid[i].y + ', bucket [' + this.grid[i].buckets[0] + ',' +
                this.grid[i].buckets[1] + ',' +
                this.grid[i].buckets[2] + ',' +
                this.grid[i].buckets[3] + ',' +
                this.grid[i].buckets[4] + ',' +
                this.grid[i].buckets[5] + ',' +
                this.grid[i].buckets[6] + ',' +
                this.grid[i].buckets[7] + ']');
        }
*/		
    };

    this.pick = function () {
        var i,
            j,
            limit = Math.floor((this.grid.length * 5) / 100),
            limitMax = Math.floor((this.grid.length * 50) / 100),
            checkReserved = true,
			l = 0,
			minSum = 400;
        do {
			limit = Math.min(limit, this.grid.length);
            i = Math.floor(Math.random() * limit);
			l += 1;
			if (l >= 20) {
				l = 0;
				limit += 1;
				minSum = Math.max(0, minSum - 5);
			}
            if (limit >= limitMax) {
                //limit = limitMax;
                checkReserved = false; // release area lock
            }
        } while ((this.grid[i].picked) || (this.grid[i].sum < minSum) || ((this.grid[i].reserved) && checkReserved));
		
		//console.log('i :' + i + ', limit: ' + limit + ', sum: ' + this.grid[i].sum + ', x:' + this.grid[i].x + ', y: ' + this.grid[i].y);
		

        for (j = 0; j < this.grid.length; j += 1) {
            if ((Math.abs(this.grid[j].x - this.grid[i].x) <= 1) && (Math.abs(this.grid[j].y - this.grid[i].y) <= 1)) {
                // this.grid[j] is a neighbour of this.grid[i]
                this.grid[j].reserved = true;
            }
        }

        // found unpicked item in grid
        this.grid[i].picked = true;
        return this.grid[i];
    };
}

function fwFillText(context, text, x, y, font, style, align) {
    "use strict";
    context.font = font;
    context.fillStyle = style;
    context.textAlign = align;
    context.fillText(text, x, y);
}

function fwStrokeText(context, text, x, y, font, strokeStyle, lineWidth, align) {
    "use strict";
    context.font = font;
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth * 2;
    context.textAlign = align;
    context.strokeText(text, x, y);
}

function fwStrokeFillText(context, text, x, y, font, strokeStyle, lineWidth, fillStyle, align) {
    "use strict";
    context.font = font;
    context.textAlign = align;
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    context.fillStyle = fillStyle;
    context.fillText(text, x, y);
    context.strokeText(text, x, y);
}
/*
function fwStrokeFillRectRounded(lctx, x, y, w, h, radius, strokeStyle, lineWidth, fillStyle) {
    "use strict";
    var r = x + w,
        b = y + h;
    lctx.beginPath();
    lctx.moveTo(x + radius, y);
    lctx.lineTo(r - radius, y);
    lctx.quadraticCurveTo(r, y, r, y + radius);
    lctx.lineTo(r, y + h - radius);
    lctx.quadraticCurveTo(r, b, r - radius, b);
    lctx.lineTo(x + radius, b);
    lctx.quadraticCurveTo(x, b, x, b - radius);
    lctx.lineTo(x, y + radius);
    lctx.quadraticCurveTo(x, y, x + radius, y);
    if (lineWidth > 0) {
        lctx.strokeStyle = strokeStyle;
        lctx.lineWidth = lineWidth;
        lctx.stroke();
    }
    if (fillStyle !== undefined) {
        lctx.fillStyle = fillStyle;
        lctx.fill();
    }
}
*/
function fwStrokeFillRectRounded(lctx, x, y, w, h, radius, strokeStyle, lineWidth, fillStyle, radiusRight) {
    "use strict";
    var r = x + w,
        b = y + h,
        radiusR = (radiusRight !== undefined) ? radiusRight : radius;
    lctx.beginPath();
    lctx.moveTo(x + radius, y);
    lctx.lineTo(r - radiusR, y);
    lctx.quadraticCurveTo(r, y, r, y + radiusR);
    lctx.lineTo(r, y + h - radiusR);
    lctx.quadraticCurveTo(r, b, r - radiusR, b);
    lctx.lineTo(x + radius, b);
    lctx.quadraticCurveTo(x, b, x, b - radius);
    lctx.lineTo(x, y + radius);
    lctx.quadraticCurveTo(x, y, x + radius + 1, y);
    if (lineWidth > 0) {
        lctx.strokeStyle = strokeStyle;
        lctx.lineWidth = lineWidth;
        lctx.stroke();
    }
    if (fillStyle !== undefined) {
        lctx.fillStyle = fillStyle;
        lctx.fill();
    }
}

function fwFillRect(context, x, y, w, h, style) {
    "use strict";
    context.fillStyle = style;
    context.fillRect(x, y, w, h);
}

function fwStrokeRect(context, x, y, w, h, strokeStyle, lineWidth) {
    "use strict";
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    context.beginPath();
    context.rect(x, y, w, h);
    context.stroke();
}

function fwStrokeFillRect(context, x, y, w, h, strokeStyle, lineWidth, fillStyle) {
    "use strict";
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    context.fillStyle = fillStyle;
    context.beginPath();
    context.rect(x, y, w, h);
    context.fill();
    context.stroke();
}

function fwFillArc(context, x, y, r, fillStyle) {
    "use strict";
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.fillStyle = fillStyle;
    context.fill();
}

function fwStrokeArc(context, x, y, r, strokeStyle, lineWidth) {
    "use strict";
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.stroke();
}

function fwStrokeFillArc(context, x, y, r, strokeStyle, lineWidth, fillStyle) {
    "use strict";
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.lineWidth = lineWidth;
    context.fillStyle = fillStyle;
    context.strokeStyle = strokeStyle;
    context.fill();
    context.stroke();
}

function fwDrawExampleButton(context) {
    "use strict";
    var text = "E";
    if (language === LANG_NL) {
        text = "V";
    } else if ((language === LANG_DE) || (language === LANG_SDE)) {
        text = "B";
    }
    fwFillRect(context, MODE_BUTTON_X, MODE_BUTTON_Y, MODE_BUTTON_W, MODE_BUTTON_H, buttonColor);
    fwFillText(context, text, MODE_BUTTON_X + 32, MODE_BUTTON_Y + 46, "36px " + font, "white", "center");
}

function fwDrawGameLevel() {
    "use strict";
    /*
    fwFillRect(context, MODE_BUTTON_X, MODE_BUTTON_Y, 64, 64, buttonColor);
    displayGameLevel();
    */
}

function fwDrawLogoButton() {
    "use strict";
    /*
    if (extLogoImage !== undefined) {
        context.drawImage(extLogoImage, MODE_BUTTON_X, MODE_BUTTON_Y);
    } else {
        // By default draw digipuzzle.net logo
        fwFillRect(context, MODE_BUTTON_X, MODE_BUTTON_Y, 64, 64, buttonColor);
        fwFillRect(context, MODE_BUTTON_X +  5, MODE_BUTTON_Y +  5, 25, 25, "red");
        fwFillRect(context, MODE_BUTTON_X + 34, MODE_BUTTON_Y +  5, 25, 25, "yellow");
        fwFillRect(context, MODE_BUTTON_X +  5, MODE_BUTTON_Y + 34, 25, 25, "green");
        fwFillRect(context, MODE_BUTTON_X + 34, MODE_BUTTON_Y + 34, 25, 25, "blue");
    }
    */
}

function fwDrawBgImage(context) {
    "use strict";
    if (skinFullBackgroundColor === undefined) {
        context.drawImage(puzzleImage, 0, 0, puzzleCanvas.width, puzzleCanvas.height, 5, 5, canvas.width - 10, canvas.height - 10);
        context.fillStyle = 'rgba(255,255,255,0.8)';
        context.fillRect(5, 5, canvas.width - 10, canvas.height - 10);
    } else {
        fwFillRect(bgctx, 5, 5, canvas.width - 10, canvas.height - 10, skinFullBackgroundColor);
    }
}

function fwDrawBottomAdd() {
    "use strict";
    bgctx.fillStyle = borderColor;
    bgctx.fillRect(BOTTOM_ADD_X - 2, BOTTOM_ADD_Y - 2, BOTTOM_ADD_W + 4, BOTTOM_ADD_H + 4);
    bgctx.drawImage(allPuzzlesAddImage, BOTTOM_ADD_X, BOTTOM_ADD_Y);
    // set box to capture mouse clicks
    bottomAddBox = { x: BOTTOM_ADD_X, y: BOTTOM_ADD_Y, w: BOTTOM_ADD_W, h: BOTTOM_ADD_H };
}

function fwDrawCredits(ctx, yOffset) {
    "use strict";
    var lctx = bgctx;
    if (ctx !== undefined) { lctx = ctx; }

    if (photoCreditLine !== undefined) {
        fwFillText(bgctx, photoCreditLine, 10 + (768 / 2), yOffset, "10pt " + font, borderColor, "center");
    }
}

function fwRegisterGame(onConfigure) {
    "use strict";
    g_onConfigure = onConfigure;
}

function fwGetAlphabet(lang) {
    "use strict";
    var abc;
    switch (lang) {
    case LANG_DK:
    case LANG_NO:
        abc = "abcdefghijklmnopqrstuvwxyzæøå";
        break;
    case LANG_ES:
        abc = "abcdefghijklmnñopqrstuvwxyz";
        break;
    case LANG_DE:
        abc = "abcdefghijklmnopqrstuvwxyzäöü";
        break;
    case LANG_SDE:
        abc = "abcdefghijklmnopqrstuvwxyz";
        break;
    case LANG_IS:
        abc = "aábdðeéfghiíjklmnoóprstuúvxyýþæö";
        break;
    case LANG_SE:
        abc = "abcdefghijklmnopqrstuvwxyzåäö";
        break;
    case LANG_SI:
        abc = "abcčdefghijklmnoprsštuvzž";
        break;
    default:
        abc = "abcdefghijklmnopqrstuvwxyz";
        break;
    }
    return abc;
}

function fwGetSum(settings) {
    "use strict";
    var i, j, minVal, minSum, maxSum, nArray, doAddition, found, a, b, c, d, questionText, pick, question = {}, answers, forceCrossing=false, answer;
    minVal = 1;
    switch (settings.range) {
        case 0:
            if (settings.useZero === true) {
                minVal = 0;
            }
            minSum = 0;
            maxSum = 10;
            nArray = [+1, -1, +2, -2, +3, -3];
            break;
        case 1: // case SELECTIONS.RANGE_2:
            if (!settings.cross10selected) {
                minVal = 10;
                minSum = 10;
                maxSum = 20;
            } else {
                minSum = 1;
                maxSum = 20;
            }
            nArray = [+1, -1, +2, -2, +10, -10, -5, +5];
            break;
        default: // case SELECTIONS.RANGE_3:
            minSum = 10;
            maxSum = 100;
            nArray = [+1, -1, +2, -2, +10, -10, +20, -20];
            break;
        case 3: // case SELECTIONS.RANGE_4:
            minSum = 100;
            maxSum = 1000;
            nArray = [+1, -1, +2, -2, +10, -10, +20, -20, +100, -100, +200, -200];
            break;
    }

    answers = [];
    do {
        if (settings.cross10selected) {
            forceCrossing = (Math.random() >= 0.4);
        }
        // select addition or subtraction
        if (settings.plusMinusTable[0] && settings.plusMinusTable[1]) {
            // plus and minus both selected; take random operation
            doAddition = (Math.random() > 0.5);
        } else {
            // use selected operation
            doAddition = settings.plusMinusTable[0];
        }
        found = true;

        if ((settings.missingAddends === true) || (settings.missingAddendsFixed === true)) {
            if (settings.missingAddendsFixed === true) {
                c = maxSum;
            } else {
                c = 2 + Math.floor(Math.random() * (maxSum - 1));
            }
            a = 1 + Math.floor(Math.random() * (c - 1));
            b = c - a;
            answer = b; // b is the answer, and needs to be unique
            if (doAddition) {
                questionText = a.toString() + " + ? = " + c.toString();
            } else {
                questionText = c.toString() + " - ? = " + a.toString();
            }
        } else {
            a = minVal + Math.floor(Math.random() * ((maxSum - minVal) + 1));
            b = 1 + Math.floor(Math.random() * maxSum);

            if (doAddition) {
                // addition
                c = a + b;
                questionText = a.toString() + " + " + b.toString();
            } else {
                // subtraction
                c = a - b;
                questionText = a.toString() + " - " + b.toString();
            }
            if ((c > maxSum) || (c < minSum) ) {
                found = false;
            }
            answer = c; // c is the answer and needs to be unique
        }
        if (!fwQuestionListCheck(answer)) {
            found = false;
        }

        if (found && (settings.range !== 0) && (settings.missingAddendsFixed !== true)) { //  skip check on range till 10
            if (!settings.cross10selected) {
                if (language === LANG_EN) {
                    if (doAddition) {
                        if ((a % 10) + (b % 10) >= 10) {
                            found = false;
                        }
                    } else {
                        if (((a % 10) - (b % 10) < 0)) {
                            found = false;
                        }
                    }
                } else {
                    if (doAddition) {
                        if (((a % 10) + (b % 10)) > 10) {
                            found = false;
                        }
                    } else {
                        if ((((a % 10) - (b % 10)) < 0) && ((a % 10) !== 0)) {
                            found = false;
                        }
                    }
                }
            } else {
                // make sure enough crossings are done
                if (forceCrossing) {
                    if (doAddition) {
                        if (((a % 10) + (b % 10) <= 10) || ((a % 10) === 0)) {
                            found = false;
                        }
                    } else {
                        if (((a % 10) - (b % 10) >= 0) || ((a % 10) === 0)) {
                            found = false;
                        }
                    }
                }
            }
        }
    } while (!found);
    answers.push(answer);
    // correctAnswer = {question: questionText, answer: c.toString(), n: c};
    fwQuestionListAdd(answer);

    // Add 2 random numbers to nArray
    for (i = 0; i < 2; i += 1) {
        a = minSum + Math.floor(Math.random() * (maxSum - minSum));
        nArray.push(a);
    }

    for (i = 0; i < (settings.nrAnswers - 1); i += 1) {
        do {
            found = true;
            if (nArray.length > 0) {
                pick = Math.floor(Math.random() * nArray.length);
                d = answer + nArray[pick];
                nArray.splice(pick, 1);
            } else {
                // backup
                d = minSum + Math.floor(Math.random() * (maxSum - minSum));
            }
            if ((d < minSum) || (d > maxSum)) {
                found = false;
            } else {
                for (j = 0; j < answers.length; j += 1) {
                    if (answers[j].toString() === d.toString()) { found = false; }
                }
            }
        } while (!found);
        answers.push(d);
    }
    question.text = questionText;
    question.answers = answers;
    return question;
}

function fwGetSoundSource(fileName) {
    var source;
    if (document.location.pathname.indexOf("D:") >= 0) {
        source = "D://Digipuzzle/" + fileName;
    } else {
        source = "//www.digipuzzle.net/" + fileName;
    }
    return source;
}
