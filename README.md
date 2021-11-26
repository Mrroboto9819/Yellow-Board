# YellowBoard Academy

[Demo](https://www.yellowboard.avocadosnetwork.com)

Welcome to yellowboad academy, where you can test your elementary skills or your children can reinforce their elementary knowledge for school.

## App made whit NodeJS in NextJS

This app was made for School feel free to download the code, this app was developed in NextJs whit api, some static props and MongoDB. DO NOT CHANGE THE PORT

### Get Started

First of all create a .env file that contains the next variable `MONGO_REMOTE=YOUR-MONGODB-CONNECTION/yellowboard`

To start using this app you need to run `yarn start`

in your mongodb shell create an admin user

```javascript
db.users.insert({
  username: 'admin',
  name: 'Admin',
  lastname: '-',
  password: 'admin',
  userType: 'a',
  mail: 'admin@admin',
  url: '/assets/profile/default.png',
  direccion: '-',
  phone: '-',
  birthday: '-',
  sta: 1,
  courses: [],
  updatedAt: {
    $date: '2021-11-13T20:02:22.875Z',
  },
});
```

use this user to login in to the app

Remember to create 2 accounts (teacher, student)

## Screen Shots

#### [Login](https://ibb.co/ZgSgh9m)

<a href="https://ibb.co/ZgSgh9m"><img src="https://i.ibb.co/my0yHp8/login.png" alt="login" border="0"></a>

#### AdminDashboard

<a href="https://ibb.co/KhBpWHy"><img src="https://i.ibb.co/h9rJVv8/admin-users.png" alt="admin-users" border="0"></a>
<a href="https://ibb.co/ScD64rz"><img src="https://i.ibb.co/8bnmLcH/admin-panel.png" alt="admin-panel" border="0"></a>
<a href="https://ibb.co/D7tF1LW"><img src="https://i.ibb.co/qRd8Dxj/admin-courses.png" alt="admin-courses" border="0"></a>

### UserDashboard

<a href="https://ibb.co/9w2jtgT"><img src="https://i.ibb.co/xmGQHLj/user-dash-profile.png" alt="user-dash-profile" border="0"></a>
<a href="https://ibb.co/DWsyP0F"><img src="https://i.ibb.co/028SpHL/user-dash-courses.png" alt="user-dash-courses" border="0"></a>

### Helpers and Creator

[Mrooboto9819](https://github.com/Mrroboto9819)
[John024x](https://github.com/john024x)
[Nah-22](https://github.com/NaH-22)
[Avocados Network](https://www.avocadosnetwork.com)
