const constants = Object.freeze({
  ONE_DAY_MINS: 24 * 60,
  ONE_DAY_MILLIS: 24 * 60 * 60 * 1000,
  BADGE_COLORS: Object.freeze({
    REMINDER: '#F41A22',
    COUNT: '#2196F3',
  }),
  BADGE_REMINDER_TEXT: '!',
  ALARMS: Object.freeze({
    REMINDER: 'reminder-alarm',
    SCHEDULED_SEARCH: 'scheduled-search-alarm',
    FETCH_DAILY_TRENDS: 'fetch-daily-trends-alarm',
  }),
  CLICK_DELAY: 500,
  DEFAULT_PREFERENCES: Object.freeze({
    desktopIterations: 50,
    mobileIterations: 40,
    delay: 1000,
    autoClick: true,
    randomGuesses: true,
    randomSearch: false,
    randomSearchDelayMin: 1200,
    randomSearchDelayMax: 2500,
    randomSearchIterationsMin: 35,
    randomSearchIterationsMax: 42,
    randomLettersSearch: false,
    blitzSearch: false,
    platformSpoofing: 'desktop-and-mobile',
    customQueries: '',
    searchWithCustomQueries: true,
    searchWithDailyTrends: true,
    searchWithTemplates: false,
    scheduleSearches: true,
    scheduledTime: '02:00',
    scheduledTimeOpensRewardTasks: true,
  }),
  MESSAGE_TYPES: Object.freeze({
    START_SEARCH: 0, // popup => background script
    STOP_SEARCH: 1, // popup => background script
    GET_SEARCH_COUNTS: 2, // popup => background script
    UPDATE_SEARCH_COUNTS: 3, // background script => popup
    CLEAR_SEARCH_COUNTS: 4, // background script => popup
    CORRECT_ANSWER_RECEIVED: 5, // window-variable-grabber script => content script
    OPEN_URL_IN_BACKGROUND: 6, // window-variable-grabber script => content script => background script
  }),
  REWARDS_URL: 'https://rewards.microsoft.com/?redref=amc',
  DAILY_TRENDS_API: 'https://trends.google.com/trends/api/dailytrends?geo=US',
  NUM_DAILY_TREND_FETCHES: 4,
  // TODO: add more mobile user agents
  MOBILE_USER_AGENTS: Object.freeze([
    'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36 Edg/86.0.622.51',
  ]),
  EDGE_USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36 Edg/86.0.622.51',
});
