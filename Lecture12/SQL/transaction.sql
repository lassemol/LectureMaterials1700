BEGIN;

INSERT INTO cyborg (name, birth_year, country, bio)
VALUES ('TestBot', 2024, 'Testland', 'This is a test bot created during a demo.');

-- cyborg_id 6 is manually set for the examples, this would typically be looked up first
INSERT INTO enhancements (name, description, type, manufacturer, cyborg_id)
VALUES
    ('Test Enhancement 1', 'A valid enhancement.', 'demo', 'DemoCorp', 6),
    ('Duplicate Enhancement', 'Fails because name must be unique.', 'demo', 'OopsCorp', 6);

COMMIT;


BEGIN;

-- Insert a new cyborg
INSERT INTO cyborg (name, birth_year, country, bio)
VALUES ('TestBot2', 2024, 'Testland', 'This is a test bot created during a demo.');

INSERT INTO enhancements (name, description, type, manufacturer, cyborg_id)
VALUES
    ('Duplicate Enhancement', 'Fails because name must be unique.', 'demo', 'OopsCorp', 7);
-- This second insert fails if "Duplicate Enhancement" already exists

COMMIT;