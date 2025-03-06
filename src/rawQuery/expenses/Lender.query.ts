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
SELECT 
    jsonb_build_object(
        'borrower', COALESCE(SUM(DISTINCT l.amount::NUMERIC * (CASE WHEN l.is_income = FALSE THEN 1 ELSE 0 END)), 0),
        'lend', COALESCE(SUM(DISTINCT l.amount::NUMERIC * (CASE WHEN l.is_income = TRUE THEN 1 ELSE 0 END)), 0),
        'rows', jsonb_agg(DISTINCT jsonb_build_object('id', u.id, 'name', u.name))
    ) AS result
FROM expenses."lendUserDetail" u
LEFT JOIN expenses."lendExpense" l ON u.id = l.lend_user_id
WHERE u.user_id = :userId;`