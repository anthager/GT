mkdir .gursch
cp ../Resources/crypto.py .gursch
cp ../Resources/gurschTracker.py .gursch
cp ../Resources/httpCalls.py .gursch
cp ../Resources/settings.json .gursch
cp -r .gursch ~
rm -rf .gursch

echo " " >> ~/.bash_profile
echo "alias gursch='python3 ~/.gursch/gurschTracker.py'" >> ~/.bash_profile

osascript restart.scpt