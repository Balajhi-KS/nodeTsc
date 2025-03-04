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