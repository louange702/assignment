const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function addSampleData() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('Adding sample data...');

    // Add sample users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    await connection.query(`
      INSERT INTO users (name, email, password, phone) VALUES
      ('John Doe', 'john@example.com', ?, '1234567890'),
      ('Jane Smith', 'jane@example.com', ?, '0987654321'),
      ('Mike Johnson', 'mike@example.com', ?, '5555555555')
    `, [hashedPassword, hashedPassword, hashedPassword]);
    console.log('✓ Sample users added');

    // Add sample services
    await connection.query(`
      INSERT INTO services (title, description, icon) VALUES
      ('Web Development', 'Custom web applications and websites', 'fa-code'),
      ('Mobile Apps', 'iOS and Android mobile applications', 'fa-mobile'),
      ('UI/UX Design', 'Beautiful and intuitive user interfaces', 'fa-paint-brush')
    `);
    console.log('✓ Sample services added');

    // Add sample team members
    await connection.query(`
      INSERT INTO team_members (name, position, bio, image_url) VALUES
      ('Sarah Williams', 'CEO & Founder', 'Experienced leader with 15 years in tech industry', 'https://via.placeholder.com/150'),
      ('David Brown', 'CTO', 'Technology expert specializing in cloud solutions', 'https://via.placeholder.com/150'),
      ('Emily Davis', 'Lead Designer', 'Creative designer with passion for user experience', 'https://via.placeholder.com/150')
    `);
    console.log('✓ Sample team members added');

    // Add sample contacts
    await connection.query(`
      INSERT INTO contacts (name, email, subject, message, status) VALUES
      ('Alice Cooper', 'alice@example.com', 'Project Inquiry', 'I would like to discuss a new project', 'new'),
      ('Bob Martin', 'bob@example.com', 'Support Request', 'Need help with my account', 'read'),
      ('Carol White', 'carol@example.com', 'Partnership', 'Interested in partnership opportunities', 'replied')
    `);
    console.log('✓ Sample contacts added');

    console.log('\n✅ All sample data added successfully!');
    console.log('\nYou can now see:');
    console.log('- 3 users in Users tab');
    console.log('- 3 services in Services tab');
    console.log('- 3 team members in Team tab');
    console.log('- 3 contact messages in Contacts tab');
    
  } catch (error) {
    console.error('Error adding sample data:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addSampleData();
