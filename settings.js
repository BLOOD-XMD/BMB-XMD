const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('settings.env'))
    require('dotenv').config({ path: __dirname + '/settings.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0pwakFBbWM3R3kwTEhDSXdPbG9MOHNBdnh5NEJTMUtCYm9ld3lOWjIwaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZjNWTUNYcmRVa2d1OCtLdHBQVDZ4QjREbXoyR2VjZEY5cjUwNlJBc3hGRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1UDdrVHBqcVQzNW5IUUFrczROcHF1RUE0SER3eUdldER1eWNIdnBTU0hZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxYTBkUVEwcHk3elRTTVdsV3ZVQVZQNFBDajBKdE5ETzA5MDd1MjJ4Y2lZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlKeFpzZTdMWWpMZFlTRkJiRk1zcTRGaDJjZC9FQ1NJTHpRMmhITU5Hazg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImoycUZYYXBrUzJUQ3h2WmVjdUE0OTRvS2NtTHNxWTNMOHlzc2lxZ3VlZ2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0hXbkFWMjBnY1pFbnBTb2tLNXArdEkrQXY4UW05S2VKclBEd1ZLYk1sYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRzJTazkzdWtuYXJ5ckVqK3M5QkJqU29teFZLTDJZZWluYjhrVkd3QlJEbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldjWUlFL3JReW1mUVJzQ0w0dUd4V1lGYTBMY3Q3b0tZYlovNlB0eENtTDNIQzRoWno3Sm0zK25NZFhBSUJ4cmRTTHNTMU5zbGYzdEsyZXVBY2VqQmlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTUsImFkdlNlY3JldEtleSI6IkdadkVndlI3aWJnbGNTK01XT3FaTllBVFlLTDJGTU0rL2REc2VYTGhKc3c9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3MTQ3NDY3NDlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRDcwNUE4REMxQkFBM0E4OEFFNzNDRTA3RkYwOUQ5MzQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NDEwODA1MX0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3MTQ3NDY3NDlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNTUzMTgzMEQwMjA0Q0U1ODc3QjBFOENCRTRGQ0EyRDUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NDEwODA1MX0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3MTQ3NDY3NDlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODBCNjRGNEVCQjgxQzU1MDkyOTI4QzQ1MTQxNkQ2QzUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NDEwODA2M31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiTlQ3UEhXSEIiLCJtZSI6eyJpZCI6Ijk0NzE0NzQ2NzQ5OjNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoic2FjaGl0aHJhIiwibGlkIjoiMjEyNzQ3NTMwODA1MzQ5OjNAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKeVE3UTRRZ0tHMnhBWVlBaUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJpT3cvVHp6OWF3ZVV4amxXSWVXcE0zZWFINTBMQTJlQlN0ZkVOTE1PbXhZPSIsImFjY291bnRTaWduYXR1cmUiOiI4SlNyOGlTUDJnYUY5VFFhTzhxNGJneXJyMnczS0VJKzdZMk82ckpQT2hXemtGYzROd3Y2amxFdWdyYzREWFZYajFheUdYb29IMFpCd3VDdzJWaHNDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUzZLa0Z4RnR4VlpiSitLZlVMd2l3VHd3TStuK3RtVHpYWS9wa21GWTU2UHJNdThaQXd0UlpET3NJd2JpbndvcTVMek93WC9LeHhPV0NOM0VWYzBoaVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDcxNDc0Njc0OTozQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQllqc1AwODgvV3NIbE1ZNVZpSGxxVE4zbWgrZEN3Tm5nVXJYeERTekRwc1cifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1NDEwODA0NiwibGFzdFByb3BIYXNoIjoiUFdrNUIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVBWNSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255767862457",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY, // ✅
    WARN_COUNT : process.env.WARN_COUNT || '3',
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    CHAT_BOT: process.env.CHAT_BOT || 'yes', // ✅
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway"
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
