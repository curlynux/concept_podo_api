#!/usr/bin/env bash

start=1
limit=10000

while test $start != $limit
    do
    curl -X POST http://192.168.1.70:3000/api/v1/entry

    # cette commande ajoute 1 à la variable "numero" :
    start=$(($start + 1))
done