# Clique Calendar
Welcome to Clique Calendar! This app was built by me, Jeffrey Kintner. Clique Calendar is something of a Google Calendar clone. The idea was spawned from my need to schedule activities with friends and family--people I see on a regular basis. The current functionality offers users the ability to create, read, update, and delete events as well as oranize related events into unique calendars.
___
## Wiki Links
* [Database Schema](https://github.com/jkintner25/clique-calendar/wiki/Database-Schema)
* [Feature List](https://github.com/jkintner25/clique-calendar/wiki/MVP-Feature-List)
* [User Stories](https://github.com/jkintner25/clique-calendar/wiki/User-Stories)
* [Wireframe](https://github.com/jkintner25/clique-calendar/wiki/Wireframe)
___
## Built with:
* Python
* Flask
* WTForms
* SQLAlchemy
* PostgreSQL
* Javascript
* ReactJS
* Redux
___
### Try out this app at the live site on Heroku: https://clique-calendar.herokuapp.com
-OR-
### Run this app on your local machine by following these instructions:
* Clone this repository: https://github.com/Patricus/Eventzeit
* Create a database user with the name and password of your choice.
* Create a database whose owner is the user you just created.
* In the root directory of this app run ```pipenv install```
* Add a .env file in the root directory with the following fields:
````
FLASK_APP=app
FLASK_ENV=development
SECRET_KEY=<<secret key>>
DATABASE_URL=postgresql://<<database user>>:<<password>>@localhost/<<database>>
````
* In your terminal, cd into the react-app directory and run ```npm install```
* Create a .env file in the react-app directory with the following code:
```REACT_APP_BASE_URL=http://localhost:5000```
* cd back into the root directory and run ```pipenv shell```
* Setup your database by running ```flask db migrate``` then ```flask db upgrade``` and finally ```flask seed all```
* Now run ```flask run``` from the root directory to start your backend and connect to your database.
* Open an additional terminal and cd into the "react-app" directory where you'll run ```npm start```
* If your web browser doesn't automatically take you to localhost:3000, type that url in your address bar and enjoy!
___
### Splash Page
![splash](https://user-images.githubusercontent.com/95717139/184582709-e06e95d7-6c08-47e0-a590-5b097cdc6ae1.PNG)
### Calendar View
![Calendar View](https://user-images.githubusercontent.com/95717139/184582834-5316e419-5d85-4dd8-8113-f86e2784ded0.PNG)
### Event Form
![Edit Event](https://user-images.githubusercontent.com/95717139/184582866-543fa745-949c-4d38-b041-e07366d18077.PNG)
___
### Code Snippets:
Building the Calendar:
````
const [value, setValue] = useState(moment())
const [calendar, setCalendar] = useState([])

function buildCalendar(value) {

    const startDay = value.clone().startOf('month').startOf('week')
    const endDay = value.clone().endOf('month').endOf('week')
    const day = startDay.clone().subtract(1, 'day')
    const calendar = []
    while (day.isBefore(endDay, 'day')) {
        calendar.push(
            Array(7).fill(0).map(() => day.add(1, 'day').clone())
            )
        }

    return calendar
}

useEffect(() => {
    setCalendar(buildCalendar(value))
}, [value]);
````

### To-Do:
* Implement calendar sharing among users.
* Allow users to send "sign-up & share calendar" invitations to non-users via email.
* Implement live-chat for user viewing the same calendar.
