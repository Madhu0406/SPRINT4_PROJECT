USE snb_db
GO


CREATE TABLE user_info (
    id INT PRIMARY KEY IDENTITY(1,1),
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    phoneNumber VARCHAR(15)
);
GO


SET IDENTITY_INSERT user_info ON;
GO

INSERT INTO user_info (id, firstName, lastName, password, email, phoneNumber) VALUES
(1, 'Arjun', 'Mehta', 'Pass@123', 'arjun.mehta@example.com', '9812345678'),
(2, 'Riya', 'Sharma', 'Riya#2024', 'riya.sharma@example.com', '9876543210'),
(3, 'Kabir', 'Singh', 'Kabir@456', 'kabir.singh@example.com', '9700011223'),
(4, 'Ananya', 'Rao', 'Ana2025!*', 'ananya.rao@example.com', '9733344455');
GO

SET IDENTITY_INSERT user_info OFF;
GO
