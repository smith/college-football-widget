#!/bin/sh
# Zip up widget for distribution. Requires zip and svn

PROJ=CollegeFootball.wdgt
REPO=`svn info | grep ^URL - | sed -e s/URL:\ //g -`/$PROJ # Get the repo URL
TEMP=tmp
ZIPFILE=$PROJ.zip

echo "Exporting project..."
svn export $REPO $TEMP/$PROJ
echo "Creating archive..."
cd $TEMP
zip -r $ZIPFILE $PROJ
mv $ZIPFILE ..
cd ..
echo "Deleting temporary files..."
rm -rfv $TEMP
echo "Created $ZIPFILE. Done."
