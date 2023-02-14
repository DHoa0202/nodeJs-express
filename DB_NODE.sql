USE master
GO

IF EXISTS(SELECT name FROM sys.databases WHERE name = 'DB_NODE') DROP DATABASE DB_NODE
GO
	CREATE DATABASE DB_NODE
GO
	USE DB_NODE
GO

IF EXISTS(SELECT name FROM sys.tables WHERE name = 'CATEGORIES') DROP TABLE CATEGORIES
GO
CREATE TABLE CATEGORIES (
	id int primary key,
	name nvarchar(50)
)
GO

IF EXISTS(SELECT name FROM sys.tables WHERE name = 'PRODUCTS') DROP TABLE PRODUCTS
GO
CREATE TABLE PRODUCTS(
	id int identity primary key,
	name nvarchar(100),
	price float,
	quantity int,
	regDate datetime default getdate(),
	image nvarchar(255),

	category_id int foreign key references CATEGORIES(id) on update cascade on delete no action
)
GO

IF EXISTS(SELECT name FROM sys.tables WHERE name = 'ACCOUNTS') DROP TABLE ACCOUNTS
GO
CREATE TABLE ACCOUNTS (
	username varchar(50) primary key,
	password binary(70) not null,
	name nvarchar(50)
);

IF EXISTS(SELECT name FROM sys.tables WHERE name = 'AUTHORITIES') DROP TABLE AUTHORITIES
GO
CREATE TABLE AUTHORITIES (
	role varchar(20) null,
	uid varchar(50) not null,
	foreign key (uid) references ACCOUNTS(username) 
	on update cascade on delete cascade,
	unique(uid, role)
);
GO

IF EXISTS(SELECT name FROM sys.procedures WHERE name = 'LOGIN') DROP PROC LOGIN
GO
	CREATE PROCEDURE LOGIN 
		@username varchar(50), @password varchar(256)
	AS BEGIN
		SELECT * FROM ACCOUNTS WHERE username = @username and PWDCOMPARE(@password, password) = 1
	END
GO
	DELETE FROM ACCOUNTS
	DELETE FROM PRODUCTS
	DELETE FROM CATEGORIES

	INSERT INTO CATEGORIES VALUES
	(1, N'Máy tính'),
	(2, N'Điện thoại'),
	(3, N'Khác');

	INSERT INTO PRODUCTS VALUES
	(N'Apple MacBook Air M1 256GB 2020', 22.690, 10, getdate(), N'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/m/a/macbook_air_22.png',1),
	(N'Laptop Asus Gaming Rog Strix G15', 19.490, 10, getdate(), N'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/4/h/4h43.png',1),
	(N'Laptop Dell Gaming G15 5515', 18.490, 10, getdate(), N'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/r/g/rg.jpg',1),

	(N'iPhone 13 Pro Max 128GB', 27.690, 10, getdate(), N'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg',2),
	(N'POCO X4 GT', 7.390, 10, getdate(), N'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/p/m/pms_1655902420.18254534_1.png',2),
	(N'Xiaomi Redmi Note 11 128GB', 4.400, 10, getdate(), N'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/8/0/800x800-640x640-5.png',2),

	(N'Loa Bluetooth JBL GO 3', 0.940, 10, getdate(), N'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/o/go-4.jpg',3),
	(N'Micro không dây JBL Micas 2', 2.990, 10, getdate(), N'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/m/i/microphone-khong-day-jbl-micas-2-1.jpg',3),
	(N'Đồng hồ thông minh Xiaomi Watch S1 Active', 2.990, 10, getdate(), N'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/a/c/active-s1-blue-thumb.jpg',3),
	(N'Tai nghe Marshall Minor 3', 2.790, 10, getdate(), N'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/a/tai-nghe-bluetooth-marshall-minor-3.jpg',3),
	(N'Android Tivi Xiaomi A2 58 inch', 12.990, 10, getdate(), N'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/4/_/4_45_20.jpg',3);

	INSERT INTO ACCOUNTS VALUES
	('user', PWDENCRYPT('123'), 'System User'),
	('staff', PWDENCRYPT('123'), 'System Staff'),
	('admin', PWDENCRYPT('123'), 'System Admin');

	INSERT INTO AUTHORITIES([uid],[role]) VALUES
	('user', 'USER'),
	('staff', 'STAFF'), ('staff', 'USER'),
	('admin', 'ADMIN'), ('admin', 'STAFF'), ('admin', 'USER')
GO
