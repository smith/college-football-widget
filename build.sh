#!/bin/sh
# Zip up widget for distribution.

PROJ=CollegeFootball.wdgt

echo "Creating archive..."
zip -r $PROJ.zip $PROJ
echo "Created $ZIPFILE. Done."
