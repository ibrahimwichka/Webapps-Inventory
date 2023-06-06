CREATE TABLE Users (
    usr_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(45) NULL,
    usr_height VARCHAR(45) NULL,
    password VARCHAR(45) NULL,
    usr_weight VARCHAR(45) NULL,
    usr_dob DATE NULL,
    PRIMARY KEY (usr_id)
)