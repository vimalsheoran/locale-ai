# Testing steps

Follow these simple steps in order to execute the test.

1. Clone the git respository into a folder of your choice by navigating to that folder and then pasting the following command in your terminal.

--- `$ git clone https://github.com/vimalsheoran/locale-ai.git`

2. Navigate into the `locale-ai` folder.

--- `$ cd local-ai`

3. Install the required dependencies.

--- `$ chmod +x install.sh`

--- `$ ./install.sh`

4. Setup the required configurations by making changes in the `config.js` file. 

![#f03c15](https://placehold.it/15/f03c15/000000?text=+) **IF YOU DO NOT CHANGE THESE CONFIGURATIONS, THE TEST WILL NOT WORK.**

5. Run the test.

--- `$ chmod +x run.sh`

--- `$ ./run.sh`

To read more about the test click [here](#how-does-the-test-proceed?).

# How does the test proceed?

There are three programs that execute to run the test.

1. **AppServer** which is at `/appserver/app.js`
2. **Queue Scraper** which is at `/queue_scraper/app.js`
3. **Sample Client** which is at `/client_lib/client_lib/sample_implementation.js`

The **Sample Client** will send **15 requests** to the **AppServer** with each request containing **10 entries per request**. Requests are sent at a **5 second** interval. The **Sample Client** program will exit after sending all the requests. **AppServer** will unpack each entry and put individual entries onto a queue. **Queue Scraper** will take entries from the queue and load them onto the specified **PostgreSQL** instance and send relevant feedback to the client via sockets.