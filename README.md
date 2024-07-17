# Hardware Store Web
This is a Hardware Store, where you can observe someone's hardware or publicate your own. The app is divided into admin and client sides.

Logined user can add/delete own hardware. Clicking on a photo you enter a full information about device. Sidebar shows all categories of the store, all items category shows all devices.

The code is divided into backend and frontend parts. Backend is made on Express, MongoDb, TypeScript, using middlewares to control user permissions. Frontend is made using ReactJs, Redux Toolkit, TypeScript.

To start the project, you need to do the following:

1) Clone the project to your Github machine with the command:
   
   `git clone git@github.com:sakutaku/Hardware-Store-Web.git`

2) Open project in the terminal an go to backend folder and write following commands:

   `npm i && npm run seed` and `npm run dev`

3) Open frontend folder and write following command:

   `npm i` && `npm run start`

4) Open website in browser
   
   `http://localhost:3000/`
