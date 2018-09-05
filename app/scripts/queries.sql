SELECT SUM(g.amount)
FROM 
    (SELECT p.Username,
         p.id
    FROM player AS p
    WHERE p.Username = 'anthager') AS anthager, game AS g
WHERE anthager.id = g.winner
        OR anthager.id = g.loser;

-- Get all won games
SELECT g.loser, g.amount
FROM (
    SELECT p.id
    FROM player as p
    WHERE p.username = 'anthager'
) AS anthager, game AS g
WHERE anthager.id = g.winner

-- Get all lost games
SELECT g.winner, g.amount
FROM (
    SELECT p.id
    FROM player as p
    WHERE p.username = 'anthager'
) AS anthager, game AS g
WHERE anthager.id = g.loser

SELECT name, id
FROM player
WHERE is_deleted = false AND NOT player.id = 2 