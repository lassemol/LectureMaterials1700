DROP TABLE enhancements CASCADE;

-- Step 1: Create Enhancements Table
CREATE TABLE enhancements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    type VARCHAR(50),
    manufacturer VARCHAR(150)
);

-- Step 2: Insert Enhancements (Real-Life and Cyberpunk)
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

-- Step 3: Query to See All Enhancements
SELECT id, name, description, type, manufacturer
FROM public.enhancements;

