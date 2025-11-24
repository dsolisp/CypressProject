#!/bin/bash
echo "Initializing Test Environment"
npm ci
npx cypress install
echo "Enviroment Ready."
