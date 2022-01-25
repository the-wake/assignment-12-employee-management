INSERT INTO department (name)
VALUES ('Midrange'),
       ('Aggressive'),
       ('Zoner');

INSERT INTO role (title, salary, department_id)
VALUES ('Brawler', 100000, 1),
       ('Combo-er', 80000, 1),
       ('Rushdown', 95000, 2),
       ('Bait-and-Punisher', 90000, 2),
       ('Projectile Spammer', 60000, 3),
       ('Disjoint Abuser', 72000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ike', 'G.', 6, NULL),
       ('Roy', 'E.', 3, 1),
       ('Mario', 'Mario', 1, NULL),
       ('Luigi', 'Mario', 2, 3),
       ('Samus', 'Aran', 5, NULL),
       ('Simon', 'Belmont', 5, 5);
