DROP TABLE cyborg CASCADE;
DROP TABLE enhancements CASCADE;

-- Step 1: Create Cyborg Table
CREATE TABLE cyborg (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_year INT,
    country VARCHAR(100),
    bio TEXT
);

-- Step 2: Create Enhancements Table
CREATE TABLE enhancements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    type VARCHAR(50),
    manufacturer VARCHAR(150),
    cyborg_id INT REFERENCES cyborg(id) ON DELETE CASCADE
);

-- Step 3: Insert Cyborgs
INSERT INTO cyborg (name, birth_year, country, bio)
VALUES
    ('Alice Steel', 1992, 'USA', 'A biohacker who modified herself for enhanced perception.'),
    ('Dr. Cyberstein', 1975, 'Germany', 'A scientist turned experiment.'),
    ('Z3-RO', 2050, 'Unknown', 'A mysterious entity rumored to be more machine than human.'),
    ('Kebabtron 9000', 2023, 'Night City', 'A street food vendor who took cybernetics to the next level.'),
    ('Ola Normann', 1980, 'Norway', 'An accountant living an extremely normal life. Enjoys spreadsheets and low-risk investments.');

-- Step 4: Insert Enhancements (Real-Life and Cyberpunk)
INSERT INTO enhancements (name, description, type, manufacturer)
VALUES
    -- Real-life medical enhancements
    ('Pacemaker', 'A device that helps control abnormal heart rhythms.', 'medical', 'Medtronic'),
    ('Automatic Insulin Pump', 'A system that delivers insulin automatically to manage diabetes.', 'medical', 'Insulet Corporation'),
    ('Cochlear Implant', 'A device that helps people with severe hearing loss by providing a sense of sound.', 'medical', 'Cochlear Ltd.'),
    ('Bionic Prosthetic Limb', 'An advanced robotic prosthetic controlled by nerve signals.', 'medical', 'Össur'),
    ('Retinal Implant', 'A vision-enhancing implant for people with degenerative eye diseases.', 'medical', 'Second Sight'),
    ('Deep Brain Stimulator (DBS)', 'Used for treating Parkinson’s and other neurological disorders.', 'medical', 'Medtronic'),
    ('Powered Exoskeleton', 'A wearable robotic suit that helps people with mobility impairments.', 'medical', 'ReWalk Robotics'),

    -- Futuristic and cyberpunk enhancements
    ('Neural Uplink', 'A brain-computer interface allowing direct thought communication.', 'other', 'NeuroLink Corp'),
    ('Laser Fingernail', 'A retractable mini laser embedded in a fingernail.', 'silly', 'Mad Scientist Inc'),
    ('Built-in Karaoke Speaker', 'A voice-enhancing system with auto-tune.', 'entertainment', 'SingTech Industries'),
    ('Grappling Hook Arm', 'An arm modification allowing users to climb buildings.', 'military', 'Wayne Enterprises'),
    ('Subdermal LED Tattoos', 'Programmable glowing tattoos under the skin.', 'entertainment', 'GlowTech Inc'),
    ('Third Eye Camera', 'A massive, top-of-the-head-mounted LIDAR camera for extreme 3D mapping. Very bulky.', 'silly', 'CyberVision Heavy Industries'),
    ('Cyber-Kebab Dispenser', 'A built-in compartment that dispenses fresh kebabs on demand.', 'silly', 'Night City Street Food Co.'),
    ('Shawarma Warmer Arm', 'A cybernetic arm with a built-in shawarma warmer to keep it fresh at all times.', 'silly', 'Nomad Eats Inc.');

-- Step 5: Assign Enhancements to Cyborgs
UPDATE enhancements
SET cyborg_id = (SELECT id FROM cyborg WHERE name = 'Alice Steel')
WHERE name IN ('Neural Uplink', 'Subdermal LED Tattoos');

UPDATE enhancements
SET cyborg_id = (SELECT id FROM cyborg WHERE name = 'Dr. Cyberstein')
WHERE name IN ('Pacemaker', 'Laser Fingernail');

UPDATE enhancements
SET cyborg_id = (SELECT id FROM cyborg WHERE name = 'Z3-RO')
WHERE name IN ('Third Eye Camera', 'Grappling Hook Arm');

UPDATE enhancements
SET cyborg_id = (SELECT id FROM cyborg WHERE name = 'Kebabtron 9000')
WHERE name IN ('Cyber-Kebab Dispenser', 'Shawarma Warmer Arm');

UPDATE enhancements
SET cyborg_id = (SELECT id FROM cyborg WHERE name = 'Ola Normann')
WHERE name IN ('Automatic Insulin Pump');

-- Step 6: Query to See All Cyborgs with Their Enhancements
SELECT id, name, birth_year, country, bio
FROM public.cyborg;

-- SELECT id, name, description, type, manufacturer, cyborg_id
-- FROM public.enhancements;

SELECT c.name AS cyborg_name, c.birth_year, c.country, e.name AS enhancement, e.type, e.manufacturer
FROM cyborg c
LEFT JOIN enhancements e ON c.id = e.cyborg_id
ORDER BY c.name;
