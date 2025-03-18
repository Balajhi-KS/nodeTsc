export const createLenderDetails = `
INSERT INTO expenses."lendUserDetail" (name,user_id)
SELECT :name, :userId
WHERE NOT EXISTS (
    SELECT 1 FROM expenses."lendUserDetail" 
    WHERE name = :name AND user_id = :userId
) RETURNING *;`;

export const createLenderAmount = `
Insert into expenses."lendExpense" (amount,is_income,lend_user_id) 
select :amount,:isIncome,:lenderId from expenses."lendUserDetail" where id =:lenderId and user_id= :userId;`;

export const getLenderDetails = `
SELECT jsonb_build_object( 'rows', jsonb_agg( jsonb_build_object( 'id', u.id, 'name', u.name, 'amount', COALESCE(l.total_amount, 0) ) ) ) AS result FROM expenses."lendUserDetail" u LEFT JOIN ( SELECT lend_user_id, SUM(CASE WHEN is_income THEN amount::NUMERIC ELSE -amount::NUMERIC END) AS total_amount FROM expenses."lendExpense" GROUP BY lend_user_id ) l ON u.id = l.lend_user_id WHERE u.user_id = :userId;`;

export const getLendAmountQuery = `
SELECT id,amount,is_income,created FROM expenses."lendExpense" le
WHERE le.lend_user_id=:lenderId and EXISTS (
    SELECT 1 FROM expenses."lendUserDetail" lud
    WHERE lud.user_id = :userId AND lud.id = le.lend_user_id
) ORDER BY created DESC ;`;

export const updateLendingAmount=`
UPDATE expenses."lendExpense" le SET amount = :amount FROM expenses."lendUserDetail" lud WHERE le.id = :id AND lud.user_id = :lenderId AND lud.id = le.lend_user_id;
`