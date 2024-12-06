INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 1, 'admin@gmail.com', 'Hoang Gia', 'Bao', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'Admin', '2024-10-10 09:30:00', 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@gmail.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify, vip)
SELECT 2, 'hgbaodevservice@gmail.com', 'Hoang Gia', 'Bao', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User', '2024-10-10 09:30:00', 1, 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'hgbaodevservice@gmail.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 3, 'TLieuNhuYen@example.com', 'Trần Liễu', 'Như Yên', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User', '2024-10-10 09:30:00', 1
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'TLieuNhuYen@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 4, 'LongNgaoThien@example.com', 'Long', 'Ngạo Thiên', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User', '2024-11-25 09:30:00', 1
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'LongNgaoThien@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 5, 'haonhienau23@example.com', 'Âu', 'Hạo Nhiên', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User', '2024-11-25 09:30:00', 1
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'haonhienau23@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 6, 'vuong8dan@example.com', 'Vương', 'Bát Đản', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User', '2024-11-25 09:30:00', 1
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'vuong8dan@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 7, 'tranminhan@example.com', 'Trần', 'Minh An', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User', '2024-11-25 09:30:00', 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'tranminhan@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 8, 'nguyenhoanganh@example.com', 'Nguyễn', 'Hoàng Anh', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'Admin', '2024-11-25 09:30:00', 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'nguyenhoanganh@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 9, 'phamkhanhlinh@example.com', 'Phạm', 'Khánh Linh', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User', '2024-11-25 09:30:00', 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'phamkhanhlinh@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 10, 'lequanghieu@example.com', 'Lê', 'Quang Hiếu', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User', '2024-11-25 09:30:00', 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'lequanghieu@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 11, 'ngocthangtran@example.com', 'Ngọc', 'Thắng Trần', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User', '2024-11-25 09:30:00', 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'ngocthangtran@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 12, 'honghaile@example.com', 'Hồng', 'Hải Lê', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User', '2024-11-25 09:30:00', 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'honghaile@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 13, 'doanminhkhang@example.com', 'Đoàn', 'Minh Khang', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User', '2024-11-25 09:30:00', 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'doanminhkhang@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 14, 'quocviettran@example.com', 'Quốc', 'Việt Trần', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User', '2024-11-25 09:30:00', 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'quocviettran@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 15, 'hanngocyen@example.com', 'Hân', 'Ngọc Yên', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User', '2024-11-25 09:30:00', 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'hanngocyen@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 16, 'vohongphuc@example.com', 'Võ', 'Hồng Phúc', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User', '2024-11-25 09:30:00', 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'vohongphuc@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 17, 'nguyenvanlam@example.com', 'Nguyễn', 'Văn Lâm', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'Admin', '2024-11-25 09:30:00', 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'nguyenvanlam@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 18, 'caominhkiet@example.com', 'Cao', 'Minh Kiệt', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User', '2024-11-25 09:30:00', 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'caominhkiet@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 19, 'hoanganhthuy@example.com', 'Hoàng', 'Anh Thủy', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User', '2024-11-25 09:30:00', 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'hoanganhthuy@example.com');

INSERT INTO users (id, email, firstname, lastname, password, role, date, is_verify)
SELECT 20, 'lethanhson@example.com', 'Lê', 'Thanh Sơn', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'Admin', '2024-11-25 09:30:00', 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'lethanhson@example.com');


-- Dữ liệu tương ứng cho 5 user có user_id từ 2->6
-- Thêm dữ liệu mẫu vào bảng members
INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 2, 'Nguyễn Văn Mười', '1990-06-23', 'Nam', 'Cha', 'O', 175.5, 70.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Nguyễn Văn Mười' AND user_id = 2);

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 2, 'Lê Thị Mỹ Hạnh', '1992-12-14', 'Nữ', 'Mẹ', 'A', 160.0, 55.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Lê Thị Mỹ Hạnh' AND user_id = 2);

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 2, 'Nguyễn Văn Bảy', '2011-06-17', 'Nam', 'Con trai', 'A', 128.0, 30.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Nguyễn Văn Bảy' AND user_id = 2);
--------------------------------------------------------------------------------------------------

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 2, 'Trần Trọng Trường', '1986-02-14', 'Nam', 'Cha', 'A', 173.5, 75.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Trần Trọng Trường' AND user_id = 3);

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 2, 'Nguyễn Thị Lam', '1989-10-02', 'Nữ', 'Mẹ', 'B', 159.0, 56.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Nguyễn Thị Lam' AND user_id = 3);

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 2, 'Trần Trọng Nghĩa', '2009-12-06', 'Nam', 'Con trai', 'A', 132.0, 32.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Trần Trọng Nghĩa' AND user_id = 3);

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 2, 'Trần Ngọc Thương', '2008-04-15', 'Nữ', 'Con gái', 'A', 145.0, 36.5
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Trần Ngọc Thương' AND user_id = 3);
----------------------------------------------------------------------------
INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 2, 'Võ Bá Nhân', '1998-09-19', 'Nam', 'Chồng', 'O', 174.5, 74.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Võ Bá Nhân' AND user_id =4);

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 2, 'Trương Ngọc Tuyết Mai', '2001-01-15', 'Nữ', 'Vợ', 'B', 163.5, 62.0s
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Trương Ngọc Tuyết Mai' AND user_id = 4);

----------------------------------------------------------------------------
INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 5, 'Phan Tuấn Tú', '1975-04-25', 'Nam', 'Chú', 'AB', 167.5, 72.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Phan Tuấn Tú' AND user_id = 5);

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 2, 'Phan Thi Mộng', '2000-01-20', 'Nữ', 'Cháu gái', 'B', 165.5, 62.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Phan Thi Mộng' AND user_id = 5);

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 2, 'Đặng Lê Anh Huy', '1998-10-21', 'Nam', 'Cháu rể', 'O', 173.5, 73.5
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Đặng Lê Anh Huy' AND user_id = 5);
------------------------------------------------------------------------------
INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 2, 'Long Hạo Nhiên', '1996-08-25', 'Nam', 'Cha', 'A', 174.5, 75.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Long Hạo Nhiên' AND user_id = 6);

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 2, 'Long Kim Ngọc', '2017-11-02', 'Nữ', 'Con gái', 'AB', 142.5, 28.6
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Long Kim Ngọc' AND user_id = 6);

-- Dữ liệu health status tương ứng cho các thành viên trong bảng members

-- userID: 3 - TLieuNhuYen@example.com
-- memberID : 4
-- Dòng 1
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 1, 'Blood Pressure', '184', '2024-10-07 07:28'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 1);

-- Dòng 2
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 2, 'Blood Pressure', '100', '2024-10-01 07:28'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 2);

-- Dòng 3
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 4, 3, 'Blood Pressure', '114', '2024-10-02 07:28'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 3);

-- Dòng 4
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 4, 'Blood Pressure', '128', '2024-10-03 07:28'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 4);

-- Dòng 5
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 5, 'Blood Pressure', '142', '2024-10-04 07:28'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 5);

-- Dòng 6
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 6, 'Blood Pressure', '156', '2024-10-05 07:28'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 6);

-- Dòng 7
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 7, 'Blood Pressure', '170', '2024-10-06 07:28'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 7);

-- Dòng 1
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 8, 'Blood Glucose', '95', '2024-10-08 08:00'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 8);

-- Dòng 2
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 9, 'Blood Glucose', '130', '2024-10-09 08:15'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 9);

-- Dòng 3
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 10, 'Blood Glucose', '110', '2024-10-10 08:30'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 10);

-- Dòng 4
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 11, 'Blood Glucose', '125', '2024-10-11 08:45'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 11);

-- Dòng 5
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 12, 'Blood Glucose', '145', '2024-10-12 09:00'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 12);

-- Dòng 6
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 13, 'Blood Glucose', '88', '2024-10-13 09:15'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 13);

-- Dòng 7
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 14, 'Blood Glucose', '120', '2024-10-14 09:30'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 14);

-- Dòng 1
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 15, 'Heart Rate', '72', '2024-10-15 10:00'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 15);

-- Dòng 2
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 16, 'Heart Rate', '85', '2024-10-16 10:15'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 16);

-- Dòng 3
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 17, 'Heart Rate', '78', '2024-10-17 10:30'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 17);

-- Dòng 4
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 18, 'Heart Rate', '90', '2024-10-18 10:45'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 18);

-- Dòng 5
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 19, 'Heart Rate', '66', '2024-10-19 11:00'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 19);

-- Dòng 6
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 20, 'Heart Rate', '75', '2024-10-20 11:15'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 20);

-- Dòng 7
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 21, 'Heart Rate', '82', '2024-10-21 11:30'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 21);

--memberID : 5
-- Blood Pressure (Dòng 1 - 7)
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 22, 'Blood Pressure', '118', '2024-10-01 07:28'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 22);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 23, 'Blood Pressure', '135', '2024-10-02 08:15'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 23);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 24, 'Blood Pressure', '126', '2024-10-03 07:45'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 24);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 25, 'Blood Pressure', '140', '2024-10-05 09:00'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 25);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 26, 'Blood Pressure', '112', '2024-10-06 08:10'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 26);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 27, 'Blood Pressure', '144', '2024-10-07 08:30'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 27);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 28, 'Blood Pressure', '132', '2024-10-08 09:10'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 28);

-- Blood Glucose (Dòng 8 - 14)
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 29, 'Blood Glucose', '98', '2024-10-09 08:00'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 29);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 30, 'Blood Glucose', '105', '2024-10-10 07:45'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 30);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 31, 'Blood Glucose', '140', '2024-10-11 09:15'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 31);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 32, 'Blood Glucose', '115', '2024-10-12 08:25'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 32);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 33, 'Blood Glucose', '110', '2024-10-13 09:45'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 33);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 34, 'Blood Glucose', '135', '2024-10-14 08:30'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 34);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 35, 'Blood Glucose', '120', '2024-10-15 10:15'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 35);

-- Heart Rate (Dòng 15 - 21)
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 36, 'Heart Rate', '75', '2024-10-16 11:00'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 36);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 37, 'Heart Rate', '82', '2024-10-17 10:30'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 37);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 38, 'Heart Rate', '70', '2024-10-18 11:15'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 38);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 39, 'Heart Rate', '92', '2024-10-19 09:45'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 39);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 40, 'Heart Rate', '68', '2024-10-20 10:00'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 40);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 41, 'Heart Rate', '86', '2024-10-21 09:30'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 41);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 42, 'Heart Rate', '80', '2024-10-22 11:45'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 42);

--memberID : 6
-- Blood Pressure (Dòng 1 - 7)
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 43, 'Blood Pressure', '125', '2024-10-01 07:30'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 43);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 44, 'Blood Pressure', '132', '2024-10-02 08:20'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 44);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 45, 'Blood Pressure', '118', '2024-10-03 09:10'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 45);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 46, 'Blood Pressure', '144', '2024-10-04 10:00'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 46);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 47, 'Blood Pressure', '128', '2024-10-05 07:45'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 47);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 48, 'Blood Pressure', '135', '2024-10-06 08:15'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 48);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 49, 'Blood Pressure', '142', '2024-10-07 08:45'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 49);

-- Blood Glucose (Dòng 8 - 14)
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 50, 'Blood Glucose', '110', '2024-10-08 09:00'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 50);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 51, 'Blood Glucose', '95', '2024-10-09 08:10'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 51);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 52, 'Blood Glucose', '125', '2024-10-10 07:50'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 52);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 53, 'Blood Glucose', '130', '2024-10-11 09:20'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 53);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 54, 'Blood Glucose', '115', '2024-10-12 08:30'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 54);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 55, 'Blood Glucose', '100', '2024-10-13 08:45'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 55);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 56, 'Blood Glucose', '105', '2024-10-14 09:40'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 56);

-- Heart Rate (Dòng 15 - 21)
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 57, 'Heart Rate', '75', '2024-10-15 10:00'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 57);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 58, 'Heart Rate', '82', '2024-10-16 10:20'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 58);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 59, 'Heart Rate', '88', '2024-10-17 09:55'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 59);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 60, 'Heart Rate', '70', '2024-10-18 11:10'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 60);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 61, 'Heart Rate', '92', '2024-10-19 10:05'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 61);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 62, 'Heart Rate', '65', '2024-10-20 10:45'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 62);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 63, 'Heart Rate', '85', '2024-10-21 09:30'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 63);

--memberID : 7
-- Blood Pressure (Dòng 1 - 7)
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 64, 'Blood Pressure', '138', '2024-10-01 07:40'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 64);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 65, 'Blood Pressure', '126', '2024-10-02 08:10'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 65);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 66, 'Blood Pressure', '145', '2024-10-03 08:50'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 66);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 67, 'Blood Pressure', '120', '2024-10-04 09:30'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 67);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 68, 'Blood Pressure', '133', '2024-10-05 07:55'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 68);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 69, 'Blood Pressure', '140', '2024-10-06 08:35'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 69);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 70, 'Blood Pressure', '128', '2024-10-07 09:20'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 70);

-- Blood Glucose (Dòng 8 - 14)
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 71, 'Blood Glucose', '105', '2024-10-08 08:05'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 71);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 72, 'Blood Glucose', '110', '2024-10-09 08:55'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 72);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 73, 'Blood Glucose', '118', '2024-10-10 07:35'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 73);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 74, 'Blood Glucose', '95', '2024-10-11 09:45'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 74);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 75, 'Blood Glucose', '125', '2024-10-12 10:15'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 75);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 76, 'Blood Glucose', '102', '2024-10-13 09:05'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 76);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 77, 'Blood Glucose', '108', '2024-10-14 08:20'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 77);

-- Heart Rate (Dòng 15 - 21)
INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 78, 'Heart Rate', '72', '2024-10-15 07:45'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 78);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 79, 'Heart Rate', '85', '2024-10-16 08:25'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 79);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 80, 'Heart Rate', '90', '2024-10-17 09:50'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 80);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 2, 81, 'Heart Rate', '78', '2024-10-18 10:40'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 81);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 3, 82, 'Heart Rate', '88', '2024-10-19 09:10'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 82);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 83, 'Heart Rate', '76', '2024-10-20 08:50'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 83);

INSERT INTO health_stats (member_id, id, stat_type, stat_value, date)
SELECT 1, 84, 'Heart Rate', '81', '2024-10-21 09:15'
WHERE NOT EXISTS (SELECT 1 FROM health_stats WHERE id = 84);


-- Dữ liệu tương ứng cho các thành viên trong bảng members
INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 2, 'Phấn hoa', 'Nhẹ', 'Ngứa mắt, hắt hơi'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 2 AND allergy_type = 'Phấn hoa');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 1, 'Hải sản', 'Nặng', 'Nổi mề đay'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 1 AND allergy_type = 'Hải sản');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 2, 'Sữa', 'Nhẹ', 'Đau bụng, tiêu chảy'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 2 AND allergy_type = 'Sữa');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 1, 'Lạc', 'Nặng', 'Sưng môi, khó thở'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 1 AND allergy_type = 'Lạc');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 1, 'Nấm', 'Nhẹ', 'Ngứa, phát ban'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 1 AND allergy_type = 'Nấm');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 2, 'Bột mì', 'Vừa', 'Đau bụng, buồn nôn'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 2 AND allergy_type = 'Bột mì');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 1, 'Đậu phộng', 'Nặng', 'Khó thở'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 1 AND allergy_type = 'Đậu phộng');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 2, 'Trứng', 'Vừa', 'Nổi mề đay'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 2 AND allergy_type = 'Trứng');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 1, 'Cá', 'Nhẹ', 'Ngứa, phát ban'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 1 AND allergy_type = 'Cá');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 1, 'Sò', 'Nặng', 'Sưng môi'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 1 AND allergy_type = 'Sò');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 2, 'Bơ', 'Nhẹ', 'Buồn nôn'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 2 AND allergy_type = 'Bơ');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 1, 'Mạt bụi', 'Nhẹ', 'Hắt hơi, ngứa mũi'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 1 AND allergy_type = 'Mạt bụi');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 1, 'Pha lê', 'Vừa', 'Đau đầu'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 1 AND allergy_type = 'Pha lê');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 14, 'Bào ngư', 'Nặng', 'Nổi mẩn đỏ'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 14 AND allergy_type = 'Bào ngư');
-----Emergency Contacts


--------Medications
-- V8__insert_medications.sql

-- Dữ liệu tương ứng cho các thành viên trong bảng vaccications
INSERT INTO vaccications (member_id, vaccine_name, date_administered )
SELECT 1, 'Vaccine ngừa cúm', '2024-01-15'
WHERE NOT EXISTS (SELECT 1 FROM vaccications WHERE member_id = 1 AND vaccine_name = 'Vaccine ngừa cúm');

INSERT INTO vaccications (member_id, vaccine_name, date_administered )
SELECT 2, 'Vaccine ngừa viêm gan B', '2024-02-20'
WHERE NOT EXISTS (SELECT 1 FROM vaccications WHERE member_id = 2 AND vaccine_name = 'Vaccine ngừa viêm gan B');

INSERT INTO vaccications (member_id, vaccine_name, date_administered )
SELECT 3, 'Vaccine ngừa sởi', '2024-03-10'
WHERE NOT EXISTS (SELECT 1 FROM vaccications WHERE member_id = 3 AND vaccine_name = 'Vaccine ngừa sởi');

INSERT INTO vaccications (member_id, vaccine_name, date_administered )
SELECT 1, 'Vaccine ngừa tả', '2024-04-05'
WHERE NOT EXISTS (SELECT 1 FROM vaccications WHERE member_id = 1 AND vaccine_name = 'Vaccine ngừa tả');

INSERT INTO vaccications (member_id, vaccine_name, date_administered )
SELECT 1, 'Vaccine ngừa rubella', '2024-05-18'
WHERE NOT EXISTS (SELECT 1 FROM vaccications WHERE member_id = 1 AND vaccine_name = 'Vaccine ngừa rubella');

INSERT INTO vaccications (member_id, vaccine_name, date_administered )
SELECT 1, 'Vaccine ngừa ho gà', '2024-06-22'
WHERE NOT EXISTS (SELECT 1 FROM vaccications WHERE member_id = 1 AND vaccine_name = 'Vaccine ngừa ho gà');

INSERT INTO vaccications (member_id, vaccine_name, date_administered )
SELECT 2, 'Vaccine ngừa quai bị', '2024-07-15'
WHERE NOT EXISTS (SELECT 1 FROM vaccications WHERE member_id = 2 AND vaccine_name = 'Vaccine ngừa quai bị');

INSERT INTO vaccications (member_id, vaccine_name, date_administered )
SELECT 1, 'Vaccine ngừa COVID-19', '2024-08-10'
WHERE NOT EXISTS (SELECT 1 FROM vaccications WHERE member_id = 1 AND vaccine_name = 'Vaccine ngừa COVID-19');

INSERT INTO vaccications (member_id, vaccine_name, date_administered )
SELECT 1, 'Vaccine ngừa sốt xuất huyết', '2024-09-05'
WHERE NOT EXISTS (SELECT 1 FROM vaccications WHERE member_id = 1 AND vaccine_name = 'Vaccine ngừa sốt xuất huyết');

INSERT INTO vaccications (member_id, vaccine_name, date_administered )
SELECT 2, 'Vaccine ngừa bạch hầu', '2024-10-01'
WHERE NOT EXISTS (SELECT 1 FROM vaccications WHERE member_id = 2 AND vaccine_name = 'Vaccine ngừa bạch hầu');

INSERT INTO vaccications (member_id, vaccine_name, date_administered )
SELECT 1, 'Vaccine ngừa HPV', '2024-11-12'
WHERE NOT EXISTS (SELECT 1 FROM vaccications WHERE member_id = 1 AND vaccine_name = 'Vaccine ngừa HPV');

INSERT INTO vaccications (member_id, vaccine_name, date_administered )
SELECT 2, 'Vaccine ngừa viêm não Nhật Bản', '2024-12-20'
WHERE NOT EXISTS (SELECT 1 FROM vaccications WHERE member_id = 2 AND vaccine_name = 'Vaccine ngừa viêm não Nhật Bản');

INSERT INTO vaccications (member_id, vaccine_name, date_administered )
SELECT 1, 'Vaccine ngừa bệnh dại', '2024-01-05'
WHERE NOT EXISTS (SELECT 1 FROM vaccications WHERE member_id = 1 AND vaccine_name = 'Vaccine ngừa bệnh dại');

INSERT INTO vaccications (member_id, vaccine_name, date_administered )
SELECT 2, 'Vaccine ngừa cúm mùa', '2024-02-14'
WHERE NOT EXISTS (SELECT 1 FROM vaccications WHERE member_id = 2 AND vaccine_name = 'Vaccine ngừa cúm mùa');

-- Seed dữ liệu cho bảng contact
-- Dữ liệu cho user_id = 3 với thời gian ngẫu nhiên
INSERT INTO contacts (user_id, content, status, date)
SELECT 3, 'Message from user 3 - Contact 15', true, '2023-10-10 09:30:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 3 AND content = 'Message from user 3 - Contact 15');

INSERT INTO contacts (user_id, content, status, date)
SELECT 3, 'Message from user 3 - Contact 16', false, '2023-10-12 11:00:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 3 AND content = 'Message from user 3 - Contact 16');

INSERT INTO contacts (user_id, content, status, date)
SELECT 3, 'Message from user 3 - Contact 17', true, '2023-10-14 14:15:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 3 AND content = 'Message from user 3 - Contact 17');

INSERT INTO contacts (user_id, content, status, date)
SELECT 3, 'Message from user 3 - Contact 18', true, '2023-10-16 15:45:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 3 AND content = 'Message from user 3 - Contact 18');

INSERT INTO contacts (user_id, content, status, date)
SELECT 3, 'Message from user 3 - Contact 19', false, '2023-10-18 10:30:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 3 AND content = 'Message from user 3 - Contact 19');

INSERT INTO contacts (user_id, content, status, date)
SELECT 3, 'Message from user 3 - Contact 20', true, '2023-10-20 16:00:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 3 AND content = 'Message from user 3 - Contact 20');

INSERT INTO contacts (user_id, content, status, date)
SELECT 3, 'Message from user 3 - Contact 21', false, '2023-10-22 12:30:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 3 AND content = 'Message from user 3 - Contact 21');

-- Dữ liệu cho user_id = 4 với thời gian ngẫu nhiên
INSERT INTO contacts (user_id, content, status, date)
SELECT 4, 'Message from user 4 - Contact 22', true, '2023-10-10 08:40:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 4 AND content = 'Message from user 4 - Contact 22');

INSERT INTO contacts (user_id, content, status, date)
SELECT 4, 'Message from user 4 - Contact 23', false, '2023-10-12 10:25:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 4 AND content = 'Message from user 4 - Contact 23');

INSERT INTO contacts (user_id, content, status, date)
SELECT 4, 'Message from user 4 - Contact 24', true, '2023-10-14 13:30:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 4 AND content = 'Message from user 4 - Contact 24');

INSERT INTO contacts (user_id, content, status, date)
SELECT 4, 'Message from user 4 - Contact 25', true, '2023-10-16 11:15:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 4 AND content = 'Message from user 4 - Contact 25');

INSERT INTO contacts (user_id, content, status, date)
SELECT 4, 'Message from user 4 - Contact 26', false, '2023-10-18 14:50:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 4 AND content = 'Message from user 4 - Contact 26');

INSERT INTO contacts (user_id, content, status, date)
SELECT 4, 'Message from user 4 - Contact 27', true, '2023-10-20 17:05:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 4 AND content = 'Message from user 4 - Contact 27');

INSERT INTO contacts (user_id, content, status, date)
SELECT 4, 'Message from user 4 - Contact 28', false, '2023-10-22 18:20:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 4 AND content = 'Message from user 4 - Contact 28');

---- Dữ liệu cho user_id = 5
INSERT INTO contacts (user_id, content, status, date)
SELECT 5, 'Message from user 5 - Contact 29', true, '2023-10-10 09:45:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 5 AND content = 'Message from user 5 - Contact 29');

INSERT INTO contacts (user_id, content, status, date)
SELECT 5, 'Message from user 5 - Contact 30', false, '2023-10-12 11:20:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 5 AND content = 'Message from user 5 - Contact 30');

INSERT INTO contacts (user_id, content, status, date)
SELECT 5, 'Message from user 5 - Contact 31', true, '2023-10-14 14:10:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 5 AND content = 'Message from user 5 - Contact 31');

INSERT INTO contacts (user_id, content, status, date)
SELECT 5, 'Message from user 5 - Contact 32', true, '2023-10-16 15:05:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 5 AND content = 'Message from user 5 - Contact 32');

INSERT INTO contacts (user_id, content, status, date)
SELECT 5, 'Message from user 5 - Contact 33', false, '2023-10-18 13:50:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 5 AND content = 'Message from user 5 - Contact 33');

INSERT INTO contacts (user_id, content, status, date)
SELECT 5, 'Message from user 5 - Contact 34', true, '2023-10-20 16:35:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 5 AND content = 'Message from user 5 - Contact 34');

INSERT INTO contacts (user_id, content, status, date)
SELECT 5, 'Message from user 5 - Contact 35', false, '2023-10-22 17:25:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 5 AND content = 'Message from user 5 - Contact 35');

-- Dữ liệu cho user_id = 6 với thời gian tự chọn từ ngày 10/10/2023 đến hôm nay
INSERT INTO contacts (user_id, content, status, date)
SELECT 6, 'Message from user 6 - Contact 36', true, '2023-10-10 08:30:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 6 AND content = 'Message from user 6 - Contact 36');

INSERT INTO contacts (user_id, content, status, date)
SELECT 6, 'Message from user 6 - Contact 37', false, '2023-10-12 10:15:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 6 AND content = 'Message from user 6 - Contact 37');

INSERT INTO contacts (user_id, content, status, date)
SELECT 6, 'Message from user 6 - Contact 38', true, '2023-10-15 14:45:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 6 AND content = 'Message from user 6 - Contact 38');

INSERT INTO contacts (user_id, content, status, date)
SELECT 6, 'Message from user 6 - Contact 39', true, '2023-10-18 16:00:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 6 AND content = 'Message from user 6 - Contact 39');

INSERT INTO contacts (user_id, content, status, date)
SELECT 6, 'Message from user 6 - Contact 40', false, '2023-10-20 09:00:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 6 AND content = 'Message from user 6 - Contact 40');

INSERT INTO contacts (user_id, content, status, date)
SELECT 6, 'Message from user 6 - Contact 41', true, '2023-10-25 13:30:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 6 AND content = 'Message from user 6 - Contact 41');

INSERT INTO contacts (user_id, content, status, date)
SELECT 6, 'Message from user 6 - Contact 42', false, '2023-10-28 11:15:00'
WHERE NOT EXISTS (SELECT 1 FROM contacts WHERE user_id = 6 AND content = 'Message from user 6 - Contact 42');

-- Liên hệ khẩn cấp
INSERT INTO emergency_contacts (user_id, name, relationship, phone_number)
SELECT * FROM (
                  SELECT 2 AS user_id, 'Nguyen Van A' AS name, 'Brother' AS relationship, '0912345678' AS phone_number UNION ALL
                  SELECT 2, 'Tran Thi B', 'Sister', '0912345679' UNION ALL
                  SELECT 2, 'Le Van C', 'Father', '0912345680' UNION ALL
                  SELECT 2, 'Pham Thi D', 'Mother', '0912345681' UNION ALL
                  SELECT 2, 'Hoang Van E', 'Friend', '0912345682' UNION ALL
                  SELECT 2, 'Nguyen Thi F', 'Colleague', '0912345683' UNION ALL
                  SELECT 2, 'Do Van G', 'Neighbor', '0912345684' UNION ALL
                  SELECT 2, 'Bui Thi H', 'Cousin', '0912345685' UNION ALL
                  SELECT 2, 'Dang Van I', 'Uncle', '0912345686' UNION ALL
                  SELECT 2, 'Vu Thi J', 'Aunt', '0912345687'
              ) AS new_data
WHERE NOT EXISTS (SELECT 1 FROM emergency_contacts);

-- Dữ liệu thông tin bảng
INSERT INTO appointments (id, member_id, time, doctor, location)
SELECT 1, 1, '2024-11-30 10:00:00', 'Dr. Nguyễn Văn A', 'Phòng khám B'
    WHERE NOT EXISTS (SELECT 1 FROM appointments WHERE id = 1);

INSERT INTO appointments (id, member_id, time, doctor, location)
SELECT 2, 2, '2024-12-01 14:00:00', 'Dr. Trần Thị B', 'Bệnh viện A'
    WHERE NOT EXISTS (SELECT 1 FROM appointments WHERE id = 2);

INSERT INTO appointments (id, member_id, time, doctor, location)
SELECT 3, 3, '2024-12-05 09:30:00', 'Dr. Lê Hoàng C', 'Phòng khám C'
    WHERE NOT EXISTS (SELECT 1 FROM appointments WHERE id = 3);

INSERT INTO appointments (id, member_id, time, doctor, location)
SELECT 4, 1, '2024-12-10 15:00:00', 'Dr. Vũ Thị D', 'Bệnh viện D'
    WHERE NOT EXISTS (SELECT 1 FROM appointments WHERE id = 4);

INSERT INTO appointments (id, member_id, time, doctor, location)
SELECT 5, 2, '2024-12-12 11:00:00', 'Dr. Nguyễn Phú E', 'Phòng khám E'
    WHERE NOT EXISTS (SELECT 1 FROM appointments WHERE id = 5);

-- Dữ liệu thông tin y tế
INSERT INTO medical_records (id, member_id, date, doctor, symptoms, diagnosis, treatment, facility_name, deleted_at)
SELECT 1, 1, '2024-11-01', 'Dr. Nguyễn Văn A', 'Sốt, ho, đau họng', 'Cảm cúm', 'Uống thuốc hạ sốt và nghỉ ngơi', 'Bệnh viện A', NULL
    WHERE NOT EXISTS (SELECT 1 FROM medical_records WHERE id = 1);

INSERT INTO medical_records (id, member_id, date, doctor, symptoms, diagnosis, treatment, facility_name, deleted_at)
SELECT 2, 2, '2024-11-05', 'Dr. Trần Thị B', 'Đau đầu, chóng mặt', 'Thiếu máu', 'Bổ sung sắt và theo dõi', 'Phòng khám B', NULL
    WHERE NOT EXISTS (SELECT 1 FROM medical_records WHERE id = 2);

-- Dữ liệu cho bảng documents

INSERT INTO documents (id, position, medical_record_id, size, name, type, path)
SELECT 1, 1, 1, 204800, 'X-ray Lung', 'image/jpg', 'https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/10029/131161/eugica-thumb-638681320379997657-600x600.jpg'
    WHERE NOT EXISTS (SELECT 1 FROM documents WHERE id = 1);

INSERT INTO documents (id, position, medical_record_id, size, name, type, path)
SELECT 2, 2, 1, 102400, 'Prescription', 'application/jpg', 'https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/10029/131161/eugica-thumb-638681320379997657-600x600.jpg'
    WHERE NOT EXISTS (SELECT 1 FROM documents WHERE id = 2);

INSERT INTO documents (id, position, medical_record_id, size, name, type, path)
SELECT 3, 1, 1, 204800, 'X-ray Lung', 'image/jpg', 'https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/10029/131161/eugica-thumb-638681320379997657-600x600.jpg'
    WHERE NOT EXISTS (SELECT 1 FROM documents WHERE id = 3);

INSERT INTO documents (id, position, medical_record_id, size, name, type, path)
SELECT 4, 1, 2, 51200, 'Blood Test Results', 'image/jpg', 'https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/10029/131161/eugica-thumb-638681320379997657-600x600.jpg'
    WHERE NOT EXISTS (SELECT 1 FROM documents WHERE id = 4);

INSERT INTO documents (id, position, medical_record_id, size, name, type, path)
SELECT 5, 2, 1, 102400, 'Prescription', 'application/jpg', 'https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/10029/131161/eugica-thumb-638681320379997657-600x600.jpg'
    WHERE NOT EXISTS (SELECT 1 FROM documents WHERE id = 5);


INSERT INTO documents (id, position, medical_record_id, size, name, type, path)
SELECT 6, 1, 2, 51200, 'Blood Test Results', 'image/jpg', 'https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/10029/131161/eugica-thumb-638681320379997657-600x600.jpg'
    WHERE NOT EXISTS (SELECT 1 FROM documents WHERE id = 6);

-- Dữ liệu cho bảng medications

INSERT INTO medications (id, position, medical_record_id, name, frequency, start_date, end_date)
SELECT 1, 1, 1, 'Paracetamol', '2 lần/ngày', '2024-11-01', '2024-11-05'
    WHERE NOT EXISTS (SELECT 1 FROM medications WHERE id = 1);

INSERT INTO medications (id, position, medical_record_id, name, frequency, start_date, end_date)
SELECT 2, 2, 1, 'Vitamin D', '1 lần/ngày', '2024-11-01', '2024-11-10'
    WHERE NOT EXISTS (SELECT 1 FROM medications WHERE id = 2);

INSERT INTO medications (id, position, medical_record_id, name, frequency, start_date, end_date)
SELECT 3, 3, 1, 'Vitamin C', '1 lần/ngày', '2024-11-01', '2024-11-10'
    WHERE NOT EXISTS (SELECT 1 FROM medications WHERE id = 3);

INSERT INTO medications (id, position, medical_record_id, name, frequency, start_date, end_date)
SELECT 4, 4, 1, 'Vitamin C', '1 lần/ngày', '2024-11-01', '2024-11-10'
    WHERE NOT EXISTS (SELECT 1 FROM medications WHERE id = 4);

INSERT INTO medications (id, position, medical_record_id, name, frequency, start_date, end_date)
SELECT 5, 5, 1, 'Vitamin C', '1 lần/ngày', '2024-11-01', '2024-11-10'
    WHERE NOT EXISTS (SELECT 1 FROM medications WHERE id = 5);

INSERT INTO medications (id, position, medical_record_id, name, frequency, start_date, end_date)
SELECT 6, 1, 2, 'Vitamin C', '1 lần/ngày', '2024-11-01', '2024-11-10'
    WHERE NOT EXISTS (SELECT 1 FROM medications WHERE id = 6);








