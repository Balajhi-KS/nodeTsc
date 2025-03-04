export const GET_LENGING = `
WITH inserted_lend AS (
    INSERT INTO expenses."lendExpense" (name, amount, is_paid, is_income)
    VALUES ('arun', 1000, false, false)  -- Ensure amount is an integer (no quotes)
    RETURNING id, amount
)
INSERT INTO expenses."expenses" (spend, reason, user_id, is_income)
SELECT inserted_lend.amount::INTEGER, 'paid to arun', 2, false FROM inserted_lend returning *;`