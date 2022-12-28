#!/bin/bash
# $1 = the network

graph="../../node_modules/@graphprotocol/graph-cli"

graph deploy \
    --product hosted-service \
    subgraph-template/$1 \
    --node https://api.thegraph.com/deploy/ \
    --ipfs https://api.thegraph.com/ipfs \
    --access-token $THE_GRAPH_ACCESS_TOKEN
