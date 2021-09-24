# EventVenue
This is P465 Team 8 repository for the Event/Venue project.

## Running locally
1. Uncomment lines 3 and 7 for handlng cors in app.py.
2. Comment out heroku backend variable and uncomment local backend variable in [App.js](./frontend/src/App.js)
3. Start Flask Backend
```console
~/EventVenueProject$ flask run
```
4. Start React Frontend
```console
~/EventVenueProject$ cd frontend
~/EventVenueProject/frontend$ npm start
```

## Using Git
1. Do your work in a [new branch](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging).
2. If working on a ticket, name the branch \[TicketID]-Ticket_Name. Otherwise give it a descriptive name.

## Setting up Heroku
1. Sign up for [heroku](https://heroku.com).
2. Send heroku account email to Ryan to be added as a contributor.
3. Install and log into the [heroku cli](https://devcenter.heroku.com/articles/heroku-cli). Snap doesn't work on WSL, so use the Ubuntu/Debian apt-get if necessary.
4. Follow instructions for [setting up Heroku as a remote for existing app](https://devcenter.heroku.com/articles/git#for-an-existing-heroku-app).

## Deploy to Heroku
1. Comment lines 3 and 7 for handling CORS in app.py.
2. Comment out local backend variable and uncomment heroku backend variable in [App.js](./frontend/src/App.js)
3. Use git to add and commit changed files.
4. [Push to heroku](https://devcenter.heroku.com/articles/git#deploying-code).
    ```console
    $ git push heroku main
    ```
    or if on a different branch:
     ```console
    $ git push heroku branchname:main
    ```
5. Open app at https://lonelyweddings.herokuapp.com/flask/hello