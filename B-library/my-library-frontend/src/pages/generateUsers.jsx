const fs = require('fs');

const generateRandomUsername = () => {
  const prefixes = ['user', 'client', 'member', 'guest'];
  const suffix = Math.floor(Math.random() * 10000); // Générer un suffixe aléatoire
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffix}`;
};

const generateRandomPassword = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < 10; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
};

const generateUsers = (numUsers) => {
  const users = [];
  for (let i = 1; i <= numUsers; i++) {
    const user = {
      id: i,
      username: generateRandomUsername(),
      password: generateRandomPassword(),
      email: `${generateRandomUsername()}@example.com`
    };
    users.push(user);
  }
  return users;
};

const numUsers = 10; // Nombre d'utilisateurs à générer
const users = generateUsers(numUsers);

// Écrire le résultat dans un fichier JSON
fs.writeFile('generated_users.json', JSON.stringify(users, null, 2), (err) => {
  if (err) {
    console.error('Erreur d\'écriture du fichier :', err);
  } else {
    console.log('Fichier généré : generated_users.json');
  }
});
