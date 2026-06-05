#!/bin/sh
brew services start mongodb/brew/mongodb-community
./gradlew run
brew services stop mongodb/brew/mongodb-community