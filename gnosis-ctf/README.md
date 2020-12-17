# [Gnosis Conditional Token Framework] 

This code base implements the use case for conditional tokens. Remix was used for initial solidity contract development and testing.

### Development Environment Setup

Pre-requisites : node, yarn, truffle, ganache

Following versions were used in the demo setup


```bash
Node v14.15.1
Yarn 1.22.5
Truffle v5.1.57 
Solidity v0.6.12 
```

### Clone repo

Clone the repository
```bash
    git clone https://github.com/ksk2345/Grants-R8-Hackathon.git	
```

### Install local blockchain : Ganache 

start the Ganache GUI
setup a new workspace "ctf-hr"

cd Grants-R8-Hackathon/gnosis-ctf

### Deploy Solidity contracts

```bash
truffle compile
truffle migrate
```

### Setup Frontend UI

Usage of Front-end UI

    cd Grants-R8-Hackathon/gnosis-ctf/client

Update dependencies

    yarn install

Run it locally

    yarn start
  

### Note about current implementation
 
1. The code is partially implemented and tested in both remix and truffle. 
2. The code internally uses the libraries from Gnosis CTF and OpenZeppelin. For ease of development and debugging, the source files have been locally copied in to the repository. However, for production deployment the online sources should be referenced and used.
3. For ease of deployment and demo, some accounts and address have been statically defined in App.js and migration file(3_deploy_contract_ex.js)
4. For a demo of the workflow follow url (https://drive.google.com/file/d/1nEn46t0Twu-wy7Ztb9aruUzvZ4D6Ubti/view?usp=sharing) 

