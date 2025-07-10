const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const userScores = new WeakMap();

// Set scores for users
userScores.set(users[0], 95);
userScores.set(users[1], 80);

// Remove reference to Bob
users[1] = null;

let sum = 0;
for (const user of users) {
  if (user && userScores.has(user)) {
    sum += userScores.get(user);
  }
}

console.log(sum);

