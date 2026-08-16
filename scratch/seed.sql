-- Seed data generated programmatically

DELETE FROM product_variants;
DELETE FROM products;
DELETE FROM categories;

INSERT INTO categories (id, name, slug, sport) VALUES ('920c7b07-e742-4b2c-a779-31f0c01c9b74', 'Football', 'football', 'Football');
INSERT INTO categories (id, name, slug, sport) VALUES ('b2db4e67-f26d-40a0-a0b5-3a7ecfe6d559', 'Basketball', 'basketball', 'Basketball');
INSERT INTO categories (id, name, slug, sport) VALUES ('145f6dca-a518-4087-98c9-09bfd2b69f4d', 'Running', 'running', 'Running');
INSERT INTO categories (id, name, slug, sport) VALUES ('a0501457-755a-47d4-8b78-4dd086891765', 'Tennis', 'tennis', 'Tennis');
INSERT INTO categories (id, name, slug, sport) VALUES ('f9573225-4b4c-42ca-905e-a9b039c07c95', 'Gym & Fitness', 'gym-fitness', 'Gym & Fitness');

INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('cb69488b-9219-4165-b145-c0e8c5f28123', 'Nike Air Zoom Pegasus 40', 'nike-air-zoom-pegasus-40-801', 'Nike', 130, '145f6dca-a518-4087-98c9-09bfd2b69f4d', '[{"url":"/products/nike-air-zoom-pegasus-40-black.jpg","alt":"Nike Air Zoom Pegasus 40 in Black","feature_tag":"Black"},{"url":"/products/nike-air-zoom-pegasus-40-white.jpg","alt":"Nike Air Zoom Pegasus 40 in White","feature_tag":"White"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('96e23dce-2dab-4008-a66e-9077b562a764', 'cb69488b-9219-4165-b145-c0e8c5f28123', 'nike-air-zoom-pegasus-40-801-Black', 'Black', '#000000', 59);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('767a04d2-ecd7-4727-b981-e87a129f431f', 'cb69488b-9219-4165-b145-c0e8c5f28123', 'nike-air-zoom-pegasus-40-801-White', 'White', '#ffffff', 99);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('63e82822-fc39-457a-b82a-9c716d993130', 'Nike Phantom GX Elite', 'nike-phantom-gx-elite-763', 'Nike', 250, '920c7b07-e742-4b2c-a779-31f0c01c9b74', '[{"url":"/products/nike-phantom-gx-elite-blue.jpg","alt":"Nike Phantom GX Elite in Blue","feature_tag":"Blue"},{"url":"/products/nike-phantom-gx-elite-yellow.jpg","alt":"Nike Phantom GX Elite in Yellow","feature_tag":"Yellow"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('b8702bbf-d6d2-4055-8c6c-6e7f5b3f572e', '63e82822-fc39-457a-b82a-9c716d993130', 'nike-phantom-gx-elite-763-Blue', 'Blue', '#0000ff', 101);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('d2d0970b-9564-4b7f-9f16-899fe7c6946a', '63e82822-fc39-457a-b82a-9c716d993130', 'nike-phantom-gx-elite-763-Yellow', 'Yellow', '#ffff00', 58);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('5a1985a6-6d98-466e-8dba-d5dad4615c7a', 'Nike LeBron 21', 'nike-lebron-21-761', 'Nike', 200, 'b2db4e67-f26d-40a0-a0b5-3a7ecfe6d559', '[{"url":"/products/nike-lebron-21-red.jpg","alt":"Nike LeBron 21 in Red","feature_tag":"Red"},{"url":"/products/nike-lebron-21-black.jpg","alt":"Nike LeBron 21 in Black","feature_tag":"Black"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('caaec8be-58cc-4d34-9b14-0e1a3b282ac5', '5a1985a6-6d98-466e-8dba-d5dad4615c7a', 'nike-lebron-21-761-Red', 'Red', '#ff0000', 90);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('af882563-1a27-4fc5-a5b4-022f5cdba6ee', '5a1985a6-6d98-466e-8dba-d5dad4615c7a', 'nike-lebron-21-761-Black', 'Black', '#000000', 84);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('9fbbc313-4e21-41c9-bc25-de651aaf8144', 'Nike Zoom Vapor Pro', 'nike-zoom-vapor-pro-82', 'Nike', 120, 'a0501457-755a-47d4-8b78-4dd086891765', '[{"url":"/products/nike-zoom-vapor-pro-white.jpg","alt":"Nike Zoom Vapor Pro in White","feature_tag":"White"},{"url":"/products/nike-zoom-vapor-pro-blue.jpg","alt":"Nike Zoom Vapor Pro in Blue","feature_tag":"Blue"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('5a20ace3-38be-4314-b398-694851297458', '9fbbc313-4e21-41c9-bc25-de651aaf8144', 'nike-zoom-vapor-pro-82-White', 'White', '#ffffff', 15);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('cfc1e784-be87-4cc7-98f8-bd4b5c4fe854', '9fbbc313-4e21-41c9-bc25-de651aaf8144', 'nike-zoom-vapor-pro-82-Blue', 'Blue', '#0000ff', 39);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('1cd36903-0ce6-4e32-83ee-c874e9b2419f', 'Nike Metcon 9', 'nike-metcon-9-749', 'Nike', 140, 'f9573225-4b4c-42ca-905e-a9b039c07c95', '[{"url":"/products/nike-metcon-9-black.jpg","alt":"Nike Metcon 9 in Black","feature_tag":"Black"},{"url":"/products/nike-metcon-9-orange.jpg","alt":"Nike Metcon 9 in Orange","feature_tag":"Orange"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('ad4bb613-9194-4a2b-8df0-fb76921190f6', '1cd36903-0ce6-4e32-83ee-c874e9b2419f', 'nike-metcon-9-749-Black', 'Black', '#000000', 62);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('c9f4023d-511c-4790-a031-34528ca44d8e', '1cd36903-0ce6-4e32-83ee-c874e9b2419f', 'nike-metcon-9-749-Orange', 'Orange', '#ffa500', 18);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('3e8d7230-c036-4d88-85a4-48f748764273', 'Nike Mercurial Vapor 15', 'nike-mercurial-vapor-15-968', 'Nike', 260, '920c7b07-e742-4b2c-a779-31f0c01c9b74', '[{"url":"/products/nike-mercurial-vapor-15-pink.jpg","alt":"Nike Mercurial Vapor 15 in Pink","feature_tag":"Pink"},{"url":"/products/nike-mercurial-vapor-15-white.jpg","alt":"Nike Mercurial Vapor 15 in White","feature_tag":"White"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('2d52728f-0d9e-42dd-819d-e2b2cbc70c67', '3e8d7230-c036-4d88-85a4-48f748764273', 'nike-mercurial-vapor-15-968-Pink', 'Pink', '#ffc0cb', 11);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('d0e6cd66-c5c0-47b8-95ae-c90143aa7ef4', '3e8d7230-c036-4d88-85a4-48f748764273', 'nike-mercurial-vapor-15-968-White', 'White', '#ffffff', 35);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('df696453-47d0-4e3f-871d-b165773ce589', 'Adidas Ultraboost Light', 'adidas-ultraboost-light-901', 'Adidas', 190, '145f6dca-a518-4087-98c9-09bfd2b69f4d', '[{"url":"/products/adidas-ultraboost-light-white.jpg","alt":"Adidas Ultraboost Light in White","feature_tag":"White"},{"url":"/products/adidas-ultraboost-light-black.jpg","alt":"Adidas Ultraboost Light in Black","feature_tag":"Black"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('3075481d-4bc8-4876-a887-6352c978ff80', 'df696453-47d0-4e3f-871d-b165773ce589', 'adidas-ultraboost-light-901-White', 'White', '#ffffff', 17);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('9c169767-06ea-4909-aaab-5023a4b4dfa9', 'df696453-47d0-4e3f-871d-b165773ce589', 'adidas-ultraboost-light-901-Black', 'Black', '#000000', 95);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('56b8d9e6-4e5a-435a-bd92-f94609196b4a', 'Adidas Predator Elite', 'adidas-predator-elite-641', 'Adidas', 260, '920c7b07-e742-4b2c-a779-31f0c01c9b74', '[{"url":"/products/adidas-predator-elite-red.jpg","alt":"Adidas Predator Elite in Red","feature_tag":"Red"},{"url":"/products/adidas-predator-elite-yellow.jpg","alt":"Adidas Predator Elite in Yellow","feature_tag":"Yellow"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('0c2bbd66-797d-4f06-85f6-8b7085912757', '56b8d9e6-4e5a-435a-bd92-f94609196b4a', 'adidas-predator-elite-641-Red', 'Red', '#ff0000', 101);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('d703f9aa-d451-4544-8168-df79c1a1b783', '56b8d9e6-4e5a-435a-bd92-f94609196b4a', 'adidas-predator-elite-641-Yellow', 'Yellow', '#ffff00', 39);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('8b7bcb4a-a45b-4b1f-9809-35b9a1c96ea2', 'Adidas AE 1', 'adidas-ae-1-868', 'Adidas', 120, 'b2db4e67-f26d-40a0-a0b5-3a7ecfe6d559', '[{"url":"/products/adidas-ae-1-orange.jpg","alt":"Adidas AE 1 in Orange","feature_tag":"Orange"},{"url":"/products/adidas-ae-1-black.jpg","alt":"Adidas AE 1 in Black","feature_tag":"Black"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('23eccf05-2745-4682-8529-029aa1391926', '8b7bcb4a-a45b-4b1f-9809-35b9a1c96ea2', 'adidas-ae-1-868-Orange', 'Orange', '#ffa500', 50);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('b0856da6-1289-4575-898d-020c0d6b6724', '8b7bcb4a-a45b-4b1f-9809-35b9a1c96ea2', 'adidas-ae-1-868-Black', 'Black', '#000000', 63);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('9925f36a-1a49-4cb3-8191-7ac866f2eddf', 'Adidas Barricade', 'adidas-barricade-478', 'Adidas', 150, 'a0501457-755a-47d4-8b78-4dd086891765', '[{"url":"/products/adidas-barricade-blue.jpg","alt":"Adidas Barricade in Blue","feature_tag":"Blue"},{"url":"/products/adidas-barricade-white.jpg","alt":"Adidas Barricade in White","feature_tag":"White"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('ce0457d9-4fa6-4ed4-b701-e7dad245686c', '9925f36a-1a49-4cb3-8191-7ac866f2eddf', 'adidas-barricade-478-Blue', 'Blue', '#0000ff', 38);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('b7b799e4-e5ab-4886-b4ef-db917fd278e9', '9925f36a-1a49-4cb3-8191-7ac866f2eddf', 'adidas-barricade-478-White', 'White', '#ffffff', 61);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('fd3def31-ace3-4431-9b0f-95f653d18a5c', 'Adidas Dropset 2', 'adidas-dropset-2-29', 'Adidas', 130, 'f9573225-4b4c-42ca-905e-a9b039c07c95', '[{"url":"/products/adidas-dropset-2-black.jpg","alt":"Adidas Dropset 2 in Black","feature_tag":"Black"},{"url":"/products/adidas-dropset-2-grey.jpg","alt":"Adidas Dropset 2 in Grey","feature_tag":"Grey"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('b8dc1de2-f2ea-4d6f-be95-7e4722fdaa57', 'fd3def31-ace3-4431-9b0f-95f653d18a5c', 'adidas-dropset-2-29-Black', 'Black', '#000000', 92);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('5ed343dc-36d9-4d01-ba5e-afacfd16edb3', 'fd3def31-ace3-4431-9b0f-95f653d18a5c', 'adidas-dropset-2-29-Grey', 'Grey', '#808080', 108);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('fdce4e88-497d-49b0-9025-a8ffe692053e', 'Adidas Adizero Boston 12', 'adidas-adizero-boston-12-310', 'Adidas', 160, '145f6dca-a518-4087-98c9-09bfd2b69f4d', '[{"url":"/products/adidas-adizero-boston-12-cyan.jpg","alt":"Adidas Adizero Boston 12 in Cyan","feature_tag":"Cyan"},{"url":"/products/adidas-adizero-boston-12-white.jpg","alt":"Adidas Adizero Boston 12 in White","feature_tag":"White"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('c188e0d1-e30b-44fa-ac67-f3eed64a669a', 'fdce4e88-497d-49b0-9025-a8ffe692053e', 'adidas-adizero-boston-12-310-Cyan', 'Cyan', '#00ffff', 82);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('cdd0514f-b192-4293-85d3-67f98b1a9ad1', 'fdce4e88-497d-49b0-9025-a8ffe692053e', 'adidas-adizero-boston-12-310-White', 'White', '#ffffff', 90);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('702bcaee-fddf-4d44-80de-d17a9c63d853', 'Air Jordan 38', 'air-jordan-38-841', 'Jordan', 200, 'b2db4e67-f26d-40a0-a0b5-3a7ecfe6d559', '[{"url":"/products/air-jordan-38-red.jpg","alt":"Air Jordan 38 in Red","feature_tag":"Red"},{"url":"/products/air-jordan-38-black.jpg","alt":"Air Jordan 38 in Black","feature_tag":"Black"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('6365ad13-f47a-48ab-9ab6-06b429abba0c', '702bcaee-fddf-4d44-80de-d17a9c63d853', 'air-jordan-38-841-Red', 'Red', '#ff0000', 28);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('286d3119-fc2a-4996-8c95-6fbaf78a4057', '702bcaee-fddf-4d44-80de-d17a9c63d853', 'air-jordan-38-841-Black', 'Black', '#000000', 23);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('d61a6cd0-362c-423c-9c69-03a6ea6c4c36', 'Jordan Luka 2', 'jordan-luka-2-46', 'Jordan', 130, 'b2db4e67-f26d-40a0-a0b5-3a7ecfe6d559', '[{"url":"/products/jordan-luka-2-blue.jpg","alt":"Jordan Luka 2 in Blue","feature_tag":"Blue"},{"url":"/products/jordan-luka-2-white.jpg","alt":"Jordan Luka 2 in White","feature_tag":"White"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('85057ac7-adb1-4bd5-b735-8a27e55b9260', 'd61a6cd0-362c-423c-9c69-03a6ea6c4c36', 'jordan-luka-2-46-Blue', 'Blue', '#0000ff', 89);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('91d72c7f-2112-462d-b407-04e45826f5ea', 'd61a6cd0-362c-423c-9c69-03a6ea6c4c36', 'jordan-luka-2-46-White', 'White', '#ffffff', 74);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('ee6b3e81-5479-4b06-903d-fa8aba1588fb', 'Jordan Tatum 1', 'jordan-tatum-1-52', 'Jordan', 120, 'b2db4e67-f26d-40a0-a0b5-3a7ecfe6d559', '[{"url":"/products/jordan-tatum-1-black.jpg","alt":"Jordan Tatum 1 in Black","feature_tag":"Black"},{"url":"/products/jordan-tatum-1-orange.jpg","alt":"Jordan Tatum 1 in Orange","feature_tag":"Orange"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('924e8e0c-95be-48c1-a7b1-da4b6bcb798b', 'ee6b3e81-5479-4b06-903d-fa8aba1588fb', 'jordan-tatum-1-52-Black', 'Black', '#000000', 97);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('df3ee042-d908-4d7a-b976-2c8f2bfa0807', 'ee6b3e81-5479-4b06-903d-fa8aba1588fb', 'jordan-tatum-1-52-Orange', 'Orange', '#ffa500', 30);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('a090ba21-8d22-4dd9-9173-4b667d27fe85', 'Jordan Zion 3', 'jordan-zion-3-335', 'Jordan', 140, 'b2db4e67-f26d-40a0-a0b5-3a7ecfe6d559', '[{"url":"/products/jordan-zion-3-white.jpg","alt":"Jordan Zion 3 in White","feature_tag":"White"},{"url":"/products/jordan-zion-3-red.jpg","alt":"Jordan Zion 3 in Red","feature_tag":"Red"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('fcec72e3-58e9-46ed-9639-590c2797c485', 'a090ba21-8d22-4dd9-9173-4b667d27fe85', 'jordan-zion-3-335-White', 'White', '#ffffff', 30);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('0f7e24e1-ad37-42d7-98d7-56c457c3508c', 'a090ba21-8d22-4dd9-9173-4b667d27fe85', 'jordan-zion-3-335-Red', 'Red', '#ff0000', 62);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('69ea7b4f-875f-4097-ad11-9247522cc9c6', 'Jordan Super.Fly', 'jordan-super-fly-119', 'Jordan', 110, 'f9573225-4b4c-42ca-905e-a9b039c07c95', '[{"url":"/products/jordan-super-fly-black.jpg","alt":"Jordan Super.Fly in Black","feature_tag":"Black"},{"url":"/products/jordan-super-fly-blue.jpg","alt":"Jordan Super.Fly in Blue","feature_tag":"Blue"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('c2b4fb1e-747c-4978-a3d5-ef075820f463', '69ea7b4f-875f-4097-ad11-9247522cc9c6', 'jordan-super-fly-119-Black', 'Black', '#000000', 101);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('d896b749-db0a-45f1-acf5-d7b567b1cf04', '69ea7b4f-875f-4097-ad11-9247522cc9c6', 'jordan-super-fly-119-Blue', 'Blue', '#0000ff', 103);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('390f61d6-35ec-443e-bb51-5c78f15a6f67', 'Puma Velocity Nitro 3', 'puma-velocity-nitro-3-45', 'Puma', 130, '145f6dca-a518-4087-98c9-09bfd2b69f4d', '[{"url":"/products/puma-velocity-nitro-3-orange.jpg","alt":"Puma Velocity Nitro 3 in Orange","feature_tag":"Orange"},{"url":"/products/puma-velocity-nitro-3-black.jpg","alt":"Puma Velocity Nitro 3 in Black","feature_tag":"Black"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('b5bd37e7-aa76-4ba4-a281-a0fd5218ca8f', '390f61d6-35ec-443e-bb51-5c78f15a6f67', 'puma-velocity-nitro-3-45-Orange', 'Orange', '#ffa500', 11);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('613748ed-62ab-4c83-a078-78328f7f377c', '390f61d6-35ec-443e-bb51-5c78f15a6f67', 'puma-velocity-nitro-3-45-Black', 'Black', '#000000', 77);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('078733a7-258c-4a0a-94f0-f6199cc56a35', 'Puma Future 7 Ultimate', 'puma-future-7-ultimate-202', 'Puma', 220, '920c7b07-e742-4b2c-a779-31f0c01c9b74', '[{"url":"/products/puma-future-7-ultimate-blue.jpg","alt":"Puma Future 7 Ultimate in Blue","feature_tag":"Blue"},{"url":"/products/puma-future-7-ultimate-white.jpg","alt":"Puma Future 7 Ultimate in White","feature_tag":"White"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('da26a5b0-b81d-43fb-9aff-f21d338c40c6', '078733a7-258c-4a0a-94f0-f6199cc56a35', 'puma-future-7-ultimate-202-Blue', 'Blue', '#0000ff', 68);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('dac5aad0-3c47-4eb0-8370-ac991346ffa7', '078733a7-258c-4a0a-94f0-f6199cc56a35', 'puma-future-7-ultimate-202-White', 'White', '#ffffff', 97);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('d428d40b-1647-48fc-ade9-50b1c6131dc3', 'Puma MB.03', 'puma-mb-03-348', 'Puma', 125, 'b2db4e67-f26d-40a0-a0b5-3a7ecfe6d559', '[{"url":"/products/puma-mb-03-yellow.jpg","alt":"Puma MB.03 in Yellow","feature_tag":"Yellow"},{"url":"/products/puma-mb-03-red.jpg","alt":"Puma MB.03 in Red","feature_tag":"Red"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('89fa1a3f-7b66-446b-b5f4-f762b051bc9d', 'd428d40b-1647-48fc-ade9-50b1c6131dc3', 'puma-mb-03-348-Yellow', 'Yellow', '#ffff00', 34);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('ba88f693-1bda-4861-88a4-1daa59b8f5e9', 'd428d40b-1647-48fc-ade9-50b1c6131dc3', 'puma-mb-03-348-Red', 'Red', '#ff0000', 48);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('f15fd2d4-b976-4100-ac14-6d09a7c6d10a', 'Puma Eliminate Power', 'puma-eliminate-power-935', 'Puma', 110, 'a0501457-755a-47d4-8b78-4dd086891765', '[{"url":"/products/puma-eliminate-power-white.jpg","alt":"Puma Eliminate Power in White","feature_tag":"White"},{"url":"/products/puma-eliminate-power-black.jpg","alt":"Puma Eliminate Power in Black","feature_tag":"Black"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('f4ecd7d1-51ce-42c1-b507-eee1598e8b83', 'f15fd2d4-b976-4100-ac14-6d09a7c6d10a', 'puma-eliminate-power-935-White', 'White', '#ffffff', 34);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('51e5948d-ba02-4a2e-8305-f6d72fd01d8f', 'f15fd2d4-b976-4100-ac14-6d09a7c6d10a', 'puma-eliminate-power-935-Black', 'Black', '#000000', 13);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('aa7b9439-1c2a-43c0-87eb-e957ad97deae', 'Puma PWRFrame TR 3', 'puma-pwrframe-tr-3-118', 'Puma', 100, 'f9573225-4b4c-42ca-905e-a9b039c07c95', '[{"url":"/products/puma-pwrframe-tr-3-black.jpg","alt":"Puma PWRFrame TR 3 in Black","feature_tag":"Black"},{"url":"/products/puma-pwrframe-tr-3-red.jpg","alt":"Puma PWRFrame TR 3 in Red","feature_tag":"Red"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('3b1d50f9-f737-4543-bc12-30ef9392675f', 'aa7b9439-1c2a-43c0-87eb-e957ad97deae', 'puma-pwrframe-tr-3-118-Black', 'Black', '#000000', 50);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('a2404459-4d54-4e95-8553-9eddabb63c8c', 'aa7b9439-1c2a-43c0-87eb-e957ad97deae', 'puma-pwrframe-tr-3-118-Red', 'Red', '#ff0000', 18);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('80f09d80-ec04-4e30-92cf-56a862aad0f1', 'Puma Ultra Ultimate', 'puma-ultra-ultimate-850', 'Puma', 200, '920c7b07-e742-4b2c-a779-31f0c01c9b74', '[{"url":"/products/puma-ultra-ultimate-pink.jpg","alt":"Puma Ultra Ultimate in Pink","feature_tag":"Pink"},{"url":"/products/puma-ultra-ultimate-black.jpg","alt":"Puma Ultra Ultimate in Black","feature_tag":"Black"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('c865335f-c105-4934-aef6-76ee797f6f71', '80f09d80-ec04-4e30-92cf-56a862aad0f1', 'puma-ultra-ultimate-850-Pink', 'Pink', '#ffc0cb', 33);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('2c049e69-5a09-41e7-beff-aba626584147', '80f09d80-ec04-4e30-92cf-56a862aad0f1', 'puma-ultra-ultimate-850-Black', 'Black', '#000000', 24);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('46f1b334-8558-430d-b1ef-e334645537ed', 'UA HOVR Phantom 3', 'ua-hovr-phantom-3-936', 'Under Armour', 140, '145f6dca-a518-4087-98c9-09bfd2b69f4d', '[{"url":"/products/ua-hovr-phantom-3-black.jpg","alt":"UA HOVR Phantom 3 in Black","feature_tag":"Black"},{"url":"/products/ua-hovr-phantom-3-white.jpg","alt":"UA HOVR Phantom 3 in White","feature_tag":"White"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('34325bf9-39b5-4a15-aef2-1cb31f601259', '46f1b334-8558-430d-b1ef-e334645537ed', 'ua-hovr-phantom-3-936-Black', 'Black', '#000000', 26);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('83b273e3-2264-4ab0-9a43-8b16e49662db', '46f1b334-8558-430d-b1ef-e334645537ed', 'ua-hovr-phantom-3-936-White', 'White', '#ffffff', 106);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('82594def-f5b4-4f9b-bdec-f73f520b3c02', 'UA Clone Magnetico', 'ua-clone-magnetico-626', 'Under Armour', 250, '920c7b07-e742-4b2c-a779-31f0c01c9b74', '[{"url":"/products/ua-clone-magnetico-red.jpg","alt":"UA Clone Magnetico in Red","feature_tag":"Red"},{"url":"/products/ua-clone-magnetico-black.jpg","alt":"UA Clone Magnetico in Black","feature_tag":"Black"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('521d26ba-ddfa-4333-80a4-a571ba013ac1', '82594def-f5b4-4f9b-bdec-f73f520b3c02', 'ua-clone-magnetico-626-Red', 'Red', '#ff0000', 48);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('7486f381-33a0-4a03-a163-35c1b05ab67c', '82594def-f5b4-4f9b-bdec-f73f520b3c02', 'ua-clone-magnetico-626-Black', 'Black', '#000000', 83);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('b927e32d-5cd0-4bb8-8ba7-0ad864b333a9', 'UA Curry 11', 'ua-curry-11-382', 'Under Armour', 160, 'b2db4e67-f26d-40a0-a0b5-3a7ecfe6d559', '[{"url":"/products/ua-curry-11-yellow.jpg","alt":"UA Curry 11 in Yellow","feature_tag":"Yellow"},{"url":"/products/ua-curry-11-blue.jpg","alt":"UA Curry 11 in Blue","feature_tag":"Blue"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('a5f29f44-ea07-440c-a95f-ac8771b39ca9', 'b927e32d-5cd0-4bb8-8ba7-0ad864b333a9', 'ua-curry-11-382-Yellow', 'Yellow', '#ffff00', 20);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('91ab54d5-dbe2-4506-a9fd-7b08eccb2889', 'b927e32d-5cd0-4bb8-8ba7-0ad864b333a9', 'ua-curry-11-382-Blue', 'Blue', '#0000ff', 13);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('b61643e1-ca44-4139-842e-d263c814ba5e', 'UA Flow Dynamic', 'ua-flow-dynamic-840', 'Under Armour', 130, 'f9573225-4b4c-42ca-905e-a9b039c07c95', '[{"url":"/products/ua-flow-dynamic-orange.jpg","alt":"UA Flow Dynamic in Orange","feature_tag":"Orange"},{"url":"/products/ua-flow-dynamic-black.jpg","alt":"UA Flow Dynamic in Black","feature_tag":"Black"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('5800607b-e878-4637-a54d-70d36c5b3819', 'b61643e1-ca44-4139-842e-d263c814ba5e', 'ua-flow-dynamic-840-Orange', 'Orange', '#ffa500', 44);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('fe1f3496-c7ab-4e64-aa89-23b89b22ddee', 'b61643e1-ca44-4139-842e-d263c814ba5e', 'ua-flow-dynamic-840-Black', 'Black', '#000000', 12);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('a719bbdf-b1d3-408f-8ee8-b341024a7c0b', 'UA TriBase Reign 6', 'ua-tribase-reign-6-907', 'Under Armour', 130, 'f9573225-4b4c-42ca-905e-a9b039c07c95', '[{"url":"/products/ua-tribase-reign-6-grey.jpg","alt":"UA TriBase Reign 6 in Grey","feature_tag":"Grey"},{"url":"/products/ua-tribase-reign-6-red.jpg","alt":"UA TriBase Reign 6 in Red","feature_tag":"Red"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('7d653d6c-97e6-4519-a7c7-6acb177f8563', 'a719bbdf-b1d3-408f-8ee8-b341024a7c0b', 'ua-tribase-reign-6-907-Grey', 'Grey', '#808080', 57);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('327b1ca4-329c-4c70-a3f6-1bad0ef83981', 'a719bbdf-b1d3-408f-8ee8-b341024a7c0b', 'ua-tribase-reign-6-907-Red', 'Red', '#ff0000', 18);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('8e0c6206-1eee-4d6e-b0bc-4eb64e9f07de', 'NB Fresh Foam X 1080v13', 'nb-fresh-foam-x-1080v13-452', 'New Balance', 165, '145f6dca-a518-4087-98c9-09bfd2b69f4d', '[{"url":"/products/nb-fresh-foam-x-1080v13-blue.jpg","alt":"NB Fresh Foam X 1080v13 in Blue","feature_tag":"Blue"},{"url":"/products/nb-fresh-foam-x-1080v13-white.jpg","alt":"NB Fresh Foam X 1080v13 in White","feature_tag":"White"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('a53dfbf7-902c-4142-bb9a-35ffe0445fd8', '8e0c6206-1eee-4d6e-b0bc-4eb64e9f07de', 'nb-fresh-foam-x-1080v13-452-Blue', 'Blue', '#0000ff', 99);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('aeebb47e-c584-4ad1-abb5-1de2e301528b', '8e0c6206-1eee-4d6e-b0bc-4eb64e9f07de', 'nb-fresh-foam-x-1080v13-452-White', 'White', '#ffffff', 78);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('ce6d6d39-81ff-4723-bd38-5de69709fdb2', 'NB Tekela V4 Pro', 'nb-tekela-v4-pro-335', 'New Balance', 215, '920c7b07-e742-4b2c-a779-31f0c01c9b74', '[{"url":"/products/nb-tekela-v4-pro-black.jpg","alt":"NB Tekela V4 Pro in Black","feature_tag":"Black"},{"url":"/products/nb-tekela-v4-pro-red.jpg","alt":"NB Tekela V4 Pro in Red","feature_tag":"Red"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('87deedd6-a68d-40a6-b79e-8454cc7704c4', 'ce6d6d39-81ff-4723-bd38-5de69709fdb2', 'nb-tekela-v4-pro-335-Black', 'Black', '#000000', 39);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('e5ed3e08-5a2d-45a9-a336-e5f141a107a8', 'ce6d6d39-81ff-4723-bd38-5de69709fdb2', 'nb-tekela-v4-pro-335-Red', 'Red', '#ff0000', 61);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('06d67394-5d0d-4234-9e99-53c94a82cecb', 'NB TWO WXY V4', 'nb-two-wxy-v4-936', 'New Balance', 120, 'b2db4e67-f26d-40a0-a0b5-3a7ecfe6d559', '[{"url":"/products/nb-two-wxy-v4-orange.jpg","alt":"NB TWO WXY V4 in Orange","feature_tag":"Orange"},{"url":"/products/nb-two-wxy-v4-blue.jpg","alt":"NB TWO WXY V4 in Blue","feature_tag":"Blue"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('125b0f55-628d-4db7-b174-9a4ff9979055', '06d67394-5d0d-4234-9e99-53c94a82cecb', 'nb-two-wxy-v4-936-Orange', 'Orange', '#ffa500', 16);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('d43149e6-0ab7-4fed-865b-44193d189d2a', '06d67394-5d0d-4234-9e99-53c94a82cecb', 'nb-two-wxy-v4-936-Blue', 'Blue', '#0000ff', 79);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('3c8ac921-08cc-4fca-9113-c87a257712a2', 'NB Coco CG1', 'nb-coco-cg1-202', 'New Balance', 170, 'a0501457-755a-47d4-8b78-4dd086891765', '[{"url":"/products/nb-coco-cg1-white.jpg","alt":"NB Coco CG1 in White","feature_tag":"White"},{"url":"/products/nb-coco-cg1-yellow.jpg","alt":"NB Coco CG1 in Yellow","feature_tag":"Yellow"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('a53712ec-1ab1-4b78-a3db-37c67023e001', '3c8ac921-08cc-4fca-9113-c87a257712a2', 'nb-coco-cg1-202-White', 'White', '#ffffff', 108);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('5e15f682-d057-4f46-8257-719db1a655e3', '3c8ac921-08cc-4fca-9113-c87a257712a2', 'nb-coco-cg1-202-Yellow', 'Yellow', '#ffff00', 34);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('22c3a977-7387-470f-992b-1923c82dc481', 'NB Minimus TR', 'nb-minimus-tr-119', 'New Balance', 130, 'f9573225-4b4c-42ca-905e-a9b039c07c95', '[{"url":"/products/nb-minimus-tr-black.jpg","alt":"NB Minimus TR in Black","feature_tag":"Black"},{"url":"/products/nb-minimus-tr-white.jpg","alt":"NB Minimus TR in White","feature_tag":"White"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('45cc6550-6627-4461-ae2d-b069a4c7878e', '22c3a977-7387-470f-992b-1923c82dc481', 'nb-minimus-tr-119-Black', 'Black', '#000000', 100);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('44a81871-9a9a-44d3-99ad-8e93bbc0d1d6', '22c3a977-7387-470f-992b-1923c82dc481', 'nb-minimus-tr-119-White', 'White', '#ffffff', 73);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('c9032c05-79c2-45d6-b714-1f1969293e09', 'NB Furon V7 Pro', 'nb-furon-v7-pro-305', 'New Balance', 210, '920c7b07-e742-4b2c-a779-31f0c01c9b74', '[{"url":"/products/nb-furon-v7-pro-green.jpg","alt":"NB Furon V7 Pro in Green","feature_tag":"Green"},{"url":"/products/nb-furon-v7-pro-black.jpg","alt":"NB Furon V7 Pro in Black","feature_tag":"Black"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('160f82dd-9eeb-498a-8d7c-127f50df31f4', 'c9032c05-79c2-45d6-b714-1f1969293e09', 'nb-furon-v7-pro-305-Green', 'Green', '#008000', 87);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('68c726b1-7f8d-4aa8-80dd-a86bf74c1740', 'c9032c05-79c2-45d6-b714-1f1969293e09', 'nb-furon-v7-pro-305-Black', 'Black', '#000000', 35);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('07a23745-74d6-4279-a44e-1dd1f45acf34', 'ASICS Gel-Nimbus 26', 'asics-gel-nimbus-26-83', 'ASICS', 160, '145f6dca-a518-4087-98c9-09bfd2b69f4d', '[{"url":"/products/asics-gel-nimbus-26-blue.jpg","alt":"ASICS Gel-Nimbus 26 in Blue","feature_tag":"Blue"},{"url":"/products/asics-gel-nimbus-26-black.jpg","alt":"ASICS Gel-Nimbus 26 in Black","feature_tag":"Black"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('ee5c7750-848f-4c98-a48f-757fc002221d', '07a23745-74d6-4279-a44e-1dd1f45acf34', 'asics-gel-nimbus-26-83-Blue', 'Blue', '#0000ff', 57);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('a3860c88-363f-492b-8f74-38318e7b5c40', '07a23745-74d6-4279-a44e-1dd1f45acf34', 'asics-gel-nimbus-26-83-Black', 'Black', '#000000', 73);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('0e356b09-d83f-46e4-8268-623a0a8c0181', 'ASICS Novablast 4', 'asics-novablast-4-899', 'ASICS', 140, '145f6dca-a518-4087-98c9-09bfd2b69f4d', '[{"url":"/products/asics-novablast-4-red.jpg","alt":"ASICS Novablast 4 in Red","feature_tag":"Red"},{"url":"/products/asics-novablast-4-yellow.jpg","alt":"ASICS Novablast 4 in Yellow","feature_tag":"Yellow"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('2a83cb3f-0c87-4888-b84c-d9477e271490', '0e356b09-d83f-46e4-8268-623a0a8c0181', 'asics-novablast-4-899-Red', 'Red', '#ff0000', 34);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('edee778b-5fe2-4b28-804a-134b00924aca', '0e356b09-d83f-46e4-8268-623a0a8c0181', 'asics-novablast-4-899-Yellow', 'Yellow', '#ffff00', 21);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('b54a24c4-4a05-49e0-a1b1-11da6150852b', 'ASICS Gel-Resolution 9', 'asics-gel-resolution-9-357', 'ASICS', 145, 'a0501457-755a-47d4-8b78-4dd086891765', '[{"url":"/products/asics-gel-resolution-9-white.jpg","alt":"ASICS Gel-Resolution 9 in White","feature_tag":"White"},{"url":"/products/asics-gel-resolution-9-blue.jpg","alt":"ASICS Gel-Resolution 9 in Blue","feature_tag":"Blue"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('43e35043-5422-4b2a-8192-fa156c32e648', 'b54a24c4-4a05-49e0-a1b1-11da6150852b', 'asics-gel-resolution-9-357-White', 'White', '#ffffff', 109);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('b58c000f-9ae6-4867-9030-c1da4f912a23', 'b54a24c4-4a05-49e0-a1b1-11da6150852b', 'asics-gel-resolution-9-357-Blue', 'Blue', '#0000ff', 92);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('540f55bc-ba8c-4cfc-b145-0c039e7ed6d9', 'ASICS Court FF 3', 'asics-court-ff-3-298', 'ASICS', 170, 'a0501457-755a-47d4-8b78-4dd086891765', '[{"url":"/products/asics-court-ff-3-orange.jpg","alt":"ASICS Court FF 3 in Orange","feature_tag":"Orange"},{"url":"/products/asics-court-ff-3-black.jpg","alt":"ASICS Court FF 3 in Black","feature_tag":"Black"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('b340b34a-126f-47a4-9699-f227315f5616', '540f55bc-ba8c-4cfc-b145-0c039e7ed6d9', 'asics-court-ff-3-298-Orange', 'Orange', '#ffa500', 62);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('82f22cde-ebd4-4dc6-917f-716a270103d0', '540f55bc-ba8c-4cfc-b145-0c039e7ed6d9', 'asics-court-ff-3-298-Black', 'Black', '#000000', 102);
INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('df19371d-2028-4c27-8033-984f70e28d37', 'ASICS Metcon Pro', 'asics-metcon-pro-742', 'ASICS', 150, 'f9573225-4b4c-42ca-905e-a9b039c07c95', '[{"url":"/products/asics-metcon-pro-black.jpg","alt":"ASICS Metcon Pro in Black","feature_tag":"Black"},{"url":"/products/asics-metcon-pro-red.jpg","alt":"ASICS Metcon Pro in Red","feature_tag":"Red"}]', 'active');
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('3a2f208c-7098-4bcc-9710-6decb6312040', 'df19371d-2028-4c27-8033-984f70e28d37', 'asics-metcon-pro-742-Black', 'Black', '#000000', 68);
INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('c415214a-5535-41bb-a335-d93e033a51b0', 'df19371d-2028-4c27-8033-984f70e28d37', 'asics-metcon-pro-742-Red', 'Red', '#ff0000', 50);
