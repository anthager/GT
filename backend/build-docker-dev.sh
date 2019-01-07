#!/usr/bin/env bash
mydir=$(dirname "$0")
mkdir $mydir/new-build
cd $mydir/new-build/
cp -r ../ new-build/
# rm new-build/Dockerfile new-build/.dockerignore
# mydir="${0%/*}"