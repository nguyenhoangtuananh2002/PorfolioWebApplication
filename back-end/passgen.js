import bcrypt from 'bcryptjs'; // Correct ES module import

async function generateHash() {
    const password = 'Password@123';
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed Password:', hashedPassword);
}

generateHash();
