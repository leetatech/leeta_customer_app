# LEETA TECHNOLOGY CUSTOMER MOBILE APP

This repository contains the source code for the customer client side interaction of LEETA technology infrastructure. Read more about [LEETA](https://getleeta.com)


## Dependencies
You need to have the following technologies setup on you locan environment

 - Node (npm included)
    
    To install node on your computer: [Follow this link](https://nodejs.org/en/download)

- Homebrew (Mac)

    For steps on how to use homebrew. [Use this link](https://brew.sh/)

- Xcode (Mac)

    Download and install xcode from the [Apple Store] (https://apps.apple.com/us/app/xcode/id497799835?mt=12)
    
- Android studio
    Official IDE from android developers. [Getting strted with android studio](https://developer.android.com/studio)

### Install     
- Prepare envrionment setup. Install watchman to watch for changes in your filesystem. [Learn more](https://reactnative.dev/docs/environment-setup?guide=native )
    ```
    brew install watchman
    ```

- Clone the github repository:
    ```
    git clone git@github.com:leetatech/leeta_customer_app.git
    ```

- Install application
    ```
    cd leeta_customer_app && npm install 
    ```

- Install cocoapods
    ```
    sudo gem install cocoapods
    ```

- Install ios pod 
    ```
    cd ios && pod install 
    ```


### RUN

    cd ./{PROJECT_ROOT} 
    npx react-native run-ios 
    

   ###### OR 

    npx react-native run-android