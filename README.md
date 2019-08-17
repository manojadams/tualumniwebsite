# tualumniwebsite
Tezpur university alumni website

# Current website details:

Alumni website address:
 http://tuaa.tezu.ernet.in:8031

FTP server details:
14.139.219.242:8030

Login: ns
Pass: root123

ssh ns@14.139.219.242 -p 8030

Connect using filezilla

Ideas:

https://www.bitsaa.org/


## MYSQL details:
const connectionPool = mysql.createPool({
    connectionLimit : 500,
    host: 'localhost',
    user: 'root',
    password: 'TUAA@10_jan',
    database: 'tuaa'
});
Mysql password2: root123

## Blog details:
Engine Wordpress

Administrator:
User: root
Password: tuaa@root123
Email address: manoj.adams@gmail.com
Location: http://tuaa-blr.tezu.ernet.in:8031/blog/
Login location: http://tuaa-blr.tezu.ernet.in:8031/blog/wp-admin

Config file location of php.ini: /etc/php.5.6/apache2/php.ini

## Wordpress SMTP details
### Gmail details (for WP Email SMTP plugin, for manoj.adams@gmail.com -- needs to change)
Gmail API setup location for smtp: https://console.developers.google.com/apis/credentials?project=tuaa-blr-chaper
Client ID: 524193138383-dk9ae7ma0c8pret032u5ii6sfto3nh4m.apps.googleusercontent.com
Client Secret: 0BtHZnQeDPWyrVs4Y9s50YOx
