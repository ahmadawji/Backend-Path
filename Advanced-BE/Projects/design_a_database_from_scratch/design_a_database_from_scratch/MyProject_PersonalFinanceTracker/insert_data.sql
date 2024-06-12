INSERT INTO users (username, email) VALUES
('john_doe', 'john.doe@example.com');

INSERT INTO accounts (name, description, budget, user_id) VALUES
('Personal Checking', 'Personal checking account', 1500.00, 1),
('Savings Account', 'Emergency savings fund', 5000.00, 1),
('Business Account', 'Business operating expenses', 12000.00, 1),
('Personal Checking', 'Personal checking account', 1500.00, 3),
('Savings Account', 'Emergency savings fund', 5000.00, 3),
('Business Account', 'Business operating expenses', 12000.00, 3),
('Personal Checking', 'Personal checking account', 1500.00, 4),
('Savings Account', 'Emergency savings fund', 5000.00, 4),
('Business Account', 'Business operating expenses', 12000.00, 4);


INSERT INTO categories (title, description) VALUES
('Groceries', 'Expenses for food and household supplies'),
('Utilities', 'Monthly utility bills including electricity, water, and gas'),
('Rent', 'Monthly rent payments for accommodation'),
('Entertainment', 'Expenses for movies, concerts, and other recreational activities'),
('Savings', 'Money set aside for future use or emergencies'),
('Transportation', 'Expenses for fuel, public transport, and vehicle maintenance'),
('Healthcare', 'Medical expenses including doctor visits and medications'),
('Insurance', 'Payments for health, auto, and home insurance'),
('Dining Out', 'Money spent on eating out at restaurants and cafes'),
('Education', 'Expenses related to tuition, books, and other educational materials');


INSERT INTO deposit_withdraw (value, action_type, account_id) VALUES
(500.00, 'W', 1);