const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../Middlewares/adminAuth');
const { getAdminStats, refreshContests, refreshLeaderboard, refreshStats, sendNotification, refreshDailyProblems, refreshMyDailyProblems, refreshDailyTopics, refreshMyDailyTopic, getErrorLogs, clearErrorLogs, getActiveUsers, syncCFProblems, syncLCProblems, syncCCProblems, syncLCContestTags, getCatalogSyncStatus } = require('../Controllers/adminController');


router.get('/stats', verifyAdmin, getAdminStats);
router.post('/refresh/contests', verifyAdmin, refreshContests);
router.post('/refresh/leaderboard', verifyAdmin, refreshLeaderboard);
router.post('/refresh/stats', verifyAdmin, refreshStats);
router.post('/refresh/daily', verifyAdmin, refreshDailyProblems);
router.post('/refresh/daily-me', verifyAdmin, refreshMyDailyProblems);
router.post('/refresh/topics', verifyAdmin, refreshDailyTopics);
router.post('/refresh/daily-topic-me', verifyAdmin, refreshMyDailyTopic);
router.post('/notify', verifyAdmin, sendNotification);
router.get('/errors', verifyAdmin, getErrorLogs);
router.delete('/errors', verifyAdmin, clearErrorLogs);

router.get('/active-users', verifyAdmin, getActiveUsers);

router.post('/sync/cf-problems',       verifyAdmin, syncCFProblems);
router.post('/sync/lc-problems',       verifyAdmin, syncLCProblems);
router.post('/sync/cc-problems',       verifyAdmin, syncCCProblems);
router.post('/sync/lc-contest-tags',   verifyAdmin, syncLCContestTags);
router.get('/sync/catalog-status',     verifyAdmin, getCatalogSyncStatus);

module.exports = router;
