const users = [{
    id: 1,
    name: 'Yury',
    schoolId: 101
  }, {
    id: 2,
    name: 'Marta',
    schoolId: 102
  }
];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 80
}, {
  id: 2,
  schoolId: 102,
  grade: 90
}, {
  id: 3,
  schoolId: 101,
  grade: 53
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    var user = users.find((item) => item.id === id);

    if (user) {
      resolve(user);
    } else {
      reject('User not found.');
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter(item => item.schoolId === schoolId));
  });
};

const getStatus = (userId) => {
  return getUser(userId)
    .then((user) => {
      return getGrades(user.schoolId)
        .then((gradesAr) => {
          return Promise.resolve(gradesAr.reduce((value, item) => value + item.grade, 0) / gradesAr.length);
        });
    });
}

const getStatusSync = async (userId) => {
  const user = await getUser(userId);
  console.log(user);

  return user;
}

getStatusSync(2)
  .then(user => console.log(user))
  .catch(err => console.log(err));

// getUser(2)
//   .then(user => console.log(user))
//   .catch(err => console.log(err));

// getGrades(101)
//   .then(gradesAr => console.log(gradesAr))
//   .catch(err => console.log(err));

// getStatus(1)
//   .then(value => console.log(value))
//   .catch(err => console.log(err));