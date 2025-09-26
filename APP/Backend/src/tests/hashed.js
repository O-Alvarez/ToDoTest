// gen-hash.mjs
import bcrypt from 'bcrypt';

const password = 'Passw0rd!'; // <-- contraseña de ejemplo (puedes cambiarla)
const saltRounds = 10;

const run = async () => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('PLAIN_PASSWORD:', password);
    console.log('HASH:', hash);
    console.log('\nCopia el valor HASH y pégalo en el INSERT SQL que te doy.');
  } catch (err) {
    console.error('Error generando hash:', err);
  }
};

run();
