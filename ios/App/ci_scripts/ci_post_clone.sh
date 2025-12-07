#!/bin/sh

# Install CocoaPods dependencies
cd "$CI_WORKSPACE/ios/App"
pod install
