# Flask React Project

This is the backend for the Flask React project.

## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Deploy to Heroku

1. Create a new project on Heroku
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
4. Run

   ```bash
   heroku login
   ```

5. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
7. Push your docker container to heroku from the root directory of your project.
   This will build the dockerfile and push the image to your heroku container registry

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

8. Release your docker container to heroku

   ```bash
   heroku container:release web -a {NAME_OF_HEROKU_APP}
   ```

9. set up your database:

   ```bash
   heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
   heroku run -a {NAME_OF_HEROKU_APP} flask seed all
   ```

10. Under Settings find "Config Vars" and add any additional/secret .env variables.

11. profit

DELETE FROM transactions;
DELETE FROM budget_items;
DELETE FROM budget_groups;
ALTER SEQUENCE budget_items_id_seq RESTART WITH 9;
ALTER SEQUENCE budget_groups_id_seq RESTART WITH 6;
ALTER SEQUENCE transactions_id_seq RESTART WITH 10;
INSERT INTO budget_groups (id, title, month_int, year_int, user_id) VALUES
	(1, 'Groceries', 2, 2021, 1),
    (2, 'Automotive', 2, 2021, 1),
    (3, 'Homegoods', 2, 2021, 1),
    (4, 'Eating Out', 2, 2021, 1),
    (5, 'Travel', 2, 2021, 1);
INSERT INTO budget_items (id, group_id, title, description, expected_amount, due_date) VALUES
	(1, 1, 'Shopping Trip', 'carrots, ribeye', 110.00, '2-28-2021'),
    (2, 4, 'Valentines Day', 'dominos', 500.00, '2-14-2021'),
    (3, 5, 'Mexico', 'family vacation', 3000.00, '2-1-2021'),
    (4, 2, 'Brake Change', 'changed brakes', 250.00, '2-26-2021'),
	(5, 1, 'More Groceries', 'ice cream, bacon', 210.00, '2-28-2021'),
    (6, 3, 'Plasma TV', 'dominos', 100.00, '2-7-2021'),
    (7, 3, 'TV stand', 'transparent and solid', 3000.00, '2-6-2021'),
    (8, 2, 'oil change', 'full synthetic', 40.00, '2-26-2021');
INSERT INTO transactions (id, item_id, title, amount, date) VALUES
	(1, 1, 'Kroger Grocery Store', 110.00, '2-28-2021'),
    (2, 2, 'dominos', 500.00, '2-14-2021'),
    (3, 6, 'Wal-Mart Marketplace', 100.00, '2-7-2021'),
    (4, 5, 'Whole Foods', 210.00, '2-28-2021'),
	(5, 3, 'resort', 2500.00, '2-1-2021'),
    (6, 3, 'plane tickets', 500.00, '2-1-2021'),
	(7, 7, 'Pottery Barn', 3000.00, '2-6-2021'),
    (8, 8, 'jiffy lube', 40.00, '2-26-2021'),
    (9, 4, 'ford', 250.00, '2-26-2021');
    
DELETE FROM transactions;
DELETE FROM budget_items;
DELETE FROM budget_groups;
ALTER SEQUENCE budget_items_id_seq RESTART WITH 9;
ALTER SEQUENCE budget_groups_id_seq RESTART WITH 6;
ALTER SEQUENCE transactions_id_seq RESTART WITH 10;
INSERT INTO budget_groups (id, title, month_int, year_int, user_id) VALUES
	(1, 'Groceries', 2, 2021, 1),
    (2, 'Automotive', 2, 2021, 1),
    (3, 'Homegoods', 2, 2021, 1),
    (4, 'Eating Out', 2, 2021, 1),
    (5, 'Travel', 2, 2021, 1);
INSERT INTO budget_items (id, group_id, title, description, expected_amount, due_date) VALUES
	(1, 1, 'Shopping Trip', 'carrots, ribeye', 110.00, '2-28-2021'),
    (2, 4, 'Valentines Day', 'dominos', 500.00, '2-14-2021'),
    (3, 5, 'Mexico', 'family vacation', 3000.00, '2-1-2021'),
    (4, 2, 'Brake Change', 'changed brakes', 250.00, '2-26-2021'),
	(5, 1, 'More Groceries', 'ice cream, bacon', 210.00, '2-28-2021'),
    (6, 3, 'Plasma TV', 'dominos', 100.00, '2-7-2021'),
    (7, 3, 'TV stand', 'transparent and solid', 3000.00, '2-6-2021'),
    (8, 2, 'oil change', 'full synthetic', 40.00, '2-26-2021');
INSERT INTO transactions (id, item_id, title, amount, date) VALUES
	(1, 1, 'Kroger Grocery Store', 110.00, '2-28-2021'),
    (2, 2, 'dominos', 500.00, '2-14-2021'),
    (3, 6, 'Wal-Mart Marketplace', 100.00, '2-7-2021'),
    (4, 5, 'Whole Foods', 210.00, '2-28-2021'),
	(5, 3, 'resort', 2500.00, '2-1-2021'),
    (6, 3, 'plane tickets', 500.00, '2-1-2021'),
	(7, 7, 'Pottery Barn', 3000.00, '2-6-2021'),
    (8, 8, 'jiffy lube', 40.00, '2-26-2021'),
    (9, 4, 'ford', 250.00, '2-26-2021');