CREATE TABLE role (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO role (name, description) VALUES
  ('admin', 'Has full access to all features'),
  ('user', 'Can only view content');

  ALTER TABLE users ADD COLUMN role_id INT(11) NOT NULL DEFAULT 2;