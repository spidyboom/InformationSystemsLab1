-- 1. Удалить один (любой) объект, значение поля furnish которого эквивалентно заданному.
CREATE OR REPLACE FUNCTION delete_one_by_furnish(p_furnish VARCHAR)
RETURNS INTEGER AS $$
DECLARE
v_id INTEGER;
BEGIN
SELECT id INTO v_id FROM flat WHERE furnish = p_furnish LIMIT 1;
IF v_id IS NOT NULL THEN
DELETE FROM flat WHERE id = v_id;
END IF;
RETURN v_id;
END;
$$ LANGUAGE plpgsql;

-- 2. Вернуть количество объектов, значение поля furnish которых равно заданному.
CREATE OR REPLACE FUNCTION count_by_furnish(p_furnish VARCHAR)
RETURNS BIGINT AS $$
SELECT COUNT(*) FROM flat WHERE furnish = p_furnish;
$$ LANGUAGE sql;

-- 3. Вернуть массив объектов, значение поля name которых начинается с заданной подстроки.
CREATE OR REPLACE FUNCTION find_by_name_prefix(p_prefix VARCHAR)
RETURNS SETOF flat AS $$
SELECT * FROM flat WHERE name LIKE p_prefix || '%';
$$ LANGUAGE sql;

-- 4. Найти самую дорогую квартиру без балкона.
CREATE OR REPLACE FUNCTION find_most_expensive_without_balcony()
RETURNS SETOF flat AS $$
SELECT * FROM flat WHERE balcony = false ORDER BY price DESC LIMIT 1;
$$ LANGUAGE sql;

-- 5. Рассчитать суммарную стоимость всех квартир, имеющихся в базе.
CREATE OR REPLACE FUNCTION total_price()
RETURNS BIGINT AS $$
SELECT COALESCE(SUM(price), 0) FROM flat;
$$ LANGUAGE sql;