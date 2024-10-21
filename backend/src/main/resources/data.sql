INSERT INTO user (id, email, firstname, lastname, password, role,is_verify)
SELECT 3, 'TLieuNhuYen@example.com', 'Trần Liễu', 'Như Yên', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User',1
WHERE NOT EXISTS (SELECT 1 FROM user WHERE email = 'TLieuNhuYen@example.com');

INSERT INTO user (id, email, firstname, lastname, password, role,is_verify)
SELECT 4, 'LongNgaoThien@example.com', 'Long', 'Ngạo Thiên', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User',1
WHERE NOT EXISTS (SELECT 1 FROM user WHERE email = 'LongNgaoThien@example.com');

INSERT INTO user (id, email, firstname, lastname, password, role,is_verify)
SELECT 5, 'haonhienau23@example.com', 'Âu', 'Hạo Nhiên', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User',1
WHERE NOT EXISTS (SELECT 1 FROM user WHERE email = 'haonhienau23@example.com');

INSERT INTO user (id, email, firstname, lastname, password, role,is_verify)
SELECT 6, 'vuong8dan@example.com', 'Vương', 'Bát Đản', '$2a$10$hCYtqGLNDW9W374lnZLYq.NUOQU4NaE9HMpvaj47s1VSIbfCSyBGC', 'User',1
WHERE NOT EXISTS (SELECT 1 FROM user WHERE email = 'vuong8dan@example.com');    
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
SELECT 3, 'Trần Trọng Trường', '1986-02-14', 'Nam', 'Cha', 'A', 173.5, 75.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Trần Trọng Trường' AND user_id = 3);

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 3, 'Nguyễn Thị Lam', '1989-10-02', 'Nữ', 'Mẹ', 'B', 159.0, 56.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Nguyễn Thị Lam' AND user_id = 3);

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 3, 'Trần Trọng Nghĩa', '2009-12-06', 'Nam', 'Con trai', 'A', 132.0, 32.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Trần Trọng Nghĩa' AND user_id = 3);

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 3, 'Trần Ngọc Thương', '2008-04-15', 'Nữ', 'Con gái', 'A', 145.0, 36.5
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Trần Ngọc Thương' AND user_id = 3);
----------------------------------------------------------------------------
INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 4, 'Võ Bá Nhân', '1998-09-19', 'Nam', 'Chồng', 'O', 174.5, 74.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Võ Bá Nhân' AND user_id =4);

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 4, 'Trương Ngọc Tuyết Mai', '2001-01-15', 'Nữ', 'Vợ', 'B', 163.5, 62.0s
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Trương Ngọc Tuyết Mai' AND user_id = 4);

----------------------------------------------------------------------------
INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 5, 'Phan Tuấn Tú', '1975-04-25', 'Nam', 'Chú', 'AB', 167.5, 72.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Phan Tuấn Tú' AND user_id = 5);

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 5, 'Phan Thi Mộng', '2000-01-20', 'Nữ', 'Cháu gái', 'B', 165.5, 62.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Phan Thi Mộng' AND user_id = 5);

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 5, 'Đặng Lê Anh Huy', '1998-10-21', 'Nam', 'Cháu rể', 'O', 173.5, 73.5
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Đặng Lê Anh Huy' AND user_id = 5);
------------------------------------------------------------------------------
INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 6, 'Long Hạo Nhiên', '1996-08-25', 'Nam', 'Cha', 'A', 174.5, 75.0
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Long Hạo Nhiên' AND user_id = 6);

INSERT INTO members (user_id, full_name, date_of_birth, gender, relationship, blood_type, height, weight)
SELECT 6, 'Long Kim Ngọc', '2017-11-02', 'Nữ', 'Con gái', 'AB', 142.5, 28.6
WHERE NOT EXISTS (SELECT 1 FROM members WHERE full_name = 'Long Kim Ngọc' AND user_id = 6);

-- Dữ liệu tương ứng cho các thành viên trong bảng members
INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 1, 'Phấn hoa', 'Nhẹ', 'Ngứa mắt, hắt hơi'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 1 AND allergy_type = 'Phấn hoa');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 2, 'Hải sản', 'Nặng', 'Nổi mề đay'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 2 AND allergy_type = 'Hải sản');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 3, 'Sữa', 'Nhẹ', 'Đau bụng, tiêu chảy'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 3 AND allergy_type = 'Sữa');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 4, 'Lạc', 'Nặng', 'Sưng môi, khó thở'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 4 AND allergy_type = 'Lạc');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 5, 'Nấm', 'Nhẹ', 'Ngứa, phát ban'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 5 AND allergy_type = 'Nấm');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 6, 'Bột mì', 'Vừa', 'Đau bụng, buồn nôn'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 6 AND allergy_type = 'Bột mì');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 7, 'Đậu phộng', 'Nặng', 'Khó thở'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 7 AND allergy_type = 'Đậu phộng');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 8, 'Trứng', 'Vừa', 'Nổi mề đay'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 8 AND allergy_type = 'Trứng');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 9, 'Cá', 'Nhẹ', 'Ngứa, phát ban'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 9 AND allergy_type = 'Cá');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 10, 'Sò', 'Nặng', 'Sưng môi'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 10 AND allergy_type = 'Sò');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 11, 'Bơ', 'Nhẹ', 'Buồn nôn'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 11 AND allergy_type = 'Bơ');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 12, 'Mạt bụi', 'Nhẹ', 'Hắt hơi, ngứa mũi'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 12 AND allergy_type = 'Mạt bụi');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 13, 'Pha lê', 'Vừa', 'Đau đầu'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 13 AND allergy_type = 'Pha lê');

INSERT INTO allergies (member_id, allergy_type, severity, symptoms)
SELECT 14, 'Bào ngư', 'Nặng', 'Nổi mẩn đỏ'
WHERE NOT EXISTS (SELECT 1 FROM allergies WHERE member_id = 14 AND allergy_type = 'Bào ngư');
-----Emergency Contacts

-- Dữ liệu tương ứng cho user_id từ 2->6
-- Thêm dữ liệu mẫu vào bảng emergency_contacts

-- INSERT INTO emergency_contacts (user_id, name, relationship, phone_number, address)
-- SELECT 2, 'Nguyễn Văn Mười', 'Cha', '0901234567', '123 Đường A, Quận 1, TP.HCM'
-- WHERE NOT EXISTS (SELECT 1 FROM emergency_contacts WHERE user_id = 2 AND name = 'Nguyễn Văn Mười');

-- INSERT INTO emergency_contacts (user_id, name, relationship, phone_number, address)
-- SELECT 2, 'Lê Thị Mỹ Hạnh', 'Mẹ', '0912345678', '123 Đường A, Quận 1, TP.HCM'
-- WHERE NOT EXISTS (SELECT 1 FROM emergency_contacts WHERE user_id = 2 AND name = 'Lê Thị Mỹ Hạnh');

-- INSERT INTO emergency_contacts (user_id, name, relationship, phone_number, address)
-- SELECT 3, 'Trần Trọng Trường', 'Cha', '0923456789', '456 Đường B, Quận 2, TP.HCM'
-- WHERE NOT EXISTS (SELECT 1 FROM emergency_contacts WHERE user_id = 3 AND name = 'Trần Trọng Trường');

-- INSERT INTO emergency_contacts (user_id, name, relationship, phone_number, address)
-- SELECT 3, 'Nguyễn Thị Lam', 'Mẹ', '0934567890', '456 Đường B, Quận 2, TP.HCM'
-- WHERE NOT EXISTS (SELECT 1 FROM emergency_contacts WHERE user_id = 3 AND name = 'Nguyễn Thị Lam');

-- INSERT INTO emergency_contacts (user_id, name, relationship, phone_number, address)
-- SELECT 4, 'Võ Bá Nhân', 'Chồng', '0945678901', '789 Đường C, Quận 3, TP.HCM'
-- WHERE NOT EXISTS (SELECT 1 FROM emergency_contacts WHERE user_id = 4 AND name = 'Võ Bá Nhân');

-- INSERT INTO emergency_contacts (user_id, name, relationship, phone_number, address)
-- SELECT 4, 'Trương Ngọc Tuyết Mai', 'Vợ', '0956789012', '789 Đường C, Quận 3, TP.HCM'
-- WHERE NOT EXISTS (SELECT 1 FROM emergency_contacts WHERE user_id = 4 AND name = 'Trương Ngọc Tuyết Mai');

-- INSERT INTO emergency_contacts (user_id, name, relationship, phone_number, address)
-- SELECT 5, 'Phan Tuấn Tú', 'Chú', '0967890123', '321 Đường D, Quận 4, TP.HCM'
-- WHERE NOT EXISTS (SELECT 1 FROM emergency_contacts WHERE user_id = 5 AND name = 'Phan Tuấn Tú');

-- INSERT INTO emergency_contacts (user_id, name, relationship, phone_number, address)
-- SELECT 5, 'Phan Thi Mộng', 'Cháu gái', '0978901234', '321 Đường D, Quận 4, TP.HCM'
-- WHERE NOT EXISTS (SELECT 1 FROM emergency_contacts WHERE user_id = 5 AND name = 'Phan Thi Mộng');

-- INSERT INTO emergency_contacts (user_id, name, relationship, phone_number, address)
-- SELECT 6, 'Long Hạo Nhiên', 'Cha', '0989012345', '654 Đường E, Quận 5, TP.HCM'
-- WHERE NOT EXISTS (SELECT 1 FROM emergency_contacts WHERE user_id = 6 AND name = 'Long Hạo Nhiên');

-- INSERT INTO emergency_contacts (user_id, name, relationship, phone_number, address)
-- SELECT 6, 'Long Kim Ngọc', 'Con gái', '0990123456', '654 Đường E, Quận 5, TP.HCM'
-- WHERE NOT EXISTS (SELECT 1 FROM emergency_contacts WHERE user_id = 6 AND name = 'Long Kim Ngọc');

-----Medical Record
-- V4__insert_medical_records.sql

-- Thêm dữ liệu mẫu vào bảng medical_records

INSERT INTO medical_records (member_id, date, doctor, symptoms, diagnosis, treatment, facility_name)
SELECT 2, '2023-10-01', 'Dr. Bảo', 'Cánh tay đau khi chạm vào, chảy máu phần mềm, xây xát', 'Nứt xương cánh tay', 'Sát trùng phần mềm, băng bó chỗ nứt xương', 'Khoa chấn thương chỉnh hình'
WHERE NOT EXISTS (SELECT 1 FROM medical_records WHERE member_id = 2 AND date = '2023-10-01');

INSERT INTO medical_records (member_id, date, doctor, symptoms, diagnosis, treatment, facility_name)
SELECT 4, '2022-09-11', 'Dr. Vương', 'Đau bụng, đau âm ỉ vùng bụng dưới', 'Co thắt dạ dày', 'Truyền thuốc chống co thắt, kê đơn thuốc uống', 'Khoa cấp cứu'
WHERE NOT EXISTS (SELECT 1 FROM medical_records WHERE member_id = 4 AND date = '2022-09-11');

INSERT INTO medical_records (member_id, date, doctor, symptoms, diagnosis, treatment, facility_name)
SELECT 3, '2021-11-15', 'Dr. Huy', 'Ho, Sốt', 'Cảm cúm thông thường', 'Uống thuốc', 'Nhà thuốc bệnh viện'
WHERE NOT EXISTS (SELECT 1 FROM medical_records WHERE member_id = 3 AND date = '2021-11-15');

INSERT INTO medical_records (member_id, date, doctor, symptoms, diagnosis, treatment, facility_name)
SELECT 5, '2020-12-29', 'Dr. Bảo', 'Xây xát, chảy máu, đau khi chạm vào bàn chân', 'Gãy, dập ngón chân', 'Phẫu thuật chỉnh hình, bó bột vết thương', 'Khoa chấn thương chỉnh hình'
WHERE NOT EXISTS (SELECT 1 FROM medical_records WHERE member_id = 5 AND date = '2020-12-29');
INSERT INTO medical_records (member_id, date, doctor, symptoms, diagnosis, treatment, facility_name)
SELECT 7, '2023-11-15', 'Dr. Lâm', 'Đau mắt, giảm thị lực nhẹ', 'Đau mắt đỏ', 'Kê đơn thuốc', 'Khoa mắt'
WHERE NOT EXISTS (SELECT 1 FROM medical_records WHERE member_id = 7 AND date = '2023-11-15');
INSERT INTO medical_records (member_id, date, doctor, symptoms, diagnosis, treatment, facility_name)
SELECT 9, '2021-11-15', 'Dr. Trang', 'Sốt trên 39 độ, vài ngày chưa hạ nhiệt', 'Sốt siêu vi', 'Truyền thuốc hạ sốt, kê thuốc uống', 'Nhà thuốc bệnh viện'
WHERE NOT EXISTS (SELECT 1 FROM medical_records WHERE member_id = 9 AND date = '2021-11-15');
INSERT INTO medical_records (member_id, date, doctor, symptoms, diagnosis, treatment, facility_name)
SELECT 11, '2023-02-17', 'Dr. Trang', 'Sốt, đắp chăn nhưng vẫn cảm thấy lạnh', 'Sốt rét', 'Kê đơn thuốc sốt đặc trị', 'Khoa cấp cứu'
WHERE NOT EXISTS (SELECT 1 FROM medical_records WHERE member_id = 11 AND date = '2023-02-17');
INSERT INTO medical_records (member_id, date, doctor, symptoms, diagnosis, treatment, facility_name)
SELECT 14, '2021-11-17', 'Dr. Bảo', 'Tay trái không cử động được cánh tay trở xuống,xây xát phần mềm', 'Gãy xương', 'Bó bột', 'Khoa chấn thương chỉnh hình'
WHERE NOT EXISTS (SELECT 1 FROM medical_records WHERE member_id = 14 AND date = '2021-11-17');
INSERT INTO medical_records (member_id, date, doctor, symptoms, diagnosis, treatment, facility_name)
SELECT 10, '2024-02-10', 'Dr. Huy', 'Đau bụng dữ dội,ói ra máu', 'Chảy máu dạ dày', 'Nội soi, uống thuốc, truyền dịch dinh dưỡng', 'Khoa nội tiêu hóa'
WHERE NOT EXISTS (SELECT 1 FROM medical_records WHERE member_id = 10 AND date = '2024-02-10');
INSERT INTO medical_records (member_id, date, doctor, symptoms, diagnosis, treatment, facility_name)
SELECT 6, '2024-02-10', 'Dr. Ngân', 'Da sưng đỏ, sổ mũi, có triệu chứng sốc phản vệ', 'Dị ứng bơ đậu phộng', 'Uống thuốc dị ứng, truyền dịch', 'Khoa dị ứng'
WHERE NOT EXISTS (SELECT 1 FROM medical_records WHERE member_id = 6 AND date = '2024-02-10');
INSERT INTO medical_records (member_id, date, doctor, symptoms, diagnosis, treatment, facility_name)
SELECT 8, '2024-02-20', 'Dr.Trang ', 'Sút cân, mặt mũi xanh xao', 'Suy dinh dưỡng', 'Truyền dịch dinh dưỡng', 'Khoa dinh dưỡng'
WHERE NOT EXISTS (SELECT 1 FROM medical_records WHERE member_id = 8 AND date = '2024-02-20');
INSERT INTO medical_records (member_id, date, doctor, symptoms, diagnosis, treatment, facility_name)
SELECT 12, '2024-03-02', 'Dr. Long', 'Khó thở,ngứa da,buồn nôn, mệt mỏi kéo dài', 'Suy thận', 'Chạy thận nhân tạo', 'Khoa lọc máu'
WHERE NOT EXISTS (SELECT 1 FROM medical_records WHERE member_id = 12 AND date = '2024-03-02');
INSERT INTO medical_records (member_id, date, doctor, symptoms, diagnosis, treatment, facility_name)
SELECT 12, '2024-04-02', 'Dr. Long', 'Khó thở,ngứa da,buồn nôn, mệt mỏi kéo dài', 'Suy thận', 'Chạy thận nhân tạo', 'Khoa lọc máu'
WHERE NOT EXISTS (SELECT 1 FROM medical_records WHERE member_id = 12 AND date = '2024-04-02');

INSERT INTO medical_records (member_id, date, doctor, symptoms, diagnosis, treatment, facility_name)
SELECT 13, '2024-04-02', 'Dr. Huy  ', 'Hay quên, đau đầu thường xuyên', 'Mất trí nhớ nhẹ', 'Uống thuốc. nghỉ ngơi, thư giãn đầu óc', 'Khoa Thần Kinh'
WHERE NOT EXISTS (SELECT 1 FROM medical_records WHERE member_id = 2 AND date = '2024-04-02');
----Documents

-- Thêm dữ liệu mẫu vào bảng documents
INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 1, 'Hồ sơ sức khỏe 1.pdf', 'application/pdf', NULL, '2023-10-01 09:00:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 1 AND file_name = 'Hồ sơ sức khỏe 1.pdf');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 1, 'Kết quả xét nghiệm 1.jpg', 'image/jpeg', NULL, '2023-10-02 10:30:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 1 AND file_name = 'Kết quả xét nghiệm 1.jpg');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 2, 'Hồ sơ sức khỏe 2.pdf', 'application/pdf', NULL, '2023-10-03 11:00:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 2 AND file_name = 'Hồ sơ sức khỏe 2.pdf');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 2, 'Kết quả xét nghiệm 2.png', 'image/png', NULL, '2023-10-04 12:15:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 2 AND file_name = 'Kết quả xét nghiệm 2.png');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 3, 'Hồ sơ sức khỏe 3.pdf', 'application/pdf', NULL, '2023-10-05 13:45:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 3 AND file_name = 'Hồ sơ sức khỏe 3.pdf');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 3, 'Kết quả xét nghiệm 3.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', NULL, '2023-10-06 14:30:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 3 AND file_name = 'Kết quả xét nghiệm 3.docx');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 4, 'Hồ sơ sức khỏe 4.pdf', 'application/pdf', NULL, '2023-10-07 15:00:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 4 AND file_name = 'Hồ sơ sức khỏe 4.pdf');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 4, 'Kết quả xét nghiệm 4.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', NULL, '2023-10-08 16:00:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 4 AND file_name = 'Kết quả xét nghiệm 4.xlsx');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 5, 'Hồ sơ sức khỏe 5.pdf', 'application/pdf', NULL, '2023-10-09 17:30:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 5 AND file_name = 'Hồ sơ sức khỏe 5.pdf');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 5, 'Kết quả xét nghiệm 5.jpg', 'image/jpeg', NULL, '2023-10-10 18:45:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 5 AND file_name = 'Kết quả xét nghiệm 5.jpg');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 6, 'Hồ sơ sức khỏe 6.pdf', 'application/pdf', NULL, '2023-10-11 19:00:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 6 AND file_name = 'Hồ sơ sức khỏe 6.pdf');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 6, 'Kết quả xét nghiệm 6.png', 'image/png', NULL, '2023-10-12 20:00:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 6 AND file_name = 'Kết quả xét nghiệm 6.png');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 7, 'Hồ sơ sức khỏe 7.pdf', 'application/pdf', NULL, '2023-10-13 21:30:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 7 AND file_name = 'Hồ sơ sức khỏe 7.pdf');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 8, 'Kết quả xét nghiệm 7.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', NULL, '2023-10-14 22:30:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 8 AND file_name = 'Kết quả xét nghiệm 7.docx');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 9, 'Hồ sơ sức khỏe 8.pdf', 'application/pdf', NULL, '2023-10-15 23:00:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 9 AND file_name = 'Hồ sơ sức khỏe 8.pdf');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 10, 'Kết quả xét nghiệm 8.jpg', 'image/jpeg', NULL, '2023-10-16 08:00:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 10 AND file_name = 'Kết quả xét nghiệm 8.jpg');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 11, 'Hồ sơ sức khỏe 9.pdf', 'application/pdf', NULL, '2023-10-17 09:00:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 11 AND file_name = 'Hồ sơ sức khỏe 9.pdf');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 12, 'Kết quả xét nghiệm 9.png', 'image/png', NULL, '2023-10-18 10:15:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 12 AND file_name = 'Kết quả xét nghiệm 9.png');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 13, 'Hồ sơ sức khỏe 10.pdf', 'application/pdf', NULL, '2023-10-19 11:30:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 13 AND file_name = 'Hồ sơ sức khỏe 10.pdf');

INSERT INTO documents (record_id, file_name, file_type, file_content, upload_date)
SELECT 14, 'Kết quả xét nghiệm 10.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', NULL, '2023-10-20 12:45:00'
WHERE NOT EXISTS (SELECT 1 FROM documents WHERE record_id = 14 AND file_name = 'Kết quả xét nghiệm 10.docx');
--------Medications
-- V8__insert_medications.sql

-- Thêm dữ liệu mẫu vào bảng medications
INSERT INTO medications (record_id, name,  frequency, start_date, end_date)
SELECT 1, 'Paracetamol', '500mg', '2024-01-01', '2024-01-10'
WHERE NOT EXISTS (SELECT 1 FROM medications WHERE name = 'Paracetamol' AND record_id = 1);

INSERT INTO medications (record_id, name,  frequency, start_date, end_date)
SELECT 2, 'Ibuprofen', '400mg', '2024-02-01', '2024-02-10'
WHERE NOT EXISTS (SELECT 1 FROM medications WHERE name = 'Ibuprofen' AND record_id = 2);

INSERT INTO medications (record_id, name,  frequency, start_date, end_date)
SELECT 3, 'Amoxicillin', '250mg', '2024-01-15', '2024-01-25'
WHERE NOT EXISTS (SELECT 1 FROM medications WHERE name = 'Amoxicillin' AND record_id = 3);

INSERT INTO medications (record_id, name,  frequency, start_date, end_date)
SELECT 4, 'Cetirizine', '10mg', '2024-02-15', '2024-02-20'
WHERE NOT EXISTS (SELECT 1 FROM medications WHERE name = 'Cetirizine' AND record_id = 4);

INSERT INTO medications (record_id, name,  frequency, start_date, end_date)
SELECT 5, 'Metformin', '500mg', '2024-03-01', '2024-03-30'
WHERE NOT EXISTS (SELECT 1 FROM medications WHERE name = 'Metformin' AND record_id = 5);

INSERT INTO medications (record_id, name,  frequency, start_date, end_date)
SELECT 6, 'Simvastatin', '20mg', '2024-01-20', '2024-02-20'
WHERE NOT EXISTS (SELECT 1 FROM medications WHERE name = 'Simvastatin' AND record_id = 6);

INSERT INTO medications (record_id, name,  frequency, start_date, end_date)
SELECT 7, 'Lisinopril', '10mg', '2024-01-30', '2024-02-28'
WHERE NOT EXISTS (SELECT 1 FROM medications WHERE name = 'Lisinopril' AND record_id = 7);

INSERT INTO medications (record_id, name,  frequency, start_date, end_date)
SELECT 8, 'Omeprazole', '20mg', '2024-02-20', '2024-03-01'
WHERE NOT EXISTS (SELECT 1 FROM medications WHERE name = 'Omeprazole' AND record_id = 8);

INSERT INTO medications (record_id, name,  frequency, start_date, end_date)
SELECT 9, 'Amlodipine', '5mg', '2024-01-05', '2024-02-05'
WHERE NOT EXISTS (SELECT 1 FROM medications WHERE name = 'Amlodipine' AND record_id = 9);

INSERT INTO medications (record_id, name,  frequency, start_date, end_date)
SELECT 10, 'Fexofenadine', '180mg', '2024-03-05', '2024-03-15'
WHERE NOT EXISTS (SELECT 1 FROM medications WHERE name = 'Fexofenadine' AND record_id = 10);

INSERT INTO medications (record_id, name,  frequency, start_date, end_date)
SELECT 11, 'Prednisone', '20mg', '2024-02-10', '2024-02-20'
WHERE NOT EXISTS (SELECT 1 FROM medications WHERE name = 'Prednisone' AND record_id = 11);

INSERT INTO medications (record_id, name,  frequency, start_date, end_date)
SELECT 12, 'Levothyroxine', '50mcg', '2024-03-10', '2024-04-10'
WHERE NOT EXISTS (SELECT 1 FROM medications WHERE name = 'Levothyroxine' AND record_id = 12);

INSERT INTO medications (record_id, name,  frequency, start_date, end_date)
SELECT 13, 'Sildenafil', '50mg', '2024-02-01', '2024-03-01'
WHERE NOT EXISTS (SELECT 1 FROM medications WHERE name = 'Sildenafil' AND record_id = 13);

INSERT INTO medications (record_id, name,  frequency, start_date, end_date)
SELECT 14, 'Gabapentin', '300mg', '2024-01-10', '2024-02-10'
WHERE NOT EXISTS (SELECT 1 FROM medications WHERE name = 'Gabapentin' AND record_id = 14);
------Vacinations
-- Dữ liệu tương ứng cho các thành viên trong bảng vaccinations
INSERT INTO vaccinations (member_id, vaccine_name, date_administered )
SELECT 1, 'Vaccine ngừa cúm', '2024-01-15'
WHERE NOT EXISTS (SELECT 1 FROM vaccinations WHERE member_id = 1 AND vaccine_name = 'Vaccine ngừa cúm');

INSERT INTO vaccinations (member_id, vaccine_name, date_administered )
SELECT 2, 'Vaccine ngừa viêm gan B', '2024-02-20'
WHERE NOT EXISTS (SELECT 1 FROM vaccinations WHERE member_id = 2 AND vaccine_name = 'Vaccine ngừa viêm gan B');

INSERT INTO vaccinations (member_id, vaccine_name, date_administered )
SELECT 3, 'Vaccine ngừa sởi', '2024-03-10'
WHERE NOT EXISTS (SELECT 1 FROM vaccinations WHERE member_id = 3 AND vaccine_name = 'Vaccine ngừa sởi');

INSERT INTO vaccinations (member_id, vaccine_name, date_administered )
SELECT 4, 'Vaccine ngừa tả', '2024-04-05'
WHERE NOT EXISTS (SELECT 1 FROM vaccinations WHERE member_id = 4 AND vaccine_name = 'Vaccine ngừa tả');

INSERT INTO vaccinations (member_id, vaccine_name, date_administered )
SELECT 5, 'Vaccine ngừa rubella', '2024-05-18'
WHERE NOT EXISTS (SELECT 1 FROM vaccinations WHERE member_id = 5 AND vaccine_name = 'Vaccine ngừa rubella');

INSERT INTO vaccinations (member_id, vaccine_name, date_administered )
SELECT 6, 'Vaccine ngừa ho gà', '2024-06-22'
WHERE NOT EXISTS (SELECT 1 FROM vaccinations WHERE member_id = 6 AND vaccine_name = 'Vaccine ngừa ho gà');

INSERT INTO vaccinations (member_id, vaccine_name, date_administered )
SELECT 7, 'Vaccine ngừa quai bị', '2024-07-15'
WHERE NOT EXISTS (SELECT 1 FROM vaccinations WHERE member_id = 7 AND vaccine_name = 'Vaccine ngừa quai bị');

INSERT INTO vaccinations (member_id, vaccine_name, date_administered )
SELECT 8, 'Vaccine ngừa COVID-19', '2024-08-10'
WHERE NOT EXISTS (SELECT 1 FROM vaccinations WHERE member_id = 8 AND vaccine_name = 'Vaccine ngừa COVID-19');

INSERT INTO vaccinations (member_id, vaccine_name, date_administered )
SELECT 9, 'Vaccine ngừa sốt xuất huyết', '2024-09-05'
WHERE NOT EXISTS (SELECT 1 FROM vaccinations WHERE member_id = 9 AND vaccine_name = 'Vaccine ngừa sốt xuất huyết');

INSERT INTO vaccinations (member_id, vaccine_name, date_administered )
SELECT 10, 'Vaccine ngừa bạch hầu', '2024-10-01'
WHERE NOT EXISTS (SELECT 1 FROM vaccinations WHERE member_id = 10 AND vaccine_name = 'Vaccine ngừa bạch hầu');

INSERT INTO vaccinations (member_id, vaccine_name, date_administered )
SELECT 11, 'Vaccine ngừa HPV', '2024-11-12'
WHERE NOT EXISTS (SELECT 1 FROM vaccinations WHERE member_id = 11 AND vaccine_name = 'Vaccine ngừa HPV');

INSERT INTO vaccinations (member_id, vaccine_name, date_administered )
SELECT 12, 'Vaccine ngừa viêm não Nhật Bản', '2024-12-20'
WHERE NOT EXISTS (SELECT 1 FROM vaccinations WHERE member_id = 12 AND vaccine_name = 'Vaccine ngừa viêm não Nhật Bản');

INSERT INTO vaccinations (member_id, vaccine_name, date_administered )
SELECT 13, 'Vaccine ngừa bệnh dại', '2024-01-05'
WHERE NOT EXISTS (SELECT 1 FROM vaccinations WHERE member_id = 13 AND vaccine_name = 'Vaccine ngừa bệnh dại');

INSERT INTO vaccinations (member_id, vaccine_name, date_administered )
SELECT 14, 'Vaccine ngừa cúm mùa', '2024-02-14'
WHERE NOT EXISTS (SELECT 1 FROM vaccinations WHERE member_id = 14 AND vaccine_name = 'Vaccine ngừa cúm mùa');


