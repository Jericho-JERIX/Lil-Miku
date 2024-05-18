#!/bin/bash

# Install ffmpeg
apt-get update
apt-get install -y ffmpeg

# Install python
apt-get install -y python

# Install node 20.12.2
curl -sL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Create virtual environment
python -m venv env

# Activate virtual environment
source ./env/bin/activate

# Install required packages
pip install -r requirements.txt

npm install