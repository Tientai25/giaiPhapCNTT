# 🚀 Import Database vào Railway

## Bước 1: Login vào Railway
railway login

## Bước 2: Link project
railway link

# Chọn project "giaiphapCNTT" từ danh sách

## Bước 3: Import schema và data
cd backend
railway run mysql -h $MYSQLHOST -u $MYSQLUSER -p$MYSQLPASSWORD $MYSQLDATABASE < schema.sql
railway run mysql -h $MYSQLHOST -u $MYSQLUSER -p$MYSQLPASSWORD $MYSQLDATABASE < sample_data.sql

## Kiểm tra database đã import thành công
railway run mysql -h $MYSQLHOST -u $MYSQLUSER -p$MYSQLPASSWORD $MYSQLDATABASE -e "SHOW TABLES;"
