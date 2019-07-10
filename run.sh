#!/bin/bash
echo "The client will connect to AppServer running on your localhost, please specify a port for the AppServer"
read -p "Enter Port for AppServer : ": app_port

echo "Please provide configurations for cache. Cache is used for caching values and maintaining the Data Queue"
read -p "Enter Host IP for Cache : ": cache_host
read -p "Enter Port for Cache : ": cache_port

echo "Please provide configurations for the PostgreSQL DB"
read -p "Enter Host IP for DB : ": pg_host_addr
read -p "Enter Database name : ": pg_database
read -p "Enter Database username : ": pg_user
read -p "Enter password for $pg_user : ": pg_password
read -p "Enter port for DB : ": pg_port
read -p "Enter table where data is to be stored : ": pg_table
echo "Please read README.md for table schema."

gonme-terminal -e "PORT=$app_port CACHE_PORT=$cache_port CACHE_HOST=$cache_host node appserver/app.js"
&
gnome-terminal -e "PORT=$app_port CACHE_PORT=$cache_port CACHE_HOST=$cache_host PGHOSTADDR=$pg_host_addr PGDATABASE=$pg_database PGUSER=$pg_user PGPASSWORD=$pg_password PGPORT=$pg_port PG_TABLE=$pg_table node queue_scraper/app.js"
&
gnome-terminal -e "PORT=$app_port node client_lib/client_lib/sample_implementation.js"
