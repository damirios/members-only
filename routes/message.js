const messageController = require('../controllers/messageController');

const express = require('express');
const router = express.Router();

// NEW MESSAGE ============================================
router.get('/create', messageController.create_message_get);
router.post('/create', messageController.create_message_post);

// MESSAGES LIST ==========================================
router.get('/list', messageController.messages_list_get);

// MESSAGE DELETE =========================================
router.post('/:id/delete', messageController.message_delete_post);

module.exports = router;