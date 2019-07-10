#!/bin/bash
echo "==============================================="
echo "============== ALL SYSTEMS GO ================="
echo "==============================================="

gonme-terminal -e "PORT=$app_port CACHE_PORT=$cache_port CACHE_HOST=$cache_host node appserver/app.js"
gnome-terminal -e "PORT=$app_port CACHE_PORT=$cache_port CACHE_HOST=$cache_host PGHOSTADDR=$pg_host_addr PGDATABASE=$pg_database PGUSER=$pg_user PGPASSWORD=$pg_password PGPORT=$pg_port PG_TABLE=$pg_table node queue_scraper/app.js"
gnome-terminal -e "PORT=$app_port node client_lib/client_lib/sample_implementation.js"
