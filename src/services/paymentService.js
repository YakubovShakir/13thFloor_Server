import User from "../models/user/userModel"

export const getUserStarsSpent = async (userId) => {
    if (!userId) {
        throw new Error('User id is required');
    }

    try {
        const transactions = await StarsTransactions.aggregate([
            {
                $match: {
                    user_id: Number(userId), // Convert to number if userId is a string
                    currency: currency,
                    status: "complete",
                    currency: 'XTR'
                }
            },
            {
                $group: {
                    _id: "$user_id",
                    totalSpent: {
                        $sum: { $toDouble: "$amount" } // Convert string amount to double for summation
                    }
                }
            }
        ]);

        if (transactions.length === 0) {
            return 0;
        }

        return transactions[0].totalSpent;
    } catch (error) {
        throw new Error(`Failed to calculate total spent: ${error.message}`);
    }
};

export const getUsersTONSpent = async (userId) => {
    if (!userId) {
        throw new Error('User id is required');
    }

    try {
        const transactions = await StarsTransactions.aggregate([
            {
                $match: {
                    user_id: Number(userId), // Convert to number if userId is a string
                    currency: currency,
                    status: "complete",
                    currency: 'TON'
                }
            },
            {
                $group: {
                    _id: "$user_id",
                    totalSpent: {
                        $sum: { $toDouble: "$amount" } // Convert string amount to double for summation
                    }
                }
            }
        ]);

        if (transactions.length === 0) {
            return 0;
        }

        return transactions[0].totalSpent;
    } catch (error) {
        throw new Error(`Failed to calculate total spent: ${error.message}`);
    }
};