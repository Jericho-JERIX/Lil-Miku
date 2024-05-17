
# Spectrum

Spectrum is a Discord bot for music and video streaming.

## Features

- Play music from YouTube
- Play music from Spotify

## Dependencies

- ffmpeg
- python
- node 20.12.2

To install the necessary dependencies, follow these steps:

1. Create a virtual environment by running the following command:

    ```
    python -m venv env
    ```

2. Activate the virtual environment by running the following command:

    ```
    source ./env/bin/activate
    ```

3. Install the required packages by running the following command:

    ```
    pip install -r requirements.txt
    ```

4. Install the required Node.js packages by running the following command:

    ```
    npm install
    ```

After completing these steps, you should have all the necessary dependencies installed.

To install all the necessary dependencies, you can use the `debian-setup.sh` file. Follow these steps:

1. Make sure you have the `debian-setup.sh` file in the same directory as the `README.md` file.
2. Open a terminal and navigate to the directory where the `README.md` file is located.
3. Run the following command to make the `debian-setup.sh` file executable:

    chmod +x debian-setup.sh

4. Execute the `debian-setup.sh` file by running the following command:

    ```jsx
    ./debian-setup.sh
    ```

    This script will automatically install all the required dependencies for you.

After completing these steps, you should have all the necessary dependencies installed.


## Usage
Fistly you need to create a `.env` file with your Discord token and client ID, follow these steps:

1. Navigate to the [Discord Developer Portal](https://discord.com/developers/).
2. Click on your application, then under the "Bot" tab, you'll find your token. Under the "OAuth2" tab, you'll find your client ID.
3. Open a terminal in your project directory.
4. Use the `touch` command to create a new `.env` file:
    
    touch .env
    
5. Open the `.env` file in your text editor and add the following lines, replacing `your-token` and `your-client-id` with your actual token and client ID:
    
    TOKEN="your-token"
    
    CLIENT_ID="your-client-id"
    
6. Save and close the `.env` file.

Remember to never share your token or client ID with anyone, as they can be used to control your Discord bot.

7. Run the bot by executing the following command:

    ```
    npm run dev
    ```