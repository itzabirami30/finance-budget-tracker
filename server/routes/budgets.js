const express = require('express');
const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Middleware to protect routes
router.use(authMiddleware);

// Get budgets for a specific month
router.get('/', async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ error: 'Month and year are required' });
    }

    const budgets = await Budget.find({
      userId: req.userId,
      month,
      year: parseInt(year),
    });

    // Calculate spending for each budget
    const budgetsWithSpending = await Promise.all(
      budgets.map(async (budget) => {
        const spending = await Transaction.aggregate([
          {
            $match: {
              userId: req.userId,
              category: budget.category,
              type: 'expense',
              date: {
                $gte: new Date(year, parseInt(month) - 1, 1),
                $lt: new Date(year, parseInt(month), 1),
              },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$amount' },
            },
          },
        ]);

        return {
          ...budget.toObject(),
          spent: spending[0]?.total || 0,
        };
      })
    );

    res.json(budgetsWithSpending);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create or update budget
router.post('/', async (req, res) => {
  try {
    const { category, limit, month, year } = req.body;

    if (!category || !limit || !month || !year) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingBudget = await Budget.findOneAndUpdate(
      { userId: req.userId, category, month, year },
      { limit, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    res.status(201).json(existingBudget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete budget
router.delete('/:id', async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    res.json({ message: 'Budget deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
