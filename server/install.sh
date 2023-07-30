sudo cp bigdoc.service /lib/systemd/system/
sudo chmod 644 /lib/systemd/system/bigdoc.service
sudo chmod +x server/server.js
sudo systemctl daemon-reload
sudo systemctl enable bigdoc.service
sudo systemctl start bigdoc.service
sudo systemctl status bigdoc.service
