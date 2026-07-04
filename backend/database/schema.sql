-- Run this on a fresh Aiven MySQL if AutoMigrate isn't available
-- Note: GORM AutoMigrate handles this automatically on first run,
-- but you can pre-create if you want to inspect the schema.

CREATE TABLE IF NOT EXISTS donors (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    created_at      DATETIME(3) NULL,
    updated_at      DATETIME(3) NULL,
    deleted_at      DATETIME(3) NULL,
    name            VARCHAR(255) NOT NULL,
    phone           VARCHAR(255) NOT NULL,
    email           VARCHAR(255),
    blood_group     VARCHAR(10)  NOT NULL,
    age             INT,
    gender          VARCHAR(20),
    area            VARCHAR(255) NOT NULL,
    city            VARCHAR(255),
    last_donation   DATETIME(3),
    available       BOOLEAN DEFAULT TRUE,
    notes           TEXT,
    INDEX idx_blood_group (blood_group),
    INDEX idx_area (area),
    INDEX idx_deleted_at (deleted_at)
);

CREATE TABLE IF NOT EXISTS blood_requests (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    created_at      DATETIME(3) NULL,
    updated_at      DATETIME(3) NULL,
    deleted_at      DATETIME(3) NULL,
    patient_name    VARCHAR(255) NOT NULL,
    blood_group     VARCHAR(10)  NOT NULL,
    units           INT NOT NULL,
    hospital        VARCHAR(255) NOT NULL,
    contact         VARCHAR(255) NOT NULL,
    area            VARCHAR(255) NOT NULL,
    needed_by       VARCHAR(255),
    urgency         VARCHAR(20) DEFAULT 'normal',
    status          VARCHAR(20) DEFAULT 'open',
    requested_by    VARCHAR(255),
    INDEX idx_req_blood (blood_group),
    INDEX idx_req_status (status),
    INDEX idx_req_deleted (deleted_at)
);
