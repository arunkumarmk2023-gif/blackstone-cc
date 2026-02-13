import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const fixtures = [
  { opponent: 'United South XI', venue: 'Connecticut Cricket League', date: '2025-10-04 15:30:00', format: 'Hard Tennis Ball', result: 'BlackStone CC won by 64 Runs', ourScore: '232', ourWickets: '3', theirScore: '168', theirWickets: '5' },
  { opponent: 'CT Knights', venue: 'Connecticut Cricket League', date: '2025-09-28 15:45:00', format: 'Hard Tennis Ball', result: 'BlackStone CC won by 7 Wickets', ourScore: '126', ourWickets: '3', theirScore: '124', theirWickets: '8' },
  { opponent: 'Spartan Kings', venue: 'Connecticut Cricket League', date: '2025-09-27 11:00:00', format: 'Hard Tennis Ball', result: 'BlackStone CC won by 6 Wickets', ourScore: '82', ourWickets: '4', theirScore: '81', theirWickets: '9' },
  { opponent: 'RedHawks', venue: 'Connecticut Cricket League', date: '2025-09-20 10:30:00', format: 'Hard Tennis Ball', result: 'RedHawks won by 8 Wickets', ourScore: '117', ourWickets: '4', theirScore: '120', theirWickets: '2' },
  { opponent: 'CT Falcons', venue: 'Connecticut Cricket League', date: '2025-09-13 16:00:00', format: 'Hard Tennis Ball', result: 'CT Falcons won by 62 Runs', ourScore: '40', ourWickets: '10', theirScore: '102', theirWickets: '4' },
  { opponent: 'Eagles', venue: 'Connecticut Cricket League', date: '2025-09-13 11:00:00', format: 'Hard Tennis Ball', result: 'BlackStone CC won by 5 Wickets', ourScore: '98', ourWickets: '5', theirScore: '95', theirWickets: '7' },
  { opponent: 'Nomads', venue: 'Connecticut Cricket League', date: '2025-09-06 13:30:00', format: 'Hard Tennis Ball', result: 'Winner: Nomads (D/L)', ourScore: '45', ourWickets: '2', theirScore: '110', theirWickets: '6' },
  { opponent: 'Triumphs', venue: 'Connecticut Cricket League', date: '2025-08-15 08:00:00', format: 'Hard Tennis Ball', result: 'Triumphs won by 2 Wickets', ourScore: '135', ourWickets: '8', theirScore: '136', theirWickets: '8' },
  { opponent: 'DarkHorse', venue: 'Connecticut Cricket League', date: '2025-08-02 13:30:00', format: 'Hard Tennis Ball', result: 'BlackStone CC won by 6 Wickets', ourScore: '99', ourWickets: '4', theirScore: '98', theirWickets: '6' },
  { opponent: 'WHCC UnderDogs', venue: 'Connecticut Cricket League', date: '2025-07-26 08:00:00', format: 'Hard Tennis Ball', result: 'WHCC UnderDogs won by 68 Runs', ourScore: '77', ourWickets: '10', theirScore: '145', theirWickets: '5' },
  { opponent: 'Men in Blue', venue: 'Connecticut Cricket League', date: '2025-07-19 08:00:00', format: 'Hard Tennis Ball', result: 'BlackStone CC won by 7 Wickets', ourScore: '113', ourWickets: '3', theirScore: '112', theirWickets: '7' },
  { opponent: 'All Stars Cricket Team', venue: 'Connecticut Cricket League', date: '2025-07-12 13:30:00', format: 'Hard Tennis Ball', result: 'BlackStone CC won by 3 Runs', ourScore: '128', ourWickets: '6', theirScore: '125', theirWickets: '8' },
  { opponent: 'Connecticut Super Kings', venue: 'Connecticut Cricket League', date: '2025-06-28 08:00:00', format: 'Hard Tennis Ball', result: 'Connecticut Super Kings won by 4 Wickets', ourScore: '118', ourWickets: '7', theirScore: '119', theirWickets: '6' },
  { opponent: 'Stallions', venue: 'Connecticut Cricket League', date: '2025-06-21 16:00:00', format: 'Hard Tennis Ball', result: 'BlackStone CC won by 5 Wickets', ourScore: '106', ourWickets: '5', theirScore: '105', theirWickets: '8' },
  { opponent: 'DownTown Strikers', venue: 'Connecticut Cricket League', date: '2025-06-14 13:30:00', format: 'Hard Tennis Ball', result: 'BlackStone CC won by 8 Wickets', ourScore: '93', ourWickets: '2', theirScore: '92', theirWickets: '7' },
  { opponent: 'MiddleTown Warriors', venue: 'Connecticut Cricket League', date: '2025-06-07 08:00:00', format: 'Hard Tennis Ball', result: 'MiddleTown Warriors won by 8 Wickets', ourScore: '89', ourWickets: '6', theirScore: '90', theirWickets: '2' },
  { opponent: 'Incredibles', venue: 'Connecticut Cricket League', date: '2025-05-31 11:00:00', format: 'Hard Tennis Ball', result: 'Abandoned', notes: 'Match Abandoned due to weather' },
  { opponent: 'Smoking Guns', venue: 'Connecticut Cricket League', date: '2025-05-17 08:00:00', format: 'Hard Tennis Ball', result: 'BlackStone CC won by 7 Wickets', ourScore: '108', ourWickets: '3', theirScore: '107', theirWickets: '8' },
  { opponent: 'Balayya Warriors', venue: 'Connecticut Cricket League', date: '2025-05-10 11:00:00', format: 'Hard Tennis Ball', result: 'Abandoned', notes: 'Match Abandoned due to weather' },
  { opponent: 'Invincibles', venue: 'Connecticut Cricket League', date: '2025-05-03 08:00:00', format: 'Hard Tennis Ball', result: 'Invincibles won by 32 Runs', ourScore: '110', ourWickets: '10', theirScore: '142', theirWickets: '6' },
  { opponent: 'Thalaivas', venue: 'Connecticut Cricket League', date: '2025-04-26 13:30:00', format: 'Hard Tennis Ball', result: 'Abandoned', notes: 'Match Abandoned due to weather' }
];

async function seedFixtures() {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    
    let inserted = 0;
    for (const fixture of fixtures) {
      const query = `
        INSERT INTO fixtures (opponent, venue, date, format, result, ourScore, ourWickets, theirScore, theirWickets, notes, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      await connection.execute(query, [
        fixture.opponent,
        fixture.venue,
        fixture.date,
        fixture.format,
        fixture.result,
        fixture.ourScore || null,
        fixture.ourWickets || null,
        fixture.theirScore || null,
        fixture.theirWickets || null,
        fixture.notes || null,
        'completed'
      ]);
      inserted++;
    }
    
    console.log(`✅ Successfully inserted ${inserted} fixtures!`);
    await connection.end();
  } catch (error) {
    console.error('Error seeding fixtures:', error);
    process.exit(1);
  }
}

seedFixtures();
