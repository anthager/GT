SELECT SUM(agg.amount) as sum
FROM 
    ((SELECT amount
    FROM game
    WHERE winner = 1)
    UNION ALL
    (SELECT -amount as amount
    FROM game
    WHERE loser = 1)) as agg


-- Get opponents games
SELECT opponents.id as id, opponents.name as name, SUM(opponents.amount) as amount
FROM (
    SELECT o.id as id, o.name as name, g.amount as amount
    FROM
        (SELECT loser as id, SUM(amount) as amount
        FROM game
        WHERE winner = 1
        GROUP BY loser) as g,
        (SELECT id, name
        FROM player) as o
    WHERE o.id = g.id
    UNION ALL
    SELECT o.id as id, o.name as name, g.amount as amount
    FROM
        (SELECT winner as id, SUM(-amount) as amount
        FROM game
        WHERE loser = 1
        GROUP BY winner) as g,
        (SELECT id, name
        FROM player) as o
    WHERE o.id = g.id
    ) as opponents
GROUP BY opponents.id, opponents.name;






SELECT o.id as id, o.name as name, g.amount as amount
FROM
    (SELECT winner as id, SUM(-amount) as amount
    FROM game
    WHERE loser = 1
    GROUP BY winner) as g,
    (SELECT id, name
    FROM player) as o
WHERE o.id = g.id




SELECT o.id as id, o.name as name, SUM(g.amount * -1) as amount
FROM
    (SELECT winner as id, amount
    FROM game
    WHERE loser = 1) as g,
    (SELECT id, name
    FROM player) as o
WHERE o.id = g.id
GROUP BY o.id, o.name;

