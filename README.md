# MHubLab

A curated collection of lab information at the University of Michigan.

# Setup

Install the necessary dependencies with the following commands:

```
npm install
npm start

python3 -m venv env
source env/bin/activate
brew install sqlite curl
pip install flask-cors
```

* Use `pip install -r requirements.txt` to complete the Python requirements.

To prevent errors related to "import AwsConfig from './aws-exports'", ensure you have the AWS Amplify CLI installed. If not, install it by executing:

```
npm install -g @aws-amplify/cli
```

Configure the Amplify CLI with your AWS account:

```
amplify configure
```

In your project directory, initialize the Amplify project:

```
amplify init
```

Add the necessary Amplify resources to your project using the appropriate 'amplify add' commands. For example, if you need authentication, execute:

```
amplify add auth
```

Lastly, run 'amplify push' to create the resources in your AWS account and generate the 'aws-exports' file:

```
amplify push
```