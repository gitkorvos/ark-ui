## Installation

Follow these steps to install and run Ark-UI:

1. Clone this repository to your local machine:
   ```shell
   git clone https://github.com/your-username/ark-ui.git
   ```

2. Navigate to the project directory:
   ```shell
   cd ark-ui
   ```

3. Build the Docker image:
   ```shell
   docker build -t ark-ui .
   ```

4. Run the Docker container:
   ```shell
   docker run -d -p 8080:80 --name ark-ui-container -e ARK_NODE_URL=http://your-ark-node:4003 ark-ui
   ```

Note: Replace `your-username` with your GitHub username and `your-ark-node` with the URL or IP address of your Ark node.
