#!/bin/bash
echo "==============================================="
echo "============== ALL SYSTEMS GO ================="
echo "==============================================="

gonme-terminal -e "node appserver/app.js"
gnome-terminal -e "node queue_scraper/app.js"
gnome-terminal -e "node client_lib/client_lib/sample_implementation.js"
