const userController = require('../controllers/userController');

const express = require('express');
const router = express.Router();

// SIGN UP ============================================
router.get('/sign-up', userController.sign_up_get);
router.post('/sign-up', userController.sign_up_post);

// LOG IN ============================================
router.get('/log-in', userController.log_in_get);
router.post('/log-in', userController.log_in_post);
router.get('/log-out', userController.log_out_get);

// STATUS ============================================
router.get('/:id/change-status', userController.update_status_get);
router.post('/:id/change-status', userController.update_status_post);

// ACCOUNT EDITING ===================================
router.get('/:id/account', userController.update_account_get);
router.post('/:id/account', userController.update_account_post);


module.exports = router;